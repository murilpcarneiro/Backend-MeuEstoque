import express from "express";
import { createEstoque, getUserEstoques, joinEstoque } from "../controllers/EstoqueController";

const estoqueRouter = express.Router();
estoqueRouter.post("/", createEstoque);
estoqueRouter.get("/", getUserEstoques);
estoqueRouter.post("/join", joinEstoque);
export default estoqueRouter;