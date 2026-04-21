interface InfoDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onOk: () => void;
}

export default function InfoDialog({ open, title = "DoBacs", message, onOk }: InfoDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-xl border border-[#BBBBBB] w-[360px] overflow-hidden">
        <div className="bg-[#00263e] text-white px-4 py-2 flex items-center justify-between">
          <span className="font-['Livvic'] text-sm font-semibold">{title}</span>
          <button
            onClick={onOk}
            className="text-white hover:bg-white/10 w-6 h-6 rounded flex items-center justify-center cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-6 flex items-center justify-center">
          <p className="font-['Mulish'] text-[15px] text-[#3d3d3d]">
            {message}
          </p>
        </div>
        <div className="px-6 pb-5 flex items-center justify-center">
          <button
            onClick={onOk}
            className="h-[40px] px-10 rounded-[30px] font-['Livvic'] text-sm font-bold bg-[#006cf4] text-white hover:bg-[#003578] transition-colors cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
