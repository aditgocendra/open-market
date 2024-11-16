"use client";

import { CategoryDto } from "@/lib/dto/category.dto";
import { SubCategoryDto } from "@/lib/dto/sub-category.dto";
import { createContext, useContext, useState } from "react";
import { getSubCategoriesAction } from "../../product/actions";

export interface CategoryContextValue {
  categories: CategoryDto[];
  subCategories: SubCategoryDto[];
  categorySelect: CategoryDto;
  subCategorySelect: SubCategoryDto | null;
  onChangeCategorySelect: (ctg: CategoryDto) => void;
  onChangeSubCategorySelect: (subCtg: SubCategoryDto) => void;
}

const CategoryContext = createContext<CategoryContextValue>(
  {} as CategoryContextValue
);

export const CategoryProvider = ({
  children,
  defaultCtgs,
  defaultSubs,
}: {
  children: React.ReactNode;
  defaultCtgs: CategoryDto[];
  defaultSubs: SubCategoryDto[];
}) => {
  const categories = defaultCtgs;
  const [categorySelect, setSelectedCategory] = useState(defaultCtgs[0]);
  const [subCategories, setSubCategories] = useState(defaultSubs);
  const [subCategorySelect, setSubCategorySelect] =
    useState<SubCategoryDto | null>(defaultSubs[0]);

  const onChangeCategorySelect = async (ctg: CategoryDto) => {
    setSelectedCategory(ctg);
    await getSubCategoriesAction(ctg.id).then((data) => {
      setSubCategories(data);
      onChangeSubCategorySelect(data[0]);
    });
  };

  const onChangeSubCategorySelect = async (subCtg: SubCategoryDto) => {
    setSubCategorySelect(subCtg);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        subCategories,
        categorySelect,
        subCategorySelect,
        onChangeCategorySelect,
        onChangeSubCategorySelect,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("CategoryContext not found");
  }

  return context;
};
