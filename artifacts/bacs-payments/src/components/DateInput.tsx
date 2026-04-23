import { useState, useRef, useEffect } from "react";
import { MdOutlineCalendarToday, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  stacked?: boolean;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

function formatDisplay(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = MONTH_SHORT[date.getMonth()];
  const y = date.getFullYear();
  return `${d}, ${m}, ${y}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

type CalendarView = "days" | "months" | "years";

export default function DateInput({ label, value, onChange, error = false, stacked = false }: DateInputProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<CalendarView>("days");
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selectedDate = parseDateString(value);
  const [viewYear, setViewYear] = useState(selectedDate?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth() ?? new Date().getMonth());
  const [yearRangeStart, setYearRangeStart] = useState(Math.floor((selectedDate?.getFullYear() ?? new Date().getFullYear()) / 25) * 25);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setView("days");
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleToggle = () => {
    if (!open && selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
      setYearRangeStart(Math.floor(selectedDate.getFullYear() / 25) * 25);
    }
    setOpen(!open);
    if (open) setView("days");
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day);
    onChange(formatDate(newDate));
    setOpen(false);
    setView("days");
  };

  const handleSelectMonth = (month: number) => {
    setViewMonth(month);
    setView("days");
  };

  const handleSelectYear = (year: number) => {
    setViewYear(year);
    setView("months");
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

  const borderColor = error ? "#d72714" : "#178830";
  const iconColor = error ? "text-[#d72714]" : "text-[#006cf4]";

  const displayValue = selectedDate ? formatDisplay(selectedDate) : value;

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

  const hatchPattern = "repeating-linear-gradient(45deg, transparent, transparent 5px, #e7ebec 5px, #e7ebec 10px)";

  return (
    <div className={`relative ${stacked ? "flex flex-col gap-1 items-start" : "flex items-center gap-3"}`}>
      <label className={`font-['Livvic'] font-medium text-[#3d3d3d] whitespace-nowrap ${stacked ? "text-[11px] tracking-wide uppercase text-[#5f5f5f]" : "text-sm"}`}>
        {label}
      </label>
      <div className="relative" ref={triggerRef}>
        <input
          type="text"
          readOnly
          value={displayValue}
          onClick={handleToggle}
          className={`h-[44px] w-[180px] rounded-[8px] border bg-white px-[12px] py-[8px] font-['Mulish'] text-[16px] leading-[26px] text-[#3d3d3d] outline-none cursor-pointer transition-colors ${
            error
              ? "border-[#d72714]"
              : open
                ? "border-[2px] border-[#178830] px-[11px] py-[7px]"
                : "border-[#BBBBBB] hover:border-[#178830]"
          }`}
        />
        <div
          className="absolute right-0 top-0 h-full flex items-center pr-3 gap-2 cursor-pointer"
          onClick={handleToggle}
        >
          <div className="h-6 w-[1px] bg-[#BBBBBB]" />
          <MdOutlineCalendarToday className={`${iconColor} text-lg`} />
        </div>

        {open && (
          <div
            ref={popoverRef}
            className="absolute top-[48px] left-0 z-50 bg-white rounded-[12px] shadow-lg overflow-hidden w-[280px]"
            style={{ border: `2px solid ${borderColor}` }}
          >
            {view === "days" && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                    <MdKeyboardArrowLeft className="text-[#005a9c] text-xl hover:text-[#003578]" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setView("months")}
                      className="font-['Livvic'] font-bold text-[#005a9c] text-[16px] hover:text-[#003578] cursor-pointer bg-transparent border-none"
                    >
                      {MONTH_NAMES[viewMonth]}
                    </button>
                    <button
                      onClick={() => {
                        setYearRangeStart(Math.floor(viewYear / 25) * 25);
                        setView("years");
                      }}
                      className="font-['Livvic'] font-bold text-[#005a9c] text-[16px] hover:text-[#003578] cursor-pointer bg-transparent border-none"
                    >
                      {viewYear}
                    </button>
                  </div>
                  <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                    <MdKeyboardArrowRight className="text-[#005a9c] text-xl hover:text-[#003578]" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-0">
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      className={`text-center text-[11px] font-semibold bg-[#eef4f8] py-1 font-['Livvic'] ${
                        error ? "text-[#d72714]" : "text-[#002f5c]"
                      }`}
                    >
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
                        style={!cell.current ? { background: hatchPattern, opacity: 0.5 } : undefined}
                        className={`text-center py-1.5 text-[13px] font-['Mulish'] transition-colors cursor-pointer ${
                          !cell.current
                            ? "text-[#999]"
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

            {view === "months" && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <button onClick={() => setViewYear(viewYear - 1)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                    <MdKeyboardArrowLeft className="text-[#005a9c] text-xl hover:text-[#003578]" />
                  </button>
                  <button
                    onClick={() => {
                      setYearRangeStart(Math.floor(viewYear / 25) * 25);
                      setView("years");
                    }}
                    className="font-['Livvic'] font-bold text-[#005a9c] text-[16px] hover:text-[#003578] cursor-pointer bg-transparent border-none"
                  >
                    {viewYear}
                  </button>
                  <button onClick={() => setViewYear(viewYear + 1)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                    <MdKeyboardArrowRight className="text-[#005a9c] text-xl hover:text-[#003578]" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  {MONTH_NAMES.map((name, idx) => {
                    const isSelectedMonth = viewMonth === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectMonth(idx)}
                        className={`py-3 px-2 rounded-[8px] text-center cursor-pointer transition-colors ${
                          isSelectedMonth
                            ? "bg-[#006cf4] text-white"
                            : "text-[#3d3d3d] hover:bg-[#006cf4] hover:text-white"
                        }`}
                      >
                        <div className="text-[10px] font-['Mulish'] opacity-60">{idx + 1}</div>
                        <div className="text-[13px] font-['Livvic'] font-semibold">{name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {view === "years" && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <button onClick={() => setYearRangeStart(yearRangeStart - 25)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                    <MdKeyboardArrowLeft className="text-[#005a9c] text-xl hover:text-[#003578]" />
                  </button>
                  <span className="font-['Livvic'] font-bold text-[#005a9c] text-[14px]">
                    {yearRangeStart} - {yearRangeStart + 24}
                  </span>
                  <button onClick={() => setYearRangeStart(yearRangeStart + 25)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                    <MdKeyboardArrowRight className="text-[#005a9c] text-xl hover:text-[#003578]" />
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }, (_, i) => yearRangeStart + i).map((year) => {
                    const isSelectedYear = viewYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => handleSelectYear(year)}
                        style={!isSelectedYear ? { background: hatchPattern } : undefined}
                        className={`py-2 rounded-[6px] text-[12px] font-['Mulish'] text-center cursor-pointer transition-colors ${
                          isSelectedYear
                            ? "bg-[#006cf4] text-white"
                            : "text-[#3d3d3d] hover:bg-[#006cf4] hover:text-white"
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
