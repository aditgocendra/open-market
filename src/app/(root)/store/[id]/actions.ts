import { getProductStoreService } from "@/lib/services/products.services";
import { getStoreByIdService } from "@/lib/services/store.services";

export const getStoreByIdAction = async (id: string) => {
  return await getStoreByIdService(id);
};

export const getStoreProductsAction = async (idStore: string) => {
  return await getProductStoreService(idStore);
};
