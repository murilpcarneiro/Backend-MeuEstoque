import { createNewProduct, deleteProduct, getAllProductsByEstoqueId, getAllUserProducts, getProductInfo, updateProductInfo } from "controllers/ProductController";
import express from "express";

const productRouter = express.Router();

productRouter.post("/", createNewProduct);
productRouter.get("/", getAllUserProducts);
productRouter.get("/:estoqueId", getAllProductsByEstoqueId);
productRouter.get("/:productId/details", getProductInfo);
productRouter.put("/:productId", updateProductInfo);
productRouter.delete("/:productId", deleteProduct)

export default productRouter;