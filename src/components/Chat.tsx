import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";
import { generateResponse } from "../lib/gemini";

interface ChatProps {
  systemInstruction?: string;
  placeholder?: string;
}

export default function Chat({ 
  systemInstruction = "You are a participant in a bluffing game called 'Cockroach Poker'. You have a specific habit (e.g., repeating words, pausing before lying). Try to hide it but leave subtle clues for the player to infer.",
  placeholder = "대화를 통해 습관을 파악하세요..."
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateResponse(input, systemInstruction);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response || "분석에 실패했습니다. 다시 시도해주세요.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-zinc-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Secure Inference Link</span>
        </div>
        <ShieldCheck className="w-4 h-4 text-zinc-700" />
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
              <Bot className="w-10 h-10 opacity-20" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest">Inference Session Started</p>
              <p className="text-xs opacity-50">대화를 시작하여 상대방의 습관을 분석하세요.</p>
            </div>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                msg.role === "user" 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                  : "bg-zinc-800 border-white/5 text-zinc-400"
              }`}>
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[75%] p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === "user" 
                  ? "bg-emerald-500 text-black font-bold rounded-tr-none" 
                  : "bg-zinc-800/50 text-zinc-200 border border-white/5 rounded-tl-none backdrop-blur-md"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-400">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-zinc-800/50 p-5 rounded-2xl rounded-tl-none border border-white/5 backdrop-blur-md">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-6 border-t border-white/5 bg-zinc-900/50 backdrop-blur-xl">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all disabled:opacity-30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
