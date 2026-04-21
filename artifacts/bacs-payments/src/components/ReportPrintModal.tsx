import { useState } from "react";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdChevronLeft,
  MdChevronRight,
  MdPrint,
  MdSave,
  MdClose,
  MdInsertDriveFile,
  MdViewModule,
  MdViewAgenda,
  MdFolderOpen,
  MdLocalPrintshop,
} from "react-icons/md";

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
  const [zoom, setZoom] = useState("100%");

  if (!open) return null;

  const total = rows.length;

  const toolbarBtn =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#04589b] border border-[#04589b] font-bold hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer";
  const toolbarBtnDisabled =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#979797] border border-[#979797] cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#BBBBBB] w-[1100px] max-h-[92vh] overflow-hidden flex flex-col">
        <div className="bg-[#00263e] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-['Livvic'] text-base font-semibold">Print Preview</span>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          >
            <MdClose className="text-lg" />
          </button>
        </div>

        <div className="bg-white border-b border-[#BBBBBB] px-5 py-3 flex items-center gap-2 flex-wrap">
          <button title="Single page" className={toolbarBtn}><MdInsertDriveFile className="text-xl" /></button>
          <button title="Multiple pages" className={toolbarBtn}><MdViewModule className="text-xl" /></button>
          <button title="Page width" className={toolbarBtn}><MdViewAgenda className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="First page" disabled className={toolbarBtnDisabled}><MdSkipPrevious className="text-xl" /></button>
          <button title="Previous page" disabled className={toolbarBtnDisabled}><MdChevronLeft className="text-xl" /></button>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d] px-2">1 of 1</span>
          <button title="Next page" className={toolbarBtn}><MdChevronRight className="text-xl" /></button>
          <button title="Last page" className={toolbarBtn}><MdSkipNext className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Print" className={toolbarBtn}><MdPrint className="text-xl" /></button>
          <button title="Quick print" className={toolbarBtn}><MdLocalPrintshop className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Save" className={toolbarBtn}><MdSave className="text-xl" /></button>
          <button title="Open" className={toolbarBtn}><MdFolderOpen className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button
            onClick={onClose}
            title="Close"
            className="h-10 px-5 rounded-[30px] font-['Livvic'] text-sm font-bold bg-white text-[#04589b] border border-[#04589b] hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer"
          >
            Close
          </button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <select
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="h-9 px-3 rounded-[8px] border border-[#BBBBBB] bg-white font-['Mulish'] text-sm text-[#3d3d3d] outline-none hover:border-[#178830] focus:border-[#178830] cursor-pointer"
          >
            <option>50%</option>
            <option>75%</option>
            <option>100%</option>
            <option>125%</option>
            <option>150%</option>
          </select>
          <div className="ml-auto flex items-center gap-4 font-['Mulish'] text-sm text-[#3d3d3d]">
            <span><span className="font-semibold text-[#002f5c]">Total:</span> {total}</span>
            <span><span className="font-semibold text-[#002f5c]">Zoom:</span> {zoom}</span>
            <span><span className="font-semibold text-[#002f5c]">Showing:</span> {total} of {total}</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[#f0f0f0] p-6">
          <div className="bg-white shadow-md mx-auto rounded-[8px] border border-[#BBBBBB] px-12 py-10" style={{ width: "960px" }}>
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
                    className={`group hover:bg-[#05579B] ${i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`py-1.5 px-2 group-hover:text-white ${col.align === "right" ? "text-right" : "text-left"}`}
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
