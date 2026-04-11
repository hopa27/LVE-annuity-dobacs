import { MdKeyboardArrowDown } from "react-icons/md";

interface SelectInputProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  width?: string;
}

export default function SelectInput({ label, value, options, onChange, width = "w-[100px]" }: SelectInputProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-['Livvic'] text-sm font-medium text-[#3d3d3d] whitespace-nowrap">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-[44px] ${width} rounded-[8px] border border-[#BBBBBB] bg-white px-[12px] py-[8px] font-['Mulish'] text-[16px] leading-[26px] text-[#3d3d3d] focus:border-[3px] focus:border-[#178830] focus:px-[10px] focus:py-[6px] hover:border-[#178830] outline-none appearance-none pr-10 transition-colors`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-0 top-0 h-full flex items-center pr-2 pointer-events-none gap-1">
          <div className="h-6 w-[1px] bg-[#BBBBBB]" />
          <MdKeyboardArrowDown className="text-[#006cf4] text-xl" />
        </div>
      </div>
    </div>
  );
}
