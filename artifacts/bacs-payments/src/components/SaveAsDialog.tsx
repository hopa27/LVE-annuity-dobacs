import { useState, useEffect } from "react";
import {
  MdClose,
  MdArrowBack,
  MdArrowUpward,
  MdCreateNewFolder,
  MdGridView,
  MdFolder,
  MdStorage,
  MdExpandMore,
} from "react-icons/md";

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
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    if (open) {
      setFileName(defaultFileName);
      setSelected(null);
    }
  }, [open, defaultFileName]);
  if (!open) return null;

  const iconBtn =
    "h-9 w-9 flex items-center justify-center rounded-full bg-white text-[#04589b] border border-[#04589b] hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#BBBBBB] w-[760px] max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#00263e] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-['Livvic'] text-base font-semibold">Save As</span>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          >
            <MdClose className="text-lg" />
          </button>
        </div>

        {/* Save in row */}
        <div className="px-5 py-3 flex items-center gap-3 border-b border-[#BBBBBB] bg-[#fafbfc]">
          <span className="font-['Livvic'] text-sm font-medium text-[#3d3d3d]">Save in:</span>
          <button className="flex items-center gap-2 bg-white border border-[#BBBBBB] rounded-[8px] h-9 px-3 min-w-[220px] hover:border-[#04589b] cursor-pointer">
            <MdFolder className="text-[#f5b945]" />
            <span className="font-['Mulish'] text-sm text-[#3d3d3d]">Annuities</span>
            <MdExpandMore className="ml-auto text-[#3d3d3d]" />
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button title="Back" className={iconBtn}><MdArrowBack className="text-lg" /></button>
            <button title="Up" className={iconBtn}><MdArrowUpward className="text-lg" /></button>
            <button title="New folder" className={iconBtn}><MdCreateNewFolder className="text-lg" /></button>
            <button title="View" className={iconBtn}><MdGridView className="text-lg" /></button>
          </div>
        </div>

        {/* Body: sidebar + file list */}
        <div className="flex flex-1 min-h-0">
          <div className="w-[140px] bg-[#00263e] flex flex-col py-3 gap-1 overflow-y-auto">
            {SIDEBAR.map((item, i) => (
              <button
                key={i}
                className="flex flex-col items-center text-white hover:bg-[#003578] w-full px-2 py-2 cursor-pointer transition-colors"
              >
                <MdStorage className="text-2xl mb-1" />
                <span className="font-['Mulish'] text-[11px] leading-tight text-center">{item.label}</span>
                <span className="font-['Mulish'] text-[11px] leading-tight text-center">{item.sub}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white overflow-auto" style={{ height: "320px" }}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 p-3">
              {FOLDERS.map((folder, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[6px] text-left cursor-pointer transition-colors ${
                    selected === i
                      ? "bg-[#006cf4] text-white"
                      : i % 2 === 0
                      ? "bg-white hover:bg-[#e7ebec34] text-[#3d3d3d]"
                      : "bg-[#e7ebec34] hover:bg-[#dde3e5] text-[#3d3d3d]"
                  }`}
                >
                  <MdFolder className={selected === i ? "text-white" : "text-[#f5b945]"} />
                  <span className="font-['Mulish'] text-sm">{folder}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t-[3px] border-[#04589b] bg-[#fafbfc] grid grid-cols-[110px_1fr_auto] gap-x-4 gap-y-3 items-center">
          <label className="font-['Livvic'] text-sm font-medium text-[#3d3d3d]">File name:</label>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="border border-[#BBBBBB] rounded-[8px] bg-white px-3 h-10 font-['Mulish'] text-sm text-[#3d3d3d] focus:outline-none focus:border-[#04589b]"
          />
          <button
            onClick={onClose}
            className="h-10 px-8 rounded-[30px] font-['Livvic'] text-sm font-bold bg-[#006cf4] text-white shadow-md hover:bg-[#003578] transition-colors cursor-pointer"
          >
            Save
          </button>

          <label className="font-['Livvic'] text-sm font-medium text-[#3d3d3d]">Save as type:</label>
          <button className="flex items-center gap-2 bg-white border border-[#BBBBBB] rounded-[8px] h-10 px-3 hover:border-[#04589b] cursor-pointer">
            <span className="font-['Mulish'] text-sm text-[#3d3d3d]">{fileType}</span>
            <MdExpandMore className="ml-auto text-[#3d3d3d]" />
          </button>
          <button
            onClick={onClose}
            className="h-10 px-8 rounded-[30px] font-['Livvic'] text-sm font-bold bg-white text-[#04589b] border border-[#04589b] hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
