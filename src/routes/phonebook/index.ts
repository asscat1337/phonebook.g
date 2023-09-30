import { createController } from "../../controllers/phonebook/create";
import { deleteController } from "../../controllers/phonebook/delete";
import { listController } from "../../controllers/phonebook/list";
import { updateController } from "../../controllers/phonebook/update";
import PhonebookBodyValidator from "../../helper/validation/phonebook/phonebookBodyValidator.json";
import phonebookParamValidator from "../../helper/validation/phonebook/phonebookParamValidator.json";
import phonebookUpdateValidator from "../../helper/validation/phonebook/phonebookUpdateValidator.json";

import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { Phonebook } from "../../services/phonebook";

export async function phonebookRouter(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    "/api/phonebooks/create",
    { schema: { body: PhonebookBodyValidator } },
    (request: FastifyRequest<{ Body: Phonebook }>, reply: FastifyReply) =>
      createController(request, reply)
  );

  fastify.delete(
    "/api/phonebooks/delete/:id",
    { schema: { params: phonebookParamValidator } },
    (
      request: FastifyRequest<{ Params: { id: Phonebook["numberId"] } }>,
      reply: FastifyReply
    ) => deleteController(request, reply)
  );

  fastify.get("/api/phonebooks/list", (request: FastifyRequest, reply: FastifyReply) =>
    listController(request, reply)
  );

  fastify.patch(
    "/api/phonebooks/update/:id",
    { schema: { body: phonebookUpdateValidator, params: phonebookParamValidator } },
    (
      request: FastifyRequest<{
        Params: { id: Phonebook["numberId"] };
        Body: Phonebook;
      }>,
      reply: FastifyReply
    ) => updateController(request, reply)
  );
}
