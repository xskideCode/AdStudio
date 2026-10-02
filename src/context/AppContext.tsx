import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  ApprovalRecord, 
  BrandDnaData, 
  CampaignDraft, 
  CreativeConcept, 
  RemixRecord, 
  Variation, 
  ViewType 
} from '../types';
import { 
  INITIAL_BRAND_DNA, 
  INITIAL_CAMPAIGN_DRAFT, 
  INITIAL_CONCEPTS, 
  INITIAL_VARIATIONS 
} from '../constants/mockData';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  
  // Modals
  isNewCampaignModalOpen: boolean;
  setIsNewCampaignModalOpen: (open: boolean) => void;
  isGeneratingModalOpen: boolean;
  setIsGeneratingModalOpen: (open: boolean) => void;
  isLaunchModalOpen: boolean;
  setIsLaunchModalOpen: (open: boolean) => void;
  isRemixModalOpen: boolean;
  setIsRemixModalOpen: (open: boolean) => void;
  isApprovalDetailsOpen: boolean;
  setIsApprovalDetailsOpen: (open: boolean) => void;
  isRemixQueueOpen: boolean;
  setIsRemixQueueOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isBrandSwitcherOpen: boolean;
  setIsBrandSwitcherOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // State records
  brandDna: BrandDnaData;
  setBrandDna: React.Dispatch<React.SetStateAction<BrandDnaData>>;
  campaignDraft: CampaignDraft;
  setCampaignDraft: React.Dispatch<React.SetStateAction<CampaignDraft>>;
  variations: Variation[];
  setVariations: React.Dispatch<React.SetStateAction<Variation[]>>;
  toggleVariationSelect: (id: string) => void;
  addNewVariation: () => void;
  
  concepts: CreativeConcept[];
  setConcepts: React.Dispatch<React.SetStateAction<CreativeConcept[]>>;
  selectedConceptId: string;
  setSelectedConceptId: (id: string) => void;
  aspectRatio: '9:16' | '4:5' | '1:1';
  setAspectRatio: (ar: '9:16' | '4:5' | '1:1') => void;
  activeStudioTab: 'Concepts' | 'Variations' | 'Copy';
  setActiveStudioTab: (tab: 'Concepts' | 'Variations' | 'Copy') => void;
  
  performanceTab: 'Campaigns' | 'Creatives' | 'Elements';
  setPerformanceTab: (tab: 'Campaigns' | 'Creatives' | 'Elements') => void;

  approvalRecord: ApprovalRecord | null;
  setApprovalRecord: (rec: ApprovalRecord | null) => void;
  remixRecord: RemixRecord | null;
  setRemixRecord: (rec: RemixRecord | null) => void;

  // Actions
  startNewCampaignFlow: () => void;
  submitInitialPromptToWriteBrief: (promptText: string) => void;
  startGeneratingConcepts: () => void;
  completeGenerationAndGoToStudio: () => void;
  launchSelectedCreatives: (settings: { budget: number; schedule: string }) => void;
  confirmRemix19Ads: () => void;
  resetDemo: () => void;

  // Presentation / Zoom framing toggle
  presentationMode: boolean;
  setPresentationMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    return (localStorage.getItem('adstudio_view') as ViewType) || 'overview';
  });

  const [brandDna, setBrandDna] = useState<BrandDnaData>(() => {
    const saved = localStorage.getItem('adstudio_brand_dna');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_DNA;
  });

  const [campaignDraft, setCampaignDraft] = useState<CampaignDraft>(() => {
    const saved = localStorage.getItem('adstudio_campaign_draft');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGN_DRAFT;
  });

  const [variations, setVariations] = useState<Variation[]>(() => {
    const saved = localStorage.getItem('adstudio_variations');
    return saved ? JSON.parse(saved) : INITIAL_VARIATIONS;
  });

  const [concepts, setConcepts] = useState<CreativeConcept[]>(INITIAL_CONCEPTS);
  const [selectedConceptId, setSelectedConceptId] = useState<string>('1');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '4:5' | '1:1'>('9:16');
  const [activeStudioTab, setActiveStudioTab] = useState<'Concepts' | 'Variations' | 'Copy'>('Concepts');
  const [performanceTab, setPerformanceTab] = useState<'Campaigns' | 'Creatives' | 'Elements'>('Elements');

  const [approvalRecord, setApprovalRecord] = useState<ApprovalRecord | null>(() => {
    const saved = localStorage.getItem('adstudio_approval');
    return saved ? JSON.parse(saved) : null;
  });

  const [remixRecord, setRemixRecord] = useState<RemixRecord | null>(() => {
    const saved = localStorage.getItem('adstudio_remix');
    return saved ? JSON.parse(saved) : null;
  });

  // Dialogs
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [isGeneratingModalOpen, setIsGeneratingModalOpen] = useState(false);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isRemixModalOpen, setIsRemixModalOpen] = useState(false);
  const [isApprovalDetailsOpen, setIsApprovalDetailsOpen] = useState(false);
  const [isRemixQueueOpen, setIsRemixQueueOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrandSwitcherOpen, setIsBrandSwitcherOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Presentation zoom/fit toggle
  const [presentationMode, setPresentationMode] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('adstudio_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('adstudio_brand_dna', JSON.stringify(brandDna));
  }, [brandDna]);

  useEffect(() => {
    localStorage.setItem('adstudio_campaign_draft', JSON.stringify(campaignDraft));
  }, [campaignDraft]);

  useEffect(() => {
    localStorage.setItem('adstudio_variations', JSON.stringify(variations));
  }, [variations]);

  useEffect(() => {
    if (approvalRecord) {
      localStorage.setItem('adstudio_approval', JSON.stringify(approvalRecord));
    } else {
      localStorage.removeItem('adstudio_approval');
    }
  }, [approvalRecord]);

  useEffect(() => {
    if (remixRecord) {
      localStorage.setItem('adstudio_remix', JSON.stringify(remixRecord));
    } else {
      localStorage.removeItem('adstudio_remix');
    }
  }, [remixRecord]);

  // Keyboard shortcut Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsNewCampaignModalOpen(false);
        setIsGeneratingModalOpen(false);
        setIsLaunchModalOpen(false);
        setIsRemixModalOpen(false);
        setIsApprovalDetailsOpen(false);
        setIsRemixQueueOpen(false);
        setIsSearchOpen(false);
        setIsBrandSwitcherOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleVariationSelect = (id: string) => {
    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, selected: !v.selected } : v))
    );
  };

  const addNewVariation = () => {
    const nextLetter = String.fromCharCode(65 + variations.length);
    const newVar: Variation = {
      id: nextLetter,
      letter: nextLetter,
      title: `Variation ${nextLetter}`,
      format: 'Static 1:1',
      image: variations[0]?.image || '',
      selected: true,
      onBrand: true,
      ctr: '3.6%',
    };
    setVariations((prev) => [...prev, newVar]);
  };

  // Flow handlers matching video
  const startNewCampaignFlow = () => {
    setIsNewCampaignModalOpen(true);
  };

  const submitInitialPromptToWriteBrief = (promptText: string) => {
    setCampaignDraft((prev) => ({
      ...prev,
      prompt: promptText || 'Launch our new dog cap collection.',
    }));
    setIsNewCampaignModalOpen(false);
    setCurrentView('new_campaign_wizard');
  };

  const startGeneratingConcepts = () => {
    setIsGeneratingModalOpen(true);
  };

  const completeGenerationAndGoToStudio = () => {
    setIsGeneratingModalOpen(false);
    setCurrentView('studio');
  };

  const launchSelectedCreatives = (settings: { budget: number; schedule: string }) => {
    const selectedCount = variations.filter((v) => v.selected).length;
    const newApproval: ApprovalRecord = {
      timestamp: Date.now(),
      variationsCount: selectedCount,
      channels: ['Meta', 'TikTok'],
      approverName: 'Maya Ortiz',
      status: 'pending',
    };
    setApprovalRecord(newApproval);
    setIsLaunchModalOpen(false);
  };

  const confirmRemix19Ads = () => {
    const newRemix: RemixRecord = {
      timestamp: Date.now(),
      adsCount: 19,
      channels: ['Meta', 'TikTok'],
      status: 'queued',
    };
    setRemixRecord(newRemix);
    setIsRemixModalOpen(false);
  };

  const resetDemo = () => {
    localStorage.clear();
    setBrandDna(INITIAL_BRAND_DNA);
    setCampaignDraft(INITIAL_CAMPAIGN_DRAFT);
    setVariations(INITIAL_VARIATIONS);
    setConcepts(INITIAL_CONCEPTS);
    setSelectedConceptId('1');
    setAspectRatio('9:16');
    setApprovalRecord(null);
    setRemixRecord(null);
    setCurrentView('overview');
    setIsNewCampaignModalOpen(false);
    setIsGeneratingModalOpen(false);
    setIsLaunchModalOpen(false);
    setIsRemixModalOpen(false);
    setIsApprovalDetailsOpen(false);
    setIsRemixQueueOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isNewCampaignModalOpen,
        setIsNewCampaignModalOpen,
        isGeneratingModalOpen,
        setIsGeneratingModalOpen,
        isLaunchModalOpen,
        setIsLaunchModalOpen,
        isRemixModalOpen,
        setIsRemixModalOpen,
        isApprovalDetailsOpen,
        setIsApprovalDetailsOpen,
        isRemixQueueOpen,
        setIsRemixQueueOpen,
        isSearchOpen,
        setIsSearchOpen,
        isBrandSwitcherOpen,
        setIsBrandSwitcherOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,

        brandDna,
        setBrandDna,
        campaignDraft,
        setCampaignDraft,
        variations,
        setVariations,
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

        performanceTab,
        setPerformanceTab,

        approvalRecord,
        setApprovalRecord,
        remixRecord,
        setRemixRecord,

        startNewCampaignFlow,
        submitInitialPromptToWriteBrief,
        startGeneratingConcepts,
        completeGenerationAndGoToStudio,
        launchSelectedCreatives,
        confirmRemix19Ads,
        resetDemo,

        presentationMode,
        setPresentationMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
