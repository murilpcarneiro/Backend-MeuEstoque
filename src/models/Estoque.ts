import { sql } from "drizzle-orm";
import { foreignKey, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./User";

export const estoques = pgTable("estoques", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  codigo: varchar("codigo", { length: 50 }).notNull().unique().default(sql`floor(random()*9000 + 1000)::int`),
});


export const estoqueUsers = pgTable("estoque_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  estoqueId: uuid("estoque_id").notNull(),
  userId: uuid("user_id").notNull(),
}, (table) => ({
  fkEstoque: foreignKey({
    columns: [table.estoqueId],
    foreignColumns: [estoques.id],
    name: "fk_estoque_users_estoque",
  }),
  fkUser: foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: "fk_estoque_users_user",
  }),
}));