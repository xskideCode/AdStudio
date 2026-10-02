import React from 'react';
import { 
  Search, 
  ChevronDown, 
  Bell, 
  Plus, 
  Send, 
  Clock, 
  Download, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentView,
    variations,
    approvalRecord,
    startNewCampaignFlow,
    setIsLaunchModalOpen,
    setIsApprovalDetailsOpen,
    setIsSearchOpen,
    isBrandSwitcherOpen,
    setIsBrandSwitcherOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    setCurrentView
  } = useApp();

  const getTitle = () => {
    switch (currentView) {
      case 'overview':
        return 'Overview';
      case 'brand_brain':
        return 'Brand Brain';
      case 'new_campaign_wizard':
        return 'New campaign';
      case 'studio':
        return 'Creative Studio';
      case 'performance':
        return 'Performance';
      case 'campaigns':
        return 'Campaigns';
      case 'assets':
        return 'Assets';
      case 'experiments':
        return 'Experiments';
      case 'insights':
        return 'Insights';
      case 'team':
        return 'Team';
      case 'settings':
        return 'Settings';
      case 'help':
        return 'Help & Documentation';
      default:
        return 'Overview';
    }
  };

  const selectedCount = variations.filter((v) => v.selected).length;

  const handleExportReport = () => {
    // Deterministic CSV export
    const headers = 'Creative Element,Type,Used In,CTR,Lift\n';
    const rows = [
      '"Lifestyle photo, dog outdoors","Visual","31 ads","3.7%","+32%"',
      '"The cap that stays on","Hook","18 ads","3.5%","+24%"',
      '"Dog face in the first 2 seconds","Opening","22 ads","3.4%","+21%"',
      '"Video 9:16 under 15s","Format","27 ads","3.3%","+18%"',
      '"Pink cap","Colour","14 ads","3.1%","+11%"',
      '"Shop Dog Caps","Call to action","40 ads","3.0%","+6%"',
      '"White-background product shot","Visual","19 ads","2.6%","-8%"',
      '"Vet reviewed sizing, no fuss","Hook","9 ads","2.3%","-17%"',
    ].join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AdStudio_Performance_Elements_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="relative flex items-center justify-between h-14 px-6 select-none shrink-0 z-20">
      {/* Title */}
      <h1 className="text-[26px] font-semibold tracking-tight text-[#F0F1F7] font-heading">
        {getTitle()}
      </h1>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Capsule (Reference: Search campaigns, creatives, as... ⌘K) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-3 px-3.5 py-1.5 h-10 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-xs text-[#727681] transition-colors cursor-pointer group"
          title="Search (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-[#727681] group-hover:text-[#A0A1AA]" />
          <span className="w-40 text-left truncate text-[#727681]">Search campaigns, creatives, as...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[#A0A1AA] bg-[#1A1D24] border border-[#343842] rounded">
            ⌘K
          </kbd>
        </button>

        {/* Brand Switcher Capsule */}
        <div className="relative">
          <button
            onClick={() => {
              setIsBrandSwitcherOpen(!isBrandSwitcherOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 h-10 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-xs text-[#F0F1F7] font-medium transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 rounded-md bg-[#F4C36A] text-[#121419] font-bold text-xs flex items-center justify-center">
              M
            </div>
            <span>Mochi & Bean</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
          </button>

          {isBrandSwitcherOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#121419] border border-[#343842] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#727681] uppercase tracking-wider">
                Active Brand
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-[#1A1D24] text-xs text-[#F0F1F7] cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#F4C36A] text-[#121419] font-bold text-xs flex items-center justify-center">
                    M
                  </div>
                  <span className="font-medium">Mochi & Bean</span>
                </div>
                <Check className="w-4 h-4 text-[#ACD9F3]" />
              </div>
              <div className="h-px bg-[#252831] my-1" />
              <button 
                onClick={() => {
                  setCurrentView('brand_brain');
                  setIsBrandSwitcherOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-[#A0A1AA] hover:text-[#F0F1F7] hover:bg-[#1A1D24] transition-colors"
              >
                Brand Settings & Brain
              </button>
              <button 
                onClick={() => setIsBrandSwitcherOpen(false)}
                className="w-full text-left px-3 py-1.5 text-xs text-[#A0A1AA] hover:text-[#F0F1F7] hover:bg-[#1A1D24] transition-colors"
              >
                + Add another brand
              </button>
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsBrandSwitcherOpen(false);
            }}
            className="relative flex items-center justify-center w-10 h-10 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ACD9F3]" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#121419] border border-[#343842] rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in duration-150">
              <div className="px-4 pb-2 border-b border-[#252831] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F0F1F7]">Notifications</span>
                <span className="text-[10px] text-[#ACD9F3] cursor-pointer">Mark read</span>
              </div>
              <div className="divide-y divide-[#252831]/40 max-h-64 overflow-y-auto">
                <div className="px-4 py-2.5 hover:bg-[#1A1D24] text-xs">
                  <div className="text-[#F0F1F7] font-medium">Brand Brain synced</div>
                  <div className="text-[11px] text-[#727681]">6 sources updated · 2 hours ago</div>
                </div>
                <div className="px-4 py-2.5 hover:bg-[#1A1D24] text-xs">
                  <div className="text-[#F0F1F7] font-medium">AI detected pattern</div>
                  <div className="text-[11px] text-[#727681]">Lifestyle photos beat white-bg by 32% CTR</div>
                </div>
                {approvalRecord && (
                  <div className="px-4 py-2.5 hover:bg-[#1A1D24] text-xs">
                    <div className="text-[#ACD9F3] font-medium">Approval pending</div>
                    <div className="text-[11px] text-[#727681]">{approvalRecord.variationsCount} creatives awaiting Maya Ortiz</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Context Button */}
        {currentView === 'studio' ? (
          approvalRecord ? (
            <button
              onClick={() => setIsApprovalDetailsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 h-10 bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] rounded-full text-xs font-medium text-[#F0F1F7] transition-colors cursor-pointer"
            >
              <Clock className="w-4 h-4 text-[#A0A1AA]" />
              <span>Awaiting approval</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLaunchModalOpen(true)}
              disabled={selectedCount === 0}
              className={`flex items-center gap-2 px-4 py-2 h-10 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedCount > 0
                  ? 'bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B]'
                  : 'bg-[#252831] text-[#727681] cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch {selectedCount} creatives</span>
            </button>
          )
        ) : currentView === 'performance' ? (
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 h-10 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] hover:border-[#343842] rounded-full text-xs font-medium text-[#ACD9F3] transition-colors cursor-pointer"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export report</span>
          </button>
        ) : (
          <button
            onClick={startNewCampaignFlow}
            className="flex items-center gap-2 px-4 py-2 h-10 bg-[#ACD9F3] hover:bg-[#bde3f7] rounded-full text-xs font-semibold text-[#08090B] transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New campaign</span>
          </button>
        )}
      </div>
    </header>
  );
};
