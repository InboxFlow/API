import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { calls } from "./call";
import { channels } from "./channels";

const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  mail: text("mail").unique().notNull(),
  password: text("password").notNull(),
  verified: integer("verified", { mode: "boolean" }).notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

const user_relations = relations(users, ({ many }) => ({
  channels: many(channels),
  calls: many(calls),
}));

export { user_relations, users };
