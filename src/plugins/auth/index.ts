import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";

async function roleBasedAccesControl(
  req: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes
) {
  const requestType = req.method;

  if (requestType === "get") done();

  //TODO

  //   if(req.session.role === 'reader' && requestType !== 'get') {

  //   }
}
