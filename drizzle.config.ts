import * as dotenv from "dotenv";

import type { Config } from "drizzle-kit";
import { env } from "~/env";

dotenv.config();

export default {
  schema: "./src/database/schemas/*.ts",
  out: "./src/database/migrations",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_TOKEN,
  },
} satisfies Config;
