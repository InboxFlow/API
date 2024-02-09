import { hash } from "bcryptjs";
import { SignJWT } from "jose";
import { z } from "zod";

import { User } from "~/app/entities";
import { UserRepository } from "~/app/repositories/user";
import { env, HTTP } from "~/shared/helpers";
import { sendMail } from "~/shared/services";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  validate(body: any) {
    const schema = z.object({
      name: z.string({ required_error: "Name is required" }),
      mail: z
        .string({ required_error: "Mail is required" })
        .email("Invalid email"),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters long"),
    });

    return schema.parse(body);
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

  async execute(body: any) {
    const { mail, name, password } = this.validate(body);

    const userExists = await this.userRepository.findByMail(mail);
    if (userExists) return HTTP(400, { message: "User already exists" });

    const passwordHash = await hash(password, 8);
    const user = new User({ name, mail, password: passwordHash });

    await this.userRepository.createUser(user);
    this.sendVerifyEmail(user);
    return HTTP(201, {
      message: "User created successfully! Verify your email",
    });
  }
}

export { CreateUserUseCase };
