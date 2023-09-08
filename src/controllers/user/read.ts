import { UserType, getUserById } from "../../services/user";
import type { FastifyRequest, FastifyReply } from "fastify";

export async function userReadController(
  request: FastifyRequest<{ Params: { userId: UserType["userId"] } }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { prisma, params } = request;

    const { userId } = params;

    const user = await getUserById(prisma, { userId });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }
  } catch (e) {
    return reply.status(500).send({ message: (e as Error).message });
  }
}
