import { db } from "db/config/db";
import { produtos } from "models/Product";

export const createNewProduct = async (name: string, image: string | null, barcode: string | null, price: number, quantity: number, minStock: number, estoqueId: string) => {
  const [product] = await db.insert(produtos).values({
    name,
    image,
    barcode,
    price,
    quantity,
    minStock,
    estoqueId
  }).returning();

  return { product };
}