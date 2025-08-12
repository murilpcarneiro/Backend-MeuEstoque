import express from "express";
import { getAuthenticatedUser, login, register } from "../controllers/UserController";

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", getAuthenticatedUser);
export default userRouter;
