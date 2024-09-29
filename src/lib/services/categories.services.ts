import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.init";
import { BaseError } from "../errors";

export const getCategoriesService = async ({
  take,
  skip,
  keyword,
}: {
  take: number;
  skip: number;
  keyword?: string;
}) => {
  const query: Prisma.CategoryFindManyArgs = {
    take: take,
    skip: skip,
    orderBy: { name: "asc" },
    where: { name: { contains: keyword, mode: "insensitive" } },
  };

  try {
    const [categories, count] = await prisma.$transaction([
      prisma.category.findMany(query),
      prisma.category.count(keyword ? { where: query.where } : undefined),
    ]);

    return { data: categories, count };
  } catch (error) {
    throw new BaseError("Failed to fetch categories");
  }
};
