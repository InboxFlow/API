import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { calls } from "./call";
import { users } from "./users";

const channels = sqliteTable("channels", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  user_id: text("user_id").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

const channels_relations = relations(channels, ({ one, many }) => ({
  calls: many(calls),
  user: one(users, {
    fields: [channels.user_id],
    references: [users.id],
  }),
}));

export { channels, channels_relations };
