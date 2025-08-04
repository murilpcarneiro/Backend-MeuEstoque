import { foreignKey, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { estoque } from "./Estoque";

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