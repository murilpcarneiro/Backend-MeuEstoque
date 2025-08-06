import { db } from 'db/config/db';
import { and, eq } from 'drizzle-orm';
import { estoques, estoqueUsers } from 'models/Estoque';

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