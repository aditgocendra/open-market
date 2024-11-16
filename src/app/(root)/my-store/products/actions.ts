import { getProductsService } from "@/lib/services/products.services";

export default async function getProductsAction({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) {
  // const uid = await getUidSession();
  // const store = await getStoreByIdService(uid);

  try {
    const r = await getProductsService({ take, skip });

    return { data: r.products, count: r.count };
  } catch (error) {
    return { errorMessage: (error as Error).message };
  }
}
