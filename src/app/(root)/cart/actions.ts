"use server";

import { decrypt } from "@/lib/jwt";
import {
  getCartByUidService,
  removeCartService,
  updateCartService,
} from "@/lib/services/cart.services";
import { cookies } from "next/headers";

export const getCartAction = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie!);

  const uid = session?.userId as string;
  return await getCartByUidService({ uid, take, skip });
};

export const updateCartAction = async ({
  id,
  qty,
}: {
  id: string;
  qty: number;
}) => {
  try {
    return await updateCartService({ id, qty });
  } catch (error) {
    throw new Error("Something wrong, please wait a seconds");
  }
};

export const removeCartAction = async (cartId: string) => {
  try {
    return await removeCartService(cartId);
  } catch (error) {
    throw new Error("Something wrong, please wait a seconds");
  }
};
