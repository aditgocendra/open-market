import { HeadTableComponent } from "@/components/table/thead-component";

import TfootComponent from "@/components/table/tfoot-component";
import TbodyComponent from "@/components/table/tbody-component";
import TdComponent from "@/components/table/td-component";
import { ButtonDefaultComponent } from "@/components/button-component";
import getProductsAction from "./actions";

export default async function ManageProductPage() {
  const products = await getProductsAction({ take: 10, skip: 0 });

  console.log("products", products);
  return (
    <table className='min-w-full divide-y divide-gray-200 border shadow-sm '>
      <HeadTableComponent
        title={"Product"}
        description={`A list of Products, you can manage them here.`}
        attributes={["image", "name", "price", "stock", "sales"]}
        // skipAttr={skip}
        datas={null}
        colSpan={4}
        linkCreate='/my-store/products/create'
      />
      <TbodyComponent>
        <tr>
          <TdComponent position='center'>
            <div className='flex items-center'>
              <input
                id='hs-table-checkbox-all'
                type='checkbox'
                // checked={selectIds.includes(data.id)}
                // onChange={(e) => onCheckChildCheckbox(e, data.id)}
                className='border-gray-200 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:focus:ring-offset-gray-800'
              />
            </div>
          </TdComponent>

          {["image", "name", "price", "stock", "sales"].map((attribute) => {
            // if (skip?.includes(attribute)) return null;
            return (
              <TdComponent
                key={attribute}
                position='left'>
                {attribute.toString()}
              </TdComponent>
            );
          })}

          <TdComponent position='center'>
            <ButtonDefaultComponent
              title='Edit'
              size='xs'
              // click={() => replace(`${pathname}/edit/${data.id}`)}
            />

            <ButtonDefaultComponent
              title='Delete'
              size='xs'
              // click={() => {
              //   if (selectIds !== null) {
              //     selectIds.push(data.id);
              //     params.set(
              //       "select",
              //       encodeURIComponent(selectIds.toString())
              //     );
              //   }

              //   replace(`${pathname}?${params.toString()}&showDialog=y`);
              // }}
            />
          </TdComponent>
        </tr>
      </TbodyComponent>

      <tfoot>
        <tr>
          <th colSpan={6}>
            <TfootComponent totalPages={0} />
          </th>
        </tr>
      </tfoot>
    </table>
  );
}
