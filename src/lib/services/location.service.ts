import { BaseError } from "../errors";
import prisma from "../prisma.init";
import { LocationDto } from "../dto/location.dto";

export const createLocationService = async (data: any) => {
  try {
    console.log(data);
    return await prisma.location.create({ data });
  } catch (error) {
    console.log(error);
    throw new BaseError("Something wrong, please wait a seconds");
  }
};

export const getLocationService = async ({
  uid,
  storeId,
}: {
  uid: string;
  storeId?: string;
}) => {
  try {
    console.log(uid);
    const r = await prisma.location.findFirst({
      where: {
        userId: uid,
        ...(storeId ? { store: { id: storeId } } : {}),
      },
    });

    const location: LocationDto = {
      id: r?.id || "",
      province: r?.province || "",
      regencies: r?.regencies || "",
      district: r?.district || "",
      village: r?.village || "",
      postalCode: r?.postalCode || "",
      address: r?.address || "",
    };

    return location;
  } catch (error) {
    throw new BaseError("Something wrong, please wait a seconds");
  }
};
