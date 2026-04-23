"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Gift, 
  ChevronLeft, 
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus
} from "lucide-react";
import Link from "next/link";

interface RewardItem {
  id: string;
  brand: string;
  title: string;
  points_cost: number;
  category: string;
  stock_remaining: number;
}

interface Redemption {
  id: string;
  user_full_name: string;
  item_title: string;
  points_spent: number;
  status: string;
  created_at: string;
}

export default function RewardsPage() {
  const [items, setItems] = useState<RewardItem[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
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
        // Fetch items
        const { data: itemsData } = await supabase
          .from("marketplace_items")
          .select("*")
          .eq("company_id", profile.company_id);
        
        setItems(itemsData || []);

        // Fetch recent redemptions (mocking the join for now as we don't have an RPC)
        const { data: redData } = await supabase
          .from("redemptions")
          .select(`
            id,
            points_spent,
            status,
            created_at,
            profiles (full_name),
            marketplace_items (title)
          `)
          .eq("company_id", profile.company_id)
          .order("created_at", { ascending: false })
          .limit(10);
        
        const formattedRedemptions = redData?.map((r: any) => ({
          id: r.id,
          user_full_name: r.profiles?.full_name || 'Unknown User',
          item_title: r.marketplace_items?.title || 'Unknown Item',
          points_spent: r.points_spent,
          status: r.status,
          created_at: r.created_at
        })) || [];

        setRedemptions(formattedRedemptions);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Mock data if empty
  const displayItems = items.length > 0 ? items : [
    { id: '1', brand: 'Grab', title: '₱500 Voucher', points_cost: 5000, category: 'transport', stock_remaining: 12 },
    { id: '2', brand: 'Starbucks', title: '₱200 Gift Card', points_cost: 2500, category: 'food', stock_remaining: 45 },
    { id: '3', brand: 'Anytime Fitness', title: '1 Month Membership', points_cost: 15000, category: 'wellness', stock_remaining: 5 },
  ];

  const displayRedemptions = redemptions.length > 0 ? redemptions : [
    { id: '1', user_full_name: 'John Doe', item_title: '₱500 Voucher', points_spent: 5000, status: 'fulfilled', created_at: '2026-04-22T10:00:00Z' },
    { id: '2', user_full_name: 'Jane Smith', item_title: '₱200 Gift Card', points_spent: 2500, status: 'pending', created_at: '2026-04-22T14:30:00Z' },
    { id: '3', user_full_name: 'Mike Ross', item_title: '1 Month Membership', points_spent: 15000, status: 'fulfilled', created_at: '2026-04-21T09:15:00Z' },
  ];

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
              <Gift size={14} />
              Employee Recognition
            </div>
            <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Rewards</h1>
            <p className="text-brand-navy/50 font-medium mt-2">
              Manage the rewards your employees can buy with their wellness points.
            </p>
          </div>
          <button className="bg-brand-teal text-brand-navy px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand-teal/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
            <Plus size={18} />
            Add New Reward
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Available Rewards List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
              <ShoppingBag size={20} className="text-brand-teal" />
              Available Marketplace Items
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-brand-teal/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-brand-navy/20 text-xs">
                    {item.brand.substring(0, 1)}
                  </div>
                  <span className="text-xs font-bold text-brand-teal bg-brand-teal/5 px-3 py-1 rounded-full uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">{item.title}</h4>
                <div className="text-sm font-medium text-brand-navy/40 mb-4">{item.brand}</div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <div>
                      <div className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest">Cost</div>
                      <div className="text-xl font-bold text-brand-navy">{item.points_cost} pts</div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest">Stock</div>
                      <div className="text-sm font-bold text-brand-navy">{item.stock_remaining} left</div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Redemptions Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
              <CreditCard size={20} className="text-brand-teal" />
              Recent Redemptions
            </h3>
          </div>
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {displayRedemptions.map((red) => (
                <div key={red.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-brand-navy text-sm">{red.user_full_name}</span>
                    <span className="text-[10px] font-bold text-brand-navy/30">
                      {new Date(red.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-brand-navy/50 font-medium mb-3">Purchased: <span className="text-brand-navy">{red.item_title}</span></div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-brand-navy">{red.points_spent} pts</div>
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${
                      red.status === 'fulfilled' ? 'text-brand-teal' : 'text-orange-500'
                    }`}>
                      {red.status === 'fulfilled' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {red.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest hover:text-brand-navy transition-colors flex items-center justify-center gap-2">
              View All History
              <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
