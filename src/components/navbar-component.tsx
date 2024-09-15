import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { LinkButtonComponent } from "./link-component";

export default function NavbarComponent() {
  return (
    <nav className='border'>
      <div className='max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-5'>
        <Link
          href=''
          className='text-lg font-bold text-slate-800'>
          Open Market
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

        <LinkButtonComponent
          href='/sign-up'
          title='Sign up'
        />
        {/* <Link href={"/sign-in"}>Sign in</Link> */}
        {/* {!session ? (
       
     ) : (
       <ButtonComponent
         title='Sign Out'
         click={onSignOut}
       />
     )} */}
      </div>
    </nav>
  );
}
