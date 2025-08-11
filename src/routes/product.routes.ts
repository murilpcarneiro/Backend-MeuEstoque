import { createNewProduct, getAllUserProducts } from "controllers/ProductController";
import express from "express";

const productRouter = express.Router();

productRouter.post("/", createNewProduct);
productRouter.get("/", getAllUserProducts)

export default productRouter;