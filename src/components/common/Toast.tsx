import React from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { 
    currentView, 
    approvalRecord, 
    remixRecord, 
    setIsApprovalDetailsOpen, 
    setIsRemixQueueOpen,
    setApprovalRecord,
    setRemixRecord
  } = useApp();

  return (
    <div className="absolute top-4 right-8 z-50 flex flex-col gap-3 pointer-events-auto">
      {/* Studio Awaiting Approval Toast (Reference 08) */}
      {currentView === 'studio' && approvalRecord && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#121419]/95 backdrop-blur-md border border-[#343842] rounded-2xl shadow-2xl min-w-[340px] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="w-9 h-9 rounded-xl bg-[#252831] flex items-center justify-center text-[#ACD9F3] shrink-0">
            <Send className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-[#F0F1F7] truncate">
              Sent to Maya Ortiz for approval
            </h4>
            <p className="text-xs text-[#A0A1AA] truncate">
              {approvalRecord.variationsCount} creatives on Meta and TikTok
            </p>
          </div>
          <button
            onClick={() => setIsApprovalDetailsOpen(true)}
            className="text-xs font-semibold text-[#ACD9F3] hover:underline cursor-pointer px-1 py-1"
          >
            View
          </button>
          <button
            onClick={() => setApprovalRecord(null)}
            className="text-[#727681] hover:text-[#F0F1F7] p-1 cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Performance Remix Queued Toast (Reference 11) */}
      {currentView === 'performance' && remixRecord && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#121419]/95 backdrop-blur-md border border-[#343842] rounded-2xl shadow-2xl min-w-[340px] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="w-9 h-9 rounded-xl bg-[#292638] flex items-center justify-center text-[#BEB0F4] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-[#F0F1F7] truncate">
              Remixing 19 ads
            </h4>
            <p className="text-xs text-[#A0A1AA] truncate">
              Ready for Maya to review in about 4 min
            </p>
          </div>
          <button
            onClick={() => setIsRemixQueueOpen(true)}
            className="text-xs font-semibold text-[#BEB0F4] hover:underline cursor-pointer px-1 py-1"
          >
            View
          </button>
          <button
            onClick={() => setRemixRecord(null)}
            className="text-[#727681] hover:text-[#F0F1F7] p-1 cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
