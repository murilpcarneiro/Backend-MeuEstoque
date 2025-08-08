import { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import * as EstoqueService from "../services/EstoqueServices";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

const getUserIdFromToken = (token: string): string => {
  const decoded = jwtDecode(token) as DecodedToken;
  return decoded.id;
};

export const createEstoque = async(req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");
  const { name } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. No user ID found in token." });
  }

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  try {
    const { estoque } = await EstoqueService.createNewEstoque(name, userId);
    res.status(201).json({ id: estoque.id, name: estoque.name, codigo: estoque.codigo });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the stock.", errorMessage: error });
  }
}

export const joinEstoque = async(req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");
  const {codigo} = req.body;

  if(!userId) {
    return res.status(401).json({ error: "Unauthorized. No user ID found in token." });
  }

  if (!codigo) {
    return res.status(400).json({ error: "Codigo is required." });
  }

  try {
    const { estoque } = await EstoqueService.joinEstoque(codigo, userId);
    res.status(200).json({ message: "Acesso concedido ao estoque", estoque:{ id: estoque.id, name: estoque.name, codigo: estoque.codigo } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const getUserEstoques = async(req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. No user ID found in token." });
  }

  try {
    const { estoques } = await EstoqueService.getUserEstoques(userId);
    res.status(200).json({ estoques });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching user stocks.", errorMessage: error });
  }
}

export const getEstoqueById = async(req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");
  const { estoqueId } = req.params;

  if (!estoqueId) {
    return res.status(400).json({ error: "Estoque ID is required." });
  }

  try {
    const estoque = await EstoqueService.getEstoqueById(estoqueId, userId)
    res.status(200).json({ estoque: { id: estoque.id, name: estoque.name, codigo: estoque.codigo } });
  } catch (error) {
    res.status(404).json({ error: "Estoque not found." });
  }
}

export const changeEstoqueName = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");
  const {estoqueId} = req.params;
  const {name} = req.body;

  if(!userId) {
    return res.status(401).json({error: "Unauthorized. No user ID found in token."})
  }

  if(!estoqueId) {
    return res.status(400).json({error: "Estoque ID is required."});
  }

  if(!name) {
    return res.status(400).json({error: "Name is required."});
  }

  try {
    const {estoques} = await EstoqueService.changeEstoqueName(estoqueId, name, userId);
    res.status(200).json({ message: "Estoque name updated successfully.", estoque: { id: estoques.id, name } });
  
  } catch (error: any) {
    res.status(500).json({ error: "An error occurred while changing the stock name.", errorMessage: error });
  }


}