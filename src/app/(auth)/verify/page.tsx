"use client";

import { LinkButtonComponent } from "@/components/link-component";
import { useFormState } from "react-dom";
import { verifyEmailAction } from "./actions";
import { MdError, MdOutlineVerified } from "react-icons/md";
import { ButtonSubmitForm } from "@/components/button-component";

export default function VerifyPage({
  searchParams,
}: {
  searchParams?: { token?: string };
}) {
  const token = searchParams?.token;
  const bind = verifyEmailAction.bind(null, token!);

  const [state, action] = useFormState(bind, null);

  return (
    <div className='rounded-lg bg-white text-left shadow-xl sm:w-full sm:max-w-lg'>
      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
        <div className='sm:flex sm:items-start'>
          <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10'>
            {state?.errorMessage ? (
              <MdError
                size={24}
                className='text-red-600'
              />
            ) : (
              <MdOutlineVerified
                size={24}
                className='text-slate-800'
              />
            )}
          </div>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <h3 className='text-md font-semibold leading-6 text-gray-900'>
              Verification Your Email
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                {state?.success
                  ? "Your email has been verified."
                  : state?.errorMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        {state?.success ? (
          <LinkButtonComponent
            title='Sign in'
            href='/sign-in'
          />
        ) : (
          <form action={action}>
            <ButtonSubmitForm title='Verify' />
          </form>
        )}
      </div>
    </div>
  );
}
