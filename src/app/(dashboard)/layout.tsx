"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-primary">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center px-4 z-40">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex-1 flex justify-center mr-8">
          <span className="font-bold text-slate-900 tracking-tight">SEEGLA <span className="text-brand-teal">HR</span></span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-brand-navy flex flex-col">
            <div className="flex items-center justify-end p-6 border-b border-white/5">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/40 hover:text-white rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" onClick={() => setIsMobileMenuOpen(false)}>
              <Sidebar hideToggle />
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto focus:outline-none pt-16 md:pt-0">
        <div className="py-8 px-6 md:py-10 md:px-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
