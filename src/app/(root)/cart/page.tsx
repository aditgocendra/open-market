"use client";

import CheckoutCartComponent from "./components/checkout-cart-component";
import ProductCartComponent from "./components/cart-component";

// import { getCartAction } from "./actions";

export default function CartPage() {
  // const r = await getCartAction({ take: 10, skip: 0 });

  return (
    <div className='max-w-screen-xl mx-auto flex justify-center items-start gap-4 p-6'>
      <div className='w-full'>
        {/* Card Cart */}
        <ProductCartComponent />
      </div>
      {/* Card Checkout */}
      <CheckoutCartComponent />
    </div>
  );
}
