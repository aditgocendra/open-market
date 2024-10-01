import { ProductInfoDto } from "@/lib/dto/product.dto";
import { getProductInfoAction } from "./actions";

import ProductDetailComponent from "./components/product-detail-component";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product: ProductInfoDto = await getProductInfoAction(params.slug);

  return <ProductDetailComponent product={product} />;
}
