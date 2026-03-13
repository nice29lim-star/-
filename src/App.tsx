/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Layout from "./components/Layout";
import Chat from "./components/Chat";
import { GAME_IMAGES } from "./constants/images";
import { motion } from "motion/react";

export default function App() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section with Main Page Image */}
        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src={GAME_IMAGES.SCREENS.MAIN} 
            alt="Main Page" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent flex flex-col justify-end p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
                Habit Inference Game
              </h1>
              <p className="text-xl text-zinc-300 max-w-xl font-medium">
                상대방의 습관을 분석하고 진실을 꿰뚫어보세요. 
                최고의 추론가가 될 준비가 되셨나요?
              </p>
              <div className="flex gap-4 pt-4">
                <button className="bg-emerald-500 text-black px-8 py-3 rounded-full font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                  게임 시작하기
                </button>
                <button className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
                  튜토리얼 보기
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Character Gallery */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              주요 캐릭터
            </h2>
            <button className="text-sm text-zinc-400 hover:text-white transition-colors">전체보기</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <CharacterCard name="페이커" image={GAME_IMAGES.CHARACTERS.FAKER} role="Pro Gamer" />
            <CharacterCard name="손흥민" image={GAME_IMAGES.CHARACTERS.SON_HEUNG_MIN} role="Athlete" />
            <CharacterCard name="아이유" image={GAME_IMAGES.CHARACTERS.IU} role="Artist" />
            <CharacterCard name="이재용" image={GAME_IMAGES.CHARACTERS.LEE_JAE_YONG} role="CEO" />
            <CharacterCard name="장원영" image={GAME_IMAGES.CHARACTERS.JANG_WON_YOUNG} role="Idol" />
            <CharacterCard name="오타니" image={GAME_IMAGES.CHARACTERS.OHTANI} role="Athlete" />
            <CharacterCard name="유재석" image={GAME_IMAGES.CHARACTERS.YOO_JAE_SUK} role="Entertainer" />
          </div>
        </section>

        {/* Game Content & Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">AI 추론 봇</h2>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20">ONLINE</span>
            </div>
            <Chat />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">게임 가이드</h2>
            <GuideCard 
              title="바퀴벌레 포커 룰" 
              image={GAME_IMAGES.SCREENS.POKER_DESC_1} 
              desc="블러핑의 기초를 배워보세요."
            />
            <GuideCard 
              title="습관 추론 스테이지" 
              image={GAME_IMAGES.SCREENS.GAME_DESC} 
              desc="상대방의 패턴을 파악하는 법."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CharacterCard({ name, image, role }: { name: string; image: string; role: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-zinc-900"
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{role}</span>
        <h3 className="text-lg font-bold text-white">{name}</h3>
      </div>
    </motion.div>
  );
}

function GuideCard({ title, image, desc }: { title: string; image: string; desc: string }) {
  return (
    <div className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white group-hover:text-emerald-500 transition-colors">{title}</h3>
        <p className="text-sm text-zinc-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}


