import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Plus, 
  Edit3, 
  Volume2, 
  Eye, 
  AlertTriangle, 
  Globe, 
  FileText, 
  Image as ImageIcon, 
  Megaphone, 
  Users, 
  Check, 
  X,
  Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DOG_IMAGES } from '../../constants/images';
import { SegmentedMeter } from '../common/SegmentedMeter';

export const BrandBrainView: React.FC = () => {
  const { brandDna, setBrandDna } = useApp();
  const [isResyncing, setIsResyncing] = useState(false);
  const [isEditDnaOpen, setIsEditDnaOpen] = useState(false);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);

  // Form states for Add Source
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceType, setNewSourceType] = useState('Website');

  // Edit DNA state
  const [tempDna, setTempDna] = useState(brandDna);

  const handleResync = () => {
    setIsResyncing(true);
    setTimeout(() => {
      setIsResyncing(false);
      setBrandDna((prev) => ({
        ...prev,
        confidence: 94,
        sources: prev.sources.map((s) => ({
          ...s,
          status: 'Learned' as const,
        })),
      }));
    }, 1800);
  };

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName.trim()) return;

    const newSource = {
      id: Date.now().toString(),
      name: newSourceName.trim(),
      type: `${newSourceType} · 12 items read`,
      detail: newSourceType,
      status: 'Learned' as const,
    };

    setBrandDna((prev) => ({
      ...prev,
      sources: [newSource, ...prev.sources],
    }));

    setNewSourceName('');
    setIsAddSourceOpen(false);
  };

  const handleSaveDna = () => {
    setBrandDna(tempDna);
    setIsEditDnaOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Top Wide Brand Summary Panel (y≈163, h≈115) */}
      <div className="bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F4C36A] text-[#121419] font-bold text-2xl flex items-center justify-center font-heading shadow-md">
            M
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-[#F0F1F7] font-heading">Mochi & Bean</h2>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#ACD9F3]/15 text-[#ACD9F3] border border-[#ACD9F3]/20">
                <Check className="w-3 h-3 text-[#ACD9F3]" />
                Used in every generation
              </span>
            </div>
            <p className="text-xs text-[#A0A1AA] mt-1">
              AdStudio has learned your brand from {brandDna.sources.length} sources. Last synced{' '}
              {isResyncing ? 'just now' : '2 hours ago'}.
            </p>
          </div>
        </div>

        {/* Right Brand Confidence & Actions */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#727681]">Brand confidence</span>
              <span className="text-xs font-semibold text-[#F0F1F7] font-mono">
                {brandDna.confidence}%
              </span>
            </div>
            <SegmentedMeter total={10} value={Math.round(brandDna.confidence / 10)} color="blue" size="md" />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResync}
              disabled={isResyncing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A1D24] hover:bg-[#252831] border border-[#343842] text-xs font-medium text-[#F0F1F7] transition-colors cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 text-[#A0A1AA] ${isResyncing ? 'animate-spin' : ''}`} />
              <span>{isResyncing ? 'Syncing...' : 'Re-sync'}</span>
            </button>
            <button
              onClick={() => setIsAddSourceOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add sources</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Left Brand DNA (w≈915) & Right Sources (w≈412) */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Brand DNA Container */}
        <div className="col-span-12 lg:col-span-8 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#252831]/40">
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-semibold text-[#F0F1F7] font-heading">Brand DNA</h3>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#292638] text-[#BEB0F4] border border-[#BEB0F4]/20">
                <Sparkles className="w-3 h-3 text-[#BEB0F4]" />
                Extracted by AI
              </span>
            </div>
            <button
              onClick={() => {
                setTempDna(brandDna);
                setIsEditDnaOpen(true);
              }}
              className="flex items-center gap-1.5 text-xs text-[#A0A1AA] hover:text-[#F0F1F7] cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit DNA</span>
            </button>
          </div>

          {/* 4 Horizontal Segmented Meters (Tone, Visual, Energy, Technical) */}
          <div className="flex flex-col gap-3 py-1">
            {/* Tone */}
            <div className="flex items-center justify-between text-xs">
              <span className="w-20 text-[#A0A1AA]">Tone</span>
              <div className="flex-1 max-w-xl mx-4">
                <SegmentedMeter total={10} value={brandDna.toneScore} color="blue" size="lg" className="w-full justify-between" />
              </div>
              <div className="flex items-center gap-3 w-28 justify-end">
                <span className="font-medium text-[#F0F1F7]">{brandDna.toneLabel}</span>
                <span className="text-[#727681] font-mono text-[11px]">{brandDna.toneScore}/10</span>
              </div>
            </div>

            {/* Visual */}
            <div className="flex items-center justify-between text-xs">
              <span className="w-20 text-[#A0A1AA]">Visual</span>
              <div className="flex-1 max-w-xl mx-4">
                <SegmentedMeter total={10} value={brandDna.visualScore} color="blue" size="lg" className="w-full justify-between" />
              </div>
              <div className="flex items-center gap-3 w-28 justify-end">
                <span className="font-medium text-[#F0F1F7]">{brandDna.visualLabel}</span>
                <span className="text-[#727681] font-mono text-[11px]">{brandDna.visualScore}/10</span>
              </div>
            </div>

            {/* Energy */}
            <div className="flex items-center justify-between text-xs">
              <span className="w-20 text-[#A0A1AA]">Energy</span>
              <div className="flex-1 max-w-xl mx-4">
                <SegmentedMeter total={10} value={brandDna.energyScore} color="blue" size="lg" className="w-full justify-between" />
              </div>
              <div className="flex items-center gap-3 w-28 justify-end">
                <span className="font-medium text-[#F0F1F7]">{brandDna.energyLabel}</span>
                <span className="text-[#727681] font-mono text-[11px]">{brandDna.energyScore}/10</span>
              </div>
            </div>

            {/* Technical */}
            <div className="flex items-center justify-between text-xs">
              <span className="w-20 text-[#A0A1AA]">Technical</span>
              <div className="flex-1 max-w-xl mx-4">
                <SegmentedMeter total={10} value={brandDna.technicalScore} color="blue" size="lg" className="w-full justify-between" />
              </div>
              <div className="flex items-center gap-3 w-28 justify-end">
                <span className="font-medium text-[#F0F1F7]">{brandDna.technicalLabel}</span>
                <span className="text-[#727681] font-mono text-[11px]">{brandDna.technicalScore}/10</span>
              </div>
            </div>
          </div>

          {/* 3x2 Matrix of Inset Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-2">
            {/* Tone Tags */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#A0A1AA]">
                <Volume2 className="w-3.5 h-3.5 text-[#ACD9F3]" />
                <span>Tone</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {brandDna.toneTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#252831] text-[#F0F1F7] rounded-lg text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Style Tags */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#A0A1AA]">
                <Eye className="w-3.5 h-3.5 text-[#ACD9F3]" />
                <span>Visual style</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {brandDna.visualTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#252831] text-[#F0F1F7] rounded-lg text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Avoid Tags (Coral) */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#F18E87]">
                <AlertTriangle className="w-3.5 h-3.5 text-[#F18E87]" />
                <span>Avoid</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-3">
                {brandDna.avoidTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#F18E87]/10 text-[#F18E87] rounded-md text-[11px] font-medium flex items-center gap-1"
                  >
                    <span>✕</span>
                    <span className="truncate">{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Colours */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
              <div className="text-xs font-medium text-[#A0A1AA]">Colours</div>
              <div className="flex items-center justify-between my-2">
                {brandDna.colors.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-1">
                    <div
                      className="w-7 h-7 rounded-full border border-[#343842] shadow-sm"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name} (${c.hex})`}
                    />
                    <span className="text-[10px] text-[#727681]">{c.name}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[10px] text-[#727681] mb-1">Usage in your ads</div>
                <div className="h-2 w-full flex rounded-full overflow-hidden">
                  {brandDna.colors.map((c) => (
                    <div
                      key={c.name}
                      style={{ width: `${c.usagePct}%`, backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
              <div className="text-xs font-medium text-[#A0A1AA]">Typography</div>
              <div className="flex items-center gap-6 mt-1">
                <div>
                  <div className="text-xl font-bold text-[#F0F1F7] font-heading">Aa</div>
                  <div className="text-[10px] text-[#727681]">Headlines · {brandDna.typography.headlines}</div>
                </div>
                <div>
                  <div className="text-xl font-normal text-[#F0F1F7] font-sans">Aa</div>
                  <div className="text-[10px] text-[#727681]">Body · {brandDna.typography.body}</div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#252831]">
                <div className="text-xs font-semibold text-[#F0F1F7] font-heading">
                  {brandDna.typography.sampleHeadline}
                </div>
                <div className="text-[11px] text-[#727681]">
                  {brandDna.typography.sampleBody}
                </div>
              </div>
            </div>

            {/* Sounds like Mochi & Bean */}
            <div className="bg-[#1A1D24] border border-[#252831] rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
              <div className="text-xs font-medium text-[#A0A1AA]">Sounds like Mochi & Bean</div>
              <p className="text-xs text-[#F0F1F7] italic my-2 leading-relaxed">
                "{brandDna.voiceSample}"
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#66D4AA]">
                <Check className="w-3.5 h-3.5" />
                <span>Matches tone {brandDna.voiceMatchPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sources Panel (w≈412) */}
        <div className="col-span-12 lg:col-span-4 bg-[#121419] border border-[#252831]/60 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#252831]/40 mb-3">
              <h3 className="text-base font-semibold text-[#F0F1F7] font-heading">Sources</h3>
              <span className="text-xs text-[#727681]">{brandDna.sources.length} connected</span>
            </div>

            {/* Sources List */}
            <div className="flex flex-col gap-2.5">
              {brandDna.sources.map((src) => {
                const isLearning = src.status.includes('Learning');
                return (
                  <div
                    key={src.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1D24] hover:bg-[#252831] border border-[#252831] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#252831] flex items-center justify-center text-[#ACD9F3] shrink-0">
                        {src.detail === 'Website' && <Globe className="w-4 h-4" />}
                        {src.detail === 'Guidelines' && <FileText className="w-4 h-4" />}
                        {src.detail === 'Product images' && <ImageIcon className="w-4 h-4" />}
                        {src.detail === 'Previous ads' && <Megaphone className="w-4 h-4" />}
                        {src.detail === 'Tone of voice' && <Volume2 className="w-4 h-4" />}
                        {src.detail === 'Customer personas' && <Users className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[#F0F1F7] truncate">{src.name}</div>
                        <div className="text-[10px] text-[#727681] truncate">{src.type}</div>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {isLearning ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-[#BEB0F4] bg-[#292638] px-2 py-0.5 rounded-full border border-[#BEB0F4]/30">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>{src.status}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-[#66D4AA] bg-[#66D4AA]/10 px-2 py-0.5 rounded-full border border-[#66D4AA]/20">
                          <Check className="w-3 h-3" />
                          <span>{src.status}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Inset: Learned from your best ads / Top 10% */}
          <div className="mt-5 pt-4 border-t border-[#252831]/40">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-medium text-[#F0F1F7]">Learned from your best ads</span>
              <span className="text-[11px] text-[#ACD9F3] font-mono">Top 10%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <img
                src={DOG_IMAGES.corgiOutdoors}
                alt="Ad visual 1"
                className="w-full aspect-square rounded-xl object-cover border border-[#343842]"
              />
              <img
                src={DOG_IMAGES.pinkCap}
                alt="Ad visual 2"
                className="w-full aspect-square rounded-xl object-cover border border-[#343842]"
              />
              <img
                src={DOG_IMAGES.pinkCap}
                alt="Ad visual 3"
                className="w-full aspect-square rounded-xl object-cover border border-[#343842]"
              />
              <img
                src={DOG_IMAGES.mintCap}
                alt="Ad visual 4"
                className="w-full aspect-square rounded-xl object-cover border border-[#343842]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit DNA Modal */}
      {isEditDnaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#121419] border border-[#343842] rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#252831]">
              <h3 className="text-base font-semibold text-[#F0F1F7] font-heading">Edit Brand DNA</h3>
              <button onClick={() => setIsEditDnaOpen(false)} className="text-[#727681] hover:text-[#F0F1F7]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 my-4">
              <div>
                <label className="text-xs text-[#A0A1AA] block mb-1">Tone score: {tempDna.toneScore}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={tempDna.toneScore}
                  onChange={(e) => setTempDna({ ...tempDna, toneScore: Number(e.target.value) })}
                  className="w-full accent-[#ACD9F3]"
                />
              </div>

              <div>
                <label className="text-xs text-[#A0A1AA] block mb-1">Visual score: {tempDna.visualScore}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={tempDna.visualScore}
                  onChange={(e) => setTempDna({ ...tempDna, visualScore: Number(e.target.value) })}
                  className="w-full accent-[#ACD9F3]"
                />
              </div>

              <div>
                <label className="text-xs text-[#A0A1AA] block mb-1">Voice sample quote</label>
                <textarea
                  value={tempDna.voiceSample}
                  onChange={(e) => setTempDna({ ...tempDna, voiceSample: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-[#1A1D24] border border-[#343842] text-xs text-[#F0F1F7] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#252831]">
              <button
                onClick={() => setIsEditDnaOpen(false)}
                className="px-4 py-2 text-xs text-[#A0A1AA] hover:text-[#F0F1F7]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDna}
                className="px-4 py-2 rounded-xl bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B] text-xs font-semibold"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sources Modal */}
      {isAddSourceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <form
            onSubmit={handleAddSource}
            className="w-full max-w-md bg-[#121419] border border-[#343842] rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#252831]">
              <h3 className="text-base font-semibold text-[#F0F1F7] font-heading">Add Brand Source</h3>
              <button
                type="button"
                onClick={() => setIsAddSourceOpen(false)}
                className="text-[#727681] hover:text-[#F0F1F7]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 my-4">
              <div>
                <label className="text-xs text-[#A0A1AA] block mb-1">Source Type</label>
                <select
                  value={newSourceType}
                  onChange={(e) => setNewSourceType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#1A1D24] border border-[#343842] text-xs text-[#F0F1F7] outline-none"
                >
                  <option value="Website">Website URL</option>
                  <option value="Guidelines">Brand Guidelines (PDF)</option>
                  <option value="Product images">Product Assets</option>
                  <option value="Tone of voice">Voice & Tone Document</option>
                  <option value="Customer personas">Customer Personas</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#A0A1AA] block mb-1">URL or Document Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mochiandbean.co/summer or dog_hats_deck.pdf"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#1A1D24] border border-[#343842] text-xs text-[#F0F1F7] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#252831]">
              <button
                type="button"
                onClick={() => setIsAddSourceOpen(false)}
                className="px-4 py-2 text-xs text-[#A0A1AA] hover:text-[#F0F1F7]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#ACD9F3] hover:bg-[#bde3f7] text-[#08090B] text-xs font-semibold"
              >
                Add Source
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
