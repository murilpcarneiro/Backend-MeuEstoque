import { Request, Response } from "express";
import * as ProductService from "../services/ProductServices";

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