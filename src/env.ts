import { z } from "zod";

const envSchema = z.object({
  JWT_KEY: z.string().min(3),
  JWT_VERIFY_KEY: z.string().min(3),
  POSTGRES_URL: z.string().min(3),
  REDIS_URL: z.string().min(3),
  REDIS_PORT: z.string().min(3).transform(Number),
  REDIS_PASSWORD: z.string().min(3),
  NODEMAILER_MAIL: z.string().email(),
  NODEMAILER_PASS: z.string().min(3),
});

function formatErrorMessage(error: z.ZodError) {
  const title = "Error validating env variables:";
  const lines = Object.entries(error.flatten().fieldErrors).map(
    ([key, value]) => `-> ${key}: ${value}`
  );
  return [title, ...lines].join("\n");
}

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) throw formatErrorMessage(parsedEnv.error);

export const env = parsedEnv.data;
