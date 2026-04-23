"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface TrendData {
  check_in_date: string;
  avg_score: number;
}

interface TeamHealthChartProps {
  data: TrendData[];
}

export default function TeamHealthChart({ data }: TeamHealthChartProps) {
  // Mock data if empty
  const chartData = data.length > 0 ? data : [
    { check_in_date: '2026-04-10', avg_score: 3.2 },
    { check_in_date: '2026-04-11', avg_score: 3.5 },
    { check_in_date: '2026-04-12', avg_score: 3.8 },
    { check_in_date: '2026-04-13', avg_score: 3.4 },
    { check_in_date: '2026-04-14', avg_score: 3.6 },
    { check_in_date: '2026-04-15', avg_score: 4.1 },
    { check_in_date: '2026-04-16', avg_score: 3.9 },
  ];

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00CAC8" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00CAC8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
        <XAxis 
          dataKey="check_in_date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#001148', fontSize: 11, fontWeight: 700, opacity: 0.4 }}
          tickFormatter={formatXAxis}
          dy={15}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#001148', fontSize: 11, fontWeight: 700, opacity: 0.4 }}
          domain={[0, 5]}
          ticks={[0, 1, 2, 3, 4, 5]}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '16px', 
            border: 'none', 
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '12px'
          }}
          labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        />
        <Area 
          type="monotone" 
          dataKey="avg_score" 
          stroke="#00CAC8" 
          strokeWidth={4}
          fillOpacity={1} 
          fill="url(#colorScore)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
