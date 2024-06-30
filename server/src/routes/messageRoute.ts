import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../services/messageService";

const messageRoute = express.Router();

messageRoute.post("/", getMessages);
messageRoute.post("/create", createMessage);
messageRoute.delete("/delete", deleteMessage);
export default messageRoute;
