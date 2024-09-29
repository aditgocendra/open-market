import prisma from "../../lib/prisma.init";
import { BaseError } from "../errors";

export const getSubCategoriesService = async (idCategory: string) => {
  try {
    const r = await prisma.subCategory.findMany({
      where: { idCategory },
    });

    return r;
  } catch (error) {
    throw new BaseError("Failed to fetch sub categories");
  }
};
