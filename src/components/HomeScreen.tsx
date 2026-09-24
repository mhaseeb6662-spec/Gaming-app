"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, ArrowRight, User, Rocket, Plane, Target, Layers, Gem, Gift, RefreshCcw, CircleDollarSign, Aperture, Volume2, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

const gamesList = [
  // Row 1
  { name: "Aviator", img: "bg-gradient-to-b from-[#2a2a2a] to-[#501c1c]", logo: "WG", hot: true, graphic: "🛩️", popups: ["none"] },
  { name: "Crash", img: "bg-gradient-to-b from-[#3a6be8] to-[#1e3c8c]", logo: "WG", hot: true, graphic: "🚀" },
  { name: "Crazy 777", img: "bg-gradient-to-b from-[#411b6c] to-[#250d40]", logo: "WG", hot: true, graphic: "🎰" },
  // Row 2
  { name: "Pinata Wins", img: "bg-gradient-to-b from-[#f26b3a] to-[#d61a5c]", logo: "PG", hot: true, graphic: "🪅" },
  { name: "Aviator", img: "bg-gradient-to-b from-[#333] to-[#111]", logo: "SPRIBE", hot: false, graphic: "✈️" },
  { name: "Aviator", img: "bg-gradient-to-b from-[#400] to-[#100]", logo: "💠", hot: false, graphic: "🛩️" },
  // Row 3
  { name: "WG Slots", img: "bg-gradient-to-b from-[#0f4d19] to-[#082a0e]", logo: "WG", hot: false, graphic: "🦁", popups: ["coin"] },
  { name: "Jili Slots", img: "bg-gradient-to-b from-[#3d8c1c] to-[#194008]", logo: "JILI", hot: false, graphic: "🃏" },
  { name: "PG Slots", img: "bg-gradient-to-b from-[#1c7b8c] to-[#083a40]", logo: "PG", hot: false, graphic: "🐱" },
  // Row 4
  { name: "13000X", img: "bg-gradient-to-b from-[#8c3c1c] to-[#401608]", logo: "DB", hot: false, graphic: "🎯", popups: ["wheel"] },
  { name: "JILI Extra", img: "bg-gradient-to-b from-[#b8911c] to-[#5c4605]", logo: "JILI", hot: false, graphic: "👑" },
  { name: "iN Games", img: "bg-gradient-to-b from-[#444] to-[#222]", logo: "iN", hot: false, graphic: "🎲" },
  // Row 5
  { name: "Fortune Tiger", img: "bg-gradient-to-b from-[#c41e3a] to-[#800000]", logo: "PG", hot: true, graphic: "🐅" },
  { name: "Dragon Hatch", img: "bg-gradient-to-b from-[#e67300] to-[#8c3a00]", logo: "PG", hot: false, graphic: "🐉" },
  { name: "Sweet Bonanza", img: "bg-gradient-to-b from-[#ff6699] to-[#990033]", logo: "PP", hot: false, graphic: "🍬" },
  // Row 6
  { name: "Super Ace", img: "bg-gradient-to-b from-[#0066cc] to-[#003366]", logo: "JILI", hot: true, graphic: "♠️" },
  { name: "Golden Empire", img: "bg-gradient-to-b from-[#cca300] to-[#665200]", logo: "JILI", hot: false, graphic: "🏰" },
  { name: "Mines", img: "bg-gradient-to-b from-[#33cc33] to-[#006600]", logo: "SPRIBE", hot: false, graphic: "💣" },
  // Row 7
  { name: "Roulette", img: "bg-gradient-to-b from-[#2e004f] to-[#170028]", logo: "EVO", hot: false, graphic: "🎡" },
  { name: "Baccarat", img: "bg-gradient-to-b from-[#004d40] to-[#002620]", logo: "EVO", hot: true, graphic: "👔" },
  { name: "Blackjack", img: "bg-gradient-to-b from-[#1a1a1a] to-[#000000]", logo: "EVO", hot: false, graphic: "🂡" },
];

const miniGamesList = [
  { 
    name: "Blockchain", 
    img: "bg-gradient-to-b from-[#2b2b68] via-[#4d4d99] to-[#3ca33c]", 
    logo: <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#39ff14] to-[#00aaff]">WG</span>, 
    graphic: "🦜🚀", 
    popups: ["coin"] 
  },
  { 
    name: "Spribe Blockchain", 
    img: "bg-gradient-to-b from-[#2b2b68] via-[#4d4d99] to-[#3ca33c]", 
    logo: "SPRIBE", 
    graphic: "✈️" 
  },
  { 
    name: "2J Blockchain", 
    img: "bg-gradient-to-b from-[#2b2b68] via-[#4d4d99] to-[#3ca33c]", 
    logo: <span className="text-[#ff6600]">2J</span>, 
    graphic: "🛩️" 
  },
];

const slotGamesList = [
  // Row 1 (Collage cards)
  { 
    name: "WG Slots", 
    collage: [
       "bg-gradient-to-br from-red-600 to-orange-500",
       "bg-gradient-to-bl from-yellow-500 to-orange-400",
       "bg-gradient-to-t from-green-600 to-emerald-400"
    ],
    graphic: ["🎰", "🤠", "🦁"],
    logo: <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#39ff14] to-[#00aaff] drop-shadow-md">WG</span>, 
  },
  { 
    name: "PG Slots", 
    collage: [
       "bg-gradient-to-br from-yellow-900 to-amber-700",
       "bg-gradient-to-bl from-stone-800 to-stone-600",
       "bg-gradient-to-t from-teal-500 to-cyan-300"
    ],
    graphic: ["🗿", "🔫", "🐱"],
    logo: <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">PG</span>, 
  },
  { 
    name: "Jili Slots", 
    collage: [
       "bg-gradient-to-br from-green-800 to-emerald-600",
       "bg-gradient-to-bl from-yellow-400 to-amber-500",
       "bg-gradient-to-t from-green-500 to-lime-400"
    ],
    graphic: ["💵", "🦅", "🃏"],
    logo: <span className="text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">JILI</span>, 
  },
  // Row 2 (Character cards)
  { 
    name: "DB Slots", 
    img: "bg-gradient-to-b from-purple-700 via-indigo-500 to-teal-500", 
    logo: <span className="text-orange-500 italic font-black drop-shadow-md">DB</span>, 
    graphic: "🐒", 
    popups: ["coin_top", "wheel_bottom"] 
  },
  { 
    name: "FC Slots", 
    img: "bg-gradient-to-b from-blue-600 via-cyan-500 to-green-600", 
    logo: <span className="text-white italic font-black drop-shadow-md">FC</span>, 
    graphic: "🐷" 
  },
  { 
    name: "YellowBat Slots", 
    img: "bg-gradient-to-b from-indigo-500 via-blue-400 to-yellow-600", 
    logo: <span className="text-yellow-400 font-black drop-shadow-md">YB</span>, 
    graphic: "🤴", 
    popups: ["aviator_multiplier"] 
  },
];

