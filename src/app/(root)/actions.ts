"use server";

import { getCategoriesService } from "@/lib/services/categories.services";

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
