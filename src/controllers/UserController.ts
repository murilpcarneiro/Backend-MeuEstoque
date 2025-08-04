import { Request, Response } from "express";
import * as UserService from "../services/UserService";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const { user, token } = await UserService.createUser(name, email, password);
    res.status(201).json({ token, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the user." });
  }

};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({error: "Email and password are required."});
  }

  try {
    const { user, token } = await UserService.loginUser(email, password);
    res.status(200).json({token, name:user.name, email: user.email});
  } catch (error: any) {
    res.status(401).json({error: error.message})
  }
}
