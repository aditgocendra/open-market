"use server";

import {
  getCartByUidService,
  removeCartService,
  updateCartService,
} from "@/lib/services/cart.services";
import { getUidSession } from "@/lib/session";

export const getCartAction = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  const uid = await getUidSession();
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
