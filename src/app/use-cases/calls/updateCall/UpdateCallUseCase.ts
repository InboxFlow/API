import { z } from "zod";

import { Call } from "~/app/entities";
import { CallRepository } from "~/app/repositories/call";
import { HTTP } from "~/shared/helpers";

class UpdateCallUseCase {
  constructor(private callRepository: CallRepository) {}

  validateMethod(data: string) {
    const validateMethods = ["POST", "GET", "PUT", "DELETE"];
    if (!validateMethods.includes(data)) return false;
    return true;
  }

  validate(body: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
      method: z
        .string({ required_error: "Method is required" })
        .refine(this.validateMethod, "Method is invalid")
        .optional(),
      request: z.string().optional(),
      response: z.string().optional(),
      token: z.string().optional(),
    });

    return schema.parse(body);
  }

  async execute(body: any, params: any) {
    const { id, ...rest } = this.validate({ ...body, ...params });

    const callExists = await this.callRepository.findById(id);
    if (!callExists) return HTTP(400, { message: "Call not exists" });

    const call = new Call({ ...callExists, ...rest });

    await this.callRepository.updateCall(call);
    return HTTP(201, { message: "Call updated successfully!" });
  }
}

export { UpdateCallUseCase };
