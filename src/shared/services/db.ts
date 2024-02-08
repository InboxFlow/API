import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "~/infra/database/mappers";
import { env } from "~/shared/helpers";

const turso = createClient({
  url: env.TURSO_URL,
  authToken: env.TURSO_TOKEN,
});

export const db = drizzle(turso, { schema });
