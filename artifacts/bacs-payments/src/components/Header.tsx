export default function Header() {
  return (
    <header className="w-full bg-[#00263e] text-white px-8 pt-4 pb-6">
      <div className="flex items-center justify-between">
        <span className="font-['Livvic'] text-lg font-semibold tracking-tight">LV=</span>
        <button className="h-8 px-4 text-white font-['Livvic'] text-sm hover:bg-white/10 rounded-[30px] transition-colors">
          Logout
        </button>
      </div>
      <div className="h-px bg-slate-600/50 my-3" />
      <h1 className="font-['Livvic'] text-3xl font-normal tracking-tight text-white">
        BACS Payments
      </h1>
    </header>
  );
}
