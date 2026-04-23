"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight, ShieldCheck, Mail, Lock, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        if (authError.message === "Invalid login credentials") {
          setError("Incorrect email or password.");
        } else {
          setError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please check your internet and try again.");
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-primary relative">
      {/* Navigation: Back to Home */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 group md:bg-transparent md:border-none md:p-0"
      >
        <div className="h-8 w-8 rounded-full bg-brand-teal/20 flex items-center justify-center group-hover:bg-brand-teal transition-colors">
          <ArrowRight className="rotate-180 text-brand-teal group-hover:text-brand-navy" size={16} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:inline">Back to Website</span>
      </Link>

      {/* Left: Branding & Visual */}
      <div className="hidden md:flex md:w-1/2 bg-brand-navy relative overflow-hidden flex-col justify-between p-16">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-brand-teal rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-brand-coral rounded-full blur-[150px] animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <img src="/seegla-no-text.png" alt="SEEGLA" className="h-12 w-12 object-contain" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              SEEGLA <span className="text-brand-teal font-secondary font-medium">HR</span>
            </h2>
          </div>
          
          <div className="max-w-lg">
            <h1 className="text-6xl font-bold text-white leading-tight mb-8">
              Empowering Human <br />
              <span className="text-brand-teal">Potential.</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed font-light">
              Transform your organization with data-driven wellness insights and strategic HR management tools.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-10">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-brand-teal" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">Enterprise Security</p>
                <p className="text-xs text-white/40 mt-1 leading-relaxed">End-to-end encryption for all sensitive human resource data.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <AlertCircle className="text-brand-teal" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">Risk Mitigation</p>
                <p className="text-xs text-white/40 mt-1 leading-relaxed">Predictive analytics to identify and prevent organizational burnout.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none opacity-5">
           <div className="grid grid-cols-12 gap-2">
             {Array.from({ length: 48 }).map((_, i) => (
               <div key={i} className="h-1 w-1 bg-white rounded-full"></div>
             ))}
           </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 bg-white flex flex-col justify-center p-8 md:p-24 relative overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-center gap-3 mb-16">
          <img src="/seegla-no-text.png" alt="SEEGLA" className="h-10 w-10" />
          <h2 className="text-xl font-bold text-brand-navy">SEEGLA HR</h2>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-brand-navy mb-3 tracking-tight">Welcome Back</h3>
            <p className="text-slate-500 font-medium text-sm">Enter your administrative credentials to access the console.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} className="text-brand-coral shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-brand-coral">{error}</p>
              </div>
            )}

            <div className="space-y-2 group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-brand-teal">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4.5 text-brand-navy font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/50 transition-all"
                  placeholder="admin@seegla.com"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-brand-teal">
                Secure Password
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4.5 text-brand-navy font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-brand-navy transition-colors">Remember Me</span>
              </label>
              <button type="button" className="text-xs font-bold text-brand-teal uppercase tracking-wider hover:underline">Forgot Password?</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-navy text-white font-bold py-5 rounded-2xl hover:bg-brand-navy/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-brand-navy/10 hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  Sign Into Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-16 pt-10 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Security Active</span>
            </div>
            <p className="text-slate-300 text-[10px] font-medium">v1.4.2 stable</p>
          </div>
        </div>

        {/* Abstract Deco */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
           <svg width="200" height="200" viewBox="0 0 200 200">
             <path d="M0 100 Q 50 0 100 100 T 200 100" fill="none" stroke="currentColor" strokeWidth="2" />
             <path d="M0 120 Q 50 20 100 120 T 200 120" fill="none" stroke="currentColor" strokeWidth="2" />
           </svg>
        </div>
      </div>
    </div>
  );
}
