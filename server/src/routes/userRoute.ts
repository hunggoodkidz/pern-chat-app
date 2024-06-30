import express from "express";
import { getAllUsers } from "../services/userService";

const userRoute = express.Router();

userRoute.post("/all", getAllUsers);
export default userRoute;
