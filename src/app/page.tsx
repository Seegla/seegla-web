import { HeartPulse, ArrowRight, ShieldCheck, Zap, BarChart3, Users, LayoutDashboard, Globe } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-primary selection:bg-brand-teal/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group cursor-pointer">
            <img src="/seegla-no-text.png" alt="SEEGLA Logo" className="h-10 w-10 object-contain transition-transform group-hover:rotate-12" />
            <span className="text-xl font-bold text-brand-navy tracking-tight">SEEGLA <span className="text-brand-teal font-secondary font-medium">HR</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <a href="#solutions" className="hover:text-brand-teal transition-colors">Solutions</a>
            <a href="#vision" className="hover:text-brand-teal transition-colors">Our Vision</a>
            <Link
              href="/login"
              className="bg-brand-navy text-white px-8 py-3.5 rounded-2xl hover:bg-brand-navy/90 transition-all active:scale-95 shadow-xl shadow-brand-navy/10"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-8 overflow-hidden">
        {/* Abstract Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
           <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-teal/20 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-coral/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="h-2 w-2 rounded-full bg-brand-teal animate-ping"></span>
              The Future of Human Capital
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold text-brand-navy leading-[1] mb-8 tracking-tighter">
              Empowering <br />
              <span className="text-brand-teal">Human Potential.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-12 font-medium">
              Transform your organization with predictive wellness insights. We provide the tools for visionary leaders to build resilient, high-performing teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/login"
                className="flex items-center justify-center gap-3 bg-brand-navy text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-brand-navy/20 hover:bg-brand-navy/90 transition-all active:scale-95 group"
              >
                Launch Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-5 rounded-2xl border-2 border-slate-100 font-bold text-brand-navy hover:bg-slate-50 transition-all">
                Request Briefing
              </button>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-teal/20 to-brand-coral/10 rounded-[60px] blur-3xl -z-10"></div>
            <div className="relative bg-white p-6 rounded-[56px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white/40 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-700">
               <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                alt="Executive Workspace"
                className="rounded-[40px] w-full h-[600px] object-cover"
              />
              {/* Overlay Glass UI Snippets */}
              <div className="absolute -left-12 top-1/4 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 max-w-[200px] animate-float">
                <div className="h-2 w-12 bg-brand-teal rounded-full mb-3"></div>
                <p className="text-xs font-bold text-brand-navy leading-tight">Wellness Index Rising</p>
                <div className="mt-4 flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="h-8 flex-1 bg-slate-100 rounded-lg"></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Value Pillars */}
      <section id="solutions" className="py-40 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold text-brand-teal uppercase tracking-[0.4em] mb-4">Strategic Solutions</h2>
              <p className="text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-tight">
                Data-driven clarity for the <br /> modern workplace.
              </p>
            </div>
            <p className="text-lg text-slate-400 font-medium lg:max-w-xs">
              Moving beyond traditional metrics to capture the pulse of your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Predictive Analytics",
                desc: "Identify organizational fatigue before it impacts performance and retention.",
                icon: BarChart3,
                accent: "bg-brand-teal/10 text-brand-teal"
              },
              {
                title: "Sentiment Mapping",
                desc: "Understand the emotional velocity of your departments through secure check-ins.",
                icon: HeartPulse,
                accent: "bg-brand-coral/10 text-brand-coral"
              },
              {
                title: "Executive Intelligence",
                desc: "High-level visual reporting designed for strategic decision-making.",
                icon: LayoutDashboard,
                accent: "bg-brand-navy/10 text-brand-navy"
              }
            ].map((feature, i) => (
              <div key={i} className="group bg-white p-12 rounded-[48px] border border-slate-100 hover:border-brand-teal/20 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className={`h-16 w-16 rounded-3xl ${feature.accent} flex items-center justify-center mb-10 transition-transform group-hover:scale-110`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-40 px-8 relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-teal rounded-full blur-[200px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Globe className="mx-auto text-brand-teal mb-10 animate-spin-slow" size={48} />
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-10 tracking-tight leading-tight">
            Building the next generation of <br />
            <span className="text-brand-teal">workplace culture.</span>
          </h2>
          <p className="text-xl text-white/50 mb-16 leading-relaxed font-light">
            We believe that every employee deserves to thrive. Our mission is to bridge the gap between organizational goals and human wellbeing.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-3 bg-brand-teal text-brand-navy font-bold px-12 py-6 rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-brand-teal/20"
          >
            Join the Vision
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-32 px-8 border-t border-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-8">
              <img src="/seegla-no-text.png" alt="SEEGLA Logo" className="h-8 w-8" />
              <span className="text-lg font-bold text-brand-navy tracking-tight">SEEGLA HR</span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Leading the transition to data-informed human resource management.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            <div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-6">Platform</p>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="#solutions" className="hover:text-brand-teal transition-colors">Solutions</a></li>
                <li className="hover:text-brand-teal cursor-pointer transition-colors">Security</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-6">Company</p>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="#vision" className="hover:text-brand-teal transition-colors">Vision</a></li>
                <li className="hover:text-brand-teal cursor-pointer transition-colors">Privacy</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">© 2026 SEEGLA Philippines. All Rights Reserved.</p>
          <div className="flex gap-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            <span className="hover:text-brand-teal cursor-pointer">System Status</span>
            <span className="hover:text-brand-teal cursor-pointer">Global Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

