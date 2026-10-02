import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ToastContainer } from '../common/Toast';
import { SearchModal } from '../common/SearchModal';
import { NewCampaignModal } from '../modals/NewCampaignModal';
import { GenerationModal } from '../modals/GenerationModal';
import { LaunchModal } from '../modals/LaunchModal';
import { RemixModal } from '../modals/RemixModal';
import { ApprovalDetailsModal } from '../modals/ApprovalDetailsModal';
import { RemixQueueModal } from '../modals/RemixQueueModal';
import { OverviewView } from '../views/OverviewView';
import { BrandBrainView } from '../views/BrandBrainView';
import { CampaignWizardView } from '../views/CampaignWizardView';
import { StudioView } from '../views/StudioView';
import { PerformanceView } from '../views/PerformanceView';
import { OtherViews } from '../views/OtherViews';
import { useApp } from '../../context/AppContext';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

export const Shell: React.FC = () => {
  const { currentView, resetDemo, presentationMode, setPresentationMode } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'brand_brain':
        return <BrandBrainView />;
      case 'new_campaign_wizard':
        return <CampaignWizardView />;
      case 'studio':
        return <StudioView />;
      case 'performance':
        return <PerformanceView />;
      default:
        return <OtherViews />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#191918] flex flex-col items-center justify-center p-0 md:p-3 lg:p-6 relative overflow-x-hidden font-sans">
      {/* Top Utility Ribbon (Reset demo & Zoom framing toggle) */}
      <div className="w-full max-w-[1500px] flex items-center justify-between px-4 py-1.5 text-xs text-[#727681] select-none z-40">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#A0A1AA]">AdStudio</span>
          <span>·</span>
          <span>Mochi & Bean AI Advertising Workspace</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPresentationMode((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121419] hover:bg-[#1A1D24] text-[#A0A1AA] hover:text-[#F0F1F7] border border-[#252831] transition-colors cursor-pointer"
            title="Toggle between fixed desktop framing (1486px) and fluid responsive layout"
          >
            {presentationMode ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            <span>{presentationMode ? 'Fit viewport' : 'Frame (1600×1200)'}</span>
          </button>

          <button
            onClick={resetDemo}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#121419] hover:bg-[#1A1D24] text-[#A0A1AA] hover:text-[#F0F1F7] border border-[#252831] transition-colors cursor-pointer"
            title="Reset demo state and draft"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset demo</span>
          </button>
        </div>
      </div>

      {/* Main App Shell Container (x≈57, y≈73, w≈1486, h≈1055) */}
      <div
        className={`w-full bg-[#08090B] border border-[#252831] rounded-[36px] shadow-2xl flex overflow-hidden relative transition-all duration-300 ${
          presentationMode
            ? 'max-w-[1486px] min-h-[960px] h-[92vh]'
            : 'max-w-[1540px] min-h-[920px] h-[94vh]'
        }`}
      >
        {/* Navigation Rail */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
          {/* Header */}
          <Header />

          {/* Dynamic Active View */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            {renderActiveView()}
          </main>

          {/* Persistent Notifications Toast Container */}
          <ToastContainer />
        </div>

        {/* Global Modals */}
        <SearchModal />
        <NewCampaignModal />
        <GenerationModal />
        <LaunchModal />
        <RemixModal />
        <ApprovalDetailsModal />
        <RemixQueueModal />
      </div>
    </div>
  );
};
