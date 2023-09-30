import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { loginUserController } from "../../controllers/auth/login";
import { Login } from "../../services/auth";

export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    "/api/login",
    (req: FastifyRequest<{ Body: Login }>, reply: FastifyReply) =>
      loginUserController(req, reply)
  );
}
