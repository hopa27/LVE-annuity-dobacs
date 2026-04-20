import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import DateInput from "../components/DateInput";
import ActionButton from "../components/ActionButton";
import ReadOnlyInput from "../components/ReadOnlyInput";
import DataGrid from "../components/DataGrid";
import SelectInput from "../components/SelectInput";
import { MdCheck } from "react-icons/md";
import lvLogo from "@assets/image_1775892371361.png";

const TAB_LIST = [
  "Tax Free",
  "First and One Off Payments",
  "Processed",
  "Monthly Differences",
  "Maturities",
  "Reports",
  "FirstPayments MCP",
  "Processed MCP",
];

const paymentColumns = [
  { key: "sortCode", label: "Bank Sort Code" },
  { key: "accountNo", label: "Bank Account No" },
  { key: "zero", label: "'0'" },
  { key: "amount", label: "Amount To Pay" },
  { key: "accountName", label: "Bank Account Name" },
  { key: "bankRef", label: "Bank Ref" },
  { key: "nineNine", label: "'99'" },
  { key: "bacsDate", label: "BACS Date" },
  { key: "policyNo", label: "Policy No" },
];

const maturityColumns = [
  { key: "sortCode", label: "Sort Code" },
  { key: "accountNo", label: "Bank Account No" },
  { key: "zero", label: "'0'" },
  { key: "amount", label: "Amount To Pay" },
  { key: "accountName", label: "Bank Account Name" },
  { key: "bankRef", label: "Bank Ref" },
  { key: "nineNine", label: "'99'" },
  { key: "policyNo", label: "Policy No" },
  { key: "tax", label: "Tax" },
];

