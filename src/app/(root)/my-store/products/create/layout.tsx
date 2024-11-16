import { getSubCategoriesAction } from "@/app/(root)/product/actions";
import { CategoryProvider } from "../../context/category.context";
import { getCategoriesAction } from "./actions";

export default async function CreateProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctgs = await getCategoriesAction();
  const subCtgs = await getSubCategoriesAction(ctgs.data[0].id);
  return (
    <CategoryProvider
      defaultCtgs={ctgs.data}
      defaultSubs={subCtgs}>
      {children}
    </CategoryProvider>
  );
}
