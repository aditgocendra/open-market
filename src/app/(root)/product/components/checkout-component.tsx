"use client";

import { toRupiahFormat } from "@/lib/utils/format";
import { useState } from "react";

// Icon
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
export const CheckoutComponent = ({ price }: { price: number }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (operation: boolean) => {
    if (operation) {
      setQuantity(quantity + 1);
    } else {
      if (quantity <= 1) return;
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='border rounded-lg p-4  mb-4'>
      <p className='text-xl text-center font-semibold mb-6'>
        {toRupiahFormat(price * quantity)}
      </p>
      <div className='flex gap-2 mb-6'>
        <button
          className='text-sm bg-slate-800 text-white px-3 rounded-md'
          onClick={() => handleQuantity(false)}>
          <FaMinus />
        </button>
        <input
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className='input-default text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6'
        />
        <button
          className='text-sm bg-slate-800 text-white px-3 rounded-md'
          onClick={() => handleQuantity(true)}>
          <FaPlus />
        </button>
      </div>

      <button className='w-full border border-slate-800 text-slate-800 px-4 py-2 rounded-md mb-3'>
        Add
      </button>
      <button className='w-full bg-slate-800 text-white px-4 py-2 rounded-md'>
        Buy
      </button>
    </div>
  );
};
