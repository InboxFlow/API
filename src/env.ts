import { z } from "zod";

const envSchema = z.object({
  JWT_KEY: z.string(), // token-secret
  JWT_VERIFY_KEY: z.string(), // verify-mail-secret
  REDIS_PASSWORD: z.string(), // redis-connection-password
  NODEMAILER_MAIL: z.string(), // nodeMailer-mail
  NODEMAILER_PASS: z.string(), // nodeMailer-password
});

export const env = envSchema.parse(process.env);
