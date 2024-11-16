"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { IoCamera } from "react-icons/io5";
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
    <div className='mb-3'>
      <input
        id={input}
        name={input}
        autoComplete={input}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className='input-default shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 '
      />

      <p className='text-red-700 text-sm m-1'>{errorMessage}</p>
    </div>
  );
};

export const TextAreaComponent = ({
  input,
  placeholder,
  defaultValue,
  errorMessage,
}: {
  input: string;
  placeholder: string;
  defaultValue?: string;
  errorMessage?: string;
}) => {
  return (
    <div className='mb-6'>
      <textarea
        id={input}
        name={input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className='min-h-56 ps-3 block w-full rounded-md border-0 py-1.5 text-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6'
      />
      <p className='text-red-700 text-sm m-1'>{errorMessage}</p>
    </div>
  );
};

export const ImageInputComponent = ({
  input,
  title,
  defaultValue,
  size,
  rectangle,
}: {
  input: string;
  title?: string;
  defaultValue?: string | null;
  size: number;
  rectangle?: boolean;
}) => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className='flex flex-col justify-center items-center'>
      <label
        htmlFor={input}
        className={`flex flex-col items-center justify-center ${
          rectangle ? "rounded-md" : "rounded-full"
        } w-${size / 4} h-${
          size / 4
        }  border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600`}>
        {image || defaultValue ? (
          <Image
            src={image ? URL.createObjectURL(image) : defaultValue!}
            alt='logo'
            width={size}
            height={size}
            className='rounded-full'
          />
        ) : (
          <IoCamera
            size={size / 2.5}
            className='text-gray-600'
          />
        )}

        <input
          id={input}
          name={input}
          type='file'
          accept='image/png, image/jpeg, image/jpg'
          className='hidden'
          onChange={(e) => {
            if (e.target.files !== null) {
              setImage(e.target.files[0]);
            }
          }}
        />
      </label>

      <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>{title}</p>
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

export const SelectInputComponent = ({
  input,
  options,
  defaultValue,
  onChange,
}: {
  input: string;
  defaultValue?: {
    id: string;
    name: string;
  };
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: {
    id: string;
    name: string;
  }[];
}) => {
  return (
    <select
      id={input}
      name={input}
      disabled={options.length <= 0}
      onChange={(e) => {
        onChange && onChange(e);
      }}
      className='input-default w-full mb-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 '>
      {defaultValue && (
        <option
          data-key={defaultValue.id}
          value={defaultValue.name}>
          {defaultValue.name}
        </option>
      )}
      {options.length > 0 &&
        options.map((option) => (
          <option
            key={option.id}
            data-key={option.id}
            value={option.name}>
            {option.name.replace(/^./, option.name[0].toUpperCase())}
          </option>
        ))}
    </select>
  );
};
