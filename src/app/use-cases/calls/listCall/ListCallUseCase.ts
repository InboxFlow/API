import { z } from "zod";

import { HTTP } from "~/shared/helpers";
import { CallRepository } from "~/app/repositories/call";

class ListCallUseCase {
  constructor(private callRepository: CallRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });
    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const call = await this.callRepository.findById(id);
    if (!call) return HTTP(400, { message: "Call not found" });

    return HTTP(200, { data: call, message: "Call" });
  }
}

export { ListCallUseCase };
