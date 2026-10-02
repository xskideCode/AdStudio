import React from 'react';
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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

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

  return (
    <aside className="w-[96px] h-full flex flex-col items-center py-5 select-none shrink-0 border-r border-[#1A1D24]/60 z-30">
      {/* App Logo (Blue rounded square with dark circular emblem) */}
      <div 
        onClick={() => setCurrentView('overview')}
        className="w-11 h-11 rounded-2xl bg-[#ACD9F3] flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform mb-4"
        title="AdStudio Home"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="#08090B" strokeWidth="3.5" />
          <circle cx="12" cy="12" r="3" fill="#08090B" />
        </svg>
      </div>

      {/* Nav Rail Items */}
      <nav className="flex-1 flex flex-col items-center gap-1.5 w-full px-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentView === item.id ||
            (item.id === 'campaigns' && currentView === 'new_campaign_wizard');
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-[64px] rounded-2xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#1A1D24] text-[#F0F1F7] shadow-inner'
                  : 'text-[#727681] hover:text-[#A0A1AA] hover:bg-[#121419]/60'
              }`}
              title={item.label}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-[#ACD9F3]' : ''}`} />
              <span className="text-[11px] font-medium tracking-tight text-center leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 w-full px-2 pt-3 border-t border-[#1A1D24]/40">
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
          className="relative w-9 h-9 rounded-full overflow-hidden border border-[#343842] hover:border-[#ACD9F3] transition-colors cursor-pointer mt-1"
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
  );
};
