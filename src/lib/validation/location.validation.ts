import z from "zod";

export const LocationFormSchema = z.object({
  province: z.string().min(3).max(64),
  regencies: z.string().min(3).max(64),
  district: z.string().min(3).max(64),
  village: z.string().min(3).max(64),
  postalCode: z.string().min(5).max(5),
  address: z.string().min(24).max(256),
});
