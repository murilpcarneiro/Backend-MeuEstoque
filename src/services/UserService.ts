import { db } from 'db/config/db';
import { users } from 'models/User';

export const createUser = async (name: string, email: string, password: string) => {
  try {
    return await db.insert(users).values({
      name,
      email,
      password,
    }).returning();
    
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}