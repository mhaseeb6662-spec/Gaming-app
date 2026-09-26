"use client";

import { useState } from "react";
import { ChevronLeft, EyeOff, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WithdrawScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInput = (val: string, setter: (v: string) => void) => {
    // Only allow digits, max 6
    const clean = val.replace(/\D/g, "").slice(0, 6);
    setter(clean);
  };

  const renderBoxes = (value: string) => {
    return (
      <div className="flex w-full border border-neutral-700 rounded-md overflow-hidden bg-[#151515]">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 h-[46px] flex items-center justify-center text-xl font-bold border-r border-neutral-700 last:border-r-0 ${value[i] ? "text-white" : "text-transparent"}`}
          >
            {value[i] ? "•" : ""}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col font-sans pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#1a1a1a] sticky top-0 z-50 border-b border-neutral-800">
        <button onClick={() => router.back()} className="text-neutral-400 hover:text-white p-1 -ml-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Withdrawal Password</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-6">
        <p className="text-[#1fdf1f] text-center text-sm font-medium mb-8 leading-tight">
          For the safety of your funds, you need to set a withdrawal password first!
        </p>

        {/* Set Password */}
        <div className="mb-6 relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[15px] font-medium">Set up Withdrawal Password</span>
            <EyeOff className="w-4 h-4 text-neutral-600" />
          </div>
          <div className="relative">
            {renderBoxes(password)}
            <input 
              type="text" 
              inputMode="numeric" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-text"
              value={password}
              onChange={(e) => handleInput(e.target.value, setPassword)}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[15px] font-medium">Confirm new Withdrawal Password</span>
            <EyeOff className="w-4 h-4 text-neutral-600" />
          </div>
          <div className="relative">
            {renderBoxes(confirmPassword)}
            <input 
              type="text" 
              inputMode="numeric" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-text"
              value={confirmPassword}
              onChange={(e) => handleInput(e.target.value, setConfirmPassword)}
            />
          </div>
        </div>

        {/* Warning Text */}
        <div className="flex items-start gap-1.5 text-[#ff5555] text-xs leading-tight">
          <div className="bg-[#ff5555] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[10px] font-bold">!</span>
          </div>
          <p>
            Attention: The withdrawal password protects your funds and is extremely important. Keep it to yourself to prevent any financial loss
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-[#111] fixed bottom-0 w-full max-w-md mx-auto z-50">
        <button 
          className={`w-full py-3.5 rounded-lg font-bold text-[15px] text-black ${password.length === 6 && confirmPassword.length === 6 ? "bg-[#66df2f] hover:bg-[#55cc25] shadow-[0_2px_15px_rgba(31,223,31,0.3)]" : "bg-[#80e550] opacity-80"}`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
