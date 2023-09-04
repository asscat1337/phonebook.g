import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { Phonebook } from "../services/phonebook";
import { createController } from "../controllers/phonebook/create";
import { deleteController } from "../controllers/phonebook/delete";
import { listController } from "../controllers/phonebook/list";
import { updateController } from "../controllers/phonebook/update";
import { UserType } from "../services/user";
import { userCreateController } from "../controllers/user/create";
import { userDeleteController } from "../controllers/user/delete";
import { userReadController } from "../controllers/user/read";

export async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    "/api/phonebooks/create",
    (request: FastifyRequest<{ Body: Phonebook }>, reply: FastifyReply) =>
      createController(request, reply)
  );

  fastify.delete(
    "/api/phonebooks/delete/:id",
    (
      request: FastifyRequest<{ Params: { id: Phonebook["number_id"] } }>,
      reply: FastifyReply
    ) => deleteController(request, reply)
  );

  fastify.get("/api/list", (request: FastifyRequest, reply: FastifyReply) =>
    listController(request, reply)
  );

  fastify.patch(
    "/api/phonebooks/update/:id",
    (
      request: FastifyRequest<{
        Params: { id: Phonebook["number_id"] };
        Body: Phonebook;
      }>,
      reply: FastifyReply
    ) => updateController(request, reply)
  );

  fastify.post(
    "/api/users/create",
    (request: FastifyRequest<{ Body: UserType }>, reply: FastifyReply) =>
      userCreateController(request, reply)
  );
  fastify.delete(
    "/api/users/delete/:userId",
    (
      request: FastifyRequest<{ Params: { userId: UserType["userId"] } }>,
      reply: FastifyReply
    ) => userDeleteController(request, reply)
  );

  fastify.get(
    "/api/users/:id",
    (
      request: FastifyRequest<{ Params: { userId: UserType["userId"] } }>,
      reply: FastifyReply
    ) => userReadController(request, reply)
  );
}
