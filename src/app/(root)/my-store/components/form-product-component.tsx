"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

import {
  ImageInputComponent,
  TextAreaComponent,
  TextInputComponent,
} from "@/components/input-component";

import {
  ButtonOutlineComponent,
  ButtonSubmitForm,
} from "@/components/button-component";

import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import DialogCategoryComponent from "./dialog-category-component";
import { useCategoryContext } from "../context/category.context";
import { useFormState } from "react-dom";
import { createProductAction } from "../products/create/actions";

interface VariantInput {
  key: number;
  file: File | null;
  variant: string;
  price: number;
  stock: number;
}

export default function FormProductComponent() {
  const dialogCategoryRef = useRef<HTMLDialogElement>(null);

  const { categorySelect, subCategorySelect } = useCategoryContext();

  const [files, setFiles] = useState<File[] | []>([]);
  const [variants, setVariants] = useState<VariantInput[]>([]);

  const [state, action] = useFormState(createProductAction, null);

  const handleFormAction = (formData: FormData) => {
    files.map((file) => {
      formData.append("productImages", file);
    });

    action(formData);
  };
  return (
    <>
      <DialogCategoryComponent dialogCategoryRef={dialogCategoryRef} />

      <form
        action={handleFormAction}
        className='flex flex-col gap-10'>
        {/* Product Information */}
        <div className='border shadow-md rounded-md'>
          <p className='text-md text-slate-800 p-4'>Product Information</p>

          <hr />

          <div className='p-6'>
            <div className='flex items-center justify-center mb-8'>
              {files.length > 0 &&
                files.map((file, i) => {
                  let imageUrl = "";

                  try {
                    imageUrl = URL.createObjectURL(file);
                  } catch (error) {
                    return;
                  }

                  return (
                    <div
                      className='relative w-28 h-28 rounded-md mr-3'
                      key={i}>
                      <Image
                        width={0}
                        height={0}
                        className='w-full rounded-md'
                        src={imageUrl}
                        alt='image-preview'
                      />
                      <button
                        className='bg-gray-200 z-10 absolute top-1 right-1 rounded-md'
                        type='button'
                        onClick={() =>
                          setFiles(files.filter((_, index) => index !== i))
                        }>
                        <AiOutlineClose
                          className='p-1 text-slate-800'
                          size={20}
                        />
                      </button>
                    </div>
                  );
                })}

              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-28 h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 '>
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  Click to upload
                </p>

                <input
                  id='dropzone-file'
                  type='file'
                  accept='image/png, image/jpeg'
                  className='hidden'
                  multiple
                  onChange={(e) => {
                    if (e.target.files !== null) {
                      const fileUploads = Array.from(e.target.files);
                      setFiles([...files, ...fileUploads]);
                    }
                  }}
                />
              </label>
            </div>

            <TextInputComponent
              input='name'
              type='text'
              placeholder='Product Name'
              errorMessage={state?.errors.name?.join()}
            />

            <div className='w-full flex justify-between border rounded-md mb-6 p-2'>
              <p className='text-sm'>{`${categorySelect.name} > ${
                subCategorySelect ? subCategorySelect.name : ""
              }`}</p>

              <input
                type='text'
                name='categoryId'
                value={categorySelect.id}
                hidden
              />

              <input
                type='text'
                name='subCategoryName'
                value={subCategorySelect ? subCategorySelect.name : ""}
                hidden
              />

              <MdEdit
                size={20}
                className='text-slate-800 text-sm cursor-pointer'
                onClick={() => {
                  dialogCategoryRef.current?.showModal();
                }}
              />
            </div>

            <TextAreaComponent
              input='description'
              placeholder='Description'
              errorMessage={state?.errors.description?.join()}
            />
          </div>
        </div>

        {/* Price & Variation */}
        <div className='border shadow-md rounded-md'>
          <p className='text-md text-slate-800 p-4'>Price & Variation</p>

          <hr />

          <div className='p-6'>
            <TextInputComponent
              input='price'
              type='number'
              placeholder='Price'
              errorMessage={state?.errors.price?.join()}
            />

            <TextInputComponent
              input='stock'
              type='number'
              placeholder='Stock'
              errorMessage={state?.errors.stock?.join()}
            />

            <ButtonOutlineComponent
              title='Add Variation'
              click={() => {
                setVariants([
                  ...variants,
                  {
                    key: Math.random(),
                    file: null,
                    variant: "",
                    price: 0,
                    stock: 0,
                  },
                ]);
              }}
            />

            {variants.length > 0 &&
              variants.map((variant, index) => {
                return (
                  <div
                    key={variant.key}
                    className='grid grid-cols-5 gap-6  place-items-center my-6'>
                    <ImageInputComponent
                      input={"variantImage" + index}
                      rectangle
                      size={80}
                    />

                    <TextInputComponent
                      input={"variantName" + index}
                      type='text'
                      defaultValue={variant.variant || ""}
                      placeholder='Variation Name'
                    />

                    <TextInputComponent
                      input={"variantPrice" + index}
                      type='number'
                      placeholder='Variation Price'
                    />

                    <TextInputComponent
                      input={"variantStock" + index}
                      type='number'
                      placeholder='Variation Stock'
                    />

                    <FaRegTrashAlt
                      size={20}
                      className='text-slate-800 cursor-pointer mb-6'
                      onClick={() => {
                        setVariants(
                          variants.filter((v) => v.key !== variant.key)
                        );
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <ButtonSubmitForm title='Create Product' />
      </form>
    </>
  );
}
