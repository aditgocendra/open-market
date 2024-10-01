import { getProductInfoService } from "@/lib/services/products.services";

export const getProductInfoAction = async (id: string) => {
  return await getProductInfoService(id);
};
