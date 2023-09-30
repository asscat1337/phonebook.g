import { FastifyReply, FastifyRequest } from "fastify";
import { errorHandler } from "../../utils/error-handler";
import { getUserById } from "../../services/user";
import {
  checkPassword,
  loginService,
  type Login,
  LoginResponse,
} from "../../services/auth";
import { NotFoundError, UnAuthorizeError } from "../../utils/error-handler/errors";

export async function loginUserController(
  req: FastifyRequest<{ Body: Login }>,
  reply: FastifyReply
): Promise<LoginResponse> {
  try {
    const bodyReq = req.body;
    const user = await getUserById(req.prisma, { login: bodyReq.username });

    if (!user) {
      throw new NotFoundError(`User ${bodyReq.username} not found`);
    }

    const isPassword = await checkPassword(bodyReq.password, user.password);

    if (!isPassword) {
      throw new UnAuthorizeError("Invalid password");
    }

    const userData = await loginService(user);

    return reply.status(200).send(userData);
  } catch (e) {
    return errorHandler(e, reply);
  }
}
