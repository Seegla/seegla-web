"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

interface ParticipationTrendProps {
  data: any[];
}

export default function ParticipationTrend({ data }: ParticipationTrendProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data.length > 0 ? data.map(d => ({
    ...d,
    name: d.name || (d.date ? new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '---'),
    participation: d.participation || 0
  })) : [
    { name: 'JAN', participation: 45 },
    { name: 'FEB', participation: 52 },
    { name: 'MAR', participation: 48 },
    { name: 'APR', participation: 70 },
    { name: 'MAY', participation: 85 },
    { name: 'JUN', participation: 78 },
    { name: 'JUL', participation: 92 },
  ];

  const peakRate = data.length > 0 ? Math.max(...data.map(d => d.participation || 0)) : 92;
  const avgRate = data.length > 0 ? Math.round(data.reduce((acc, d) => acc + (d.participation || 0), 0) / data.length) : 68;

  if (!mounted) return <div className="h-[400px] w-full bg-slate-50 animate-pulse rounded-2xl" />;

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Long-term Trends
          </h3>
          <p className="text-xl font-bold text-slate-900">Participation Rate</p>
        </div>
        <div className="flex gap-8">
           <div className="text-right">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Peak Rate</div>
             <div className="text-lg font-bold text-brand-teal">{peakRate}%</div>
           </div>
           <div className="text-right">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Average</div>
             <div className="text-lg font-bold text-slate-900">{avgRate}%</div>
           </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00CAC8" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#00CAC8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#cbd5e1', fontSize: 10 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="participation" 
              stroke="#00CAC8" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#areaGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
             <div className="h-2 w-2 rounded-full bg-brand-teal"></div>
             <span>Active Participation</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="h-2 w-2 rounded-full bg-slate-200"></div>
             <span>Quarterly Baseline</span>
           </div>
        </div>
        <p className="uppercase tracking-widest text-[9px]">Data updated hourly</p>
      </div>
    </div>
  );
}
