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

export async function getUser(
  prisma: PrismaClient,
  userId: UserType["userId"]
): Promise<UserType | null> {
  return await prisma.user.findFirst({
    where: {
      userId,
    },
  });
}

export async function deleteUser(
  prisma: PrismaClient,
  userId: UserType["userId"]
): Promise<UserType | null> {
  const findUser = await getUser(prisma, userId);

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
