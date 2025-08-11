import { createNewProduct, getAllProductsByEstoqueId, getAllUserProducts, getProductInfo } from "controllers/ProductController";
import express from "express";

const productRouter = express.Router();

productRouter.post("/", createNewProduct);
productRouter.get("/", getAllUserProducts);
productRouter.get("/:estoqueId", getAllProductsByEstoqueId);
productRouter.get("/:productId/details", getProductInfo);

export default productRouter;