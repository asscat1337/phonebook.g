import { FastifyReply } from "fastify";
import { HttpException, InternalServerError } from "./errors";

export function errorHandler(e: unknown, res: FastifyReply): FastifyReply {
  const errors = e as HttpException;

  if (errors.status === undefined) {
    throw new InternalServerError(errors.message);
  }

  return res.status(errors.status).send({
    type: errors.type,
    message: errors.message,
    status: errors.status,
  });
}
