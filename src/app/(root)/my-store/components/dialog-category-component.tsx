import { MutableRefObject } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useCategoryContext } from "../context/category.context";
import { IoMdClose } from "react-icons/io";

export default function DialogCategoryComponent({
  dialogCategoryRef,
}: {
  dialogCategoryRef: MutableRefObject<HTMLDialogElement | null>;
}) {
  const {
    categories,
    subCategories,
    categorySelect,
    subCategorySelect,
    onChangeCategorySelect,
    onChangeSubCategorySelect,
  } = useCategoryContext();

  return (
    <dialog ref={dialogCategoryRef}>
      <div
        className='relative z-10'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'></div>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
              {/* Content */}
              <div className='flex flex-col'>
                <div className='flex justify-between items-center p-4'>
                  <p className='text-sm font-semibold'>Select Category</p>
                  <button
                    type='button'
                    onClick={() => dialogCategoryRef.current?.close()}>
                    <IoMdClose size={20} />
                  </button>
                </div>
                <hr />
                <div className='flex my-6 mx-2'>
                  {/* Categories */}
                  <div className='flex flex-col'>
                    {categories &&
                      categories.map((category) => {
                        return (
                          <div
                            key={category.id}
                            className='flex justify-between items-center p-2 cursor-pointer hover:bg-slate-100 rounded-md'
                            onClick={() => onChangeCategorySelect(category)}>
                            <p className='text-sm'>{category.name}</p>
                            <IoIosArrowForward size={16} />
                          </div>
                        );
                      })}
                  </div>
                  {/* Sub Categories */}
                  <div className='flex flex-col'>
                    {subCategories.length > 0 ? (
                      subCategories.map((subCategory) => {
                        return (
                          <div
                            key={subCategory.name}
                            className='p-2 cursor-pointer hover:bg-slate-100 rounded-md'
                            onClick={() =>
                              onChangeSubCategorySelect(subCategory)
                            }>
                            <p className='text-sm'>{subCategory.name}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className='text-sm p-2'>Nothing sub category</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className='flex p-4'>
                  <p className='text-sm font-semibold'>Selected :</p>
                  <p className='text-sm pl-1'>
                    {`${categorySelect.name} > ${
                      subCategorySelect ? subCategorySelect.name : ""
                    }`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
