import React, { useState, useMemo } from 'react';
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
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  TrendingUp,
  Layers,
  Globe,
  Smartphone,
  Target,
  DollarSign,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  PERFORMANCE_ELEMENTS, 
  CREATIVE_PERFORMANCE_DATA, 
  CAMPAIGNS_DATA,
  DEVICE_BREAKDOWN,
  PLACEMENT_BREAKDOWN,
  REGIONAL_BREAKDOWN
} from '../../constants/mockData';
import { Sparkline } from '../common/Sparkline';

export const PerformanceView: React.FC = () => {
  const {
    performanceTab,
    setPerformanceTab,
    selectedPerformanceCreativeId,
    setSelectedPerformanceCreativeId,
    remixRecord,
    setIsRemixModalOpen,
    setIsRemixQueueOpen,
    setCurrentView,
    setSelectedConceptId
  } = useApp();

  // Top bar filters
  const [campaignFilter, setCampaignFilter] = useState('All campaigns');
  const [isCampaignMenuOpen, setIsCampaignMenuOpen] = useState(false);
  const [isCreativeMenuOpen, setIsCreativeMenuOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [compareEnabled, setCompareEnabled] = useState(true);

  // Elements Tab state
  const [selectedElementId, setSelectedElementId] = useState<string | null>('el-1');
  const [testModeActivated, setTestModeActivated] = useState(false);

  // Creatives Tab state (inspired by image_b132bad0.png)
  const [creativeSubTab, setCreativeSubTab] = useState<'Creatives' | 'Audience' | 'State'>('Creatives');
  const [creativeSearch, setCreativeSearch] = useState('');
  const [publisherFilter, setPublisherFilter] = useState<'All' | 'Meta' | 'TikTok' | 'Google'>('All');
  const [creativeSortBy, setCreativeSortBy] = useState<'linkClicks' | 'impressions' | 'spend' | 'ctr' | 'roas'>('linkClicks');
  const [trendMetric, setTrendMetric] = useState<'Clicks' | 'Conversions' | 'ROAS' | 'Thumbstop'>('Clicks');

  // Campaigns Tab state (inspired by image_1b59fc52.png)
  const [activeTrendSeries, setActiveTrendSeries] = useState<{
    clicks: boolean;
    impressions: boolean;
    spend: boolean;
  }>({ clicks: true, impressions: true, spend: true });
  const [deviceMetric, setDeviceMetric] = useState<'Orders' | 'Clicks' | 'Impressions'>('Orders');
  const [campaignSortField, setCampaignSortField] = useState<'impressions' | 'linkClicks' | 'ctr' | 'spend' | 'roas'>('impressions');

  // Multiplier based on date filter so dropdowns feel alive
  const dateMultiplier = dateFilter === 'Last 7 days' ? 0.28 : dateFilter === 'Last 90 days' ? 2.65 : 1;

  // Sparkline trends
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

  // Filtered & sorted creatives
  const filteredCreatives = useMemo(() => {
    return CREATIVE_PERFORMANCE_DATA.filter((item) => {
      const matchesCampaign =
        campaignFilter === 'All campaigns' || item.campaign.includes(campaignFilter.split(' · ')[0]);
      const matchesPublisher = publisherFilter === 'All' || item.publisher === publisherFilter;
      const matchesSearch =
        !creativeSearch.trim() ||
        item.name.toLowerCase().includes(creativeSearch.toLowerCase()) ||
        item.hook.toLowerCase().includes(creativeSearch.toLowerCase()) ||
        item.code.toLowerCase().includes(creativeSearch.toLowerCase());
      return matchesCampaign && matchesPublisher && matchesSearch;
    }).sort((a, b) => b[creativeSortBy] - a[creativeSortBy]);
  }, [campaignFilter, publisherFilter, creativeSearch, creativeSortBy]);

  // Filtered & sorted campaigns
  const filteredCampaigns = useMemo(() => {
    return CAMPAIGNS_DATA.filter((c) => {
      if (campaignFilter === 'All campaigns') return true;
      return c.name === campaignFilter;
    }).sort((a, b) => b[campaignSortField] - a[campaignSortField]);
  }, [campaignFilter, campaignSortField]);

  // Max values for inline table progress bars
  const maxCreativeImpressions = Math.max(...CREATIVE_PERFORMANCE_DATA.map((c) => c.impressions), 1);
  const maxCreativeClicks = Math.max(...CREATIVE_PERFORMANCE_DATA.map((c) => c.linkClicks), 1);
  const maxCreativeSpend = Math.max(...CREATIVE_PERFORMANCE_DATA.map((c) => c.spend), 1);

  const maxCampaignImpressions = Math.max(...CAMPAIGNS_DATA.map((c) => c.impressions), 1);
  const maxCampaignClicks = Math.max(...CAMPAIGNS_DATA.map((c) => c.linkClicks), 1);

  // Selected Element object for Elements tab detail
  const activeElement = PERFORMANCE_ELEMENTS.find((e) => e.id === selectedElementId) || PERFORMANCE_ELEMENTS[0];

  // Selected single creative for Creatives tab Spotlight & in-place dashboard filtering
  const selectedCreative = useMemo(() => {
    if (!selectedPerformanceCreativeId) return null;
    return (
      CREATIVE_PERFORMANCE_DATA.find(
        (c) => c.id === selectedPerformanceCreativeId || c.code === selectedPerformanceCreativeId
      ) || null
    );
  }, [selectedPerformanceCreativeId]);

  // Dynamic metrics for the Creatives tab (either single creative or all creatives aggregate)
  const activeCreativeMetrics = useMemo(() => {
    if (selectedCreative) {
      const imp = Math.round(selectedCreative.impressions * dateMultiplier);
      const spend = Math.round(selectedCreative.spend * dateMultiplier);
      const clicks = Math.round(selectedCreative.linkClicks * dateMultiplier);
      const thumbstops = Math.round(selectedCreative.thumbstops * dateMultiplier);
      const pageViews = Math.round(selectedCreative.pageViews * dateMultiplier);
      const atc = Math.round(selectedCreative.addToCarts * dateMultiplier);
      const orders = Math.round(selectedCreative.conversions * dateMultiplier);
      const cpm = selectedCreative.cpm;
      const cpc = selectedCreative.cpc;
      const costPerAtc = +(spend / Math.max(atc, 1)).toFixed(2);
      const cpa = selectedCreative.cpa;
      const ctr = selectedCreative.ctr;
      const lpConv = +((atc / Math.max(pageViews, 1)) * 100).toFixed(2);
      const cartToOrder = +((orders / Math.max(atc, 1)) * 100).toFixed(2);

      return {
        spendFormatted: `$${(spend / 1000).toFixed(1)}K`,
        spendDelta: selectedCreative.status === 'Scaling' ? '↑ 24%' : selectedCreative.status === 'Active' ? '↑ 11%' : '↓ 6%',
        cpmFormatted: `$${cpm.toFixed(2)}`,
        cpmDelta: cpm < 14.5 ? '↓ 6%' : '↑ 5%',
        impressionsFormatted: imp >= 1000000 ? `${(imp / 1000000).toFixed(2)}M` : `${(imp / 1000).toFixed(1)}K`,
        impressionsDelta: selectedCreative.status === 'Scaling' ? '↑ 38%' : '↑ 14%',
        clicksFormatted: `${(clicks / 1000).toFixed(1)}K`,
        clicksDelta: selectedCreative.ctr >= 3.5 ? '↑ 42%' : '↑ 12%',
        atcFormatted: atc.toLocaleString(),
        atcDelta: selectedCreative.roas >= 3.8 ? '↑ 46%' : '↑ 15%',
        ordersFormatted: orders.toLocaleString(),
        ordersDelta: selectedCreative.roas >= 3.8 ? '↑ 34%' : '↑ 9%',
        cpcFormatted: `$${cpc.toFixed(2)}`,
        cpcDelta: cpc <= 0.4 ? '↓ 18%' : '↑ 4%',
        costPerAtcFormatted: `$${costPerAtc.toFixed(2)}`,
        costPerAtcDelta: costPerAtc < 3.0 ? '↓ 14%' : '↑ 3%',
        cpaFormatted: `$${cpa.toFixed(2)}`,
        cpaDelta: cpa < 13 ? '↓ 16%' : '↑ 7%',
        ctrFormatted: `${ctr.toFixed(2)}%`,
        ctrDelta: ctr >= 3.5 ? '↑ 24%' : '↓ 5%',
        lpConvFormatted: `${lpConv.toFixed(2)}%`,
        lpConvDelta: '↑ 14%',
        cartToOrderFormatted: `${cartToOrder.toFixed(2)}%`,
        cartToOrderDelta: '↑ 11%',
        funnelStages: [
          { label: 'Thumbstops', val: `${(thumbstops / 1000).toFixed(1)}K`, drop: `${selectedCreative.thumbstopRate}% hook` },
          { label: 'Link Clicks', val: `${(clicks / 1000).toFixed(1)}K`, drop: `↓ ${Math.round(100 - (clicks / Math.max(thumbstops, 1)) * 100)}%` },
          { label: 'Page Views', val: `${(pageViews / 1000).toFixed(1)}K`, drop: `↓ ${Math.round(100 - (pageViews / Math.max(clicks, 1)) * 100)}%` },
          { label: 'Add to Cart', val: `${(atc / 1000).toFixed(2)}K`, drop: `↓ ${Math.round(100 - (atc / Math.max(pageViews, 1)) * 100)}%` },
          { label: 'Orders', val: orders.toLocaleString(), drop: `${cartToOrder.toFixed(1)}% conv` },
        ],
      };
    }

    // Aggregate across all creatives
    const spend = 48200 * dateMultiplier;
    const imp = 3390000 * dateMultiplier;
    const clicks = 125100 * dateMultiplier;
    const atc = Math.round(16392 * dateMultiplier);
    const orders = Math.round(4190 * dateMultiplier);
    return {
      spendFormatted: `$${(spend / 1000).toFixed(1)}K`,
      spendDelta: '↑ 12%',
      cpmFormatted: '$14.22',
      cpmDelta: '↓ 4%',
      impressionsFormatted: `${(imp / 1000000).toFixed(2)}M`,
      impressionsDelta: '↑ 28%',
      clicksFormatted: `${(clicks / 1000).toFixed(1)}K`,
      clicksDelta: '↑ 34%',
      atcFormatted: atc.toLocaleString(),
      atcDelta: '↑ 41%',
      ordersFormatted: orders.toLocaleString(),
      ordersDelta: '↑ 29%',
      cpcFormatted: '$0.39',
      cpcDelta: '↓ 14%',
      costPerAtcFormatted: '$2.94',
      costPerAtcDelta: '↓ 11%',
      cpaFormatted: '$18.40',
      cpaDelta: '↓ 9%',
      ctrFormatted: '3.69%',
      ctrDelta: '↑ 18%',
      lpConvFormatted: '5.90%',
      lpConvDelta: '↑ 18%',
      cartToOrderFormatted: '25.56%',
      cartToOrderDelta: '↑ 14%',
      funnelStages: [
        { label: 'Thumbstops', val: `${((724.5 * dateMultiplier)).toFixed(1)}K`, drop: '↑ 38% hook' },
        { label: 'Link Clicks', val: `${((290.2 * dateMultiplier)).toFixed(1)}K`, drop: '↓ 60%' },
        { label: 'Page Views', val: `${((231.8 * dateMultiplier)).toFixed(1)}K`, drop: '↓ 20%' },
        { label: 'Add to Cart', val: `${((17.3 * dateMultiplier)).toFixed(1)}K`, drop: '↓ 93%' },
        { label: 'Orders', val: `${((4.19 * dateMultiplier)).toFixed(2)}K`, drop: '24.2% conv' },
      ],
    };
  }, [selectedCreative, dateMultiplier]);

  return (
    <div className="flex-1 flex flex-col gap-4 xl:gap-5 p-4 md:p-6 xl:p-8 pb-24 md:pb-6 xl:pb-8 overflow-y-auto animate-in fade-in duration-200">
      {/* Subheader Tabs & Dropdown Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#252831]/40 shrink-0">
        {/* Left Tabs: Campaigns | Creatives | Elements */}
        <div className="flex items-center p-1 bg-[#121419] border border-[#252831] rounded-full text-xs">
          {(['Campaigns', 'Creatives', 'Elements'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPerformanceTab(tab)}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
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

        {/* Right Dropdowns: Creative Selector (when on Creatives), All campaigns, Last 30 days, Compare */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Single-Creative Selector Dropdown (visible in Creatives tab) */}
          {performanceTab === 'Creatives' && (
            <div className="relative flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsCreativeMenuOpen(!isCreativeMenuOpen);
                  setIsCampaignMenuOpen(false);
                  setIsDateMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full transition-colors cursor-pointer ${
                  selectedCreative
                    ? 'bg-[#ACD9F3]/15 border-[#ACD9F3] text-[#ACD9F3] font-semibold'
                    : 'bg-[#121419] hover:bg-[#1A1D24] border-[#252831] text-[#A0A1AA] hover:text-[#F0F1F7]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{selectedCreative ? selectedCreative.name : 'All creatives (7)'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-75" />
              </button>

              {selectedCreative && (
                <button
                  onClick={() => setSelectedPerformanceCreativeId(null)}
                  title="Reset to all creatives"
                  className="px-2.5 py-1.5 rounded-full bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] text-[#A0A1AA] hover:text-[#F0F1F7] text-[11px] font-medium transition-colors cursor-pointer"
                >
                  × All
                </button>
              )}

              {isCreativeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#121419] border border-[#343842] rounded-2xl shadow-2xl py-1.5 z-40">
                  <button
                    onClick={() => {
                      setSelectedPerformanceCreativeId(null);
                      setIsCreativeMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#1A1D24] cursor-pointer ${
                      !selectedCreative ? 'text-[#ACD9F3] font-semibold' : 'text-[#A0A1AA]'
                    }`}
                  >
                    <span>All creatives (Aggregate)</span>
                    {!selectedCreative && <Check className="w-3.5 h-3.5 text-[#ACD9F3]" />}
                  </button>
                  <div className="my-1 border-t border-[#252831]" />
                  {CREATIVE_PERFORMANCE_DATA.map((cr) => (
                    <button
                      key={cr.id}
                      onClick={() => {
                        setSelectedPerformanceCreativeId(cr.id);
                        setIsCreativeMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between gap-2 hover:bg-[#1A1D24] cursor-pointer ${
                        selectedCreative?.id === cr.id ? 'text-[#ACD9F3] font-semibold bg-[#1A1D24]/60' : 'text-[#A0A1AA]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={cr.image} alt={cr.code} className="w-6 h-6 rounded-md object-cover shrink-0 border border-[#343842]" />
                        <div className="min-w-0">
                          <div className="truncate text-[#F0F1F7] text-xs">{cr.name}</div>
                          <div className="text-[10px] text-[#727681] font-mono">{cr.ctr.toFixed(2)}% CTR · {cr.roas}x ROAS</div>
                        </div>
                      </div>
                      {selectedCreative?.id === cr.id && <Check className="w-3.5 h-3.5 text-[#ACD9F3] shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Campaign Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCampaignMenuOpen(!isCampaignMenuOpen);
                setIsDateMenuOpen(false);
                setIsCreativeMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
            >
              <span>{campaignFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
            </button>

            {isCampaignMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-[#121419] border border-[#343842] rounded-2xl shadow-2xl py-1.5 z-40">
                {['All campaigns', ...CAMPAIGNS_DATA.map((c) => c.name)].map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      setCampaignFilter(name);
                      setIsCampaignMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#1A1D24] cursor-pointer ${
                      campaignFilter === name ? 'text-[#ACD9F3] font-medium' : 'text-[#A0A1AA]'
                    }`}
                  >
                    <span className="truncate">{name}</span>
                    {campaignFilter === name && <Check className="w-3.5 h-3.5 text-[#ACD9F3] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsDateMenuOpen(!isDateMenuOpen);
                setIsCampaignMenuOpen(false);
                setIsCreativeMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-[#727681]" />
              <span>{dateFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
            </button>

            {isDateMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#121419] border border-[#343842] rounded-2xl shadow-2xl py-1.5 z-40">
                {['Last 7 days', 'Last 30 days', 'Last 90 days'].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateFilter(range);
                      setIsDateMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#1A1D24] cursor-pointer ${
                      dateFilter === range ? 'text-[#ACD9F3] font-medium' : 'text-[#A0A1AA]'
                    }`}
                  >
                    <span>{range}</span>
                    {dateFilter === range && <Check className="w-3.5 h-3.5 text-[#ACD9F3]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compare Toggle */}
          <button
            onClick={() => setCompareEnabled(!compareEnabled)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 border rounded-full transition-colors cursor-pointer ${
              compareEnabled
                ? 'bg-[#121419] border-[#343842] text-[#A0A1AA]'
                : 'bg-[#121419] border-[#252831] text-[#727681]'
            }`}
          >
            <span>Compare: previous 30</span>
            <div className={`w-2 h-2 rounded-full ${compareEnabled ? 'bg-[#66D4AA]' : 'bg-[#727681]'}`} />
          </button>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: ELEMENTS (Reference 09 & 11 + Interactive Element Breakdown)
         ===================================================================== */}
      {performanceTab === 'Elements' && (
        <>
          {/* Top Wide Metric Strip with 5 Inset Cards & Sparklines */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 xl:gap-4 shrink-0">
            {/* Spend */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between">
              <div className="text-xs text-[#727681]">Spend</div>
              <div className="my-2">
                <div className="text-2xl xl:text-3xl font-bold text-[#F0F1F7] font-mono tabular-nums">
                  ${(48.2 * dateMultiplier).toFixed(1)}k
                </div>
                {compareEnabled && <div className="text-[10px] xl:text-xs text-[#66D4AA] font-mono mt-0.5">↑ 12%</div>}
              </div>
              <Sparkline data={spendTrend} color="#ACD9F3" />
            </div>

            {/* Revenue */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between">
              <div className="text-xs text-[#727681]">Revenue</div>
              <div className="my-2">
                <div className="text-2xl xl:text-3xl font-bold text-[#F0F1F7] font-mono tabular-nums">
                  ${(173.5 * dateMultiplier).toFixed(1)}k
                </div>
                {compareEnabled && <div className="text-[10px] xl:text-xs text-[#66D4AA] font-mono mt-0.5">↑ 31%</div>}
              </div>
              <Sparkline data={revTrend} color="#ACD9F3" />
            </div>

            {/* ROAS */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between">
              <div className="text-xs text-[#727681]">ROAS</div>
              <div className="my-2">
                <div className="text-2xl xl:text-3xl font-bold text-[#F0F1F7] font-mono tabular-nums">3.6x</div>
                {compareEnabled && <div className="text-[10px] xl:text-xs text-[#66D4AA] font-mono mt-0.5">↑ 18%</div>}
              </div>
              <Sparkline data={roasTrend} color="#ACD9F3" />
            </div>

            {/* CPA */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between">
              <div className="text-xs text-[#727681]">CPA</div>
              <div className="my-2">
                <div className="text-2xl xl:text-3xl font-bold text-[#F0F1F7] font-mono tabular-nums">$18.40</div>
                {compareEnabled && <div className="text-[10px] xl:text-xs text-[#66D4AA] font-mono mt-0.5">↓ 9%</div>}
              </div>
              <Sparkline data={cpaTrend} color="#ACD9F3" />
            </div>

            {/* CTR */}
            <div className="col-span-2 sm:col-span-1 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between">
              <div className="text-xs text-[#727681]">CTR</div>
              <div className="my-2">
                <div className="text-2xl xl:text-3xl font-bold text-[#F0F1F7] font-mono tabular-nums">2.84%</div>
                {compareEnabled && <div className="text-[10px] xl:text-xs text-[#66D4AA] font-mono mt-0.5">↑ 0.4 pts</div>}
              </div>
              <Sparkline data={ctrTrend} color="#ACD9F3" />
            </div>
          </div>

          {/* Lower Section: Attribution Table (Left) & Channel + Next Best Action (Right) */}
          <div className="grid grid-cols-12 gap-4 xl:gap-5 flex-1">
            {/* Left Table: What is driving results */}
            <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 sm:p-5 xl:p-6 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#252831]/40 mb-3">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base xl:text-lg font-semibold text-[#F0F1F7] font-heading">
                      What is driving results
                    </h3>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/20">
                      <Sparkles className="w-3 h-3 text-[#BEB0F4]" />
                      AI attribution
                    </span>
                  </div>
                  <span className="text-xs text-[#727681]">Lift vs account average CTR · Click any element to inspect</span>
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-12 text-[11px] text-[#727681] px-2 sm:px-3 py-2 font-medium">
                  <div className="col-span-7 sm:col-span-6">Creative element</div>
                  <div className="hidden sm:block sm:col-span-2 text-center">Used in</div>
                  <div className="col-span-2 text-right">CTR</div>
                  <div className="col-span-3 sm:col-span-2 text-right">Lift</div>
                </div>

                {/* Element Rows */}
                <div className="flex flex-col gap-1.5">
                  {PERFORMANCE_ELEMENTS.map((el) => {
                    const isSelected = selectedElementId === el.id;
                    const isPositive = el.liftPct > 0;
                    return (
                      <div
                        key={el.id}
                        onClick={() => setSelectedElementId(el.id)}
                        className={`grid grid-cols-12 items-center p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A1D24] border border-[#ACD9F3]/50'
                            : 'hover:bg-[#1A1D24]/60 border border-transparent'
                        }`}
                      >
                        {/* Element Name & Type */}
                        <div className="col-span-7 sm:col-span-6 flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                          <div className="w-8 h-8 rounded-xl bg-[#1A1D24] border border-[#252831] flex items-center justify-center shrink-0">
                            {getElementIcon(el.type)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#F0F1F7] truncate">{el.name}</div>
                            <div className="text-[10px] text-[#727681]">
                              {el.type} <span className="sm:hidden">· {el.usedIn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Used in */}
                        <div className="hidden sm:block sm:col-span-2 text-center text-xs text-[#A0A1AA] font-mono tabular-nums">
                          {el.usedIn}
                        </div>

                        {/* CTR */}
                        <div className="col-span-2 text-right text-xs font-semibold text-[#F0F1F7] font-mono tabular-nums">
                          {el.ctr}
                        </div>

                        {/* Lift Bar & Percent */}
                        <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-2 sm:gap-2.5">
                          <div className="hidden xs:flex w-10 sm:w-14 xl:w-24 h-1.5 bg-[#1A1D24] rounded-full overflow-hidden justify-end">
                            <div
                              className={`h-full rounded-full ${isPositive ? 'bg-[#66D4AA]' : 'bg-[#F18E87]'}`}
                              style={{ width: `${Math.min(Math.abs(el.liftPct) * 2.5, 100)}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-bold font-mono tabular-nums w-10 text-right ${
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

              {/* Interactive Selected Element Spotlight Footer */}
              {activeElement && (
                <div className="mt-4 pt-4 border-t border-[#252831]/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1A1D24] border border-[#343842] flex items-center justify-center">
                      {getElementIcon(activeElement.type)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F0F1F7]">
                        Selected: {activeElement.name}
                      </div>
                      <div className="text-[11px] text-[#727681]">
                        {activeElement.type} element · Active across {activeElement.usedIn} · Avg CTR {activeElement.ctr} ({activeElement.liftPct > 0 ? `+${activeElement.liftPct}%` : `${activeElement.liftPct}%`} vs baseline)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPerformanceTab('Creatives')}
                      className="px-3.5 py-2 rounded-xl bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] text-xs font-medium text-[#F0F1F7] transition-colors cursor-pointer"
                    >
                      View matching creatives
                    </button>
                    <button
                      onClick={() => setCurrentView('studio')}
                      className="px-3.5 py-2 rounded-xl bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Open in Studio
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: By Channel & Next Best Action */}
            <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex flex-col gap-4 xl:gap-5">
              {/* By Channel Panel */}
              <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6">
                <h4 className="text-sm font-semibold text-[#F0F1F7] mb-3">By channel</h4>
                
                <div className="flex flex-col gap-3.5">
                  {/* Meta */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[#ACD9F3] text-sm">∞</span>
                        <span className="text-[#F0F1F7] font-medium">Meta</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
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
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
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
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
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

              {/* Next Best Action Card */}
              <div className="bg-[#121419] border border-[#BEB0F4]/30 rounded-3xl p-5 xl:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/20 mb-3">
                    <Sparkles className="w-3 h-3 text-[#BEB0F4]" />
                    Next best action
                  </span>

                  <h4 className="text-base xl:text-lg font-semibold text-[#F0F1F7] font-heading leading-snug">
                    Put more dogs outdoors, fewer packshots
                  </h4>
                  <p className="text-xs text-[#A0A1AA] mt-2 leading-relaxed">
                    Lifestyle visuals with the first hook carry most of this month's lift. 19 live ads still use white-background shots.
                  </p>

                  {testModeActivated && (
                    <div className="mt-3 p-2.5 rounded-xl bg-[#1A1D24] border border-[#66D4AA]/30 text-[11px] text-[#66D4AA] flex items-center gap-2 animate-in fade-in duration-150">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>50/50 split test queued across Meta & TikTok.</span>
                    </div>
                  )}
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
                    onClick={() => setTestModeActivated(!testModeActivated)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      testModeActivated
                        ? 'bg-[#66D4AA]/15 text-[#66D4AA] border-[#66D4AA]/40'
                        : 'bg-[#1A1D24] hover:bg-[#252831] text-[#F0F1F7] border-[#343842]'
                    }`}
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>{testModeActivated ? 'Testing' : 'Test it'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          TAB 2: CREATIVES (Inspired by image_b132bad0.png + Single-Creative Spotlight)
          - Single-Creative Spotlight Card (Retention Curve, Element DNA, Fatigue Gauge)
          - 4 Categorized Metric Cluster Cards (Recalculated In-Place)
          - Horizontal Smooth Stream Conversion Funnel + Metrics Trend Chart
          - Creative Performance Table with Click-to-Filter & Dog Cap Thumbnails
         ===================================================================== */}
      {performanceTab === 'Creatives' && (
        <div className="flex flex-col gap-4 xl:gap-5 animate-in fade-in duration-200">
          {/* Single-Creative Spotlight Banner (Shown when a creative is selected) */}
          {selectedCreative && (
            <div className="bg-[#121419] border border-[#ACD9F3]/50 rounded-3xl p-5 xl:p-6 flex flex-col gap-5 shadow-xl animate-in fade-in duration-200">
              {/* Spotlight Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#252831]">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ACD9F3]/15 text-[#ACD9F3] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Single-Creative Spotlight
                  </span>
                  <span className="text-[#727681]">·</span>
                  <span className="text-[#A0A1AA]">
                    All KPI cards, funnel stages, and trend charts below are filtered to <strong className="text-[#F0F1F7]">{selectedCreative.code}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Switcher Pills */}
                  <div className="hidden xl:flex items-center gap-1 bg-[#1A1D24] p-1 rounded-xl border border-[#252831]">
                    {CREATIVE_PERFORMANCE_DATA.slice(0, 5).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedPerformanceCreativeId(c.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                          selectedCreative.id === c.id
                            ? 'bg-[#ACD9F3] text-[#08090B] font-semibold'
                            : 'text-[#A0A1AA] hover:text-[#F0F1F7]'
                        }`}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedPerformanceCreativeId(null)}
                    className="px-3 py-1.5 rounded-xl bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] text-xs font-medium text-[#F0F1F7] transition-colors cursor-pointer"
                  >
                    ← Back to all creatives
                  </button>
                </div>
              </div>

              {/* 3-Column Deep Diagnostics Grid */}
              <div className="grid grid-cols-12 gap-5 items-stretch">
                {/* Col 1: Creative Identity & Ad Preview (4 cols) */}
                <div className="col-span-12 lg:col-span-4 bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden border border-[#343842] shrink-0">
                      <img
                        src={selectedCreative.image}
                        alt={selectedCreative.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-[#08090B]/85 text-[10px] font-mono text-[#F0F1F7]">
                        {selectedCreative.format.split(' · ')[0]}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between min-w-0 flex-1">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-[#A0A1AA]">
                          <span>{selectedCreative.publisher}</span>
                          <span>·</span>
                          <span
                            className={
                              selectedCreative.status === 'Scaling'
                                ? 'text-[#66D4AA] font-semibold'
                                : selectedCreative.status === 'Fatigue Watch'
                                ? 'text-[#F4C36A] font-semibold'
                                : 'text-[#ACD9F3] font-semibold'
                            }
                          >
                            {selectedCreative.status}
                          </span>
                        </div>

                        <h4 className="text-base xl:text-lg font-bold text-[#F0F1F7] font-heading mt-1 leading-snug">
                          {selectedCreative.name}
                        </h4>

                        <p className="text-xs text-[#A0A1AA] mt-1.5 line-clamp-2">
                          Hook: <span className="text-[#F0F1F7] font-medium">“{selectedCreative.hook}”</span>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#252831] flex items-center justify-between text-xs">
                        <span className="text-[#727681] truncate">{selectedCreative.campaign}</span>
                        <span className="font-mono text-[#66D4AA] font-semibold shrink-0 ml-2">
                          {selectedCreative.brandScore}% On-Brand
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Benchmark Strip */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#252831]">
                    <div className="bg-[#121419] rounded-xl p-2.5">
                      <div className="text-[10px] text-[#727681]">ROAS vs Avg</div>
                      <div className="text-sm font-bold text-[#F0F1F7] font-mono mt-0.5">
                        {selectedCreative.roas.toFixed(1)}x{' '}
                        <span className={selectedCreative.roas >= 3.6 ? 'text-[10px] text-[#66D4AA]' : 'text-[10px] text-[#F18E87]'}>
                          ({selectedCreative.roas >= 3.6 ? '+' : ''}{(selectedCreative.roas - 3.6).toFixed(1)}x)
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#121419] rounded-xl p-2.5">
                      <div className="text-[10px] text-[#727681]">Thumbstop</div>
                      <div className="text-sm font-bold text-[#ACD9F3] font-mono mt-0.5">
                        {selectedCreative.thumbstopRate}%
                      </div>
                    </div>
                    <div className="bg-[#121419] rounded-xl p-2.5">
                      <div className="text-[10px] text-[#727681]">CPA</div>
                      <div className="text-sm font-bold text-[#F0F1F7] font-mono mt-0.5">
                        ${selectedCreative.cpa.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Col 2: Video / Attention Retention Curve (4 cols) */}
                <div className="col-span-12 lg:col-span-4 bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="text-xs font-semibold text-[#F0F1F7] font-heading">
                        Attention & Hold Retention Curve
                      </h5>
                      <p className="text-[11px] text-[#727681]">
                        % of impressions holding through each creative stage vs. account avg
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#ACD9F3]">
                      {selectedCreative.retentionCurve.thumbstop}% → {selectedCreative.retentionCurve.ctaClick}%
                    </span>
                  </div>

                  {/* SVG Retention Drop-Off Curve */}
                  <div className="w-full h-36 my-1">
                    {(() => {
                      const rc = selectedCreative.retentionCurve;
                      const stages = [
                        { label: 'Thumbstop', val: rc.thumbstop, avg: 34.0 },
                        { label: '3s Hold', val: rc.hold3s, avg: 25.0 },
                        { label: '50% Hold', val: rc.watch50, avg: 16.5 },
                        { label: '100% Hold', val: rc.watch100, avg: 9.5 },
                        { label: 'CTA Click', val: rc.ctaClick, avg: 3.1 },
                      ];
                      const maxVal = 50;
                      const w = 360;
                      const h = 115;
                      const padL = 28;
                      const padR = 16;
                      const padT = 14;
                      const padB = 22;
                      const plotW = w - padL - padR;
                      const plotH = h - padT - padB;

                      const pts = stages.map((s, i) => ({
                        ...s,
                        x: padL + (i / (stages.length - 1)) * plotW,
                        y: padT + plotH - (Math.min(s.val, maxVal) / maxVal) * plotH,
                        avgY: padT + plotH - (Math.min(s.avg, maxVal) / maxVal) * plotH,
                      }));

                      const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                      const areaD = `${lineD} L ${pts[pts.length - 1].x} ${padT + plotH} L ${pts[0].x} ${padT + plotH} Z`;
                      const avgLineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.avgY}`).join(' ');

                      return (
                        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="retentionFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ACD9F3" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#ACD9F3" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {[0, 0.5, 1].map((t, idx) => {
                            const y = padT + plotH * t;
                            const label = idx === 0 ? '50%' : idx === 1 ? '25%' : '0%';
                            return (
                              <g key={idx}>
                                <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#252831" strokeDasharray="2 2" />
                                <text x={padL - 5} y={y + 3} textAnchor="end" className="text-[9px] fill-[#727681] font-mono">
                                  {label}
                                </text>
                              </g>
                            );
                          })}

                          {/* Account Benchmark Dashed Line */}
                          <path d={avgLineD} fill="none" stroke="#727681" strokeWidth="1.5" strokeDasharray="3 3" />

                          {/* Selected Creative Fill & Line */}
                          <path d={areaD} fill="url(#retentionFill)" />
                          <path d={lineD} fill="none" stroke="#ACD9F3" strokeWidth="2.5" strokeLinecap="round" />

                          {pts.map((p, i) => (
                            <g key={i}>
                              <circle cx={p.x} cy={p.y} r="3.5" fill="#08090B" stroke="#ACD9F3" strokeWidth="2" />
                              <text x={p.x} y={p.y - 6} textAnchor="middle" className="text-[9px] fill-[#F0F1F7] font-mono font-semibold">
                                {p.val}%
                              </text>
                              <text x={p.x} y={h - 4} textAnchor="middle" className="text-[9px] fill-[#A0A1AA]">
                                {p.label}
                              </text>
                            </g>
                          ))}
                        </svg>
                      );
                    })()}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#727681] pt-2 border-t border-[#252831]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-0.5 bg-[#ACD9F3] inline-block" /> {selectedCreative.code} retention
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-0.5 bg-[#727681] inline-block" /> Account benchmark
                    </span>
                  </div>
                </div>

                {/* Col 3: Element DNA Attribution & Fatigue Gauge + Remix Actions (4 cols) */}
                <div className="col-span-12 lg:col-span-4 bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-xs font-semibold text-[#F0F1F7] font-heading">
                        Element DNA & Lift Attribution
                      </h5>
                      <span className="text-[10px] text-[#727681]">Click tag to inspect element</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {selectedCreative.dnaElements.map((dna, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedElementId(dna.elementId);
                            setPerformanceTab('Elements');
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#121419] hover:bg-[#252831] border border-[#252831] flex items-center justify-between text-xs transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[10px] text-[#727681] font-mono uppercase w-12 text-left shrink-0">
                              {dna.category}
                            </span>
                            <span className="text-[#F0F1F7] truncate group-hover:text-[#ACD9F3] transition-colors">
                              {dna.label}
                            </span>
                          </div>
                          <span
                            className={`text-[11px] font-mono font-semibold shrink-0 ml-2 ${
                              dna.positive ? 'text-[#66D4AA]' : 'text-[#F18E87]'
                            }`}
                          >
                            {dna.lift}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fatigue & Frequency Gauge + One-Click Actions */}
                  <div className="pt-3 border-t border-[#252831] flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A0A1AA]">
                        Ad Frequency & Fatigue:{' '}
                        <strong className="text-[#F0F1F7] font-mono">{selectedCreative.frequency.toFixed(1)}x</strong>
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((bar) => {
                          const active = bar <= Math.round(selectedCreative.frequency);
                          const barColor =
                            selectedCreative.frequency >= 3.8
                              ? 'bg-[#F4C36A]'
                              : selectedCreative.frequency >= 2.8
                              ? 'bg-[#ACD9F3]'
                              : 'bg-[#66D4AA]';
                          return (
                            <div
                              key={bar}
                              className={`w-3.5 h-1.5 rounded-xs ${active ? barColor : 'bg-[#252831]'}`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsRemixModalOpen(true)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#292638] hover:bg-[#352f4c] text-[#BEB0F4] border border-[#BEB0F4]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Remix creative</span>
                      </button>
                      <button
                        onClick={() => {
                          const idx = CREATIVE_PERFORMANCE_DATA.findIndex((c) => c.id === selectedCreative.id);
                          setSelectedConceptId(String(((idx >= 0 ? idx : 0) % 5) + 1));
                          setCurrentView('studio');
                        }}
                        className="py-2 px-3 rounded-xl bg-[#121419] hover:bg-[#252831] text-[#F0F1F7] border border-[#343842] text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Open Studio</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ACD9F3]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top 4 Categorized Metric Cluster Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Cluster 1: Awareness and Reach */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold text-[#F0F1F7] font-heading">
                  Awareness and Reach {selectedCreative ? `· ${selectedCreative.code}` : ''}
                </span>
                <div className="w-7 h-7 rounded-xl bg-[#292638] border border-[#BEB0F4]/20 flex items-center justify-center text-[#BEB0F4]">
                  <Megaphone className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Ads Spend</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.spendFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.spendDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">CPM</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.cpmFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.cpmDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Impressions</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.impressionsFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.impressionsDelta}</span>
                </div>
              </div>
            </div>

            {/* Cluster 2: Engagement and Funnel Actions */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold text-[#F0F1F7] font-heading">
                  Engagement and Funnel {selectedCreative ? `· ${selectedCreative.code}` : ''}
                </span>
                <div className="w-7 h-7 rounded-xl bg-[#292638] border border-[#BEB0F4]/20 flex items-center justify-center text-[#ACD9F3]">
                  <MousePointer className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Link Clicks</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.clicksFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.clicksDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Add to Carts</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.atcFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.atcDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Cap Purchases</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.ordersFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.ordersDelta}</span>
                </div>
              </div>
            </div>

            {/* Cluster 3: Efficiency Metrics */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold text-[#F0F1F7] font-heading">
                  Efficiency Metrics {selectedCreative ? `· ${selectedCreative.code}` : ''}
                </span>
                <div className="w-7 h-7 rounded-xl bg-[#292638] border border-[#BEB0F4]/20 flex items-center justify-center text-[#66D4AA]">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Cost per Link Click</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.cpcFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.cpcDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Cost per Add to Cart</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.costPerAtcFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.costPerAtcDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Cost per Purchase (CPA)</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.cpaFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.cpaDelta}</span>
                </div>
              </div>
            </div>

            {/* Cluster 4: Conversion Rates */}
            <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold text-[#F0F1F7] font-heading">
                  Conversion Rates {selectedCreative ? `· ${selectedCreative.code}` : ''}
                </span>
                <div className="w-7 h-7 rounded-xl bg-[#292638] border border-[#BEB0F4]/20 flex items-center justify-center text-[#BEB0F4]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Link Click-Through Rate</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.ctrFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.ctrDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Landing Pg. Conversion</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.lpConvFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.lpConvDelta}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#1A1D24]/90 border border-[#252831] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#727681]">Cart-to-Order Rate</div>
                    <div className="text-lg font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {activeCreativeMetrics.cartToOrderFormatted}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#66D4AA]">{activeCreativeMetrics.cartToOrderDelta}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Conversion Funnel (Horizontal Stream) & Conversion Metrics Trend */}
          <div className="grid grid-cols-12 gap-4 xl:gap-5">
            {/* Left: Horizontal Stream Conversion Funnel (7 cols) */}
            <div className="col-span-12 lg:col-span-7 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base xl:text-lg font-semibold text-[#F0F1F7] font-heading">
                    Conversion Funnel {selectedCreative ? `· ${selectedCreative.name}` : ''}
                  </h3>
                  <p className="text-xs text-[#727681]">
                    {selectedCreative
                      ? `Single-creative progression from ${selectedCreative.thumbstopRate}% thumbstop rate to dog cap orders`
                      : 'Creative progression from 3-second thumbstops to dog cap orders'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#292638] border border-[#BEB0F4]/20 flex items-center justify-center text-[#BEB0F4]">
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              {/* 5 Stage Header Metrics */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                {activeCreativeMetrics.funnelStages.map((stage, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[11px] text-[#727681] truncate">{stage.label}</span>
                    <span className="text-base sm:text-xl font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                      {stage.val}
                    </span>
                    <span className={`text-[10px] font-mono mt-1 ${idx === 0 || idx === 4 ? 'text-[#66D4AA]' : 'text-[#F18E87]'}`}>
                      {stage.drop}
                    </span>
                  </div>
                ))}
              </div>

              {/* Horizontal Smooth Sankey / Stream Funnel SVG (inspired by image_b132bad0.png) */}
              <div className="relative w-full h-40 sm:h-48 pt-2">
                <svg viewBox="0 0 800 180" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="funnelStreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5BB8F6" stopOpacity="0.95" />
                      <stop offset="45%" stopColor="#859DF8" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#BEB0F4" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#9B7EDE" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  {/* Vertical Stage Divider Lines */}
                  {[0, 180, 360, 540, 720].map((xPos, i) => (
                    <line
                      key={i}
                      x1={xPos}
                      y1={0}
                      x2={xPos}
                      y2={175}
                      stroke="#252831"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  ))}

                  {/* Symmetric Tapered Stream Path */}
                  <path
                    d="
                      M 0 18
                      C 90 18, 110 56, 180 58
                      C 260 60, 290 64, 360 66
                      C 440 68, 470 84, 540 86
                      C 620 87, 670 88, 760 88
                      L 760 92
                      C 670 92, 620 93, 540 94
                      C 470 96, 440 112, 360 114
                      C 290 116, 260 120, 180 122
                      C 110 124, 90 162, 0 162
                      Z
                    "
                    fill="url(#funnelStreamGrad)"
                  />
                </svg>
              </div>
            </div>

            {/* Right: Conversion Metrics Trend (5 cols) */}
            <div className="col-span-12 lg:col-span-5 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base xl:text-lg font-semibold text-[#F0F1F7] font-heading">
                    Conversion Metrics Trend {selectedCreative ? `· ${selectedCreative.code}` : ''}
                  </h3>
                  <div className="flex items-center gap-1 p-1 bg-[#1A1D24] border border-[#252831] rounded-xl text-[11px]">
                    {(['Clicks', 'Conversions', 'ROAS'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setTrendMetric(m)}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                          trendMetric === m ? 'bg-[#292638] text-[#BEB0F4]' : 'text-[#727681] hover:text-[#F0F1F7]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-[#727681] mb-3">
                  {selectedCreative
                    ? `Daily ${trendMetric.toLowerCase()} trajectory for ${selectedCreative.name}`
                    : `Showing daily ${trendMetric.toLowerCase()} trajectory across active dog cap creatives`}
                </div>
              </div>

              {/* Smooth Purple Curve Chart */}
              <div className="w-full h-48">
                <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="purpleTrendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#BEB0F4" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#BEB0F4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {[30, 70, 110, 150].map((y, idx) => (
                    <g key={idx}>
                      <line x1="36" y1={y} x2="485" y2={y} stroke="#252831" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="30" y={y + 3} textAnchor="end" className="text-[10px] fill-[#727681] font-mono">
                        {trendMetric === 'Clicks'
                          ? selectedCreative
                            ? ['6K', '4.5K', '3K', '1.5K'][idx]
                            : ['40K', '30K', '20K', '10K'][idx]
                          : trendMetric === 'Conversions'
                          ? selectedCreative
                            ? ['120', '90', '60', '30'][idx]
                            : ['400', '300', '200', '100'][idx]
                          : ['4.8x', '3.8x', '2.8x', '1.8x'][idx]}
                      </text>
                    </g>
                  ))}

                  <path
                    d={
                      trendMetric === 'Clicks'
                        ? 'M 40 125 C 75 120, 95 65, 130 68 C 165 70, 195 52, 230 58 C 265 64, 300 42, 340 46 C 380 50, 415 72, 450 54 C 468 45, 478 48, 485 40 L 485 150 L 40 150 Z'
                        : trendMetric === 'Conversions'
                        ? 'M 40 132 C 80 118, 110 85, 150 78 C 190 71, 220 62, 260 55 C 300 48, 340 58, 380 44 C 420 30, 455 42, 485 35 L 485 150 L 40 150 Z'
                        : 'M 40 115 C 85 105, 120 92, 165 82 C 210 72, 250 68, 295 54 C 340 40, 390 48, 435 38 C 460 32, 475 36, 485 32 L 485 150 L 40 150 Z'
                    }
                    fill="url(#purpleTrendGrad)"
                  />
                  <path
                    d={
                      trendMetric === 'Clicks'
                        ? 'M 40 125 C 75 120, 95 65, 130 68 C 165 70, 195 52, 230 58 C 265 64, 300 42, 340 46 C 380 50, 415 72, 450 54 C 468 45, 478 48, 485 40'
                        : trendMetric === 'Conversions'
                        ? 'M 40 132 C 80 118, 110 85, 150 78 C 190 71, 220 62, 260 55 C 300 48, 340 58, 380 44 C 420 30, 455 42, 485 35'
                        : 'M 40 115 C 85 105, 120 92, 165 82 C 210 72, 250 68, 295 54 C 340 40, 390 48, 435 38 C 460 32, 475 36, 485 32'
                    }
                    fill="none"
                    stroke="#BEB0F4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {['23 Aug', '30 Aug', '6 Sep', '13 Sep', '21 Sep'].map((lbl, i) => (
                    <text
                      key={lbl}
                      x={45 + i * 108}
                      y={172}
                      textAnchor="middle"
                      className="text-[10px] fill-[#727681] font-mono"
                    >
                      {lbl}
                    </text>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Row: Creative Performance Table (inspired by image_b132bad0.png) */}
          <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6">
            {/* Table Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#252831]/60 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center p-1 bg-[#1A1D24] border border-[#252831] rounded-full text-xs">
                  {(['Creatives', 'Audience', 'State'] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setCreativeSubTab(sub)}
                      className={`px-3.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                        creativeSubTab === sub
                          ? 'bg-[#F0F1F7] text-[#08090B]'
                          : 'text-[#A0A1AA] hover:text-[#F0F1F7]'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#F0F1F7] font-heading hidden sm:inline">
                  Creative Performance
                </span>
                <span className="text-xs text-[#727681] hidden md:inline">
                  · Click any row to filter dashboard & inspect creative stats
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                {/* Search Ad Name */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#727681] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={creativeSearch}
                    onChange={(e) => setCreativeSearch(e.target.value)}
                    placeholder="Filter ad name or hook..."
                    className="pl-8 pr-3 py-1.5 bg-[#1A1D24] border border-[#252831] rounded-xl text-xs text-[#F0F1F7] placeholder-[#727681] outline-none w-44 sm:w-56"
                  />
                </div>

                {/* Publisher Filter */}
                <div className="flex items-center gap-1 p-1 bg-[#1A1D24] border border-[#252831] rounded-xl">
                  {(['All', 'Meta', 'TikTok', 'Google'] as const).map((pub) => (
                    <button
                      key={pub}
                      onClick={() => setPublisherFilter(pub)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                        publisherFilter === pub
                          ? 'bg-[#252831] text-[#ACD9F3]'
                          : 'text-[#727681] hover:text-[#F0F1F7]'
                      }`}
                    >
                      {pub}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="border-b border-[#252831]/60 text-[11px] text-[#727681] font-medium">
                    <th className="py-2.5 px-2 w-8">#</th>
                    <th className="py-2.5 px-3">Ad Name</th>
                    <th className="py-2.5 px-3">Ad Image</th>
                    <th className="py-2.5 px-3">Studio</th>
                    <th className="py-2.5 px-3">Publisher</th>
                    <th
                      onClick={() => setCreativeSortBy('impressions')}
                      className="py-2.5 px-3 cursor-pointer hover:text-[#F0F1F7]"
                    >
                      Impressions {creativeSortBy === 'impressions' && '▾'}
                    </th>
                    <th
                      onClick={() => setCreativeSortBy('linkClicks')}
                      className="py-2.5 px-3 cursor-pointer hover:text-[#F0F1F7]"
                    >
                      Link Clicks {creativeSortBy === 'linkClicks' && '▾'}
                    </th>
                    <th
                      onClick={() => setCreativeSortBy('spend')}
                      className="py-2.5 px-3 cursor-pointer hover:text-[#F0F1F7]"
                    >
                      Amount Spent {creativeSortBy === 'spend' && '▾'}
                    </th>
                    <th
                      onClick={() => setCreativeSortBy('ctr')}
                      className="py-2.5 px-3 text-right cursor-pointer hover:text-[#F0F1F7]"
                    >
                      CTR {creativeSortBy === 'ctr' && '▾'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252831]/40 text-xs">
                  {filteredCreatives.map((cr, idx) => {
                    const isSelectedRow = selectedCreative?.id === cr.id;
                    return (
                      <tr
                        key={cr.id}
                        onClick={() =>
                          setSelectedPerformanceCreativeId(isSelectedRow ? null : cr.id)
                        }
                        className={`transition-colors cursor-pointer group ${
                          isSelectedRow
                            ? 'bg-[#ACD9F3]/10 hover:bg-[#ACD9F3]/15'
                            : 'hover:bg-[#1A1D24]/60'
                        }`}
                      >
                        <td className="py-3 px-2 font-mono text-[#727681] tabular-nums">
                          {isSelectedRow ? (
                            <span className="inline-block w-2 h-2 rounded-full bg-[#ACD9F3]" />
                          ) : (
                            `${idx + 1}.`
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${isSelectedRow ? 'text-[#ACD9F3]' : 'text-[#F0F1F7] group-hover:text-[#ACD9F3]'} transition-colors`}>
                              {cr.name}
                            </span>
                            {isSelectedRow && (
                              <span className="text-[10px] font-mono text-[#ACD9F3]">
                                · Viewing stats
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#727681] truncate max-w-[260px]">
                            {cr.format} · {cr.hook}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <img
                            src={cr.image}
                            alt={cr.name}
                            className={`w-10 h-10 rounded-xl object-cover border ${
                              isSelectedRow ? 'border-[#ACD9F3]' : 'border-[#343842]'
                            }`}
                          />
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedConceptId(String((idx % 5) + 1));
                              setCurrentView('studio');
                            }}
                            className="text-[#ACD9F3] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
                          >
                            <span>Studio</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </td>
                        <td className="py-3 px-3 text-[#A0A1AA]">
                          {cr.publisher === 'Meta' ? 'Facebook & IG' : cr.publisher}
                        </td>
                        {/* Impressions with purple bar */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono tabular-nums text-[#F0F1F7] w-16 text-right">
                              {cr.impressions.toLocaleString()}
                            </span>
                            <div className="w-20 h-2 bg-[#1A1D24] rounded-sm overflow-hidden">
                              <div
                                className="h-full bg-[#BEB0F4] rounded-sm"
                                style={{ width: `${(cr.impressions / maxCreativeImpressions) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        {/* Link Clicks with ice-blue bar */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono tabular-nums text-[#F0F1F7] w-14 text-right">
                              {cr.linkClicks.toLocaleString()}
                            </span>
                            <div className="w-24 h-2 bg-[#1A1D24] rounded-sm overflow-hidden">
                              <div
                                className="h-full bg-[#5BB8F6] rounded-sm"
                                style={{ width: `${(cr.linkClicks / maxCreativeClicks) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        {/* Amount Spent with white/neutral bar */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono tabular-nums text-[#F0F1F7] w-14 text-right">
                              ${cr.spend.toLocaleString()}
                            </span>
                            <div className="w-16 h-2 bg-[#1A1D24] rounded-sm overflow-hidden">
                              <div
                                className="h-full bg-[#F0F1F7] rounded-sm"
                                style={{ width: `${(cr.spend / maxCreativeSpend) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        {/* CTR */}
                        <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold">
                          <span className={cr.ctr >= 3.5 ? 'text-[#66D4AA]' : cr.ctr >= 2.8 ? 'text-[#F0F1F7]' : 'text-[#F18E87]'}>
                            {cr.ctr.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: CAMPAIGNS (Inspired by image_1b59fc52.png & image_b132bad0.png)
          - Performance Summary 5-Metric Strip (CPM, CPC, CPLC, CPLPV, CPA)
          - Multi-Line Performance Trends + Vertical Leads/Orders Funnel
          - Device & Placement Donut Charts + Regional Breakdown Table
          - Campaign Analysis Table with Inline Progress Bars
         ===================================================================== */}
      {performanceTab === 'Campaigns' && (
        <div className="flex flex-col gap-4 xl:gap-5 animate-in fade-in duration-200">
          {/* Performance Summary 5-Card Strip (inspired by image_1b59fc52.png top strip) */}
          <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-semibold text-[#F0F1F7] font-heading">Performance Summary</h3>
                <p className="text-xs text-[#727681]">Key unit-economics and efficiency reporting across all active dog-cap campaigns</p>
              </div>
              <button
                onClick={() => setCurrentView('campaigns')}
                className="text-xs text-[#ACD9F3] hover:underline font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Manage Campaigns</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {[
                { label: 'CPM', value: '$14.22', delta: '↑ 8.1%', positive: true, bars: [45, 52, 48, 60, 58, 64, 62] },
                { label: 'CPC', value: '$0.39', delta: '↓ 13.4%', positive: true, bars: [70, 65, 62, 58, 54, 50, 46] },
                { label: 'CPLC', value: '$0.50', delta: '↓ 20.0%', positive: true, bars: [68, 64, 59, 55, 52, 49, 45] },
                { label: 'CPLPV', value: '$0.64', delta: '↓ 12.9%', positive: true, bars: [62, 60, 58, 53, 51, 48, 47] },
                { label: 'CPA (Order)', value: '$18.40', delta: '↓ 9.2%', positive: true, bars: [75, 70, 68, 62, 59, 56, 52] },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="p-3.5 rounded-2xl bg-[#1A1D24] border border-[#252831] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#A0A1AA]">{kpi.label}</span>
                    <span className="text-[11px] font-mono text-[#66D4AA]">{kpi.delta}</span>
                  </div>
                  <div className="flex items-end justify-between gap-2 mt-3">
                    <span className="text-xl xl:text-2xl font-bold text-[#F0F1F7] font-mono tabular-nums">
                      {kpi.value}
                    </span>
                    {/* Mini bar silhouette */}
                    <div className="flex items-end gap-1 h-7">
                      {kpi.bars.map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-t bg-[#ACD9F3]/40"
                          style={{ height: `${(h / 80) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Row: Multi-Line Performance Trends (8 cols) + Vertical Funnel (4 cols) */}
          <div className="grid grid-cols-12 gap-4 xl:gap-5">
            {/* Performance Trends Card */}
            <div className="col-span-12 lg:col-span-8 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base xl:text-lg font-semibold text-[#F0F1F7] font-heading">
                      Performance Trends
                    </h3>
                    <p className="text-xs text-[#727681]">Link Clicks, Impressions and Ad Spend trajectory</p>
                  </div>

                  {/* Interactive Legend Toggles */}
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => setActiveTrendSeries((s) => ({ ...s, clicks: !s.clicks }))}
                      className={`flex items-center gap-1.5 cursor-pointer ${
                        activeTrendSeries.clicks ? 'text-[#F0F1F7]' : 'text-[#727681] opacity-50'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5BB8F6]" />
                      <span>Link Clicks</span>
                    </button>
                    <button
                      onClick={() => setActiveTrendSeries((s) => ({ ...s, impressions: !s.impressions }))}
                      className={`flex items-center gap-1.5 cursor-pointer ${
                        activeTrendSeries.impressions ? 'text-[#F0F1F7]' : 'text-[#727681] opacity-50'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#BEB0F4]" />
                      <span>Impressions</span>
                    </button>
                    <button
                      onClick={() => setActiveTrendSeries((s) => ({ ...s, spend: !s.spend }))}
                      className={`flex items-center gap-1.5 cursor-pointer ${
                        activeTrendSeries.spend ? 'text-[#F0F1F7]' : 'text-[#727681] opacity-50'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#66D4AA]" />
                      <span>Ads Spend</span>
                    </button>
                  </div>
                </div>

                {/* Multi-Line SVG Chart */}
                <div className="w-full h-52 my-2">
                  <svg viewBox="0 0 760 190" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="multiAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5BB8F6" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#5BB8F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {[25, 65, 105, 145].map((y, idx) => (
                      <g key={idx}>
                        <line x1="42" y1={y} x2="720" y2={y} stroke="#252831" strokeDasharray="3 3" strokeWidth="1" />
                        <text x="36" y={y + 3} textAnchor="end" className="text-[10px] fill-[#727681] font-mono">
                          {['150K', '100K', '50K', '10K'][idx]}
                        </text>
                        <text x="726" y={y + 3} textAnchor="start" className="text-[10px] fill-[#727681] font-mono">
                          {['4M', '3M', '2M', '1M'][idx]}
                        </text>
                      </g>
                    ))}

                    {activeTrendSeries.clicks && (
                      <>
                        <path
                          d="M 45 120 C 110 112, 165 88, 230 92 C 295 96, 350 70, 415 74 C 480 78, 535 52, 600 48 C 655 44, 690 40, 718 34 L 718 155 L 45 155 Z"
                          fill="url(#multiAreaGrad)"
                        />
                        <path
                          d="M 45 120 C 110 112, 165 88, 230 92 C 295 96, 350 70, 415 74 C 480 78, 535 52, 600 48 C 655 44, 690 40, 718 34"
                          fill="none"
                          stroke="#5BB8F6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </>
                    )}

                    {activeTrendSeries.impressions && (
                      <path
                        d="M 45 85 C 115 80, 175 74, 240 68 C 305 62, 360 58, 425 50 C 490 42, 545 38, 610 32 C 660 28, 695 26, 718 24"
                        fill="none"
                        stroke="#BEB0F4"
                        strokeWidth="2"
                        strokeDasharray="5 3"
                        strokeLinecap="round"
                      />
                    )}

                    {activeTrendSeries.spend && (
                      <path
                        d="M 45 136 C 115 132, 175 126, 240 120 C 305 116, 360 110, 425 102 C 490 96, 545 88, 610 82 C 660 78, 695 75, 718 72"
                        fill="none"
                        stroke="#66D4AA"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    )}

                    {['23 Aug', '28 Aug', '2 Sep', '8 Sep', '14 Sep', '21 Sep'].map((d, i) => (
                      <text
                        key={d}
                        x={50 + i * 130}
                        y={176}
                        textAnchor="middle"
                        className="text-[10px] fill-[#727681] font-mono"
                      >
                        {d}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Bottom 3 Summary KPIs inside Performance Trends */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#252831]/60">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#727681]">Page Impressions</span>
                    <span className="text-[11px] font-mono text-[#66D4AA]">↑ 28.4%</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                    3.58M
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#727681]">Ads Spend</span>
                    <span className="text-[11px] font-mono text-[#66D4AA]">↑ 12.1%</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                    $48.2K
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#727681]">CTR (Links)</span>
                    <span className="text-[11px] font-mono text-[#66D4AA]">↑ 0.4 pts</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#F0F1F7] font-mono tabular-nums mt-0.5">
                    3.48%
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Funnel Card (inspired by image_1b59fc52.png right panel) */}
            <div className="col-span-12 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base xl:text-lg font-semibold text-[#F0F1F7] font-heading">Orders Funnel</h3>
                <p className="text-xs text-[#727681]">Evolution from Impressions to Cap Orders</p>
              </div>

              <div className="grid grid-cols-12 items-center gap-2 my-3 flex-1">
                {/* Left Labels */}
                <div className="col-span-5 flex flex-col justify-between h-full py-2 gap-3">
                  <div>
                    <div className="text-[11px] text-[#727681]">Impressions</div>
                    <div className="text-base font-bold text-[#F0F1F7] font-mono tabular-nums">3.58M</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#727681]">Link Clicks</div>
                    <div className="text-base font-bold text-[#F0F1F7] font-mono tabular-nums">125.1K</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#727681]">Product Views</div>
                    <div className="text-base font-bold text-[#F0F1F7] font-mono tabular-nums">96.4K</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#727681]">Cap Orders</div>
                    <div className="text-base font-bold text-[#66D4AA] font-mono tabular-nums">4,190</div>
                  </div>
                </div>

                {/* Center Vertical Tapered Funnel SVG */}
                <div className="col-span-4 h-52 flex items-center justify-center">
                  <svg viewBox="0 0 140 220" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="vertFunnelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5BB8F6" />
                        <stop offset="60%" stopColor="#859DF8" />
                        <stop offset="100%" stopColor="#BEB0F4" />
                      </linearGradient>
                    </defs>
                    <path
                      d="
                        M 10 10 L 130 10
                        C 130 55, 98 65, 95 100
                        C 92 135, 78 155, 74 185
                        L 74 212 L 66 212 L 66 185
                        C 62 155, 48 135, 45 100
                        C 42 65, 10 55, 10 10 Z
                      "
                      fill="url(#vertFunnelGrad)"
                    />
                  </svg>
                </div>

                {/* Right Conversion Step Rates */}
                <div className="col-span-3 flex flex-col justify-between h-full py-3 items-end text-right gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-[#1A1D24] border border-[#252831] text-[10px] font-mono text-[#A0A1AA]">
                    100%
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#1A1D24] border border-[#252831] text-[10px] font-mono text-[#ACD9F3]">
                    3.5% CTR
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#1A1D24] border border-[#252831] text-[10px] font-mono text-[#BEB0F4]">
                    77% LPV
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#66D4AA]/15 border border-[#66D4AA]/30 text-[10px] font-mono text-[#66D4AA]">
                    4.3% CVR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Row: Device Donut + Placements Donut + Top Regions Table */}
          <div className="grid grid-cols-12 gap-4 xl:gap-5">
            {/* Card 1: Breakdown by Device (Donut Chart) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm xl:text-base font-semibold text-[#F0F1F7] font-heading">
                    Orders Breakdown by Device
                  </h4>
                  <p className="text-[11px] text-[#727681]">Purchases across Mobile App, Desktop & Web</p>
                </div>
                <button
                  onClick={() =>
                    setDeviceMetric((m) => (m === 'Orders' ? 'Clicks' : m === 'Clicks' ? 'Impressions' : 'Orders'))
                  }
                  className="px-2.5 py-1 bg-[#1A1D24] border border-[#252831] rounded-lg text-[11px] text-[#A0A1AA] hover:text-[#F0F1F7] cursor-pointer"
                >
                  Metric: {deviceMetric} ▾
                </button>
              </div>

              <div className="flex items-center justify-around gap-4 my-2">
                {/* SVG Donut Chart */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="#1A1D24" strokeWidth="12" />
                    {/* Mobile App 94.2% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#BEB0F4"
                      strokeWidth="12"
                      strokeDasharray={`${0.942 * 289} 289`}
                      strokeLinecap="round"
                    />
                    {/* Desktop 4.6% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#5BB8F6"
                      strokeWidth="12"
                      strokeDasharray={`${0.046 * 289} 289`}
                      strokeDashoffset={-0.942 * 289}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-[#727681]">Total</span>
                    <span className="text-base font-bold text-[#F0F1F7] font-mono tabular-nums">
                      {deviceMetric === 'Orders' ? '4,190' : deviceMetric === 'Clicks' ? '125.1K' : '3.58M'}
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2.5 flex-1 max-w-[180px]">
                  {DEVICE_BREAKDOWN.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-[#A0A1AA]">{d.name}</span>
                      </div>
                      <span className="font-mono font-semibold text-[#F0F1F7] tabular-nums">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Breakdown by Placements (Donut Chart) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm xl:text-base font-semibold text-[#F0F1F7] font-heading">
                    Breakdown by Placements
                  </h4>
                  <p className="text-[11px] text-[#727681]">Conversion share across ad placements</p>
                </div>
                <div className="w-7 h-7 rounded-xl bg-[#292638] border border-[#BEB0F4]/20 flex items-center justify-center text-[#BEB0F4]">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-center justify-around gap-4 my-2">
                {/* SVG Multi-Segment Donut */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="#1A1D24" strokeWidth="12" />
                    {/* IG Reels 48.5% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#BEB0F4"
                      strokeWidth="12"
                      strokeDasharray={`${0.485 * 289} 289`}
                    />
                    {/* TikTok 33.4% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#ACD9F3"
                      strokeWidth="12"
                      strokeDasharray={`${0.334 * 289} 289`}
                      strokeDashoffset={-0.485 * 289}
                    />
                    {/* FB Feed 14.1% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#66D4AA"
                      strokeWidth="12"
                      strokeDasharray={`${0.141 * 289} 289`}
                      strokeDashoffset={-(0.485 + 0.334) * 289}
                    />
                    {/* Demand Gen 4% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#F4C36A"
                      strokeWidth="12"
                      strokeDasharray={`${0.04 * 289} 289`}
                      strokeDashoffset={-(0.485 + 0.334 + 0.141) * 289}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-[#727681]">Top</span>
                    <span className="text-xs font-bold text-[#F0F1F7]">Reels 48.5%</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2 flex-1 max-w-[190px]">
                  {PLACEMENT_BREAKDOWN.map((p) => (
                    <div key={p.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                        <span className="text-[#A0A1AA] truncate">{p.name}</span>
                      </div>
                      <span className="font-mono font-semibold text-[#F0F1F7] tabular-nums ml-2">{p.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Performance by Region (inspired by image_1b59fc52.png) */}
            <div className="col-span-12 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm xl:text-base font-semibold text-[#F0F1F7] font-heading">
                    Performance by Region
                  </h4>
                  <p className="text-[11px] text-[#727681]">Top converting markets for Dog Caps</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1D24] border border-[#252831] text-[11px] text-[#ACD9F3]">
                  <Globe className="w-3 h-3" />
                  <span>Top: California · 4.1x</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#252831]/60 text-[10px] text-[#727681]">
                      <th className="py-1.5">Region</th>
                      <th className="py-1.5">Country</th>
                      <th className="py-1.5 text-right">Impressions</th>
                      <th className="py-1.5 text-right">Clicks</th>
                      <th className="py-1.5 text-right">ROAS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#252831]/30">
                    {REGIONAL_BREAKDOWN.map((r) => (
                      <tr key={r.region} className="hover:bg-[#1A1D24]/40">
                        <td className="py-2 font-medium text-[#F0F1F7]">{r.region}</td>
                        <td className="py-2 text-[#727681] font-mono">{r.country}</td>
                        <td className="py-2 text-right font-mono tabular-nums text-[#A0A1AA]">
                          {r.impressions.toLocaleString()}
                        </td>
                        <td className="py-2 text-right font-mono tabular-nums text-[#F0F1F7]">
                          {r.clicks.toLocaleString()}
                        </td>
                        <td className="py-2 text-right font-mono tabular-nums font-semibold text-[#66D4AA]">
                          {r.roas}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Row: Campaign Analysis Table (inspired by image_1b59fc52.png bottom table) */}
          <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 xl:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#252831]/60 mb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base xl:text-lg font-semibold text-[#F0F1F7] font-heading">
                    Campaign Analysis
                  </h3>
                  <button
                    onClick={() => setCurrentView('campaigns')}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#ACD9F3]/15 text-[#ACD9F3] border border-[#ACD9F3]/20 cursor-pointer"
                  >
                    View Campaigns
                  </button>
                </div>
                <p className="text-xs text-[#727681] mt-0.5">Showing Key Performance Indicators across active and ready campaigns</p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#727681]">Sort by:</span>
                {(['impressions', 'linkClicks', 'ctr', 'spend', 'roas'] as const).map((field) => (
                  <button
                    key={field}
                    onClick={() => setCampaignSortField(field)}
                    className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
                      campaignSortField === field
                        ? 'bg-[#252831] text-[#ACD9F3] font-medium'
                        : 'text-[#727681] hover:text-[#F0F1F7]'
                    }`}
                  >
                    {field === 'linkClicks' ? 'Clicks' : field.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="border-b border-[#252831]/60 text-[11px] text-[#727681] font-medium">
                    <th className="py-2.5 px-3">Campaign Name</th>
                    <th className="py-2.5 px-3">Channel</th>
                    <th className="py-2.5 px-3">Impressions ▾</th>
                    <th className="py-2.5 px-3">% Δ</th>
                    <th className="py-2.5 px-3">Link Clicks</th>
                    <th className="py-2.5 px-3">CTR (Link Clicks)</th>
                    <th className="py-2.5 px-3 text-right">Ads Amount</th>
                    <th className="py-2.5 px-3 text-right">ROAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252831]/40 text-xs">
                  {filteredCampaigns.map((camp) => (
                    <tr
                      key={camp.id}
                      onClick={() => setCurrentView('studio')}
                      className="hover:bg-[#1A1D24]/60 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={camp.thumbnails[0]}
                            alt={camp.name}
                            className="w-9 h-9 rounded-xl object-cover border border-[#343842] shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-[#F0F1F7]">{camp.name}</div>
                            <div className="text-[11px] text-[#727681]">{camp.objective}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-[#A0A1AA]">{camp.channel}</td>
                      {/* Impressions + Inline Bar */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono tabular-nums text-[#F0F1F7] w-20 text-right">
                            {camp.impressions.toLocaleString()}
                          </span>
                          <div className="w-24 h-2 bg-[#1A1D24] rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-[#5BB8F6] rounded-sm"
                              style={{ width: `${(camp.impressions / maxCampaignImpressions) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      {/* % Delta */}
                      <td className="py-3.5 px-3 font-mono tabular-nums">
                        <span className={camp.impressionsDelta.startsWith('+') ? 'text-[#66D4AA]' : 'text-[#F18E87]'}>
                          {camp.impressionsDelta}
                        </span>
                      </td>
                      {/* Link Clicks + Inline Bar */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono tabular-nums text-[#F0F1F7] w-16 text-right">
                            {camp.linkClicks.toLocaleString()}
                          </span>
                          <div className="w-24 h-2 bg-[#1A1D24] rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-[#5BB8F6] rounded-sm"
                              style={{ width: `${(camp.linkClicks / maxCampaignClicks) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      {/* CTR + Inline Bar */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono tabular-nums text-[#F0F1F7] w-12 text-right">
                            {camp.ctr.toFixed(2)}%
                          </span>
                          <div className="w-16 h-2 bg-[#1A1D24] rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-[#BEB0F4] rounded-sm"
                              style={{ width: `${(camp.ctr / 5.0) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      {/* Spend */}
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#F0F1F7]">
                        ${camp.spend.toLocaleString()}
                      </td>
                      {/* ROAS */}
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums font-bold text-[#66D4AA]">
                        {camp.roas}x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
