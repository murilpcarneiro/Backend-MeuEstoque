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
    res.status(500).json({ error });
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
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
}

export const getProductInfo = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");

  if (!productId || !userId) {
    return res.status(400).json({ error: "Product ID and User ID are required." });
  }

  try {
    const product = await ProductService.getProductInfo(productId, userId);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const updateProductInfo = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");
  const updates = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ error: "Product ID and User ID are required." });
  }

  try {
    const { product } = await ProductService.updateProductInfo(productId, updates, userId);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");

  if (!productId || !userId) {
    return res.status(400).json({ error: "Product ID and User ID are required." });
  }

  try {
    await ProductService.deleteProduct(productId, userId);
    res.status(204).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const incrementProductQuantity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");
  const { quantity } = req.body;

  if (!id || !userId || quantity === undefined) {
    return res.status(400).json({ error: "Product ID, User ID, and quantity are required." });
  }

  try {
    const { product } = await ProductService.incrementProductQuantity(id, quantity, userId);
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error incrementing product quantity:", error);
    res.status(500).json({ error });
  }
}

export const decrementProductQuantity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = getUserIdFromToken(req.headers.authorization?.split(" ")[1] || "");
  const { quantity } = req.body;

  if (!id || !userId || quantity === undefined) {
    return res.status(400).json({ error: "Product ID, User ID, and quantity are required." });
  }

  try {
    const { product } = await ProductService.decrementProductQuantity(id, quantity, userId);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
}