import "server-only";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "./jwt";

export async function createSession(userId: string, role: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, expires });

  cookies().set("session", session, {
    expires,
    httpOnly: true,
    sameSite: "lax",
  });
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;

  if (!cookie) return null;

  const session = await decrypt(cookie);

  return session;
}

export async function deleteSession() {
  cookies().delete("session");
}
