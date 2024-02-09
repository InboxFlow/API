import { Context, Next } from "hono";

import { CachedRepository } from "~/app/repositories/cache";
import { UserRepository } from "~/app/repositories/user";

export async function isVerified(c: Context, next: Next) {
  const userData = c.get("isAuthenticated");
  if (!userData) throw new Error("Unauthorized | User not exists");

  const cachedRepository = new CachedRepository();
  const userRepository = new UserRepository();

  try {
    const cachedUser = await cachedRepository.get(`verified-${userData.id}`);
    if (cachedUser) return await next();

    const user = await userRepository.findById(userData.id);

    if (!user) throw new Error("Unauthorized | User not exists");
    if (!user.verified) throw new Error("Unauthorized | User not verified");

    await cachedRepository.set(`verified-${userData.id}`, userData.id);
    return await next();
  } catch (error) {
    throw new Error("Invalid JWT");
  }
}
