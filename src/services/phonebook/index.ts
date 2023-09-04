import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export type Phonebook = {
  number_id: string;
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
  const data = await prisma.phonebook.create({
    data: {
      ...payload,
      number_id: randomUUID(),
      createdAt: new Date(),
    },
  });

  return data;
}

export async function deleteData(
  prisma: PrismaClient,
  payload: Phonebook["number_id"]
): Promise<Phonebook | null> {
  const data = await prisma.phonebook.delete({
    where: {
      number_id: payload,
    },
  });
  if (!data) return null;

  return data;
}

export async function listData(prisma: PrismaClient): Promise<Phonebook[] | null> {
  const data = await prisma.phonebook.findMany();

  if (!data) return null;

  return data;
}

export async function updateData(
  prisma: PrismaClient,
  payload: Phonebook,
  numberId: Phonebook["number_id"]
): Promise<Phonebook | null> {
  const data = await prisma.phonebook.update({
    where: {
      number_id: numberId,
    },
    data: {
      ...payload,
    },
  });

  if (!data) return null;

  return data;
}
