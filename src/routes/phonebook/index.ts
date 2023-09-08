import { createController } from "../../controllers/phonebook/create";
import { deleteController } from "../../controllers/phonebook/delete";
import { listController } from "../../controllers/phonebook/list";
import { updateController } from "../../controllers/phonebook/update";

import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { Phonebook } from "../../services/phonebook";

export async function phonebookRouter(fastify: FastifyInstance): Promise<void> {
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

  fastify.get("/api/phonebooks/list", (request: FastifyRequest, reply: FastifyReply) =>
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
}
