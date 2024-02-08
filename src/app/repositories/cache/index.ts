import { redis } from "~/shared/services/redis";
import { CachedRepositoryDTO } from "./RepositoryDTO";

export class CachedRepository implements CachedRepositoryDTO {
  async get(key: string) {
    return await redis.get(key);
  }

  async set(key: string, value: any) {
    await redis.set(key, value);
  }

  async delete(key: string) {
    await redis.del(key);
  }

  async clearCache() {
    await redis.flushAll();
  }
}
