"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Building2, 
  ChevronLeft, 
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import Link from "next/link";

interface DeptStat {
  department_name: string;
  avg_score: number;
}

export default function DepartmentsPage() {
  const [stats, setStats] = useState<DeptStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
        const { data } = await supabase.rpc("get_department_wellness_stats", { 
          p_company_id: profile.company_id 
        });
        setStats(data || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Mock data if empty
  const displayStats = stats.length > 0 ? stats : [
    { department_name: 'IT / Engineering', avg_score: 88 },
    { department_name: 'Human Resources', avg_score: 82 },
    { department_name: 'Marketing', avg_score: 75 },
    { department_name: 'Product', avg_score: 68 },
    { department_name: 'Operations', avg_score: 52 },
    { department_name: 'Sales', avg_score: 45 },
    { department_name: 'Customer Support', avg_score: 38 },
  ];

  const filteredStats = displayStats.filter(s => 
    s.department_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.avg_score - a.avg_score);

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
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-2">
              <Building2 size={14} />
              Organizational Comparison
            </div>
            <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Departments</h1>
            <p className="text-brand-navy/50 font-medium mt-2">
              Compare how different teams are doing across the company.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-brand-navy hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Filter By Score
           </button>
        </div>
      </div>

      {/* Ranking List */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-12 gap-4 p-8 border-b border-gray-50 text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-7">Department Name</div>
              <div className="col-span-2 text-center">Wellness Score</div>
              <div className="col-span-2 text-center">Status</div>
            </div>

            <div className="divide-y divide-gray-50">
              {filteredStats.map((dept, idx) => {
                const score = dept.avg_score;
                let statusColor = "text-brand-teal";
                let statusText = "Excellent";
                let StatusIcon = TrendingUp;

                if (score < 40) {
                  statusColor = "text-brand-coral";
                  statusText = "Critical";
                  StatusIcon = TrendingDown;
                } else if (score < 60) {
                  statusColor = "text-orange-500";
                  statusText = "Needs Attention";
                  StatusIcon = Minus;
                } else if (score < 80) {
                  statusColor = "text-brand-navy";
                  statusText = "Stable";
                  StatusIcon = TrendingUp;
                }

                return (
                  <div key={idx} className="grid grid-cols-12 gap-4 p-8 items-center hover:bg-gray-50/50 transition-colors group">
                    <div className="col-span-1 text-center">
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? 'bg-brand-teal text-brand-navy' : 
                        idx === 1 ? 'bg-brand-teal/20 text-brand-teal' : 
                        idx === 2 ? 'bg-brand-teal/10 text-brand-teal' : 
                        'text-brand-navy/30'
                      }`}>
                        {idx + 1}
                      </span>
                    </div>
                    <div className="col-span-7">
                      <h4 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
                        {dept.department_name}
                      </h4>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className={`text-2xl font-bold ${statusColor}`}>{score}%</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${statusColor} bg-current/5 px-3 py-1 rounded-full`}>
                        <StatusIcon size={12} />
                        {statusText}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-brand-navy p-8 rounded-[32px] text-white">
          <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Highest Performer</h4>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{filteredStats[0]?.department_name}</span>
            <div className="text-3xl font-bold text-brand-teal">{filteredStats[0]?.avg_score}%</div>
          </div>
        </div>
        <div className="flex-1 bg-brand-coral/10 p-8 rounded-[32px] border border-brand-coral/20">
          <h4 className="text-sm font-bold text-brand-coral uppercase tracking-widest mb-4">Lowest Performer</h4>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-brand-navy">{filteredStats[filteredStats.length - 1]?.department_name}</span>
            <div className="text-3xl font-bold text-brand-coral">{filteredStats[filteredStats.length - 1]?.avg_score}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
