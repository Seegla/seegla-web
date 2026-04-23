"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  MessageSquare,
  ChevronLeft,
  Trash2,
  AlertCircle,
  Clock,
  User,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

interface FeedPost {
  id: string;
  content: string;
  post_type: string;
  created_at: string;
  is_visible: boolean;
  profiles: {
    full_name: string;
  };
}

export default function ModerationPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const supabase = createClient();

  const fetchPosts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("id", user.id)
      .single();

    if (profile?.company_id) {
      const { data } = await supabase
        .from("feed_posts")
        .select(`
          id,
          content,
          post_type,
          created_at,
          is_visible,
          profiles (full_name)
        `)
        .eq("company_id", profile.company_id)
        .eq("post_type", "user_post")
        .order("created_at", { ascending: false });

      setPosts(data as any || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to remove this post? This cannot be undone.")) return;

    setActioningId(postId);
    const { error } = await supabase
      .from("feed_posts")
      .update({ is_visible: false })
      .eq("id", postId);

    if (!error) {
      setPosts(posts.filter(p => p.id !== postId));
    }
    setActioningId(null);
  };

  // Mock data if empty
  const displayPosts = posts.length > 0 ? posts : [
    { id: '1', content: 'Anyone want to go for a run later today? 🏃‍♂️', post_type: 'user_post', created_at: '2026-04-22T16:00:00Z', is_visible: true, profiles: { full_name: 'David Smith' } },
    { id: '2', content: 'Does anyone have a spare phone charger? Left mine at home.', post_type: 'user_post', created_at: '2026-04-22T15:30:00Z', is_visible: true, profiles: { full_name: 'Sarah Lee' } },
    { id: '3', content: 'I really hate the new office layout, it is so noisy here.', post_type: 'user_post', created_at: '2026-04-22T14:15:00Z', is_visible: true, profiles: { full_name: 'Anonymous User' } },
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
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-coral uppercase tracking-widest mb-2">
              <MessageSquare size={14} />
              Community Management
            </div>
            <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Content Moderation</h1>
            <p className="text-brand-navy/50 font-medium mt-2">
              Review and manage posts from your employees to keep the community healthy.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Box */}
      <div className="bg-gray-50 border border-gray-100 p-8 rounded-[40px] flex items-center gap-6">
        <div className="h-12 w-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
          <AlertCircle size={24} />
        </div>
        <p className="text-sm text-brand-navy/60 font-medium leading-relaxed">
          Only "User Posts" are shown here. Automatic updates like reward completions or step milestones are handled by the system.
          Removing a post will hide it from the mobile app immediately.
        </p>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {displayPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6 hover:border-brand-coral/20 transition-all group"
          >
            <div className="flex items-start gap-6 flex-1">
              <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-navy/20 shrink-0">
                <User size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-brand-navy">{post.profiles?.full_name || 'System User'}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-200"></span>
                  <span className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(post.created_at).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-lg text-brand-navy/70 leading-relaxed font-medium">
                  "{post.content}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
              <button
                onClick={() => handleDelete(post.id)}
                disabled={actioningId === post.id}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-brand-coral rounded-xl font-bold text-sm hover:bg-brand-coral hover:text-white transition-all active:scale-95 disabled:opacity-50"
              >
                <Trash2 size={16} />
                {actioningId === post.id ? 'Removing...' : 'Delete Post'}
              </button>
            </div>
          </div>
        ))}

        {displayPosts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 text-brand-teal shadow-sm">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-xl font-bold text-brand-navy mb-2">No posts to moderate</h4>
            <p className="text-brand-navy/40 font-medium">Your employee feed is looking clean!</p>
          </div>
        )}
      </div>
    </div>
  );
}
