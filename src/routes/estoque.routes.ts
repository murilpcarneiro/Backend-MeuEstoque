import express from "express";
import { createEstoque, joinEstoque } from "../controllers/EstoqueController";

const estoqueRouter = express.Router();
estoqueRouter.post("/", createEstoque);
estoqueRouter.post("/join", joinEstoque);
export default estoqueRouter;