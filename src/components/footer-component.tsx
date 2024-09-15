import Link from "next/link";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <footer className='bg-white shadow mt-auto'>
      <hr />
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-12'>
        <ul className='flex justify-center items-center gap-8 text-gray-500 dark:text-gray-400 mb-8'>
          <li>
            <Link href='#'>
              <AiOutlineInstagram size={28} />
            </Link>
          </li>
          <li>
            <Link href='#'>
              <FaFacebook size={24} />
            </Link>
          </li>
          <li>
            <Link href='#'>
              <AiFillYoutube size={28} />
            </Link>
          </li>
        </ul>
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2024{" "}
          <Link
            href='https://flowbite.com/'
            className='hover:underline'>
            Electron
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
