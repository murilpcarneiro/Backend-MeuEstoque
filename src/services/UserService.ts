import bycrypt from 'bcrypt';
import { db } from 'db/config/db';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { users } from 'models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'default';

export const createUser = async (name: string, email: string, password: string) => {
  const hash = await bycrypt.hash(password, 10);
  const [user] = await db.insert(users).values({
    name,
    email,
    password: hash,
  }).returning();
  const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});
  return {user, token}
}

export const loginUser = async (email: string, password: string) => {
  const [user] = await db.select().from(users).where(eq(users.email,email));
  if (!user) {
    throw new Error('User not found');
  }
  
  const match = await bycrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});
  return {user, token};
}

export const getAutheticatedUser = async (token : string) => {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const [user] = await db.select().from(users).where(eq(users.id, decoded.id));
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
}