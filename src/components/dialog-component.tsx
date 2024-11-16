"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { CiWarning } from "react-icons/ci";

export default function DialogComponent({
  title,
  onOk,
  onCancel,
}: {
  title: string;
  onOk: () => void;
  onCancel?: () => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const dialogRef = useRef<null | HTMLDialogElement>(null);

  // Parameter dialog
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onCancel && onCancel();
    replace(pathname);
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  return (
    showDialog === "y" && (
      <dialog
        ref={dialogRef}
        className='z-10'>
        <div
          className='relative z-10'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <CiWarning
                        size={24}
                        className='text-red-800'
                      />
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <h3
                        className='text-base font-semibold leading-6 text-gray-900'
                        id='modal-title'>
                        {title}
                      </h3>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Are you sure you want to delete this data? this data
                          will be permanently removed. This action cannot be
                          undo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='button'
                    onClick={clickOk}
                    className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'>
                    Delete
                  </button>
                  <button
                    type='button'
                    onClick={closeDialog}
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    )
  );
}
