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
      regencies: r?.location!.regencies || "",
      createdAt: r?.createdAt || new Date(),
    };

    return storeDetail;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getMyStoreInformationService = async (uid: string) => {
  try {
    return await prisma.store.findUnique({
      where: {
        userId: uid,
      },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const setStoreInformationService = async ({
  uid,
  data,
}: {
  uid: string;
  data: any;
}) => {
  try {
    return await prisma.store.upsert({
      where: {
        userId: uid,
      },
      create: {
        userId: uid,
        ...data,
      },
      update: {
        ...data,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const updateStoreService = async ({
  uid,
  data,
}: {
  uid: string;
  data: any;
}) => {
  try {
    return await prisma.store.update({ where: { userId: uid }, data });
  } catch (error) {
    throw new Error("Something wrong, please wait a seconds");
  }
};
