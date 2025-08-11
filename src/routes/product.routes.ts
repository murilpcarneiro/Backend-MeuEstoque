import { createNewProduct, getAllProductsByEstoqueId, getAllUserProducts } from "controllers/ProductController";
import express from "express";

const productRouter = express.Router();

productRouter.post("/", createNewProduct);
productRouter.get("/", getAllUserProducts);
productRouter.get("/:estoqueId", getAllProductsByEstoqueId);

export default productRouter;