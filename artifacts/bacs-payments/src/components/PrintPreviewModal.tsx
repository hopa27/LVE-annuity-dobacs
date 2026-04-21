import { useState } from "react";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdChevronLeft,
  MdChevronRight,
  MdPrint,
  MdSave,
  MdClose,
} from "react-icons/md";

export interface PrintRow {
  policyNo: string;
  policyRef: string;
  paykey: string;
  currentDate: string;
  currentRef: string;
  currentGross: string;
  previousDate: string;
  previousRef: string;
  previousGross: string;
  paymentType: string;
  pctChange: string;
}

interface PrintPreviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  reportDate: string;
  rows: PrintRow[];
}

export default function PrintPreviewModal({
  open,
  onClose,
  title,
  reportDate,
  rows,
}: PrintPreviewModalProps) {
  const [zoom, setZoom] = useState("100%");

  if (!open) return null;

  const total = rows.length;

  const toolbarBtn =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#04589b] border border-[#04589b] font-bold hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer";
  const toolbarBtnDisabled =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#979797] border border-[#979797] cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#BBBBBB] w-[1024px] max-h-[90vh] overflow-hidden flex flex-col">
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
          <button disabled className={toolbarBtnDisabled}><MdSkipPrevious className="text-xl" /></button>
          <button disabled className={toolbarBtnDisabled}><MdChevronLeft className="text-xl" /></button>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d] px-2">1 of 1+</span>
          <button className={toolbarBtn}><MdChevronRight className="text-xl" /></button>
          <button className={toolbarBtn}><MdSkipNext className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button className={toolbarBtn}><MdPrint className="text-xl" /></button>
          <button className={toolbarBtn}><MdSave className="text-xl" /></button>
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
          <div className="bg-white shadow-md mx-auto rounded-[8px] border border-[#BBBBBB] px-12 py-10" style={{ width: "880px" }}>
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1" />
              <h2 className="font-['Livvic'] text-2xl font-bold text-[#002f5c] text-center">
                {title}
              </h2>
              <div className="flex-1 text-right font-['Mulish'] text-sm text-[#3d3d3d]">
                {reportDate}
              </div>
            </div>

            <table className="w-full border-separate border-spacing-0 font-['Mulish'] text-[13px] text-[#3d3d3d]">
              <thead>
                <tr>
                  <th colSpan={3}></th>
                  <th colSpan={3} className="font-['Livvic'] font-semibold text-[#002f5c] text-center pb-1 px-2 border-b-[2px] border-[#04589b]">Current</th>
                  <th colSpan={3} className="font-['Livvic'] font-semibold text-[#002f5c] text-center pb-1 px-2 border-b-[2px] border-[#04589b]">Previous</th>
                  <th colSpan={2}></th>
                </tr>
                <tr>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-left py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Policy No</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-left py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Policy_ref</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-left py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Paykey</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-left py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Date</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-right py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Ref</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-right py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Gross</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-left py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Date</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-right py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Ref</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-right py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Gross</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-left py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">Payment Type</th>
                  <th className="font-['Livvic'] font-semibold text-[#002f5c] text-right py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b]">% Change</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className={`group hover:bg-[#05579B] ${i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}`}
                  >
                    <td className="py-1.5 px-2 group-hover:text-white">{r.policyNo}</td>
                    <td className="py-1.5 px-2 group-hover:text-white">{r.policyRef}</td>
                    <td className="py-1.5 px-2 group-hover:text-white">{r.paykey}</td>
                    <td className="py-1.5 px-2 group-hover:text-white">{r.currentDate}</td>
                    <td className="py-1.5 px-2 text-right group-hover:text-white">{r.currentRef}</td>
                    <td className="py-1.5 px-2 text-right group-hover:text-white">{r.currentGross}</td>
                    <td className="py-1.5 px-2 group-hover:text-white">{r.previousDate}</td>
                    <td className="py-1.5 px-2 text-right group-hover:text-white">{r.previousRef}</td>
                    <td className="py-1.5 px-2 text-right group-hover:text-white">{r.previousGross}</td>
                    <td className="py-1.5 px-2 group-hover:text-white">{r.paymentType}</td>
                    <td className="py-1.5 px-2 text-right group-hover:text-white">{r.pctChange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
