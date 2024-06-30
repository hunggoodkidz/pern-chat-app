import express from "express";
import { login, signup, verifyUser } from "../services/authService"
const authRoute = express.Router();

authRoute.get("/verifyUser", verifyUser);
authRoute.post("/signup", signup);
authRoute.post("/login", login);

export default authRoute;
