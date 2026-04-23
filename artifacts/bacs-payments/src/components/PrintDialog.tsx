import { useState } from "react";

interface PrintDialogProps {
  open: boolean;
  onClose: () => void;
  totalPages?: number;
}

const PRINTERS = [
  "Microsoft Print to PDF",
  "Microsoft XPS Document Writer",
  "OneNote (Desktop)",
  "Fax",
];

export default function PrintDialog({ open, onClose, totalPages = 1 }: PrintDialogProps) {
  const [printer, setPrinter] = useState(PRINTERS[0]);
  const [range, setRange] = useState<"all" | "pages" | "selection">("all");
  const [pageFrom, setPageFrom] = useState("1");
  const [pageTo, setPageTo] = useState(String(totalPages));
  const [copies, setCopies] = useState(1);
  const [collate, setCollate] = useState(false);

  if (!open) return null;

  const handleOk = () => {
    onClose();
    setTimeout(() => window.print(), 50);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <div className="bg-[#f3f3f3] rounded-[8px] shadow-2xl border border-[#d1d1d1] w-[480px] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#f3f3f3] border-b border-[#e5e5e5]">
          <span className="text-sm font-semibold text-[#1f1f1f]">Print</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#e5e5e5] text-[#1f1f1f] text-base cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pt-4 pb-5 space-y-4">
          <fieldset className="border border-[#c5c5c5] rounded-[4px] px-3 pt-2 pb-3 bg-white">
            <legend className="px-1 text-xs text-[#1f1f1f] font-semibold">Printer</legend>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs text-[#1f1f1f] w-14 underline">Name:</label>
              <select
                value={printer}
                onChange={(e) => setPrinter(e.target.value)}
                className="flex-1 h-7 px-2 text-xs border border-[#8a8a8a] rounded-[2px] bg-white text-[#1f1f1f] focus:outline-none focus:border-[#0067c0]"
              >
                {PRINTERS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <button className="h-7 px-3 text-xs border border-[#8a8a8a] rounded-[2px] bg-[#f3f3f3] hover:bg-[#e5e5e5] cursor-pointer">
                Properties...
              </button>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-x-2 gap-y-0.5 text-xs text-[#1f1f1f] pl-1">
              <span className="font-semibold">Status:</span><span>Ready</span>
              <span className="font-semibold">Type:</span><span>Citrix Universal Printer</span>
              <span className="font-semibold">Where:</span><span>Client2:Microsoft Print to PDF</span>
              <span className="font-semibold">Comment:</span><span>Auto Created Client Printer</span>
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-3">
            <fieldset className="border border-[#c5c5c5] rounded-[4px] px-3 pt-2 pb-3 bg-white">
              <legend className="px-1 text-xs text-[#1f1f1f] font-semibold">Print range</legend>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-[#1f1f1f] cursor-pointer">
                  <input
                    type="radio"
                    checked={range === "all"}
                    onChange={() => setRange("all")}
                    className="accent-[#0067c0]"
                  />
                  <span className="underline">A</span>ll
                </label>
                <div className="flex items-center gap-2 text-xs text-[#1f1f1f]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={range === "pages"}
                      onChange={() => setRange("pages")}
                      className="accent-[#0067c0]"
                    />
                    <span><span className="underline">P</span>ages</span>
                  </label>
                  <span>from:</span>
                  <input
                    type="text"
                    value={pageFrom}
                    onChange={(e) => setPageFrom(e.target.value)}
                    disabled={range !== "pages"}
                    className="w-10 h-6 px-1 text-xs border border-[#8a8a8a] rounded-[2px] bg-white text-center disabled:bg-[#f3f3f3] disabled:text-[#9e9e9e]"
                  />
                  <span>to:</span>
                  <input
                    type="text"
                    value={pageTo}
                    onChange={(e) => setPageTo(e.target.value)}
                    disabled={range !== "pages"}
                    className="w-10 h-6 px-1 text-xs border border-[#8a8a8a] rounded-[2px] bg-white text-center disabled:bg-[#f3f3f3] disabled:text-[#9e9e9e]"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs text-[#9e9e9e] cursor-not-allowed">
                  <input
                    type="radio"
                    disabled
                    checked={range === "selection"}
                    onChange={() => setRange("selection")}
                  />
                  <span><span className="underline">S</span>election</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="border border-[#c5c5c5] rounded-[4px] px-3 pt-2 pb-3 bg-white">
              <legend className="px-1 text-xs text-[#1f1f1f] font-semibold">Copies</legend>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs text-[#1f1f1f]">Number of <span className="underline">c</span>opies:</label>
                <input
                  type="number"
                  min={1}
                  value={copies}
                  onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 h-6 px-1 text-xs border border-[#8a8a8a] rounded-[2px] bg-white text-center"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="w-6 h-7 border border-[#8a8a8a] bg-white flex items-end justify-center text-[9px] text-[#1f1f1f] pb-0.5"
                    >
                      {n}
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-1.5 text-xs text-[#1f1f1f] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={collate}
                    onChange={(e) => setCollate(e.target.checked)}
                    className="accent-[#0067c0]"
                  />
                  C<span className="underline">o</span>llate
                </label>
              </div>
            </fieldset>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleOk}
              className="h-8 px-6 text-xs font-semibold border border-[#0067c0] bg-[#0067c0] text-white rounded-[4px] hover:bg-[#005ba1] cursor-pointer"
            >
              OK
            </button>
            <button
              onClick={onClose}
              className="h-8 px-6 text-xs border border-[#8a8a8a] bg-[#f3f3f3] text-[#1f1f1f] rounded-[4px] hover:bg-[#e5e5e5] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
