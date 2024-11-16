"use server";

import {
  createLocationService,
  getLocationService,
} from "@/lib/services/location.service";
import {
  getMyStoreInformationService,
  setStoreInformationService,
  updateStoreService,
} from "@/lib/services/store.services";
import { getUidSession } from "@/lib/session";
import { deleteImage, uploadImage } from "@/lib/utils/image";
import { SingleImageSchema } from "@/lib/validation/image.validation";
import { LocationFormSchema } from "@/lib/validation/location.validation";
import { CreateStoreFormSchema } from "@/lib/validation/store.validation";

import path from "path";

export const getStoreInformationAction = async () => {
  const uid = await getUidSession();
  return await getMyStoreInformationService(uid);
};

export const getStoreLocationAction = async ({
  storeId,
}: {
  storeId: string;
}) => {
  const uid = await getUidSession();

  try {
    return await getLocationService({ uid, storeId });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const setStoreInformationAction = async (_: any, formData: FormData) => {
  const uid = await getUidSession();

  const validation = CreateStoreFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  const { name, description } = validation.data;

  try {
    await setStoreInformationService({
      uid,
      data: { name, description },
    });
  } catch (error: any) {
    return { errorMessage: error.message };
  }
};

export const setStoreLogoAction = async (
  oldImage: string | null,
  _: any,
  formData: FormData
) => {
  const uploadDir = path.join(process.cwd() + "/public", "/images/logo");
  const uid = await getUidSession();

  const validation = SingleImageSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  const { image } = validation.data;

  try {
    const r = await uploadImage({ file: image, uploadDir });

    if (r && oldImage) {
      await deleteImage(uploadDir + "/" + oldImage);
    }

    await updateStoreService({ uid, data: { logo: r } });
  } catch (error: any) {
    return { errorMessage: error.message };
  }
};

export const setLocationStoreAction = async (_: any, formData: FormData) => {
  const validation = LocationFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  try {
    const uid = await getUidSession();

    const r = await createLocationService({ ...validation.data, userId: uid });

    await updateStoreService({
      uid: await getUidSession(),
      data: { locationId: r.id },
    });
  } catch (error: any) {
    return { errorMesage: error.message };
  }
};