const fishingGamesList = [
  { 
    name: "JILI Fishing", 
    img: "bg-gradient-to-b from-[#0c4a85] via-[#187bcd] to-[#3ca33c]", 
    logo: <span className="text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-[15px]">JILI</span>, 
    graphic: "🦈" 
  },
  { 
    name: "WG Fishing", 
    img: "bg-gradient-to-b from-[#0c4a85] via-[#187bcd] to-[#3ca33c]", 
    logo: <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#39ff14] to-[#00aaff] drop-shadow-md text-[15px]">WG</span>, 
    graphic: "👲" 
  },
  { 
    name: "YellowBat Fishing", 
    img: "bg-gradient-to-b from-[#0c4a85] via-[#187bcd] to-[#3ca33c]", 
    logo: <span className="text-yellow-400 font-black drop-shadow-md text-[15px]">YB</span>, 
    graphic: "🦅" 
  },
];

const cardsGamesList = [
  { 
    name: "WG Cards", 
    img: "bg-gradient-to-b from-[#5c2a85] via-[#7d3cb3] to-[#3ca33c]", 
    logo: <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#39ff14] to-[#00aaff] drop-shadow-md text-[15px]">WG</span>, 
    graphic: "🚘", 
    popups: ["coin_top", "huge_bottom"] 
  },
  { 
    name: "JILI Cards", 
    img: "bg-gradient-to-b from-[#5c2a85] via-[#7d3cb3] to-[#3ca33c]", 
    logo: <span className="text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-[15px]">JILI</span>, 
    graphic: "👩🏽" 
  },
  { 
    name: "KingMidas Cards", 
    img: "bg-gradient-to-b from-[#5c2a85] via-[#7d3cb3] to-[#3ca33c]", 
    logo: <div className="w-4 h-4 bg-pink-500 rounded-full border border-white flex items-center justify-center mx-auto shadow-md"><span className="text-[7px] text-white font-bold">KM</span></div>, 
    graphic: "👩🏻", 
    popups: ["trophies"] 
  },
];

const liveGamesList = [
  { 
    name: "EVO Live", 
    img: "bg-gradient-to-b from-[#1a2b4c] via-[#2a4b7c] to-[#3ca33c]", 
    logo: <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mx-auto shadow-md border border-white/20"><div className="w-3 h-3 rounded-full border-b-[3px] border-l-[3px] border-white transform -rotate-45"></div></div>, 
    graphic: "👩🏼", 
    star: false
  },
  { 
    name: "PP Live", 
    img: "bg-gradient-to-b from-[#1a2b4c] via-[#2a4b7c] to-[#3ca33c]", 
    logo: <div className="w-6 h-6 bg-orange-500 rounded-full flex flex-col items-center justify-center mx-auto shadow-md border-2 border-white"><span className="text-[10px] text-white leading-none -mt-1">👑</span></div>, 
    graphic: "👩🏻", 
    star: true
  },
  { 
    name: "Ezugi Live", 
    img: "bg-gradient-to-b from-[#1a2b4c] via-[#2a4b7c] to-[#3ca33c]", 
    logo: <span className="text-white font-black drop-shadow-[0_2px_4px_rgba(255,0,0,1)] text-[16px] tracking-tight">Ezugi</span>, 
    graphic: "👩🏼", 
    star: true
  },
];

const sportsGamesList = [
  { 
    name: "9Wickets Sports", 
    img: "bg-gradient-to-b from-[#3ba4ff] via-[#5cb8ff] to-[#3ca33c]", 
    logo: <span className="text-white font-black drop-shadow-md italic text-[14px] tracking-tighter">9WICKET</span>, 
    graphic: "🏏", 
    star: true,
    popups: ["coin_top", "wheel_bottom"]
  },
  { 
    name: "WG Sports", 
    img: "bg-gradient-to-b from-[#3ba4ff] via-[#5cb8ff] to-[#3ca33c]", 
    logo: <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#39ff14] to-[#00aaff] drop-shadow-md text-[16px] italic font-black">WG</span>, 
    graphic: "🏃‍♂️", 
    star: true
  },
  { 
    name: "SABA Sports", 
    img: "bg-gradient-to-b from-[#3ba4ff] via-[#5cb8ff] to-[#3ca33c]", 
    logo: <div className="flex items-center gap-1"><div className="w-5 h-5 bg-neutral-600 rounded-full flex flex-col items-center justify-center border border-white/40 shadow-sm"><span className="text-[6px] text-white font-black leading-none">SA</span><span className="text-[6px] text-white font-black leading-none -mt-[1px]">BA</span></div></div>, 
    graphic: "⚽", 
    star: true,
    popups: ["deposit_rewards"]
  },
];

const grandPrizeWinners = [
  { img: "bg-gradient-to-br from-green-400 to-emerald-600", game: "WG", icon: "🀄", user: "1***87", amount: "50,760.0" },
  { img: "bg-gradient-to-br from-yellow-300 to-amber-600", game: "JILI", icon: "🦅", user: "7***93", amount: "88,000.0" },
  { img: "bg-gradient-to-br from-red-500 to-red-900", game: "SPRIBE", icon: "✈️", user: "3***31", amount: "122K" },
  { img: "bg-gradient-to-br from-purple-500 to-indigo-800", game: "JILI", icon: "🗿", user: "4***87", amount: "58,500.0" },
  { img: "bg-gradient-to-br from-blue-400 to-blue-800", game: "PG", icon: "🐅", user: "9***12", amount: "15,200.0" },
  { img: "bg-gradient-to-br from-orange-400 to-red-600", game: "EVO", icon: "🎡", user: "2***44", amount: "250K" },
];
const marqueeWinners = [...grandPrizeWinners, ...grandPrizeWinners, ...grandPrizeWinners, ...grandPrizeWinners];

