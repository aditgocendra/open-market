"use client";

import { useFormStatus } from "react-dom";

export const ButtonDefaultComponent = ({
  title,
  click,
  size = "sm",
}: {
  title: string;
  size?: string;
  click?: () => void;
}) => {
  return (
    <button
      type='button'
      className={`bg-slate-800 text-white text-${size} rounded-md px-2.5 py-1.5 mr-1 hover:bg-slate-700`}
      onClick={() => click && click()}>
      {title}
    </button>
  );
};

export const ButtonOutlineComponent = ({
  title,
  click,
}: {
  title: string;
  click?: () => void;
}) => {
  return (
    <button
      type='button'
      className='w-full border border-slate-800 text-slate-800 px-4 py-2 rounded-md mb-3'
      onClick={() => click && click()}>
      {title}
    </button>
  );
};

export const ButtonTextComponent = ({
  text,
  isActive,
  onClickButton,
}: {
  text: string;
  isActive: boolean;
  onClickButton?: () => void;
}) => {
  return (
    <button
      className={`text-sm text-slate-800 ${isActive ? "font-semibold" : ""}`}
      onClick={() => onClickButton && onClickButton()}>
      {text}
    </button>
  );
};

export const ButtonSubmitForm = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type='submit'
      className='flex w-full justify-center bg-slate-800 text-white text-sm rounded-md px-4 py-2 hover:bg-slate-700'>
      {pending ? "Loading..." : title}
    </button>
  );
};
