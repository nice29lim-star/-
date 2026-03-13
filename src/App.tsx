/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Layout from "./components/Layout";
import Chat from "./components/Chat";
import { GAME_IMAGES } from "./constants/images";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Play, Info, Users, Target, Search } from "lucide-react";

type GameStage = "START" | "INTRO" | "MINI_GAME_1" | "MINI_GAME_2" | "MAIN_GAME" | "CHARACTER_SELECT";

export default function App() {
  const [stage, setStage] = useState<GameStage>("START");
  const [introStep, setIntroStep] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const introImages = [GAME_IMAGES.SCREENS.INTRO_1, GAME_IMAGES.SCREENS.INTRO_2, GAME_IMAGES.SCREENS.INTRO_3];

  const nextIntro = () => {
    if (introStep < introImages.length - 1) {
      setIntroStep(prev => prev + 1);
    } else {
      setStage("MINI_GAME_1");
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {stage === "START" && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Hero Section */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={GAME_IMAGES.SCREENS.MAIN} 
                alt="Main Page" 
                className="w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                    <Target className="w-3 h-3" /> New Season Available
                  </div>
                  <h1 className="text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
                    Habit <br /> Inference
                  </h1>
                  <p className="text-xl text-zinc-300 max-w-xl font-medium leading-relaxed">
                    상대방의 미세한 습관을 포착하고 진실을 추론하세요. 
                    심리전과 관찰력의 정점에 도전하는 서바이벌 게임.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setStage("INTRO")}
                      className="group bg-emerald-500 text-black px-10 py-4 rounded-full font-black text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
                    >
                      <Play className="w-5 h-5 fill-current" /> 게임 시작하기
                    </button>
                    <button className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                      <Info className="w-5 h-5" /> 튜토리얼
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Search className="text-emerald-500" />}
                title="관찰력 테스트"
                desc="숨은 그림 찾기와 틀린 그림 찾기로 당신의 눈을 단련하세요."
              />
              <FeatureCard 
                icon={<Users className="text-blue-500" />}
                title="심리전"
                desc="바퀴벌레 포커 스타일의 블러핑으로 상대를 속이세요."
              />
              <FeatureCard 
                icon={<Target className="text-purple-500" />}
                title="습관 추론"
                desc="AI 캐릭터들의 고유한 습관을 분석하여 정체를 밝히세요."
              />
            </div>
          </motion.div>
        )}

        {stage === "INTRO" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="relative h-[80vh] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10"
          >
            <img 
              src={introImages[introStep]} 
              alt={`Intro ${introStep + 1}`} 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                <button 
                  onClick={() => introStep > 0 ? setIntroStep(s => s - 1) : setStage("START")}
                  className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                  {introImages.map((_, i) => (
                    <div key={i} className={`w-12 h-1 rounded-full transition-all ${i === introStep ? "bg-emerald-500" : "bg-white/20"}`} />
                  ))}
                </div>
                <button 
                  onClick={nextIntro}
                  className="px-8 py-3 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center gap-2"
                >
                  {introStep === introImages.length - 1 ? "미니게임 시작" : "다음"} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "MINI_GAME_1" && (
          <motion.div
            key="mini1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white uppercase italic">Stage 01: Hidden Object</h2>
                <p className="text-zinc-400">화면에서 숨겨진 단서를 찾아 클릭하세요.</p>
              </div>
              <button 
                onClick={() => setStage("MINI_GAME_2")}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10"
              >
                건너뛰기
              </button>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 cursor-crosshair">
              <img 
                src={GAME_IMAGES.SCREENS.HIDDEN_OBJECT} 
                alt="Hidden Object" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-mono">
                Found: 0 / 5
              </div>
              {/* Clickable areas would go here */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                onClick={() => setStage("MINI_GAME_2")}
              >
                <span className="bg-emerald-500 text-black px-8 py-3 rounded-full font-bold">다음 스테이지로</span>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "MINI_GAME_2" && (
          <motion.div
            key="mini2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white uppercase italic">Stage 02: Spot Difference</h2>
                <p className="text-zinc-400">두 그림 사이의 다른 점을 찾아내세요.</p>
              </div>
              <button 
                onClick={() => setStage("CHARACTER_SELECT")}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10"
              >
                건너뛰기
              </button>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
              <img 
                src={GAME_IMAGES.SCREENS.SPOT_DIFFERENCE} 
                alt="Spot Difference" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => setStage("CHARACTER_SELECT")}
              >
                <span className="bg-emerald-500 text-black px-8 py-3 rounded-full font-bold">메인 게임 진입</span>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "CHARACTER_SELECT" && (
          <motion.div
            key="char"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-white uppercase italic">Select Your Target</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">추론을 시작할 대상을 선택하세요. 각 캐릭터는 고유한 습관과 패턴을 가지고 있습니다.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <CharacterCard 
                name="페이커" 
                image={GAME_IMAGES.CHARACTERS.FAKER} 
                role="Pro Gamer" 
                onClick={() => { setSelectedCharacter("페이커"); setStage("MAIN_GAME"); }}
              />
              <CharacterCard 
                name="손흥민" 
                image={GAME_IMAGES.CHARACTERS.SON_HEUNG_MIN} 
                role="Athlete" 
                onClick={() => { setSelectedCharacter("손흥민"); setStage("MAIN_GAME"); }}
              />
              <CharacterCard 
                name="아이유" 
                image={GAME_IMAGES.CHARACTERS.IU} 
                role="Artist" 
                onClick={() => { setSelectedCharacter("아이유"); setStage("MAIN_GAME"); }}
              />
              <CharacterCard 
                name="이재용" 
                image={GAME_IMAGES.CHARACTERS.LEE_JAE_YONG} 
                role="CEO" 
                onClick={() => { setSelectedCharacter("이재용"); setStage("MAIN_GAME"); }}
              />
              <CharacterCard 
                name="장원영" 
                image={GAME_IMAGES.CHARACTERS.JANG_WON_YOUNG} 
                role="Idol" 
                onClick={() => { setSelectedCharacter("장원영"); setStage("MAIN_GAME"); }}
              />
            </div>
          </motion.div>
        )}

        {stage === "MAIN_GAME" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500">
                    <img 
                      src={selectedCharacter ? (GAME_IMAGES.CHARACTERS as any)[Object.keys(GAME_IMAGES.CHARACTERS).find(k => (GAME_IMAGES.CHARACTERS as any)[k].includes(selectedCharacter)) || "FAKER"] : ""} 
                      alt="Target" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{selectedCharacter}와(과)의 심리전</h3>
                    <p className="text-xs text-emerald-500 font-mono">ANALYZING HABITS...</p>
                  </div>
                </div>
                <button 
                  onClick={() => setStage("CHARACTER_SELECT")}
                  className="text-xs text-zinc-500 hover:text-white"
                >
                  대상 변경
                </button>
              </div>
              <Chat />
            </div>
            
            <div className="space-y-6">
              <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-emerald-500" /> 추론 가이드
                </h3>
                <img 
                  src={GAME_IMAGES.SCREENS.GAME_DESC} 
                  alt="Guide" 
                  className="w-full rounded-xl border border-white/10"
                />
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <h4 className="font-bold text-white text-sm mb-1">바퀴벌레 포커 룰</h4>
                    <p className="text-xs text-zinc-400">상대가 제시하는 카드가 진실인지 거짓인지 습관을 통해 파악하세요.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <h4 className="font-bold text-white text-sm mb-1">습관 포인트</h4>
                    <p className="text-xs text-zinc-400">특정 단어를 반복하거나 대답이 늦어질 때 의심해 보세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function CharacterCard({ name, image, role, onClick }: { name: string; image: string; role: string; onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 cursor-pointer"
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">{role}</span>
        <h3 className="text-2xl font-black text-white uppercase italic">{name}</h3>
        <div className="h-1 w-0 group-hover:w-full bg-emerald-500 transition-all duration-500 mt-2" />
      </div>
    </motion.div>
  );
}



