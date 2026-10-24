import React from 'react';
import { Settings as SettingsIcon, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';

export const OtherViews: React.FC = () => {
  const { currentView, setCurrentView, startNewCampaignFlow } = useApp();

  if (currentView === 'campaigns') {
    return (
      <div className="flex-1 p-4 md:p-6 xl:p-8 pb-24 md:pb-6 xl:pb-8 overflow-y-auto animate-in fade-in duration-200">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#252831]/60 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#F0F1F7] font-heading">Campaigns</h2>
            <p className="text-xs text-[#727681] mt-0.5">Manage and track your active and drafting ad campaigns</p>
          </div>
          <button
            onClick={startNewCampaignFlow}
            className="px-4 py-2 bg-[#ACD9F3] text-[#08090B] font-semibold text-xs rounded-full hover:bg-[#bde3f7] transition-colors cursor-pointer"
          >
            + New campaign
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
          <div
            onClick={() => setCurrentView('studio')}
            className="p-5 bg-[#121419] border border-[#252831] hover:border-[#ACD9F3] rounded-3xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ACD9F3]/15 text-[#ACD9F3] border border-[#ACD9F3]/30">
                  Studio Ready
                </span>
                <span className="text-xs text-[#727681]">Generated 2 min ago</span>
              </div>
              <h3 className="text-lg font-bold text-[#F0F1F7] font-heading group-hover:text-[#ACD9F3] transition-colors">
                Dog Cap launch
              </h3>
              <p className="text-xs text-[#A0A1AA] mt-1">12 concepts · 36 variations · Hook 1 & 2 ready</p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#252831]">
              <img src={DOG_IMAGES.corgiOutdoors} alt="Corgi" className="w-8 h-8 rounded-lg object-cover" />
              <img src={DOG_IMAGES.pinkCap} alt="Pink" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-xs text-[#ACD9F3] ml-auto flex items-center gap-1 font-medium">
                Open Studio <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div
            onClick={() => setCurrentView('performance')}
            className="p-5 bg-[#121419] border border-[#252831] hover:border-[#343842] rounded-3xl cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#66D4AA]/15 text-[#66D4AA] border border-[#66D4AA]/30">
                  Active Live
                </span>
                <span className="text-xs text-[#727681]">TikTok · $16.1k spend</span>
              </div>
              <h3 className="text-lg font-bold text-[#F0F1F7] font-heading">
                Walk Season · Prospecting
              </h3>
              <p className="text-xs text-[#A0A1AA] mt-1">Targeting US Dog Owners 25-45 · 3.4x ROAS</p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#252831]">
              <span className="text-xs text-[#727681]">Frequency: 3.6x</span>
              <span className="text-xs text-[#ACD9F3] ml-auto flex items-center gap-1 font-medium">
                View Performance <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div
            onClick={() => setCurrentView('performance')}
            className="p-5 bg-[#121419] border border-[#252831] hover:border-[#343842] rounded-3xl cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4C36A]/15 text-[#F4C36A] border border-[#F4C36A]/30">
                  Fatigue Watch
                </span>
                <span className="text-xs text-[#727681]">Meta · $27.9k spend</span>
              </div>
              <h3 className="text-lg font-bold text-[#F0F1F7] font-heading">
                Dog Caps · Retargeting
              </h3>
              <p className="text-xs text-[#A0A1AA] mt-1">Site visitors & cart abandoners · 3.9x ROAS</p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#252831]">
              <span className="text-xs text-[#F4C36A]">Frequency: 4.2x</span>
              <span className="text-xs text-[#ACD9F3] ml-auto flex items-center gap-1 font-medium">
                Inspect Elements <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
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
          <p className="text-xs text-[#727681] mt-0.5">High-resolution photography, video clips and vector marks for Mochi & Bean</p>
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
            <div key={i} className="bg-[#121419] border border-[#252831] hover:border-[#343842] rounded-2xl p-3 flex flex-col gap-2 transition-colors">
              <img src={asset.img} alt={asset.name} className="w-full aspect-square rounded-xl object-cover" />
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
          <p className="text-xs text-[#727681] mt-0.5">Brand compliance leads and creative contributors</p>
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
            <span className="text-xs text-[#ACD9F3] px-2.5 py-1 bg-[#1A1D24] rounded-full border border-[#252831] shrink-0 ml-2">Admin</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#121419] border border-[#252831] rounded-2xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#F4C36A] text-[#121419] font-bold flex items-center justify-center font-heading shrink-0">
                MO
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#F0F1F7] truncate">Maya Ortiz</div>
                <div className="text-xs text-[#727681] truncate">Head of Brand & Creative Director (Designated Approver)</div>
              </div>
            </div>
            <span className="text-xs text-[#66D4AA] px-2.5 py-1 bg-[#66D4AA]/10 rounded-full border border-[#66D4AA]/30 shrink-0 ml-2">Brand Approver</span>
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
          Configured for Mochi & Bean dog-cap brand with Brand Brain integration and active Meta & TikTok ad channels.
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
