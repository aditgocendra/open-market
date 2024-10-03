import prisma from "../prisma.init";

export const getRoleService = async (role: string) => {
  try {
    return await prisma.role.findUnique({ where: { role } });
  } catch (error) {
    throw new Error("Something wrong, please wait a seconds");
  }
};
