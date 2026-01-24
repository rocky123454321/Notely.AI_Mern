import dotenv from "dotenv";
dotenv.config();

// src/controllers/chatController.js
import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import { OpenRouter } from "@openrouter/sdk";

// Initialize OpenRouter with API key from .env
const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

// GET all chats for the user
export const getChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chats = await Chat.find({ userId }).sort({ createdAt: 1 });
  res.status(200).json(chats);
});

// POST: send message
export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const userId = req.user._id; // From auth middleware

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  // 1️⃣ Save user message
  const savedMessage = await Chat.create({
    userId,
    role: "user",
    content: message
  });

  let aiReply = "";

  try {
    // 2️⃣ Send message to OpenRouter AI
    const stream = await openrouter.chat.send({
      model: "xiaomi/mimo-v2-flash:free",
      messages: [{ role: "user", content: message }],
      stream: true
    });

    // 3️⃣ Read streaming response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) aiReply += content;
    }

    // 4️⃣ Save AI response
    await Chat.create({
      userId,
      role: "assistant",
      content: aiReply
    });

    // 5️⃣ Send reply to frontend
    res.status(200).json({ reply: aiReply });

  } catch (err) {
    console.error("OpenRouter Error:", err.message);

    res.status(200).json({
      reply: "AI service not available. Your message was saved.",
      message: savedMessage
    });
  }
});
