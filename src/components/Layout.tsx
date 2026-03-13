import React from "react";
import { motion } from "motion/react";
import { Target, Github, Menu, Trophy } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3">
              <Target className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-xl uppercase italic leading-none">Habit Inference</span>
              <span className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase">Psychological Survival</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Rankings
            </a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Archives</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Season Pass</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2 bg-emerald-500 text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-emerald-400 transition-all">
              Connect Wallet
            </button>
            <button className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-white/5 py-16 mt-20 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-zinc-500 text-sm space-y-4">
            <div className="flex items-center gap-2 text-white opacity-50">
              <Target className="w-5 h-5" />
              <span className="font-bold uppercase italic">Habit Inference</span>
            </div>
            <p className="max-w-sm">상대방의 습관을 분석하고 진실을 꿰뚫어보세요. 최고의 추론가가 될 준비가 되셨나요?</p>
            <p>© 2026 Habit Inference Game. Built with Google AI Studio.</p>
          </div>
          <div className="flex justify-end gap-8 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
