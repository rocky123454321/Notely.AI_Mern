import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Chat = mongoose.model("Chat", ChatSchema);

// Default export so you can import like `import Chat from "../models/Chat.js"`
export default Chat;
