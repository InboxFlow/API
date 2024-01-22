import type { ClearCacheUseCase } from "./clearCacheUseCase";

class ClearCacheController {
  constructor(private clearCacheUseCase: ClearCacheUseCase) {}

  async handle() {
    return await this.clearCacheUseCase.execute();
  }
}

export { ClearCacheController };
