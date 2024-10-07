"use server";

import { decrypt } from "@/lib/jwt";
import {
  getUserByUidService,
  updateUserService,
} from "@/lib/services/user.services";

export const verifyEmailAction = async (token: string) => {
  const payload = await decrypt(token);

  // Check token invalid or not
  if (!payload) return { errorMessage: "Invalid token" };

  // Check token expired or not
  if (Date.now() >= payload.exp! * 1000) {
    return {
      errorMessage: "The link verification has already been used or expired",
    };
  }

  const userId: string = payload?.userId as string;

  try {
    const user = await getUserByUidService(userId);

    // Check user exists or not
    if (!user) return { errorMessage: "User not found" };

    // Check user verified or not
    if (user.verified) {
      return {
        errorMessage: "The link verification has already been used or expired",
      };
    }

    // Verified account
    await updateUserService(userId, { verified: true });

    return { success: true };
  } catch (error: any) {
    return { errorMessage: error.message };
  }
};
