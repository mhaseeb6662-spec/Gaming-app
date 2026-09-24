"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Grid, Handshake, Megaphone, Flame, UserPlus, Gamepad2, History, RefreshCw, Gift, Smartphone, Eye, EyeOff, X, PackageOpen, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoPage() {
  const [activeTopTab, setActiveTopTab] = useState("Event");
  const [activeSideTab, setActiveSideTab] = useState("All");
  const [activeRebateTab, setActiveRebateTab] = useState("Mini Games");
  
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const topTabs = ["Event", "Unclaimed", "Rebate", "Mission", "Spins"];
  
  const eventSideTabs = [
    { id: "All", icon: <Grid className="w-5 h-5" /> },
    { id: "Cooperation", icon: <Handshake className="w-5 h-5" /> },
    { id: "Channel", icon: <Megaphone className="w-5 h-5" /> },
    { id: "Popular", icon: <Flame className="w-5 h-5" /> },
    { id: "New Users", icon: <UserPlus className="w-5 h-5" /> },
    { id: "Mini Games", icon: <Gamepad2 className="w-5 h-5" /> },
    { id: "Slot", icon: <span className="font-bold text-[10px] border border-current px-0.5 rounded leading-none flex items-center justify-center">777</span> },
  ];

  const rebateSideTabs = [
    { id: "Mini Games", icon: <Gamepad2 className="w-5 h-5" /> },
    { id: "Slot", icon: <span className="font-bold text-[10px] border border-current px-0.5 rounded leading-none flex items-center justify-center">777</span> },
    { id: "Fishing", icon: <span className="text-[14px]">🦈</span> },
    { id: "Cards", icon: <span className="text-[14px]">🃏</span> },
    { id: "Live", icon: <span className="text-[14px]">👩‍💼</span> },
    { id: "Sports", icon: <span className="text-[14px]">⚽</span> },
  ];

  const renderEventBanners = () => {
    switch (activeSideTab) {
      case "All":
        return (
          <>
            <Banner title="Redeem code" desc="Follow the 8111C channel" highlight="Earn 10~77777" icon="🎁" />
            <Banner title="BRAND ALLIANCE" desc="8111C.com" sub="DUAL CERTIFICATION OF REPUTATION AND STRENGTH" icon="🛡️" />
            <Banner title="BRAND ALLIANCE" desc="VIP Club" sub="DUAL CERTIFICATION OF REPUTATION AND STRENGTH" icon="👑" badge="1" />
          </>
        );
      case "Cooperation":
        return (
          <>
            <Banner title="Invitation Event" desc="Each player you invite" highlight="Get Rs 600" icon="🤝" />
            <Banner title="Invitation Event" desc="Each player you invite" highlight="Get Rs 2000" icon="💸" />
            <Banner title="Invitation Event" desc="Each player you invite" highlight="Get Rs 10,000" icon="💰" />
            <Banner title="Invitation Event" desc="Each player you invite" highlight="Get Rs 50,000" icon="💎" />
          </>
        );
      case "Channel":
        return (
          <>
            <Banner title="Redeem code" desc="Follow the 8111C channel" highlight="Earn 10~77777" icon="🎁" />
            <Banner title="Official Channel" desc="Follow us on Telegram" sub="Stay updated on the latest deals" icon="✈️" badge="•" />
            <Banner title="Official Channel" desc="Follow us on WhatsApp" sub="Stay updated on the latest deals" icon="💬" badge="•" />
            <Banner title="Official Channel" desc="Follow us on Facebook" sub="Stay updated on the latest deals" icon="👍" badge="•" />
          </>
        );
      case "Popular":
        return (
          <>
            <Banner title="Redeem code" desc="Follow the 8111C channel" highlight="Earn 10~77777" icon="🎁" />
            <Banner title="Bet on Aviator" desc="Claim bonus" highlight="Rs 177,777" icon="🚀" />
            <Banner title="Daily Ranking" desc="Recharge Competition" sub="You're the First" icon="🏆" />
            <Banner title="Lucky Number 7" desc="Log in on the 7th, 17th, 27th of each month to claim your prize" highlight="" icon="🎰" />
          </>
        );
      case "Mini Games":
        return (
          <>
            <Banner title="Bet on Aviator" desc="Claim bonus" highlight="Rs 177,777" icon="🚀" />
            <Banner title="Lucky Wheel" desc="Play daily to participate in the Lucky Wheel" highlight="" icon="🎡" />
            <Banner title="SLOT BETTING" desc="Lucky bet numbers" highlight="1000X BET BONUS" icon="🎰" />
            <Banner title="Chicken Road" desc="Betting boost bonus" highlight="Rs 177777" icon="🐔" />
          </>
        );
      case "Slot":
        return (
          <>
            <Banner title="Lucky Wheel" desc="Play daily to participate in the Lucky Wheel" highlight="" icon="🎡" />
            <Banner title="SLOT BETTING" desc="Lucky bet numbers" highlight="1000X BET BONUS" icon="🎰" />
            <Banner title="JILI PG Slot" desc="Betting Boost Bonus" highlight="Rs 177777" icon="🛡️" />
            <Banner title="Loss Subsidy" desc="Daily game subsidy" highlight="Up to 10%" icon="📉" />
          </>
        );
      case "New Users":
        return (
          <>
            <Banner title="Redeem code" desc="Follow the 8111C channel" highlight="Earn 10~77777" icon="🎁" />
            <Banner title="Lucky Wheel" desc="Play daily to participate in the Lucky Wheel" highlight="" icon="🎡" />
            <Banner title="First Deposit" desc="Welcome bonus for new users" highlight="Get 100% Match" icon="💰" />
          </>
        );
      default:
        return (
          <div className="flex items-center justify-center h-40 text-neutral-500 text-[13px]">
            No events available for this category yet.
          </div>
        );
    }
  };

  const renderRebateList = () => {
    let providers = [];
    let cashback = "0.30%";

    switch (activeRebateTab) {
      case "Mini Games":
        providers = ["WG", "SPRIBE", "EVO", "IN", "JILI"];
        cashback = "0.30%";
        break;
      case "Slot":
        providers = ["WG", "PG", "JILI", "JDB", "FC"];
        cashback = "0.30%";
        break;
      case "Fishing":
        providers = ["JILI", "WG", "YB", "YGR", "JDB"];
        cashback = "0.20%";
        break;
      case "Cards":
        providers = ["WG", "JILI", "KM", "TP", "RTG"];
        cashback = "0.20%";
        break;
      case "Live":
        providers = ["EVO", "PLAY", "Ezugi", "SEXY", "AG"];
        cashback = "0.05%";
        break;
      case "Sports":
        providers = ["SBO", "WG", "SABA", "CMD", "IN"];
        cashback = "0.05%";
        break;
      default:
        providers = ["WG", "JILI"];
        cashback = "0.10%";
    }

    return providers.map((provider, idx) => {
      // Special case in Cards screenshot, one is 0.05%
      const itemCashback = (activeRebateTab === "Cards" && provider === "KM") ? "0.05%" : cashback;
      
      return (
        <div key={idx} className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-3 flex flex-col gap-2 mb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-black italic text-[14px] text-white tracking-wider">{provider}</span>
              <span className="text-neutral-400 text-[12px]">Valid Bets <span className="text-white font-bold">0.00</span></span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="w-full bg-[#333] rounded-full h-4 relative flex items-center justify-center overflow-hidden border border-[#444]">
            <span className="text-[9px] font-bold text-white z-10 drop-shadow-md">Re-bet 100 to get {itemCashback} cashback</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-neutral-400">Rebate rate <span className="text-white font-bold">0.00%</span></span>
            <span className="text-neutral-400">Collectable <span className="text-[#ffdf00] font-bold">0.00</span></span>
          </div>
        </div>
      );
    });
  };

  return (
    <main className="h-screen bg-[#111] text-white flex flex-col font-sans overflow-hidden">
      
      {/* Top Header & Tabs */}
      <div className="flex-none bg-[#141414] border-b border-neutral-800">
        <div className="flex items-center h-[50px] px-2 relative">
          <Link href="/" className="px-2 shrink-0">
            <ChevronLeft className="w-5 h-5 text-neutral-400" />
          </Link>
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 px-4">
            {topTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTopTab(tab)}
                className={`relative py-3 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  activeTopTab === tab ? "text-[#ffdf00]" : "text-white"
                }`}
              >
                {tab}
                {activeTopTab === tab && (
                  <motion.div
                    layoutId="top-tab"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff0b0b]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden pb-16 relative">
        
        {/* EVENT TAB CONTENT */}
        {activeTopTab === "Event" && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-[85px] bg-[#1a1a1a] flex-none overflow-y-auto no-scrollbar pb-6 flex flex-col gap-1.5 p-2 border-r border-neutral-800">
              {eventSideTabs.map((tab) => {
                const isActive = activeSideTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSideTab(tab.id)}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-lg transition-all ${
                      isActive 
                        ? "bg-[#cc0000] text-white shadow-[0_0_10px_rgba(255,11,11,0.5)]" 
                        : "bg-[#222] text-neutral-400 hover:bg-[#333]"
                    }`}
                  >
                    <div className={`mb-1 ${isActive ? "text-[#ffdf00]" : "text-neutral-400"}`}>
                      {tab.icon}
                    </div>
                    <span className="text-[10px] font-medium text-center leading-tight px-1">
                      {tab.id.replace(' ', '\n')}
                    </span>
                  </button>
                );
              })}

              <div className="mt-4 flex flex-col gap-2">
                <button className="flex items-center justify-center gap-1 py-1.5 border border-[#ff0b0b] text-[#ffdf00] rounded text-[10px] font-bold hover:bg-[#2e0505]">
                  <History className="w-3 h-3" /> History
                </button>
                <button className="flex items-center justify-center gap-1 py-1.5 border border-[#ff0b0b] text-[#ffdf00] rounded text-[10px] font-bold leading-tight hover:bg-[#2e0505]">
                  <RefreshCw className="w-3 h-3 shrink-0" /> <span className="text-left">Refresh<br/>rewards</span>
                </button>
                <button 
                  onClick={() => setShowRedeemModal(true)} 
                  className="flex items-center justify-center gap-1 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded text-[10px] font-bold leading-tight shadow-md"
                >
                  <Gift className="w-4 h-4 shrink-0 text-[#ffdf00]" /> <span className="text-left">Redeem<br/>Code</span>
                </button>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 bg-[#111] overflow-y-auto no-scrollbar p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSideTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-3"
                >
                  {renderEventBanners()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* UNCLAIMED TAB CONTENT */}
        {activeTopTab === "Unclaimed" && (
          <div className="flex-1 overflow-y-auto no-scrollbar bg-[#111] p-4 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center opacity-50 mb-4">
              <PackageOpen className="w-20 h-20 text-neutral-600 mb-2" />
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-[13px]">No content yet</span>
                <RefreshCw className="w-4 h-4 text-[#ffdf00]" />
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-4">
              <span className="text-[#ffdf00] font-medium text-[13px] border-b-2 border-[#ff0b0b] pb-2 -mb-[9px]">History</span>
              <span className="text-[#ffdf00] font-medium text-[13px]">More</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center opacity-50">
              <PackageOpen className="w-20 h-20 text-neutral-600 mb-2" />
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-[13px]">No content yet</span>
                <RefreshCw className="w-4 h-4 text-[#ffdf00]" />
              </div>
            </div>
          </div>
        )}

        {/* REBATE TAB CONTENT */}
        {activeTopTab === "Rebate" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Stats Card */}
            <div className="bg-gradient-to-br from-[#ffdf00] to-[#ffaa00] m-3 p-4 rounded-xl shadow-lg border border-[#ffb300]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💰</span>
                <h3 className="text-[#4a2e00] font-bold text-[14px]">Today's estimated rebate <span className="text-[#ff0b0b]">0.00</span></h3>
                <RefreshCw className="w-4 h-4 text-[#0066cc]" />
              </div>
              <div className="flex gap-3 mb-3">
                <div className="flex-1 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg p-2.5 shadow-inner">
                  <div className="text-[#4a2e00] font-black text-[15px] mb-1">0.00</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#4a2e00]/70 text-[11px] font-medium">Today's valid bet</span>
                    <ChevronRight className="w-3 h-3 text-[#4a2e00]/40" />
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-r from-red-200 to-red-100 rounded-lg p-2.5 shadow-inner border border-red-300">
                  <div className="text-[#4a2e00] font-black text-[15px] mb-1">0.00</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#4a2e00]/70 text-[11px] font-medium">Claimed today</span>
                    <ChevronRight className="w-3 h-3 text-[#4a2e00]/40" />
                  </div>
                </div>
              </div>
              <p className="text-[#4a2e00]/80 text-[10px] leading-tight font-medium">
                Data is updated every 10 min. If not synchronized, click above to refresh manually or check back later
              </p>
            </div>

            {/* Layout for Rebate Sidebar + Content */}
            <div className="flex-1 flex overflow-hidden border-t border-neutral-800">
              <div className="w-[85px] bg-[#1a1a1a] flex-none overflow-y-auto no-scrollbar p-2 border-r border-neutral-800 flex flex-col gap-1.5">
                {rebateSideTabs.map((tab) => {
                  const isActive = activeRebateTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveRebateTab(tab.id)}
                      className={`flex flex-col items-center justify-center py-2.5 rounded-lg transition-all ${
                        isActive 
                          ? "bg-[#cc0000] text-white shadow-[0_0_10px_rgba(255,11,11,0.5)]" 
                          : "bg-[#222] text-neutral-400 hover:bg-[#333]"
                      }`}
                    >
                      <div className={`mb-1 ${isActive ? "text-[#ffdf00]" : "text-neutral-400"}`}>
                        {tab.icon}
                      </div>
                      <span className="text-[10px] font-medium text-center leading-tight px-1">
                        {tab.id.replace(' ', '\n')}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex-1 bg-[#111] overflow-y-auto no-scrollbar p-3">
                {renderRebateList()}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Linked Phone Number Modal (can still be used elsewhere if needed) */}
      <AnimatePresence>
        {showPhoneModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPhoneModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          >
            {/* Same code as before for Phone Modal */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bonus Redemption Modal */}
      <AnimatePresence>
        {showRedeemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRedeemModal(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-[#ffdf00] via-[#ffaa00] to-[#fff3e0] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowRedeemModal(false)}
                className="absolute top-4 right-4 text-[#4a2e00] hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute -top-12 -left-6 drop-shadow-2xl z-10 w-28 h-28 pointer-events-none text-[80px]">
                🎁
              </div>

              <div className="text-center mt-4 mb-6 relative z-0">
                <h2 className="text-[22px] font-black text-[#cc0000] leading-tight drop-shadow-sm uppercase">Bonus<br/>Redemption...</h2>
              </div>

              <div className="text-center mb-4">
                <span className="text-[#4a2e00] font-medium text-[13px]">Win up to <span className="bg-[#cc0000] text-white px-2 py-0.5 rounded-full font-bold">Rs 77,777</span> in bonus!</span>
              </div>

              <div className="bg-white rounded-lg p-1.5 flex items-center mb-6 shadow-inner border border-neutral-200">
                <span className="px-2 text-[16px]">🎫</span>
                <input 
                  type="text" 
                  placeholder="The redemption code is co..."
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-neutral-800 placeholder:text-neutral-400 px-1"
                />
                <button className="text-[#cc0000] font-bold text-[13px] px-3 border-l border-neutral-200">
                  Paste
                </button>
              </div>

              <button className="w-full bg-[#111] text-white font-bold text-[15px] py-3.5 rounded-lg shadow-lg hover:bg-[#333] transition-colors mb-4">
                Redeem Bonus
              </button>

              <div className="text-center">
                <button className="text-[#cc0000] text-[12px] font-bold hover:underline">
                  Event Rules
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab="promo" />
    </main>
  );
}

function Banner({ title, desc, highlight, sub, icon, badge }: { title: string, desc: string, highlight?: string, sub?: string, icon: string, badge?: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#ff0b0b] bg-gradient-to-br from-[#2e0505] via-[#111] to-[#1a1a1a] p-4 shadow-[0_0_15px_rgba(255,11,11,0.15)] flex flex-col justify-between min-h-[110px]">
      <div className="absolute top-0 left-0 bg-gradient-to-r from-[#ff0b0b] to-[#cc0000] px-3 py-0.5 rounded-br-lg flex items-center gap-1 shadow-md">
        <span className="text-white font-black italic text-[11px] tracking-wider">8111C.com</span>
      </div>

      {badge && (
        <div className="absolute top-2 right-2 bg-[#cc0000] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-[#111] z-10 shadow-md">
          {badge}
        </div>
      )}

      <div className="absolute -right-4 -bottom-6 text-[80px] opacity-10 grayscale">
        {icon}
      </div>

      <div className="flex mt-4 items-center justify-between relative z-10">
        <div className="flex flex-col w-[70%]">
          <h3 className="text-[#ffdf00] font-black text-[15px] leading-tight mb-1 uppercase tracking-wide">{title}</h3>
          <p className="text-white font-medium text-[12px] leading-snug">{desc}</p>
          
          {highlight && (
            <p className="text-[#ffdf00] font-bold text-[13px] mt-1">{highlight}</p>
          )}
          {sub && (
            <p className="text-neutral-400 text-[9px] mt-1 uppercase tracking-wider">{sub}</p>
          )}
        </div>
        
        <div className="w-[30%] flex justify-end items-center">
          <div className="text-[40px] drop-shadow-[0_0_10px_rgba(255,223,0,0.4)]">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
