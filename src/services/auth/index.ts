import bcrypt from "bcrypt";

import type { PrismaClient } from "@prisma/client";
import { UnAuthorizeError } from "../../utils/error-handler/errors";
import { createAccessToken, createJWT, createRefreshToken } from "../../utils/jwt";
import { UserType } from "../user";

export type Login = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  userId: string;
  username: string;
  role: "reader" | "admin";
};

export async function loginService(userData: UserType): Promise<LoginResponse> {
  const accessToken = createAccessToken({
    userId: userData.userId,
    role: userData.role,
  });
  await createRefreshToken({
    userId: userData.userId,
    role: userData.role,
  });

  return {
    accessToken,
    userId: userData.userId,
    username: userData.login,
    role: userData.role,
  };
}

export async function checkPassword(
  passwordFromPayload: string,
  passwordFromDb: string
): Promise<boolean> {
  const comparePassword = await bcrypt.compare(passwordFromPayload, passwordFromDb);

  return comparePassword;
}
