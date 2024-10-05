import "server-only";

import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.SECRET_KEY_SESSION);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error: any) {
    return null;
  }
}
