import { toRupiahFormat } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";
export default function ProductComponent({
  name,
  price,
  image,
}: {
  name: string;
  image: string;
  price: number;
}) {
  return (
    <Link
      href={`#`}
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
      </div>
    </Link>
  );
}
