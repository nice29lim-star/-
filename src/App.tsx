/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, ChevronLeft, Play, LayoutDashboard, 
  Gamepad2, Trophy, Search, Puzzle, FileText, 
  Lock, Timer, RotateCcw, Home, MessageSquare
} from "lucide-react";
import { GAME_IMAGES } from "./constants/images";
import Chat from "./components/Chat";

type AppStage = "INTRO" | "DASHBOARD";
type DashboardView = "POKER" | "MASTERS" | "STAGE1" | "STAGE2" | "STAGE3" | "WORKSHEET1" | "WORKSHEET2" | "WORKSHEET3";

export default function App() {
  const [stage, setStage] = useState<AppStage>("INTRO");
  const [introStep, setIntroStep] = useState(0);
  const [currentView, setCurrentView] = useState<DashboardView>("POKER");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const introImages = [GAME_IMAGES.SCREENS.INTRO_1, GAME_IMAGES.SCREENS.INTRO_2, GAME_IMAGES.SCREENS.INTRO_3];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (stage === "INTRO") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative max-w-5xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={introStep}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              src={introImages[introStep]}
              alt={`Intro ${introStep + 1}`}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-12 inset-x-0 px-12 flex justify-between items-center">
            <button
              onClick={() => introStep > 0 && setIntroStep(s => s - 1)}
              disabled={introStep === 0}
              className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-0"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex gap-3">
              {introImages.map((_, i) => (
                <div key={i} className={`w-16 h-1.5 rounded-full transition-all duration-500 ${i === introStep ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-white/20"}`} />
              ))}
            </div>

            <button
              onClick={() => introStep < introImages.length - 1 ? setIntroStep(s => s + 1) : setStage("DASHBOARD")}
              className="group bg-emerald-500 text-black px-10 py-4 rounded-full font-black text-xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3"
            >
              {introStep === introImages.length - 1 ? "게임 시작" : "다음"} <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 z-50 shadow-lg">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            습관추론게임
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-1.5 rounded text-xs font-bold text-slate-400 hover:text-white transition-colors">
              <Lock className="w-3 h-3" /> 스테이지 코드
            </button>
            <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-1.5 rounded text-xs font-bold text-slate-400 hover:text-white transition-colors">
              <Lock className="w-3 h-3" /> 직업인 코드
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 bg-black/40 px-4 py-1.5 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <Timer className="w-4 h-4" />
              <span className="text-sm font-mono">5 분</span>
            </div>
            <span className="text-2xl font-black font-mono text-white tracking-widest">{formatTime(timeLeft)}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-6 py-1.5 rounded font-black text-sm transition-all ${isTimerRunning ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-500"} text-white`}
            >
              {isTimerRunning ? "STOP" : "START"}
            </button>
            <button 
              onClick={() => { setTimeLeft(300); setIsTimerRunning(false); }}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-1.5 rounded font-bold text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> RESET
            </button>
          </div>
          
          <button 
            onClick={() => setStage("INTRO")}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded text-xs font-bold text-slate-300"
          >
            <Home className="w-4 h-4" /> 메인으로
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col shrink-0">
          <div className="p-6 space-y-8 overflow-y-auto">
            <SidebarSection title="게임">
              <SidebarItem 
                active={currentView === "POKER"} 
                onClick={() => setCurrentView("POKER")}
                icon={<MessageSquare className="w-4 h-4 text-pink-400" />} 
                label="습관 포커 게임" 
              />
              <SidebarItem 
                active={currentView === "MASTERS"} 
                onClick={() => setCurrentView("MASTERS")}
                icon={<Trophy className="w-4 h-4 text-yellow-500" />} 
                label="마스터즈 게임" 
              />
            </SidebarSection>

            <SidebarSection title="활동 안내 페이지">
              <SidebarItem 
                active={currentView === "STAGE1"} 
                onClick={() => setCurrentView("STAGE1")}
                icon={<Search className="w-4 h-4 text-blue-400" />} 
                label="STAGE 1 게임" 
              />
              <SidebarItem 
                active={currentView === "STAGE2"} 
                onClick={() => setCurrentView("STAGE2")}
                icon={<Puzzle className="w-4 h-4 text-green-400" />} 
                label="STAGE 2 활동" 
              />
              <SidebarItem 
                active={currentView === "STAGE3"} 
                onClick={() => setCurrentView("STAGE3")}
                icon={<Puzzle className="w-4 h-4 text-orange-400" />} 
                label="STAGE 3 활동" 
              />
            </SidebarSection>

            <SidebarSection title="활동지">
              <SidebarItem 
                active={currentView === "WORKSHEET1"} 
                onClick={() => setCurrentView("WORKSHEET1")}
                icon={<FileText className="w-4 h-4 text-slate-400" />} 
                label="STAGE 1 활동지" 
              />
              <SidebarItem 
                active={currentView === "WORKSHEET2"} 
                onClick={() => setCurrentView("WORKSHEET2")}
                icon={<FileText className="w-4 h-4 text-slate-400" />} 
                label="STAGE 2 활동지" 
              />
              <SidebarItem 
                active={currentView === "WORKSHEET3"} 
                onClick={() => setCurrentView("WORKSHEET3")}
                icon={<FileText className="w-4 h-4 text-slate-400" />} 
                label="STAGE 3 활동지" 
              />
            </SidebarSection>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#0f172a] overflow-y-auto relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="relative z-10 p-12 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {currentView === "POKER" && (
                <motion.div
                  key="poker"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-white">추론 대상자 파일</h2>
                    <p className="text-slate-400 text-sm">카드를 클릭하면 인물 정보가 공개됩니다 · 모둠 배정은 카드 하단에서 선택하세요</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="aspect-[16/9] bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden relative shadow-2xl transition-all hover:border-blue-500/50 hover:shadow-blue-500/20 flex flex-col items-center justify-center">
                          {/* Diagonal Pattern Overlay */}
                          <div className="absolute inset-0 opacity-10 pointer-events-none" 
                               style={{ backgroundImage: 'repeating-linear-gradient(45deg, #94a3b8 0, #94a3b8 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
                          
                          <div className="relative z-10 flex flex-col items-center space-y-4">
                            <span className="text-6xl font-black text-slate-800 group-hover:text-blue-500/30 transition-colors">?</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-400">추론 대상자</span>
                          </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentView === "STAGE1" && (
                <motion.div
                  key="stage1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black text-white uppercase italic">Stage 1: Hidden Object</h2>
                    <span className="px-4 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">MISSION ACTIVE</span>
                  </div>
                  <div className="aspect-video rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                    <img src={GAME_IMAGES.SCREENS.HIDDEN_OBJECT} className="w-full h-full object-cover" alt="Hidden Object" />
                  </div>
                </motion.div>
              )}

              {currentView === "STAGE2" && (
                <motion.div
                  key="stage2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black text-white uppercase italic">Stage 2: Spot Difference</h2>
                    <span className="px-4 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">MISSION ACTIVE</span>
                  </div>
                  <div className="aspect-video rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                    <img src={GAME_IMAGES.SCREENS.SPOT_DIFFERENCE} className="w-full h-full object-cover" alt="Spot Difference" />
                  </div>
                </motion.div>
              )}

              {currentView === "MASTERS" && (
                <motion.div
                  key="masters"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[70vh] flex flex-col"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white">마스터즈 게임 (AI 대전)</h2>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-pink-500/10 text-pink-500 text-[10px] font-black rounded border border-pink-500/20">RANKED</span>
                    </div>
                  </div>
                  <Chat />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-3">{title}</h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}



