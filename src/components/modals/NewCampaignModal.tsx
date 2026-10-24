import React, { useState } from 'react';
import { 
  Sparkles, 
  Paperclip, 
  Mic, 
  Target, 
  ShoppingBag, 
  Users, 
  Info, 
  X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NewCampaignModal: React.FC = () => {
  const { 
    isNewCampaignModalOpen, 
    setIsNewCampaignModalOpen, 
    submitInitialPromptToWriteBrief 
  } = useApp();

  const [promptText, setPromptText] = useState('Launch our new dog cap collection');
  const [isMicActive, setIsMicActive] = useState(false);

  if (!isNewCampaignModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInitialPromptToWriteBrief(promptText);
  };

  const toggleMic = () => {
    setIsMicActive(!isMicActive);
    if (!isMicActive) {
      setPromptText('Launch our summer corduroy dog cap collection with ear holes');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[540px] max-h-[90dvh] overflow-y-auto bg-[#121419] border border-[#343842] rounded-3xl sm:rounded-[32px] p-5 sm:p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Sparkle Icon */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#BEB0F4]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#F0F1F7] font-heading">New campaign</h3>
            <p className="text-xs text-[#A0A1AA] mt-0.5">
              Say it in one line. AdStudio drafts the brief from your Brand Brain.
            </p>
          </div>
          <button
            onClick={() => setIsNewCampaignModalOpen(false)}
            className="text-[#727681] hover:text-[#F0F1F7] p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Textarea Card */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value.slice(0, 500))}
              rows={2}
              className="w-full bg-transparent text-sm text-[#F0F1F7] placeholder-[#727681] outline-none resize-none font-sans leading-relaxed"
              placeholder="What are we promoting?"
              autoFocus
            />
            <div className="flex items-center justify-between pt-2 border-t border-[#252831]/40 text-xs">
              <div className="flex items-center gap-3 text-[#727681]">
                <button
                  type="button"
                  className="hover:text-[#F0F1F7] cursor-pointer"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`cursor-pointer ${isMicActive ? 'text-[#ACD9F3] animate-pulse' : 'hover:text-[#F0F1F7]'}`}
                  title="Voice input simulation"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[11px] font-mono text-[#727681]">
                {promptText.length} / 500
              </span>
            </div>
          </div>

          {/* Filled in from your Brand Brain */}
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="flex items-center gap-2 text-xs text-[#A0A1AA] font-medium">
              <span className="text-[#BEB0F4]">🧠</span>
              <span>Filled in from your Brand Brain</span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Objective */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1A1D24]/60 border border-[#252831]/60 text-xs">
                <Target className="w-4 h-4 text-[#ACD9F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#727681] block">Objective</span>
                  <span className="text-[#F0F1F7] font-medium">Product launch</span>
                </div>
              </div>

              {/* Product */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1A1D24]/60 border border-[#252831]/60 text-xs">
                <ShoppingBag className="w-4 h-4 text-[#ACD9F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#727681] block">Product</span>
                  <span className="text-[#F0F1F7] font-medium">Dog Cap Collection · 5 assets</span>
                </div>
              </div>

              {/* Audience */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1A1D24]/60 border border-[#252831]/60 text-xs">
                <Users className="w-4 h-4 text-[#ACD9F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#727681] block">Audience</span>
                  <span className="text-[#F0F1F7] font-medium">Women 25 to 40 · United States</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center gap-2 text-[11px] text-[#727681] pt-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Brand Brain is on: your tone, visuals and guardrails apply.</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#252831]/50">
            <button
              type="button"
              onClick={() => setIsNewCampaignModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B] font-semibold text-xs transition-colors cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Write the brief</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
