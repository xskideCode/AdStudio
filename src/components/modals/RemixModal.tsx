import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  FlaskConical 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';

export const RemixModal: React.FC = () => {
  const { 
    isRemixModalOpen, 
    setIsRemixModalOpen, 
    confirmRemix19Ads 
  } = useApp();

  const [keepToggle, setKeepToggle] = useState(true);
  const [metaSelected, setMetaSelected] = useState(true);
  const [tiktokSelected, setTiktokSelected] = useState(true);

  if (!isRemixModalOpen) return null;

  const handleRemix = (e: React.FormEvent) => {
    e.preventDefault();
    confirmRemix19Ads();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[820px] bg-[#121419] border border-[#343842] rounded-[34px] p-7 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#252831]/50 mb-5">
          <div>
            <h3 className="text-xl font-bold text-[#F0F1F7] font-heading">
              Remix 19 ads
            </h3>
            <p className="text-xs text-[#A0A1AA] mt-0.5">
              Next best action · Put more dogs outdoors, fewer packshots
            </p>
          </div>
          <button
            onClick={() => setIsRemixModalOpen(false)}
            className="text-[#727681] hover:text-[#F0F1F7] p-1.5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleRemix} className="flex flex-col gap-5">
          {/* Upper Section: Before/After (Left) & Configuration (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {/* Left: Before/After Comparison */}
            <div className="flex items-center justify-center gap-3 p-3 bg-[#1A1D24]/60 rounded-2xl border border-[#252831]">
              {/* Now */}
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#343842] shadow-sm">
                  <img
                    src={DOG_IMAGES.blueCapWhite}
                    alt="Now white background"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-[#F0F1F7]">Now</div>
                  <div className="text-[10px] text-[#727681]">White background</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-7 h-7 rounded-full bg-[#252831] flex items-center justify-center text-[#A0A1AA] shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Remix */}
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#ACD9F3] shadow-md ring-2 ring-[#ACD9F3]/20">
                  <img
                    src={DOG_IMAGES.corgiOutdoors}
                    alt="Remix lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-[#ACD9F3]">Remix</div>
                  <div className="text-[10px] text-[#727681]">Lifestyle, outdoors</div>
                </div>
              </div>
            </div>

            {/* Right: Configuration Fields */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-medium text-[#727681] block mb-1">
                  Applies to
                </label>
                <div className="p-2.5 bg-[#1A1D24] border border-[#252831] rounded-xl text-xs font-semibold text-[#F0F1F7]">
                  19 live ads on Meta and TikTok
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#727681] block mb-1">
                  Keeps
                </label>
                <div className="flex items-center justify-between p-2.5 bg-[#1A1D24] border border-[#252831] rounded-xl text-xs text-[#F0F1F7] cursor-pointer">
                  <span>Hook, copy and call to action</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#727681] block mb-1">
                  Changes
                </label>
                <div className="flex items-center justify-between p-2.5 bg-[#1A1D24] border border-[#252831] rounded-xl text-xs text-[#F0F1F7] cursor-pointer">
                  <span>Visual only: lifestyle photo</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
                </div>
              </div>
            </div>
          </div>

          {/* Channels Selection Cards */}
          <div>
            <div className="text-[11px] font-medium text-[#727681] uppercase tracking-wider mb-2">
              Channels
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Meta */}
              <div
                onClick={() => setMetaSelected(!metaSelected)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  metaSelected
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#ACD9F3] text-lg font-bold">∞</span>
                  <div>
                    <div className="text-xs font-semibold text-[#F0F1F7]">Meta</div>
                    <div className="text-[10px] text-[#727681]">11 ads</div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    metaSelected
                      ? 'bg-[#ACD9F3] text-[#08090B]'
                      : 'border border-[#727681]'
                  }`}
                >
                  {metaSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* TikTok */}
              <div
                onClick={() => setTiktokSelected(!tiktokSelected)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  tiktokSelected
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#ACD9F3] text-sm">♪</span>
                  <div>
                    <div className="text-xs font-semibold text-[#F0F1F7]">TikTok</div>
                    <div className="text-[10px] text-[#727681]">8 ads</div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    tiktokSelected
                      ? 'bg-[#ACD9F3] text-[#08090B]'
                      : 'border border-[#727681]'
                  }`}
                >
                  {tiktokSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Google (Disabled) */}
              <div className="p-3 rounded-2xl border border-[#252831] bg-[#121419] opacity-50 cursor-not-allowed flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#F4C36A] font-bold text-xs">G</span>
                  <div>
                    <div className="text-xs font-semibold text-[#727681]">Google</div>
                    <div className="text-[10px] text-[#727681]">None to remix</div>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border border-[#252831]" />
              </div>
            </div>
          </div>

          {/* Keep Originals Live Toggle Card */}
          <div className="flex items-center justify-between p-3.5 bg-[#1A1D24] border border-[#252831] rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#252831] flex items-center justify-center text-[#ACD9F3]">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F0F1F7]">
                  Keep the originals live until the remixes win
                </div>
                <div className="text-[11px] text-[#727681]">
                  Each remix runs against its original for 5,000 impressions
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setKeepToggle(!keepToggle)}
              className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                keepToggle ? 'bg-[#ACD9F3]' : 'bg-[#252831]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#08090B] absolute top-1 transition-transform ${
                  keepToggle ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Footer Note & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#252831]/50 text-xs">
            {/* Approver Note */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#F4C36A] text-[#121419] font-bold text-[10px] flex items-center justify-center">
                MO
              </div>
              <span className="text-[11px] text-[#A0A1AA]">
                Maya Ortiz approves brand before anything goes live
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsRemixModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-[#A0A1AA] hover:text-[#F0F1F7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B] font-semibold text-xs transition-colors cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Remix 19 ads</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
