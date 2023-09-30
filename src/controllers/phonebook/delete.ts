import type { Phonebook } from "../../services/phonebook";
import { deleteData } from "../../services/phonebook";
import type { FastifyRequest, FastifyReply } from "fastify";

export async function deleteController(
  request: FastifyRequest<{ Params: { id: Phonebook["numberId"] } }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  try {
    console.log(request);
    const prisma = request.prisma;
    const { id } = request.params;

    const data = await deleteData(prisma, id);

    if (data === null) {
      throw new Error(`Phone with id ${id} not found`);
    }

    return reply.status(200).send(data);
  } catch (e) {
    return reply.status(500).send((e as Error).message);
  }
}
