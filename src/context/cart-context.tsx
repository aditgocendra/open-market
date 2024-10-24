"use client";

import { removeCartAction, updateCartAction } from "@/app/(root)/cart/actions";
import { CartDto, ItemCartDto } from "@/lib/dto/cart.dto";
import { createContext, useContext, useState } from "react";

export interface CartContextValue {
  carts: CartDto[];
  setCarts: React.Dispatch<React.SetStateAction<CartDto[]>>;
  itemActives: ItemCartDto[];
  setCartActive: React.Dispatch<React.SetStateAction<ItemCartDto[]>>;
  onChangeQty: ({
    newQty,
    cartId,
    stock,
  }: {
    newQty: number;
    cartId: string;
    stock: number;
  }) => Promise<void>;
  onDeleteItem: (item: ItemCartDto) => Promise<void>;
}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

export const CartProvider = ({
  defaultCarts,
  children,
}: {
  defaultCarts: CartDto[];
  children: React.ReactNode;
}) => {
  const [carts, setCarts] = useState<CartDto[]>(defaultCarts);
  const [itemActives, setCartActive] = useState<ItemCartDto[]>([]);

  const onChangeQty = async ({
    newQty,
    cartId,
    stock,
  }: {
    newQty: number;
    cartId: string;
    stock: number;
  }) => {
    if (newQty <= 0 || newQty > stock) {
      return;
    }

    const r = await updateCartAction({
      id: cartId,
      qty: newQty,
    });

    if (r) {
      const newCarts = carts.map((cart) => {
        const items = cart.items.map((item) => {
          if (item.cartId === cartId) {
            item.qty = newQty;
          }
          return item;
        });

        cart.items = items;
        return cart;
      });

      setCarts(newCarts);
    }
  };

  const onDeleteItem = async (item: ItemCartDto) => {
    const r = await removeCartAction(item.cartId);

    const newCarts = carts.filter((cart) => {
      const items = cart.items.filter((i) => i.cartId !== r.id);

      if (items.length > 0) {
        cart.items = items;
        return cart;
      }
    });

    setCarts(newCarts);
    setCartActive(itemActives.filter((item) => item.cartId !== r.id));
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        itemActives,
        setCartActive,
        onChangeQty,
        onDeleteItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext not found");
  }

  return context;
};
