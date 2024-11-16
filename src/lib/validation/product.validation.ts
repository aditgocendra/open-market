import z from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(12).max(128),
  categoryId: z.string(),
  subCategoryName: z.string(),
  description: z.string().max(256),
  price: z.string().refine(
    (v) => {
      const n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid number" }
  ),
  stock: z.string().refine(
    (v) => {
      const n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid number" }
  ),
});
