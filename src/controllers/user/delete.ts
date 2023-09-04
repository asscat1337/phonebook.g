import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserCreationType, UserType } from "../../services/user";
import { deleteUser } from "../../services/user";

import type { PrismaClient } from "@prisma/client";

export async function userDeleteController(
  request: FastifyRequest<{ Params: { userId: UserType["userId"] } }>,
  reply: FastifyReply
): Promise<UserType> {
  try {
    const { params, prisma } = request;

    const user = await deleteUser(prisma, params.userId);

    if (!user) {
      throw new Error(`User ${params.userId} not found`);
    }

    return reply.status(200).send(user);
  } catch (e) {
    return reply.status(500).send({ message: (e as Error).message });
  }
}
