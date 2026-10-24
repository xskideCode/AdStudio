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
  RotateCcw
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
    setCurrentView,
    resetDemo
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
    <header className="relative flex items-center justify-between h-14 md:h-16 px-4 md:px-6 xl:px-8 border-b border-[#252831]/40 bg-[#08090B] select-none shrink-0 z-20">
      {/* Left: Mobile Logo + Page Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={() => setCurrentView('overview')}
          className="md:hidden w-8 h-8 rounded-xl bg-[#ACD9F3] flex items-center justify-center shadow-sm shrink-0 cursor-pointer"
          title="AdStudio Home"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 7.5C15.5 5.8 13.1 5 10.6 5.4C7.2 6 4.8 9.1 5.1 12.6C5.4 16.1 8.4 18.8 11.9 18.8C14.3 18.8 16.4 17.6 17.5 15.8"
              stroke="#08090B"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <circle cx="17.5" cy="12" r="2.2" fill="#08090B" />
          </svg>
        </button>
        <h1 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-tight text-[#F0F1F7] font-heading truncate">
          {getTitle()}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Capsule */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center justify-center sm:justify-start gap-2.5 w-9 h-9 sm:w-auto sm:h-10 sm:px-3.5 sm:py-1.5 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-xs text-[#727681] transition-colors cursor-pointer group"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#727681] group-hover:text-[#A0A1AA] shrink-0" />
          <span className="hidden sm:inline-block w-32 md:w-44 lg:w-56 xl:w-72 text-left truncate text-[#727681]">
            Search campaigns, creatives, as...
          </span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#A0A1AA] bg-[#1A1D24] border border-[#343842] rounded">
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
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 h-9 sm:h-10 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-xs text-[#F0F1F7] font-medium transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 rounded-md bg-[#F4C36A] text-[#121419] font-bold text-xs flex items-center justify-center shrink-0">
              M
            </div>
            <span className="hidden sm:inline">Mochi & Bean</span>
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
                className="w-full text-left px-3 py-1.5 text-xs text-[#A0A1AA] hover:text-[#F0F1F7] hover:bg-[#1A1D24] transition-colors cursor-pointer"
              >
                Brand Settings & Brain
              </button>
              <button 
                onClick={() => setIsBrandSwitcherOpen(false)}
                className="w-full text-left px-3 py-1.5 text-xs text-[#A0A1AA] hover:text-[#F0F1F7] hover:bg-[#1A1D24] transition-colors cursor-pointer"
              >
                + Add another brand
              </button>
              <div className="h-px bg-[#252831] my-1" />
              <button
                onClick={() => {
                  resetDemo();
                  setIsBrandSwitcherOpen(false);
                }}
                className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-[#F4C36A] hover:bg-[#1A1D24] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset demo state</span>
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
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] rounded-full text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-2 h-2 rounded-full bg-[#ACD9F3]" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#121419] border border-[#343842] rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in duration-150">
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
              className="flex items-center gap-2 px-3 sm:px-4 py-2 h-9 sm:h-10 bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] rounded-full text-xs font-medium text-[#F0F1F7] transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A0A1AA] shrink-0" />
              <span className="hidden xs:inline sm:inline">Awaiting approval</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLaunchModalOpen(true)}
              disabled={selectedCount === 0}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 h-9 sm:h-10 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedCount > 0
                  ? 'bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B]'
                  : 'bg-[#252831] text-[#727681] cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              <span>Launch {selectedCount} <span className="hidden sm:inline">creatives</span></span>
            </button>
          )
        ) : currentView === 'performance' ? (
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 h-9 sm:h-10 bg-[#121419] hover:bg-[#1A1D24] border border-[#252831] hover:border-[#343842] rounded-full text-xs font-medium text-[#ACD9F3] transition-colors cursor-pointer"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Export report</span>
          </button>
        ) : (
          <button
            onClick={startNewCampaignFlow}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 h-9 sm:h-10 bg-[#ACD9F3] hover:bg-[#bde3f7] rounded-full text-xs font-semibold text-[#08090B] transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">New campaign</span>
            <span className="sm:hidden">New</span>
          </button>
        )}
      </div>
    </header>
  );
};
