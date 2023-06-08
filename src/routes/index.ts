import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { Phonebook } from "../services";
import { createController } from "../controllers/create";
import { deleteController } from "../controllers/delete";
import { listController } from "../controllers/list";
import { updateController } from "../controllers/update";

export async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    "/api/create",
    (request: FastifyRequest<{ Body: Phonebook }>, reply: FastifyReply) =>
      createController(request, reply)
  );

  fastify.delete(
    "/api/delete/:id",
    (
      request: FastifyRequest<{ Params: { id: Phonebook["number_id"] } }>,
      reply: FastifyReply
    ) => deleteController(request, reply)
  );

  fastify.get("/api/list", (request: FastifyRequest, reply: FastifyReply) =>
    listController(request, reply)
  );

  fastify.patch(
    "/api/update/:id",
    (
      request: FastifyRequest<{
        Params: { id: Phonebook["number_id"] };
        Body: Phonebook;
      }>,
      reply: FastifyReply
    ) => updateController(request, reply)
  );
}
