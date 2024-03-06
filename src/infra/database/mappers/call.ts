import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { channels } from "./channels";
import { users } from "./users";

const calls = sqliteTable("calls", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull(),
  method: text("method").notNull(),
  request: text("request").notNull(),
  response: text("response").notNull(),
  token: text("token").notNull(),
  channel_id: text("channel_id").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

const calls_relations = relations(calls, ({ one }) => ({
  channel: one(channels, {
    fields: [calls.channel_id],
    references: [channels.id],
  }),
  user: one(users, {
    fields: [calls.user_id],
    references: [users.id],
  }),
}));

export { calls, calls_relations };
