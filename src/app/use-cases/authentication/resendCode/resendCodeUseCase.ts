import { SignJWT } from "jose";
import { z } from "zod";

import { User } from "~/app/entities";
import { AuthRepository } from "~/app/repositories/authentication";
import { env, HTTP } from "~/shared/helpers";
import { sendMail } from "~/shared/services";

class ResendCodeUseCase {
  constructor(private authRepository: AuthRepository) {}

  validate(params: any) {
    const schema = z.object({
      mail: z.string({ required_error: "Token is required" }),
    });
    return schema.parse(params);
  }

  async generateVerifyToken(user: User) {
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

  async sendVerifyEmail(user: User) {
    const token = await this.generateVerifyToken(user);
    await sendMail({
      to: user.mail,
      subject: "Validate your account",
      text: "Verify your account",
      html: `<a href="http://localhost:3000/verify?token=${token}">Verify your account</a>`,
    });
  }

  async execute(params: any) {
    const { mail } = this.validate(params);

    const user = await this.authRepository.findByMail(mail);
    if (!user) return HTTP(400, { message: "User not found" });

    await this.sendVerifyEmail(user);
    return HTTP(200, { message: "Mail sent" });
  }
}

export { ResendCodeUseCase };
