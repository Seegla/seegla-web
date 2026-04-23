"use client";

import { AlertTriangle, ChevronRight, HeartPulse, ShieldAlert } from "lucide-react";

interface Alert {
  department_name: string;
  risk_level: string;
  days_flagged: number;
  avg_wellness: number;
}

interface BurnoutAlertsProps {
  alerts: Alert[];
}

export default function BurnoutAlerts({ alerts }: BurnoutAlertsProps) {
  const activeAlerts = alerts.length > 0 ? alerts : [
    { department_name: 'Customer Support', risk_level: 'High', days_flagged: 6, avg_wellness: 32 },
    { department_name: 'Sales', risk_level: 'Medium', days_flagged: 4, avg_wellness: 48 },
  ];

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 h-full font-primary">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-[0.2em] mb-1">
            Burnout Risks
          </h3>
          <p className="text-xl font-bold text-brand-navy">Needs Attention</p>
        </div>
        {activeAlerts.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-coral/10 text-brand-coral rounded-full">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Alerts</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {activeAlerts.map((alert, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between p-5 rounded-[24px] border border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                alert.risk_level === 'High' ? 'bg-brand-coral text-white' : 'bg-orange-500 text-white'
              }`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-brand-navy">{alert.department_name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    alert.risk_level === 'High' ? 'bg-brand-coral/10 text-brand-coral' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {alert.risk_level} RISK
                  </span>
                  <span className="text-[10px] text-brand-navy/40 font-bold uppercase">
                    {alert.days_flagged} days at risk
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-xl font-bold ${
                alert.risk_level === 'High' ? 'text-brand-coral' : 'text-orange-500'
              }`}>{alert.avg_wellness}%</div>
              <div className="text-[10px] text-brand-navy/30 uppercase font-bold tracking-widest">Score</div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-4">
            <HeartPulse size={32} />
          </div>
          <h4 className="text-brand-navy font-bold text-base">Your team is doing well</h4>
          <p className="text-xs text-brand-navy/40 mt-2 max-w-[200px]">
            No departments are showing signs of burnout right now.
          </p>
        </div>
      )}

      <div className="mt-8">
        <button className="w-full py-4 rounded-xl border border-gray-100 text-brand-navy/40 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
          Manage Alerts
        </button>
      </div>
    </div>
  );
}
