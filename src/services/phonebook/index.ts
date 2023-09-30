import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export type Phonebook = {
  numberId: string;
  phone: string;
  description: string;
  createdAt: Date;
  modifiedAt?: Date | null;
  createdBy?: string | null;
};

export async function create(
  prisma: PrismaClient,
  payload: Phonebook
): Promise<Phonebook> {
  const data = await prisma.phonebooks.create({
    data: {
      ...payload,
      numberId: randomUUID(),
      createdAt: new Date(),
    },
  });

  return data;
}

export async function deleteData(
  prisma: PrismaClient,
  payload: Phonebook["numberId"]
): Promise<Phonebook | null> {
  const data = await prisma.phonebooks.delete({
    where: {
      numberId: payload,
    },
  });
  if (!data) return null;

  return data;
}

export async function listData(prisma: PrismaClient): Promise<Phonebook[] | null> {
  const data = await prisma.phonebooks.findMany();

  if (!data) return null;

  return data;
}

export async function updateData(
  prisma: PrismaClient,
  payload: Phonebook,
  numberId: Phonebook["numberId"]
): Promise<Phonebook | null> {
  const data = await prisma.phonebooks.update({
    where: {
      numberId: numberId,
    },
    data: {
      ...payload,
    },
  });

  if (!data) return null;

  return data;
}
