import { createUser, getUserById } from "../../services/user";

import type { FastifyRequest, FastifyReply } from "fastify";
import type { UserCreationType, UserType } from "../../services/user";
import { ConflictError } from "../../utils/error-handler";

export async function userCreateController(
  request: FastifyRequest<{ Body: UserCreationType }>,
  reply: FastifyReply
): Promise<UserType> {
  try {
    console.log("this");
    const payload = request.body;
    const prisma = request.prisma;

    const getUser = await getUserById(prisma, { login: payload.login });

    if (getUser) {
      throw new ConflictError(`User "${payload.name}" already exist`, 409);
    }

    const user = await createUser(prisma, payload);

    return reply.status(200).send(user);
  } catch (e) {
    return reply.status(500).send({ message: (e as Error).message });
  }
}
