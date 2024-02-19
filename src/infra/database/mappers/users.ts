import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  mail: text("mail").unique().notNull(),
  password: text("password").notNull(),
  verified: integer("verified", { mode: "boolean" }).notNull(),

  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export { users };
