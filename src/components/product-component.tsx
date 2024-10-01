import { toRupiahFormat } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
export default function ProductComponent({
  id,
  name,
  price,
  image,
  rating,
  sold,
  regencies,
}: {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  sold: number;
  regencies: string;
}) {
  return (
    <Link
      href={`/product/${id}`}
      className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm'>
      <Image
        width={0}
        height={0}
        sizes='100vw'
        className='w-full max-w-sm rounded-t-lg'
        src={`/images/product/${image}`}
        alt='product image'
      />

      <div className='p-2'>
        <p className='text-sm tracking-tight text-gray-900 dark:text-slate-800 line-clamp-2 mb-3'>
          {name}
        </p>

        <p className='text-sm font-bold text-gray-900 dark:text-slate-800'>
          {toRupiahFormat(price)}
        </p>

        <div className='flex items-center text-xs my-4'>
          <FaStar className='text-yellow-400 mr-1' />
          <p>{`${rating} | ${sold} Sold`}</p>
        </div>

        <p className='text-xs text-gray-500'>{regencies}</p>
      </div>
    </Link>
  );
}
