import { db } from "db/config/db";
import { and, eq } from "drizzle-orm";
import { estoqueUsers } from "models/Estoque";
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

  if(!product) {
    throw new Error("Failed to create product");
  }

  return { product };
}

export const getAllUserProducts = async (userId: string) => {
  const result = await db
  .select()
  .from(produtos)
  .innerJoin(estoqueUsers, eq(produtos.estoqueId, estoqueUsers.estoqueId))
  .where(eq(estoqueUsers.userId, userId));

  return { products: result.map((row) => row.produtos) };
}


export const getAllProductsByEstoqueId = async (estoqueId: string, userId: string) => {
  const result = await db
    .select()
    .from(produtos)
    .innerJoin(estoqueUsers, eq(produtos.estoqueId, estoqueUsers.estoqueId))
    .where(and(eq(produtos.estoqueId, estoqueId), eq(estoqueUsers.userId, userId)));

  if (result.length === 0) {
    throw new Error("No products found for this estoque");
  }

  return { products: result.map((row) => row.produtos) };
}

export const getProductInfo = async (productId: string, userId: string) => {
  const [result] = await db
    .select()
    .from(produtos)
    .innerJoin(estoqueUsers, eq(produtos.estoqueId, estoqueUsers.estoqueId))
    .where(and(eq(produtos.id, productId), eq(estoqueUsers.userId, userId)));

  if (!result) {
    throw new Error("Product not found or user not authorized");
  }

  return {product: result.produtos};
}

export const updateProductInfo = async (productId: string, updates: Partial<{ name: string; image: string | null; barcode: string | null; price: number; quantity: number; minStock: number }>, userId: string) => {
  const product = await db
    .select()
    .from(produtos)
    .innerJoin(estoqueUsers, eq(produtos.estoqueId, estoqueUsers.estoqueId))
    .where(and(eq(produtos.id, productId), eq(estoqueUsers.userId, userId)))
    .limit(1);

  if (product.length === 0) {
    throw new Error("Product not found or user not authorized");
  }

  const updatedProduct = await db
    .update(produtos)
    .set(updates)
    .where(eq(produtos.id, productId))
    .returning();

  return { product: updatedProduct[0] };
}

export const deleteProduct = async (productId: string, userId: string) => {
  const product = await db
    .select()
    .from(produtos)
    .innerJoin(estoqueUsers, eq(produtos.estoqueId, estoqueUsers.estoqueId))
    .where(and(eq(produtos.id, productId), eq(estoqueUsers.userId, userId)))
    .limit(1);

  if (product.length === 0) {
    throw new Error("Product not found or user not authorized");
  }

  await db.delete(produtos).where(eq(produtos.id, productId));
  return { message: "Product deleted successfully" };
}

export const incrementProductQuantity = async (productId: string, quantity: number, userId: string) => {
  const product = await db
    .select()
    .from(produtos)
    .innerJoin(estoqueUsers, eq(produtos.estoqueId, estoqueUsers.estoqueId))
    .where(and(eq(produtos.id, productId), eq(estoqueUsers.userId, userId)))
    .limit(1);

  if (product.length === 0) {
    throw new Error("Product not found or user not authorized");
  }

  const currentQuantity = product[0].produtos.quantity;

  const updatedProduct = await db
    .update(produtos)
    .set({ quantity: currentQuantity + Number(quantity) })
    .where(eq(produtos.id, productId))
    .returning();

  return { product: updatedProduct[0] };
}

export const decrementProductQuantity = async (productId: string, quantity: number, userId: string) => {
  const product = await db
    .select()
    .from(produtos)
    .innerJoin(estoqueUsers, eq(produtos.estoqueId, estoqueUsers.estoqueId))
    .where(and(eq(produtos.id, productId), eq(estoqueUsers.userId, userId)))
    .limit(1);

  if (product.length === 0) {
    throw new Error("Product not found or user not authorized");
  }

  const currentQuantity = product[0].produtos.quantity;

  const updatedProduct = await db
    .update(produtos)
    .set({ quantity: currentQuantity - Number(quantity) })
    .where(eq(produtos.id, productId))
    .returning();

  return { product: updatedProduct[0] };
}