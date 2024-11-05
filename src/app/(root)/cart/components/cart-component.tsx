"use client";

import Image from "next/image";
import { CheckboxInputComponent } from "../../../../components/input-component";

import { CartDto } from "@/lib/dto/cart.dto";

import { useCartContext } from "@/context/cart-context";
import ItemCartComponent from "./item-cart-component";

export default function ProductCartComponent() {
  const { carts } = useCartContext();

  return (
    <div className='w-full'>
      {carts.map((cart: CartDto, index: number) => (
        <div
          className='flex flex-col border shadow-sm rounded-md'
          key={index}>
          {/* Store */}
          <div className='flex items-center gap-5 p-4'>
            <CheckboxInputComponent
              defaultChecked={false}
              input='select-item'
              label=''
            />
            <div className='flex justify-center items-center gap-2'>
              <Image
                src={`/images/logo/${cart.store.logo}`}
                width={36}
                height={36}
                alt='store-logo'
                className='rounded-full border'
              />
              <p className='text-sm'>{cart.store.name}</p>
            </div>
          </div>
          <hr />
          {/* Product Store Cart   */}
          <ItemCartComponent
            items={cart.items}
            key={index}
          />
        </div>
      ))}
    </div>
  );
}

// function Product({
//   index,
//   product,
//   isActive,
// }: {
//   index: number;
//   product: CartProductDto;
//   isActive: boolean;
// }): JSX.Element {
//   const { cartItems, cartActives, setCartItems, setCartActive } =
//     useContext(CartContext);

//   return (
//     <div className='flex justify-between items-center gap-5 p-4'>
//       <div className='flex'>
//         <CheckboxInputComponent
//           defaultChecked={isActive}
//           input='asd'
//           label=''
//           onClick={(isChecked: boolean) => {
//             if (isChecked) {
//               setCartActive([...cartActives, product]);
//             } else {
//               setCartActive(
//                 cartActives.filter((item) => item.cartId !== product.cartId)
//               );
//             }
//           }}
//         />
//         <Image
//           src={"/images/product/test.jpg"}
//           width={128}
//           height={128}
//           alt='product-image'
//           className='w-28 items-center'
//         />
//         <div className='max-w-64 flex flex-col gap-3'>
//           <p className='text-md text-slate-800 line-clamp-2'>
//             {product.productName}
//           </p>

//           <p className='text-sm text-gray-500'>{product.variantName}</p>
//         </div>
//       </div>
//       <p className='text-md font-semibold'>{toRupiahFormat(product.price)}</p>
//       {/* Quantity Per Product */}
//       <div className='w-40 flex gap-2'>
//         <button
//           className='text-xs bg-slate-800 text-white px-3 rounded-md'
//           onClick={() => onChangeQty(product.qty - 1)}>
//           <FaMinus size={12} />
//         </button>
//         <input
//           type='number'
//           className='w-full h-7 rounded-md text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6'
//           defaultValue={qty}
//         />
//         <button
//           className='text-xs bg-slate-800 text-white px-3 rounded-md'
//           onClick={() => onChangeQty(product.qty + 1)}>
//           <FaPlus size={12} />
//         </button>
//       </div>
//       <FaRegTrashAlt
//         size={20}
//         className='m-3 cursor-pointer text-gray-400'
//         onClick={() => onDeleteItem()}
//       />
//     </div>
//   );
// }
