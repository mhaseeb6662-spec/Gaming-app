const fs = require("fs");

// layout.tsx
let layout = fs.readFileSync("src/app/layout.tsx", "utf-8");
layout = layout.replace('import "./globals.css";', 'import "./globals.css";\nimport { Toaster } from "react-hot-toast";');
layout = layout.replace('{children}</body>', '{children}\n        <Toaster position="top-center" toastOptions={{ style: { background: "#111", color: "#fff", border: "1px solid #cc0000" } }} />\n      </body>');
fs.writeFileSync("src/app/layout.tsx", layout, "utf-8");

// page.tsx
let page = fs.readFileSync("src/app/page.tsx", "utf-8");
page = page.replace('<HomeScreen />', '<HomeScreen onLoginClick={() => setView("auth")} onRegisterClick={() => setView("auth")} />');
fs.writeFileSync("src/app/page.tsx", page, "utf-8");

// HomeScreen.tsx
let home = fs.readFileSync("src/components/HomeScreen.tsx", "utf-8");
home = home.replace('export default function HomeScreen() {', 'import toast from "react-hot-toast";\nexport default function HomeScreen({ onLoginClick, onRegisterClick }: { onLoginClick?: () => void, onRegisterClick?: () => void }) {');
home = home.replace('const [heroIndex, setHeroIndex] = useState(0);', 'const [heroIndex, setHeroIndex] = useState(0);\n  const [isMenuOpen, setIsMenuOpen] = useState(false);');
home = home.replace('<button className="p-1 -ml-1 flex items-center justify-center text-[#ffdf00] shrink-0 hover:brightness-125 transition-colors">', '<button onClick={() => setIsMenuOpen(true)} className="p-1 -ml-1 flex items-center justify-center text-[#ffdf00] shrink-0 hover:brightness-125 transition-colors">');
home = home.replace('<button className="bg-[#0a0a0a] border border-[#ffdf00] text-[#ffdf00] px-3 py-1.5 rounded-[8px] text-[13px] font-medium min-w-[70px] tracking-tight shrink-0 shadow-sm hover:bg-[#1f1b02] transition-colors flex items-center gap-1.5">', '<button onClick={onLoginClick || (() => toast.success("Login coming soon"))} className="bg-[#0a0a0a] border border-[#ffdf00] text-[#ffdf00] px-3 py-1.5 rounded-[8px] text-[13px] font-medium min-w-[70px] tracking-tight shrink-0 shadow-sm hover:bg-[#1f1b02] transition-colors flex items-center gap-1.5">');
home = home.replace('<button className="bg-[#cc0000] text-white px-3 py-1.5 rounded-[8px] text-[13px] font-medium min-w-[80px] tracking-tight shrink-0 hover:bg-[#ff0000] transition-colors flex items-center justify-center gap-1.5">', '<button onClick={onRegisterClick || (() => toast.success("Register coming soon"))} className="bg-[#cc0000] text-white px-3 py-1.5 rounded-[8px] text-[13px] font-medium min-w-[80px] tracking-tight shrink-0 hover:bg-[#ff0000] transition-colors flex items-center justify-center gap-1.5">');

const sidebar = `
      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-[280px] h-full bg-[#111] border-r border-[#ffdf00]/30 shadow-2xl flex flex-col">
            <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-[#0a0a0a]">
              <img src="/header-logo.jpg" alt="8111C" className="h-[30px] mix-blend-screen" />
              <button onClick={() => setIsMenuOpen(false)} className="text-neutral-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-2">
              {["Home", "VIP Club", "Promotions", "My Profile", "Settings", "Customer Service"].map((item) => (
                <button key={item} onClick={() => { setIsMenuOpen(false); toast.success("Going to " + item + "...") }} className="text-left px-4 py-3 text-[14px] text-white font-medium hover:bg-[#cc0000] rounded-lg transition-colors border border-transparent hover:border-[#ffdf00]">
                  {item}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-neutral-800">
              <button onClick={onLoginClick} className="w-full bg-[#ffdf00] text-black font-bold py-2 rounded-lg mb-2 hover:brightness-110">Login</button>
              <button onClick={onRegisterClick} className="w-full bg-[#cc0000] text-white font-bold py-2 rounded-lg hover:brightness-110">Register</button>
            </div>
          </motion.div>
        </div>
      )}
`;

home = home.replace("<BottomNav />", sidebar + "<BottomNav />");
fs.writeFileSync("src/components/HomeScreen.tsx", home, "utf-8");

// Profile page
let profile = fs.readFileSync("src/app/profile/page.tsx", "utf-8");
profile = profile.replace('const menu = item as any;', 'const menu = item as { icon: React.ReactNode, label: string, subtext: string, highlight: boolean };');
profile = profile.replace('import Link from "next/link";', 'import Link from "next/link";\nimport toast from "react-hot-toast";');
profile = profile.replace('<div className="flex flex-col items-center gap-2 relative">', '<div onClick={() => toast.success("Feature coming soon: Integration in progress")} className="flex flex-col items-center gap-2 relative cursor-pointer hover:scale-105 transition-transform">');
profile = profile.replace('<button className="w-full flex items-center justify-between', '<button onClick={() => toast.success("Feature coming soon")} className="w-full flex items-center justify-between');
fs.writeFileSync("src/app/profile/page.tsx", profile, "utf-8");

// Promo page
let promo = fs.readFileSync("src/app/promo/page.tsx", "utf-8");
promo = promo.replace('import { useState } from "react";', 'import { useState } from "react";\nimport toast from "react-hot-toast";');
promo = promo.replace('onClick={() => setRedeemModal(true)} className="bg-gradient-to-b from-[#cc0000] to-[#ff0b0b]', 'onClick={() => { setRedeemModal(true); toast.success("Redirecting to Bet..."); }} className="bg-gradient-to-b from-[#cc0000] to-[#ff0b0b]');
fs.writeFileSync("src/app/promo/page.tsx", promo, "utf-8");
