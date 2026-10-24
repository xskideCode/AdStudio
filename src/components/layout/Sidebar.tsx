import React, { useState } from 'react';
import {
  LayoutGrid,
  Megaphone,
  Wand2,
  Folder,
  Brain,
  TrendingUp,
  FlaskConical,
  Lightbulb,
  Users,
  Settings,
  HelpCircle,
  MoreHorizontal,
  RotateCcw,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, resetDemo } = useApp();
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const navItems: { id: ViewType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'studio', label: 'Studio', icon: Wand2 },
    { id: 'assets', label: 'Assets', icon: Folder },
    { id: 'brand_brain', label: 'Brand Brain', icon: Brain },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'team', label: 'Team', icon: Users },
  ];

  const primaryMobileItems = navItems.filter((item) =>
    ['overview', 'campaigns', 'studio', 'brand_brain', 'performance'].includes(item.id)
  );

  const secondaryMobileItems: { id: ViewType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'assets', label: 'Assets', icon: Folder },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Desktop & Tablet Vertical Rail */}
      <aside className="hidden md:flex w-[88px] lg:w-[96px] h-full flex-col items-center py-4 lg:py-5 select-none shrink-0 border-r border-[#1A1D24]/80 bg-[#08090B] z-30">
        {/* App Logo */}
        <div
          onClick={() => setCurrentView('overview')}
          className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-[#ACD9F3] flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform mb-4 shrink-0"
          title="AdStudio Home"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="#08090B" strokeWidth="3.5" />
            <circle cx="12" cy="12" r="3" fill="#08090B" />
          </svg>
        </div>

        {/* Nav Rail Items */}
        <nav className="flex-1 flex flex-col items-center gap-1 lg:gap-1.5 w-full px-2 overflow-y-auto overflow-x-hidden scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'campaigns' && currentView === 'new_campaign_wizard');
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center justify-center w-full h-[58px] lg:h-[64px] rounded-2xl transition-all duration-150 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#1A1D24] text-[#F0F1F7] shadow-inner'
                    : 'text-[#727681] hover:text-[#A0A1AA] hover:bg-[#121419]/60'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-[#ACD9F3]' : ''}`} />
                <span className="text-[11px] font-medium tracking-tight text-center leading-tight whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-2 lg:gap-2.5 w-full px-2 pt-3 border-t border-[#1A1D24]/60 shrink-0">
          <button
            onClick={() => setCurrentView('settings')}
            className={`flex flex-col items-center justify-center w-full py-1.5 rounded-xl transition-colors cursor-pointer ${
              currentView === 'settings'
                ? 'text-[#ACD9F3] bg-[#1A1D24]'
                : 'text-[#727681] hover:text-[#A0A1AA]'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">Settings</span>
          </button>

          <button
            onClick={() => setCurrentView('help')}
            className={`flex flex-col items-center justify-center w-full py-1.5 rounded-xl transition-colors cursor-pointer ${
              currentView === 'help'
                ? 'text-[#ACD9F3] bg-[#1A1D24]'
                : 'text-[#727681] hover:text-[#A0A1AA]'
            }`}
            title="Help"
          >
            <HelpCircle className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">Help</span>
          </button>

          {/* User Nizam Avatar */}
          <div
            onClick={() => setCurrentView('team')}
            className="relative w-9 h-9 rounded-full overflow-hidden border border-[#343842] hover:border-[#ACD9F3] transition-colors cursor-pointer mt-0.5"
            title="Nizam (Account Owner)"
          >
            <svg viewBox="0 0 40 40" className="w-full h-full bg-[#252831]">
              <circle cx="20" cy="15" r="9" fill="#F4C36A" />
              <path d="M 8 36 C 8 26, 32 26, 32 36" fill="#ACD9F3" />
              <circle cx="17" cy="14" r="1.5" fill="#121419" />
              <circle cx="23" cy="14" r="1.5" fill="#121419" />
              <rect x="15" y="13" width="10" height="2.5" rx="1" fill="#121419" />
              <path d="M 18 18 Q 20 20 22 18" stroke="#121419" strokeWidth="1.2" fill="none" />
            </svg>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-[#08090B]/95 backdrop-blur-md border-t border-[#1A1D24] flex items-center justify-around px-1 select-none">
        {primaryMobileItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentView === item.id ||
            (item.id === 'campaigns' && currentView === 'new_campaign_wizard');
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setMobileMoreOpen(false);
              }}
              className={`flex flex-col items-center justify-center flex-1 h-12 rounded-xl transition-colors cursor-pointer ${
                isActive ? 'text-[#ACD9F3] bg-[#1A1D24]/80' : 'text-[#727681] hover:text-[#A0A1AA]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium truncate max-w-[64px]">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setMobileMoreOpen((prev) => !prev)}
          className={`flex flex-col items-center justify-center flex-1 h-12 rounded-xl transition-colors cursor-pointer ${
            mobileMoreOpen || secondaryMobileItems.some((s) => s.id === currentView)
              ? 'text-[#ACD9F3] bg-[#1A1D24]/80'
              : 'text-[#727681] hover:text-[#A0A1AA]'
          }`}
        >
          <MoreHorizontal className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>

      {/* Mobile More Drawer */}
      {mobileMoreOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end"
          onClick={() => setMobileMoreOpen(false)}
        >
          <div
            className="w-full bg-[#121419] border-t border-[#343842] rounded-t-3xl p-5 pb-8 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#252831]">
              <span className="text-sm font-semibold text-[#F0F1F7] font-heading">
                Workspace Navigation
              </span>
              <button
                onClick={() => setMobileMoreOpen(false)}
                className="p-1 text-[#727681] hover:text-[#F0F1F7]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {secondaryMobileItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMoreOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-colors ${
                      isActive
                        ? 'bg-[#1A1D24] border-[#ACD9F3] text-[#F0F1F7]'
                        : 'bg-[#1A1D24]/50 border-[#252831] text-[#A0A1AA]'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1.5 text-[#ACD9F3]" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                resetDemo();
                setMobileMoreOpen(false);
              }}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-[#1A1D24] border border-[#343842] text-xs font-medium text-[#A0A1AA] hover:text-[#F0F1F7] flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset demo state</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
