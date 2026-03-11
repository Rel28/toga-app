import React, { useState } from "react";

const formatMessage = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((p, i) =>
        i % 2 === 1 ? <strong key={i}>{p}</strong> : p
      )}
    </span>
  );
};

const Chatbot = ({ isOpen, onToggle }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! Saya asisten TogaPed. Ada yang ingin ditanyakan seputar tanaman herbal?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Maaf, koneksi server terputus." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-999 w-80 h-[450px] bg-white rounded-xl flex flex-col shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="bg-[#357C23] text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
          <span className="font-lexend font-semibold text-sm">
            Asisten TogaPed
          </span>
        </div>
        <button
          onClick={onToggle}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 px-3 py-3 overflow-y-auto flex flex-col gap-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-3 py-2 rounded-xl text-sm text-[#333] border border-gray-100 shadow-sm font-lexend
                            ${
                              msg.sender === "user"
                                ? "self-end bg-[#dcedc8]"
                                : "self-start bg-white"
                            }`}
          >
            {msg.sender === "bot" ? formatMessage(msg.text) : msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="self-start text-xs text-gray-400 font-lexend px-1">
            Asisten sedang mengetik...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-gray-200 flex gap-2 bg-white rounded-b-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Tanya sesuatu..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-lexend outline-none focus:ring-2 focus:ring-[#357C23] focus:border-transparent"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-[#357C23] text-white px-4 py-2 rounded-lg text-sm font-lexend font-semibold hover:bg-[#2A6B1C] transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
