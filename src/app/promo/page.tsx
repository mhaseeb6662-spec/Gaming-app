"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Grid, Handshake, Megaphone, Flame, UserPlus, Gamepad2, History, RefreshCw, Gift, Smartphone, Eye, EyeOff } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoPage() {
  const [activeTopTab, setActiveTopTab] = useState("Event");
  const [activeSideTab, setActiveSideTab] = useState("All");
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const topTabs = ["Event", "Unclaimed", "Rebate", "Mission", "Spins"];
  
  const sideTabs = [
    { id: "All", icon: <Grid className="w-5 h-5" /> },
    { id: "Cooperation", icon: <Handshake className="w-5 h-5" /> },
    { id: "Channel", icon: <Megaphone className="w-5 h-5" /> },
    { id: "Popular", icon: <Flame className="w-5 h-5" /> },
    { id: "New Users", icon: <UserPlus className="w-5 h-5" /> },
    { id: "Mini Games", icon: <Gamepad2 className="w-5 h-5" /> },
    { id: "Slot", icon: <span className="font-bold text-[10px] border border-current px-0.5 rounded leading-none flex items-center justify-center">777</span> },
  ];

  const renderBanners = () => {
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
      <div className="flex-1 flex overflow-hidden pb-16 relative">
        
        {/* Left Sidebar */}
        <div className="w-[85px] bg-[#1a1a1a] flex-none overflow-y-auto no-scrollbar pb-6 flex flex-col gap-1.5 p-2 border-r border-neutral-800">
          {sideTabs.map((tab) => {
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
            <button onClick={() => setShowPhoneModal(true)} className="flex items-center justify-center gap-1 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded text-[10px] font-bold leading-tight shadow-md">
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
              {renderBanners()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Linked Phone Number Modal */}
      <AnimatePresence>
        {showPhoneModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhoneModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1a1a1a] border border-neutral-800 rounded-2xl w-full max-w-sm p-5 shadow-2xl relative"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <h2 className="text-[16px] font-bold text-white">Linked Phone Number</h2>
                </div>

                <p className="text-center text-[12px] text-white font-medium mb-6 leading-relaxed">
                  You need to bind your phone first before you can use this function!
                  <br />
                  <span className="text-neutral-400">Do you want to bind immediately?</span>
                </p>

                {/* Form */}
                <div className="space-y-4">
                  
                  {/* Phone Input */}
                  <div>
                    <label className="text-[12px] text-white font-medium mb-1.5 block">Linked Phone Number</label>
                    <div className="flex bg-[#111] border border-neutral-700 rounded-lg overflow-hidden">
                      <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-neutral-700 bg-[#141414]">
                        <span className="text-[12px]">🇵🇰</span>
                        <span className="text-neutral-400 text-[12px]">+92</span>
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Please enter phone number"
                        className="flex-1 bg-transparent border-none outline-none px-3 text-[12px] text-white placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="text-[12px] text-white font-medium mb-1.5 block">Set password</label>
                    <div className="flex bg-[#111] border border-neutral-700 rounded-lg overflow-hidden px-3">
                      <div className="flex items-center justify-center py-2.5 opacity-50">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      </div>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter password"
                        className="flex-1 bg-transparent border-none outline-none px-3 text-[12px] text-white placeholder:text-neutral-600"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                        {showPassword ? <EyeOff className="w-4 h-4 text-[#ff0b0b]" /> : <Eye className="w-4 h-4 text-[#ff0b0b]" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-white font-medium">Strength</span>
                    <div className="flex gap-1 flex-1">
                      <div className="h-1.5 flex-1 bg-neutral-700 rounded-full"></div>
                      <div className="h-1.5 flex-1 bg-neutral-700 rounded-full"></div>
                      <div className="h-1.5 flex-1 bg-neutral-700 rounded-full"></div>
                      <div className="h-1.5 flex-1 bg-neutral-700 rounded-full"></div>
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-8 relative">
                  <button onClick={() => setShowPhoneModal(false)} className="flex-1 border border-neutral-700 text-[#ffdf00] font-bold text-[13px] py-2.5 rounded-lg hover:bg-[#111] transition-colors">
                    Let me think
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-[#ff0b0b] to-[#cc0000] text-white font-bold text-[13px] py-2.5 rounded-lg shadow-[0_0_15px_rgba(255,11,11,0.3)] hover:brightness-110 transition-all">
                    Link Now
                  </button>
                  
                  {/* Gift Icon floating over Link Now */}
                  <div className="absolute -top-6 right-2 flex items-center bg-[#1a1a1a] rounded-full px-1.5 py-0.5 border border-neutral-700 shadow-xl rotate-12 z-20">
                    <Gift className="w-4 h-4 text-[#ffdf00] mr-1" />
                    <span className="text-[#ffdf00] font-black text-[10px]">10-666</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="text-[#ff0b0b] text-[12px] font-medium hover:underline">
                    I already have another account
                  </button>
                </div>

              </motion.div>
            </motion.div>
          </>
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
