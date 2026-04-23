import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdChevronLeft,
  MdChevronRight,
  MdPrint,
  MdSave,
  MdClose,
  MdCropFree,
  MdZoomIn,
  MdFitScreen,
  MdFolderOpen,
  MdSettings,
  MdLocalPrintshop,
} from "react-icons/md";
import { saveReportAsQrp } from "../lib/saveQrp";

export interface ReportColumn {
  key: string;
  label: string;
  align?: "left" | "right";
}

export interface ReportTotal {
  label: string;
  value: string;
  columnKey?: string;
}

interface ReportPrintModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  dateRange: string;
  columns: ReportColumn[];
  rows: Record<string, string | number>[];
  totals?: ReportTotal[];
  recordsLabel?: string;
  recordsCount?: number;
}

const PAGE_W = 960;

type ZoomMode = "fit" | "actual" | "width";

export default function ReportPrintModal({
  open,
  onClose,
  title,
  dateRange,
  columns,
  rows,
  totals = [],
  recordsLabel = "Records Count",
  recordsCount,
}: ReportPrintModalProps) {
  const [zoomMode, setZoomMode] = useState<ZoomMode>("actual");
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const naturalHRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      naturalHRef.current = null;
      setZoomMode("actual");
      setZoom(1);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    if (naturalHRef.current === null && pageRef.current) {
      naturalHRef.current = pageRef.current.offsetHeight / zoom;
    }
    const c = containerRef.current;
    if (!c) return;
    const cw = c.clientWidth - 48;
    const ch = c.clientHeight - 48;
    const naturalH = naturalHRef.current ?? 1000;
    if (zoomMode === "actual") setZoom(1);
    else if (zoomMode === "width") setZoom(Math.max(0.3, Math.min(2, cw / PAGE_W)));
    else setZoom(Math.max(0.3, Math.min(cw / PAGE_W, ch / naturalH)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomMode, open]);

  useEffect(() => {
    if (!open) return;
    const c = containerRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => {
      const cw = c.clientWidth - 48;
      const ch = c.clientHeight - 48;
      const naturalH = naturalHRef.current ?? 1000;
      if (zoomMode === "width") setZoom(Math.max(0.3, Math.min(2, cw / PAGE_W)));
      else if (zoomMode === "fit") setZoom(Math.max(0.3, Math.min(cw / PAGE_W, ch / naturalH)));
    });
    ro.observe(c);
    return () => ro.disconnect();
  }, [zoomMode, open]);

  if (!open) return null;

  const toolbarBtn =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#04589b] border border-[#04589b] font-bold hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer";
  const toolbarBtnActive =
    "h-10 w-10 flex items-center justify-center rounded-full bg-[#003578] text-white border border-[#003578] font-bold cursor-pointer";
  const toolbarBtnDisabled =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#979797] border border-[#979797] cursor-not-allowed";

  const zoomBtn = (mode: ZoomMode) => (zoomMode === mode ? toolbarBtnActive : toolbarBtn);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#BBBBBB] w-[1100px] max-h-[92vh] overflow-hidden flex flex-col">
        <div className="bg-[#00263e] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-['Livvic'] text-base font-semibold">Print Report</span>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          >
            <MdClose className="text-lg" />
          </button>
        </div>

        <div className="bg-white border-b border-[#BBBBBB] px-5 py-3 flex items-center gap-2 flex-wrap">
          <button title="Zoom to Fit" onClick={() => setZoomMode("fit")} className={zoomBtn("fit")}><MdCropFree className="text-xl" /></button>
          <button title="100% Zoom" onClick={() => setZoomMode("actual")} className={zoomBtn("actual")}><MdZoomIn className="text-xl" /></button>
          <button title="Zoom to Width" onClick={() => setZoomMode("width")} className={zoomBtn("width")}><MdFitScreen className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="First page" disabled className={toolbarBtnDisabled}><MdSkipPrevious className="text-xl" /></button>
          <button title="Previous page" disabled className={toolbarBtnDisabled}><MdChevronLeft className="text-xl" /></button>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d] px-2">1 of 1</span>
          <button title="Next page" className={toolbarBtn}><MdChevronRight className="text-xl" /></button>
          <button title="Last page" className={toolbarBtn}><MdSkipNext className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Printer Setup" onClick={() => window.print()} className={toolbarBtn}><MdSettings className="text-xl" /></button>
          <button title="Print" onClick={() => window.print()} className={toolbarBtn}><MdLocalPrintshop className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Save" onClick={() => saveReportAsQrp({ title, dateRange, columns, rows, totals: Object.fromEntries(totals.map(t => [t.label, t.value])), recordsLabel, recordsCount }, `${title.replace(/\s+/g, "_")}.qrp`)} className={toolbarBtn}><MdSave className="text-xl" /></button>
          <button title="Open" className={toolbarBtn}><MdFolderOpen className="text-xl" /></button>
        </div>

        <div ref={containerRef} className="flex-1 overflow-auto bg-[#f0f0f0] p-6">
          <div
            ref={pageRef}
            className="print-area bg-white shadow-md mx-auto rounded-[8px] border border-[#BBBBBB] px-12 py-10"
            style={{ width: `${PAGE_W}px`, zoom }}
          >
            <h2 className="font-['Livvic'] text-2xl font-bold text-[#002f5c] mb-8">
              {title}: <span className="font-normal text-[#3d3d3d]">{dateRange}</span>
            </h2>

            <table className="w-full border-separate border-spacing-0 font-['Mulish'] text-[13px] text-[#3d3d3d]">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`font-['Livvic'] font-semibold text-[#002f5c] py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b] ${col.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`py-1.5 px-2 ${col.align === "right" ? "text-right" : "text-left"}`}
                      >
                        {r[col.key] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
                {totals.length > 0 && (
                  <tr className="border-t-[2px] border-[#002f5c]">
                    {columns.map((col) => {
                      const t = totals.find((tt) => tt.columnKey === col.key);
                      return (
                        <td
                          key={col.key}
                          className={`py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] ${col.align === "right" ? "text-right" : "text-left"}`}
                        >
                          {t ? t.value : ""}
                        </td>
                      );
                    })}
                  </tr>
                )}
              </tbody>
            </table>

            {recordsCount !== undefined && (
              <div className="mt-6 font-['Mulish'] text-sm text-[#3d3d3d]">
                <span className="font-semibold text-[#002f5c]">{recordsLabel}:</span>{" "}
                <span className="font-bold">{recordsCount}</span>
              </div>
            )}

            <div className="mt-12 flex flex-col gap-8 max-w-[420px]">
              <div className="flex items-end gap-3">
                <span className="font-['Mulish'] text-sm text-[#3d3d3d] whitespace-nowrap">Checked by:</span>
                <span className="flex-1 border-b border-dotted border-[#3d3d3d] h-5" />
              </div>
              <div className="flex items-end gap-3">
                <span className="font-['Mulish'] text-sm text-[#3d3d3d] whitespace-nowrap">Authorised by:</span>
                <span className="flex-1 border-b border-dotted border-[#3d3d3d] h-5" />
              </div>
            </div>

            <div className="mt-10 text-right font-['Mulish'] text-xs text-[#979797]">
              Page 1 of 1
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-[#BBBBBB] px-5 py-3 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-[44px] px-8 rounded-[30px] font-['Livvic'] text-base font-bold bg-white text-[#04589b] border border-[#04589b] hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            className="h-[44px] px-8 rounded-[30px] font-['Livvic'] text-base font-bold bg-[#006cf4] text-white hover:bg-[#003578] transition-colors cursor-pointer flex items-center gap-2"
          >
            <MdPrint className="text-lg" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
