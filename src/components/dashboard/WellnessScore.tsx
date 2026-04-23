"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

interface WellnessScoreProps {
  score: number;
}

export default function WellnessScore({ score }: WellnessScoreProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: "Score", value: score, color: "#00CAC8" },
    { name: "Remaining", value: 100 - score, color: "#f1f5f9" },
  ];

  if (!mounted) return <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl" />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Organization Wellness
          </h3>
          <p className="text-lg font-bold text-slate-900">Current Index</p>
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded bg-slate-100 ${score >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
          {score >= 70 ? 'Healthy' : 'Monitoring'}
        </div>
      </div>
      
      <div className="flex-1 relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
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
          <span className="text-4xl font-bold text-slate-900">{score}%</span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Score</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 leading-relaxed italic">
          Based on the last 30 days of behavioral data and pulse survey responses.
        </p>
      </div>
    </div>
  );
}
