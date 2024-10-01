"use server";

import { getProductsService } from "@/lib/services/products.services";
import { getSubCategoriesService } from "@/lib/services/sub-categories.services";

export const getSubCategoriesAction = async (idCategory: string) => {
  return await getSubCategoriesService(idCategory);
};

export const getProductsAction = async ({
  idCategory,
  subCategory,
  keyword,
  take,
  skip,
  filter,
}: {
  idCategory: string;
  subCategory: string;
  keyword: string;
  take: number;
  skip: number;
  filter: string;
}) => {
  try {
    const r = await getProductsService({
      idCategory,
      subCategory,
      keyword,
      take,
      skip,
      filter,
    });

    return { data: r.products, count: r.count };
  } catch (error: unknown) {
    return { errorMessage: (error as Error).message };
  }
};
