import { Context, Next } from "hono";
import { jwtVerify } from "jose";

import { env } from "~/env";
import { HTTP } from "~/shared/services";

import { CachedRepository } from "~/modules/Cache/repository/CachedRepository";
import { UserRepository } from "~/modules/Users/repository/UserRepository";

export async function isAuthenticated(c: Context, next: Next) {
  const requestHeader = c.req.header();
  let token = requestHeader?.authorization;

  if (!token) return HTTP(401, { message: "Token not sent" });
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
    if (!userExists) return HTTP(401, { message: "User not exists" });

    await cachedRepository.set(`user-${payload.id}`, payload.id);
    return await next();
  } catch (error) {
    return HTTP(401, { message: "Not a JWT token" });
  }
}
