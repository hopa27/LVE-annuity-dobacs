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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#d4d0c8] rounded-[6px] shadow-2xl w-[1024px] max-h-[90vh] overflow-hidden flex flex-col border border-[#888]">
        <div className="bg-gradient-to-b from-[#0a72c0] to-[#04589b] text-white px-3 py-1.5 flex items-center justify-between">
          <span className="font-['Livvic'] text-sm font-semibold">Print Preview</span>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 w-6 h-6 rounded flex items-center justify-center cursor-pointer"
          >
            <MdClose className="text-base" />
          </button>
        </div>

        <div className="bg-[#ece9d8] border-b border-[#888] px-3 py-1.5 flex items-center gap-3">
          <button className="p-1 hover:bg-white/60 rounded cursor-pointer"><MdSkipPrevious className="text-lg text-[#04589b]" /></button>
          <button className="p-1 hover:bg-white/60 rounded cursor-pointer"><MdChevronLeft className="text-lg text-[#04589b]" /></button>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d]">1 of 1+</span>
          <button className="p-1 hover:bg-white/60 rounded cursor-pointer"><MdChevronRight className="text-lg text-[#04589b]" /></button>
          <button className="p-1 hover:bg-white/60 rounded cursor-pointer"><MdSkipNext className="text-lg text-[#04589b]" /></button>
          <div className="w-px h-5 bg-[#888]" />
          <button className="p-1 hover:bg-white/60 rounded cursor-pointer"><MdPrint className="text-lg text-[#04589b]" /></button>
          <button className="p-1 hover:bg-white/60 rounded cursor-pointer"><MdSave className="text-lg text-[#04589b]" /></button>
          <div className="w-px h-5 bg-[#888]" />
          <select
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="bg-white border border-[#888] px-2 py-0.5 text-sm font-['Mulish'] text-[#3d3d3d] cursor-pointer"
          >
            <option>50%</option>
            <option>75%</option>
            <option>100%</option>
            <option>125%</option>
            <option>150%</option>
          </select>
          <div className="w-px h-5 bg-[#888]" />
          <span className="font-['Mulish'] text-sm text-[#3d3d3d]">Total:{total}</span>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d] ml-3">{zoom}</span>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d] ml-3">{total} of {total}</span>
        </div>

        <div className="flex-1 overflow-auto bg-[#808080] p-6">
          <div className="bg-white shadow-lg mx-auto px-12 py-10" style={{ width: "850px" }}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1" />
              <h2 className="font-['Livvic'] text-xl font-bold text-[#000] text-center">
                {title}
              </h2>
              <div className="flex-1 text-right font-['Mulish'] text-sm text-[#000]">
                {reportDate}
              </div>
            </div>

            <table className="w-full border-collapse font-['Mulish'] text-[13px] text-[#000]">
              <thead>
                <tr>
                  <th colSpan={3}></th>
                  <th colSpan={3} className="border-t border-l border-r border-b border-[#000] font-bold text-center pb-1">Current</th>
                  <th colSpan={3} className="border-t border-l border-r border-b border-[#000] font-bold text-center pb-1">Previous</th>
                  <th colSpan={2}></th>
                </tr>
                <tr className="font-bold">
                  <th className="text-left pb-1">Policy No</th>
                  <th className="text-left pb-1">Policy_ref</th>
                  <th className="text-left pb-1">Paykey</th>
                  <th className="text-left pb-1">Date</th>
                  <th className="text-right pb-1">Ref</th>
                  <th className="text-right pb-1">Gross</th>
                  <th className="text-left pb-1">Date</th>
                  <th className="text-right pb-1">Ref</th>
                  <th className="text-right pb-1">Gross</th>
                  <th className="text-left pb-1">Payment Type</th>
                  <th className="text-right pb-1">% Change</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td className="py-0.5">{r.policyNo}</td>
                    <td className="py-0.5">{r.policyRef}</td>
                    <td className="py-0.5">{r.paykey}</td>
                    <td className="py-0.5">{r.currentDate}</td>
                    <td className="py-0.5 text-right">{r.currentRef}</td>
                    <td className="py-0.5 text-right">{r.currentGross}</td>
                    <td className="py-0.5">{r.previousDate}</td>
                    <td className="py-0.5 text-right">{r.previousRef}</td>
                    <td className="py-0.5 text-right">{r.previousGross}</td>
                    <td className="py-0.5">{r.paymentType}</td>
                    <td className="py-0.5 text-right">{r.pctChange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
