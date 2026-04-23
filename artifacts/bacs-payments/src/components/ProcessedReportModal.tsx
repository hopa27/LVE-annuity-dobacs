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

interface ProcessedRow {
  sortCode?: string;
  accountNo?: string;
  amount?: string;
  accountName?: string;
  bankRef?: string;
  bacsDate?: string;
  policyNo?: string;
  tax?: string;
  hash?: string;
}

interface ProcessedReportTotals {
  count: number;
  totalNet: number;
  totalGross: number;
  totalTax: number;
}

interface ProcessedReportModalProps {
  open: boolean;
  onClose: () => void;
  dateRange: string;
  rows?: ProcessedRow[];
  totals?: ProcessedReportTotals;
}

export default function ProcessedReportModal({ open, onClose, dateRange, rows, totals }: ProcessedReportModalProps) {
  if (!open) return null;
  const fmt = (n: number) => n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const toolbarBtn =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#04589b] border border-[#04589b] font-bold hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer";
  const toolbarBtnDisabled =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#979797] border border-[#979797] cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#BBBBBB] w-[1200px] max-h-[92vh] overflow-hidden flex flex-col">
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
          <button title="Single page" className={toolbarBtn}><MdInsertDriveFile className="text-xl" /></button>
          <button title="Multiple pages" className={toolbarBtn}><MdViewModule className="text-xl" /></button>
          <button title="Page width" className={toolbarBtn}><MdViewAgenda className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="First page" disabled className={toolbarBtnDisabled}><MdSkipPrevious className="text-xl" /></button>
          <button title="Previous page" disabled className={toolbarBtnDisabled}><MdChevronLeft className="text-xl" /></button>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d] px-2">1 of 1</span>
          <button title="Next page" disabled className={toolbarBtnDisabled}><MdChevronRight className="text-xl" /></button>
          <button title="Last page" disabled className={toolbarBtnDisabled}><MdSkipNext className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Print" className={toolbarBtn}><MdPrint className="text-xl" /></button>
          <button title="Quick print" className={toolbarBtn}><MdLocalPrintshop className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Save" className={toolbarBtn}><MdSave className="text-xl" /></button>
          <button title="Open" className={toolbarBtn}><MdFolderOpen className="text-xl" /></button>
        </div>

        <div className="flex-1 overflow-auto bg-[#f0f0f0] p-6">
          <div className="bg-white shadow-md mx-auto rounded-[8px] border border-[#BBBBBB] px-12 py-10" style={{ width: "1080px", minHeight: "700px" }}>
            <div className="flex items-center justify-between mb-16">
              <h2 className="font-['Livvic'] text-2xl font-bold text-[#002f5c]">
                Payments Report <span className="ml-12 font-normal text-[#3d3d3d]">{dateRange}</span>
              </h2>
              <span className="font-['Mulish'] text-xs text-[#3d3d3d]">Page 1 of 1</span>
            </div>

            {rows && rows.length > 0 && (
              <div className="mt-2 mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-y-[2px] border-[#002f5c]">
                      <th className="py-2 px-2 text-left font-['Livvic'] text-xs font-bold text-[#002f5c]">Sort Code</th>
                      <th className="py-2 px-2 text-left font-['Livvic'] text-xs font-bold text-[#002f5c]">Account No</th>
                      <th className="py-2 px-2 text-right font-['Livvic'] text-xs font-bold text-[#002f5c]">Amount</th>
                      <th className="py-2 px-2 text-left font-['Livvic'] text-xs font-bold text-[#002f5c]">Account Name</th>
                      <th className="py-2 px-2 text-left font-['Livvic'] text-xs font-bold text-[#002f5c]">Bank Ref</th>
                      <th className="py-2 px-2 text-left font-['Livvic'] text-xs font-bold text-[#002f5c]">BACS Date</th>
                      <th className="py-2 px-2 text-left font-['Livvic'] text-xs font-bold text-[#002f5c]">Policy No</th>
                      <th className="py-2 px-2 text-right font-['Livvic'] text-xs font-bold text-[#002f5c]">Tax</th>
                      <th className="py-2 px-2 text-left font-['Livvic'] text-xs font-bold text-[#002f5c]">Hash Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className="border-b border-[#BBBBBB]/40">
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d]">{r.sortCode}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d]">{r.accountNo}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d] text-right">{r.amount}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d]">{r.accountName}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d]">{r.bankRef}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d]">{r.bacsDate}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d]">{r.policyNo}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d] text-right">{r.tax}</td>
                        <td className="py-1.5 px-2 font-['Mulish'] text-xs text-[#3d3d3d]">{r.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                  {totals && (
                    <tfoot>
                      <tr className="border-t-[2px] border-[#002f5c]">
                        <td colSpan={2} className="py-2 px-2 font-['Livvic'] text-xs font-bold text-[#002f5c]">
                          Count: {totals.count}
                        </td>
                        <td className="py-2 px-2 font-['Livvic'] text-xs font-bold text-[#002f5c] text-right">
                          {fmt(totals.totalNet)}
                        </td>
                        <td colSpan={4} className="py-2 px-2 font-['Livvic'] text-xs font-bold text-[#002f5c]">
                          Gross: {fmt(totals.totalGross)}
                        </td>
                        <td className="py-2 px-2 font-['Livvic'] text-xs font-bold text-[#002f5c] text-right">
                          {fmt(totals.totalTax)}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            )}

            <div className="mt-12 flex flex-col gap-10 max-w-[420px]">
              <div className="flex items-end gap-3">
                <span className="font-['Mulish'] text-sm text-[#3d3d3d] whitespace-nowrap">Checked by:</span>
                <span className="flex-1 border-b border-dotted border-[#3d3d3d] h-5" />
              </div>
              <div className="flex items-end gap-3">
                <span className="font-['Mulish'] text-sm text-[#3d3d3d] whitespace-nowrap">Authorised by:</span>
                <span className="flex-1 border-b border-dotted border-[#3d3d3d] h-5" />
              </div>
            </div>

            <div className="mt-16 text-right font-['Mulish'] text-xs text-[#979797]">
              Page 1 of 1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
