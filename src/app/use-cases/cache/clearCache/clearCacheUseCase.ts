import { HTTP } from "~/shared/helpers";
import { CachedRepository } from "~/app/repositories/cache";

class ClearCacheUseCase {
  constructor(private cacheRepository: CachedRepository) {}

  async execute() {
    await this.cacheRepository.clearCache();
    return HTTP(200, { message: "Cached cleared" });
  }
}

export { ClearCacheUseCase };
