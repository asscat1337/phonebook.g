import { FastifyInstance } from "fastify";
import { routes } from "../routes";
import { prismaPlugin } from "./prisma";
import fastifyCookie from "@fastify/cookie";
import { roleBasedAccesControlPlugin } from "./auth";

export async function fastifyPlugins(fastify: FastifyInstance): Promise<void> {
  await fastify.register(prismaPlugin);
  await fastify.register(routes);
  await fastify.register(fastifyCookie);
  await fastify.register(roleBasedAccesControlPlugin);
}
