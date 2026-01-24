import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const ChatMessage = ({ msg, typewriter, onUpdate }) => {
  const [displayedText, setDisplayedText] = useState(
    msg.role === "user" ? msg.content : ""
  );

  useEffect(() => {
    if (msg.role === "assistant" && typewriter) {
      setDisplayedText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(msg.content.slice(0, i + 1));
        i++;
        onUpdate(); // scroll during typewriter
        if (i >= msg.content.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    } else if (msg.role === "assistant") {
      setDisplayedText(msg.content);
      onUpdate(); // scroll for old AI messages
    }
  }, [msg.content, msg.role, typewriter, onUpdate]);

  return (
    <div className="w-full flex">
      <div
        className={`max-w-[85%] break-words whitespace-pre-wrap rounded-lg px-4 py-2 border ${
          msg.role === "user"
            ? "ml-auto bg-black text-white border-black"
            : "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        {displayedText}
      </div>
    </div>
  );
};

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestAIIndex, setLatestAIIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token"); // Auth token

  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chats from backend
  useEffect(() => {
    if (!token) return;

    const fetchChats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/chat", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
        scrollBottom();
      } catch (err) {
        console.error("Failed to fetch chats", err);
      }
    };

    fetchChats();
  }, [token]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !token) return;

    const text = input;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/chat",
        { message: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => {
        const next = [...prev, { role: "assistant", content: res.data.reply }];
        setLatestAIIndex(next.length - 1);
        return next;
      });
    } catch (err) {
      console.error("Send failed", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "AI service not available. Your message was saved on the server.",
        },
      ]);
      setLatestAIIndex(messages.length);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl h-[650px] bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden mx-auto">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-800">
        AI Assistant
      </div>

      {/* Chat area */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 px-4 py-4 text-sm overflow-y-auto overflow-x-hidden">
          {messages.length === 0 && !loading && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-full max-w-[85%] text-center text-gray-500">
                <p className="text-sm font-medium">Start a conversation</p>
                <p className="mt-1 text-xs text-gray-400">
                  Ask anything — ideas, summaries, or quick help.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                msg={msg}
                typewriter={index === latestAIIndex}
                onUpdate={scrollBottom}
              />
            ))}

            {loading && (
              <span className="loading loading-dots loading-xs" />
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="shrink-0 px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          <textarea
            rows={2}
            placeholder="Describe your idea…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
