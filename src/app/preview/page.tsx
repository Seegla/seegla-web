"use client";

import DashboardClient from "@/components/dashboard/DashboardClient";

export default function PreviewPage() {
  const mockProfile = {
    full_name: "Mock Admin",
    company_id: "mock-company-id",
    companies: {
      name: "Acme Corp"
    }
  };

  const mockBurnoutAlerts = [
    { department_name: "Engineering", risk_level: "High", trend_velocity: "Increasing" },
    { department_name: "Sales", risk_level: "Medium", trend_velocity: "Stable" }
  ];

  const mockDepartmentStats = [
    { department_name: "Engineering", wellness_score: 65 },
    { department_name: "Sales", wellness_score: 82 },
    { department_name: "HR", wellness_score: 91 },
    { department_name: "Marketing", wellness_score: 74 }
  ];

  const mockTrendData = [
    { date: "2026-04-17", participation: 45 },
    { date: "2026-04-18", participation: 52 },
    { date: "2026-04-19", participation: 48 },
    { date: "2026-04-20", participation: 70 },
    { date: "2026-04-21", participation: 85 },
    { date: "2026-04-22", participation: 78 },
    { date: "2026-04-23", participation: 92 }
  ];

  const mockWellnessBreakdown = [
    { factor_name: "Sleep Quality", score: 72 },
    { factor_name: "Energy Levels", score: 65 },
    { factor_name: "Stress Management", score: 58 },
    { factor_name: "Team Connection", score: 88 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <DashboardClient 
        profile={mockProfile}
        totalHeadcount={156}
        newHires={12}
        participationRate={88}
        wellnessScore={76}
        burnoutAlerts={mockBurnoutAlerts}
        departmentStats={mockDepartmentStats}
        isSetupMode={false}
        highEngagement={132}
        lowEngagement={24}
        trendData={mockTrendData}
        wellnessBreakdown={mockWellnessBreakdown}
      />
    </div>
  );
}
