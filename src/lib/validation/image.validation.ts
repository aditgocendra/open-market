import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const SingleImageSchema = z.object({
  image: z
    .any()
    .refine((file) => file.size !== 0, "Image is required")
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png formats are supported."
    )
    .refine((file) => file.size < MAX_FILE_SIZE, "Max image size is 1MB."),
});

export const MultipleImageSchema = z
  .any()
  .refine((files) => files.length > 0, "At least one image is required")
  .refine(
    (files) =>
      files.every((file: File) =>
        ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)
      ),
    "Only .jpg, .jpeg, .png formats are supported."
  )
  .refine(
    (files) => files.every((file: File) => file.size < MAX_FILE_SIZE),
    `Max image size is 1MB.`
  );
