import React, { useState } from 'react';
import { 
  Check, 
  Calendar, 
  ChevronDown, 
  Sparkles, 
  Image as ImageIcon, 
  Megaphone, 
  Play, 
  Video, 
  Palette, 
  MousePointer, 
  Loader2,
  FlaskConical,
  TrendingUp,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PERFORMANCE_ELEMENTS } from '../../constants/mockData';
import { Sparkline } from '../common/Sparkline';

export const PerformanceView: React.FC = () => {
  const {
    performanceTab,
    setPerformanceTab,
    remixRecord,
    setIsRemixModalOpen,
    setIsRemixQueueOpen
  } = useApp();

  const [campaignFilter, setCampaignFilter] = useState('All campaigns');
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // Sparkline mock trends
  const spendTrend = [32, 35, 34, 40, 42, 45, 48.2];
  const revTrend = [110, 115, 128, 140, 155, 162, 173.5];
  const roasTrend = [2.2, 2.5, 2.7, 3.0, 3.2, 3.4, 3.6];
  const cpaTrend = [24, 22, 21.5, 20, 19.2, 18.8, 18.4];
  const ctrTrend = [2.1, 2.3, 2.4, 2.5, 2.6, 2.75, 2.84];

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'Visual':
        return <ImageIcon className="w-3.5 h-3.5 text-[#ACD9F3]" />;
      case 'Hook':
        return <Megaphone className="w-3.5 h-3.5 text-[#ACD9F3]" />;
      case 'Opening':
        return <Play className="w-3.5 h-3.5 text-[#ACD9F3]" />;
      case 'Format':
        return <Video className="w-3.5 h-3.5 text-[#ACD9F3]" />;
      case 'Colour':
        return <Palette className="w-3.5 h-3.5 text-[#ACD9F3]" />;
      case 'Call to action':
        return <MousePointer className="w-3.5 h-3.5 text-[#ACD9F3]" />;
      default:
        return <ImageIcon className="w-3.5 h-3.5 text-[#ACD9F3]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Subheader Tabs & Dropdown Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#252831]/40 shrink-0">
        {/* Left Tabs: Campaigns | Creatives | Elements */}
        <div className="flex items-center p-1 bg-[#121419] border border-[#252831] rounded-full text-xs">
          {(['Campaigns', 'Creatives', 'Elements'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPerformanceTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                performanceTab === tab
                  ? 'bg-[#252831] text-[#F0F1F7] shadow-sm'
                  : 'text-[#727681] hover:text-[#A0A1AA]'
              }`}
            >
              {performanceTab === tab && <Check className="w-3 h-3 text-[#ACD9F3]" />}
              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* Right Dropdowns: All campaigns, Last 30 days, Compare: previous 30 */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-[#A0A1AA] cursor-pointer">
            <span>{campaignFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-[#A0A1AA] cursor-pointer">
            <Calendar className="w-3 h-3 text-[#727681]" />
            <span>{dateFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-[#727681] cursor-pointer">
            <span>Compare: previous 30</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
          </div>
        </div>
      </div>

      {/* Top Wide Metric Strip with 5 Inset Cards & Sparklines (y≈221, h≈136) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 shrink-0">
        {/* Spend */}
        <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 flex flex-col justify-between">
          <div className="text-xs text-[#727681]">Spend</div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F0F1F7] font-mono">$48.2k</div>
            <div className="text-[10px] text-[#66D4AA] font-mono mt-0.5">↑ 12%</div>
          </div>
          <Sparkline data={spendTrend} width={100} height={20} color="#ACD9F3" />
        </div>

        {/* Revenue */}
        <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 flex flex-col justify-between">
          <div className="text-xs text-[#727681]">Revenue</div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F0F1F7] font-mono">$173.5k</div>
            <div className="text-[10px] text-[#66D4AA] font-mono mt-0.5">↑ 31%</div>
          </div>
          <Sparkline data={revTrend} width={100} height={20} color="#ACD9F3" />
        </div>

        {/* ROAS */}
        <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 flex flex-col justify-between">
          <div className="text-xs text-[#727681]">ROAS</div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F0F1F7] font-mono">3.6x</div>
            <div className="text-[10px] text-[#66D4AA] font-mono mt-0.5">↑ 18%</div>
          </div>
          <Sparkline data={roasTrend} width={100} height={20} color="#ACD9F3" />
        </div>

        {/* CPA */}
        <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 flex flex-col justify-between">
          <div className="text-xs text-[#727681]">CPA</div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F0F1F7] font-mono">$18.40</div>
            <div className="text-[10px] text-[#66D4AA] font-mono mt-0.5">↓ 9%</div>
          </div>
          <Sparkline data={cpaTrend} width={100} height={20} color="#ACD9F3" />
        </div>

        {/* CTR */}
        <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 flex flex-col justify-between">
          <div className="text-xs text-[#727681]">CTR</div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#F0F1F7] font-mono">2.84%</div>
            <div className="text-[10px] text-[#66D4AA] font-mono mt-0.5">↑ 0.4 pts</div>
          </div>
          <Sparkline data={ctrTrend} width={100} height={20} color="#ACD9F3" />
        </div>
      </div>

      {/* Lower Section: Attribution Table (Left) & Channel + Next Best Action (Right) */}
      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* Left Table: What is driving results (w≈931) */}
        <div className="col-span-12 lg:col-span-8 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#252831]/40 mb-3">
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-semibold text-[#F0F1F7] font-heading">
                  What is driving results
                </h3>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/20">
                  <Sparkles className="w-3 h-3 text-[#BEB0F4]" />
                  AI attribution
                </span>
              </div>
              <span className="text-xs text-[#727681]">Lift vs account average CTR</span>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-12 text-[11px] text-[#727681] px-3 py-2 font-medium">
              <div className="col-span-6">Creative element</div>
              <div className="col-span-2 text-center">Used in</div>
              <div className="col-span-2 text-right">CTR</div>
              <div className="col-span-2 text-right">Lift</div>
            </div>

            {/* Element Rows */}
            <div className="flex flex-col gap-1.5">
              {PERFORMANCE_ELEMENTS.map((el) => {
                const isSelected = selectedElementId === el.id;
                const isPositive = el.liftPct > 0;
                return (
                  <div
                    key={el.id}
                    onClick={() => setSelectedElementId(isSelected ? null : el.id)}
                    className={`grid grid-cols-12 items-center p-3 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A1D24] border border-[#343842]'
                        : 'hover:bg-[#1A1D24]/60 border border-transparent'
                    }`}
                  >
                    {/* Element Name & Type */}
                    <div className="col-span-6 flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-xl bg-[#1A1D24] border border-[#252831] flex items-center justify-center shrink-0">
                        {getElementIcon(el.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#F0F1F7] truncate">{el.name}</div>
                        <div className="text-[10px] text-[#727681]">{el.type}</div>
                      </div>
                    </div>

                    {/* Used in */}
                    <div className="col-span-2 text-center text-xs text-[#A0A1AA] font-mono">
                      {el.usedIn}
                    </div>

                    {/* CTR */}
                    <div className="col-span-2 text-right text-xs font-semibold text-[#F0F1F7] font-mono">
                      {el.ctr}
                    </div>

                    {/* Lift Bar & Percent */}
                    <div className="col-span-2 flex items-center justify-end gap-2.5">
                      <div className="w-12 h-1.5 bg-[#1A1D24] rounded-full overflow-hidden flex justify-end">
                        <div
                          className={`h-full rounded-full ${isPositive ? 'bg-[#66D4AA]' : 'bg-[#F18E87]'}`}
                          style={{ width: `${Math.min(Math.abs(el.liftPct) * 2.5, 100)}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold font-mono w-10 text-right ${
                          isPositive ? 'text-[#66D4AA]' : 'text-[#F18E87]'
                        }`}
                      >
                        {isPositive ? `+${el.liftPct}%` : `${el.liftPct}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: By Channel & Next Best Action (w≈395) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* By Channel Panel */}
          <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5">
            <h4 className="text-sm font-semibold text-[#F0F1F7] mb-3">By channel</h4>
            
            <div className="flex flex-col gap-3">
              {/* Meta */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ACD9F3] text-sm">∞</span>
                    <span className="text-[#F0F1F7] font-medium">Meta</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#A0A1AA]">$27.9k</span>
                    <span className="text-[#F0F1F7] font-semibold">3.9x</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-[#1A1D24] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ACD9F3] rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              {/* TikTok */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ACD9F3] text-sm">♪</span>
                    <span className="text-[#F0F1F7] font-medium">TikTok</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#A0A1AA]">$16.1k</span>
                    <span className="text-[#F0F1F7] font-semibold">3.4x</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-[#1A1D24] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ACD9F3] rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              {/* Google */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ACD9F3] font-bold text-xs">G</span>
                    <span className="text-[#F0F1F7] font-medium">Google</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#A0A1AA]">$4.2k</span>
                    <span className="text-[#F0F1F7] font-semibold">2.6x</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-[#1A1D24] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ACD9F3] rounded-full" style={{ width: '22%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Next Best Action Card (Outlined, purple badge) */}
          <div className="bg-[#121419] border border-[#BEB0F4]/30 rounded-3xl p-5 flex-1 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/20 mb-3">
                <Sparkles className="w-3 h-3 text-[#BEB0F4]" />
                Next best action
              </span>

              <h4 className="text-base font-semibold text-[#F0F1F7] font-heading leading-snug">
                Put more dogs outdoors, fewer packshots
              </h4>
              <p className="text-xs text-[#A0A1AA] mt-2 leading-relaxed">
                Lifestyle visuals with the first hook carry most of this month's lift. 19 live ads still use white-background shots.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 mt-6">
              {remixRecord ? (
                <button
                  onClick={() => setIsRemixQueueOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#292638] hover:bg-[#352f4c] text-[#BEB0F4] border border-[#BEB0F4]/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Remixing 19 ads</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsRemixModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#292638] hover:bg-[#352f4c] text-[#BEB0F4] border border-[#BEB0F4]/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Remix 19 ads</span>
                </button>
              )}

              <button
                onClick={() => alert('Test experiment mode activated: 50/50 split ready across Meta & TikTok.')}
                className="py-2.5 px-4 rounded-xl bg-[#1A1D24] hover:bg-[#252831] text-[#F0F1F7] text-xs font-medium border border-[#343842] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5 text-[#A0A1AA]" />
                <span>Test it</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
