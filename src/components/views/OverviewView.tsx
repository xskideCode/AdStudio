import React, { useState } from 'react';
import { 
  Calendar, 
  Megaphone, 
  Image as ImageIcon, 
  Star, 
  BatteryMedium, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';
import { OverviewPerformanceChart } from '../common/Chart';

export const OverviewView: React.FC = () => {
  const { setCurrentView, startNewCampaignFlow } = useApp();
  const [selectedMetric, setSelectedMetric] = useState<'spend' | 'ctr' | 'cpa' | 'roas'>('roas');
  const [activeChannelFilter, setActiveChannelFilter] = useState<'all' | 'meta' | 'tiktok'>('all');

  return (
    <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Top Row: Greeting Panel (Left) & Shared Metric Container (Right) */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Greeting Panel (x≈181, y≈163, w≈412, h≈173) */}
        <div className="col-span-12 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs text-[#727681]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Monday, 21 September</span>
          </div>

          <div>
            <h2 className="text-2xl lg:text-[28px] font-semibold text-[#F0F1F7] font-heading tracking-tight leading-tight">
              Good morning, Nizam
            </h2>
            <p className="text-xs text-[#A0A1AA] mt-1">
              Creative performance is up <span className="text-[#66D4AA] font-semibold">18% this week</span>
            </p>
          </div>
        </div>

        {/* Top-Right Shared Metric Container (5 nested cards) */}
        <div className="col-span-12 lg:col-span-8 bg-[#121419] border border-[#252831]/60 rounded-3xl p-3 grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {/* Active campaigns */}
          <div className="bg-[#1A1D24] rounded-2xl p-3.5 flex flex-col justify-between relative group hover:border-[#343842] border border-transparent transition-all">
            <div className="flex items-center justify-between text-[#727681]">
              <span className="text-[11px] font-medium">Active campaigns</span>
              <Megaphone className="w-3.5 h-3.5 text-[#727681]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#F0F1F7] font-heading">12</div>
              <div className="text-[10px] text-[#A0A1AA] mt-0.5">4 launching this week</div>
            </div>
          </div>

          {/* Creatives live */}
          <div className="bg-[#1A1D24] rounded-2xl p-3.5 flex flex-col justify-between relative group hover:border-[#343842] border border-transparent transition-all">
            <div className="flex items-center justify-between text-[#727681]">
              <span className="text-[11px] font-medium">Creatives live</span>
              <ImageIcon className="w-3.5 h-3.5 text-[#727681]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#F0F1F7] font-heading">86</div>
              <div className="text-[10px] text-[#66D4AA] flex items-center gap-0.5 mt-0.5">
                <span>↑ 14 vs last week</span>
              </div>
            </div>
          </div>

          {/* Top creative */}
          <div className="bg-[#1A1D24] rounded-2xl p-3.5 flex flex-col justify-between relative group hover:border-[#343842] border border-transparent transition-all">
            <div className="flex items-center justify-between text-[#727681]">
              <span className="text-[11px] font-medium">Top creative</span>
              <Star className="w-3.5 h-3.5 text-[#727681]" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <img
                src={DOG_IMAGES.corgiOutdoors}
                alt="Top creative corgi"
                className="w-8 h-8 rounded-lg object-cover shrink-0 border border-[#343842]"
              />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#F0F1F7] truncate">UGC-042</div>
                <div className="text-[10px] text-[#66D4AA] font-mono">4.8% CTR</div>
              </div>
            </div>
          </div>

          {/* Creative fatigue */}
          <div className="bg-[#1A1D24] rounded-2xl p-3.5 flex flex-col justify-between relative group hover:border-[#343842] border border-transparent transition-all">
            <div className="flex items-center justify-between text-[#727681]">
              <span className="text-[11px] font-medium">Creative fatigue</span>
              <BatteryMedium className="w-3.5 h-3.5 text-[#F4C36A]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#F4C36A] font-heading">3</div>
              <div className="text-[10px] text-[#A0A1AA] mt-0.5">campaigns to refresh</div>
            </div>
          </div>

          {/* AI opportunities */}
          <div className="bg-[#1A1D24] rounded-2xl p-3.5 flex flex-col justify-between relative group hover:border-[#343842] border border-transparent transition-all">
            <div className="flex items-center justify-between text-[#BEB0F4]">
              <span className="text-[11px] font-medium">AI opportunities</span>
              <Sparkles className="w-3.5 h-3.5 text-[#BEB0F4]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#BEB0F4] font-heading">7</div>
              <div className="text-[10px] text-[#A0A1AA] mt-0.5">ready to review</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: AI Insight Pattern (Left) & Creative Performance Chart (Right) */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left AI Pattern Insight Card (x≈181, y≈353, w≈412, h≈490) */}
        <div className="col-span-12 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            {/* AI found a pattern badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/20">
                <Sparkles className="w-3 h-3 text-[#BEB0F4]" />
                AI found a pattern
              </span>
              <span className="text-[11px] text-[#727681]">18 campaigns analysed</span>
            </div>

            <h3 className="text-lg font-semibold text-[#F0F1F7] font-heading mt-3 leading-snug">
              Lifestyle photos beat white-background shots
            </h3>
            <p className="text-xs text-[#A0A1AA] mt-2 leading-relaxed">
              Creatives showing the cap out on a walk generated 32% higher CTR than white-background product shots across your last 18 campaigns.
            </p>

            {/* Before / After Photo Comparison */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Lifestyle photo */}
              <div className="flex flex-col gap-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#343842] group">
                  <img
                    src={DOG_IMAGES.corgiOutdoors}
                    alt="Lifestyle cap outdoors"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#121419]/80 backdrop-blur-md rounded-md text-[10px] font-medium text-[#F0F1F7]">
                    Lifestyle
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#727681]">Avg CTR</span>
                  <span className="font-mono text-[#66D4AA] font-semibold text-xs">3.7%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 flex-1 bg-[#66D4AA] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#66D4AA] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#66D4AA] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#66D4AA] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#252831] rounded-[2px]" />
                </div>
              </div>

              {/* White background photo */}
              <div className="flex flex-col gap-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#343842] group">
                  <img
                    src={DOG_IMAGES.blueCapWhite}
                    alt="White background product shot"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#121419]/80 backdrop-blur-md rounded-md text-[10px] font-medium text-[#F0F1F7]">
                    White background
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#727681]">Avg CTR</span>
                  <span className="font-mono text-[#A0A1AA] font-medium text-xs">2.8%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 flex-1 bg-[#727681] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#727681] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#252831] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#252831] rounded-[2px]" />
                  <div className="h-1.5 flex-1 bg-[#252831] rounded-[2px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 mt-5">
            <button
              onClick={startNewCampaignFlow}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#292638] hover:bg-[#332f48] text-[#BEB0F4] border border-[#BEB0F4]/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create variations</span>
            </button>
            <button
              onClick={() => setCurrentView('performance')}
              className="py-2.5 px-4 rounded-xl bg-[#1A1D24] hover:bg-[#252831] text-[#F0F1F7] text-xs font-medium border border-[#343842] transition-colors cursor-pointer"
            >
              See evidence
            </button>
          </div>
        </div>

        {/* Right Creative Performance Chart (x≈610, y≈353, w≈915, h≈490) */}
        <div className="col-span-12 lg:col-span-8 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            {/* Header with Title and Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#252831]/40">
              <h3 className="text-lg font-semibold text-[#F0F1F7] font-heading">
                Creative performance
              </h3>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setActiveChannelFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeChannelFilter === 'all'
                      ? 'border border-[#ACD9F3] text-[#ACD9F3] bg-[#ACD9F3]/10'
                      : 'text-[#A0A1AA] hover:text-[#F0F1F7]'
                  }`}
                >
                  All campaigns
                </button>
                <button
                  onClick={() => setActiveChannelFilter('meta')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeChannelFilter === 'meta'
                      ? 'border border-[#ACD9F3] text-[#ACD9F3] bg-[#ACD9F3]/10'
                      : 'text-[#A0A1AA] hover:text-[#F0F1F7]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>Meta</span>
                </button>
                <button
                  onClick={() => setActiveChannelFilter('tiktok')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeChannelFilter === 'tiktok'
                      ? 'border border-[#ACD9F3] text-[#ACD9F3] bg-[#ACD9F3]/10'
                      : 'text-[#A0A1AA] hover:text-[#F0F1F7]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.896 2.896 0 0 1 2.305-4.637c.367 0 .717.07 1.04.196V9.435a6.38 6.38 0 0 0-1.04-.085 6.341 6.341 0 0 0-6.34 6.34 6.341 6.341 0 0 0 6.34 6.34 6.341 6.341 0 0 0 6.34-6.34V8.583a8.167 8.167 0 0 0 4.887 1.602V6.74a4.84 4.84 0 0 1-1.116-.054z" />
                  </svg>
                  <span>TikTok</span>
                </button>
                <div className="flex items-center gap-1 px-3 py-1 bg-[#1A1D24] text-[#A0A1AA] rounded-full border border-[#252831]">
                  <Calendar className="w-3 h-3" />
                  <span>Last 30 days</span>
                </div>
              </div>
            </div>

            {/* Metric Selectors (Spend, CTR, CPA, ROAS) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              {/* Spend */}
              <div
                onClick={() => setSelectedMetric('spend')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedMetric === 'spend'
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#727681]">Spend</span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border ${
                      selectedMetric === 'spend'
                        ? 'border-[#ACD9F3] bg-[#ACD9F3]'
                        : 'border-[#727681]'
                    }`}
                  />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#F0F1F7] font-mono">$48.2k</span>
                  <span className="text-[10px] text-[#66D4AA] font-mono">↑ 12%</span>
                </div>
              </div>

              {/* CTR */}
              <div
                onClick={() => setSelectedMetric('ctr')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedMetric === 'ctr'
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#727681]">CTR</span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border ${
                      selectedMetric === 'ctr'
                        ? 'border-[#ACD9F3] bg-[#ACD9F3]'
                        : 'border-[#727681]'
                    }`}
                  />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#F0F1F7] font-mono">2.84%</span>
                  <span className="text-[10px] text-[#66D4AA] font-mono">↑ 0.4 pts</span>
                </div>
              </div>

              {/* CPA */}
              <div
                onClick={() => setSelectedMetric('cpa')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedMetric === 'cpa'
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#727681]">CPA</span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border ${
                      selectedMetric === 'cpa'
                        ? 'border-[#ACD9F3] bg-[#ACD9F3]'
                        : 'border-[#727681]'
                    }`}
                  />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#F0F1F7] font-mono">$18.40</span>
                  <span className="text-[10px] text-[#66D4AA] font-mono">↓ 9%</span>
                </div>
              </div>

              {/* ROAS (Default Selected) */}
              <div
                onClick={() => setSelectedMetric('roas')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedMetric === 'roas'
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#727681]">ROAS</span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                      selectedMetric === 'roas'
                        ? 'bg-[#ACD9F3] text-[#08090B]'
                        : 'border border-[#727681]'
                    }`}
                  >
                    {selectedMetric === 'roas' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#F0F1F7] font-mono">3.6x</span>
                  <span className="text-[10px] text-[#66D4AA] font-mono">↑ 18%</span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="mt-2">
              <OverviewPerformanceChart selectedMetric={selectedMetric} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Creative Fatigue (Left) & Top Creatives This Week (Right) */}
      <div className="grid grid-cols-12 gap-4">
        {/* Creative Fatigue (x≈181, y≈860, w≈412, h≈200) */}
        <div className="col-span-12 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-[#F0F1F7]">Creative fatigue</h4>
            <span className="text-[11px] text-[#727681]">Frequency</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Row 1 */}
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-3.5 h-3.5 text-[#ACD9F3] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-[#F0F1F7] truncate font-medium">Dog Caps · Retargeting</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                </div>
                <span className="text-[#A0A1AA] font-mono text-xs w-7 text-right">4.2x</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-3.5 h-3.5 text-[#ACD9F3] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.896 2.896 0 0 1 2.305-4.637c.367 0 .717.07 1.04.196V9.435a6.38 6.38 0 0 0-1.04-.085 6.341 6.341 0 0 0-6.34 6.34 6.341 6.341 0 0 0 6.34 6.34 6.341 6.341 0 0 0 6.34-6.34V8.583a8.167 8.167 0 0 0 4.887 1.602V6.74a4.84 4.84 0 0 1-1.116-.054z" />
                </svg>
                <span className="text-[#F0F1F7] truncate font-medium">Walk Season · Prospecting</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#252831]" />
                </div>
                <span className="text-[#A0A1AA] font-mono text-xs w-7 text-right">3.6x</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-3.5 h-3.5 text-[#ACD9F3] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-[#F0F1F7] truncate font-medium">Cap 3-Pack · Lookalike</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C36A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#252831]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#252831]" />
                </div>
                <span className="text-[#A0A1AA] font-mono text-xs w-7 text-right">3.1x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Creatives This Week (x≈610, y≈860, w≈915, h≈200) */}
        <div className="col-span-12 lg:col-span-8 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-[#F0F1F7]">Top creatives this week</h4>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#727681]">Ranked by CTR</span>
              <button
                onClick={() => setCurrentView('studio')}
                className="text-[#ACD9F3] hover:underline font-medium cursor-pointer"
              >
                View all
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* UGC-042 */}
            <div 
              onClick={() => setCurrentView('studio')}
              className="bg-[#1A1D24] border border-[#252831] hover:border-[#343842] rounded-2xl p-2.5 flex items-center gap-3 cursor-pointer group transition-all"
            >
              <img
                src={DOG_IMAGES.corgiOutdoors}
                alt="UGC-042"
                className="w-12 h-14 rounded-xl object-cover shrink-0 border border-[#343842]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#F0F1F7]">
                  <span className="text-[#ACD9F3]">♪</span>
                  <span className="truncate">UGC-042</span>
                </div>
                <div className="text-[10px] text-[#727681]">Video · 9:16</div>
                <div className="text-xs font-bold text-[#F0F1F7] font-mono mt-1">4.8%</div>
                <div className="text-[10px] text-[#66D4AA] font-mono">↑ 0.9 pts</div>
              </div>
            </div>

            {/* UGC-038 */}
            <div 
              onClick={() => setCurrentView('studio')}
              className="bg-[#1A1D24] border border-[#252831] hover:border-[#343842] rounded-2xl p-2.5 flex items-center gap-3 cursor-pointer group transition-all"
            >
              <img
                src={DOG_IMAGES.pinkCap}
                alt="UGC-038"
                className="w-12 h-14 rounded-xl object-cover shrink-0 border border-[#343842]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#F0F1F7]">
                  <span className="text-[#ACD9F3]">∞</span>
                  <span className="truncate">UGC-038</span>
                </div>
                <div className="text-[10px] text-[#727681]">Video · 9:16</div>
                <div className="text-xs font-bold text-[#F0F1F7] font-mono mt-1">4.1%</div>
                <div className="text-[10px] text-[#66D4AA] font-mono">↑ 0.5 pts</div>
              </div>
            </div>

            {/* STA-017 */}
            <div 
              onClick={() => setCurrentView('studio')}
              className="bg-[#1A1D24] border border-[#252831] hover:border-[#343842] rounded-2xl p-2.5 flex items-center gap-3 cursor-pointer group transition-all"
            >
              <img
                src={DOG_IMAGES.pinkCap}
                alt="STA-017"
                className="w-12 h-14 rounded-xl object-cover shrink-0 border border-[#343842]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#F0F1F7]">
                  <span className="text-[#ACD9F3]">∞</span>
                  <span className="truncate">STA-017</span>
                </div>
                <div className="text-[10px] text-[#727681]">Image · 1:1</div>
                <div className="text-xs font-bold text-[#F0F1F7] font-mono mt-1">3.2%</div>
                <div className="text-[10px] text-[#66D4AA] font-mono">↑ 0.2 pts</div>
              </div>
            </div>

            {/* UGC-029 */}
            <div 
              onClick={() => setCurrentView('studio')}
              className="bg-[#1A1D24] border border-[#252831] hover:border-[#343842] rounded-2xl p-2.5 flex items-center gap-3 cursor-pointer group transition-all"
            >
              <img
                src={DOG_IMAGES.mintCap}
                alt="UGC-029"
                className="w-12 h-14 rounded-xl object-cover shrink-0 border border-[#343842]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#F0F1F7]">
                  <span className="text-[#ACD9F3]">♪</span>
                  <span className="truncate">UGC-029</span>
                </div>
                <div className="text-[10px] text-[#727681]">Video · 4:5</div>
                <div className="text-xs font-bold text-[#F0F1F7] font-mono mt-1">2.9%</div>
                <div className="text-[10px] text-[#F18E87] font-mono">↓ 0.3 pts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
