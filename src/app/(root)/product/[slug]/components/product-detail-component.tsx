"use client";

import Image from "next/image";
import { CheckoutComponent } from "../../components/checkout-component";
import { ProductInfoDto } from "@/lib/dto/product.dto";
import { toRupiahFormat } from "@/lib/utils/format";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailComponent({
  product,
}: {
  product: ProductInfoDto;
}) {
  const [imageActive, setImageActive] = useState(product.images[0]);
  const [priceActive, setPriceActive] = useState(product.price);

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='m-4 grid md:grid-cols-4 md:gap-5'>
        {/* COL 1 */}
        <div className='flex flex-col'>
          <div className='w-full rounded-lg bg-slate-500'>
            <Image
              src={`/images/product/${imageActive}`}
              width={512}
              height={512}
              objectFit='cover'
              className='w-full h-full rounded-lg'
              alt='product image'
            />
          </div>

          <div className='flex gap-2 mt-2 overflow-x-auto'>
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={`/images/product/${image}`}
                width={512}
                height={512}
                className='w-20 rounded-lg cursor-pointer'
                alt='product image'
                onClick={() => setImageActive(image)}
              />
            ))}
          </div>
        </div>

        {/* COL 2 */}
        <div className='flex flex-col col-span-2'>
          <p className='font-semibold text-lg line-clamp-2 mb-2'>
            {product.name}
          </p>
          <div className='grid grid-cols-3 text-start mb-10'>
            <p className='text-xs text-slate-500'>{`Sold (${product.totalSold})`}</p>
            <p className='text-xs text-slate-500'>{`Rating (${product.rating})`}</p>
            <p className='text-xs text-slate-500'>{`Favorite (${product.totalFav})`}</p>
          </div>

          <div className='flex flex-col border shadow-sm rounded-md p-4 mb-10'>
            <p className='font-bold text-xl '>{toRupiahFormat(priceActive)}</p>

            {product.variant.length > 0 && (
              <div>
                <p className='text-sm font-semibold mt-10 mb-4'>Variant</p>

                <div className='flex gap-3'>
                  {product.variant.map((variant) => (
                    <div
                      key={variant.id}
                      className='flex items-center border rounded-md cursor-pointer'
                      onClick={() => {
                        variant.image && setImageActive(variant.image);
                        setPriceActive(variant.price);
                      }}>
                      <Image
                        src={`/images/product/${variant.image}`}
                        width={512}
                        height={512}
                        className='w-10 h-10 rounded-lg'
                        alt='product image'
                      />
                      <p className='text-xs text-slate-800 mx-2 '>
                        {variant.variant}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='grid grid-cols-2 mb-10'>
            <p className='text-sm font-semibold text-slate-800'>Category</p>
            <p className='text-sm text-slate-800'>{`${product.category} > ${product.subCategory}`}</p>
          </div>

          <div className='grid grid-cols-2 mb-10'>
            <p className='text-sm font-semibold text-slate-800'>Seen</p>
            <p className='text-sm font-semibold text-slate-800'>
              {product.seen}
            </p>
          </div>

          <div className='grid grid-cols-2 mb-10'>
            <p className='text-sm font-semibold text-slate-800'>Stock</p>
            <p className='text-sm text-slate-800'>{product.totalStock}</p>
          </div>

          {/* Store information */}
          <div className='w-full h-24 flex justify-between items-center shadow-sm border rounded-md p-4 mb-10'>
            <div className='flex items-center'>
              <Image
                width={64}
                height={64}
                src={`/images/logo/${product.store.logo}`}
                alt='store-logo'
                className='rounded-full'
              />
              <div className='ml-4'>
                <p className='text-sm font-semibold mb-1'>
                  {product.store.name}
                </p>
                <button className='w-full bg-slate-800 text-[10px] text-white p-1 rounded-md'>
                  Chat Now
                </button>
              </div>
            </div>
            <Link
              href={`/store/${product.store.id}`}
              className='text-sm font-semibold'>
              Store Detail
            </Link>
          </div>

          <p className='font-semibold text-sm mb-3'>Description</p>
          <p className='text-sm mb-6 text-justify'>{product.desc}</p>
        </div>

        {/* COL 3 */}
        <div>
          <CheckoutComponent price={priceActive} />
        </div>
      </div>
    </div>
  );
}
