import express from "express";
import { changeEstoqueName, createEstoque, getEstoqueById, getUserEstoques, joinEstoque } from "../controllers/EstoqueController";

const estoqueRouter = express.Router();
estoqueRouter.post("/", createEstoque);
estoqueRouter.get("/", getUserEstoques);
estoqueRouter.get("/:estoqueId", getEstoqueById);
estoqueRouter.put("/:estoqueId", changeEstoqueName)
estoqueRouter.post("/join", joinEstoque);
export default estoqueRouter;