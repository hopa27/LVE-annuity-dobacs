import { useState, useRef, useEffect } from "react";
import { MdOutlineCalendarToday, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function parseDateString(str: string): Date | null {
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  return new Date(year, month, day);
}

function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function DateInput({ label, value, onChange }: DateInputProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selectedDate = parseDateString(value);
  const [viewYear, setViewYear] = useState(selectedDate?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth() ?? new Date().getMonth());

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleToggle = () => {
    if (!open && selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
    setOpen(!open);
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day);
    onChange(formatDate(newDate));
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const daysInPrevMonth = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);

  const cells: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false });
  }

  const isSelected = (day: number, current: boolean) => {
    if (!current || !selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear;
  };

  const isToday = (day: number, current: boolean) => {
    if (!current) return false;
    const today = new Date();
    return today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
  };

  return (
    <div className="flex items-center gap-3 relative">
      <label className="font-['Livvic'] text-sm font-medium text-[#3d3d3d] whitespace-nowrap">
        {label}
      </label>
      <div className="relative" ref={triggerRef}>
        <input
          type="text"
          readOnly
          value={value}
          onClick={handleToggle}
          className={`h-[44px] w-[180px] rounded-[8px] border bg-white px-[12px] py-[8px] font-['Mulish'] text-[16px] leading-[26px] text-[#3d3d3d] outline-none cursor-pointer transition-colors ${
            open ? "border-[3px] border-[#178830] px-[10px] py-[6px]" : "border-[#BBBBBB] hover:border-[#178830]"
          }`}
        />
        <div
          className="absolute right-0 top-0 h-full flex items-center pr-3 gap-2 cursor-pointer"
          onClick={handleToggle}
        >
          <div className="h-6 w-[1px] bg-[#BBBBBB]" />
          <MdOutlineCalendarToday className="text-[#006cf4] text-lg" />
        </div>

        {open && (
          <div
            ref={popoverRef}
            className="absolute top-[48px] left-0 z-50 bg-white rounded-[12px] border-[2px] border-[#178830] shadow-lg p-3 w-[280px]"
          >
            <div className="flex items-center justify-between mb-2">
              <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                <MdKeyboardArrowLeft className="text-[#005a9c] text-xl" />
              </button>
              <span className="font-['Livvic'] font-bold text-[#005a9c] text-[14px]">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                <MdKeyboardArrowRight className="text-[#005a9c] text-xl" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-[11px] font-semibold text-[#002f5c] bg-[#eef4f8] py-1 font-['Livvic']">
                  {d}
                </div>
              ))}
              {cells.map((cell, i) => {
                const selected = isSelected(cell.day, cell.current);
                const today = isToday(cell.day, cell.current);
                return (
                  <button
                    key={i}
                    onClick={() => cell.current && handleSelectDay(cell.day)}
                    className={`text-center py-1.5 text-[13px] font-['Mulish'] transition-colors cursor-pointer ${
                      !cell.current
                        ? "text-[#BBBBBB] opacity-50"
                        : selected
                          ? "bg-[#006cf4] text-white rounded-full"
                          : today
                            ? "text-[#006cf4] font-semibold hover:bg-[#003578] hover:text-white hover:rounded-full"
                            : "text-[#3d3d3d] hover:bg-[#003578] hover:text-white hover:rounded-full"
                    }`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
