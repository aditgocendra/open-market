import prisma from "../../lib/prisma.init";

export const getProductsService = async ({
  idCategory,
  subCategory,
  keyword,
  take,
  skip,
  filter,
}: {
  idCategory?: string;
  subCategory?: string;
  keyword: string;
  take: number;
  skip: number;
  filter: string;
}) => {
  try {
    return await prisma.product.findMany({
      take,
      skip,
      where: {
        name: { contains: keyword, mode: "insensitive" },
        ...(idCategory ? { idCategory } : {}),
        ...(subCategory ? { nameSubCategory: subCategory } : {}),
      },
      select: {
        id: true,
        name: true,
        price: true,
        ProductImages: { select: { image: true }, where: { isThumb: true } },
      },
      orderBy: {
        ...(filter === "latest" ? { createdAt: "desc" } : {}),
        DetailProduct: {
          ...(filter === "bestSeller" ? { totalSold: "desc" } : {}),
          ...(filter === "favorite" ? { totalFav: "desc" } : {}),
          ...(filter === "trending" ? { seen: "desc" } : {}),
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch category");
  }
};
