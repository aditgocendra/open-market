import { StoreDetailDto } from "../dto/store.dto";
import prisma from "../prisma.init";

export const getStoreByIdService = async (id: string) => {
  try {
    const r = await prisma.store.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        logo: true,
        createdAt: true,
        location: {
          select: {
            regencies: true,
          },
        },
      },
    });

    const storeDetail: StoreDetailDto = {
      id: r?.id || "",
      name: r?.name || "",
      logo: r?.logo || "",
      regencies: r?.location.regencies || "",
      createdAt: r?.createdAt || new Date(),
    };

    return storeDetail;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
