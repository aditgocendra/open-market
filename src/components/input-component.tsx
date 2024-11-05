"use client";

import { useState } from "react";
export const TextInputComponent = ({
  input,
  placeholder,
  type,
  defaultValue,
  errorMessage,
}: {
  input: string;
  placeholder: string;
  type: string;
  defaultValue?: string;
  errorMessage?: string;
}) => {
  return (
    <div className='mb-6'>
      <input
        id={input}
        name={input}
        autoComplete={input}
        type={type}
        required
        placeholder={placeholder}
        defaultValue={defaultValue}
        className='input-default shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 '
      />

      <p className='text-red-700 text-sm m-1'>{errorMessage}</p>
    </div>
  );
};

export const CheckboxInputComponent = ({
  label,
  input,
  defaultChecked,
  onClick,
}: {
  label: string;
  input: string;
  defaultChecked: boolean;
  onClick?: (isChecked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);
  return (
    <label className='flex items-center gap-2 text-sm mb-2'>
      <input
        name={input}
        type='checkbox'
        checked={isChecked}
        onChange={(e) => {
          onClick && onClick(e.target.checked);
          setIsChecked(e.target.checked);
        }}
      />
      {label}
    </label>
  );
};
