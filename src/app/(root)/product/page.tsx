import { SubCategoryDto } from "@/lib/dto/sub-category.dto";
import { getProductsAction, getSubCategoriesAction } from "./actions";

// Components
import ProductComponent from "@/components/product-component";
import SidebarProductPageComponent from "./components/sidebar-component";

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: { category?: string; sub?: string };
}) {
  // Sub Categories
  let subCategories: SubCategoryDto[] = [];

  if (searchParams?.category) {
    await getSubCategoriesAction(searchParams.category).then(
      (data) => (subCategories = data)
    );
  }

  // Products
  const products = await getProductsAction({
    take: 10,
    skip: 0,
    keyword: "",
    idCategory: searchParams?.category || "",
    subCategory: searchParams?.sub || "",
    filter: "",
  });

  return (
    <div className='max-w-screen-xl mx-auto flex justify-center items-start p-6'>
      {/* Sidebar */}
      <SidebarProductPageComponent subCategories={subCategories} />

      {/* Content */}
      {products.count != 0 && products.data ? (
        <div className='grid grid-cols-4 gap-5 items-center ml-10'>
          {products.data.map((product, index) => {
            return (
              <ProductComponent
                key={index}
                id={product.id}
                name={product.name}
                image={product.productImages[0].image}
                price={product.price}
                rating={product.detailProduct!.rating!}
                sold={product.detailProduct!.totalSold!}
                regencies={product.store.location.regencies}
              />
            );
          })}
        </div>
      ) : (
        <div className='w-full flex justify-center'>Product not found</div>
      )}
    </div>
  );
}
