import { db } from 'db/config/db';
import { users } from 'db/schema'; // Assuming you have a User schema defined
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send('User route');
});

userRouter.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    await db.insert(users).values({
      name,
      email,
      password,
    });
    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to register user', errorMessage: error.message });
  }
});

export default userRouter;
