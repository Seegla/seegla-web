"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Settings, 
  ChevronLeft, 
  Building,
  Key,
  Save,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface Company {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  logo_url: string | null;
}

export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
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
        const { data } = await supabase
          .from("companies")
          .select("*")
          .eq("id", profile.company_id)
          .single();
        
        setCompany(data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("companies")
      .update({ name: company.name })
      .eq("id", company.id);

    if (error) {
      setMessage({ type: 'error', text: 'Failed to update company profile.' });
    } else {
      setMessage({ type: 'success', text: 'Company profile updated successfully!' });
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-brand-navy/50 font-bold uppercase tracking-widest text-xs animate-pulse">Loading settings...</div>;

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
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-2 opacity-30">
              <Settings size={14} />
              Administration
            </div>
            <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Settings</h1>
            <p className="text-brand-navy/50 font-medium mt-2">
              Manage your company profile and employee access codes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Settings Form */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSave} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-xl font-bold text-brand-navy flex items-center gap-3">
              <Building size={20} className="text-brand-teal" />
              Company Profile
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest ml-1">Company Name</label>
                <input 
                  type="text" 
                  value={company?.name || ''} 
                  onChange={(e) => setCompany(company ? { ...company, name: e.target.value } : null)}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-teal/20 transition-all font-bold text-brand-navy"
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest ml-1">Timezone</label>
                  <div className="w-full bg-gray-50/50 rounded-2xl px-6 py-4 font-bold text-brand-navy/40 flex items-center gap-2">
                    <Clock size={16} />
                    {company?.timezone || 'UTC'}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest ml-1">Region</label>
                  <div className="w-full bg-gray-50/50 rounded-2xl px-6 py-4 font-bold text-brand-navy/40 flex items-center gap-2">
                    <Globe size={16} />
                    Southeast Asia
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
              {message && (
                <div className={`flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'text-brand-teal' : 'text-brand-coral'}`}>
                  {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </div>
              )}
              <div className={message ? '' : 'ml-auto'}>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-brand-navy text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand-navy/10 hover:bg-brand-navy/90 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Onboarding Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-navy p-10 rounded-[40px] text-white shadow-2xl shadow-brand-navy/20 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute -right-20 -top-20 h-64 w-64 bg-brand-teal/10 rounded-full blur-3xl group-hover:bg-brand-teal/20 transition-all duration-700"></div>
            
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
              <Key size={20} className="text-brand-teal" />
              Access Control
            </h3>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3 block">Your Onboarding Code</label>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center group/code cursor-pointer hover:bg-white/10 transition-all">
                  <div className="text-5xl font-black tracking-[0.2em] text-brand-teal mb-2 font-mono">
                    {company?.slug?.toUpperCase() || 'SGX001'}
                  </div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover/code:text-white/40 transition-colors">
                    Click to copy code
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/40 font-medium leading-relaxed">
                Give this 6-character code to your employees when they download the app. 
                It connects them automatically to your company and department.
              </p>

              <div className="pt-6 border-t border-white/5 flex items-center gap-4 text-xs font-bold text-white/60">
                 <div className="h-2 w-2 rounded-full bg-brand-teal animate-pulse"></div>
                 Status: Active & Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
