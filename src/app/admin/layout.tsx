"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, Wallet, FileText, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN"))) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      {/* Sidebar / Top Nav for mobile */}
      <aside className="w-full md:w-64 bg-[#111] border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <div>
            <h2 className="text-[#ffdf00] font-bold text-lg leading-tight">Admin Portal</h2>
            <p className="text-xs text-neutral-400">{user.email}</p>
          </div>
          <Link href="/" className="md:hidden p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
            <ArrowLeft className="w-4 h-4 text-white" />
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          <Link href="/admin" className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-[#1a1a1a] transition-colors whitespace-nowrap">
            <LayoutDashboard className="w-5 h-5 text-[#ffdf00]" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-[#1a1a1a] transition-colors whitespace-nowrap">
            <Users className="w-5 h-5 text-[#ffdf00]" />
            <span className="text-sm font-medium">Manage Users</span>
          </Link>
          <Link href="/admin/financials" className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-[#1a1a1a] transition-colors whitespace-nowrap">
            <Wallet className="w-5 h-5 text-[#ffdf00]" />
            <span className="text-sm font-medium">Financials</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-neutral-800 mt-auto hidden md:block">
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#cc0000] hover:bg-[#ff0b0b] transition-colors text-white font-bold text-sm">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
