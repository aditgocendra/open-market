"use server";

import { redirect } from "next/navigation";
import { SignInFormSchema } from "@/lib/validation/user.validation";
import { getUserByEmailService } from "@/lib/services/user.services";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

export async function signInAction(_: any, formData: FormData) {
  // Validation Fields
  const validation = SignInFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  const { email, password } = validation.data;

  try {
    // Check user exists or not
    const user = await getUserByEmailService(email);

    // Check user & password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { errorMessage: "Invalid email or password" };
    }

    // Check user is verified or not
    if (!user.verified) {
      return {
        errorMessage:
          "Your email is not verified. Please verify your email first",
      };
    }

    // Create Session
    await createSession(user.uid, user.roleId);
  } catch (error: any) {
    return { errorMessage: error.message };
  }

  // Sign in success redirect to root page
  redirect("/");
}
