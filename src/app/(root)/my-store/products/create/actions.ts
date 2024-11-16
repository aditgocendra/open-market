"use server";

import { ProductInputDto } from "@/lib/dto/product.dto";
import { getCategoriesService } from "@/lib/services/categories.services";
import { createProductService } from "@/lib/services/products.services";
import { getMyStoreInformationService } from "@/lib/services/store.services";
import { getSubCategoriesService } from "@/lib/services/sub-categories.services";
import { getUidSession } from "@/lib/session";
import { uploadImage } from "@/lib/utils/image";
import { MultipleImageSchema } from "@/lib/validation/image.validation";
import { ProductFormSchema } from "@/lib/validation/product.validation";
import path from "path";

export const getCategoriesAction = async () => {
  return await getCategoriesService({ take: 20, skip: 0 });
};

export const getSubCategoryAction = async (idCategory: string) => {
  return await getSubCategoriesService(idCategory);
};

export const createProductAction = async (_: any, formData: FormData) => {
  const validation = ProductFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  const validationImages = MultipleImageSchema.safeParse(
    formData.getAll("productImages")
  );

  if (!validationImages.success) {
    return { errors: validationImages.error.flatten().fieldErrors };
  }

  // Get Store Id
  const uid = await getUidSession();
  const store = await getMyStoreInformationService(uid);

  if (!store) {
    return { errorMessage: "Store not found" };
  }

  try {
    const productImages: File[] = validationImages.data;

    const uploadDir = path.join(
      process.cwd() + "/public",
      `/images/product/${store?.id}`
    );

    const resultImages = await Promise.all(
      productImages.map(async (file) => {
        const r = await uploadImage({
          file,
          uploadDir,
        });

        return `${store.id}/${r}`;
      })
    );

    const product: ProductInputDto = {
      name: validation.data.name,
      idCategory: validation.data.categoryId,
      subCategoryName: validation.data.subCategoryName,
      price: parseInt(validation.data.price),
      stock: parseInt(validation.data.stock),
      description: validation.data.description,
      images: resultImages,
      idStore: store.id,
    };

    await createProductService({ data: product });
  } catch (error: any) {
    return { errorMessage: error.message };
  }
};
