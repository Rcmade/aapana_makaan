import { getAllCartProducts } from "@/controllers/user/cart";

export const cartRouteUtils = async (
  params: Record<string, string>,
  userId: string
) => {
  const limit = params.limit ? parseInt(params.limit, 10) : 10;
  const cartProducts = await getAllCartProducts(userId, {
    ...params,
    limit: limit,
    page: +(params.page || 1),
    noLimit: !!params?.noLimit,
    priceFilter: +params.priceFilter,
    sortBy: params.sortBy as any,
  });

  return cartProducts;
};
