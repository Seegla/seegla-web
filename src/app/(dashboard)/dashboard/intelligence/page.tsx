import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { 
  Activity, 
  TrendingUp, 
  Smile, 
  Zap, 
  Brain,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import TeamHealthChart from "@/components/dashboard/TeamHealthChart";

export default async function TeamHealthPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user.id)
    .single();

  const companyId = profile?.company_id;
  const isSetupMode = !companyId;

  // Fetch trend data
  const { data: trends } = isSetupMode 
    ? { data: [] } 
    : await supabase.rpc("get_daily_wellness_trends", { p_company_id: companyId });

  // Calculate averages for cards
  const latestTrend = trends?.[trends.length - 1] || {
    avg_score: 0,
    avg_mood: 0,
    avg_energy: 0,
    avg_stress: 0
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
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-2">
              <Activity size={14} />
              Employee Wellness Detail
            </div>
            <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Team Health</h1>
            <p className="text-brand-navy/50 font-medium mt-2">
              Detailed breakdown of how your employees are feeling lately.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Trend Chart */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-brand-navy">14-Day Health Trend</h3>
            <p className="text-sm text-brand-navy/40 font-medium mt-1">Average daily wellness scores across the company.</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="h-[400px] w-full">
          <TeamHealthChart data={trends || []} />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mood Card */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:border-brand-teal/30 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smile size={24} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest">Average Mood</div>
              <div className="text-2xl font-bold text-brand-navy">{isSetupMode ? '--' : `${latestTrend.avg_mood}/5`}</div>
            </div>
          </div>
          <p className="text-xs text-brand-navy/50 leading-relaxed">
            Measures the general happiness and morale of your team members.
          </p>
        </div>

        {/* Energy Card */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:border-brand-teal/30 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest">Average Energy</div>
              <div className="text-2xl font-bold text-brand-navy">{isSetupMode ? '--' : `${latestTrend.avg_energy}/5`}</div>
            </div>
          </div>
          <p className="text-xs text-brand-navy/50 leading-relaxed">
            Measures how tired or motivated your employees are feeling.
          </p>
        </div>

        {/* Stress Card */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:border-brand-teal/30 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-brand-coral/10 text-brand-coral flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain size={24} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest">Stress Level</div>
              <div className="text-2xl font-bold text-brand-navy">{isSetupMode ? '--' : `${latestTrend.avg_stress}/5`}</div>
            </div>
          </div>
          <p className="text-xs text-brand-navy/50 leading-relaxed">
            Measures the pressure and mental load your team is currently carrying.
          </p>
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold text-brand-navy mb-4">What does this data mean?</h3>
          <p className="text-brand-navy/60 leading-relaxed mb-6">
            These scores come directly from the daily check-ins employees do on the mobile app. 
            A "5" means they are feeling great, while a "1" means they are struggling. 
            Keep an eye on these trends to catch issues before they lead to burnout.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-bold text-brand-navy">
              <div className="h-2 w-2 rounded-full bg-brand-teal"></div>
              Goal: Keep scores above 3.5
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-bold text-brand-navy">
              <div className="h-2 w-2 rounded-full bg-brand-coral"></div>
              Alert: Scores below 2.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
