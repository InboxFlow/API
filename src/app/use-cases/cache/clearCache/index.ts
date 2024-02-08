import { CachedRepository } from "~/app/repositories/cache";
import { ClearCacheController } from "./clearCacheController";
import { ClearCacheUseCase } from "./clearCacheUseCase";

const cachedRepository = new CachedRepository();
const clearCacheUseCase = new ClearCacheUseCase(cachedRepository);
const clearCacheController = new ClearCacheController(clearCacheUseCase);

export const clearCache = clearCacheController;
