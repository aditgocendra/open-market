"use server";

import { createUserService } from "@/lib/services/user.services";
import { SignUpFormSchema } from "@/lib/validation/user.validation";
import bcrypt from "bcrypt";

export async function signUpAction(_: any, formData: FormData) {
  // Validation Fields
  const validation = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  // Signup User
  const { username, email, password } = validation.data;
  const hash = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS as string)
  );

  try {
    await createUserService({
      username,
      email,
      password: hash,
    });

    return { success: true };
  } catch (error: unknown) {
    return { errorMessage: (error as Error).message };
  }
}
