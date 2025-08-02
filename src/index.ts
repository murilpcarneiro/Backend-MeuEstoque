import "dotenv/config";
import express from 'express';
import userRouter from "routes/users";

const app = express();

app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
