import { CartProvider } from "@/context/cart-context";
import { getCartAction } from "./actions";
// import { getCartAction } from "./actions";

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const r = await getCartAction({ take: 10, skip: 0 });

  return <CartProvider defaultCarts={r}>{children}</CartProvider>;
  // return <>{children}</>;
}
