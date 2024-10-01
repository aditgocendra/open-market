export interface ProductInfoDto {
  name: string;
  category: string;
  subCategory: string;
  desc: string;
  price: number;
  seen: number;
  totalFav: number;
  totalStock: number;
  totalSold: number;
  rating: number;
  images: string[];
  variant: ProductVariantDto[];
  store: {
    id: string;
    name: string;
    logo: string | null;
  };
}

export interface ProductVariantDto {
  id: number;
  variant: string;
  price: number;
  stock: number;
  image: string | null;
}

export interface ProductCardInfoDto {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  totalSold: number;
  regencies: string;
}
