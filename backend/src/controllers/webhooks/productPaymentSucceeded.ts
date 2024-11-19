import Stripe from "stripe";
import { db } from "@/db/db";
import { eq, and, sql, or } from "drizzle-orm";
import {
  orders,
  tempOrders,
  orderItems,
  tempOrderItems,
} from "@/db/schema/orderSchema";
import { UserCart } from "@/db/schema/cartSchema";
import { products, inventoryLogs } from "@/db/schema/productSchema";

const stripeCon = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const productPaymentSucceeded = async (text: string, sig: string) => {
  try {
    // Verify and construct the Stripe event
    const event = stripeCon.webhooks.constructEvent(
      text,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const clientSecret = paymentIntent.client_secret;
      const id = paymentIntent.metadata.id;

      if (!clientSecret) {
        console.error("Client secret missing in payment intent.");
        return { error: "Client secret missing" };
      }

      await db.transaction(async (trx) => {
        // Find the temporary order using the clientSecret
        const tempOrder = await trx
          .select()
          .from(tempOrders)
          .where(
            or(eq(tempOrders.clientSecret, clientSecret), eq(tempOrders.id, id))
          )
          .limit(1);

        if (!tempOrder.length) {
          console.error(
            `No temporary order found for client secret: ${clientSecret}`
          );
          throw new Error("Temp order not found");
        }

        const {
          id: tempOrderId,
          userId,
          totalAmount,
          shippingMethod,
          userShippingAddress,
          ...rest
        } = tempOrder[0];

        const [newOrder] = await trx
          .insert(orders)
          .values({
            userId,
            totalAmount,
            shippingMethod,
            clientSecret,
            userShippingAddress,
            status: "paid",
            // TODO: Check this
            createdAt: rest.createdAt,
            updatedAt: new Date(),
          })
          .returning({ id: orders.id });

        const newOrderId = newOrder.id;

        // Fetch temporary order items
        const tempOrderItemsData = await trx
          .select()
          .from(tempOrderItems)
          .where(eq(tempOrderItems.orderId, tempOrderId));

        if (!tempOrderItemsData.length) {
          console.warn(`No items found for temporary order ${tempOrderId}`);
        }

        const finalOrderItems = tempOrderItemsData.map((item) => ({
          orderId: newOrderId,
          productId: item.productId,
          name: item.name,
          qty: item.qty,
          price: item.price,
          primaryImage: item.primaryImage,
        }));

        // Insert all order items in a single query
        await trx.insert(orderItems).values(finalOrderItems);

        // Prepare stock updates and inventory logs
        const stockUpdates = [];
        const inventoryLogsData = [];
        const userCartDeletions = [];

        for (const item of tempOrderItemsData) {
          const { productId, qty } = item;

          stockUpdates.push({ productId, qty });
          inventoryLogsData.push({
            productId,
            userId,
            changeType: "SALE",
            quantity: -qty,
          });
          userCartDeletions.push({ productId, userId });
        }

        // Update product stock one by one
        for (const { productId, qty } of stockUpdates) {
          await trx
            .update(products)
            .set({
              stock: sql`${products.stock} - ${qty}`,
            })
            .where(eq(products.id, productId));
        }

        // Insert inventory logs
        await trx.insert(inventoryLogs).values(inventoryLogsData);

        // Delete items from the user's cart
        await trx
          .delete(UserCart)
          .where(
            or(
              ...userCartDeletions.map(({ productId, userId }) =>
                and(
                  eq(UserCart.productId, productId),
                  eq(UserCart.userId, userId)
                )
              )
            )
          );

        // Delete temporary order and items
        await trx
          .delete(tempOrderItems)
          .where(eq(tempOrderItems.orderId, tempOrderId));
        await trx.delete(tempOrders).where(eq(tempOrders.id, tempOrderId));
      });
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    return { error: "Webhook handling failed" };
  }
};
