import Image from "next/image";
import { FaBoxArchive } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { getStoreByIdAction, getStoreProductsAction } from "./actions";
import { StoreDetailDto } from "@/lib/dto/store.dto";
import ProductComponent from "@/components/product-component";
import { ProductCardInfoDto } from "@/lib/dto/product.dto";

export default async function StorePage({
  params,
}: {
  params: { id: string };
}) {
  const store: StoreDetailDto = await getStoreByIdAction(params.id);
  const storeProducts: ProductCardInfoDto[] = await getStoreProductsAction(
    params.id
  );

  return (
    <div className='max-w-screen-xl mx-auto flex flex-col justify-center items-start p-6'>
      <div className='w-full flex justify-between items-center gap-6 rounded-lg border p-6'>
        <div className='flex gap-4'>
          <div className='w-24 h-24 rounded-full border'>
            <Image
              className='rounded-full'
              src={`/images/logo/${store.logo}`}
              width={128}
              height={128}
              objectFit='cover'
              alt='logo-store'
            />
          </div>
          <div>
            <p className='text-lg p-0 font-semibold'>{store?.name}</p>
            <p className='text-xs text-gray-500 mb-3'>{store.regencies}</p>
            <button className='bg-slate-800 text-white px-4 py-1.5 text-xs rounded-md'>
              Chat Now
            </button>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-16'>
          <div className='flex flex-col'>
            <div className='flex justify-center items-center'>
              <FaBoxArchive className='text-slate-800 text-md' />
              <p className='text-slate-800 text-md font-semibold ml-1'>{`(180)`}</p>
            </div>
            <p className='text-sm text-gray-500'>Products</p>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-center items-center'>
              <GrTransaction className='text-slate-800 text-md' />
              <p className='text-slate-800 text-md font-semibold ml-1'>{`(126)`}</p>
            </div>
            <p className='text-center text-sm text-gray-500'>Sold</p>
          </div>
        </div>
      </div>

      <h3 className='text-md font-semibold text-slate-800 my-4'>Products</h3>
      <div className='grid grid-cols-5 gap-5 items-center'>
        {storeProducts.map((product, index) => (
          <ProductComponent
            key={index}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            rating={product.rating}
            sold={product.totalSold}
            regencies={product.regencies}
          />
        ))}
      </div>
    </div>
  );
}
