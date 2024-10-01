import { PrismaClient } from "@prisma/client";
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

  // Create user
  const user = await prisma.user.create({
    data: {
      username: "Test",
      email: "test@123",
      password: "admin123",
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
