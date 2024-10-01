"use client";

import { TextInputComponent } from "@/components/input-component";
import { useFormState } from "react-dom";
import { signInAction } from "./actions";
import { ButtonSubmitForm } from "@/components/button-component";
import { AlertComponent } from "@/components/alert-component";
import { LinkTextComponent } from "@/components/link-component";

export default function SignInPage() {
  const [state, action] = useFormState(signInAction, null);
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-sm shadow-sm border p-8 rounded-lg'>
      <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-slate-800 mb-10'>
        Sign In
      </h2>

      <form
        className='space-y-6 mb-3'
        action={action}>
        <TextInputComponent
          input='email'
          placeholder='Email'
          type='email'
          errorMessage={state?.errors?.email?.join()}
        />

        <TextInputComponent
          input='password'
          placeholder='Password'
          type='password'
          errorMessage={state?.errors?.password?.join()}
        />

        <ButtonSubmitForm title='Sign In' />
      </form>

      {state?.errorMessage && (
        <AlertComponent
          alertType='warning'
          title='Sign up failed'
          message={state?.errorMessage}
        />
      )}

      <p className='mt-10 text-center text-sm text-gray-500'>
        Not have account ?
        <LinkTextComponent
          href='/sign-up'
          text=' Sign Up'
        />
      </p>
    </div>
  );
}
