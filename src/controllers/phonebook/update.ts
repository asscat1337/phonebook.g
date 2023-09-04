import { updateData } from "../../services/phonebook";

import type { FastifyReply, FastifyRequest } from "fastify";
import type { Phonebook } from "../../services/phonebook";

export async function updateController(
  request: FastifyRequest<{ Params: { id: Phonebook["number_id"] }; Body: Phonebook }>,
  reply: FastifyReply
): Promise<Phonebook> {
  try {
    const { prisma } = request;
    const { id } = request.params;
    const payload = request.body;

    const data = await updateData(prisma, payload, id);

    return reply.status(200).send(data);
  } catch (e) {
    return reply.status(500).send({
      code: 500,
      message: (e as Error).message,
    });
  }
}
