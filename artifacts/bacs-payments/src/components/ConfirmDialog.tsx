import { MdHelpOutline } from "react-icons/md";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onOk: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title = "Confirm", message, onOk, onCancel }: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-xl border border-[#BBBBBB] w-[480px] overflow-hidden">
        <div className="bg-[#00263e] text-white px-4 py-2 flex items-center justify-between">
          <span className="font-['Livvic'] text-sm font-semibold">{title}</span>
          <button
            onClick={onCancel}
            className="text-white hover:bg-white/10 w-6 h-6 rounded flex items-center justify-center cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#e0eefc] flex items-center justify-center shrink-0">
            <MdHelpOutline className="text-[#04589b] text-2xl" />
          </div>
          <p className="font-['Mulish'] text-[15px] text-[#3d3d3d] leading-relaxed pt-1">
            {message}
          </p>
        </div>
        <div className="px-6 pb-5 flex items-center justify-center gap-3">
          <button
            onClick={onOk}
            autoFocus
            className="h-[40px] px-8 rounded-[30px] font-['Livvic'] text-sm font-bold bg-[#006cf4] text-white hover:bg-[#003578] transition-colors cursor-pointer"
          >
            OK
          </button>
          <button
            onClick={onCancel}
            className="h-[40px] px-8 rounded-[30px] font-['Livvic'] text-sm font-bold bg-white text-[#04589b] border border-[#04589b] hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
