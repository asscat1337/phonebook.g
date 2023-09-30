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
  refreshToken: string;
  accessToken: string;
  userId: string;
  username: string;
  role: "reader" | "admin";
};

export async function loginService(userData: UserType): Promise<LoginResponse> {
  const accessToken = await createAccessToken({
    userId: userData.userId,
    role: userData.role,
  });
  const refreshToken = createRefreshToken({
    userId: userData.userId,
    role: userData.role,
  });

  return {
    accessToken,
    refreshToken,
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
