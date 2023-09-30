import fastifyPlugin from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import { logger } from "../../utils/pino";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
  interface FastifyRequest {
    prisma: PrismaClient;
  }
}

async function initDatabase(): Promise<PrismaClient> {
  const db = new PrismaClient();

  await db.$connect;

  logger.info("Database connected");
  return db;
}

export const prismaPlugin = fastifyPlugin(async (server) => {
  const prisma = await initDatabase();

  server.decorate("prisma", prisma);
  server.decorateRequest("prisma", { getter: () => server.prisma });

  server.addHook("onClose", async () => {
    await server.prisma.$disconnect();
  });
});
