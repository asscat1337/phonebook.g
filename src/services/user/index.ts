import type { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export type UserType = {
  userId: string;
  name: string;
  login: string;
  password: string;
  createdAt: Date;
};
export type UserCreationType = {
  name: string;
  login: string;
  password: string;
};

export async function createUser(
  prisma: PrismaClient,
  payload: UserCreationType
): Promise<UserType> {
  const user = await prisma.user.create({
    data: {
      ...payload,
      createdAt: new Date(),
      userId: randomUUID(),
    },
  });

  return user;
}

export async function getUserById(
  prisma: PrismaClient,
  { userId, login }: Partial<{ userId: UserType["userId"]; login: UserType["login"] }>
): Promise<UserType | null> {
  return await prisma.user.findFirst({
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

  const user = await prisma.user.delete({
    where: {
      userId,
    },
  });

  return user;
}
