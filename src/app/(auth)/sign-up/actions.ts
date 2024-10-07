"use server";

import { sendMail } from "@/lib/emails/send-email";
import { encrypt } from "@/lib/jwt";
import { getRoleService } from "@/lib/services/role.services";
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
    const role = await getRoleService("user");

    const user = await createUserService({
      username,
      email,
      password: hash,
      roleId: role!.id,
    });

    // Send Email Verification
    const verifToken = await encrypt({ userId: user.uid });

    await sendMail({
      email,
      username,
      verifToken,
    });

    return { success: true };
  } catch (error: unknown) {
    return { errorMessage: (error as Error).message };
  }
}
