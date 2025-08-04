import { Request, Response } from "express";
import * as UserService from "../services/UserService";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await UserService.createUser(name, email, password);
  res.status(201).json(user);
};
