import { z } from "zod";

export const CreateStoreFormSchema = z.object({
  name: z.string().min(6).max(24),
  description: z.string().max(256).optional(),
});
