import type { FastifyInstance } from "fastify";
import { userRouter } from "./user";
import { phonebookRouter } from "./phonebook";
import { authRoutes } from "./auth";

export async function routes(fastify: FastifyInstance): Promise<void> {
  await phonebookRouter(fastify);
  await userRouter(fastify);
  await authRoutes(fastify);
}
