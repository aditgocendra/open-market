"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TfootComponent({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const generatePagination = () => {
    if (totalPages > 3) {
      return [1, 2, 3];
    }
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  let paginationNumber = generatePagination();
  let activePage = Number(params.get("page")) || 1;

  const handleChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    params.set("limit", event.target.value.toString());
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    params.set("page", event.currentTarget.value.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='py-4 px-4'>
      <nav className='flex justify-end'>
        <button
          type='button'
          disabled={activePage <= 1}
          onClick={() => {
            if (activePage <= 1) return;

            activePage = activePage - 1;

            if (activePage < paginationNumber[0]) {
              paginationNumber = paginationNumber.filter(
                (page) => page <= paginationNumber.length
              );
            }

            params.set("page", activePage.toString());
            replace(`${pathname}?${params.toString()}`);
          }}
          className='p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none '>
          <span aria-hidden='true'>«</span>
          <span className='sr-only'>Previous</span>
        </button>

        {paginationNumber.map((page) => {
          return (
            <button
              key={page}
              type='button'
              value={page}
              onClick={(e) => handleChangePage(e)}
              className={`${
                activePage === page ? "font-bold" : "font-medium"
              } min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none`}
              aria-current='page'>
              {page}
            </button>
          );
        })}

        <button
          type='button'
          disabled={paginationNumber.length === activePage}
          onClick={() => {
            if (paginationNumber.length === activePage) return;

            activePage = activePage + 1;

            if (activePage > paginationNumber.length) {
              paginationNumber = paginationNumber.filter(
                (page) => page > paginationNumber.length
              );
            }

            params.set("page", activePage.toString());
            replace(`${pathname}?${params.toString()}`);
          }}
          className='p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none '>
          <span className='sr-only'>Next</span>
          <span aria-hidden='true'>»</span>
        </button>

        <select
          defaultValue={10}
          className='appearance-none pe-4 ps-4 ml-4 rounded-md py-1.5 text-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm'
          onChange={(e) => handleChangeLimit(e)}>
          <option value={10}>10 / Page</option>
          <option value={25}>25 / Page</option>
          <option value={50}>50 / Page</option>
        </select>
      </nav>
    </div>
  );
}
