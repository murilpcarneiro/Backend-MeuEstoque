import bycrypt from 'bcrypt';
import { db } from 'db/config/db';
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
