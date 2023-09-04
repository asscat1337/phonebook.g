import { FastifyReply, FastifyRequest } from "fastify";
import { create } from "../../services/phonebook";
import type { Phonebook } from "../../services/phonebook";

export async function createController(
  request: FastifyRequest<{ Body: Phonebook }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  try {
    const prisma = request.prisma;
    const body = request.body;

    const data = await create(prisma, body);

    return reply.status(200).send(data);
  } catch (e) {
    return reply.status(500).send((e as Error).message);
  }
}
