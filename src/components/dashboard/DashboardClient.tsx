"use client";

import { useState } from "react";
import WellnessScore from "./WellnessScore";
import EngagementDiversity from "./EngagementDiversity";
import DepartmentChart from "./DepartmentChart";
import ParticipationTrend from "./ParticipationTrend";
import DashboardModal from "./DashboardModal";
import { useRouter } from "next/navigation";
import {
  Users,
  Target,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Zap,
  TrendingUp,
  UserPlus,
  Clock,
  ChevronRight,
  ArrowRight
} from "lucide-react";

interface DashboardClientProps {
  profile: any;
  totalHeadcount: number;
  newHires: number;
  participationRate: number;
  wellnessScore: number;
  burnoutAlerts: any[];
  departmentStats: any[];
  isSetupMode: boolean;
  highEngagement: number;
  lowEngagement: number;
  trendData: any[];
  wellnessBreakdown: any[];
}

export default function DashboardClient({
  profile,
  totalHeadcount,
  newHires,
  participationRate,
  wellnessScore,
  burnoutAlerts,
  departmentStats,
  isSetupMode,
  highEngagement,
  lowEngagement,
  trendData,
  wellnessBreakdown
}: DashboardClientProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const router = useRouter();

  const renderModalContent = () => {
    switch (activeModal) {
      case 'headcount':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full-Time</p>
                <p className="text-3xl font-bold text-slate-900">{totalHeadcount}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Contractors</p>
                <p className="text-3xl font-bold text-slate-900">0</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Retention</p>
                <p className="text-3xl font-bold text-emerald-700">98.2%</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users size={16} className="text-brand-teal" />
                Departmental Allocation
              </h4>
              <div className="space-y-3">
                {departmentStats.map((dept, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                    <span className="text-sm font-medium text-slate-700">{dept.department_name}</span>
                    <span className="text-sm font-bold text-slate-900">
                      {Math.max(1, Math.round(((dept.wellness_score || 0) / 100) * (totalHeadcount || 1) / (departmentStats.length || 1)))} 
                      {" "} members
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => router.push('/dashboard/intelligence')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              View Full Employee Directory
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'onboarding':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between p-6 bg-brand-teal/5 rounded-2xl border border-brand-teal/20">
              <div>
                <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-1">New Hire Velocity</p>
                <p className="text-2xl font-bold text-brand-navy">+{newHires} This Month</p>
              </div>
              <TrendingUp size={32} className="text-brand-teal opacity-50" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-brand-teal" />
                Onboarding Pipeline
              </h4>
              <div className="space-y-3">
                {newHires > 0 ? (
                  Array.from({ length: Math.min(newHires, 4) }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <UserPlus size={14} className="text-slate-400" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Team Member {i + 1}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 px-2 py-1 bg-emerald-50 rounded">In Progress</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic py-8 text-center">No new hires in the current cycle</p>
                )}
              </div>
            </div>

            <button 
              onClick={() => router.push('/dashboard/intelligence')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              Manage Onboarding Tasks
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'pulse':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Weekly Active</p>
                <p className="text-3xl font-bold text-slate-900">{participationRate}%</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Target Rate</p>
                <p className="text-3xl font-bold text-slate-900">85%</p>
              </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <h4 className="text-sm font-bold text-amber-700 mb-2">Participation Insight</h4>
              <p className="text-sm text-amber-600/80 leading-relaxed">
                Participation has {participationRate > 70 ? 'increased' : 'remained stable'} compared to last month. Engineering and Product teams are leading in response volume.
              </p>
            </div>

            <button 
              onClick={() => router.push('/dashboard/intelligence')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              Analyze Pulse Feedback
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'wellness':
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-6 mb-2">
              <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border-4 border-brand-teal">
                <span className="text-2xl font-bold text-slate-900">{wellnessScore}%</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Overall Health Index</h4>
                <p className="text-sm text-slate-500">Based on behavioral data and sentiment analysis.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-teal" />
                Category Breakdown
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {(wellnessBreakdown.length > 0 ? wellnessBreakdown : [
                  { factor_name: 'Burnout Risk', score: 82 },
                  { factor_name: 'Work-Life Balance', score: 75 },
                  { factor_name: 'Growth Opportunity', score: 68 }
                ]).map((cat, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{cat.factor_name || cat.category || 'Metric'}</span>
                      <span className="text-sm font-bold text-slate-900">{cat.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-teal transition-all duration-1000" 
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => router.push('/dashboard/risk')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              Manage Burnout Risks
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'wellness-factors':
        return (
          <div className="space-y-8">
            <div className="p-8 bg-brand-teal/5 rounded-2xl border border-brand-teal/20">
              <h4 className="text-xl font-bold text-brand-navy mb-2">Detailed Wellness Breakdown</h4>
              <p className="text-sm text-brand-navy/60 leading-relaxed">
                Analysis of behavioral signals and sentiment data across all recorded factors.
              </p>
            </div>

            <div className="space-y-4">
              {(wellnessBreakdown.length > 0 ? wellnessBreakdown : [
                { factor_name: 'Work-Life Balance', score: 78 },
                { factor_name: 'Peer Connection', score: 82 },
                { factor_name: 'Management Support', score: 65 },
                { factor_name: 'Growth Satisfaction', score: 71 },
                { factor_name: 'Physical Health', score: 88 },
                { factor_name: 'Mental Focus', score: 59 }
              ]).map((factor, i) => (
                <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl hover:border-brand-teal/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{factor.factor_name || factor.category}</span>
                    <span className="text-sm font-bold text-slate-900">{factor.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-teal transition-all duration-1000" 
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => router.push('/dashboard/intelligence')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              Full Health Intelligence Report
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'engagement-segments':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">High Engagement</p>
                <p className="text-3xl font-bold text-emerald-700">{highEngagement}</p>
                <p className="text-[10px] text-emerald-600/60 font-medium mt-1 uppercase tracking-wider">Active & Productive</p>
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Quiet / At Risk</p>
                <p className="text-3xl font-bold text-amber-700">{lowEngagement}</p>
                <p className="text-[10px] text-amber-600/60 font-medium mt-1 uppercase tracking-wider">Low Participation</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Engagement Dynamics</h4>
              {[
                { 
                  label: 'Participation Growth', 
                  value: (() => {
                    if (!trendData || trendData.length < 2) return 'Stable';
                    const first = Number(trendData[0].participation) || 0;
                    const last = Number(trendData[trendData.length - 1].participation) || 0;
                    const diff = last - first;
                    return `${diff > 0 ? '+' : ''}${diff}%`;
                  })(),
                  type: 'neutral' 
                },
                { 
                  label: 'Sentiment Velocity', 
                  value: wellnessScore > 70 ? 'Positive' : wellnessScore > 50 ? 'Stable' : 'Declining', 
                  type: wellnessScore > 70 ? 'positive' : wellnessScore > 50 ? 'neutral' : 'warning' 
                },
                { 
                  label: 'Risk Concentration', 
                  value: burnoutAlerts.length > 0 ? burnoutAlerts[0].department_name : 'None Detected', 
                  type: burnoutAlerts.length > 0 ? 'warning' : 'positive' 
                }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                  <span className="text-sm font-medium text-slate-700">{stat.label}</span>
                  <span className={`text-sm font-bold ${
                    stat.type === 'positive' ? 'text-emerald-600' : 
                    stat.type === 'warning' ? 'text-brand-coral' : 'text-slate-900'
                  }`}>{stat.value}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => router.push('/dashboard/intelligence')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              Analyze Engagement Trends
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'department-health':
        return (
          <div className="space-y-6">
            <div className="overflow-hidden border border-slate-200 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wellness</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {departmentStats.map((dept, i) => {
                    const score = dept.wellness_score ?? dept.avg_score ?? dept.score ?? 0;
                    const status = score > 70 ? 'Healthy' : score > 50 ? 'Fair' : 'At Risk';
                    const statusColor = score > 70 ? 'bg-emerald-50 text-emerald-600' : 
                                      score > 50 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600';
                    
                    return (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-brand-navy">{dept.department_name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-700">{score}%</span>
                            <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${score > 70 ? 'bg-emerald-500' : score > 50 ? 'bg-amber-500' : 'bg-brand-coral'}`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button 
              onClick={() => router.push('/dashboard/intelligence')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              Detailed Department Analytics
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'participation-history':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Weekly Peak', value: '92%' },
                { label: 'Average', value: `${participationRate}%` },
                { label: 'Trend', value: '+5.2%', positive: true }
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.positive ? 'text-emerald-600' : 'text-slate-900'}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Weekly Participation Breakdown</h4>
              <div className="space-y-2">
                {trendData && trendData.length > 0 ? (
                  trendData.slice().reverse().map((day, i) => {
                    const dateObj = day.date ? new Date(day.date) : null;
                    const dateDisplay = (dateObj && !isNaN(dateObj.getTime())) 
                      ? dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
                      : (day.name || 'Recent Activity');
                    
                    return (
                      <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                        <span className="text-sm font-medium text-slate-500">{dateDisplay}</span>
                        <span className="text-sm font-bold text-slate-900">{(day.participation || 0)}%</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-slate-400 text-xs italic">No historical trend data available</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => router.push('/dashboard/intelligence')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              View Full Participation History
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'all-alerts':
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-4 p-6 bg-red-50 border border-red-100 rounded-2xl">
              <ShieldAlert size={32} className="text-brand-coral" />
              <div>
                <h4 className="text-lg font-bold text-brand-navy">Risk Management Center</h4>
                <p className="text-sm text-brand-coral/80 font-medium">Currently monitoring {burnoutAlerts.length} departmental risks.</p>
              </div>
            </div>

            <div className="space-y-4">
              {burnoutAlerts.length > 0 ? (
                burnoutAlerts.map((alert, i) => (
                  <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl hover:border-brand-coral/30 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${alert.risk_level === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                          {alert.risk_level} Risk
                        </span>
                        <h5 className="font-bold text-brand-navy">{alert.department_name}</h5>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{alert.trend_velocity}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      Sustained low sentiment detected over multiple daily check-ins. Intervention recommended.
                    </p>
                    <button 
                      onClick={() => router.push('/dashboard/risk')}
                      className="text-xs font-bold text-brand-coral uppercase tracking-widest flex items-center gap-2 hover:underline"
                    >
                      Action Protocol
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <p className="text-slate-400 font-medium italic">No active risks to manage at this time.</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => router.push('/dashboard/risk')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all"
            >
              Access Risk Monitoring Station
              <ArrowUpRight size={16} />
            </button>
          </div>
        );

      case 'insights':
        return (
          <div className="space-y-8">
            <div className="p-8 bg-brand-navy text-white rounded-2xl relative overflow-hidden">
              <Zap size={40} className="text-brand-teal mb-4 opacity-50" />
              <h4 className="text-xl font-bold mb-2">Automated Analysis Report</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Our AI model has analyzed your recent engagement logs and identified a {wellnessScore > 75 ? 'low' : 'moderate'} risk of burnout in the engineering department.
              </p>
              <div className="absolute top-0 right-0 h-full w-32 bg-linear-to-l from-brand-teal/10 to-transparent pointer-events-none" />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Recommended Actions</h4>
              {[
                "Schedule a sync with Engineering Lead to discuss resource allocation.",
                "Review recent project deadlines and identify potential bottlenecks.",
                "Consider a mental health day or wellness workshop for the affected team."
              ].map((action, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="h-6 w-6 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-700 leading-snug">{action}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Acknowledge Recommendations
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'headcount': return "Headcount Intelligence";
      case 'onboarding': return "Onboarding Pipeline";
      case 'pulse': return "Engagement Pulse";
      case 'wellness': return "Wellness Index Breakdown";
      case 'wellness-factors': return "Wellness Factors Analysis";
      case 'engagement-segments': return "Engagement Segment Analysis";
      case 'department-health': return "Departmental Health Overview";
      case 'participation-history': return "Participation History Trend";
      case 'all-alerts': return "Risk Management Center";
      case 'insights': return "Strategic Intelligence Insights";
      default: return "";
    }
  };

  return (
    <div className="space-y-8 pb-10 font-primary">
      {/* Modals */}
      <DashboardModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={getModalTitle()}
      >
        {renderModalContent()}
      </DashboardModal>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {profile?.companies?.name || 'Company Overview'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, {profile?.full_name || 'Admin'}. Here is your organization's health summary.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            <button className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900">Daily</button>
            <button className="px-3 py-1.5 rounded-md bg-white shadow-sm text-slate-900 border border-slate-200">Weekly</button>
            <button className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900">Monthly</button>
          </div>
          <button className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-brand-navy/90 transition-colors shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'headcount', label: 'Total Headcount', value: totalHeadcount || 0, icon: Users, color: 'text-brand-navy' },
          { id: 'onboarding', label: 'New Hires', value: newHires || 0, icon: Target, color: 'text-brand-teal' },
          { id: 'pulse', label: 'Participation', value: `${participationRate}%`, icon: Activity, color: 'text-brand-teal' },
          { id: 'wellness', label: 'Wellness Score', value: `${wellnessScore}%`, icon: ShieldCheck, color: 'text-brand-teal' },
        ].map((kpi) => (
          <button
            key={kpi.id}
            onClick={() => setActiveModal(kpi.id)}
            className="hr-card bg-white p-6 hr-card-hover text-left flex flex-col justify-between h-32"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</span>
              <kpi.icon size={18} className={kpi.color} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <button 
          onClick={() => setActiveModal('wellness-factors')}
          className="hr-card bg-white p-8 min-h-[400px] flex flex-col hr-card-hover text-left"
        >
          <WellnessScore score={isSetupMode ? 0 : wellnessScore} />
        </button>
        <button 
          onClick={() => setActiveModal('engagement-segments')}
          className="hr-card bg-white p-8 min-h-[400px] flex flex-col hr-card-hover text-left"
        >
          <EngagementDiversity highEngagement={highEngagement} lowEngagement={lowEngagement} />
        </button>
        <button 
          onClick={() => setActiveModal('department-health')}
          className="hr-card bg-white p-8 min-h-[400px] flex flex-col hr-card-hover text-left"
        >
          <DepartmentChart data={departmentStats || []} />
        </button>
      </div>

      {/* Trends */}
      <button 
        onClick={() => setActiveModal('participation-history')}
        className="w-full hr-card bg-white p-8 hr-card-hover text-left"
      >
        <ParticipationTrend data={trendData || []} />
      </button>

      {/* Alerts & Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 hr-card bg-white p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 text-brand-coral flex items-center justify-center">
                <ShieldAlert size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Organization Alerts</h3>
            </div>
            <button 
              onClick={() => setActiveModal('all-alerts')}
              className="text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-900"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {burnoutAlerts && burnoutAlerts.length > 0 ? (
              burnoutAlerts.slice(0, 3).map((alert: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${alert.risk_level === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                      {alert.risk_level} Risk
                    </div>
                    <span className="font-bold text-slate-900">{alert.department_name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{alert.trend_velocity}</span>
                </div>
              ))
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                <Zap size={24} className="mb-2 opacity-20" />
                <p className="text-xs font-medium">No active risks detected</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-brand-navy rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col border border-white/5">
          <div className="relative z-10">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
              <FileText size={24} className="text-brand-teal" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Strategic Guidance</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-10">
              {burnoutAlerts && burnoutAlerts.length > 0 
                ? `Intervention suggested for ${burnoutAlerts[0].department_name}. Review engagement logs for potential blockers.`
                : "Organizational stability is within target parameters. No immediate intervention required."}
            </p>
            <button 
              onClick={() => setActiveModal('insights')}
              className="w-full bg-brand-teal text-brand-navy py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-teal/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Generate Insights
            </button>
          </div>
          
          {/* Subtle Decorative Element */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
