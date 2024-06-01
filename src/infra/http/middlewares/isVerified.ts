import { Context, Next } from "hono";

import { CachedRepository } from "~/app/repositories/cache";
import { UserRepository } from "~/app/repositories/user";
import {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} from "~/shared/exceptions";

export async function isVerified(c: Context, next: Next) {
  const userData = c.get("isAuthenticated");
  if (!userData) throw new NotFoundError("User not exists");

  const cachedRepository = new CachedRepository();
  const userRepository = new UserRepository();

  try {
    const cachedUser = await cachedRepository.get(`verified-${userData.id}`);
    if (cachedUser) return await next();

    const user = await userRepository.findById(userData.id);

    if (!user) throw new NotFoundError("User not exists");
    if (!user.verified) throw new ForbiddenError("User not verified");

    await cachedRepository.set(`verified-${userData.id}`, userData.id);
    return await next();
  } catch (error) {
    throw new BadRequestError("Invalid JWT");
  }
}