export default function BacsPayments() {
  const [activeTab, setActiveTab] = useState("Tax Free");
  const [completionStart, setCompletionStart] = useState("31/03/2026");
  const [completionEnd, setCompletionEnd] = useState("31/03/2026");
  const [startRunMonth, setStartRunMonth] = useState("04/04/2026");
  const [endRunMonth, setEndRunMonth] = useState("05/04/2026");
  const [monthlyStartRun, setMonthlyStartRun] = useState("31/03/2026");
  const [monthlyEndRun, setMonthlyEndRun] = useState("31/03/2026");
  const [reportsStartRun, setReportsStartRun] = useState("01/04/2026");
  const [reportsEndRun, setReportsEndRun] = useState("05/04/2026");
  const [paymentType, setPaymentType] = useState("All");
  const [includeNonPaye, setIncludeNonPaye] = useState(true);
  const [statusBarText] = useState("");

  return (
    <div className="flex flex-col bg-[#f0f0f0]" style={{ minHeight: 'calc(100vh / 0.8)' }}>
      <header className="w-full bg-[#00263e] text-white px-[142px] pt-4 pb-6">
        <div className="flex items-center justify-between">
          <img src={lvLogo} alt="LV= Logo" className="h-6" />
          <button className="h-8 px-4 text-white font-['Livvic'] text-sm hover:bg-white/10 rounded-[30px] transition-colors cursor-pointer">
            Logout
          </button>
        </div>
        <div className="h-px bg-slate-600/50 my-3" />
        <h1 className="font-['Livvic'] text-3xl font-normal tracking-tight text-white">
          BACS Payments for Liverpool Victoria Friendly Society Limited
        </h1>
      </header>

      <main className="flex-1 px-[142px] py-6">
        <div className="bg-white rounded-[12px] shadow-sm border border-[#BBBBBB]/30 p-6">
          <div className="flex items-center gap-6 mb-6 flex-wrap">
            <DateInput label="Completion Start" value={completionStart} onChange={setCompletionStart} />
            <DateInput label="Completion End" value={completionEnd} onChange={setCompletionEnd} />
            <div className="ml-auto flex items-center gap-3">
              <ActionButton label="Show Payments" variant="secondary" />
              <ActionButton label="Print Report" variant="secondary" />
            </div>
          </div>

          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex gap-1 mb-0">
              {TAB_LIST.map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  className={`px-3 py-2.5 rounded-t-[8px] text-[13px] font-semibold font-['Livvic'] transition-all cursor-pointer border-b-0 whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-white text-[#4a4a49] shadow-[0_-2px_8px_rgba(0,0,0,0.06)] z-10 relative"
                      : "bg-[#eaf5f8] text-[#0d2c41] hover:bg-[#dceef3]"
                  }`}
                >
                  {tab}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="border border-[#BBBBBB]/40 rounded-b-[8px] rounded-tr-[8px] bg-white p-5">
              {/* Tax Free Tab */}
              <Tabs.Content value="Tax Free">
                <div className="min-h-[350px]">
                  <DataGrid columns={paymentColumns} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" />
                  <ReadOnlyInput label="Total Tax Free Cash" width="w-[200px]" />
                  <div className="ml-auto">
                    <ActionButton label="Save To Bacs" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>

              {/* First and One Off Payments Tab */}
              <Tabs.Content value="First and One Off Payments">
                <div className="min-h-[350px]">
                  <DataGrid columns={paymentColumns} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" />
                  <ReadOnlyInput label="Total First Payments" width="w-[180px]" />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" />
                  <div className="ml-auto flex items-center gap-3">
                    <ActionButton label="Save To Bacs" icon variant="primary" />
                    <ActionButton label="Save And Commit To BACS" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>

              {/* Processed Tab */}
              <Tabs.Content value="Processed">
                <div className="border border-[#BBBBBB]/40 rounded-[8px] p-4 mb-4 bg-[#fafbfc]">
                  <div className="flex items-center gap-6 mb-3 flex-wrap">
                    <DateInput label="Start Run Month" value={startRunMonth} onChange={setStartRunMonth} />
                    <DateInput label="End Run Month" value={endRunMonth} onChange={setEndRunMonth} />
                    <div className="ml-auto flex items-center gap-3">
                      <ActionButton label="Show Payments" variant="secondary" />
                      <ActionButton label="Print Report" variant="secondary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <SelectInput
                      label="Payment Type"
                      value={paymentType}
                      options={["All", "First", "One Off"]}
                      onChange={setPaymentType}
                    />
                    <label className="flex items-center gap-2 font-['Livvic'] text-sm font-medium text-[#3d3d3d] cursor-pointer">
                      Include non-PAYE cases
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                          includeNonPaye ? "bg-[#178830] border-[#178830]" : "border-[#979797] bg-white"
                        }`}
                        onClick={() => setIncludeNonPaye(!includeNonPaye)}
                      >
                        {includeNonPaye && <MdCheck className="text-white text-sm" />}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="min-h-[300px]">
                  <DataGrid columns={paymentColumns} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" />
                  <ReadOnlyInput label="Total Net" width="w-[160px]" />
                  <ReadOnlyInput label="Total Gross" width="w-[180px]" />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" />
                </div>
                <div className="flex items-center gap-3 mt-4 justify-center flex-wrap">
                  <ActionButton label="Save To Bacs" icon variant="primary" />
                  <ActionButton label="Save And Commit To BACS" icon variant="primary" />
                  <ActionButton label="Save To CSV" icon variant="primary" />
                </div>
              </Tabs.Content>

              {/* Monthly Differences Tab */}
              <Tabs.Content value="Monthly Differences">
                <div className="border border-[#BBBBBB]/40 rounded-[8px] p-4 mb-4 bg-[#fafbfc]">
                  <div className="flex items-center gap-6 flex-wrap">
                    <DateInput label="Start Run Month" value={monthlyStartRun} onChange={setMonthlyStartRun} />
                    <DateInput label="End Run Month" value={monthlyEndRun} onChange={setMonthlyEndRun} />
                    <div className="ml-auto flex items-center gap-3">
                      <ActionButton label="Produce List" variant="secondary" />
                      <ActionButton label="Produce Nil-Income List" variant="secondary" />
                      <ActionButton label="Print Preview" variant="secondary" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 min-h-[350px]">
                  <div className="w-[80px] border border-[#BBBBBB] rounded-[8px] bg-white" />
                  <div className="flex-1 border border-[#BBBBBB] rounded-[8px] bg-white" />
                </div>
              </Tabs.Content>

              {/* Maturities Tab */}
              <Tabs.Content value="Maturities">
                <div className="min-h-[350px]">
                  <DataGrid columns={maturityColumns} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" />
                  <ReadOnlyInput label="Total Maturity Payments" width="w-[200px]" />
                  <div className="ml-auto">
                    <ActionButton label="Save and Commit To Bacs" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>

              {/* Reports Tab */}
              <Tabs.Content value="Reports">
                <div className="border border-[#BBBBBB]/40 rounded-[8px] p-4 mb-4 bg-[#fafbfc]">
                  <div className="flex items-center gap-6 mb-3 flex-wrap">
                    <DateInput label="Start Run Month" value={reportsStartRun} onChange={setReportsStartRun} />
                    <DateInput label="End Run Month" value={reportsEndRun} onChange={setReportsEndRun} />
                    <div className="ml-auto flex items-center gap-3">
                      <ActionButton label="Print First" variant="secondary" />
                      <ActionButton label="Print Processed" variant="secondary" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 font-['Livvic'] text-sm font-medium text-[#3d3d3d] cursor-pointer ml-1">
                    Include non-PAYE cases
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                        includeNonPaye ? "bg-[#178830] border-[#178830]" : "border-[#979797] bg-white"
                      }`}
                      onClick={() => setIncludeNonPaye(!includeNonPaye)}
                    >
                      {includeNonPaye && <MdCheck className="text-white text-sm" />}
                    </div>
                  </label>
                </div>
                <div className="min-h-[350px] border border-[#BBBBBB] rounded-[8px] bg-white" />
              </Tabs.Content>

              {/* FirstPayments MCP Tab */}
              <Tabs.Content value="FirstPayments MCP">
                <div className="min-h-[350px]">
                  <DataGrid columns={paymentColumns} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" />
                  <ReadOnlyInput label="Total First Payments" width="w-[180px]" />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" />
                  <div className="ml-auto flex items-center gap-3">
                    <ActionButton label="Save To Bacs" icon variant="primary" />
                    <ActionButton label="Save And Commit To BACS" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>

              {/* Processed MCP Tab */}
              <Tabs.Content value="Processed MCP">
                <div className="border border-[#BBBBBB]/40 rounded-[8px] p-4 mb-4 bg-[#fafbfc]">
                  <div className="flex items-center gap-6 mb-3 flex-wrap">
                    <DateInput label="Start Run Month" value={startRunMonth} onChange={setStartRunMonth} />
                    <DateInput label="End Run Month" value={endRunMonth} onChange={setEndRunMonth} />
                    <div className="ml-auto flex items-center gap-3">
                      <ActionButton label="Show Payments" variant="secondary" />
                      <ActionButton label="Print Report" variant="secondary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <SelectInput
                      label="Payment Type"
                      value={paymentType}
                      options={["All", "First", "One Off"]}
                      onChange={setPaymentType}
                    />
                    <label className="flex items-center gap-2 font-['Livvic'] text-sm font-medium text-[#3d3d3d] cursor-pointer">
                      Include non-PAYE cases
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                          includeNonPaye ? "bg-[#178830] border-[#178830]" : "border-[#979797] bg-white"
                        }`}
                        onClick={() => setIncludeNonPaye(!includeNonPaye)}
                      >
                        {includeNonPaye && <MdCheck className="text-white text-sm" />}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="min-h-[300px]">
                  <DataGrid columns={paymentColumns} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" />
                  <ReadOnlyInput label="Total Tax Free Cash" width="w-[200px]" />
                  <div className="ml-auto">
                    <ActionButton label="Save And Commit To Bacs" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center gap-6 mt-5 flex-wrap">
          <ActionButton label="Close" variant="secondary" />
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              readOnly
              value={statusBarText}
              className="h-[44px] w-[200px] rounded-[8px] border border-[#BBBBBB] bg-white px-[12px] py-[8px] font-['Mulish'] text-[16px] leading-[26px] text-[#3d3d3d] outline-none"
            />
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-t border-slate-200 mt-auto shrink-0 py-4 px-[142px] flex items-center justify-between">
        <img src={lvLogo} alt="LV= Logo" className="h-6" />
        <div className="text-right">
          <p className="text-[10px] font-medium text-slate-400">
            Liverpool Victoria Friendly Society Limited
          </p>
          <p className="text-[10px] font-medium text-slate-400">
            County Gates, Bournemouth BH1 2NF
          </p>
        </div>
      </footer>
    </div>
  );
}
