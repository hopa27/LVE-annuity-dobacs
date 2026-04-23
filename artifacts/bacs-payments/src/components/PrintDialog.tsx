import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface PrintDialogProps {
  open: boolean;
  onClose: () => void;
  onPrint?: (opts: { printer: string; range: "all" | "pages" | "selection"; from: number; to: number; copies: number; collate: boolean }) => void;
  totalPages?: number;
}

const PRINTERS = [
  "Microsoft Print to PDF (from vmavdpsshx02)",
  "Citrix Universal Printer",
  "Client2:Microsoft Print to PDF",
  "Auto Created Client Printer vmavdpsshx0250",
  "Microsoft XPS Document Writer",
  "OneNote (Desktop)",
];

export default function PrintDialog({ open, onClose, onPrint, totalPages = 27 }: PrintDialogProps) {
  const [printer, setPrinter] = useState(PRINTERS[0]);
  const [range, setRange] = useState<"all" | "pages" | "selection">("all");
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(totalPages);
  const [copies, setCopies] = useState(1);
  const [collate, setCollate] = useState(false);

  useEffect(() => {
    if (open) {
      setPrinter(PRINTERS[0]);
      setRange("all");
      setFrom(1);
      setTo(totalPages);
      setCopies(1);
      setCollate(false);
    }
  }, [open, totalPages]);

  if (!open) return null;

  const handleOk = () => {
    onPrint?.({ printer, range, from, to, copies, collate });
    onClose();
  };

  const radio = (checked: boolean) => (
    <span
      className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border ${
        checked ? "border-[#0067c0]" : "border-[#8a8a8a]"
      } bg-white`}
    >
      {checked && <span className="w-[8px] h-[8px] rounded-full bg-[#0067c0]" />}
    </span>
  );

  const checkbox = (checked: boolean) => (
    <span
      className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-[3px] border ${
        checked ? "bg-[#0067c0] border-[#0067c0]" : "bg-white border-[#8a8a8a]"
      }`}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M3 8.5l3.5 3.5 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );

  const groupBox = "border border-[#d6d6d6] rounded-[6px] bg-white relative pt-4 pb-4 px-4";
  const groupLegend = "absolute -top-[10px] left-3 px-1.5 bg-[#f3f3f3] text-[12px] font-['Segoe_UI',sans-serif] text-[#1a1a1a]";
  const fieldLabel = "font-['Segoe_UI',sans-serif] text-[12px] text-[#1a1a1a]";
  const fieldValue = "font-['Segoe_UI',sans-serif] text-[12px] text-[#1a1a1a]";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
      <div
        className="bg-[#f3f3f3] rounded-[8px] shadow-2xl border border-[#cfcfcf] w-[520px] overflow-hidden"
        style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-[#f3f3f3]">
          <span className="text-[13px] text-[#1a1a1a] font-semibold">Print</span>
          <button
            onClick={onClose}
            className="w-8 h-7 flex items-center justify-center hover:bg-[#e81123] hover:text-white text-[#1a1a1a] rounded-[4px] cursor-pointer"
            title="Close"
          >
            <MdClose className="text-base" />
          </button>
        </div>

        <div className="px-5 pt-2 pb-5 space-y-5">
          <div className={groupBox}>
            <span className={groupLegend}>Printer</span>
            <div className="flex items-center gap-3 mb-3">
              <label className={fieldLabel + " w-[60px]"}>Name:</label>
              <select
                value={printer}
                onChange={(e) => setPrinter(e.target.value)}
                className="flex-1 h-[28px] px-2 rounded-[4px] border border-[#8a8a8a] bg-white text-[12px] text-[#1a1a1a] focus:outline-none focus:border-[#0067c0]"
              >
                {PRINTERS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button className="h-[28px] px-3 rounded-[4px] border border-[#8a8a8a] bg-white text-[12px] text-[#1a1a1a] hover:bg-[#e5e5e5] cursor-pointer">
                Properties...
              </button>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-y-1 gap-x-3">
              <span className={fieldLabel}>Status:</span>
              <span className={fieldValue}>Ready</span>
              <span className={fieldLabel}>Type:</span>
              <span className={fieldValue}>Citrix Universal Printer</span>
              <span className={fieldLabel}>Where:</span>
              <span className={fieldValue}>Client2:Microsoft Print to PDF</span>
              <span className={fieldLabel}>Comment:</span>
              <span className={fieldValue}>Auto Created Client Printer vmavdpsshx0250</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={groupBox}>
              <span className={groupLegend}>Print range</span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRange("all")}>
                  {radio(range === "all")}
                  <span className={fieldValue}>All</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRange("pages")}>
                  {radio(range === "pages")}
                  <span className={fieldValue}>Pages</span>
                  <span className={fieldLabel + " ml-1"}>from:</span>
                  <input
                    type="number"
                    min={1}
                    value={from}
                    onChange={(e) => { setFrom(Number(e.target.value)); setRange("pages"); }}
                    className="w-[44px] h-[24px] px-1 rounded-[4px] border border-[#8a8a8a] bg-white text-[12px] text-center focus:outline-none focus:border-[#0067c0]"
                  />
                  <span className={fieldLabel}>to:</span>
                  <input
                    type="number"
                    min={1}
                    value={to}
                    onChange={(e) => { setTo(Number(e.target.value)); setRange("pages"); }}
                    className="w-[44px] h-[24px] px-1 rounded-[4px] border border-[#8a8a8a] bg-white text-[12px] text-center focus:outline-none focus:border-[#0067c0]"
                  />
                </label>
                <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                  {radio(range === "selection")}
                  <span className={fieldValue}>Selection</span>
                </label>
              </div>
            </div>

            <div className={groupBox}>
              <span className={groupLegend}>Copies</span>
              <div className="flex items-center gap-2 mb-3">
                <span className={fieldLabel}>Number of copies:</span>
                <input
                  type="number"
                  min={1}
                  value={copies}
                  onChange={(e) => setCopies(Math.max(1, Number(e.target.value)))}
                  className="w-[56px] h-[24px] px-1 rounded-[4px] border border-[#8a8a8a] bg-white text-[12px] text-right focus:outline-none focus:border-[#0067c0]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-1">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="relative">
                      <div className="w-[28px] h-[36px] bg-white border border-[#8a8a8a] rounded-[2px] flex items-end justify-end pr-1 pb-0.5">
                        <span className="text-[9px] text-[#1a1a1a]">{n}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer" onClick={() => setCollate(!collate)}>
                  {checkbox(collate)}
                  <span className={fieldValue}>Collate</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f3f3f3] px-5 py-3 flex items-center justify-end gap-2 border-t border-[#e0e0e0]">
          <button
            onClick={handleOk}
            className="h-[30px] min-w-[88px] px-4 rounded-[4px] bg-[#0067c0] text-white text-[12px] font-semibold hover:bg-[#005ba1] cursor-pointer"
          >
            OK
          </button>
          <button
            onClick={onClose}
            className="h-[30px] min-w-[88px] px-4 rounded-[4px] bg-white border border-[#8a8a8a] text-[#1a1a1a] text-[12px] hover:bg-[#e5e5e5] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
