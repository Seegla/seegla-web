import WellnessScore from "@/components/dashboard/WellnessScore";
import EngagementDiversity from "@/components/dashboard/EngagementDiversity";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import ParticipationTrend from "@/components/dashboard/ParticipationTrend";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { 
  Users, 
  Target, 
  Activity,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (!user || authError) {
    redirect("/login");
  }

  // Get User Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      company_id, 
      full_name,
      companies (
        name
      )
    `)
    .eq("id", user.id)
    .single();

  const companyId = profile?.company_id;

  // Setup mode check
  const isSetupMode = !companyId;

  // Parallelized Fetching for Hardened Data
  const [
    { data: wellnessScore },
    { data: burnoutAlerts },
    { data: departmentStats },
    { data: trendData },
    { data: wellnessBreakdown }
  ] = isSetupMode ? [
    { data: 0 }, { data: [] }, { data: [] }, { data: [] }, { data: [] }
  ] : await Promise.all([
    supabase.rpc("get_company_wellness_score", { p_company_id: companyId }),
    supabase.rpc("get_burnout_risk_alerts", { p_company_id: companyId }),
    supabase.rpc("get_department_wellness_stats", { p_company_id: companyId }),
    supabase.rpc("get_participation_trends", { p_company_id: companyId }),
    supabase.rpc("get_wellness_breakdown", { p_company_id: companyId })
  ]);

  // Operational Proxies
  const [
    { count: totalHeadcount },
    { count: newHires },
    { count: activeThisWeek }
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: 'exact', head: true }).eq("company_id", companyId),
    supabase.from("profiles").select("*", { count: 'exact', head: true })
      .eq("company_id", companyId)
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from("daily_checkins").select("user_id", { count: 'exact', head: true })
      .eq("company_id", companyId)
      .gte("checkin_date", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
  ]);

  const participationRate = totalHeadcount ? Math.min(100, Math.round((activeThisWeek || 0) / totalHeadcount * 100)) : 0;
  
  // Engagement Diversity Proxies
  const highEngagement = activeThisWeek || 0;
  const lowEngagement = Math.max(0, (totalHeadcount || 0) - highEngagement);

  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <DashboardClient 
      profile={profile}
      totalHeadcount={totalHeadcount || 0}
      newHires={newHires || 0}
      participationRate={participationRate}
      wellnessScore={wellnessScore}
      burnoutAlerts={burnoutAlerts}
      departmentStats={departmentStats}
      isSetupMode={isSetupMode}
      highEngagement={highEngagement}
      lowEngagement={lowEngagement}
      trendData={trendData || []}
      wellnessBreakdown={wellnessBreakdown || []}
    />
  );
}
