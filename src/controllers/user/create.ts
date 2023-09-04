import { createUser } from "../../services/user";

import type { FastifyRequest, FastifyReply } from "fastify";
import type { UserCreationType, UserType } from "../../services/user";

export async function userCreateController(
  request: FastifyRequest<{ Body: UserCreationType }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const payload = request.body;
    const prisma = request.prisma;

    const user = await createUser(prisma, payload);

    return reply.status(200).send(user);
  } catch (e) {
    return reply.status(500).send({ message: (e as Error).message });
  }
}
