"use client";

import { TextInputComponent } from "@/components/input-component";

import { useFormState } from "react-dom";
import { signUpAction } from "./actions";
import { ButtonSubmitForm } from "@/components/button-component";
import { LinkTextComponent } from "@/components/link-component";
import { AlertComponent } from "@/components/alert-component";

export default function SignUpPage() {
  // return <FormAuthComponent route='sign-up' />;
  const [state, action] = useFormState(signUpAction, null);

  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-sm shadow-sm border p-8 rounded-lg'>
      <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-slate-800 mb-10'>
        Sign Up
      </h2>

      <form
        className='space-y-6 mb-3'
        action={action}>
        <TextInputComponent
          input='username'
          placeholder='Username'
          type='text'
          errorMessage={state?.errors?.username?.join()}
        />
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

        <TextInputComponent
          input='confirmPassword'
          placeholder='Confirm Password'
          type='password'
          errorMessage={state?.errors?.confirmPassword?.join()}
        />

        <ButtonSubmitForm title='Sign Up' />
      </form>

      {state?.success && (
        <AlertComponent
          title='Sign up success'
          message='Please verify your email and sign in'
        />
      )}

      {state?.errorMessage && (
        <AlertComponent
          alertType='warning'
          title='Sign up failed'
          message={state?.errorMessage}
        />
      )}

      <p className='mt-10 text-center text-sm text-gray-500'>
        Already have account ?
        <LinkTextComponent
          href='/sign-in'
          text=' Sign In'
        />
      </p>
    </div>
  );
}
