import { and, eq, ne, or } from "drizzle-orm/expressions";
import { db } from "@/db/db";
import { categories, productImages, products } from "@/db/schema";
import { alias } from "drizzle-orm/pg-core";
import { SubImage } from "@/types";

export const getProductDetails = async (id: string) => {
  try {
    const parent = alias(products, "parent");
    const sibling = alias(products, "sibling");

    const result = await db
      .select({
        id: products.id,
        name: products.name,
        sortDescription: products.sortDescription,
        description: products.description,
        sku: products.sku,
        price: products.price,
        rating: products.rating,
        discountedPrice: products.discountedPrice,
        currentVariantType: products.currentVariantType,
        currentVariantValue: products.variantValue,
        category: products.categoryName,
        stock: products.stock,
        primaryImage: products.primaryImage,
        subImage: {
          image: productImages.imageUrl,
        },
        brand: products.brand,
        meta: products.meta,
        isAvailable: products.isAvailable,
        parent: {
          id: parent.id,
          name: parent.name,
          primaryImage: parent.primaryImage,
          stock: parent.stock,
          price: parent.price,
          discountedPrice: parent.discountedPrice,
          variantValue: parent.variantValue,
        },
        sibling: {
          id: sibling.id,
          name: sibling.name,
          primaryImage: sibling.primaryImage,
          stock: sibling.stock,
          sku: sibling.sku,
          price: sibling.price,
          discountedPrice: sibling.discountedPrice,
          variantValue: sibling.variantValue,
        },
      })
      .from(products)
      .leftJoin(parent, eq(products.parentId, parent.id)) // Join with parent
      .leftJoin(
        sibling,
        or(
          and(
            eq(sibling.parentId, products.parentId),
            ne(sibling.id, products.id)
          ),
          eq(sibling.parentId, products.id)
        )
      )
      .leftJoin(productImages, eq(productImages.productId, products.id))
      .where(eq(products.id, id));
    if (!result.length) {
      return null;
    }
    const siblingsMap = new Map();
    const imagesMap = new Map();

    result.forEach((r) => {
      if (r.sibling?.id) {
        siblingsMap.set(r.sibling.id, r.sibling);
      }
      if (r.subImage?.image) {
        imagesMap.set(r.subImage.image, { image: r.subImage.image });
      }
    });

    const siblings = Array.from(siblingsMap.values());
    const images = Array.from(imagesMap.values()) as SubImage[];
    const typeOfVars = result[0]?.sibling;
    const variants = (
      result[0]?.parent?.id ? [result[0].parent, ...siblings] : siblings
    ) as (typeof typeOfVars)[];

    const output = {
      product: {
        ...result[0],
        subImages: images,
        subImage: undefined,
        parent: undefined,
        sibling: undefined,
      },
      variants,
    };

    return output;
  } catch (error) {
    console.log("This is error", error);
    return null;
  }
};
