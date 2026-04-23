"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface DepartmentStats {
  department_name: string;
  wellness_score?: number;
  avg_score?: number;
  score?: number;
  is_masked?: boolean;
}

interface DepartmentChartProps {
  data: DepartmentStats[];
}

export default function DepartmentChart({ data }: DepartmentChartProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data.length > 0 ? data.map(d => ({
    ...d,
    wellness_score: d.wellness_score ?? d.avg_score ?? d.score ?? 0
  })) : [
    { department_name: 'Engineering', wellness_score: 85, is_masked: false },
    { department_name: 'Product', wellness_score: 72, is_masked: false },
    { department_name: 'Sales', wellness_score: 45, is_masked: false },
    { department_name: 'Support', wellness_score: 38, is_masked: false },
  ];

  if (!mounted) return <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl" />;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Internal Benchmarking
          </h3>
          <p className="text-lg font-bold text-slate-900">Department Distribution</p>
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="department_name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="wellness_score" radius={[4, 4, 0, 0]} barSize={32}>
              {chartData.map((entry, index) => {
                const score = entry.wellness_score;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.is_masked ? "#e2e8f0" : score > 70 ? "#00CAC8" : score > 50 ? "#94a3b8" : "#F28C6B"} 
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-brand-teal"></div>
            <span>Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-slate-300"></div>
            <span>Baseline</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-slate-300" />
          <span>Privacy Protected</span>
        </div>
      </div>
    </div>
  );
}
