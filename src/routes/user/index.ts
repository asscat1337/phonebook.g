import { userCreateController } from "../../controllers/user/create";
import { userDeleteController } from "../../controllers/user/delete";
import { userReadController } from "../../controllers/user/read";

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userBodyValidator from "../../helper/validation/user/userBodyValidator.json";
import userIdParamValidator from "../../helper/validation/user/userIdParamValidator.json";
import type { UserType } from "../../services/user";

export async function userRouter(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    "/api/users/create",
    { schema: { body: userBodyValidator } },
    (request: FastifyRequest<{ Body: UserType }>, reply: FastifyReply) =>
      userCreateController(request, reply)
  );
  fastify.delete(
    "/api/users/delete/:userId",
    { schema: { params: userIdParamValidator } },
    (
      request: FastifyRequest<{ Params: { userId: UserType["userId"] } }>,
      reply: FastifyReply
    ) => userDeleteController(request, reply)
  );

  fastify.get(
    "/api/users/:id",
    { schema: { params: userIdParamValidator } },
    (
      request: FastifyRequest<{ Params: { userId: UserType["userId"] } }>,
      reply: FastifyReply
    ) => userReadController(request, reply)
  );
}
