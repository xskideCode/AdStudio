import React from 'react';
import { X, Sparkles, Loader2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';

export const RemixQueueModal: React.FC = () => {
  const { 
    isRemixQueueOpen, 
    setIsRemixQueueOpen, 
    remixRecord, 
    setRemixRecord 
  } = useApp();

  if (!isRemixQueueOpen || !remixRecord) return null;

  const handleDismiss = () => {
    setIsRemixQueueOpen(false);
  };

  const handleClearRemix = () => {
    setRemixRecord(null);
    setIsRemixQueueOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[560px] bg-[#121419] border border-[#343842] rounded-[32px] p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-[#252831]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#292638] border border-[#BEB0F4]/30 flex items-center justify-center text-[#BEB0F4]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F0F1F7] font-heading">
                Remix Job Status
              </h3>
              <p className="text-xs text-[#A0A1AA]">
                19 live ads on Meta and TikTok queued for lifestyle variations
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-[#727681] hover:text-[#F0F1F7] p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 flex flex-col gap-3">
          <div className="p-3 bg-[#1A1D24] rounded-2xl border border-[#252831] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 text-[#BEB0F4] animate-spin" />
              <div>
                <div className="font-semibold text-[#F0F1F7]">Remixing in background</div>
                <div className="text-[10px] text-[#727681]">Estimated completion: 3 min 40s</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[#BEB0F4] bg-[#292638] px-2.5 py-0.5 rounded-full border border-[#BEB0F4]/30">
              Queued
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#1A1D24]/60 rounded-xl text-xs">
            <img src={DOG_IMAGES.corgiOutdoors} alt="Outdoors" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <div className="text-xs font-semibold text-[#F0F1F7]">
                Target Visual: Lifestyle dog outdoors
              </div>
              <div className="text-[10px] text-[#727681]">
                Replacing 19 white-background shots. Originals remain live for 5,000 impressions.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-[#1A1D24] rounded-xl border border-[#252831]">
              <span className="text-[10px] text-[#727681] block">Meta Ads</span>
              <span className="font-mono font-semibold text-[#F0F1F7]">11 ad variations</span>
            </div>
            <div className="p-2.5 bg-[#1A1D24] rounded-xl border border-[#252831]">
              <span className="text-[10px] text-[#727681] block">TikTok Ads</span>
              <span className="font-mono font-semibold text-[#F0F1F7]">8 ad variations</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#252831] text-xs">
          <button
            onClick={handleClearRemix}
            className="text-[#F18E87] hover:underline cursor-pointer"
          >
            Cancel job
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 rounded-xl bg-[#ACD9F3] text-[#08090B] font-semibold cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
