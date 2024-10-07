import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { LinkButtonComponent } from "./link-component";
import { ButtonDefaultComponent } from "./button-component";
import Image from "next/image";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/jwt";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

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
      <div className='max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-2'>
        <Link href={process.env.NEXT_PUBLIC_APP_URL || "/"}>
          <Image
            width={72}
            height={72}
            alt='Logo'
            src='/images/logo/open-market-logo.png'
          />
        </Link>

        <div className='w-1/2 md:w-96 relative'>
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
          <ButtonDefaultComponent
            title='Sign Out'
            click={onSignOut}
          />
        )}
      </div>
    </nav>
  );
}
