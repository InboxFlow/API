import { z } from "zod";

import { CallRepository } from "~/app/repositories/call";
import { HTTP } from "~/shared/helpers";

class DeleteCallUseCase {
  constructor(private callRepository: CallRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });

    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const callExists = await this.callRepository.findById(id);
    if (!callExists) return HTTP(400, { message: "Call not exists" });

    await this.callRepository.deleteCall(id);

    return HTTP(201, { message: "Call deleted successfully!" });
  }
}

export { DeleteCallUseCase };