const heroBanners = [
  {
    title: "Become an agent",
    subtitle: "Multiple agent\npromotion rebate offers",
    highlight: "Easily earn millions per month",
    bg: "from-[#0a2e13] via-[#103a1a] to-[#1f4a22]",
    border: "border-[#2a6a32]",
    shadow: "shadow-[0_0_15px_rgba(57,255,20,0.15)]",
    primaryText: "text-[#ffdf00]",
    badgeBorder: "border-[#39ff14]",
    highlightColor: "text-[#ffdf00]",
    emoji1: "🤵‍♂️", emoji2: "💰", emoji3: "🌍"
  },
  {
    title: "Welcome Bonus",
    subtitle: "New member\nfirst deposit 100% bonus",
    highlight: "Get up to Rs 8,888 free",
    bg: "from-[#2e0a0a] via-[#3a1010] to-[#4a1f1f]",
    border: "border-[#6a2a2a]",
    shadow: "shadow-[0_0_15px_rgba(255,57,20,0.15)]",
    primaryText: "text-[#ffb347]",
    badgeBorder: "border-[#ff3914]",
    highlightColor: "text-[#ffb347]",
    emoji1: "🎁", emoji2: "💵", emoji3: "✨"
  },
  {
    title: "Daily Check-in",
    subtitle: "Log in every day\nto claim free rewards",
    highlight: "7 days streak for VIP box",
    bg: "from-[#0a1b2e] via-[#10243a] to-[#1f384a]",
    border: "border-[#2a4d6a]",
    shadow: "shadow-[0_0_15px_rgba(20,157,255,0.15)]",
    primaryText: "text-[#47b3ff]",
    badgeBorder: "border-[#149dff]",
    highlightColor: "text-[#47b3ff]",
    emoji1: "📅", emoji2: "💎", emoji3: "🔥"
  },
  {
    title: "VIP Club",
    subtitle: "Upgrade VIP level\nunlock exclusive benefits",
    highlight: "Weekly salary & loss rebate",
    bg: "from-[#220a2e] via-[#2d103a] to-[#3d1f4a]",
    border: "border-[#572a6a]",
    shadow: "shadow-[0_0_15px_rgba(200,20,255,0.15)]",
    primaryText: "text-[#d147ff]",
    badgeBorder: "border-[#c814ff]",
    highlightColor: "text-[#d147ff]",
    emoji1: "👑", emoji2: "⭐", emoji3: "🚀"
  }
];

