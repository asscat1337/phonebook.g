import { FastifyInstance } from "fastify"
import { routes } from "../routes"
import { prismaPlugin } from "./prisma"

export async function fastifyPlugins(fastify: FastifyInstance): Promise<void> {
  await fastify.register(prismaPlugin)
  await fastify.register(routes)
}
