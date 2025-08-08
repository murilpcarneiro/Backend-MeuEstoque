import { createNewProduct } from "controllers/ProductController";
import express from "express";

const productRouter = express.Router();

productRouter.post("/", createNewProduct);

export default productRouter;