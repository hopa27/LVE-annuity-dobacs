import { MdSave } from "react-icons/md";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: boolean;
  disabled?: boolean;
}

export default function ActionButton({ label, onClick, variant = "primary", icon = false, disabled = false }: ActionButtonProps) {
  const baseClasses = "h-[44px] px-8 py-2 rounded-[30px] text-base font-normal font-['Livvic'] transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer";

  const variantClasses = variant === "primary"
    ? disabled
      ? "bg-[#979797] text-white shadow-md cursor-not-allowed"
      : "bg-[#006cf4] text-white shadow-md hover:bg-[#003578]"
    : disabled
      ? "bg-white text-[#979797] border border-[#979797] cursor-not-allowed"
      : "bg-white text-[#04589b] border border-[#04589b] font-bold hover:bg-[#003578] hover:text-white hover:border-[#003578]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {icon && <MdSave className="text-lg" />}
      {label}
    </button>
  );
}
