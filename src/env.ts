import { z } from 'zod'

const envSchema = z.object({
  //The JWT variables are used to sign and verify the token that is sent to the user's email to verify the account.
  JWT_KEY: z.string().min(3),
  JWT_VERIFY_KEY: z.string().min(3),
  // The REDIS variables are used to connect to the Redis database, which is used to store the user's token and verify the account.
  REDIS_PASSWORD: z.string().min(3),
  // The NODEMAILER variables are used to send the email to the user to verify the account.
  NODEMAILER_MAIL: z.string().email(),
  NODEMAILER_PASS: z.string().min(3),
})

const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success) throw formatErrorMessage(parsedEnv.error)

export const env = parsedEnv.data
function formatErrorMessage(error: z.ZodError) {
  const title = 'Error validating env variables:'
  const lines = Object.entries(error.flatten().fieldErrors).map(([key, value]) => `-> ${key}: ${value}`)
  return [title, ...lines].join('\n')
}
