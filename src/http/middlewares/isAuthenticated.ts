import { Context, Next } from "hono";
import { jwtVerify } from "jose";

import { CachedRepository } from "~/modules/Cache/repository/CachedRepository";
import { UserRepository } from "~/modules/Users/repository/UserRepository";
import { HTTP } from "~/shared/services/http";

export async function isAuthenticated(c: Context, next: Next) {
  let token = c.req.header()?.authorization;

  if (!token) return HTTP(401, { message: "Unauthorized" });
  token = token.replace("Bearer ", "").replaceAll(" ", "");

  const secret = new TextEncoder().encode(process.env.JWT_KEY);

  const cachedRepository = new CachedRepository();
  const userRepository = new UserRepository();

  try {
    const { payload } = await jwtVerify(token, secret);

    c.set("isAuthenticated", {
      email: payload.email,
      id: payload.id,
    });

    const cachedUser = await cachedRepository.get(`user-${payload.id}`);
    if (cachedUser) return await next();

    const userExists = await userRepository.findById(`${payload.id}`);
    if (!userExists) return HTTP(401, { message: "Unauthorized" });

    await cachedRepository.set(`user-${payload.id}`, payload.id);
    return await next();
  } catch (error) {
    return HTTP(401, { message: "Not a JWT token" });
  }
}
