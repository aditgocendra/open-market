export interface CartDto {
  store: {
    name: string;
    logo: string;
  };
  items: ItemCartDto[];
}

export interface ItemCartDto {
  cartId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  qty: number;
  stock: number;
  variantId: number | null;
  variantName: string | null;
}
