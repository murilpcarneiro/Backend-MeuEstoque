import { Request, Response } from "express";
import * as UserService from "../services/UserService";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const { user, token } = await UserService.createUser(name, email, password);
    res.status(201).json({user: { id:user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error });
  }

};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({error: "Email and password are required."});
  }

  try {
    const { user, token } = await UserService.loginUser(email, password);
    res.status(200).json({user: { id: user.id, name: user.name, email: user.email }, token});
  } catch (error: any) {
    res.status(401).json({ error })
  }
}

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const user = await UserService.getAutheticatedUser(token);
    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error: any) {
    res.status(401).json({ error });
  }
}