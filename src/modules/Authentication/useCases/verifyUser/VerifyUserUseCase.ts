import { jwtVerify } from "jose";
import { z } from "zod";

import { env } from "~/env";
import { HTTP } from "~/shared/services";
import { AuthRepository } from "../../repository/AuthRepository";

class VerifyUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  validate(body: any) {
    const schema = z.object({
      token: z.string({ required_error: "Token is required" }),
    });
    return schema.safeParse(body);
  }

  async execute(params: any) {
    const data = this.validate(params);
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });

    const { token } = data.data;
    try {
      const secret = new TextEncoder().encode(env.JWT_VERIFY_KEY);
      const verifyToken = await jwtVerify(token, secret);

      const user_id = verifyToken.payload.id as string;

      const user = await this.authRepository.findById(user_id);
      if (!user) return HTTP(400, { message: "User not found" });

      await this.authRepository.verifyUser(user_id);
      return HTTP(200, { message: "User verified!" });
    } catch (error) {
      return HTTP(400, { message: "Invalaaaadid token" });
    }
  }
}

export { VerifyUserUseCase };
