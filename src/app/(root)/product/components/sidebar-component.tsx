"use client";

import { ButtonTextComponent } from "@/components/button-component";
import { SubCategoryDto } from "@/lib/dto/sub-category.dto";
import { toCapitalize } from "@/lib/utils/format";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SidebarProductPageComponent({
  subCategories,
}: {
  subCategories: SubCategoryDto[];
}) {
  const filters = ["trending", "best seller", "favorite", "latest"];
  const price = ["highest", "lower"];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const onClickMenu = ({ menu, param }: { menu: string; param: string }) => {
    params.set(param, menu);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='min-w-[256px]'>
      {/* Sub Category */}
      <LayoutMenu title='Categories'>
        {subCategories &&
          subCategories.map((subCategory, index) => (
            <ButtonTextComponent
              key={index}
              text={toCapitalize(subCategory.name)}
              isActive={params.get("sub") === subCategory.name}
              onClickButton={() =>
                onClickMenu({ menu: subCategory.name, param: "sub" })
              }
            />
          ))}
      </LayoutMenu>
      {/* Filter */}
      <LayoutMenu title='Filter'>
        {filters.map((filter, index) => (
          <ButtonTextComponent
            key={index}
            text={toCapitalize(filter)}
            isActive={params.get("filter") === filter}
            onClickButton={() => onClickMenu({ menu: filter, param: "filter" })}
          />
        ))}
      </LayoutMenu>
      {/* Price */}
      <LayoutMenu title='Price'>
        {price.map((price, index) => (
          <ButtonTextComponent
            key={index}
            text={toCapitalize(price)}
            isActive={params.get("price") === price}
            onClickButton={() => onClickMenu({ menu: price, param: "price" })}
          />
        ))}
      </LayoutMenu>
    </div>
  );
}

const LayoutMenu = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className='mb-10 flex flex-col items-start text-start'>
      <h3 className='font-semibold text-md mb-3'>{title}</h3>
      {children}
    </div>
  );
};
