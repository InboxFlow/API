import { HTTP } from "~/shared/helpers";
import { CachedRepository } from "~/app/repositories/cache";

class ClearCacheUseCase {
  constructor(private cacheRepository: CachedRepository) {}

  async execute() {
    try {
      await this.cacheRepository.clearCache();
      return HTTP(200, { message: "Cached cleared" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { ClearCacheUseCase };
