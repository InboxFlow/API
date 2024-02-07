import { HTTP } from "~/shared/services";
import { CachedRepository } from "../../repository/CachedRepository";

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
