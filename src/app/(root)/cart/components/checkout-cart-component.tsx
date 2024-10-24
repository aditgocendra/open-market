"use client";

import { useCartContext } from "@/context/cart-context";
import { toRupiahFormat } from "@/lib/utils/format";

export default function CheckoutCartComponent() {
  const { itemActives } = useCartContext();

  const totalPayment = itemActives.reduce(
    (current, item) => current + item.price * item.qty,
    0
  );

  return (
    <div className='w-96 border rounded-md shadow-sm p-4'>
      <div className='flex justify-between items-center'>
        <p className='text-md text-gray-500'>Total</p>
        <p className='text-md font-semibold'>{toRupiahFormat(totalPayment)}</p>
      </div>

      <div className='bg-slate-100 p-3 rounded-md my-4 text-sm text-slate-800'>
        Use Voucher
      </div>

      <button className='w-full bg-slate-800 text-white px-4 py-2 text-sm rounded-md'>
        Checkout
      </button>
    </div>
  );
}
