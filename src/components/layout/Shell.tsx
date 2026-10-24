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

export const Shell: React.FC = () => {
  const { currentView } = useApp();

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
    <div className="h-dvh w-full bg-[#08090B] text-[#F0F1F7] flex flex-col md:flex-row overflow-hidden relative font-sans">
      {/* Desktop/Tablet Navigation Rail + Mobile Bottom Bar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative bg-[#08090B]">
        {/* Global Top Header */}
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
  );
};
