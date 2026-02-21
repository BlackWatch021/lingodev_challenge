import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import socketEvent from "./socket/events.js";
import languageTranslationBulk from "./utils/translationBulk.js";
import languageTranslationSingle from "./utils/translationSingle.js";

dotenv.config();
const port = process.env.PORT || 8001;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json("Hello World!!!!!!!!!!!!!!!!!!");
});

// To translate all messages
app.post("/auth/translation/bulk", async (req, res) => {
  const { messages, currentLanguage, translateTo } = req.body;
  console.log("Hitting translation api");

  const languageTranslationFunction = await languageTranslationBulk(
    messages,
    currentLanguage,
    translateTo,
  );

  res.status(200).json({
    success: true,
    message: "You are hitting transtion API",
    data: languageTranslationFunction,
  });
});

// To translate single text at a time
app.post("/auth/translation/chunk", async (req, res) => {
  const { message, currentLanguage, translateTo } = req.body;
  // console.log(
  //   "Hitting single translation api",
  //   message,
  //   currentLanguage,
  //   translateTo,
  // );

  const languageTranslationFunction = await languageTranslationSingle(
    message,
    currentLanguage,
    translateTo,
  );

  res.status(200).json({
    success: true,
    message: "You are hitting transtion API",
    data: languageTranslationFunction,
  });
});

// Initialize socket events
socketEvent(io);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
