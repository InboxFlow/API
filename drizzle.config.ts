import * as dotenv from "dotenv";

import { Config } from "drizzle-kit";
import { env } from "~/shared/helpers";

dotenv.config();

export default {
  schema: "./src/infra/database/mappers/*.ts",
  out: "./src/infra/database/migrations",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_TOKEN,
  },
} satisfies Config;
