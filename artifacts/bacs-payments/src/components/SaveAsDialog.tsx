import { useState, useEffect } from "react";
import {
  MdArrowBack,
  MdArrowUpward,
  MdCreateNewFolder,
  MdGridView,
  MdFolder,
  MdComputer,
  MdExpandMore,
  MdHelpOutline,
} from "react-icons/md";

interface SaveAsDialogProps {
  open: boolean;
  onClose: () => void;
  defaultFileName: string;
  fileType: "BACS" | "CSV" | "QRP";
  onSave?: (fileName: string) => void;
}

const FOLDERS = [
  "2019 Tax Codes", "2020 Tax Codes", "2021 Tax Codes", "2022 Tax Codes",
  "2023 Tax Codes", "2024 Tax Codes", "ANB Controls", "Annuity Archive Boxes",
  "Annuity email templates", "Annuity Servicing Team", "AQA", "AQT",
  "Archive", "Archived rolling sheets", "AU",
  "BACS", "BPM", "BSO", "BSO Projects", "Buddy transfer quotes",
  "Business Objects", "cc", "CFPPFM Mailing feedback", "Cheque List",
  "Cheque Requisitions", "chq folder", "Core Data", "Customer Res Work 27.08.25",
  "Daily Bank Rec Reports", "Disclosure Checks",
];

const SIDEBAR = [
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
];

const TYPE_LABEL: Record<string, string> = {
  QRP: "QuickReport file(*.QRP)",
  BACS: "BACS file(*.BACS)",
  CSV: "Comma Separated Values(*.CSV)",
};

export default function SaveAsDialog({ open, onClose, defaultFileName, fileType, onSave }: SaveAsDialogProps) {
  const [fileName, setFileName] = useState(defaultFileName);
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    if (open) {
      setFileName(defaultFileName);
      setSelected(null);
    }
  }, [open, defaultFileName]);
  if (!open) return null;

  const toolBtn =
    "h-7 w-7 flex items-center justify-center rounded-[4px] text-[#1f1f1f] hover:bg-[#e5e5e5] cursor-pointer";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <div className="bg-[#f3f3f3] rounded-[8px] shadow-2xl border border-[#d1d1d1] w-[640px] overflow-hidden flex flex-col">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#f3f3f3] border-b border-[#e5e5e5]">
          <span className="text-sm font-semibold text-[#1f1f1f]">Save report</span>
          <div className="flex items-center gap-1">
            <button title="Help" className={toolBtn}><MdHelpOutline className="text-[15px]" /></button>
            <button onClick={onClose} aria-label="Close" className={toolBtn}>✕</button>
          </div>
        </div>

        {/* Save in row */}
        <div className="px-4 py-3 flex items-center gap-2 bg-[#f3f3f3] border-b border-[#e5e5e5]">
          <label className="text-xs text-[#1f1f1f]"><span className="underline">S</span>ave in:</label>
          <button className="flex items-center gap-2 bg-white border border-[#8a8a8a] rounded-[4px] h-7 px-2 min-w-[260px] hover:border-[#0067c0] cursor-pointer">
            <MdFolder className="text-[#f5b945] text-base" />
            <span className="text-xs text-[#1f1f1f]">Annuities</span>
            <MdExpandMore className="ml-auto text-[#1f1f1f]" />
          </button>
          <div className="ml-auto flex items-center gap-0.5">
            <button title="Back" className={toolBtn}><MdArrowBack className="text-[15px]" /></button>
            <button title="Up one level" className={toolBtn}><MdArrowUpward className="text-[15px]" /></button>
            <button title="Create new folder" className={toolBtn}><MdCreateNewFolder className="text-[15px]" /></button>
            <button title="Views" className={toolBtn}><MdGridView className="text-[15px]" /></button>
          </div>
        </div>

        {/* Body: sidebar + file list */}
        <div className="flex flex-1 min-h-0 bg-white">
          <div className="w-[100px] bg-[#eaeaea] border-r border-[#d1d1d1] flex flex-col py-2 gap-0.5 overflow-y-auto">
            {SIDEBAR.map((item, i) => (
              <button
                key={i}
                className="flex flex-col items-center text-[#1f1f1f] hover:bg-[#dcdcdc] w-full px-1 py-1.5 cursor-pointer transition-colors"
              >
                <MdComputer className="text-[28px] text-[#0067c0] mb-0.5" />
                <span className="text-[10px] leading-tight text-center">{item.label}</span>
                <span className="text-[10px] leading-tight text-center">{item.sub}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white overflow-auto" style={{ height: "260px" }}>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0 p-1.5">
              {FOLDERS.map((folder, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-[2px] text-left cursor-pointer transition-colors ${
                    selected === i
                      ? "bg-[#0067c0] text-white"
                      : "bg-white hover:bg-[#e5f1fb] text-[#1f1f1f]"
                  }`}
                >
                  <MdFolder className={selected === i ? "text-white text-base" : "text-[#f5b945] text-base"} />
                  <span className="text-xs">{folder}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#e5e5e5] bg-[#f3f3f3] grid grid-cols-[90px_1fr_auto] gap-x-3 gap-y-2 items-center">
          <label className="text-xs text-[#1f1f1f]">File <span className="underline">n</span>ame:</label>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="border border-[#8a8a8a] rounded-[4px] bg-white px-2 h-7 text-xs text-[#1f1f1f] focus:outline-none focus:border-[#0067c0]"
          />
          <button
            onClick={() => { if (fileName.trim()) { onSave?.(fileName.trim()); onClose(); } }}
            className="h-7 px-6 text-xs font-semibold border border-[#0067c0] bg-[#0067c0] text-white rounded-[4px] hover:bg-[#005ba1] cursor-pointer"
          >
            Save
          </button>

          <label className="text-xs text-[#1f1f1f]">Save as <span className="underline">t</span>ype:</label>
          <button className="flex items-center gap-2 bg-white border border-[#8a8a8a] rounded-[4px] h-7 px-2 hover:border-[#0067c0] cursor-pointer">
            <span className="text-xs text-[#1f1f1f]">{TYPE_LABEL[fileType] ?? fileType}</span>
            <MdExpandMore className="ml-auto text-[#1f1f1f]" />
          </button>
          <button
            onClick={onClose}
            className="h-7 px-6 text-xs border border-[#8a8a8a] bg-[#f3f3f3] text-[#1f1f1f] rounded-[4px] hover:bg-[#e5e5e5] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
