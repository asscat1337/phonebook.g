import jwt from "jsonwebtoken";
import { redis } from "../redis";
import type { JwtPayload } from "jsonwebtoken";
import { error } from "console";

type JWTPayload = {
  userId: string;
  role: "reader" | "admin";
};

export function createJWT(payload: JWTPayload): {
  refreshToken: string;
  accessToken: string;
} {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: 60 * 15,
  });
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: 31 * 24 * 60 * 60,
  });

  return {
    refreshToken,
    accessToken,
  };
}
export async function createAccessToken(payload: JWTPayload): Promise<string> {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: 31 * 24 * 60 * 60,
  });

  if ((await redis.exists("access-token")) === 0) {
    redis.set("access-token", accessToken);
  } else {
    /* CHECK EXPIRES TOKEN*/
    const tokenValue = await redis.get("access-token");

    if (tokenValue) {
      const verifyToken = await verifyAccessToken(tokenValue);

      if (verifyToken.isExpired) redis.set("access-token", accessToken);
    }
  }

  return accessToken;
}

export function createRefreshToken(payload: JWTPayload): string {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: 60 * 15,
  });

  return refreshToken;
}

export function verifyAccessToken(
  token: string
): Promise<{ isExpired: boolean; token: string }> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string, (error) => {
      if (error) reject({ isExpired: true, token });
      resolve({ isExpired: false, token: token });
    });
  });
}

export function verifyRefreshToken(token: string): string | JwtPayload {
  const verify = jwt.verify(token, process.env.JWT_REFRESH_TOKEN as string);

  return verify;
}
