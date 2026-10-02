import React, { useEffect, useState } from 'react';
import { Sparkles, Check, Loader2, Circle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';

export const GenerationModal: React.FC = () => {
  const { 
    isGeneratingModalOpen, 
    setIsGeneratingModalOpen, 
    completeGenerationAndGoToStudio 
  } = useApp();

  const [progressPct, setProgressPct] = useState(25);
  const [stepIndex, setStepIndex] = useState(2); // 0=Reading, 1=Expanding, 2=Writing, 3=Composing, 4=Brand check

  useEffect(() => {
    if (!isGeneratingModalOpen) {
      setProgressPct(25);
      setStepIndex(2);
      return;
    }

    const interval = setInterval(() => {
      setProgressPct((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            completeGenerationAndGoToStudio();
          }, 600);
          return 100;
        }
        const next = prev + 15;
        if (next > 40 && next <= 65) setStepIndex(3);
        if (next > 65 && next <= 90) setStepIndex(4);
        if (next > 90) setStepIndex(5);
        return next;
      });
    }, 550);

    return () => clearInterval(interval);
  }, [isGeneratingModalOpen]);

  if (!isGeneratingModalOpen) return null;

  const steps = [
    { label: 'Reading Brand Brain', doneAt: 0 },
    { label: 'Expanding the brief into 3 hooks', doneAt: 1 },
    { label: 'Writing copy for each hook', doneAt: 2 },
    { label: 'Composing visuals from 5 product assets', doneAt: 3 },
    { label: 'Running brand check', doneAt: 4 },
  ];

  const totalSegments = 24;
  const filledSegments = Math.round((progressPct / 100) * totalSegments);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[560px] bg-[#121419] border border-[#343842] rounded-[32px] p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#BEB0F4]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#F0F1F7] font-heading">Generating concepts</h3>
            <p className="text-xs text-[#A0A1AA] mt-0.5">
              12 concepts and 36 variations for Dog Cap launch
            </p>
          </div>
          <div className="text-sm font-bold font-mono text-[#BEB0F4]">
            {progressPct}%
          </div>
        </div>

        {/* Purple Segmented Progress Bar */}
        <div className="flex items-center gap-1 my-4">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < filledSegments ? 'bg-[#BEB0F4]' : 'bg-[#252831]'
              }`}
            />
          ))}
        </div>

        {/* Task Checklist */}
        <div className="flex flex-col gap-2.5 my-5 bg-[#1A1D24]/60 p-4 rounded-2xl border border-[#252831]/60">
          {steps.map((st, idx) => {
            const isDone = stepIndex > idx;
            const isWorking = stepIndex === idx;

            return (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {isDone ? (
                    <div className="w-4 h-4 rounded-full bg-[#ACD9F3] text-[#08090B] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : isWorking ? (
                    <div className="w-4 h-4 rounded-full border-2 border-[#BEB0F4] flex items-center justify-center animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BEB0F4]" />
                    </div>
                  ) : (
                    <Circle className="w-4 h-4 text-[#727681]" />
                  )}
                  <span className={isDone ? 'text-[#F0F1F7]' : isWorking ? 'text-[#BEB0F4] font-medium' : 'text-[#727681]'}>
                    {st.label}
                  </span>
                </div>

                <span className="text-[11px] font-mono">
                  {isDone && <span className="text-[#A0A1AA]">Done</span>}
                  {isWorking && <span className="text-[#BEB0F4]">Working</span>}
                </span>
              </div>
            );
          })}
        </div>

        {/* First Concepts Row */}
        <div>
          <div className="text-[11px] text-[#727681] font-semibold uppercase tracking-wider mb-2">
            First concepts
          </div>
          <div className="grid grid-cols-6 gap-2">
            {/* Slot 1 */}
            <div className="aspect-square rounded-xl overflow-hidden border border-[#343842] bg-[#1A1D24]">
              <img src={DOG_IMAGES.corgiOutdoors} alt="Concept 1" className="w-full h-full object-cover animate-in fade-in" />
            </div>

            {/* Slot 2 */}
            <div className="aspect-square rounded-xl overflow-hidden border border-[#343842] bg-[#1A1D24]">
              <img src={DOG_IMAGES.pinkCap} alt="Concept 2" className="w-full h-full object-cover animate-in fade-in" />
            </div>

            {/* Slot 3 */}
            <div className="aspect-square rounded-xl overflow-hidden border border-[#343842] bg-[#1A1D24]">
              <img src={DOG_IMAGES.blueCapWhite} alt="Concept 3" className="w-full h-full object-cover animate-in fade-in" />
            </div>

            {/* Slot 4 */}
            <div className="aspect-square rounded-xl overflow-hidden border border-[#252831] bg-[#1A1D24] flex items-center justify-center">
              {progressPct >= 60 ? (
                <img src={DOG_IMAGES.blueCapDetail} alt="Concept 4" className="w-full h-full object-cover animate-in fade-in" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-[#252831]" />
              )}
            </div>

            {/* Slot 5 */}
            <div className="aspect-square rounded-xl overflow-hidden border border-[#252831] bg-[#1A1D24] flex items-center justify-center">
              {progressPct >= 80 ? (
                <img src={DOG_IMAGES.mintCap} alt="Concept 5" className="w-full h-full object-cover animate-in fade-in" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-[#252831]" />
              )}
            </div>

            {/* Slot 6 */}
            <div className="aspect-square rounded-xl overflow-hidden border border-[#252831] bg-[#1A1D24] flex items-center justify-center">
              {progressPct >= 95 ? (
                <img src={DOG_IMAGES.capsFlatlay} alt="Concept 6" className="w-full h-full object-cover animate-in fade-in" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-[#252831]" />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-[#252831]/50 text-xs">
          <div className="flex items-center gap-2 text-[11px] text-[#727681]">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>You can leave this page. We will notify you when it is ready.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGeneratingModalOpen(false)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={completeGenerationAndGoToStudio}
              className="px-4 py-2 rounded-xl bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] text-xs font-semibold text-[#F0F1F7] transition-colors cursor-pointer"
            >
              Run in background
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
