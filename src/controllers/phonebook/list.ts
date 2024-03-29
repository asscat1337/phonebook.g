import { FastifyReply, FastifyRequest } from "fastify";
import { listData } from "../../services/phonebook";

import type { Phonebook } from "../../services/phonebook";

export async function listController(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<Phonebook> {
  try {
    const { prisma } = request;

    const data = await listData(prisma);

    return reply.status(200).send(data);
  } catch (e) {
    return reply.status(500).send((e as Error).message);
  }
}
