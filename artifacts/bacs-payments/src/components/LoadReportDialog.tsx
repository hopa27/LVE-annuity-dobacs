import { useState, useEffect, useRef } from "react";
import {
  MdArrowBack,
  MdArrowForward,
  MdArrowUpward,
  MdRefresh,
  MdSearch,
  MdFolder,
  MdExpandMore,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdStar,
  MdCloud,
  MdComputer,
  MdDesktopWindows,
  MdImage,
  MdDescription,
  MdMusicNote,
  MdMovie,
  MdDownload,
  MdStorage,
  MdInsertDriveFile,
} from "react-icons/md";

interface LoadReportDialogProps {
  open: boolean;
  onClose: () => void;
  onLoad?: (fileName: string, content?: string) => void;
}

const QRP_FILES: { name: string; date: string; type: string; size: string }[] = [
  { name: "Monthly_Differences_Mar2026.qrp", date: "31/03/2026 16:42", type: "QuickReport file", size: "12 KB" },
  { name: "Tax_Free_Payments_Apr2026.qrp", date: "15/04/2026 09:20", type: "QuickReport file", size: "8 KB" },
  { name: "First_Payments_Apr2026.qrp", date: "14/04/2026 11:05", type: "QuickReport file", size: "6 KB" },
  { name: "Maturities_Mar2026.qrp", date: "28/03/2026 14:11", type: "QuickReport file", size: "9 KB" },
  { name: "MCP_Payments_Q1_2026.qrp", date: "02/04/2026 10:33", type: "QuickReport file", size: "15 KB" },
  { name: "Processed_Payments_Apr2026.qrp", date: "20/04/2026 17:48", type: "QuickReport file", size: "21 KB" },
  { name: "Monthly_Differences_Feb2026.qrp", date: "28/02/2026 16:30", type: "QuickReport file", size: "11 KB" },
  { name: "Tax_Free_Payments_Mar2026.qrp", date: "15/03/2026 09:14", type: "QuickReport file", size: "7 KB" },
  { name: "First_Payments_Mar2026.qrp", date: "14/03/2026 10:55", type: "QuickReport file", size: "6 KB" },
];

