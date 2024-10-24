import { FaCircleUser } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import { IoMdCart } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";

import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { ButtonTextComponent } from "./button-component";
import Image from "next/image";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/jwt";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LinkButtonComponent } from "./link-component";

export default async function NavbarComponent() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie!);

  const onSignOut = async () => {
    "use server";
    await deleteSession();
    redirect("/sign-in");
  };

  return (
    <nav className='border'>
      <div className='max-w-screen-xl flex justify-between items-center mx-auto'>
        <Link href={process.env.NEXT_PUBLIC_APP_URL || "/"}>
          <Image
            width={72}
            height={72}
            alt='Logo'
            src='/images/logo/open-market-logo.png'
          />
        </Link>

        <div className='w-1/2 md:w-full relative mx-8'>
          <input
            type='search'
            id='default-search'
            className='block w-full p-2.5 text-sm text-slate-800 border rounded-lg '
            placeholder='Search Product'
            required
          />
          <button
            type='submit'
            className='text-slate-800 absolute end-1.5 bottom-1.5 bg-slate-800 rounded-lg text-sm p-2 '>
            <IoSearch className='text-white' />
          </button>
        </div>

        {!session ? (
          <LinkButtonComponent
            href='/sign-in'
            title='Sign In'
          />
        ) : (
          <div className='flex justify-center items-center gap-5 py-4'>
            <Link href={"/notification"}>
              <IoMdNotifications
                size={20}
                className='text-slate-800'
              />
            </Link>

            <Link href={"/cart"}>
              <IoMdCart
                size={20}
                className='text-slate-800'
              />
            </Link>

            <div className='relative group transition-all rounded-md bg-white text-sm font-semibold text-gray-800 cursor-pointer'>
              <div className='flex justify-center items-center border rounded-md px-4 py-2'>
                <Image
                  width={24}
                  height={24}
                  alt='profile-picture'
                  src='/images/profile-picture/default.jpg'
                  className='rounded-full'
                />
                <p className='text-xs ml-2'>Username</p>
              </div>

              <div className='absolute right-0 top-10 z-10 hidden w-auto flex-col gap-1 rounded-md bg-white py-3 shadow-md transition-all group-hover:flex'>
                <div className='w-52'>
                  <Link
                    href='/my-transaction'
                    className='flex gap-3 items-center text-center px-4 py-2 hover:bg-slate-100'>
                    <GrTransaction size={16} />
                    <p>Transaction</p>
                  </Link>

                  <hr className='my-2' />

                  <Link
                    href='/account'
                    className='flex gap-3 items-center text-center px-4 py-2 hover:bg-slate-100'>
                    <FaCircleUser size={16} />
                    <p>Account</p>
                  </Link>

                  <div className='flex gap-3 items-center text-center px-4 py-2 hover:bg-slate-100'>
                    <PiSignOutBold size={16} />
                    <ButtonTextComponent
                      text='Sign Out'
                      onClickButton={onSignOut}
                      isActive
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
