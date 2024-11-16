import { getProductsService } from "@/lib/services/products.services";
import { getStoreByIdService } from "@/lib/services/store.services";
import { getUidSession } from "@/lib/session";

export default async function getProductsAction({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) {
  const uid = await getUidSession();
  const store = await getStoreByIdService(uid);

  try {
    const r = await getProductsService({ take, skip, idStore: store.id });

    return { data: r.products, count: r.count };
  } catch (error) {
    return { errorMessage: (error as Error).message };
  }
}
