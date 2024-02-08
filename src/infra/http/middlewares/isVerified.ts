import { Context, Next } from "hono";

import { CachedRepository } from "~/app/repositories/cache";
import { UserRepository } from "~/app/repositories/user";
import { HTTP } from "~/shared/helpers";

export async function isVerified(c: Context, next: Next) {
  const userData = c.get("isAuthenticated");
  if (!userData) return HTTP(401, { message: "Unauthorized" });

  const cachedRepository = new CachedRepository();
  const userRepository = new UserRepository();

  try {
    const cachedUser = await cachedRepository.get(`verified-${userData.id}`);
    if (cachedUser) return await next();

    const user = await userRepository.findById(userData.id);

    if (!user) return HTTP(500, { message: "User not exists" });
    if (!user.verified) return HTTP(401, { message: "User not verified" });

    await cachedRepository.set(`verified-${userData.id}`, userData.id);
    return await next();
  } catch (error) {
    return HTTP(401, { message: "Not a JWT token" });
  }
}
