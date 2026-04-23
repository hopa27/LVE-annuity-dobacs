import { useState, useEffect } from "react";

interface SaveAsDialogProps {
  open: boolean;
  onClose: () => void;
  defaultFileName: string;
  fileType: "BACS" | "CSV";
}

const FOLDERS = [
  "2019 Tax Codes", "2020 Tax Codes", "2021 Tax Codes", "2022 Tax Codes",
  "2023 Tax Codes", "2024 Tax Codes", "ANB Controls", "Annuity Archive Boxes",
  "Annuity email templates", "Annuity Servicing Team", "AQA", "AQT",
  "Archive", "Archived rolling sheets", "AU",
  "BACS", "BPM", "BSO", "BSO Projects", "Buddy transfer quotes",
  "Business Objects", "cc", "CFPPFM Mailing feedba", "Cheque List",
  "Cheque Reqiusitions", "chq folder", "Core Data", "Customer Res Work 27",
  "Daily Bank Rec Reports", "Disclosure Checks",
];

const SIDEBAR = [
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
  { label: "Ual3 on", sub: "'hk/li01' (H:)" },
];

export default function SaveAsDialog({ open, onClose, defaultFileName, fileType }: SaveAsDialogProps) {
  const [fileName, setFileName] = useState(defaultFileName);
  useEffect(() => { if (open) setFileName(defaultFileName); }, [open, defaultFileName]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" style={{ fontFamily: "Tahoma, 'MS Sans Serif', sans-serif" }}>
      <div className="bg-[#ECE9D8] border border-[#0054E3] shadow-2xl" style={{ width: "560px" }}>
        {/* Title bar */}
        <div className="flex items-center justify-between px-2 py-1" style={{ background: "linear-gradient(to bottom, #0058E1 0%, #2C8FE3 50%, #0058E1 100%)" }}>
          <span className="text-white text-[12px] font-bold">Save As</span>
          <button
            onClick={onClose}
            className="w-[18px] h-[16px] flex items-center justify-center text-white text-[11px] font-bold border border-[#0054E3] cursor-pointer"
            style={{ background: "linear-gradient(to bottom, #F88858 0%, #B83830 100%)" }}
          >
            ×
          </button>
        </div>

        {/* Save in row */}
        <div className="px-3 py-2 flex items-center gap-2 border-b border-[#ACA899]">
          <span className="text-[11px] text-black">Save in:</span>
          <div className="flex items-center bg-white border border-[#7F9DB9] px-1 h-[20px] flex-1 max-w-[230px]">
            <div className="w-4 h-4 mr-1 bg-[#FFF8B3] border border-[#A88D4A]" />
            <span className="text-[11px]">Annuities</span>
            <span className="ml-auto text-[10px] text-gray-600">▼</span>
          </div>
          <button className="w-[22px] h-[22px] border border-[#ACA899] bg-[#ECE9D8] text-[10px]">←</button>
          <button className="w-[22px] h-[22px] border border-[#ACA899] bg-[#ECE9D8] text-[10px]">↑</button>
          <button className="w-[22px] h-[22px] border border-[#ACA899] bg-[#ECE9D8] text-[10px]">📁</button>
          <button className="w-[22px] h-[22px] border border-[#ACA899] bg-[#ECE9D8] text-[10px]">▦</button>
        </div>

        {/* Body: sidebar + file list */}
        <div className="flex">
          <div className="w-[68px] bg-[#7F8FB1] flex flex-col items-center py-2 gap-2">
            {SIDEBAR.map((item, i) => (
              <button key={i} className="flex flex-col items-center text-white hover:bg-[#9AAACB] w-full px-1 py-1 cursor-pointer">
                <div className="w-7 h-6 bg-[#D6D2C2] border border-[#5A5A5A] mb-0.5" />
                <span className="text-[9px] leading-tight text-center">{item.label}</span>
                <span className="text-[9px] leading-tight text-center">{item.sub}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white border-l border-r border-b border-[#7F9DB9] m-2 ml-1 overflow-auto" style={{ height: "230px" }}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 p-2 text-[11px] text-black">
              {FOLDERS.map((folder, i) => (
                <div key={i} className="flex items-center gap-1.5 px-1 py-0.5 hover:bg-[#316AC5] hover:text-white cursor-pointer">
                  <div className="w-4 h-4 bg-[#FFF8B3] border border-[#A88D4A] flex-shrink-0" />
                  <span>{folder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer rows */}
        <div className="px-3 pb-3 pt-1 grid grid-cols-[80px_1fr_80px] gap-x-2 gap-y-2 items-center">
          <span className="text-[11px] text-black">File name:</span>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="border border-[#7F9DB9] bg-white px-1 h-[20px] text-[11px] text-black"
          />
          <button
            onClick={onClose}
            className="h-[22px] border border-[#003C74] bg-[#ECE9D8] text-[11px] cursor-pointer hover:bg-[#D6D2C2]"
          >
            Save
          </button>
          <span className="text-[11px] text-black">Save as type:</span>
          <div className="flex items-center bg-white border border-[#7F9DB9] px-1 h-[20px]">
            <span className="text-[11px]">{fileType}</span>
            <span className="ml-auto text-[10px] text-gray-600">▼</span>
          </div>
          <button
            onClick={onClose}
            className="h-[22px] border border-[#003C74] bg-[#ECE9D8] text-[11px] cursor-pointer hover:bg-[#D6D2C2]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
