import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Download, 
  Check, 
  Search, 
  Plus, 
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';
import { SegmentedMeter } from '../common/SegmentedMeter';

export const StudioView: React.FC = () => {
  const {
    variations,
    toggleVariationSelect,
    addNewVariation,
    concepts,
    setConcepts,
    selectedConceptId,
    setSelectedConceptId,
    aspectRatio,
    setAspectRatio,
    activeStudioTab,
    setActiveStudioTab,
    setCurrentView
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [isHookAccordionOpen, setIsHookAccordionOpen] = useState(true);
  const [isVisualAccordionOpen, setIsVisualAccordionOpen] = useState(true);
  const [isCtaAccordionOpen, setIsCtaAccordionOpen] = useState(false);
  const [launchExperimentToggle, setLaunchExperimentToggle] = useState(true);

  const activeConcept = concepts.find((c) => c.id === selectedConceptId) || concepts[0];

  const updateActiveConcept = (updates: Partial<typeof activeConcept>) => {
    setConcepts((prev) =>
      prev.map((c) => (c.id === activeConcept.id ? { ...c, ...updates } : c))
    );
  };

  const handleShorter = () => {
    updateActiveConcept({
      headline: 'The cap that stays on.',
      body: 'Soft corduroy, ear holes, zero fuss. XS to L.',
    });
  };

  const handleBolder = () => {
    updateActiveConcept({
      headline: 'Stop losing dog caps.',
      body: 'Engineered with anatomical ear holes & snug chin lock.',
    });
  };

  const handleAddProof = () => {
    updateActiveConcept({
      headline: 'Tested on 500+ happy walks.',
      body: 'Soft corduroy, custom ear cutouts, 98% keep-on rate. Sizes XS to L.',
    });
  };

  const handleDownloadCreative = () => {
    const link = document.createElement('a');
    link.href = activeConcept.image;
    link.download = `DogCap_Creative_${activeConcept.title.replace(/\s+/g, '_')}.jpg`;
    link.click();
  };

  const currentIndex = concepts.findIndex((c) => c.id === activeConcept.id);
  const prevConcept = () => {
    if (currentIndex > 0) {
      setSelectedConceptId(concepts[currentIndex - 1].id);
    }
  };
  const nextConcept = () => {
    if (currentIndex < concepts.length - 1) {
      setSelectedConceptId(concepts[currentIndex + 1].id);
    }
  };

  const selectedCount = variations.filter((v) => v.selected).length;

  return (
    <div className="flex-1 flex flex-col gap-3.5 xl:gap-4 p-4 md:p-5 xl:p-7 pb-24 md:pb-5 xl:pb-7 overflow-y-auto animate-in fade-in duration-200">
      {/* Subheader Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#252831]/40 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('campaigns')}
            className="w-8 h-8 rounded-full bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] flex items-center justify-center text-[#F0F1F7] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <h2 className="text-base font-semibold text-[#F0F1F7] font-heading group-hover:text-[#ACD9F3] transition-colors">
                Dog Cap launch
              </h2>
              <ChevronDown className="w-3.5 h-3.5 text-[#727681]" />
            </div>
            <div className="text-[11px] text-[#727681]">
              12 concepts · 36 variations · generated 2 min ago
            </div>
          </div>
        </div>

        {/* Center Tabs: Concepts | Variations | Copy */}
        <div className="flex items-center p-1 bg-[#121419] border border-[#252831] rounded-full text-xs">
          {(['Concepts', 'Variations', 'Copy'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStudioTab(tab)}
              className={`px-3 sm:px-4 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                activeStudioTab === tab
                  ? 'bg-[#252831] text-[#F0F1F7] shadow-sm'
                  : 'text-[#727681] hover:text-[#A0A1AA]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Collaborators & On Brand badge */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#F4C36A] border-2 border-[#121419] flex items-center justify-center text-[10px] font-bold text-[#121419]" title="Maya Ortiz">
              MO
            </div>
            <div className="w-7 h-7 rounded-full bg-[#ACD9F3] border-2 border-[#121419] flex items-center justify-center text-[10px] font-bold text-[#121419]" title="Alex Rivera">
              AR
            </div>
          </div>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#66D4AA]/10 text-[#66D4AA] border border-[#66D4AA]/20">
            <Check className="w-3 h-3" />
            <span>On brand 96%</span>
          </span>
        </div>
      </div>

      {/* Middle 3 Panels */}
      <div className="grid grid-cols-12 gap-3.5 xl:gap-5 flex-1 min-h-[540px]">
        {/* Left Panel: Concept list */}
        <div className="col-span-12 lg:col-span-3 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#727681] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search concepts"
                className="w-full pl-8 pr-3 py-1.5 bg-[#1A1D24] border border-[#252831] rounded-xl text-xs text-[#F0F1F7] placeholder-[#727681] outline-none"
              />
            </div>

            {/* Hook 1 Group */}
            <div>
              <div className="text-[11px] font-medium text-[#727681] uppercase tracking-wider mb-2">
                Hook 1 · The cap that stays on
              </div>
              <div className="flex flex-col gap-2">
                {/* Concept 1 */}
                <div
                  onClick={() => setSelectedConceptId('1')}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeConcept.id === '1'
                      ? 'bg-[#1A1D24] border-[#ACD9F3]'
                      : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                  }`}
                >
                  <img
                    src={DOG_IMAGES.corgiOutdoors}
                    alt="Corgi cap"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#343842]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-[#F0F1F7] truncate">
                      Corgi cap, big smile
                    </div>
                    <div className="text-[10px] text-[#727681]">Video 9:16 · 15s</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                    </div>
                  </div>
                  {activeConcept.id === '1' && (
                    <div className="w-5 h-5 rounded-full bg-[#ACD9F3] text-[#08090B] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Concept 2 */}
                <div
                  onClick={() => setSelectedConceptId('2')}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeConcept.id === '2'
                      ? 'bg-[#1A1D24] border-[#ACD9F3]'
                      : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                  }`}
                >
                  <img
                    src={DOG_IMAGES.pinkCap}
                    alt="Pink cap"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#343842]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-[#F0F1F7] truncate">
                      Pink cap close-up
                    </div>
                    <div className="text-[10px] text-[#727681]">Video 9:16 · 12s</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                    </div>
                  </div>
                </div>

                {/* Concept 3 */}
                <div
                  onClick={() => setSelectedConceptId('3')}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeConcept.id === '3'
                      ? 'bg-[#1A1D24] border-[#ACD9F3]'
                      : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                  }`}
                >
                  <img
                    src={DOG_IMAGES.blueCapWhite}
                    alt="Blue cap on white"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#343842]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-[#F0F1F7] truncate">
                      Blue cap on white
                    </div>
                    <div className="text-[10px] text-[#727681]">Static 1:1</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 flex-1 bg-[#727681] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#727681] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hook 2 Group */}
            <div>
              <div className="text-[11px] font-medium text-[#727681] uppercase tracking-wider mb-2">
                Hook 2 · Walk tested
              </div>
              <div className="flex flex-col gap-2">
                {/* Concept 4 */}
                <div
                  onClick={() => setSelectedConceptId('4')}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeConcept.id === '4'
                      ? 'bg-[#1A1D24] border-[#ACD9F3]'
                      : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                  }`}
                >
                  <img
                    src={DOG_IMAGES.blueCapDetail}
                    alt="Corduroy detail"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#343842]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-[#F0F1F7] truncate">
                      Corduroy detail shot
                    </div>
                    <div className="text-[10px] text-[#727681]">Carousel 4:5</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                    </div>
                  </div>
                </div>

                {/* Concept 5 */}
                <div
                  onClick={() => setSelectedConceptId('5')}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeConcept.id === '5'
                      ? 'bg-[#1A1D24] border-[#ACD9F3]'
                      : 'bg-[#121419] border-[#252831] hover:border-[#343842]'
                  }`}
                >
                  <img
                    src={DOG_IMAGES.mintCap}
                    alt="Mint cap portrait"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#343842]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-[#F0F1F7] truncate">
                      Mint cap portrait
                    </div>
                    <div className="text-[10px] text-[#727681]">Video 9:16 · 9s</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#66D4AA] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                      <div className="h-1 flex-1 bg-[#252831] rounded-[2px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <button
            onClick={() => addNewVariation()}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#292638] hover:bg-[#332f48] text-[#BEB0F4] border border-[#BEB0F4]/30 text-xs font-semibold transition-colors cursor-pointer mt-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate more concepts</span>
          </button>
        </div>

        {/* Center Panel: Central Ad Preview with neighboring preview cards */}
        <div className="col-span-12 lg:col-span-6 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between overflow-hidden relative min-h-[480px]">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#252831]/40 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={prevConcept}
                disabled={currentIndex === 0}
                className="w-7 h-7 rounded-full bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] flex items-center justify-center text-[#F0F1F7] disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextConcept}
                disabled={currentIndex === concepts.length - 1}
                className="w-7 h-7 rounded-full bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] flex items-center justify-center text-[#F0F1F7] disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-medium text-[#F0F1F7] ml-1 font-mono">
                Concept {currentIndex + 1} of {concepts.length}
              </span>
            </div>

            {/* Aspect Selector: 9:16 | 4:5 | 1:1 */}
            <div className="flex items-center p-0.5 bg-[#1A1D24] rounded-lg border border-[#252831] text-[11px]">
              {(['9:16', '4:5', '1:1'] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    aspectRatio === ratio
                      ? 'bg-[#252831] text-[#F0F1F7] shadow-sm'
                      : 'text-[#727681] hover:text-[#A0A1AA]'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {/* Remix and Download */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddProof}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#292638] hover:bg-[#352f4c] text-[#BEB0F4] border border-[#BEB0F4]/30 text-xs font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Remix</span>
              </button>
              <button
                onClick={handleDownloadCreative}
                className="w-8 h-8 rounded-full bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] flex items-center justify-center text-[#A0A1AA] hover:text-[#F0F1F7] transition-colors cursor-pointer"
                title="Download preview image"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Central Carousel Ad Area with Dimmed Neighbor Previews */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden py-3">
            {/* Left Neighbor Card (Dimmed background preview) */}
            <div className="hidden sm:block absolute left-[-12%] xl:left-[4%] w-[210px] xl:w-[240px] h-[360px] xl:h-[410px] rounded-3xl overflow-hidden opacity-30 blur-[0.5px] pointer-events-none scale-90 border border-[#343842] shadow-xl">
              <img
                src={DOG_IMAGES.blueCapDetail}
                alt="Previous creative"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Central Active Ad Card (Responsive aspect ratio) */}
            <div
              className={`relative rounded-3xl overflow-hidden border border-[#343842] shadow-2xl transition-all duration-300 z-10 max-w-full ${
                aspectRatio === '9:16'
                  ? 'w-[265px] sm:w-[290px] xl:w-[310px] h-[440px] sm:h-[480px] xl:h-[510px]'
                  : aspectRatio === '4:5'
                  ? 'w-[280px] sm:w-[320px] xl:w-[350px] h-[350px] sm:h-[400px] xl:h-[435px]'
                  : 'w-[280px] sm:w-[340px] xl:w-[370px] h-[280px] sm:h-[340px] xl:h-[370px]'
              }`}
            >
              {/* Ad Image */}
              <img
                src={activeConcept.image}
                alt={activeConcept.title}
                className="w-full h-full object-cover"
              />

              {/* Instagram/Meta Story Style Top Bar */}
              <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/70 via-black/30 to-transparent flex items-center justify-between text-white z-20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F4C36A] text-[#121419] font-bold text-xs flex items-center justify-center">
                    M
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-tight">mochiandbean</div>
                    <div className="text-[9px] text-[#A0A1AA]">Sponsored</div>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-white/80 cursor-pointer" />
              </div>

              {/* Dark Readability Overlay at the bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end text-white z-20">
                <h3 className="text-base sm:text-lg font-bold font-heading text-white leading-tight mb-1">
                  {activeConcept.headline}
                </h3>
                <p className="text-xs text-white/90 leading-snug line-clamp-2 mb-3">
                  {activeConcept.body}
                </p>
                <button className="w-full py-2 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-md">
                  <span>{activeConcept.cta}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Neighbor Card (Dimmed background preview) */}
            <div className="hidden sm:block absolute right-[-12%] xl:right-[4%] w-[210px] xl:w-[240px] h-[360px] xl:h-[410px] rounded-3xl overflow-hidden opacity-30 blur-[0.5px] pointer-events-none scale-90 border border-[#343842] shadow-xl">
              <img
                src={DOG_IMAGES.pinkCap}
                alt="Next creative"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </div>
        </div>

        {/* Right Panel: Inspector, Visuals & Brand Check */}
        <div className="col-span-12 lg:col-span-3 bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* Accordion 1: Hook and copy */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl overflow-hidden">
              <button
                onClick={() => setIsHookAccordionOpen(!isHookAccordionOpen)}
                className="w-full flex items-center justify-between p-3 text-xs font-semibold text-[#F0F1F7] hover:bg-[#252831]/50 cursor-pointer"
              >
                <span>Hook and copy</span>
                {isHookAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#727681]" /> : <ChevronDown className="w-4 h-4 text-[#727681]" />}
              </button>

              {isHookAccordionOpen && (
                <div className="p-3 pt-0 flex flex-col gap-2.5">
                  <div>
                    <input
                      type="text"
                      value={activeConcept.headline}
                      onChange={(e) => updateActiveConcept({ headline: e.target.value })}
                      className="w-full p-2 bg-[#121419] border border-[#252831] rounded-xl text-xs font-semibold text-[#F0F1F7] outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      value={activeConcept.body}
                      onChange={(e) => updateActiveConcept({ body: e.target.value })}
                      rows={2}
                      className="w-full p-2 bg-[#121419] border border-[#252831] rounded-xl text-xs text-[#A0A1AA] outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* 3 Quick Action buttons: Shorter, Bolder, Add proof */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      onClick={handleShorter}
                      className="py-1 px-2 rounded-lg bg-[#252831] hover:bg-[#343842] text-[11px] text-[#F0F1F7] transition-colors cursor-pointer"
                    >
                      Shorter
                    </button>
                    <button
                      onClick={handleBolder}
                      className="py-1 px-2 rounded-lg bg-[#252831] hover:bg-[#343842] text-[11px] text-[#F0F1F7] transition-colors cursor-pointer"
                    >
                      Bolder
                    </button>
                    <button
                      onClick={handleAddProof}
                      className="py-1 px-2 rounded-lg bg-[#252831] hover:bg-[#343842] text-[11px] text-[#F0F1F7] transition-colors cursor-pointer"
                    >
                      Add proof
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Visual (4 selectable photo thumbnails) */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl overflow-hidden">
              <button
                onClick={() => setIsVisualAccordionOpen(!isVisualAccordionOpen)}
                className="w-full flex items-center justify-between p-3 text-xs font-semibold text-[#F0F1F7] hover:bg-[#252831]/50 cursor-pointer"
              >
                <span>Visual</span>
                {isVisualAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#727681]" /> : <ChevronDown className="w-4 h-4 text-[#727681]" />}
              </button>

              {isVisualAccordionOpen && (
                <div className="p-3 pt-0 grid grid-cols-4 gap-2">
                  <div
                    onClick={() => updateActiveConcept({ image: DOG_IMAGES.corgiOutdoors })}
                    className={`aspect-square rounded-xl overflow-hidden border cursor-pointer ${
                      activeConcept.image === DOG_IMAGES.corgiOutdoors
                        ? 'border-[#ACD9F3] ring-2 ring-[#ACD9F3]/30'
                        : 'border-[#343842]'
                    }`}
                  >
                    <img src={DOG_IMAGES.corgiOutdoors} alt="Corgi" className="w-full h-full object-cover" />
                  </div>
                  <div
                    onClick={() => updateActiveConcept({ image: DOG_IMAGES.pinkCap })}
                    className={`aspect-square rounded-xl overflow-hidden border cursor-pointer ${
                      activeConcept.image === DOG_IMAGES.pinkCap
                        ? 'border-[#ACD9F3] ring-2 ring-[#ACD9F3]/30'
                        : 'border-[#343842]'
                    }`}
                  >
                    <img src={DOG_IMAGES.pinkCap} alt="Pink cap" className="w-full h-full object-cover" />
                  </div>
                  <div
                    onClick={() => updateActiveConcept({ image: DOG_IMAGES.blueCapDetail })}
                    className={`aspect-square rounded-xl overflow-hidden border cursor-pointer ${
                      activeConcept.image === DOG_IMAGES.blueCapDetail
                        ? 'border-[#ACD9F3] ring-2 ring-[#ACD9F3]/30'
                        : 'border-[#343842]'
                    }`}
                  >
                    <img src={DOG_IMAGES.blueCapDetail} alt="Detail" className="w-full h-full object-cover" />
                  </div>
                  <div
                    onClick={() => updateActiveConcept({ image: DOG_IMAGES.blueCapWhite })}
                    className={`aspect-square rounded-xl overflow-hidden border cursor-pointer ${
                      activeConcept.image === DOG_IMAGES.blueCapWhite
                        ? 'border-[#ACD9F3] ring-2 ring-[#ACD9F3]/30'
                        : 'border-[#343842]'
                    }`}
                  >
                    <img src={DOG_IMAGES.blueCapWhite} alt="White bg" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Call to action */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl overflow-hidden">
              <button
                onClick={() => setIsCtaAccordionOpen(!isCtaAccordionOpen)}
                className="w-full flex items-center justify-between p-3 text-xs font-semibold text-[#F0F1F7] hover:bg-[#252831]/50 cursor-pointer"
              >
                <span>Call to action</span>
                {isCtaAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#727681]" /> : <ChevronDown className="w-4 h-4 text-[#727681]" />}
              </button>

              {isCtaAccordionOpen && (
                <div className="p-3 pt-0 flex flex-col gap-1.5 text-xs">
                  {['Shop Dog Caps', 'Explore Collection', 'Get Your Size', 'Wag in Style'].map((c) => (
                    <button
                      key={c}
                      onClick={() => updateActiveConcept({ cta: c })}
                      className={`text-left p-2 rounded-lg transition-colors cursor-pointer ${
                        activeConcept.cta === c
                          ? 'bg-[#ACD9F3] text-[#08090B] font-semibold'
                          : 'text-[#A0A1AA] hover:bg-[#252831]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Card: Brand check 96% */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#F0F1F7]">Brand check</span>
                <span className="text-xs font-bold text-[#66D4AA] font-mono">96%</span>
              </div>
              <SegmentedMeter total={10} value={9} color="mint" size="sm" className="mb-3 w-full justify-between" />
              <div className="flex flex-col gap-1.5 text-[11px] text-[#A0A1AA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#66D4AA] shrink-0" />
                  <span>Tone matches Brand DNA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#66D4AA] shrink-0" />
                  <span>Colours and logo safe zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#66D4AA] shrink-0" />
                  <span>No claims outside guardrails</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Predicted CTR */}
          <div className="p-3.5 rounded-2xl bg-[#292638] border border-[#BEB0F4]/30 mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-[#BEB0F4]">
                <Sparkles className="w-3.5 h-3.5" />
                Predicted CTR
              </span>
              <span className="font-mono font-bold text-[#BEB0F4]">{activeConcept.predictedCtrRange}</span>
            </div>
            <p className="text-[11px] text-[#A0A1AA] leading-relaxed">
              Similar lifestyle photos beat your account average by 32%.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Variations Strip */}
      <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-4 xl:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shrink-0">
        <div className="flex-1 flex flex-col gap-2 w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#F0F1F7]">Variations</span>
            <span className="text-[#A0A1AA] font-mono">{selectedCount} of {variations.length} selected to launch</span>
          </div>

          {/* Variations Cards A to H + New tile */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {variations.map((v) => (
              <div
                key={v.id}
                onClick={() => toggleVariationSelect(v.id)}
                className={`relative w-16 h-20 rounded-2xl overflow-hidden shrink-0 cursor-pointer border transition-all ${
                  v.selected
                    ? 'border-[#ACD9F3] ring-2 ring-[#ACD9F3]/40'
                    : 'border-[#252831] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={v.image} alt={v.title} className="w-full h-full object-cover" />
                
                {/* Checked Badge on top-right */}
                {v.selected && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ACD9F3] text-[#08090B] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}

                {/* Letter badge bottom */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-black/80 backdrop-blur-sm text-white font-bold text-[10px] flex items-center justify-center font-mono">
                  {v.letter}
                </div>
              </div>
            ))}

            {/* + New dashed tile */}
            <button
              onClick={addNewVariation}
              className="w-16 h-20 rounded-2xl border-2 border-dashed border-[#343842] hover:border-[#ACD9F3] hover:text-[#ACD9F3] flex flex-col items-center justify-center text-[#727681] shrink-0 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium">New</span>
            </button>
          </div>
        </div>

        {/* Right Action: Launch as experiment */}
        <div className="flex items-center justify-between md:justify-start gap-3.5 p-3.5 bg-[#1A1D24] border border-[#252831] rounded-2xl shrink-0">
          <div>
            <div className="text-xs font-semibold text-[#F0F1F7] flex items-center gap-1.5">
              <span>⚗️</span>
              <span>Launch as experiment</span>
            </div>
            <div className="text-[11px] text-[#727681]">A/B across Meta and TikTok</div>
          </div>
          <button
            onClick={() => setLaunchExperimentToggle(!launchExperimentToggle)}
            className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
              launchExperimentToggle ? 'bg-[#ACD9F3]' : 'bg-[#252831]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#08090B] absolute top-1 transition-transform ${
                launchExperimentToggle ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
