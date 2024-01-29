import { SignJWT } from "jose";
import { z } from "zod";

import { HTTP } from "~/shared/services/http";
import { AuthRepository } from "../../repository/AuthRepository";
import { sendMail } from "~/shared/services/mail";
import { UserModel } from "~/shared/models/User";
import { env } from "~/env";

class ResendCodeUseCase {
  constructor(private authRepository: AuthRepository) {}

  validate(params: any) {
    const schema = z.object({
      mail: z.string({ required_error: "Token is required" }),
    });
    return schema.safeParse(params);
  }

  async generateVerifyToken(user: UserModel) {
    const alg = "HS256";
    const secret = new TextEncoder().encode(env.JWT_VERIFY_KEY);
    const token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("1y")
      .sign(secret);

    return token;
  }

  async sendVerifyEmail(user: UserModel) {
    const token = await this.generateVerifyToken(user);
    await sendMail({
      to: user.mail,
      subject: "Validate your account",
      text: "Verify your account",
      html: `<a href="http://localhost:3000/verify?token=${token}">Verify your account</a>`,
    });
  }

  async execute(params: any) {
    const data = this.validate(params);
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });

    try {
      const { mail } = data.data;
      const user = await this.authRepository.findByMail(mail);
      if (!user) return HTTP(400, { message: "User not found" });

      await this.sendVerifyEmail(user);
      return HTTP(200, { message: "Mail sent" });
    } catch (error) {
      return HTTP(400, { message: "Invalidaaa token" });
    }
  }
}

export { ResendCodeUseCase };
