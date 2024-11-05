"use client";

import { CheckboxInputComponent } from "@/components/input-component";
import { ItemCartDto } from "@/lib/dto/cart.dto";

import Image from "next/image";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { toRupiahFormat } from "@/lib/utils/format";
import { useCartContext } from "@/context/cart-context";

export default function ItemCartComponent({
  items,
}: {
  items: ItemCartDto[];
}): JSX.Element {
  const { itemActives, setCartActive, onChangeQty, onDeleteItem } =
    useCartContext();

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className='flex justify-between items-center gap-5 p-4'>
          <div className='flex'>
            <CheckboxInputComponent
              defaultChecked={false}
              input='select-item'
              label=''
              onClick={(isChecked: boolean) => {
                if (isChecked) {
                  setCartActive([...itemActives, item]);
                } else {
                  setCartActive(
                    itemActives.filter((i) => i.cartId !== item.cartId)
                  );
                }
              }}
            />
            <Image
              src={"/images/product/test.jpg"}
              width={128}
              height={128}
              alt='product-image'
              className='w-28 items-center'
            />
            <div className='max-w-64 flex flex-col gap-3'>
              <p className='text-md text-slate-800 line-clamp-2'>
                {item.productName}
              </p>

              <p className='text-sm text-gray-500'>{item.variantName}</p>
            </div>
          </div>
          <p className='text-md font-semibold'>{toRupiahFormat(item.price)}</p>
          {/* Quantity Per Product */}
          <div className='w-40 flex gap-2'>
            <button
              className={`text-xs ${
                item.qty === 1 ? "bg-slate-500" : "bg-slate-800"
              } text-white px-3 rounded-md`}
              disabled={item.qty === 1}
              onClick={() => {
                onChangeQty({
                  cartId: item.cartId,
                  newQty: item.qty - 1,
                  stock: item.stock,
                });
              }}>
              <FaMinus size={12} />
            </button>
            <input
              type='number'
              className='w-full h-7 rounded-md text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6'
              value={item.qty}
            />
            <button
              className={`text-xs ${
                item.qty === item.stock ? "bg-slate-500" : "bg-slate-800"
              } text-white px-3 rounded-md`}
              disabled={item.qty === item.stock}
              onClick={() =>
                onChangeQty({
                  cartId: item.cartId,
                  newQty: item.qty + 1,
                  stock: item.stock,
                })
              }>
              <FaPlus size={12} />
            </button>
          </div>
          <FaRegTrashAlt
            size={20}
            className='m-3 cursor-pointer text-gray-400'
            onClick={async () => await onDeleteItem(item)}
          />
        </div>
      ))}
    </>
  );
}
