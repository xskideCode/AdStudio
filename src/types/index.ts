export type ViewType = 
  | 'overview' 
  | 'campaigns' 
  | 'studio' 
  | 'assets' 
  | 'brand_brain' 
  | 'performance' 
  | 'experiments' 
  | 'insights' 
  | 'team' 
  | 'settings' 
  | 'help'
  | 'new_campaign_wizard';

export interface CampaignDraft {
  prompt: string;
  objective: string;
  product: string;
  audience: string;
  keyMessage: string;
  hooks: {
    id: number;
    title: string;
    text: string;
    predictedStrength: number; // 1-5
  }[];
  tone: string[];
  formats: string[];
  callToAction: string;
  guardrails: string;
}

export interface BrandDnaData {
  confidence: number;
  toneScore: number;
  toneLabel: string;
  visualScore: number;
  visualLabel: string;
  energyScore: number;
  energyLabel: string;
  technicalScore: number;
  technicalLabel: string;
  toneTags: string[];
  visualTags: string[];
  avoidTags: string[];
  colors: { name: string; hex: string; usagePct: number }[];
  typography: {
    headlines: string;
    body: string;
    sampleHeadline: string;
    sampleBody: string;
  };
  voiceSample: string;
  voiceMatchPct: number;
  sources: {
    id: string;
    name: string;
    type: string;
    detail: string;
    status: 'Learned' | 'Learning 64%' | 'Pending';
  }[];
}

export interface Variation {
  id: string; // 'A' | 'B' | 'C' ...
  letter: string;
  title: string;
  format: 'Video 9:16' | 'Static 1:1' | 'Carousel 4:5';
  duration?: string;
  image: string;
  selected: boolean;
  onBrand: boolean;
  ctr?: string;
}

export interface CreativeConcept {
  id: string;
  hookNumber: number;
  hookName: string;
  title: string;
  type: string;
  duration?: string;
  format: '9:16' | '4:5' | '1:1';
  image: string;
  headline: string;
  body: string;
  cta: string;
  brandScore: number;
  predictedCtrRange: string;
  selected: boolean;
}

export interface PerformanceElement {
  id: string;
  name: string;
  type: 'Visual' | 'Hook' | 'Opening' | 'Format' | 'Colour' | 'Call to action';
  usedIn: string;
  ctr: string;
  liftPct: number; // positive or negative
}

export interface LaunchSettings {
  dailyBudget: number;
  schedule: string;
  optimiseFor: string;
  channels: {
    meta: boolean;
    tiktok: boolean;
    google: boolean;
  };
  runAsExperiment: boolean;
}

export interface ApprovalRecord {
  timestamp: number;
  variationsCount: number;
  channels: string[];
  approverName: string;
  status: 'pending' | 'approved';
}

export interface RemixRecord {
  timestamp: number;
  adsCount: number;
  channels: string[];
  status: 'queued' | 'processing' | 'ready';
}
