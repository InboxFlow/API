import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { users } from "./users";

const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  provider: text("provider").notNull(),
  user_id: text("user_id").notNull(),
  avatar: text("avatar").notNull(),
  mail: text("mail").unique().notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

const accountsRelations = relations(accounts, ({ one }) => ({
  author: one(users, {
    fields: [accounts.user_id],
    references: [users.id],
  }),
}));

export { accounts, accountsRelations };
