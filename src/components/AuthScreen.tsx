"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { EyeOff, Lock, X } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function AuthScreen({ onLogin, onClose }: { onLogin?: () => void, onClose?: () => void }) {
  const { login } = useUser();
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = async () => {
    if (!identifier || !password) return alert("Please enter credentials");
    setIsLoading(true);
    try {
      const isLogin = activeTab === "login";
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin ? { identifier, password } : { email: identifier, password };
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://169.58.50.184:4000/api/v1";
      const res = await fetch(API_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      
      if (isLogin) {
        login(data.access_token, data.user);
        if (onLogin) onLogin();
      } else {
        alert("Registered successfully! Please login.");
        setActiveTab("login");
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black text-white font-sans overflow-x-hidden pb-12 flex flex-col items-center">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md px-4 mt-6 flex-1 flex flex-col">
        <div className="bg-[#111111] rounded-[24px] border border-neutral-800 shadow-2xl overflow-hidden relative">
          <div className="pt-8 pb-3 flex justify-center items-center">
            <img src="/header-logo.jpg" alt="8111C" className="h-[44px] w-auto object-contain mix-blend-screen" />
          </div>
          <div className="flex border-b border-neutral-800">
            <button onClick={() => setActiveTab("register")} className={`flex-1 py-3 text-[15px] font-medium transition-colors relative ${activeTab === "register" ? "text-[#ffdf00]" : "text-white"}`}>
              Register
              {activeTab === "register" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-10 right-10 h-[2.5px] bg-[#ff0b0b]" />}
            </button>
            <button onClick={() => setActiveTab("login")} className={`flex-1 py-3 text-[15px] font-medium transition-colors relative ${activeTab === "login" ? "text-[#ffdf00]" : "text-white"}`}>
              Login
              {activeTab === "login" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-10 right-10 h-[2.5px] bg-[#ff0b0b]" />}
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex bg-[#0f0f0f] rounded-lg border border-neutral-800 transition-all overflow-hidden h-10">
                <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="*Phone number / Email" className="flex-1 bg-transparent border-none outline-none px-3 text-[13px] text-white placeholder:text-neutral-600" />
              </div>

              <div className="flex items-center bg-[#0f0f0f] rounded-lg border border-neutral-800 transition-all overflow-hidden h-10 px-3">
                <Lock className="w-3.5 h-3.5 text-neutral-500 mr-2 shrink-0" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*Enter password" className="flex-1 bg-transparent border-none outline-none text-[13px] text-white placeholder:text-neutral-600" />
                <button onClick={() => setShowPassword(!showPassword)} className="text-neutral-600"><EyeOff className="w-4 h-4" /></button>
              </div>

              {activeTab === "register" && (
                <>
                  <div className="flex items-center bg-[#0f0f0f] rounded-lg border border-neutral-800 transition-all overflow-hidden h-10 px-3">
                    <Lock className="w-3.5 h-3.5 text-neutral-500 mr-2 shrink-0" />
                    <input type={showConfirmPassword ? "text" : "password"} placeholder="*Confirm password" className="flex-1 bg-transparent border-none outline-none text-[13px] text-white placeholder:text-neutral-600" />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-neutral-600"><EyeOff className="w-4 h-4" /></button>
                  </div>
                </>
              )}
              
              <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-[#ffdf00] text-black font-bold text-[15px] py-2.5 rounded-lg transition-all active:scale-[0.98] mt-2">
                {activeTab === "register" ? "Register" : "Login"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 mb-8">
          <button onClick={onClose} className="w-8 h-8 rounded-full border-[1.5px] border-white flex items-center justify-center text-white hover:scale-105 transition-transform bg-black/40"><X className="w-5 h-5" /></button>
        </div>
      </motion.div>
    </div>
  );
}