export default function LoadReportDialog({ open, onClose, onLoad }: LoadReportDialogProps) {
  const [fileName, setFileName] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setFileName("");
      setSelected(null);
    }
  }, [open]);

  if (!open) return null;

  const navBtn =
    "h-8 w-8 flex items-center justify-center rounded-[4px] text-[#1f1f1f] hover:bg-[#e9e9e9] cursor-pointer disabled:text-[#a0a0a0]";

  const handleOpen = () => {
    const target = selected !== null ? QRP_FILES[selected].name : fileName.trim();
    if (target) {
      onLoad?.(target);
      onClose();
    }
  };

  const handleBrowseLocal = () => {
    fileInputRef.current?.click();
  };

  const handleFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await f.text();
    onLoad?.(f.name, text);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      style={{ fontFamily: "'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif" }}
    >
      <div
        className="bg-white rounded-[8px] border border-[#d1d1d1] w-[860px] overflow-hidden flex flex-col"
        style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.22)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between h-8 pl-3 pr-1 bg-[#f3f3f3] border-b border-[#e5e5e5] select-none">
          <span className="text-[12px] font-normal text-[#1f1f1f]">Load Report</span>
          <div className="flex items-center">
            <button className="h-8 w-11 hover:bg-[#e9e9e9] flex items-center justify-center text-[#1f1f1f] cursor-pointer">
              <span className="text-[10px]">▁</span>
            </button>
            <button className="h-8 w-11 hover:bg-[#e9e9e9] flex items-center justify-center text-[#1f1f1f] cursor-pointer">
              <span className="text-[10px]">▢</span>
            </button>
            <button onClick={onClose} className="h-8 w-11 hover:bg-[#c42b1c] hover:text-white flex items-center justify-center text-[#1f1f1f] cursor-pointer">
              <span className="text-[12px]">✕</span>
            </button>
          </div>
        </div>

        {/* Toolbar / address bar */}
        <div className="flex items-center gap-1 px-2 py-2 bg-white border-b border-[#e5e5e5]">
          <button title="Back" className={navBtn}><MdArrowBack className="text-[16px]" /></button>
          <button title="Forward" disabled className={navBtn}><MdArrowForward className="text-[16px]" /></button>
          <button title="Up" className={navBtn}><MdArrowUpward className="text-[16px]" /></button>
          <button title="Refresh" className={navBtn}><MdRefresh className="text-[16px]" /></button>

          <div className="flex-1 flex items-center h-8 mx-1 px-2 border border-[#d1d1d1] rounded-[4px] bg-white hover:border-[#a0a0a0]">
            <MdFolder className="text-[#dcb46b] text-[16px] mr-2" />
            <span className="text-[12px] text-[#1f1f1f]">This PC</span>
            <MdChevronRight className="text-[#5f5f5f] mx-0.5" />
            <span className="text-[12px] text-[#1f1f1f]">Ual3 (H:)</span>
            <MdChevronRight className="text-[#5f5f5f] mx-0.5" />
            <span className="text-[12px] text-[#1f1f1f]">Annuities</span>
            <MdChevronRight className="text-[#5f5f5f] mx-0.5" />
            <span className="text-[12px] text-[#1f1f1f]">Reports</span>
          </div>

          <div className="flex items-center h-8 w-[200px] px-2 border border-[#d1d1d1] rounded-[4px] bg-white">
            <MdSearch className="text-[#5f5f5f] text-[16px] mr-1" />
            <input
              placeholder="Search Reports"
              className="flex-1 bg-transparent text-[12px] text-[#1f1f1f] focus:outline-none placeholder:text-[#7a7a7a]"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          {/* Left nav */}
          <div className="w-[210px] bg-[#fbfbfb] border-r border-[#e5e5e5] py-1 overflow-y-auto" style={{ height: "340px" }}>
            <NavSection title="Home" icon={<MdStar className="text-[#0067c0]" />} />
            <NavSection title="Gallery" icon={<MdImage className="text-[#0067c0]" />} />
            <NavSection title="OneDrive" icon={<MdCloud className="text-[#0078d4]" />} expanded />

            <NavGroupHeader label="This PC" />
            <NavSection indent title="Desktop" icon={<MdDesktopWindows className="text-[#dcb46b]" />} />
            <NavSection indent title="Documents" icon={<MdDescription className="text-[#dcb46b]" />} />
            <NavSection indent title="Downloads" icon={<MdDownload className="text-[#dcb46b]" />} />
            <NavSection indent title="Music" icon={<MdMusicNote className="text-[#dcb46b]" />} />
            <NavSection indent title="Pictures" icon={<MdImage className="text-[#dcb46b]" />} />
            <NavSection indent title="Videos" icon={<MdMovie className="text-[#dcb46b]" />} />
            <NavSection indent title="OS (C:)" icon={<MdStorage className="text-[#7a7a7a]" />} />
            <NavSection indent title="Ual3 (H:)" icon={<MdStorage className="text-[#7a7a7a]" />} active />

            <NavSection title="Network" icon={<MdComputer className="text-[#7a7a7a]" />} />
          </div>

          {/* File list */}
          <div className="flex-1 bg-white flex flex-col" style={{ height: "340px" }}>
            <div className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr] text-[11px] text-[#5f5f5f] border-b border-[#e5e5e5] bg-[#fbfbfb]">
              <div className="px-3 py-1.5 flex items-center gap-1 cursor-pointer hover:bg-[#f0f0f0]">Name <MdKeyboardArrowDown className="text-[12px]" /></div>
              <div className="px-3 py-1.5 cursor-pointer hover:bg-[#f0f0f0]">Date modified</div>
              <div className="px-3 py-1.5 cursor-pointer hover:bg-[#f0f0f0]">Type</div>
              <div className="px-3 py-1.5 cursor-pointer hover:bg-[#f0f0f0]">Size</div>
            </div>
            <div className="flex-1 overflow-auto">
              {QRP_FILES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => { setSelected(i); setFileName(f.name); }}
                  onDoubleClick={() => { onLoad?.(f.name); onClose(); }}
                  className={`w-full grid grid-cols-[2fr_1.2fr_1fr_0.8fr] text-left text-[12px] cursor-pointer ${
                    selected === i ? "bg-[#cfe4f7] text-[#1f1f1f]" : "hover:bg-[#f0f6fc] text-[#1f1f1f]"
                  }`}
                >
                  <div className="px-3 py-1 flex items-center gap-2 truncate">
                    <MdInsertDriveFile className="text-[#0067c0] text-[16px] shrink-0" />
                    <span className="truncate">{f.name}</span>
                  </div>
                  <div className="px-3 py-1 truncate">{f.date}</div>
                  <div className="px-3 py-1 truncate">{f.type}</div>
                  <div className="px-3 py-1 truncate">{f.size}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: file name + type */}
        <div className="px-4 py-3 bg-white border-t border-[#e5e5e5] grid grid-cols-[110px_1fr] gap-x-3 gap-y-2 items-center">
          <label className="text-[12px] text-[#1f1f1f]">File name:</label>
          <div className="flex items-center">
            <input
              autoFocus
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Select a saved report or browse..."
              className="flex-1 border border-[#8a8a8a] rounded-l-[4px] bg-white px-2 h-8 text-[12px] text-[#1f1f1f] focus:outline-none focus:border-[#0067c0]"
            />
            <button className="h-8 w-7 border border-l-0 border-[#8a8a8a] rounded-r-[4px] bg-white hover:bg-[#f0f0f0] flex items-center justify-center cursor-pointer">
              <MdExpandMore className="text-[#1f1f1f]" />
            </button>
          </div>

          <label className="text-[12px] text-[#1f1f1f]">Files of type:</label>
          <button className="flex items-center bg-white border border-[#8a8a8a] rounded-[4px] h-8 px-2 hover:border-[#0067c0] cursor-pointer">
            <span className="text-[12px] text-[#1f1f1f]">QuickReport file (*.QRP)</span>
            <MdExpandMore className="ml-auto text-[#1f1f1f]" />
          </button>
        </div>

        {/* Bottom action bar */}
        <div className="px-4 py-3 bg-[#f3f3f3] border-t border-[#e5e5e5] flex items-center justify-between">
          <button
            onClick={handleBrowseLocal}
            className="text-[12px] text-[#1f1f1f] hover:underline cursor-pointer flex items-center gap-1"
          >
            Browse this computer...
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".qrp,.QRP,text/plain"
            className="hidden"
            onChange={handleFilePicked}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpen}
              className="h-8 px-5 text-[12px] font-semibold border border-[#0067c0] bg-[#0067c0] text-white rounded-[4px] hover:bg-[#005ba1] cursor-pointer"
            >
              Open
            </button>
            <button
              onClick={onClose}
              className="h-8 px-5 text-[12px] border border-[#d1d1d1] bg-white text-[#1f1f1f] rounded-[4px] hover:bg-[#f0f0f0] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavSection({
  title,
  icon,
  indent,
  active,
  expanded,
}: {
  title: string;
  icon: React.ReactNode;
  indent?: boolean;
  active?: boolean;
  expanded?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-2 h-7 pr-2 text-[12px] cursor-pointer rounded-[4px] mx-1 ${
        active ? "bg-[#e5f1fb] text-[#1f1f1f]" : "hover:bg-[#f0f0f0] text-[#1f1f1f]"
      }`}
      style={{ paddingLeft: indent ? 28 : 8, width: "calc(100% - 8px)" }}
    >
      <MdChevronRight
        className="text-[#7a7a7a] text-[14px] shrink-0"
        style={{ transform: expanded ? "rotate(90deg)" : "none", visibility: indent ? "hidden" : "visible" }}
      />
      <span className="text-[15px] shrink-0 flex items-center">{icon}</span>
      <span className="truncate">{title}</span>
    </button>
  );
}

function NavGroupHeader({ label }: { label: string }) {
  return (
    <div className="px-3 pt-2 pb-1 text-[11px] text-[#5f5f5f] font-semibold">{label}</div>
  );
}
