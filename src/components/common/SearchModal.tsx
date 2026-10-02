import React, { useState } from 'react';
import { Search, Megaphone, Wand2, Folder, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setCurrentView } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const mockItems = [
    { title: 'Dog Cap launch', category: 'Campaigns', type: 'campaign', view: 'studio' as const, sub: '12 concepts · 36 variations' },
    { title: 'Corgi cap, big smile (UGC-042)', category: 'Creatives', type: 'creative', view: 'studio' as const, sub: 'Video 9:16 · 4.8% CTR' },
    { title: 'Walk Season · Prospecting', category: 'Campaigns', type: 'campaign', view: 'performance' as const, sub: 'TikTok · 3.6x frequency' },
    { title: 'Mochi and Bean brand guidelines.pdf', category: 'Assets', type: 'asset', view: 'brand_brain' as const, sub: 'Guidelines · 38 pages' },
    { title: 'Lifestyle photo outdoor walk', category: 'Elements', type: 'element', view: 'performance' as const, sub: '+32% CTR lift' },
  ];

  const filtered = query.trim()
    ? mockItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()))
    : mockItems;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-xl bg-[#121419] border border-[#343842] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#252831]">
          <Search className="w-5 h-5 text-[#727681]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns, creatives, assets..."
            className="flex-1 bg-transparent text-sm text-[#F0F1F7] placeholder-[#727681] outline-none font-sans"
            autoFocus
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono text-[#A0A1AA] bg-[#1A1D24] border border-[#343842] rounded-md">
            ESC
          </kbd>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-[#727681] hover:text-[#F0F1F7] p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto divide-y divide-[#1A1D24]/50">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#727681]">No matching items found</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCurrentView(item.view);
                  setIsSearchOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A1D24] cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#252831] flex items-center justify-center text-[#ACD9F3]">
                    {item.type === 'campaign' && <Megaphone className="w-4 h-4" />}
                    {item.type === 'creative' && <Wand2 className="w-4 h-4" />}
                    {item.type === 'asset' && <Folder className="w-4 h-4" />}
                    {item.type === 'element' && <Search className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#F0F1F7] group-hover:text-[#ACD9F3] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#727681]">{item.sub}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#A0A1AA] px-2 py-0.5 bg-[#1A1D24] rounded-md border border-[#252831]">
                    {item.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#727681] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
