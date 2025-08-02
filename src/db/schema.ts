import { sql } from "drizzle-orm";
import { foreignKey, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

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

export const produtos = pgTable("produtos", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  barcode: varchar("barcode", { length: 50 }).unique(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  minStock: integer("min_stock").notNull().default(0),
  estoqueId: uuid("estoque_id").notNull(),
}, (table) => ({
  fkEstoque: foreignKey({
    columns: [table.estoqueId],
    foreignColumns: [estoque.id],
    name: "fk_produtos_estoque",
  })
}));