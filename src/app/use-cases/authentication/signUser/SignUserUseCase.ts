import { compare } from "bcryptjs";
import { SignJWT } from "jose";
import { z } from "zod";

import { AuthRepository } from "~/app/repositories/authentication";
import { HTTP, env } from "~/shared/helpers";

class SignUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  validate(body: any) {
    const schema = z.object({
      mail: z
        .string({ required_error: "Mail is required" })
        .email("Invalid email"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    });

    return schema.parse(body);
  }

  async execute(body: any) {
    const { mail, password } = this.validate(body);

    const user = await this.authRepository.findByMail(mail);
    if (!user) return HTTP(400, { message: "User not found" });

    const match = await compare(password, user.password);
    if (!match) return HTTP(401, { message: "Invalid password" });

    const alg = "HS256";
    const secret = new TextEncoder().encode(env.JWT_KEY);
    const token = await new SignJWT({ mail: user.mail, id: user.id })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("1y")
      .sign(secret);

    delete (user as { password?: string }).password;
    return HTTP(200, { message: "User signed!", data: { user, token } });
  }
}

export { SignUserUseCase };
