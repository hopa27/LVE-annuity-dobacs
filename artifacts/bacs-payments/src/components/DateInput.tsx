import { MdOutlineCalendarToday } from "react-icons/md";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function DateInput({ label, value, onChange }: DateInputProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-['Livvic'] text-sm font-medium text-[#3d3d3d] whitespace-nowrap">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[44px] w-[180px] rounded-[8px] border border-[#BBBBBB] bg-white px-[12px] py-[8px] font-['Mulish'] text-[16px] leading-[26px] text-[#3d3d3d] focus:border-[3px] focus:border-[#178830] focus:px-[10px] focus:py-[6px] hover:border-[#178830] outline-none transition-colors"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-3 gap-2">
          <div className="h-6 w-[1px] bg-[#BBBBBB]" />
          <MdOutlineCalendarToday className="text-[#006cf4] text-lg" />
        </div>
      </div>
    </div>
  );
}
