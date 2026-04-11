interface ReadOnlyInputProps {
  label: string;
  value?: string;
  width?: string;
}

export default function ReadOnlyInput({ label, value = "", width = "w-[120px]" }: ReadOnlyInputProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="font-['Livvic'] text-sm font-medium text-[#3d3d3d] whitespace-nowrap">
        {label}
      </label>
      <input
        type="text"
        readOnly
        value={value}
        className={`h-[44px] ${width} rounded-[8px] border border-[#BBBBBB] bg-white px-[12px] py-[8px] font-['Mulish'] text-[16px] leading-[26px] text-[#3d3d3d] outline-none`}
      />
    </div>
  );
}
