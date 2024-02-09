import { Context, Next } from "hono";
import { jwtVerify } from "jose";

import { CachedRepository } from "~/app/repositories/cache";
import { UserRepository } from "~/app/repositories/user";
import { env } from "~/shared/helpers";

export async function isAuthenticated(c: Context, next: Next) {
  const requestHeader = c.req.header();
  let token = requestHeader?.authorization;

  if (!token) throw new Error("Token not sent");
  token = token.replace("Bearer ", "").replaceAll(" ", "");

  const cachedRepository = new CachedRepository();
  const userRepository = new UserRepository();

  try {
    const secret = new TextEncoder().encode(env.JWT_KEY);
    const { payload } = await jwtVerify(token, secret);

    c.set("isAuthenticated", {
      mail: payload.mail,
      id: payload.id,
    });

    const cachedUser = await cachedRepository.get(`user-${payload.id}`);
    if (cachedUser) return await next();

    const userExists = await userRepository.findById(`${payload.id}`);
    if (!userExists) throw new Error("Invalid JWT | User not exists");

    await cachedRepository.set(`user-${payload.id}`, payload.id);
    return await next();
  } catch (error) {
    throw new Error("Invalid JWT | Not a valid type");
  }
}
