import { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { verifyAccessToken } from "../../utils/jwt";
import { ForbiddenError } from "../../utils/error-handler/errors";
import { errorHandler } from "../../utils/error-handler";

async function roleBasedAccesControl(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    if (!req.url.includes("/login")) {
      const tokenHeader = req.headers["x-api-key"] as string;

      const accessToken = await verifyAccessToken(tokenHeader);

      if (accessToken.role === "reader" && req.method !== "GET") {
        throw new ForbiddenError(
          `User ${accessToken.userId} has no rigth on ${req.method}:${req.url}`
        );
      }
    }
  } catch (e) {
    return errorHandler(e, reply);
  }
}

export const roleBasedAccesControlPlugin = fastifyPlugin(async (server) => {
  server.addHook("preHandler", roleBasedAccesControl);
});
