import dotnenv from "dotenv"
import fastify from "fastify"
import { logger } from "./utils/pino"
import { fastifyPlugins } from "./plugins"

dotnenv.config()
const port = process.env.NODE_ENV ? (process.env.PORT as unknown as number) : 3000

const server = fastify({
  logger: true,
})

async function start() {
  await fastifyPlugins(server)
  await server.listen({ port }).then(() => logger.info(`Server started on ${port} port`))
}

start().catch((e) => {
  if (e instanceof Error) logger.error(`Error after started server: ${e.message}`)

  process.exit(1)
})
