"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

interface EngagementDiversityProps {
  highEngagement: number;
  lowEngagement: number;
}

export default function EngagementDiversity({ highEngagement, lowEngagement }: EngagementDiversityProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: "Active", value: highEngagement, color: "#00CAC8" },
    { name: "Low Activity", value: lowEngagement, color: "#e2e8f0" },
  ];

  const total = highEngagement + lowEngagement;

  if (!mounted) return <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl" />;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Activity Distribution
        </h3>
        <p className="text-lg font-bold text-slate-900">Engagement Mix</p>
      </div>
      
      <div className="flex-1 relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900">{total}</span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Total Employees</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
            </div>
            <div className="text-xl font-bold text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
