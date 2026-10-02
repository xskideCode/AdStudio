import React from 'react';
import { X, CheckCircle, Clock, Send, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ApprovalDetailsModal: React.FC = () => {
  const { 
    isApprovalDetailsOpen, 
    setIsApprovalDetailsOpen, 
    approvalRecord, 
    setApprovalRecord,
    variations 
  } = useApp();

  if (!isApprovalDetailsOpen || !approvalRecord) return null;

  const handleSimulateMayaApproval = () => {
    setApprovalRecord({
      ...approvalRecord,
      status: 'approved',
    });
  };

  const handleRevoke = () => {
    setApprovalRecord(null);
    setIsApprovalDetailsOpen(false);
  };

  const selectedVariations = variations.filter((v) => v.selected);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[560px] bg-[#121419] border border-[#343842] rounded-[32px] p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-[#252831]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1A1D24] border border-[#343842] flex items-center justify-center text-[#ACD9F3]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F0F1F7] font-heading">
                Creative Approval Review
              </h3>
              <p className="text-xs text-[#A0A1AA]">
                Status: {approvalRecord.status === 'approved' ? 'Approved by Maya' : 'Pending Brand Compliance Review'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsApprovalDetailsOpen(false)}
            className="text-[#727681] hover:text-[#F0F1F7] p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 flex flex-col gap-3">
          <div className="p-3 bg-[#1A1D24] rounded-2xl border border-[#252831] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#F4C36A] text-[#121419] font-bold text-xs flex items-center justify-center">
                MO
              </div>
              <div>
                <div className="font-semibold text-[#F0F1F7]">Maya Ortiz</div>
                <div className="text-[10px] text-[#727681]">Designated Brand Approver</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[#ACD9F3] bg-[#ACD9F3]/10 px-2 py-0.5 rounded-full border border-[#ACD9F3]/20">
              {approvalRecord.status === 'approved' ? '✓ Approved' : 'Reviewing (Est. 4 min)'}
            </span>
          </div>

          <div className="text-xs text-[#727681] font-semibold uppercase tracking-wider mt-1">
            Submitted Creatives ({selectedVariations.length})
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {selectedVariations.map((v) => (
              <div key={v.id} className="flex items-center gap-2.5 p-2 bg-[#1A1D24] rounded-xl border border-[#252831]">
                <img src={v.image} alt={v.title} className="w-8 h-8 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#F0F1F7] truncate">{v.title}</div>
                  <div className="text-[10px] text-[#727681]">{v.format}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-[#727681]">
            Channels: <span className="text-[#F0F1F7] font-medium">Meta & TikTok</span> · A/B 5,000 impression test enabled.
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#252831] text-xs">
          <button
            onClick={handleRevoke}
            className="text-[#F18E87] hover:underline cursor-pointer"
          >
            Cancel / Revoke approval
          </button>

          <div className="flex items-center gap-2">
            {approvalRecord.status !== 'approved' && (
              <button
                onClick={handleSimulateMayaApproval}
                className="px-4 py-2 rounded-xl bg-[#252831] hover:bg-[#343842] text-[#66D4AA] font-medium cursor-pointer"
              >
                Simulate Maya Approve
              </button>
            )}
            <button
              onClick={() => setIsApprovalDetailsOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#ACD9F3] text-[#08090B] font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
