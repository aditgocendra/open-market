"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LinkButtonComponent } from "../link-component";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export const HeadTableComponent = ({
  linkCreate,
  title,
  description,
  datas,
  colSpan,
  attributes,
  skipAttr = [],
}: {
  linkCreate?: string;
  title: string;
  description: string;
  datas: any[] | null;
  attributes: string[];
  colSpan: number;
  skipAttr?: string[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const keyword = params.get("keyword");

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (!keyword) {
      params.set("keyword", searchInput);
    }

    if (searchInput === "") {
      params.delete("keyword");
      setSearchInput("");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      params.set("select", encodeURIComponent(datas!.toString()));
    } else {
      params.delete("select");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <thead>
      <tr>
        <th
          colSpan={colSpan}
          className='p-10'>
          <div className='flex flex-wrap justify-between items-center pb-5'>
            <div className='text-start'>
              <p className='text-md text-slate-800 font-semibold mb-1'>
                {title}
              </p>
              <p className='text-sm font-normal text-slate-600'>
                {description}
              </p>
            </div>

            {linkCreate && (
              <LinkButtonComponent
                href={linkCreate}
                title='Create'
              />
            )}
          </div>

          <div className='flex justify-between items-center'>
            <div className='pt-2 relative text-gray-600'>
              <input
                className='border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:slate-800'
                name='search'
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={`Search ${title}`}
              />
              <button
                type='button'
                className='absolute right-0 top-0 mt-5 mr-4 text-slate-800'
                onClick={() => handleSearch()}>
                <BiSearch />
              </button>
            </div>
            <Link
              href={`?${params.toString()}&showDialog=y`}
              hidden={params.get("select") === null ? true : false}
              className='text-white text-sm bg-red-600 px-4 py-2 rounded-md'>
              Delete
            </Link>
          </div>
        </th>
      </tr>

      {attributes && (
        <tr className='font-bold bg-gray-100'>
          <th
            scope='col'
            className='px-6 py-3'>
            <div className='flex items-center'>
              <input
                id='hs-table-checkbox-all'
                type='checkbox'
                checked={params.get("select") === null ? false : true}
                onChange={onCheck}
                className='border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
              />
            </div>
          </th>

          {attributes.map((attribute: string) => {
            if (skipAttr?.includes(attribute)) return null;
            return (
              <th
                key={attribute}
                scope='col'
                className='px-6 py-3 text-left text-sm text-slate-800 '>
                {attribute.replace(/^./, attribute[0].toUpperCase())}
              </th>
            );
          })}

          <th
            scope='col'
            className='px-6 py-3 text-center text-sm text-slate-800 '>
            Actions
          </th>
        </tr>
      )}
    </thead>
  );
};
