"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  ShieldAlert, 
  ChevronLeft, 
  AlertTriangle,
  ArrowRight,
  Info
} from "lucide-react";
import Link from "next/link";
import ActionGuide from "@/components/shared/ActionGuide";

interface Alert {
  department_name: string;
  risk_level: string;
  days_flagged?: number;
  avg_wellness?: number;
  wellness_score?: number;
  trend_velocity?: string;
}

export default function BurnoutRisksPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();

      if (profile?.company_id) {
        const { data } = await supabase.rpc("get_burnout_risk_alerts", { 
          p_company_id: profile.company_id 
        });
        setAlerts(data || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Mock data if empty
  const displayAlerts = alerts.length > 0 ? alerts : [
    { department_name: 'Customer Support', risk_level: 'High', days_flagged: 6, avg_wellness: 32 },
    { department_name: 'Sales', risk_level: 'Medium', days_flagged: 4, avg_wellness: 48 },
    { department_name: 'Operations', risk_level: 'Medium', days_flagged: 3, avg_wellness: 51 },
  ];

  const handleOpenGuide = (dept: string) => {
    setSelectedDept(dept);
    setIsGuideOpen(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-brand-navy/40 hover:text-brand-navy transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-100 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-coral uppercase tracking-widest mb-2">
              <ShieldAlert size={14} />
              Risk Monitoring Station
            </div>
            <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Burnout Risks</h1>
            <p className="text-brand-navy/50 font-medium mt-2">
              Teams that have been feeling low for several days in a row.
            </p>
          </div>
        </div>
      </div>

      {/* Risk List */}
      <div className="grid grid-cols-1 gap-6">
        {displayAlerts.map((alert, idx) => (
          <div 
            key={idx}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-brand-coral/30 transition-all"
          >
            <div className="flex items-center gap-8 w-full md:w-auto">
              <div className={`h-20 w-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg ${
                alert.risk_level === 'High' ? 'bg-brand-coral text-white' : 'bg-orange-500 text-white'
              }`}>
                <AlertTriangle size={40} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-brand-navy">{alert.department_name}</h3>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    alert.risk_level === 'High' ? 'bg-brand-coral/10 text-brand-coral' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {alert.risk_level} RISK
                  </span>
                </div>
                <p className="text-sm text-brand-navy/50 font-medium">
                  Trend is currently <span className="text-brand-navy font-bold">{alert.trend_velocity || (alert.days_flagged ? `${alert.days_flagged} days` : 'Stable')}</span>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <div className={`text-4xl font-bold ${
                  alert.risk_level === 'High' ? 'text-brand-coral' : 'text-orange-500'
                }`}>{alert.avg_wellness || alert.wellness_score || 0}%</div>
                <div className="text-[10px] text-brand-navy/30 uppercase font-bold tracking-widest mt-1">Health Score</div>
              </div>
              <button 
                onClick={() => handleOpenGuide(alert.department_name)}
                className="bg-brand-navy text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand-navy/10 hover:bg-brand-navy/90 transition-all active:scale-95 flex items-center gap-2 group/btn"
              >
                Launch Help Guide
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-brand-coral/5 border border-brand-coral/20 p-10 rounded-[40px] flex items-start gap-8">
        <div className="h-12 w-12 rounded-2xl bg-brand-coral/10 text-brand-coral flex items-center justify-center shrink-0">
          <Info size={24} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-brand-navy mb-2">How we find these risks</h4>
          <p className="text-brand-navy/60 leading-relaxed max-w-3xl">
            A team is flagged here if their average wellness score stays below a certain level for 3 or more days. 
            High Risk means they have been struggling for 5+ days. When you see a flag, it's a good idea to 
            talk to the team manager to see how you can help.
          </p>
        </div>
      </div>

      {/* Action Guide Modal */}
      <ActionGuide 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
        departmentName={selectedDept || ''} 
      />
    </div>
  );
}
