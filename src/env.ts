import { z } from "zod";

const envSchema = z.object({
  JWT_KEY: z.string(),
  JWT_VERIFY_KEY: z.string(),
  REDIS_PASSWORD: z.string(),
  // NodeMailer
  NODEMAILER_MAIL: z.string(),
  NODEMAILER_PASS: z.string(),
});

export const env = envSchema.parse(process.env);
