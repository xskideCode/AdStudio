import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Send, 
  Calendar, 
  ChevronDown, 
  FlaskConical 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LaunchModal: React.FC = () => {
  const { 
    isLaunchModalOpen, 
    setIsLaunchModalOpen, 
    variations, 
    launchSelectedCreatives 
  } = useApp();

  const [dailyBudget, setDailyBudget] = useState('150');
  const [schedule, setSchedule] = useState('Tue 22 Sep to Mon 5 Oct');
  const [optimiseFor, setOptimiseFor] = useState('Purchases');
  const [channels, setChannels] = useState({
    meta: true,
    tiktok: true,
    google: false,
  });
  const [runAsExperiment, setRunAsExperiment] = useState(true);

  if (!isLaunchModalOpen) return null;

  const selectedVariations = variations.filter((v) => v.selected);

  const handleSendForApproval = (e: React.FormEvent) => {
    e.preventDefault();
    launchSelectedCreatives({
      budget: Number(dailyBudget) || 150,
      schedule,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[840px] bg-[#121419] border border-[#343842] rounded-[34px] p-7 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#252831]/50 mb-5">
          <div>
            <h3 className="text-xl font-bold text-[#F0F1F7] font-heading">
              Launch {selectedVariations.length} creatives
            </h3>
            <p className="text-xs text-[#A0A1AA] mt-0.5">
              Dog Cap launch · Hook 1 · The cap that stays on
            </p>
          </div>
          <button
            onClick={() => setIsLaunchModalOpen(false)}
            className="text-[#727681] hover:text-[#F0F1F7] p-1.5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSendForApproval} className="flex flex-col gap-5">
          {/* Upper Two Columns: Variations List (Left) & Budget / Schedule (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column: Variations List */}
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
              {selectedVariations.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#1A1D24] border border-[#252831]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-10 h-10 rounded-xl object-cover border border-[#343842]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#F0F1F7]">{v.title}</div>
                      <div className="text-[10px] text-[#727681]">
                        {v.format} {v.duration ? `· ${v.duration}` : ''}
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#66D4AA]/10 text-[#66D4AA] border border-[#66D4AA]/20">
                    <Check className="w-2.5 h-2.5" />
                    <span>On brand</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column: Settings Form */}
            <div className="flex flex-col gap-3.5">
              {/* Daily Budget */}
              <div>
                <label className="text-[11px] font-medium text-[#727681] block mb-1">
                  Daily budget
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-[#727681]">$</span>
                  <input
                    type="number"
                    min="1"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    className="w-full pl-7 pr-16 py-2.5 bg-[#1A1D24] border border-[#252831] focus:border-[#ACD9F3] rounded-xl text-xs font-mono font-semibold text-[#F0F1F7] outline-none"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-[#727681]">
                    per day
                  </span>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="text-[11px] font-medium text-[#727681] block mb-1">
                  Schedule
                </label>
                <div className="flex items-center justify-between p-2.5 bg-[#1A1D24] border border-[#252831] rounded-xl text-xs text-[#F0F1F7] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#ACD9F3]" />
                    <span>{schedule}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
                </div>
              </div>

              {/* Optimise for */}
              <div>
                <label className="text-[11px] font-medium text-[#727681] block mb-1">
                  Optimise for
                </label>
                <div className="flex items-center justify-between p-2.5 bg-[#1A1D24] border border-[#252831] rounded-xl text-xs text-[#F0F1F7] cursor-pointer">
                  <span>{optimiseFor}</span>
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
              {/* Meta Card */}
              <div
                onClick={() => setChannels({ ...channels, meta: !channels.meta })}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  channels.meta
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#ACD9F3] text-lg font-bold">∞</span>
                  <div>
                    <div className="text-xs font-semibold text-[#F0F1F7]">Meta</div>
                    <div className="text-[10px] text-[#727681]">Feed, Reels</div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    channels.meta
                      ? 'bg-[#ACD9F3] text-[#08090B]'
                      : 'border border-[#727681]'
                  }`}
                >
                  {channels.meta && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* TikTok Card */}
              <div
                onClick={() => setChannels({ ...channels, tiktok: !channels.tiktok })}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  channels.tiktok
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#ACD9F3] text-sm">♪</span>
                  <div>
                    <div className="text-xs font-semibold text-[#F0F1F7]">TikTok</div>
                    <div className="text-[10px] text-[#727681]">In-feed</div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    channels.tiktok
                      ? 'bg-[#ACD9F3] text-[#08090B]'
                      : 'border border-[#727681]'
                  }`}
                >
                  {channels.tiktok && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Google Card */}
              <div
                onClick={() => setChannels({ ...channels, google: !channels.google })}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  channels.google
                    ? 'bg-[#1A1D24] border-[#ACD9F3]'
                    : 'bg-[#121419] border-[#252831] opacity-70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#F4C36A] font-bold text-xs">G</span>
                  <div>
                    <div className="text-xs font-semibold text-[#F0F1F7]">Google</div>
                    <div className="text-[10px] text-[#727681]">Demand Gen</div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    channels.google
                      ? 'bg-[#ACD9F3] text-[#08090B]'
                      : 'border border-[#727681]'
                  }`}
                >
                  {channels.google && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>

          {/* Run as an experiment toggle card */}
          <div className="flex items-center justify-between p-3.5 bg-[#1A1D24] border border-[#252831] rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#252831] flex items-center justify-center text-[#ACD9F3]">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F0F1F7]">Run as an experiment</div>
                <div className="text-[11px] text-[#727681]">
                  Split budget evenly and pick a winner after 5,000 impressions each
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRunAsExperiment(!runAsExperiment)}
              className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                runAsExperiment ? 'bg-[#ACD9F3]' : 'bg-[#252831]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#08090B] absolute top-1 transition-transform ${
                  runAsExperiment ? 'right-1' : 'left-1'
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
                onClick={() => setIsLaunchModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-[#A0A1AA] hover:text-[#F0F1F7] cursor-pointer"
              >
                Save as draft
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B] font-semibold text-xs transition-colors cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send for approval</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
