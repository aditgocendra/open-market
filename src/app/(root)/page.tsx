import Image from "next/image";
import { getCategoriesAction, getProductsAction } from "./actions";
import { CarouselComponent } from "@/components/carousel-component";
import Link from "next/link";
import { HiOutlineFilter } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import ProductComponent from "@/components/product-component";

export default async function Home() {
  const categories = await getCategoriesAction({ take: 10, skip: 0 });
  const products = await getProductsAction({ take: 10, skip: 0 });

  return (
    <div className='max-w-screen-xl mx-auto m-4'>
      {/* Carousel */}
      <CarouselComponent />

      {/* Category */}
      <div className='my-6 p-6 border rounded-lg shadow-sm'>
        <h3 className='mb-4 text-md font-semibold text-slate-800'>
          Categories
        </h3>
        <div className='grid grid-cols-10 gap-3'>
          {categories.data &&
            categories.data.map((category) => (
              <div
                key={category.id}
                className='h-[100px] rounded-md shadow-sm border flex flex-col justify-center items-center text-center '>
                <Link
                  href={`/product?category=${category.id}`}
                  className='flex flex-col justify-center items-center text-center'>
                  <Image
                    src={`/images/icons/${category.icon}`}
                    width={32}
                    height={32}
                    alt='icon-categories'
                  />
                  <p className='mt-1 text-xs'>{category.name}</p>
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Product */}
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-md text-slate-800'>Product</p>
        <div className='flex items-center transition-all'>
          <button className='border border-gray-300 m-2 rounded-md'>
            <HiOutlineFilter
              size={18}
              className='text-neutral-400 m-2'
            />
          </button>
          <button
            type='button'
            className='relative group transition-all rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
            <p className='min-w-32 flex justify-between items-center gap-2 text-neutral-400 group-hover:text-black'>
              <span>Sort</span>
              <IoIosArrowDown className='rotate-180 transition-all group-hover:rotate-0' />
            </p>

            {/* Dropdown */}
            <div className='absolute right-0 top-10 z-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex'>
              <div className='py-1'>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  id='menu-item-0'>
                  Harga Terendah
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  id='menu-item-1'>
                  Harga Tertinggi
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  id='menu-item-2'>
                  Terbaru
                </a>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className='grid grid-cols-6 gap-5 items-center'>
        {products.data &&
          products.data.map((product, index) => {
            return (
              <ProductComponent
                key={index}
                id={product.id}
                name={product.name}
                image={product.productImages[0].image}
                price={product.price}
                rating={product.detailProduct!.rating!}
                sold={product.detailProduct!.totalSold!}
                regencies={product.store.location.regencies}
              />
            );
          })}
      </div>
    </div>
  );
}
