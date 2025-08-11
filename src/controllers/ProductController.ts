import { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import * as ProductService from "../services/ProductServices";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

const getUserIdFromToken = (token: string): string => {
  const decoded = jwtDecode(token) as DecodedToken;
  return decoded.id;
};

export const createNewProduct = async (req: Request, res: Response) => {
  const { name, image, barcode, price, quantity, minStock, estoqueId } = req.body;

  if (!name || !price || !quantity || !minStock || !estoqueId) {
    return res.status(400).json({ error: "Name, price, quantity, minStock, and estoqueId are required." });
  }

  try {
    const { product } = await ProductService.createNewProduct(name, image, barcode, price, quantity, minStock, estoqueId);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the product." });
  }
}

export const getAllUserProducts = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const { products } = await ProductService.getAllUserProducts(userId);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const getAllProductsByEstoqueId = async (req: Request, res: Response) => {
  const { estoqueId } = req.params;
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");

  if (!estoqueId || !userId) {
    return res.status(400).json({ error: "Estoque ID and User ID are required." });
  }

  try {
    const { products } = await ProductService.getAllProductsByEstoqueId(estoqueId, userId);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
}