export default function HomeScreen() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroBanners.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#111111] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMTExIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMTkxOTE5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] text-white font-sans relative pb-[90px] sm:pb-[100px]">
      
      {/* Premium Top App Banner */}
      <div className="w-full max-w-md mx-auto bg-[#0a0a0a] flex items-center justify-between px-3 py-2 border-b border-neutral-900 sticky top-0 z-50 h-[50px]">
        
        {/* Left Side: X, Logo, Text */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button className="text-[#00ff00] p-1 -ml-1 hover:opacity-80 transition-opacity shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="w-9 h-9 rounded-lg bg-[#004d1c] flex flex-col items-center justify-center border border-green-900/50 shrink-0">
            <span className="text-[11px] text-white font-black leading-none font-serif tracking-tighter">JJwin</span>
            <span className="text-[6px] text-white/90 leading-none mt-0.5">.com</span>
          </div>

          {/* Text ON ONE LINE */}
          <div className="truncate text-[13px] font-bold tracking-tight">
            <span className="text-white">Download app bonus </span>
            <span className="text-[#00ff00]">Rs 888</span>
          </div>
        </div>
        
        {/* Right: Button */}
        <button className="bg-[#008a27] text-white rounded-md font-bold text-[11px] leading-tight flex flex-col items-center justify-center h-[32px] px-3 shrink-0 ml-2">
          <span>Download</span>
          <span>now</span>
        </button>

      </div>

      {/* Main Header (Pixel Perfect & Responsive) */}
      <div className="w-full max-w-md mx-auto bg-[#0a0a0a] flex items-center justify-between px-3 sticky top-[50px] z-40 border-b border-neutral-900 min-h-[55px]">
        <div className="flex items-center gap-2 shrink-0">
          {/* Custom Arrow Menu Icon */}
          <button className="p-1 -ml-1 flex items-center justify-center text-neutral-300 shrink-0">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <line x1="4" y1="8" x2="12" y2="8"></line>
               <line x1="4" y1="12" x2="17" y2="12"></line>
               <polyline points="13 8.5 17 12 13 15.5"></polyline>
               <line x1="4" y1="16" x2="12" y2="16"></line>
            </svg>
          </button>
          
          {/* Custom King Logo */}
          <div className="flex items-end shrink-0 -ml-1 relative">
            {/* King face silhouette approximation */}
            <svg className="w-8 h-9 shrink-0 absolute -top-4 -left-1 z-10" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
              {/* Crown */}
              <path d="M7 6L10 12L16 4L22 12L25 6L26 15H6L7 6Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
              {/* Face profile facing left */}
              <path d="M25 15H8C8 15 6 18 6 20C6 21 8 22 8 22C8 22 7 24 7 25C7 26 8 27 10 27C12 27 14 26 16 28C18 30 22 30 25 30V15Z" fill="white"/>
            </svg>
            <div className="text-[28px] font-serif font-black tracking-tighter text-white flex items-end leading-none ml-4 relative z-0">
              {/* First J with Spade cutout */}
              <span className="relative">
                J
                <span className="absolute left-[3px] bottom-[3px] text-[8px] text-[#0a0a0a]">♠</span>
              </span>
              Jwin
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 ml-auto shrink-0 mt-0.5">
          <button className="bg-[#7ceb3d] text-black px-3.5 py-1.5 rounded-[10px] text-[13px] font-bold min-w-[55px] tracking-tight shrink-0">Login</button>
          
          <div className="relative shrink-0">
            <button className="bg-black border-[1.5px] border-[#7ceb3d] text-[#7ceb3d] px-3.5 py-1.5 rounded-[10px] text-[13px] font-bold min-w-[65px] tracking-tight shrink-0">Register</button>
            
            {/* Tooltip hovering over right side */}
            <div className="absolute -top-[16px] right-0 bg-[#00ff00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center justify-center z-10 whitespace-nowrap">
              10-666
              {/* Down arrow triangle aligned to right */}
              <div className="absolute -bottom-[3px] right-2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#00ff00]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto relative pt-4">
        
        {/* Quick Links (Pixel Perfect) */}
        <div className="grid grid-cols-6 gap-2 px-3 mb-4 mt-1">
          {[
            { name: "Invite", icon: <User className="w-6 h-6 text-[#39ff14]" /> },
            { name: "VIP", icon: <Gem className="w-6 h-6 text-[#39ff14]" /> },
            { name: "Receive", icon: <Gift className="w-6 h-6 text-[#39ff14]" /> },
            { name: "Rebate", icon: <RefreshCcw className="w-6 h-6 text-[#39ff14]" /> },
            { name: "Subsidy", icon: <CircleDollarSign className="w-6 h-6 text-[#39ff14]" /> },
            { name: "Spins", icon: <Aperture className="w-6 h-6 text-[#39ff14]" /> },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-full aspect-square rounded-[10px] bg-gradient-to-b from-[#1a4a22] to-black border-t-[2px] border-t-[#39ff14] border-x border-b border-black flex items-center justify-center shadow-[0_0_12px_rgba(57,255,20,0.2)] mb-1">
                {item.icon}
              </div>
              <span className="text-white text-[11px] font-bold">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Main Banner (Animated Carousel) */}
        <div className="px-3 mb-3 relative h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full h-full rounded-xl absolute inset-0 mx-3 overflow-hidden bg-gradient-to-r ${heroBanners[heroIndex].bg} border ${heroBanners[heroIndex].border} ${heroBanners[heroIndex].shadow}`}
              style={{ width: 'calc(100% - 24px)' }}
            >
              {/* Cyber matrix background effect */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.2)_50%,transparent_51%)] bg-[length:40px_100%]"></div>
              
              <div className="relative z-10 p-4 h-full flex flex-col justify-between w-[70%]">
                <h2 className={`${heroBanners[heroIndex].primaryText} font-black text-[22px] italic tracking-tight leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
                  {heroBanners[heroIndex].title}
                </h2>
                
                <div className={`bg-black/90 rounded-full border ${heroBanners[heroIndex].badgeBorder} px-2.5 py-1.5 my-1 shadow-sm inline-block w-fit`}>
                  <p className="text-white text-[11px] font-bold leading-tight whitespace-pre-line">
                    {heroBanners[heroIndex].subtitle}
                  </p>
                </div>
                
                <p className="text-white text-[12px] font-bold mt-1 tracking-tight">
                  {heroBanners[heroIndex].highlight.split(' ').map((word, i, arr) => 
                    (i === arr.length - 1 || i === arr.length - 2) ? 
                      <span key={i} className={`${heroBanners[heroIndex].highlightColor} mr-1`}>{word}</span> : 
                      <span key={i} className="mr-1">{word}</span>
                  )}
                </p>
              </div>
              
              {/* Right side placeholder for 3D elements */}
              <div className="absolute right-0 top-0 bottom-0 w-[45%] pointer-events-none flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.8, y: 10 }}
                  animate={{ scale: 1, y: -8 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="text-6xl drop-shadow-2xl translate-x-2"
                >
                  {heroBanners[heroIndex].emoji1}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-2 right-2 text-4xl drop-shadow-xl z-20"
                >
                  {heroBanners[heroIndex].emoji2}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 right-10 text-3xl drop-shadow-xl z-10"
                >
                  {heroBanners[heroIndex].emoji3}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {heroBanners.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === heroIndex ? 'w-[12px] bg-white' : 'w-1.5 bg-white/40'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Alliance Cards (Pixel Perfect) */}
        <div className="px-3 mb-4 grid grid-cols-3 gap-2">
          {[
            { logo: "PKR365", text: "Rs 666", color: "from-[#051f10]", border: "border-[#00ff00]", shadow: "shadow-[0_0_10px_rgba(0,255,0,0.2)]", icon: "🦅" },
            { logo: "PKRBET", text: "Rs 888", color: "from-[#0a1a2f]", border: "border-[#00aaff]", shadow: "shadow-[0_0_10px_rgba(0,170,255,0.2)]", icon: "🐔" },
            { logo: "PX8888", text: "Rs 888", color: "from-[#1a1a1a]", border: "border-[#00ff00]", shadow: "shadow-[0_0_10px_rgba(0,255,0,0.2)]", icon: "👑" },
          ].map((card, i) => (
            <div key={i} className={`relative rounded-xl bg-gradient-to-b ${card.color} to-[#0a0a0a] border border-neutral-800 border-b-[2px] ${card.border} p-1.5 flex flex-col items-center justify-between h-[85px] ${card.shadow}`}>
              {/* Red dot */}
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#ff3b30] rounded-full border border-black z-10 shadow-sm"></div>
              
              <h3 className="text-white font-black italic text-[14px] leading-tight flex items-center mt-1">
                 {card.logo}
              </h3>
              
              <div className="text-[28px] mt-auto mb-1 opacity-90 drop-shadow-md">{card.icon}</div>
              
              <div className="w-full bg-black/80 rounded-full py-[3px] px-1 border border-white/10 text-center relative z-10 mt-auto flex flex-col items-center">
                 <p className="text-[8px] text-white font-bold leading-none whitespace-nowrap mb-[2px]">Free to claim <span className="text-[#00ff00]">{card.text}</span></p>
                 <div className="bg-black text-white text-[6px] border border-neutral-600 rounded-full py-[1px] px-1 font-bold leading-none w-fit">Cooperation Alliance</div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Bar (Pixel Perfect) */}
        <div className="px-3 mb-6 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-neutral-400 shrink-0" />
          <div className="flex-1 overflow-hidden relative h-5 flex items-center border-r border-neutral-800">
             <p className="text-[#ffdf00] text-[13px] whitespace-nowrap absolute left-0 animate-marquee">
               Welcome to JJwin.com - The Premier Online Gaming I...
             </p>
          </div>
          <div className="relative shrink-0 ml-1 mr-1">
            <Mail className="w-6 h-6 text-neutral-500" />
            <div className="absolute -top-1.5 -right-2 bg-[#ff3b30] text-white text-[10px] font-bold px-1 rounded-md min-w-[18px] text-center shadow-sm leading-tight border border-black">
              31
            </div>
          </div>
        </div>

        {/* Category Navigation Slider (Pixel Perfect) */}
        <div className="relative px-1 mb-8">
          {/* Left Arrow */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10">
            <button className="w-6 h-6 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 shadow-md">
              <ChevronLeft className="w-4 h-4 -ml-0.5" />
            </button>
          </div>

          {/* Slider Container */}
          <div className="flex justify-between items-center overflow-x-hidden px-8">
            {[
              { name: "Slot", icon: "🎰" },
              { name: "Fishing", icon: "🦈" },
              { name: "Cards", icon: "🃏" },
              { name: "Live", icon: "👩‍💼" },
              { name: "Sports", icon: "⚽" },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity">
                <span className="text-[26px] mb-1 drop-shadow-md">{cat.icon}</span>
                <span className="text-[12px] text-neutral-400 font-medium">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
            <button className="w-6 h-6 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 shadow-md">
              <ChevronRight className="w-4 h-4 -mr-0.5" />
            </button>
          </div>
        </div>

        {/* Single Main Grid Section (Hot) */}
        <div className="mb-8 px-4">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] drop-shadow-[0_2px_4px_rgba(255,100,0,0.8)] -ml-1">🔥</span>
              <h2 className="text-[17px] font-bold text-white tracking-tight">Hot</h2>
            </div>
            
            {/* Pill Navigation: <- | All | -> */}
            <div className="flex items-center text-[11px] text-white font-bold bg-[#141414] border border-neutral-800 rounded-full overflow-hidden h-7 shadow-sm">
              <button className="px-3 h-full hover:bg-neutral-800 border-r border-neutral-800 flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <div className="px-4 h-full flex items-center justify-center">
                All
              </div>
              <button className="px-3 h-full hover:bg-neutral-800 border-l border-neutral-800 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Unified Game Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {gamesList.map((game, gIdx) => (
              <motion.div 
                key={gIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-[3/4] ${game.img} rounded-xl relative overflow-hidden flex flex-col shadow-lg group cursor-pointer border border-neutral-800`}
              >
                {/* Top Bar */}
                <div className="w-full flex justify-between items-start p-1.5 z-10 relative">
                  <div className="flex gap-1 items-center">
                    {game.hot && (
                      <span className="text-[8px] bg-gradient-to-r from-red-600 to-orange-500 text-white font-black px-1 rounded-sm italic leading-tight shadow-md">HOT</span>
                    )}
                    <span className="text-[14px] font-black italic drop-shadow-md text-transparent bg-clip-text bg-gradient-to-b from-[#39ff14] to-[#00aaff]" style={{WebkitTextStroke: "0.5px white"}}>{game.logo}</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-sm">
                    <svg className="w-3 h-3 text-neutral-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                </div>

                {/* Main graphic placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-[45px] drop-shadow-2xl">
                  {game.graphic}
                </div>
                
                {/* Fake popups for specific games */}
                {game.popups?.includes("coin") && (
                  <div className="absolute top-1/2 left-0 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-200 -translate-x-2 z-20">
                     <span className="text-[8px] font-bold text-red-700">Rs600</span>
                  </div>
                )}
                {game.popups?.includes("wheel") && (
                  <div className="absolute bottom-6 left-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-500 -translate-x-1 z-20">
                     <div className="absolute bottom-0 w-full bg-[#39ff14] text-white text-[8px] font-bold text-center border-2 border-white rounded">Rs 500</div>
                  </div>
                )}
                {game.name === "Crazy 777" && (
                  <div className="absolute bottom-1 right-0 w-12 h-12 bg-[#1877f2] rounded flex items-center justify-center shadow-xl border border-blue-400 translate-x-1 z-20">
                     <span className="text-white font-bold text-2xl">f</span>
                     <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#39ff14] rounded-full flex items-center justify-center shadow-md">
                       <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
                     </div>
                  </div>
                )}

                {/* Bottom Name Plate */}
                <div className="w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-6 pb-1.5 text-center mt-auto relative z-10">
                  <span className="text-[12px] font-black tracking-tight text-white drop-shadow-md">{game.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Mini Games Section (Pixel Perfect) */}
        <div className="mb-8 px-4">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <div className="flex flex-col items-center justify-center w-5 h-5 relative mr-1">
                 <div className="w-2 h-2 bg-[#00aaff] rounded-[1px] absolute top-0.5 transform rotate-45 shadow-[0_0_5px_#00aaff]"></div>
                 <div className="w-2 h-2 bg-[#00aaff] rounded-[1px] absolute bottom-0.5 left-0.5 transform rotate-45 shadow-[0_0_5px_#00aaff]"></div>
                 <div className="w-2 h-2 bg-[#00aaff] rounded-[1px] absolute bottom-0.5 right-0.5 transform rotate-45 shadow-[0_0_5px_#00aaff]"></div>
              </div>
              <h2 className="text-[17px] font-bold text-white tracking-tight">Mini Games</h2>
            </div>
            
            {/* Pill Navigation: <- | All | -> */}
            <div className="flex items-center text-[11px] text-white font-bold bg-[#141414] border border-neutral-800 rounded-full overflow-hidden h-7 shadow-sm">
              <button className="px-3 h-full hover:bg-neutral-800 border-r border-neutral-800 flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <div className="px-4 h-full flex items-center justify-center">
                All
              </div>
              <button className="px-3 h-full hover:bg-neutral-800 border-l border-neutral-800 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Unified Game Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {miniGamesList.map((game, gIdx) => (
              <motion.div 
                key={gIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-[3/4] ${game.img} rounded-xl relative overflow-hidden flex flex-col shadow-lg group cursor-pointer border border-neutral-800`}
              >
                {/* Main graphic placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-[45px] drop-shadow-2xl -translate-y-4">
                  {game.graphic}
                </div>
                
                {/* Fake popups for specific games */}
                {game.popups?.includes("coin") && (
                  <div className="absolute bottom-2 left-0 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-200 -translate-x-3 z-20">
                     <span className="text-[8px] font-bold text-red-700">Rs600</span>
                  </div>
                )}

                {/* Bottom Name Plate */}
                <div className="w-full text-center mt-auto relative z-10 pb-2">
                  <div className="text-[14px] font-black italic drop-shadow-md text-white mb-0.5" style={{WebkitTextStroke: "0.5px white"}}>{game.logo}</div>
                  <div className="text-[11px] font-medium tracking-tight text-white drop-shadow-md">{game.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Slot Section (Pixel Perfect) */}
        <div className="mb-8 px-4">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] -ml-1">🎰</span>
              <h2 className="text-[17px] font-bold text-white tracking-tight">Slot</h2>
            </div>
            
            {/* Pill Navigation: <- | All | -> */}
            <div className="flex items-center text-[11px] text-white font-bold bg-[#141414] border border-neutral-800 rounded-full overflow-hidden h-7 shadow-sm">
              <button className="px-3 h-full hover:bg-neutral-800 border-r border-neutral-800 flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <div className="px-4 h-full flex items-center justify-center">
                All
              </div>
              <button className="px-3 h-full hover:bg-neutral-800 border-l border-neutral-800 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Slot Game Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {slotGamesList.map((game, gIdx) => (
              <motion.div 
                key={gIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-[3/4] ${game.img || 'bg-neutral-900'} rounded-xl relative overflow-hidden flex flex-col shadow-lg group cursor-pointer border border-neutral-800`}
              >
                
                {game.collage ? (
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex w-full h-[55%]">
                       <div className={`w-1/2 h-full ${game.collage[0]} flex justify-center items-center text-3xl border-r border-b border-white/20`}>{game.graphic[0]}</div>
                       <div className={`w-1/2 h-full ${game.collage[1]} flex justify-center items-center text-3xl border-b border-white/20`}>{game.graphic[1]}</div>
                    </div>
                    <div className={`w-full h-[45%] ${game.collage[2]} flex justify-center items-center text-4xl`}>{game.graphic[2]}</div>
                    
                    {/* SVG overlay for the V shaped partition (simulated with standard borders above, but lets add a subtle inset shadow) */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[45px] drop-shadow-2xl -translate-y-4">
                    {game.graphic}
                  </div>
                )}
                
                {/* Fake popups for specific games */}
                {game.popups?.includes("coin_top") && (
                  <div className="absolute top-2 left-0 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-200 -translate-x-3 z-20">
                     <span className="text-[8px] font-bold text-red-700">Rs600</span>
                  </div>
                )}
                {game.popups?.includes("wheel_bottom") && (
                  <div className="absolute bottom-6 left-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-500 -translate-x-2 z-20">
                     <div className="absolute bottom-0 w-full bg-[#39ff14] text-white text-[8px] font-bold text-center border-2 border-white rounded">Rs 888</div>
                  </div>
                )}
                {game.popups?.includes("aviator_multiplier") && (
                  <div className="absolute top-1/2 right-0 w-14 h-12 bg-black/90 rounded-l flex flex-col items-center justify-center shadow-lg border border-neutral-700 z-20 overflow-hidden translate-x-1">
                     <span className="text-[20px] text-[#ff3366] -mt-1 leading-none drop-shadow-md">🛩️</span>
                     <span className="text-white text-[9px] font-black mt-1">354.77x</span>
                     {/* Green X Close button on popup */}
                     <div className="absolute -top-1.5 right-1 w-3 h-3 bg-neutral-800 rounded-full border border-neutral-600 flex items-center justify-center">
                        <span className="text-white text-[6px]">x</span>
                     </div>
                  </div>
                )}

                {/* Bottom Name Plate */}
                <div className="w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-6 pb-2 text-center mt-auto relative z-10">
                  <div className="text-[14px] font-black italic drop-shadow-md text-white mb-0.5" style={{WebkitTextStroke: "0.5px white"}}>{game.logo}</div>
                  <div className="text-[12px] font-medium tracking-tight text-white drop-shadow-md">{game.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Fishing Section (Pixel Perfect) */}
        <div className="mb-8 px-4">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] drop-shadow-[0_2px_4px_rgba(0,100,255,0.6)] -ml-1 transform -scale-x-100">🦈</span>
              <h2 className="text-[17px] font-bold text-white tracking-tight">Fishing</h2>
            </div>
            
            {/* Pill Navigation: <- | All | -> */}
            <div className="flex items-center text-[11px] text-white font-bold bg-[#141414] border border-neutral-800 rounded-full overflow-hidden h-7 shadow-sm">
              <button className="px-3 h-full hover:bg-neutral-800 border-r border-neutral-800 flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <div className="px-4 h-full flex items-center justify-center">
                All
              </div>
              <button className="px-3 h-full hover:bg-neutral-800 border-l border-neutral-800 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Unified Game Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {fishingGamesList.map((game, gIdx) => (
              <motion.div 
                key={gIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-[3/4] ${game.img} rounded-xl relative overflow-hidden flex flex-col shadow-lg group cursor-pointer border border-neutral-800`}
              >
                {/* Main graphic placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-[55px] drop-shadow-2xl -translate-y-4">
                  {game.graphic}
                </div>
                
                {/* Bottom Name Plate */}
                <div className="w-full text-center mt-auto relative z-10 pb-2">
                  <div className="font-black italic drop-shadow-md text-white mb-0.5" style={{WebkitTextStroke: "0.5px white"}}>{game.logo}</div>
                  <div className="text-[11px] font-medium tracking-tight text-white drop-shadow-md">{game.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cards Section (Pixel Perfect) */}
        <div className="mb-8 px-4">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)] -ml-1">🃏</span>
              <h2 className="text-[17px] font-bold text-white tracking-tight">Cards</h2>
            </div>
            
            {/* Pill Navigation: <- | All | -> */}
            <div className="flex items-center text-[11px] text-white font-bold bg-[#141414] border border-neutral-800 rounded-full overflow-hidden h-7 shadow-sm">
              <button className="px-3 h-full hover:bg-neutral-800 border-r border-neutral-800 flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <div className="px-4 h-full flex items-center justify-center">
                All
              </div>
              <button className="px-3 h-full hover:bg-neutral-800 border-l border-neutral-800 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Unified Game Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {cardsGamesList.map((game, gIdx) => (
              <motion.div 
                key={gIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-[3/4] ${game.img} rounded-xl relative overflow-hidden flex flex-col shadow-lg group cursor-pointer border border-neutral-800`}
              >
                {/* Main graphic placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-[55px] drop-shadow-2xl -translate-y-4">
                  {game.graphic}
                </div>
                
                {/* Fake popups for specific games */}
                {game.popups?.includes("coin_top") && (
                  <div className="absolute top-4 left-0 w-11 h-11 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-200 -translate-x-2 z-20">
                     <span className="text-[7px] font-bold text-red-700">Rs600</span>
                  </div>
                )}
                {game.popups?.includes("huge_bottom") && (
                  <div className="absolute bottom-6 -left-2 flex flex-col items-start z-20 transform scale-90">
                     <span className="text-3xl drop-shadow-xl translate-x-3 translate-y-2">🛩️</span>
                     <div className="bg-[#39ff14] text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white shadow-lg whitespace-nowrap">Rs 10000</div>
                  </div>
                )}
                {game.popups?.includes("trophies") && (
                  <div className="absolute bottom-6 -right-2 flex flex-col items-center z-20">
                     <span className="text-4xl drop-shadow-xl translate-y-2">🏆</span>
                     <span className="text-3xl drop-shadow-xl absolute right-5 top-2 scale-75 opacity-90">🏆</span>
                     <span className="text-3xl drop-shadow-xl absolute left-5 top-2 scale-75 opacity-90">🏆</span>
                  </div>
                )}

                {/* Bottom Name Plate */}
                <div className="w-full text-center mt-auto relative z-10 pb-2">
                  <div className="font-black italic drop-shadow-md text-white mb-0.5" style={{WebkitTextStroke: "0.5px white"}}>{game.logo}</div>
                  <div className="text-[11px] font-medium tracking-tight text-white drop-shadow-md">{game.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Live Section (Pixel Perfect) */}
        <div className="mb-8 px-4">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)] -ml-1">👩‍💼</span>
              <h2 className="text-[17px] font-bold text-white tracking-tight">Live</h2>
            </div>
            
            {/* Pill Navigation: <- | All | -> */}
            <div className="flex items-center text-[11px] text-white font-bold bg-[#141414] border border-neutral-800 rounded-full overflow-hidden h-7 shadow-sm">
              <button className="px-3 h-full hover:bg-neutral-800 border-r border-neutral-800 flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <div className="px-4 h-full flex items-center justify-center">
                All
              </div>
              <button className="px-3 h-full hover:bg-neutral-800 border-l border-neutral-800 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Unified Game Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {liveGamesList.map((game, gIdx) => (
              <motion.div 
                key={gIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-[3/4] ${game.img} rounded-xl relative overflow-hidden flex flex-col shadow-lg group cursor-pointer border border-neutral-800`}
              >
                {/* Optional Star in Top Right */}
                {game.star && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-sm z-20">
                    <svg className="w-3.5 h-3.5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                )}
              
                {/* Main graphic placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-[55px] drop-shadow-2xl -translate-y-4">
                  {game.graphic}
                </div>
                
                {/* Bottom Name Plate */}
                <div className="w-full text-center mt-auto relative z-10 pb-2">
                  <div className="font-black italic drop-shadow-md text-white mb-0.5">{game.logo}</div>
                  <div className="text-[11px] font-medium tracking-tight text-white drop-shadow-md">{game.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sports Section (Pixel Perfect) */}
        <div className="mb-8 px-4">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)] -ml-1">⚽</span>
              <h2 className="text-[17px] font-bold text-white tracking-tight">Sports</h2>
            </div>
            
            {/* Pill Navigation: <- | All | -> */}
            <div className="flex items-center text-[11px] text-white font-bold bg-[#141414] border border-neutral-800 rounded-full overflow-hidden h-7 shadow-sm">
              <button className="px-3 h-full hover:bg-neutral-800 border-r border-neutral-800 flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <div className="px-4 h-full flex items-center justify-center">
                All
              </div>
              <button className="px-3 h-full hover:bg-neutral-800 border-l border-neutral-800 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Unified Game Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {sportsGamesList.map((game, gIdx) => (
              <motion.div 
                key={gIdx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-[3/4] ${game.img} rounded-xl relative overflow-hidden flex flex-col shadow-lg group cursor-pointer border border-neutral-800`}
              >
                {/* Optional Star in Top Right */}
                {game.star && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-sm z-20">
                    <svg className="w-3.5 h-3.5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                )}
              
                {/* Main graphic placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-[55px] drop-shadow-2xl -translate-y-4">
                  {game.graphic}
                </div>

                {/* Fake popups for specific games */}
                {game.popups?.includes("coin_top") && (
                  <div className="absolute top-4 left-0 w-11 h-11 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-200 -translate-x-2 z-20">
                     <span className="text-[7px] font-bold text-red-700">Rs600</span>
                  </div>
                )}
                {game.popups?.includes("wheel_bottom") && (
                  <div className="absolute bottom-6 left-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-500 -translate-x-2 z-20">
                     <div className="absolute bottom-0 w-full bg-[#39ff14] text-white text-[7px] font-bold text-center border-2 border-white rounded">Rs 888</div>
                  </div>
                )}
                {game.popups?.includes("deposit_rewards") && (
                  <div className="absolute bottom-6 right-0 flex flex-col items-center z-20 transform scale-90 translate-x-1">
                     <span className="text-2xl drop-shadow-xl absolute top-1 -left-2 z-10">🪙</span>
                     <span className="text-4xl drop-shadow-xl text-yellow-300 font-black italic z-0 -translate-y-2">10%</span>
                     <div className="text-white text-[8px] font-black leading-none drop-shadow-md z-20 -mt-2">Deposit rewards</div>
                     <div className="text-yellow-400 text-[10px] font-black leading-none drop-shadow-md z-20 mt-0.5">7 days</div>
                     {/* Green X Close button on popup */}
                     <div className="absolute top-2 left-2 w-4 h-4 bg-black/60 rounded-full border border-neutral-600 flex items-center justify-center z-30 shadow-md">
                        <span className="text-white text-[8px] font-bold">x</span>
                     </div>
                  </div>
                )}
                
                {/* Bottom Name Plate */}
                <div className="w-full text-center mt-auto relative z-10 pb-2">
                  <div className="font-black italic drop-shadow-md text-white mb-0.5 flex justify-center">{game.logo}</div>
                  <div className="text-[11px] font-medium tracking-tight text-white drop-shadow-md">{game.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grand Prize Record */}
        <div className="mb-8 px-4 pb-4">
          <div className="bg-[#1c1c1c] rounded-xl py-3.5 overflow-hidden shadow-lg border border-neutral-800/50">
            {/* Title */}
            <h2 className="text-center text-[13px] text-white font-medium mb-3 flex items-center justify-center gap-1.5">
              <div className="flex gap-0.5 opacity-50">
                <div className="w-1.5 h-1.5 border border-white transform rotate-45"></div>
                <div className="w-1.5 h-1.5 bg-white transform rotate-45"></div>
              </div>
              Grand Prize Record
              <div className="flex gap-0.5 opacity-50">
                <div className="w-1.5 h-1.5 bg-white transform rotate-45"></div>
                <div className="w-1.5 h-1.5 border border-white transform rotate-45"></div>
              </div>
            </h2>
            
            {/* Left to Right Marquee Container */}
            <div className="w-full overflow-hidden relative">
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#1c1c1c] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#1c1c1c] to-transparent z-10 pointer-events-none"></div>
              
              {/* Left-to-right animation */}
              <motion.div 
                animate={{ x: ["-50%", "0%"] }} 
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex gap-4 w-max px-2"
              >
                {marqueeWinners.map((winner, idx) => (
                  <div key={idx} className="flex flex-col items-center w-[75px] shrink-0 cursor-pointer group">
                    {/* Game Icon */}
                    <div className={`w-[75px] h-[75px] rounded-[14px] ${winner.img} flex flex-col items-center justify-center mb-1.5 shadow-md relative overflow-hidden group-hover:scale-105 transition-transform`}>
                       <span className="text-white/80 text-[10px] absolute top-1 font-black">{winner.game}</span>
                       <span className="text-4xl drop-shadow-lg mt-2">{winner.icon}</span>
                    </div>
                    {/* User */}
                    <div className="text-center w-full">
                       <span className="text-neutral-400 text-[10px]">{winner.user}</span>
                       <span className="text-[#ff3333] text-[10px] ml-1 font-bold">win</span>
                    </div>
                    {/* Amount */}
                    <div className="flex items-center justify-center gap-0.5 mt-0.5">
                       <span className="text-yellow-500 text-[8px] font-black border border-yellow-500 rounded-full w-[13px] h-[13px] flex items-center justify-center pt-[1px]">Rs</span>
                       <span className="text-yellow-500 text-[12px] font-black tracking-tighter leading-none">{winner.amount}</span>
                       <span className="text-neutral-500 text-[10px] leading-none ml-0.5">›</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Fixed Left Global Popups */}
        <div className="fixed top-[45%] left-1 -translate-y-1/2 z-50 flex flex-col items-start pointer-events-none">
          
          {/* Top Coin Popup */}
          <div className="relative mb-3 pointer-events-auto cursor-pointer group flex items-center transition-transform duration-300 ease-out hover:scale-110 hover:translate-x-1">
            {/* Green arrow indicator */}
            <div className="absolute -left-1 z-20 w-4 h-4 bg-[#39ff14] rounded-full flex items-center justify-center shadow-md">
               <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </div>
            
            <div className="w-[42px] h-[42px] bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(255,200,0,0.5)] border-2 border-yellow-200 relative z-10 ml-1.5">
               <span className="text-[9px] font-black text-red-700 italic drop-shadow-sm">Rs600</span>
               <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center shadow-lg border border-neutral-700 group-hover:bg-neutral-800 transition-colors">
                 <span className="text-white text-[7px] font-bold">x</span>
               </div>
            </div>
          </div>
          
          {/* Bottom Wheel Popup */}
          <div className="relative pointer-events-auto cursor-pointer group flex items-center transition-transform duration-300 ease-out hover:scale-110 hover:translate-x-1">
            <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-xl border-[2.5px] border-[#39ff14] relative z-10">
               <div className="absolute -top-1.5 right-0 w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center shadow-lg border border-neutral-700 group-hover:bg-neutral-800 transition-colors z-30">
                 <span className="text-white text-[7px] font-bold">x</span>
               </div>
               {/* Inner wheel mockup */}
               <div className="w-7 h-7 rounded-full border border-pink-400 flex items-center justify-center overflow-hidden shadow-inner">
                 <div className="w-3 h-3 bg-[#39ff14] rounded-full absolute shadow-inner"></div>
               </div>
               <div className="absolute -bottom-1 w-[110%] bg-[#39ff14] text-white text-[8px] font-black text-center rounded px-0.5 shadow-md">Rs 500</div>
               
               <div className="absolute -top-2 -left-1 text-[13px] drop-shadow-md z-20 pointer-events-none">🐔</div>
               <div className="absolute top-1 -right-3 text-[18px] drop-shadow-md z-0 pointer-events-none">💃</div>
            </div>
          </div>
        </div>

        {/* Fixed Right Global Popups */}
        <div className="fixed top-[35%] sm:top-[40%] right-1 -translate-y-1/2 z-50 flex flex-col items-end pointer-events-none">
          
          {/* Deposit Rewards Popup */}
          <div className="relative pointer-events-auto cursor-pointer group flex items-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-x-1">
            <div className="flex flex-col items-center bg-black/95 p-1.5 rounded-xl border border-yellow-400/80 shadow-[0_0_12px_rgba(255,200,0,0.2)] relative z-10 w-[50px]">
              <div className="absolute top-0 right-1 w-3.5 h-3.5 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg z-30 border border-neutral-700 group-hover:bg-neutral-800 transition-colors">
                 <span className="text-white text-[7px] font-bold">x</span>
              </div>
              <span className="text-[14px] drop-shadow-xl absolute top-1.5 left-0 z-10">🪙</span>
              <span className="text-[28px] drop-shadow-xl text-yellow-300 font-black italic z-0 leading-none mt-1" style={{textShadow: "0 2px 6px rgba(0,0,0,0.8)"}}>15<span className="text-[12px]">%</span></span>
              <div className="text-white text-[6px] font-black leading-none drop-shadow-md z-20 mt-1 text-center">Deposit rewards</div>
              <div className="text-yellow-400 text-[7px] font-black leading-none drop-shadow-md z-20 mt-0.5 mb-0.5">15 days</div>
            </div>
          </div>
        </div>

        <Footer />
        
        {/* Floating TOP Button */}
        <div className="fixed bottom-[85px] right-2 z-50 flex flex-col items-end pointer-events-auto group">
          {/* Trophies overlapping */}
          <div className="text-[24px] leading-none drop-shadow-xl translate-y-1 mr-2 relative z-10 flex transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
             <span className="-mr-2.5">🏆</span><span className="z-10 transform scale-110 -mr-2.5 mb-1">🏆</span><span className="">🏆</span>
          </div>
          {/* Top Button */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-black/95 text-white px-3 py-1.5 rounded-full border border-neutral-700 flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md relative z-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-neutral-900">
             <div className="bg-[#39ff14] text-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
               <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg>
             </div>
             <span className="text-[10px] font-black tracking-widest mt-[1px]">TOP</span>
          </button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
