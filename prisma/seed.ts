import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  categoriesMaster,
  productMaster,
  subCategoriesMaster,
} from "./data-master";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  await prisma.category.createMany({
    data: categoriesMaster,
  });

  // Create Sub Categories
  await prisma.subCategory.createMany({
    data: subCategoriesMaster,
  });

  // Create Role
  await prisma.role.createMany({
    data: [
      {
        role: "admin",
      },
      {
        role: "user",
      },
    ],
  });

  // Get Role Admin
  const roleAdmin = await prisma.role.findFirst({ where: { role: "admin" } });

  // Hash Pass Admin
  const hashAdmin = await bcrypt.hash(
    "admin1234",
    parseInt(process.env.SALT_ROUNDS as string)
  );

  // Create admin
  await prisma.user.create({
    data: {
      username: "Admin Test",
      email: "admin_test@gmail.com",
      password: hashAdmin,
      roleId: roleAdmin!.id,
    },
  });

  // Get Role User
  const roleUser = await prisma.role.findFirst({ where: { role: "user" } });

  // Hash Pass User
  const hashUser = await bcrypt.hash(
    "user1234",
    parseInt(process.env.SALT_ROUNDS as string)
  );

  // Create user
  const user = await prisma.user.create({
    data: {
      username: "Test",
      email: "user_test@gmail.com",
      password: hashUser,
      roleId: roleUser!.id,
    },
  });

  // Create Location
  const location = await prisma.location.create({
    data: {
      province: "Lampung",
      regencies: "Kota Bandar Lampung",
      district: "Kec Kedamaian",
      village: "Kel Tanjung Baru",
      postalCode: "35132",
      address: "Jl. Hayam Wuruk Gg Prajurit 02 Nomor 90",
      userId: user.uid,
    },
  });

  // Create Store
  const store = await prisma.store.create({
    data: {
      name: "Test Store",
      userId: user.uid,
      logo: "electron-logo.png",
      locationId: location.id,
    },
  });

  // Create Product
  const r = await prisma.product.create({
    data: {
      ...productMaster,
      idStore: store.id,
    },
  });

  // Create Product Image
  await prisma.productImage.create({
    data: {
      image: "test.jpg",
      isThumb: true,
      idProduct: r.id,
    },
  });

  // Create Detail Product
  await prisma.detailProduct.create({
    data: {
      idProduct: r.id,
      description: "This is description",
      seen: 0,
      totalFav: 0,
      totalSold: 0,
      totalStock: 0,
    },
  });

  // Create Variant Product
  await prisma.variantProduct.createMany({
    data: [
      {
        variant: "Black",
        price: 120000,
        image: "test.jpg",
        idProduct: r.id,
      },
      {
        variant: "White",
        price: 125000,
        image: "test.jpg",
        idProduct: r.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
