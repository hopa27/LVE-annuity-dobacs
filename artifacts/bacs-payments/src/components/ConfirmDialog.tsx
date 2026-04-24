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
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30"
      style={{ fontFamily: "'Tahoma', 'Segoe UI', system-ui, sans-serif" }}
    >
      <div
        className="bg-[#ece9d8] border border-[#0a246a] w-[460px] overflow-hidden"
        style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.35)" }}
      >
        {/* Title bar — classic XP gradient */}
        <div
          className="flex items-center justify-between h-[26px] pl-2 pr-1 select-none"
          style={{
            background: "linear-gradient(to bottom, #0a246a 0%, #1f4ec8 6%, #3a6fe1 30%, #1f4ec8 70%, #0a246a 100%)",
          }}
        >
          <span className="text-[12px] font-bold text-white">{title}</span>
          <button
            onClick={onCancel}
            className="h-[20px] w-[22px] flex items-center justify-center text-white text-[12px] font-bold cursor-pointer hover:bg-[#e81123] border border-transparent hover:border-white/40"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex items-start gap-5 bg-[#ece9d8]">
          <div className="shrink-0 w-12 h-12 rounded-full bg-[#cfd8e8] border border-[#7da0d3] flex items-center justify-center" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}>
            <span className="text-[#1a3a8a] text-[34px] leading-none font-bold" style={{ fontFamily: "'Tahoma', sans-serif" }}>?</span>
          </div>
          <p className="text-[12px] text-[#000] leading-snug pt-2">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-5 pt-1 flex items-center justify-center gap-3 bg-[#ece9d8]">
          <button
            onClick={onOk}
            className="min-w-[78px] h-[24px] px-3 text-[12px] bg-[#ece9d8] border border-[#003c74] hover:bg-[#dde6f5] active:bg-[#cfd8e8] cursor-pointer text-[#000]"
            style={{ boxShadow: "inset 0 1px 0 #fff, inset 0 -1px 0 #b4b1a0" }}
            autoFocus
          >
            OK
          </button>
          <button
            onClick={onCancel}
            className="min-w-[78px] h-[24px] px-3 text-[12px] bg-[#ece9d8] border border-[#003c74] hover:bg-[#dde6f5] active:bg-[#cfd8e8] cursor-pointer text-[#000]"
            style={{ boxShadow: "inset 0 1px 0 #fff, inset 0 -1px 0 #b4b1a0" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
