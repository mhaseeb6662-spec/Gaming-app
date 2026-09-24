import { Home, Gift, UserPlus, Headset, User } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-[9999] pointer-events-none">
      <div className="max-w-md mx-auto bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-neutral-800 flex justify-between items-center px-6 pt-2 pb-[calc(10px+env(safe-area-inset-bottom))] pointer-events-auto shadow-[0_-4px_20px_rgba(0,0,0,0.6)]">
        <button className="flex flex-col items-center gap-1 text-[#00ff00] transition-transform active:scale-95">
          <Home className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#00ff00] transition-all active:scale-95">
          <Gift className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold mt-0.5">Promo</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#00ff00] transition-all active:scale-95">
          <UserPlus className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold mt-0.5">Invite</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#00ff00] transition-all active:scale-95">
          <Headset className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold mt-0.5">Support</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#00ff00] transition-all active:scale-95">
          <User className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold mt-0.5">Profile</span>
        </button>
      </div>
    </div>
  );
}
