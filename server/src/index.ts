import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT, COMPLETE_URL, CLIENT_URL, NODE_ENV } from "./constants.js";
import bodyParser from "body-parser";

import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";
import conversationRouter from "./routes/conversationRoute";

import ioMiddleware from "./middleware/ioMiddleware";
import authMiddleware from "./middleware/authMiddleware";
import { app, io, server } from "./socket/socket";
import { handleEvents } from "./socket/events";
import imageKitAuthRouter from "./routes/imageKitAuthRoute";
import path from 'path';
import express from "express";

dotenv.config();
const __dirname = path.resolve()
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());

// io middleware auth
io.use(ioMiddleware).on("connection", (socket) => {
  handleEvents(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/auth", authRouter);
//protected routes
app.use("/users", authMiddleware, userRouter);
app.use("/conversation", authMiddleware, conversationRouter);
app.use("/img-kit", imageKitAuthRouter);


if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/pern-chat-client/dist")))
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname,"pern-chat-client","dist","index.html"))
  })
}

server.listen(PORT, () => {
  console.log(`server running at ${COMPLETE_URL}`);
});
