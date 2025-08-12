import { db } from 'db/config/db';
import { and, eq } from 'drizzle-orm';
import { estoques, estoqueUsers } from 'models/Estoque';
import { produtos } from 'models/Product';

export const createNewEstoque = async (name: string, userId: string) => {
  const [estoque] = await db.insert(estoques).values({
    name
  }).returning();

  await db.insert(estoqueUsers).values({
    estoqueId: estoque.id,
    userId
  });

  return {estoque}
}

export const joinEstoque = async (codigo: string, userId: string) => {
  const [estoque] = await db.select().from(estoques).where(eq(estoques.codigo, codigo));

  if (!estoque) {
    throw new Error('Estoque not found');
  }

  const [alreadyJoined] = await db.select().from(estoqueUsers).where(
    and(eq(estoqueUsers.estoqueId, estoque.id), eq(estoqueUsers.userId, userId))
  );

  if (alreadyJoined) {
    throw new Error('User already joined this estoque');
  }

  await db.insert(estoqueUsers).values({
    estoqueId: estoque.id,
    userId
  });

  return {estoque};
}

export const getUserEstoques = async (userId: string) => {
  const userEstoques = await db.select().from(estoques)
    .innerJoin(estoqueUsers, eq(estoques.id, estoqueUsers.estoqueId))
    .where(eq(estoqueUsers.userId, userId))
    .orderBy(estoques.name);

  return { estoques: userEstoques.map((row) => row.estoques) };
}

export const getEstoqueById = async (estoqueId: string, userId: string) => {
  const [estoque] = await db.select().from(estoques)
    .innerJoin(estoqueUsers, eq(estoques.id, estoqueUsers.estoqueId))
    .where(and(eq(estoques.id, estoqueId), eq(estoqueUsers.userId, userId)));

    if (!estoque) {
      throw new Error('Estoque not found or user not authorized');
    }

  return estoque.estoques;
}

export const changeEstoqueName = async (estoqueId: string, name: string, userId: string) => {
  const [estoque] = await db.select().from(estoques)
    .innerJoin(estoqueUsers, eq(estoques.id, estoqueId))
    .where(and(eq(estoques.id, estoqueId), eq(estoqueUsers.userId, userId)));

    if (!estoque) {
      throw new Error('Estoque not found or user not authorized');
    }

  await db.update(estoques).set({ name }).where(eq(estoques.id, estoque.estoques.id));

  return estoque;
}

export const deleteEstoque = async (estoqueId: string, userId: string) => {
  const [estoque] = await db.select().from(estoques)
    .innerJoin(estoqueUsers, eq(estoques.id, estoqueUsers.estoqueId))
    .where(and(eq(estoques.id, estoqueId), eq(estoqueUsers.userId, userId)));

  if (!estoque) {
    throw new Error('Estoque not found or user not authorized');
  }

  await db.delete(estoqueUsers).where(eq(estoqueUsers.estoqueId, estoque.estoques.id));
  await db.delete(produtos).where(eq(produtos.estoqueId, estoque.estoques.id));
  await db.delete(estoques).where(eq(estoques.id, estoque.estoques.id));
  return { message: "Estoque deleted successfully" };
}