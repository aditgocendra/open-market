import prisma from "../../lib/prisma.init";
import { ProductCardInfoDto, ProductInfoDto } from "../dto/product.dto";

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
  keyword?: string;
  filter?: string;
  take: number;
  skip: number;
}) => {
  try {
    const [products, count] = await prisma.$transaction([
      prisma.product.findMany({
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
          productImages: { select: { image: true }, where: { isThumb: true } },
          detailProduct: { select: { rating: true, totalSold: true } },
          store: { select: { location: { select: { regencies: true } } } },
        },
        orderBy: {
          ...(filter === "latest" ? { createdAt: "desc" } : {}),
          detailProduct: {
            ...(filter === "bestSeller" ? { totalSold: "desc" } : {}),
            ...(filter === "favorite" ? { totalFav: "desc" } : {}),
            ...(filter === "trending" ? { seen: "desc" } : {}),
          },
        },
      }),
      prisma.product.count({
        where: {
          name: { contains: keyword, mode: "insensitive" },
          ...(idCategory ? { idCategory } : {}),
          ...(subCategory ? { nameSubCategory: subCategory } : {}),
        },
      }),
    ]);

    return { products, count };

    // return await prisma.product.findMany({
    //   take,
    //   skip,
    //   where: {
    //     name: { contains: keyword, mode: "insensitive" },
    //     ...(idCategory ? { idCategory } : {}),
    //     ...(subCategory ? { nameSubCategory: subCategory } : {}),
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     price: true,
    //     productImages: { select: { image: true }, where: { isThumb: true } },
    //     detailProduct: { select: { rating: true, totalSold: true } },
    //     store: { select: { location: { select: { regencies: true } } } },
    //   },
    //   orderBy: {
    //     ...(filter === "latest" ? { createdAt: "desc" } : {}),
    //     detailProduct: {
    //       ...(filter === "bestSeller" ? { totalSold: "desc" } : {}),
    //       ...(filter === "favorite" ? { totalFav: "desc" } : {}),
    //       ...(filter === "trending" ? { seen: "desc" } : {}),
    //     },
    //   },
    // });
  } catch (error) {
    throw new Error("Failed to fetch category");
  }
};

export const getProductInfoService = async (id: string) => {
  try {
    const r = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        category: { select: { name: true } },
        nameSubCategory: true,
        detailProduct: true,
        productImages: true,
        variantProduct: true,
        store: true,
      },
    });

    const productInfo: ProductInfoDto = {
      name: r?.name || "",
      category: r?.category?.name || "",
      subCategory: r?.nameSubCategory || "",
      desc: r?.detailProduct?.description || "",
      price: r?.price || 0,
      rating: r?.detailProduct?.rating || 0.0,
      seen: r?.detailProduct?.seen || 0,
      totalFav: r?.detailProduct?.totalFav || 0,
      totalStock: r?.detailProduct?.totalStock || 0,
      totalSold: r?.detailProduct?.totalSold || 0,
      images: r?.productImages?.map((p) => p.image) || [],
      variant:
        r?.variantProduct.map((v) => {
          return {
            id: v.id,
            variant: v.variant,
            price: v.price,
            stock: v.stock,
            image: v.image || null,
          };
        }) || [],
      store: {
        id: r?.store?.id || "",
        name: r?.store?.name || "",
        logo: r?.store?.logo || null,
      },
    };

    return productInfo;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};

export const getProductStoreService = async (idStore: string) => {
  try {
    const r = await prisma.product.findMany({
      where: { idStore },
      select: {
        id: true,
        name: true,
        price: true,
        detailProduct: {
          select: {
            rating: true,
            totalSold: true,
          },
        },
        productImages: { select: { image: true }, where: { isThumb: true } },
        store: {
          select: {
            location: {
              select: {
                regencies: true,
              },
            },
          },
        },
      },
    });

    const storeProducts: ProductCardInfoDto[] = r.map((p) => {
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.productImages[0]!.image,
        rating: p.detailProduct!.rating,
        totalSold: p.detailProduct!.totalSold,
        regencies: p.store.location.regencies,
      };
    });

    return storeProducts;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
