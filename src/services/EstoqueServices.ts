import { db } from 'db/config/db';
import { estoques } from 'models/Estoque';

export const createNewEstoque = async (name: string, userId: string) => {
  const [estoque] = await db.insert(estoques).values({
    name,
    userId
  }).returning();

  return {estoque}
}
