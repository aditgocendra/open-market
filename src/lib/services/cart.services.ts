import { CartDto, ItemCartDto } from "../dto/cart.dto";
import { BaseError } from "../errors";
import prisma from "../prisma.init";

export const createCartService = async ({
  uid,
  productId,
  variantId,
  qty,
}: {
  uid: string;
  productId: string;
  variantId?: number;
  qty: number;
}) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { uid, productId, variantId },
    });

    if (cart) {
      const newQty = cart.qty + qty;
      return await prisma.cart.update({
        where: { id: cart.id },
        data: { qty: newQty },
      });
    }

    return await prisma.cart.create({
      data: {
        uid,
        productId,
        variantId,
        qty,
      },
    });
  } catch (error) {
    throw new BaseError("Failed to create cart");
  }
};

export const getCartByUidService = async ({
  uid,
  take,
  skip,
}: {
  uid: string;
  take: number;
  skip: number;
}) => {
  try {
    const r = await prisma.cart.findMany({
      where: { uid },
      take,
      skip,
      select: {
        id: true,
        qty: true,
        variant: {
          select: {
            id: true,
            variant: true,
            price: true,
            image: true,
            stock: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            productImages: { select: { image: true } },
            detailProduct: {
              select: {
                totalStock: true,
              },
            },
            store: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    const carts: CartDto[] = [];

    r.map((item) => {
      const itemCart: ItemCartDto = {
        cartId: item.id,
        productId: item.product.id,
        productName: item.product.name,
        productImage:
          item.variant?.image || item.product.productImages[0].image,
        price: item.variant?.price || item.product.price,
        qty: item.qty,
        stock: item.variant
          ? item.variant.stock
          : item.product.detailProduct?.totalStock || 0,
        variantId: item.variant?.id || null,
        variantName: item.variant?.variant || null,
      };

      const cart = carts.map((i) => {
        if (i.store.name === item.product.store.name) {
          return i;
        }
      });

      if (!cart[0]) {
        carts.push({
          store: {
            name: item.product.store.name || "",
            logo: item.product.store.logo || "",
          },
          items: [itemCart],
        });
      } else {
        carts[carts.indexOf(cart[0])].items.push(itemCart);
      }
    });

    return carts;
  } catch (error) {
    throw new BaseError("Failed to fetch cart");
  }
};

export const updateCartService = async ({
  id,
  qty,
}: {
  id: string;
  qty: number;
}) => {
  if (qty < 1) {
    throw new BaseError("Qty must be greater than 0");
  }

  try {
    return await prisma.cart.update({
      where: { id },
      data: { qty },
    });
  } catch (error) {
    throw new BaseError("Failed to update cart");
  }
};

export const removeCartService = async (cartId: string) => {
  try {
    return await prisma.cart.delete({ where: { id: cartId } });
  } catch (error) {
    throw new BaseError("Failed to remove cart");
  }
};
