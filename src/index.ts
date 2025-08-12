import "dotenv/config";
import express from 'express';
import estoqueRouter from 'routes/estoque.routes';
import productRouter from "routes/product.routes";
import userRouter from 'routes/user.routes';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/estoques', estoqueRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
