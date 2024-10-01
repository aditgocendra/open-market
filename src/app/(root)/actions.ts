"use server";

import { getCategoriesService } from "@/lib/services/categories.services";
import { getProductsService } from "@/lib/services/products.services";

export const getCategoriesAction = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  try {
    const r = await getCategoriesService({ take, skip });

    return { data: r.data, count: r.count };
  } catch (error: unknown) {
    return { errorMessage: (error as Error).message };
  }
};

export const getProductsAction = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  try {
    const r = await getProductsService({ take, skip });
    return { data: r.products, count: r.count };
  } catch (error: unknown) {
    return { errorMessage: (error as Error).message };
  }
};
