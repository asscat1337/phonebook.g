import type { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export type UserType = {
  userId: string;
  name: string;
  login: string;
  password: string;
  createdAt: Date;
  role: "admin" | "reader";
};
export type UserCreationType = {
  name: string;
  login: string;
  password: string;
  role: "admin" | "reader";
};

export type UserResponse = {
  userId: string;
  name: string;
  login: string;
  createdAt: Date;
  role: "admin" | "reader";
};

export async function createUser(
  prisma: PrismaClient,
  payload: UserCreationType
): Promise<UserResponse> {
  const salt = process.env.SALT ? +process.env.SALT : 10;
  const generateHash = await bcrypt.genSalt(salt);

  const generatePassword = await bcrypt.hash(payload.password, generateHash);

  const DEFAULT_USER = "reader" || payload.role;
  const user = await prisma.users.create({
    select: {
      password: false,
      userId: true,
      createdAt: true,
      name: true,
      login: true,
      role: true,
    },
    data: {
      ...payload,
      password: generatePassword,
      createdAt: new Date(),
      userId: randomUUID(),
      role: DEFAULT_USER,
    },
  });

  return user;
}

export async function getUserById(
  prisma: PrismaClient,
  { userId, login }: Partial<{ userId: UserType["userId"]; login: UserType["login"] }>
): Promise<UserType | null> {
  return await prisma.users.findFirst({
    where: {
      OR: {
        userId,
        login,
      },
    },
  });
}

export async function deleteUser(
  prisma: PrismaClient,
  userId: UserType["userId"]
): Promise<UserType | null> {
  const findUser = await getUserById(prisma, { userId });

  if (!findUser) {
    return null;
  }

  const user = await prisma.users.delete({
    where: {
      userId,
    },
  });

  return user;
}
