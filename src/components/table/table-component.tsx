"use client";

import PaginationComponent from "@/components/table/tfoot-component";
import TbodyComponent from "@/components/table/tbody-component";
import TdComponent from "@/components/table/td-component";
import DialogComponent from "@/components/dialog-component";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HeadTableComponent } from "@/components/table/thead-component";
import { ButtonDefaultComponent } from "@/components/button-component";

export default function TableComponent({
  datas,
  totalPages,
  table,
  skip,
  colSpan,
  linkCreate,
  deleteAction,
}: {
  datas: any[] | null;
  totalPages: number;
  table: string;
  skip?: string[];
  colSpan: number;
  linkCreate: string;
  deleteAction?: (ids: string[]) => Promise<any>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const attributes = datas ? Object.keys(datas[0]!) : null;
  const title = table.replace(/^./, table[0].toUpperCase());

  const selectIds: string[] =
    params.get("select") !== null
      ? decodeURIComponent(params.get("select")!).split(",")
      : [];

  const onDelete = async () => {
    if (selectIds.length <= 0) return;

    deleteAction && (await deleteAction(selectIds));
  };

  const onCheckChildCheckbox = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.currentTarget.checked) {
      selectIds.push(id);
      params.set("select", encodeURIComponent(selectIds.toString()));
    } else {
      selectIds.splice(selectIds.indexOf(id), 1);

      if (selectIds.length === 0) {
        params.delete("select");
      } else {
        params.set("select", encodeURIComponent(selectIds.toString()));
      }
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <DialogComponent
        title={`Delete ${title}`}
        onOk={onDelete}
      />

      <table className='min-w-full divide-y divide-gray-200 border shadow-sm '>
        <HeadTableComponent
          title={title}
          description={`A list of ${table}`}
          attributes={["name", "price"]}
          skipAttr={skip}
          datas={datas ? datas.map((data: any) => data.id) : null}
          colSpan={colSpan}
          linkCreate={linkCreate}
        />

        <TbodyComponent>
          {datas &&
            datas.map((data: any) => {
              return (
                <tr key={data.id}>
                  <TdComponent position='center'>
                    <div className='flex items-center'>
                      <input
                        id='hs-table-checkbox-all'
                        type='checkbox'
                        checked={selectIds.includes(data.id)}
                        onChange={(e) => onCheckChildCheckbox(e, data.id)}
                        className='border-gray-200 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:focus:ring-offset-gray-800'
                      />
                    </div>
                  </TdComponent>

                  {attributes &&
                    attributes.map((attribute) => {
                      if (skip?.includes(attribute)) return null;
                      return (
                        <TdComponent
                          key={attribute}
                          position='left'>
                          {data[attribute].toString()}
                        </TdComponent>
                      );
                    })}

                  <TdComponent position='center'>
                    <ButtonDefaultComponent
                      title='Edit'
                      size='xs'
                      click={() => replace(`${pathname}/edit/${data.id}`)}
                    />

                    <ButtonDefaultComponent
                      title='Delete'
                      size='xs'
                      click={() => {
                        if (selectIds !== null) {
                          selectIds.push(data.id);
                          params.set(
                            "select",
                            encodeURIComponent(selectIds.toString())
                          );
                        }

                        replace(
                          `${pathname}?${params.toString()}&showDialog=y`
                        );
                      }}
                    />
                  </TdComponent>
                </tr>
              );
            })}
        </TbodyComponent>

        <tfoot>
          <tr>
            <th colSpan={colSpan}>
              <PaginationComponent totalPages={totalPages} />
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
