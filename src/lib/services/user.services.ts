import { Prisma } from "@prisma/client";
import { BaseError } from "../errors";
import prisma from "../prisma.init";

export const createUserService = async (data: any) => {
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new BaseError("Username or Email already exists");
      }
    }

    throw new BaseError("Something wrong, please wait a seconds");
  }
};

export const getUserByEmailService = async (email: string) => {
  try {
    return await prisma.user.findFirst({ where: { email } });
  } catch (error) {
    throw new Error("Something wrong, please wait a seconds");
  }
};

export const getUserByUidService = async (uid: string) => {
  try {
    return await prisma.user.findFirst({ where: { uid } });
  } catch (error) {
    throw new Error("Something wrong, please wait a seconds");
  }
};

export const updateUserService = async (uid: string, data: any) => {
  try {
    return await prisma.user.update({ where: { uid }, data });
  } catch (error) {
    throw new Error("Something wrong, please wait a seconds");
  }
};
