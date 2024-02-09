import { jwtVerify } from "jose";
import { z } from "zod";

import { AuthRepository } from "~/app/repositories/authentication";
import { HTTP, env } from "~/shared/helpers";

class VerifyUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  validate(body: any) {
    const schema = z.object({
      token: z.string({ required_error: "Token is required" }),
    });
    return schema.parse(body);
  }

  async execute(params: any) {
    const { token } = this.validate(params);
    const secret = new TextEncoder().encode(env.JWT_VERIFY_KEY);
    const verifyToken = await jwtVerify(token, secret);

    const user_id = verifyToken.payload.id as string;

    const user = await this.authRepository.findById(user_id);
    if (!user) return HTTP(400, { message: "User not found" });

    await this.authRepository.verifyUser(user_id);
    return HTTP(200, { message: "User verified!" });
  }
}

export { VerifyUserUseCase };
