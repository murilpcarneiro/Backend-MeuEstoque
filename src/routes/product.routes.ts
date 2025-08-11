import { createNewProduct, decrementProductQuantity, deleteProduct, getAllProductsByEstoqueId, getAllUserProducts, getProductInfo, incrementProductQuantity, updateProductInfo } from "controllers/ProductController";
import express from "express";

const productRouter = express.Router();

productRouter.post("/", createNewProduct);
productRouter.get("/", getAllUserProducts);
productRouter.get("/:estoqueId", getAllProductsByEstoqueId);
productRouter.get("/:productId/details", getProductInfo);
productRouter.put("/:productId", updateProductInfo);
productRouter.delete("/:productId", deleteProduct);
productRouter.patch("/:id/increment", incrementProductQuantity);
productRouter.patch("/:id/decrement", decrementProductQuantity);

export default productRouter;