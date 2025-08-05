import { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import * as EstoqueService from "../services/EstoqueServices";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const createEstoque = async(req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwtDecode(token as string) as DecodedToken;
  const userId = decoded.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  try {
    const { estoque } = await EstoqueService.createNewEstoque(name, userId);
    res.status(201).json({ id: estoque.id, name: estoque.name, userId: estoque.userId });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the stock.", errorMessage: error });
  }
}