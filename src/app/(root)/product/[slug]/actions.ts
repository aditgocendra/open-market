"use server";

import { decrypt } from "@/lib/jwt";
import { createCartService } from "@/lib/services/cart.services";
import { getProductInfoService } from "@/lib/services/products.services";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getProductInfoAction = async (id: string) => {
  return await getProductInfoService(id);
};

export const addProductToCartAction = async ({
  productId,
  qty,
  variantId,
}: {
  productId: string;
  qty: number;
  variantId?: number;
}) => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie!);

  const uid = session?.userId as string;

  await createCartService({ uid, productId, variantId, qty });
  revalidatePath("/cart");
};
