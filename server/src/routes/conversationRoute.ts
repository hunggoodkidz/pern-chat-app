import express from "express";
import {
    createConversation,
    deleteConversation,
    getConversations,
  } from "../services/conversationService";

const conversationRoute = express.Router();

conversationRoute.post("/", getConversations)
conversationRoute.post("/create", createConversation)
conversationRoute.delete("/delete", deleteConversation);

export default conversationRoute