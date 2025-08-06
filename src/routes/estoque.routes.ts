import express from "express";
import { createEstoque, getEstoqueById, getUserEstoques, joinEstoque } from "../controllers/EstoqueController";

const estoqueRouter = express.Router();
estoqueRouter.post("/", createEstoque);
estoqueRouter.get("/", getUserEstoques);
estoqueRouter.get("/:estoqueId", getEstoqueById);
estoqueRouter.post("/join", joinEstoque);
export default estoqueRouter;