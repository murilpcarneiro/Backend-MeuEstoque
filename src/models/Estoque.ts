import { sql } from "drizzle-orm";
import { foreignKey, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./User";

export const estoque = pgTable("estoque", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  código: varchar("codigo", { length: 50 }).notNull().unique().default(sql`floor(random()*9000 + 1000)::int`),
  userId: uuid("user_id").notNull(),
}, (table) => ({
  fkUser: foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: "fk_estoque_user",
  })
}));