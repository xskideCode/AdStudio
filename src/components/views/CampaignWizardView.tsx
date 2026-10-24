import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Paperclip, 
  Mic, 
  RotateCw, 
  Target, 
  ShoppingBag, 
  Users, 
  Megaphone, 
  Check, 
  Edit2, 
  Layers, 
  Video, 
  Image as ImageIcon,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CampaignWizardView: React.FC = () => {
  const { 
    campaignDraft, 
    setCampaignDraft, 
    startGeneratingConcepts, 
    setCurrentView 
  } = useApp();

  const [activeStep, setActiveStep] = useState<number>(4);
  const [editingHookId, setEditingHookId] = useState<number | null>(null);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const expandAlternatives = [
    {
      keyMessage: 'A soft corduroy cap dogs actually keep on: ear holes, chin cord, made for sunny walks.',
      hooks: [
        { id: 1, title: 'Hook 1', text: 'The cap that stays on: ear holes and a chin cord', predictedStrength: 5 },
        { id: 2, title: 'Hook 2', text: 'Walk tested: 30 days, zero head shakes', predictedStrength: 4 },
        { id: 3, title: 'Hook 3', text: 'Vet reviewed sizing, machine washable, no fuss', predictedStrength: 3 },
      ],
    },
    {
      keyMessage: 'Finally, sun protection designed around canine anatomy. Secure, gentle, ultra-photogenic.',
      hooks: [
        { id: 1, title: 'Hook 1', text: 'Zero ear pinch. 100% wag guaranteed.', predictedStrength: 5 },
        { id: 2, title: 'Hook 2', text: 'The secret to happy dogs in high summer sun.', predictedStrength: 4 },
        { id: 3, title: 'Hook 3', text: 'Designed by dog lovers, tested across 500+ sunny walks.', predictedStrength: 4 },
      ],
    },
  ];

  const handleExpandAgain = () => {
    const nextIdx = campaignDraft.keyMessage === expandAlternatives[0].keyMessage ? 1 : 0;
    const choice = expandAlternatives[nextIdx];
    setCampaignDraft((prev) => ({
      ...prev,
      keyMessage: choice.keyMessage,
      hooks: choice.hooks,
    }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('adstudio_campaign_draft', JSON.stringify(campaignDraft));
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2000);
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-4 xl:gap-5 p-4 md:p-6 xl:p-8 pb-24 md:pb-6 xl:pb-8 overflow-y-auto animate-in fade-in duration-200">
      {/* Left Column: Steps & Brand Brain indicator */}
      <div className="col-span-12 lg:col-span-3 2xl:col-span-2 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          {/* Header pill & Title */}
          <div className="mb-4 lg:mb-6 flex lg:block items-center justify-between">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#252831] text-[#A0A1AA] lg:mb-2 order-2 lg:order-1">
              Draft
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#F0F1F7] font-heading order-1 lg:order-2">Dog Cap launch</h2>
          </div>

          {/* Steps List: Horizontal scrollable on mobile/tablet, vertical on lg+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-2">
            {/* Step 1: Objective */}
            <div
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-colors ${
                activeStep === 1 ? 'bg-[#1A1D24] border border-[#343842]' : 'hover:bg-[#1A1D24]/50 border border-transparent'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#ACD9F3] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[#727681]">Step 1</div>
                <div className="text-xs font-semibold text-[#F0F1F7] truncate">Objective</div>
              </div>
            </div>

            {/* Step 2: Product */}
            <div
              onClick={() => setActiveStep(2)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-colors ${
                activeStep === 2 ? 'bg-[#1A1D24] border border-[#343842]' : 'hover:bg-[#1A1D24]/50 border border-transparent'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#ACD9F3] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[#727681]">Step 2</div>
                <div className="text-xs font-semibold text-[#F0F1F7] truncate">Product</div>
              </div>
            </div>

            {/* Step 3: Audience */}
            <div
              onClick={() => setActiveStep(3)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-colors ${
                activeStep === 3 ? 'bg-[#1A1D24] border border-[#343842]' : 'hover:bg-[#1A1D24]/50 border border-transparent'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#ACD9F3] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[#727681]">Step 3</div>
                <div className="text-xs font-semibold text-[#F0F1F7] truncate">Audience</div>
              </div>
            </div>

            {/* Step 4: Message (Active) */}
            <div
              onClick={() => setActiveStep(4)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-colors ${
                activeStep === 4 ? 'bg-[#1A1D24] border border-[#343842]' : 'hover:bg-[#1A1D24]/50 border border-transparent'
              }`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#ACD9F3] flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ACD9F3]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-[#ACD9F3] font-medium">Step 4</div>
                <div className="text-xs font-semibold text-[#F0F1F7] truncate">Message</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom card: Brand Brain is on */}
        <div className="p-3.5 sm:p-4 bg-[#1A1D24] border border-[#252831] rounded-2xl mt-4 lg:mt-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0F1F7] mb-1">
            <span className="text-[#BEB0F4]">🧠</span>
            <span>Brand Brain is on</span>
          </div>
          <p className="text-[11px] text-[#727681] leading-relaxed">
            Mochi & Bean tone, visuals and guardrails apply to everything generated here.
          </p>
        </div>
      </div>

      {/* Center Column: Message Step Configuration */}
      <div className="col-span-12 lg:col-span-6 2xl:col-span-7 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 sm:p-6 xl:p-7 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-[#ACD9F3]">Step {activeStep} of 4</span>
            <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold text-[#F0F1F7] font-heading mt-0.5">
              {activeStep === 4 ? 'What do we want to say?' : activeStep === 1 ? 'Campaign Objective' : activeStep === 2 ? 'Select Product Assets' : 'Target Audience'}
            </h2>
            <p className="text-xs text-[#A0A1AA] mt-1">
              Write it the way you would say it to a colleague. AdStudio turns it into a full creative brief.
            </p>
          </div>

          {/* Textarea Card */}
          <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 mb-4">
            <textarea
              value={campaignDraft.prompt}
              onChange={(e) => setCampaignDraft({ ...campaignDraft, prompt: e.target.value.slice(0, 500) })}
              rows={2}
              className="w-full bg-transparent text-sm text-[#F0F1F7] placeholder-[#727681] outline-none resize-none font-sans leading-relaxed"
              placeholder="What are we promoting?"
            />
            <div className="flex items-center justify-between pt-2 border-t border-[#252831]/40 text-xs">
              <div className="flex items-center gap-3 text-[#727681]">
                <button type="button" className="hover:text-[#F0F1F7] cursor-pointer" title="Attach assets">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button type="button" className="hover:text-[#F0F1F7] cursor-pointer" title="Voice input">
                  <Mic className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#727681]">
                  {campaignDraft.prompt.length} / 500
                </span>
                <button
                  type="button"
                  onClick={handleExpandAgain}
                  className="flex items-center gap-1.5 text-xs text-[#BEB0F4] hover:text-[#d4cbff] font-medium cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Expand again</span>
                </button>
              </div>
            </div>
          </div>

          {/* Expanded by AdStudio Card */}
          <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 xl:p-5 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#252831]/40">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/20">
                <Sparkles className="w-3 h-3 text-[#BEB0F4]" />
                Expanded by AdStudio
              </span>
              <span className="text-[11px] text-[#727681]">Brand Brain + 18 past campaigns</span>
            </div>

            {/* Key Message */}
            <div>
              <div className="text-[11px] text-[#727681] uppercase font-semibold tracking-wider mb-1">
                Key message
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#F0F1F7] leading-relaxed">
                {campaignDraft.keyMessage}
              </p>
            </div>

            {/* Angles to test (Hooks) */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-[#727681] uppercase font-semibold tracking-wider mb-2">
                <span>Angles to test</span>
                <span>Predicted strength</span>
              </div>

              <div className="flex flex-col gap-2">
                {campaignDraft.hooks.map((hook) => (
                  <div
                    key={hook.id}
                    className="flex items-center justify-between p-2.5 xl:p-3 bg-[#121419] rounded-xl border border-[#252831] text-xs"
                  >
                    <div className="flex items-center gap-2 flex-1 mr-3 min-w-0">
                      <span className="text-[#727681] font-mono shrink-0">{hook.title}</span>
                      {editingHookId === hook.id ? (
                        <input
                          type="text"
                          value={hook.text}
                          onChange={(e) => {
                            const newHooks = campaignDraft.hooks.map((h) =>
                              h.id === hook.id ? { ...h, text: e.target.value } : h
                            );
                            setCampaignDraft({ ...campaignDraft, hooks: newHooks });
                          }}
                          onBlur={() => setEditingHookId(null)}
                          autoFocus
                          className="flex-1 bg-transparent text-[#F0F1F7] outline-none border-b border-[#ACD9F3]"
                        />
                      ) : (
                        <span className="text-[#F0F1F7] truncate">{hook.text}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < hook.predictedStrength ? 'bg-[#ACD9F3]' : 'bg-[#252831]'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setEditingHookId(editingHookId === hook.id ? null : hook.id)}
                        className="text-[#727681] hover:text-[#F0F1F7] p-0.5 cursor-pointer"
                        title="Edit hook text"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone & Formats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <div className="text-[11px] text-[#727681] uppercase font-semibold tracking-wider mb-1.5">
                  Tone
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {campaignDraft.tone.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-[#252831] text-[11px] text-[#F0F1F7] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-[#727681] uppercase font-semibold tracking-wider mb-1.5">
                  Formats
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#252831] text-[11px] text-[#F0F1F7] font-medium">
                    <Video className="w-3 h-3 text-[#ACD9F3]" />
                    <span>UGC video 9:16</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#252831] text-[11px] text-[#F0F1F7] font-medium">
                    <ImageIcon className="w-3 h-3 text-[#ACD9F3]" />
                    <span>Static 1:1</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#252831] text-[11px] text-[#F0F1F7] font-medium">
                    <Layers className="w-3 h-3 text-[#ACD9F3]" />
                    <span>Carousel 4:5</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Call to action & Guardrails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <div className="text-[11px] text-[#727681] uppercase font-semibold tracking-wider mb-1.5">
                  Call to action
                </div>
                <div className="p-2 bg-[#121419] border border-[#252831] rounded-xl text-xs font-semibold text-[#F0F1F7]">
                  {campaignDraft.callToAction}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-[#727681] uppercase font-semibold tracking-wider mb-1.5">
                  Guardrails
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-[#121419] border border-[#252831] rounded-xl text-[11px] font-medium text-[#66D4AA]">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{campaignDraft.guardrails}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-[#252831]/40">
          <button
            onClick={() => setCurrentView('overview')}
            className="px-3 sm:px-4 py-2 text-xs font-medium text-[#A0A1AA] hover:text-[#F0F1F7] cursor-pointer"
          >
            &lt; Back
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-medium text-[#F0F1F7] hover:bg-[#1A1D24] rounded-xl border border-transparent hover:border-[#343842] transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#A0A1AA]" />
              <span>{draftSavedToast ? 'Saved!' : 'Save draft'}</span>
            </button>
            <button
              onClick={startGeneratingConcepts}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 bg-[#ACD9F3] hover:bg-[#bde3f7] rounded-full text-xs font-semibold text-[#08090B] transition-colors cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate concepts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Campaign Brief & Live output summary */}
      <div className="col-span-12 lg:col-span-3 2xl:col-span-3 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#252831]/40 mb-4">
            <h3 className="text-sm font-semibold text-[#F0F1F7] font-heading">Campaign brief</h3>
            <span className="text-[11px] text-[#BEB0F4] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Builds as you go
            </span>
          </div>

          {/* Inset metadata rows */}
          <div className="flex flex-col gap-3.5">
            {/* Objective */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#1A1D24] border border-[#252831] flex items-center justify-center text-[#ACD9F3] shrink-0 mt-0.5">
                <Target className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#727681]">Objective</div>
                <div className="text-xs font-medium text-[#F0F1F7]">{campaignDraft.objective}</div>
              </div>
            </div>

            {/* Product */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#1A1D24] border border-[#252831] flex items-center justify-center text-[#ACD9F3] shrink-0 mt-0.5">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#727681]">Product</div>
                <div className="text-xs font-medium text-[#F0F1F7]">{campaignDraft.product}</div>
              </div>
            </div>

            {/* Audience */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#1A1D24] border border-[#252831] flex items-center justify-center text-[#ACD9F3] shrink-0 mt-0.5">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#727681]">Audience</div>
                <div className="text-xs font-medium text-[#F0F1F7]">{campaignDraft.audience}</div>
              </div>
            </div>

            {/* Message */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#1A1D24] border border-[#252831] flex items-center justify-center text-[#ACD9F3] shrink-0 mt-0.5">
                <Megaphone className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#727681]">Message</div>
                <div className="text-xs font-medium text-[#F0F1F7] line-clamp-2">
                  {campaignDraft.prompt}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom card: Estimated Output */}
        <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 mt-6">
          <div className="text-[10px] text-[#727681] uppercase font-semibold tracking-wider mb-2">
            Estimated output
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-[#F0F1F7] font-mono">12</div>
              <div className="text-[10px] text-[#727681]">concepts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#F0F1F7] font-mono">36</div>
              <div className="text-[10px] text-[#727681]">variations</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#F0F1F7] font-mono">4 min</div>
              <div className="text-[10px] text-[#727681]">to generate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
