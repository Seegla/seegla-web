"use client";

import { 
  LayoutDashboard, 
  BarChart3, 
  ShieldAlert, 
  Trophy, 
  Settings, 
  LogOut,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Team Health', href: '/dashboard/intelligence', icon: BarChart3 },
  { name: 'Burnout Risks', href: '/dashboard/risk', icon: ShieldAlert },
  { name: 'Departments', href: '/dashboard/departments', icon: Building2 },
  { name: 'Rewards', href: '/dashboard/rewards', icon: Trophy },
  { name: 'Employee Feed', href: '/dashboard/moderation', icon: ShieldCheck },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({ hideToggle = false }: { hideToggle?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const width = isCollapsed ? '80px' : '256px';
      document.documentElement.style.setProperty('--sidebar-width', width);
    }
  }, [mounted, isCollapsed]);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  if (!mounted) return <div className="h-full bg-brand-navy w-64" />;

  return (
    <div className={`flex h-full flex-col bg-brand-navy text-white font-primary transition-all duration-300 relative ${isCollapsed && !hideToggle ? 'w-20' : 'w-64'}`}>
      
      {!hideToggle && (
        <button 
          onClick={toggleCollapse}
          className="absolute -right-3 top-10 h-6 w-6 rounded-full bg-brand-navy border border-white/10 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors z-50"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      )}

      {/* Logo */}
      <div className={`flex h-20 items-center transition-all ${isCollapsed ? 'px-4 justify-center' : 'px-8'}`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <img src="/seegla-no-text.png" alt="SEEGLA" className="h-8 w-8 object-contain" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">SEEGLA <span className="text-brand-teal">HR</span></span>
              <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">Admin Portal</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        {!isCollapsed && (
          <h3 className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Management</h3>
        )}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-brand-teal text-brand-navy" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={18} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleSignOut}
          className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-brand-coral hover:bg-brand-coral/10 transition-colors w-full ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
