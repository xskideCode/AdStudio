import React, { useState, useMemo } from 'react';
import {
  Settings as SettingsIcon,
  ArrowRight,
  Search,
  Megaphone,
  Layers,
  Share2,
  Play,
  Pause,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';
import { CAMPAIGNS_DATA, CampaignRecord } from '../../constants/mockData';

const MiniSparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 110;
  const h = 34;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 4 - ((v - min) / range) * (h - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9 overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  );
};

export const OtherViews: React.FC = () => {
  const { currentView, setCurrentView, setPerformanceTab, startNewCampaignFlow } = useApp();

  // Local state for interactive Campaigns workspace
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(CAMPAIGNS_DATA);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [channelFilter, setChannelFilter] = useState<'All' | 'Meta' | 'TikTok' | 'Google'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'spend' | 'impressions' | 'linkClicks' | 'roas'>('spend');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const toggleCampaignStatus = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus: CampaignRecord['status'] =
          c.status === 'Paused' ? 'Active Live' : 'Paused';
        setStatusNotice(`${c.name} updated to ${nextStatus}`);
        setTimeout(() => setStatusNotice(null), 3000);
        return { ...c, status: nextStatus };
      })
    );
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns
      .filter((c) => (statusFilter === 'All' ? true : c.status === statusFilter))
      .filter((c) =>
        channelFilter === 'All'
          ? true
          : c.channel === channelFilter ||
            (channelFilter === 'Meta' && c.channel === 'Multi-channel')
      )
      .filter((c) =>
        searchQuery.trim() === ''
          ? true
          : c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.audience.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.objective.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [campaigns, statusFilter, channelFilter, searchQuery, sortBy]);

  if (currentView === 'campaigns') {
    const maxImpressions = Math.max(...campaigns.map((c) => c.impressions), 1);
    const maxClicks = Math.max(...campaigns.map((c) => c.linkClicks), 1);
    const maxSpend = Math.max(...campaigns.map((c) => c.spend), 1);
    const maxCtr = Math.max(...campaigns.map((c) => c.ctr), 1);

    const getStatusBadgeStyle = (status: CampaignRecord['status']) => {
      switch (status) {
        case 'Studio Ready':
          return 'bg-[#ACD9F3]/15 text-[#ACD9F3] border-[#ACD9F3]/30';
        case 'Active Live':
          return 'bg-[#66D4AA]/15 text-[#66D4AA] border-[#66D4AA]/30';
        case 'Scaling':
          return 'bg-[#BEB0F4]/15 text-[#BEB0F4] border-[#BEB0F4]/30';
        case 'Fatigue Watch':
          return 'bg-[#F4C36A]/15 text-[#F4C36A] border-[#F4C36A]/30';
        case 'Paused':
          return 'bg-[#252831] text-[#A0A1AA] border-[#343842]';
      }
    };

    return (
      <div className="flex-1 p-4 md:p-6 xl:p-8 pb-24 md:pb-6 xl:pb-8 flex flex-col gap-5 overflow-y-auto animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#252831]/60">
          <div>
            <h2 className="text-xl font-bold text-[#F0F1F7] font-heading">Campaigns</h2>
            <p className="text-xs text-[#727681] mt-0.5">
              Manage live multi-channel delivery, budgets, and creative sets for Mochi & Bean
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {statusNotice && (
              <span className="px-3 py-1.5 rounded-full bg-[#66D4AA]/15 border border-[#66D4AA]/30 text-[#66D4AA] text-xs font-medium">
                {statusNotice}
              </span>
            )}

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#727681] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns or audience..."
                className="pl-8 pr-3 py-1.5 bg-[#121419] border border-[#252831] rounded-full text-xs text-[#F0F1F7] placeholder-[#727681] focus:outline-none focus:border-[#ACD9F3] w-48 sm:w-60"
              />
            </div>

            <button
              onClick={() => {
                setPerformanceTab('Campaigns');
                setCurrentView('performance');
              }}
              className="px-3.5 py-2 bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] text-[#F0F1F7] font-medium text-xs rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#BEB0F4]" />
              Campaign analytics
            </button>

            <button
              onClick={startNewCampaignFlow}
              className="px-4 py-2 bg-[#ACD9F3] text-[#08090B] font-semibold text-xs rounded-full hover:bg-[#bde3f7] transition-colors cursor-pointer"
            >
              + New campaign
            </button>
          </div>
        </div>

        {/* 3-Card Volume Summary Strip (Inspired by Reference 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#121419] rounded-[24px] p-4 border border-[#252831]/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1A1D24] border border-[#252831] flex items-center justify-center text-[#A0A1AA] shrink-0">
                <Megaphone className="w-4 h-4 text-[#BEB0F4]" />
              </div>
              <div>
                <div className="text-xs font-medium text-[#A0A1AA]">Total Count of Ads</div>
                <div className="text-2xl font-bold text-[#F0F1F7] font-heading mt-0.5">86</div>
              </div>
            </div>
            <div className="w-28 h-10">
              <MiniSparkline
                data={[62, 64, 63, 68, 72, 71, 75, 78, 82, 86]}
                color="#BEB0F4"
              />
            </div>
          </div>

          <div className="bg-[#121419] rounded-[24px] p-4 border border-[#252831]/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1A1D24] border border-[#252831] flex items-center justify-center text-[#A0A1AA] shrink-0">
                <Layers className="w-4 h-4 text-[#ACD9F3]" />
              </div>
              <div>
                <div className="text-xs font-medium text-[#A0A1AA]">Total Count of Campaigns</div>
                <div className="text-2xl font-bold text-[#F0F1F7] font-heading mt-0.5">
                  {campaigns.length}
                </div>
              </div>
            </div>
            <div className="w-28 h-10">
              <MiniSparkline
                data={[4, 4, 5, 5, 5, 6, 5, 6, 6, campaigns.length]}
                color="#ACD9F3"
              />
            </div>
          </div>

          <div className="bg-[#121419] rounded-[24px] p-4 border border-[#252831]/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1A1D24] border border-[#252831] flex items-center justify-center text-[#A0A1AA] shrink-0">
                <Share2 className="w-4 h-4 text-[#66D4AA]" />
              </div>
              <div>
                <div className="text-xs font-medium text-[#A0A1AA]">Total Reach</div>
                <div className="text-2xl font-bold text-[#F0F1F7] font-heading mt-0.5">
                  3,581,810
                </div>
              </div>
            </div>
            <div className="w-28 h-10">
              <MiniSparkline
                data={[2.1, 2.3, 2.2, 2.6, 2.8, 3.0, 2.9, 3.3, 3.4, 3.58]}
                color="#BEB0F4"
              />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-[#121419] p-1 rounded-full border border-[#252831] overflow-x-auto max-w-full">
            {['All', 'Active Live', 'Studio Ready', 'Scaling', 'Fatigue Watch', 'Paused'].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === status
                      ? 'bg-[#252831] text-[#F0F1F7] shadow-xs'
                      : 'text-[#727681] hover:text-[#A0A1AA]'
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#727681] flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Channel:
            </span>
            {(['All', 'Meta', 'TikTok', 'Google'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  channelFilter === ch
                    ? 'bg-[#ACD9F3]/15 text-[#ACD9F3] border border-[#ACD9F3]/40'
                    : 'bg-[#121419] text-[#A0A1AA] border border-[#252831] hover:text-[#F0F1F7]'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Active Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCampaigns.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                if (c.status === 'Studio Ready') {
                  setCurrentView('studio');
                } else {
                  setPerformanceTab('Campaigns');
                  setCurrentView('performance');
                }
              }}
              className="p-5 bg-[#121419] border border-[#252831] hover:border-[#343842] rounded-[26px] cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeStyle(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#727681]">
                      {c.channel} · ${c.dailyBudget}/day
                    </span>
                    <button
                      onClick={(e) => toggleCampaignStatus(e, c.id)}
                      title={c.status === 'Paused' ? 'Resume campaign' : 'Pause campaign'}
                      className="w-6 h-6 rounded-full bg-[#1A1D24] hover:bg-[#252831] border border-[#252831] flex items-center justify-center text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
                    >
                      {c.status === 'Paused' ? (
                        <Play className="w-3 h-3 text-[#66D4AA]" />
                      ) : (
                        <Pause className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#F0F1F7] font-heading group-hover:text-[#ACD9F3] transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-[#A0A1AA] mt-1">
                  {c.audience} · {c.objective}
                </p>

                {/* Inline Mini Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-2xl bg-[#1A1D24]/70 border border-[#252831]/60">
                  <div>
                    <div className="text-[10px] text-[#727681]">Spend</div>
                    <div className="text-xs font-semibold text-[#F0F1F7] mt-0.5">
                      {c.spend > 0 ? `$${(c.spend / 1000).toFixed(1)}k` : 'Draft'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#727681]">ROAS</div>
                    <div
                      className={`text-xs font-semibold mt-0.5 ${
                        c.roas >= 3.5
                          ? 'text-[#66D4AA]'
                          : c.roas > 0
                          ? 'text-[#F0F1F7]'
                          : 'text-[#727681]'
                      }`}
                    >
                      {c.roas > 0 ? `${c.roas.toFixed(1)}x` : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#727681]">CTR</div>
                    <div className="text-xs font-semibold text-[#ACD9F3] mt-0.5">
                      {c.ctr > 0 ? `${c.ctr.toFixed(2)}%` : '—'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#252831]">
                <div className="flex items-center -space-x-1.5">
                  {c.thumbnails.map((thumb: string, idx: number) => (
                    <img
                      key={idx}
                      src={thumb}
                      alt={c.name}
                      className="w-7 h-7 rounded-lg object-cover border border-[#08090B]"
                    />
                  ))}
                </div>
                <span
                  className={`text-[11px] ml-2 ${
                    c.frequency >= 4.0 ? 'text-[#F4C36A]' : 'text-[#727681]'
                  }`}
                >
                  {c.frequency > 0
                    ? `Freq: ${c.frequency.toFixed(1)}x`
                    : `${c.creativesCount} ads ready`}
                </span>
                <span className="text-xs text-[#ACD9F3] ml-auto flex items-center gap-1 font-medium">
                  {c.status === 'Studio Ready' ? 'Open Studio' : 'Inspect'}{' '}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Analysis Table with Inline Progress Bars (Inspired by Reference 2) */}
        <div className="bg-[#121419] rounded-[28px] p-5 border border-[#252831]/80 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-[#F0F1F7] font-heading">
                Campaign Analysis
              </h3>
              <p className="text-xs text-[#727681] mt-0.5">
                Comparative delivery volume, click efficiency, and spend distribution
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#1A1D24] p-1 rounded-full border border-[#252831]">
              {(
                [
                  { id: 'spend', label: 'Sort: Spend' },
                  { id: 'impressions', label: 'Impressions' },
                  { id: 'linkClicks', label: 'Link Clicks' },
                  { id: 'roas', label: 'ROAS' },
                ] as const
              ).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                    sortBy === s.id
                      ? 'bg-[#252831] text-[#ACD9F3]'
                      : 'text-[#727681] hover:text-[#F0F1F7]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[880px]">
              <thead>
                <tr className="text-[11px] text-[#727681] border-b border-[#252831]">
                  <th className="pb-2.5 font-medium">Campaign</th>
                  <th className="pb-2.5 font-medium">Channel</th>
                  <th className="pb-2.5 font-medium">Impressions</th>
                  <th className="pb-2.5 font-medium">% Δ</th>
                  <th className="pb-2.5 font-medium">Link Clicks</th>
                  <th className="pb-2.5 font-medium">CTR (Link Clicks)</th>
                  <th className="pb-2.5 font-medium">Ads Amount</th>
                  <th className="pb-2.5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252831]/60 text-xs">
                {filteredCampaigns.map((c, idx) => {
                  const isPositive = !c.impressionsDelta.startsWith('-');
                  return (
                    <tr
                      key={c.id}
                      onClick={() => {
                        if (c.status === 'Studio Ready') {
                          setCurrentView('studio');
                        } else {
                          setPerformanceTab('Campaigns');
                          setCurrentView('performance');
                        }
                      }}
                      className="hover:bg-[#1A1D24]/60 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[#727681] w-4">{idx + 1}.</span>
                          <img
                            src={c.thumbnails[0]}
                            alt={c.name}
                            className="w-8 h-8 rounded-lg object-cover border border-[#252831] shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-[#F0F1F7]">{c.name}</div>
                            <div className="text-[11px] text-[#727681]">{c.objective}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 pr-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#1A1D24] text-[#A0A1AA] border border-[#252831]">
                          {c.channel}
                        </span>
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#F0F1F7] font-medium w-20 text-right font-mono">
                            {c.impressions.toLocaleString()}
                          </span>
                          <div className="w-20 h-2.5 bg-[#1A1D24] rounded-xs overflow-hidden">
                            <div
                              className="h-full bg-[#38BDF8] rounded-xs"
                              style={{ width: `${(c.impressions / maxImpressions) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 pr-4">
                        <span
                          className={`text-[11px] font-medium font-mono ${
                            isPositive ? 'text-[#66D4AA]' : 'text-[#F18E87]'
                          }`}
                        >
                          {c.impressionsDelta}
                        </span>
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#F0F1F7] font-medium w-16 text-right font-mono">
                            {c.linkClicks.toLocaleString()}
                          </span>
                          <div className="w-20 h-2.5 bg-[#1A1D24] rounded-xs overflow-hidden">
                            <div
                              className="h-full bg-[#ACD9F3] rounded-xs"
                              style={{ width: `${(c.linkClicks / maxClicks) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#F0F1F7] font-medium w-12 text-right font-mono">
                            {c.ctr.toFixed(2)}%
                          </span>
                          <div className="w-16 h-2.5 bg-[#1A1D24] rounded-xs overflow-hidden">
                            <div
                              className="h-full bg-[#BEB0F4] rounded-xs"
                              style={{ width: `${(c.ctr / maxCtr) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#F0F1F7] font-medium w-20 text-right font-mono">
                            ${c.spend.toLocaleString()}
                          </span>
                          <div className="w-20 h-2.5 bg-[#1A1D24] rounded-xs overflow-hidden">
                            <div
                              className="h-full bg-[#66D4AA] rounded-xs"
                              style={{ width: `${(c.spend / maxSpend) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (c.status === 'Studio Ready') {
                              setCurrentView('studio');
                            } else {
                              setPerformanceTab('Campaigns');
                              setCurrentView('performance');
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs text-[#ACD9F3] hover:underline cursor-pointer"
                        >
                          {c.status === 'Studio Ready' ? 'Studio' : 'Analyze'}
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'assets') {
    return (
      <div className="flex-1 p-4 md:p-6 xl:p-8 pb-24 md:pb-6 xl:pb-8 overflow-y-auto animate-in fade-in duration-200">
        <div className="pb-4 border-b border-[#252831]/60 mb-6">
          <h2 className="text-xl font-bold text-[#F0F1F7] font-heading">Brand Assets</h2>
          <p className="text-xs text-[#727681] mt-0.5">
            High-resolution photography, video clips and vector marks for Mochi & Bean
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {[
            { img: DOG_IMAGES.corgiOutdoors, name: 'Corgi walk sunny.jpg', type: 'Lifestyle 1:1' },
            { img: DOG_IMAGES.pinkCap, name: 'Chihuahua pink corduroy.jpg', type: 'Product Close-up' },
            { img: DOG_IMAGES.blueCapWhite, name: 'Blue cap isolated studio.jpg', type: 'Packshot' },
            { img: DOG_IMAGES.mintCap, name: 'Mint green cap dog.jpg', type: 'Editorial 9:16' },
            { img: DOG_IMAGES.blueCapDetail, name: 'Corduroy chin strap toggle.jpg', type: 'Detail Shot' },
            { img: DOG_IMAGES.capsFlatlay, name: 'Three dog caps flatlay.jpg', type: 'Catalog' },
          ].map((asset, i) => (
            <div
              key={i}
              className="bg-[#121419] border border-[#252831] hover:border-[#343842] rounded-2xl p-3 flex flex-col gap-2 transition-colors"
            >
              <img
                src={asset.img}
                alt={asset.name}
                className="w-full aspect-square rounded-xl object-cover"
              />
              <div className="text-xs font-semibold text-[#F0F1F7] truncate">{asset.name}</div>
              <div className="text-[10px] text-[#727681]">{asset.type}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'team') {
    return (
      <div className="flex-1 p-4 md:p-6 xl:p-8 pb-24 md:pb-6 xl:pb-8 overflow-y-auto animate-in fade-in duration-200">
        <div className="pb-4 border-b border-[#252831]/60 mb-6">
          <h2 className="text-xl font-bold text-[#F0F1F7] font-heading">Team & Approvals</h2>
          <p className="text-xs text-[#727681] mt-0.5">
            Brand compliance leads and creative contributors
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl">
          <div className="flex items-center justify-between p-4 bg-[#121419] border border-[#252831] rounded-2xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#ACD9F3] text-[#08090B] font-bold flex items-center justify-center font-heading shrink-0">
                NZ
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#F0F1F7] truncate">Nizam</div>
                <div className="text-xs text-[#727681] truncate">Account Owner & Growth Lead</div>
              </div>
            </div>
            <span className="text-xs text-[#ACD9F3] px-2.5 py-1 bg-[#1A1D24] rounded-full border border-[#252831] shrink-0 ml-2">
              Admin
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#121419] border border-[#252831] rounded-2xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#F4C36A] text-[#121419] font-bold flex items-center justify-center font-heading shrink-0">
                MO
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#F0F1F7] truncate">Maya Ortiz</div>
                <div className="text-xs text-[#727681] truncate">
                  Head of Brand & Creative Director (Designated Approver)
                </div>
              </div>
            </div>
            <span className="text-xs text-[#66D4AA] px-2.5 py-1 bg-[#66D4AA]/10 rounded-full border border-[#66D4AA]/30 shrink-0 ml-2">
              Brand Approver
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 xl:p-8 pb-24 md:pb-6 xl:pb-8 overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-xl mx-auto py-12 text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-[#1A1D24] border border-[#343842] flex items-center justify-center text-[#ACD9F3] mb-4">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#F0F1F7] font-heading capitalize">
          {currentView.replace('_', ' ')}
        </h2>
        <p className="text-xs text-[#A0A1AA] mt-2 mb-6">
          Configured for Mochi & Bean dog-cap brand with Brand Brain integration and active Meta &
          TikTok ad channels.
        </p>
        <button
          onClick={() => setCurrentView('overview')}
          className="px-5 py-2 rounded-full bg-[#ACD9F3] text-[#08090B] font-semibold text-xs hover:bg-[#bde3f7] cursor-pointer"
        >
          Return to Overview
        </button>
      </div>
    </div>
  );
};
