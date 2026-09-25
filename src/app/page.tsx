"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import AuthScreen from "@/components/AuthScreen";
import HomeScreen from "@/components/HomeScreen";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [view, setView] = useState<"splash" | "auth" | "home">("splash");

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <AnimatePresence mode="wait">
        {view === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: "blur(10px)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50"
          >
            <SplashScreen onComplete={() => setView("auth")} />
          </motion.div>
        )}
        
        {view === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full min-h-screen flex flex-col"
          >
            <AuthScreen onLogin={() => setView("home")} onClose={() => setView("home")} />
          </motion.div>
        )}

        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen flex flex-col"
          >
            {/* Added home component dynamically */}
            <HomeScreen onLoginClick={() => setView("auth")} onRegisterClick={() => setView("auth")} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
