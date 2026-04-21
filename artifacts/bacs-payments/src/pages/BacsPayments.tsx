import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import DateInput from "../components/DateInput";
import ActionButton from "../components/ActionButton";
import ReadOnlyInput from "../components/ReadOnlyInput";
import DataGrid from "../components/DataGrid";
import SelectInput from "../components/SelectInput";
import WarningDialog from "../components/WarningDialog";
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
  { key: "tax", label: "Tax" },
  { key: "hash", label: "Hash" },
  { key: "payMethod", label: "Pay Method" },
];

const SAMPLE_PAYMENTS = [
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "608.58", accountName: "Testmnccfebd", bankRef: "225413", nineNine: "99", bacsDate: "31/12/2025", policyNo: "225413", tax: "0.00", hash: "/LHH", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "397.25", accountName: "Testmnccfedf", bankRef: "225435", nineNine: "99", bacsDate: "15/07/2025", policyNo: "225435", tax: "0.00", hash: "/AQN", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1502.03", accountName: "Testdnccfiaf", bankRef: "225805", nineNine: "99", bacsDate: "01/08/2025", policyNo: "225805", tax: "-113.20", hash: "/AM3", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "666.66", accountName: "Testalccfiee", bankRef: "225844", nineNine: "99", bacsDate: "07/08/2025", policyNo: "225844", tax: "0.00", hash: "/CUK", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "2076.33", accountName: "Testcrccfiii", bankRef: "225888", nineNine: "99", bacsDate: "04/07/2025", policyNo: "225888", tax: "-257.00", hash: "/.21", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "333.33", accountName: "Testmyccgaii", bankRef: "226088", nineNine: "99", bacsDate: "15/09/2025", policyNo: "226088", tax: "0.00", hash: "/L7J", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "414.91", accountName: "Testmdccgdea", bankRef: "226300", nineNine: "99", bacsDate: "15/09/2025", policyNo: "226300", tax: "0.00", hash: "/RK5", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "833.33", accountName: "Testmyccgfch", bankRef: "226527", nineNine: "99", bacsDate: "12/02/2026", policyNo: "226527", tax: "0.00", hash: "/F13", payMethod: "B" },
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
  const [completionStart, setCompletionStart] = useState("01/03/2025");
  const [completionEnd, setCompletionEnd] = useState("21/03/2026");
  const [startRunMonth, setStartRunMonth] = useState("04/04/2026");
  const [endRunMonth, setEndRunMonth] = useState("05/04/2026");
  const [monthlyStartRun, setMonthlyStartRun] = useState("31/03/2026");
  const [monthlyEndRun, setMonthlyEndRun] = useState("31/03/2026");
  const [reportsStartRun, setReportsStartRun] = useState("01/04/2026");
  const [reportsEndRun, setReportsEndRun] = useState("05/04/2026");
  const [paymentType, setPaymentType] = useState("All");
  const [includeNonPaye, setIncludeNonPaye] = useState(true);
  const [statusBarText] = useState("");
  const [showData, setShowData] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const handleShowPayments = () => setWarningOpen(true);
  const handleWarningYes = () => { setWarningOpen(false); setShowData(true); };
  const handleWarningNo = () => { setWarningOpen(false); setShowData(true); };
  const paymentRows = showData ? SAMPLE_PAYMENTS : [];
  const totalAmount = paymentRows.reduce((sum, r) => sum + parseFloat(r.amount), 0);
  const totalTax = paymentRows.reduce((sum, r) => sum + parseFloat(r.tax), 0);
  const totalNet = totalAmount;
  const totalGross = totalAmount - totalTax;
  const fmt = (n: number) => n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col bg-[#f0f0f0]" style={{ minHeight: 'calc(100vh / 0.8)' }}>
      <WarningDialog
        open={warningOpen}
        message="Some of the payments have already been committed. Would you like to exclude these payments?"
        onYes={handleWarningYes}
        onNo={handleWarningNo}
      />
      <header className="w-full bg-[#00263e] text-white px-[142px] pt-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={lvLogo} alt="LV= Logo" className="h-6" />
            <h1 className="font-['Livvic'] text-3xl font-normal tracking-tight text-white">
              BACS Payments for Liverpool Victoria Friendly Society Limited
            </h1>
          </div>
          <button className="h-8 px-4 text-white font-['Livvic'] text-sm hover:bg-white/10 rounded-[30px] transition-colors cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 px-[142px] py-6">
        <div className="bg-white rounded-[12px] shadow-sm border border-[#BBBBBB]/30 p-6">
          <div className="flex items-center gap-6 mb-6 flex-wrap">
            <DateInput label="Completion Start" value={completionStart} onChange={setCompletionStart} />
            <DateInput label="Completion End" value={completionEnd} onChange={setCompletionEnd} />
            <div className="ml-auto flex items-center gap-3">
              <ActionButton label="Show Payments" variant="secondary" onClick={handleShowPayments} />
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
                  <DataGrid columns={paymentColumns} data={paymentRows} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(paymentRows.length) : ""} />
                  <ReadOnlyInput label="Total Tax Free Cash" width="w-[200px]" value={showData ? fmt(totalAmount) : ""} />
                  <div className="ml-auto">
                    <ActionButton label="Save To Bacs" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>

              {/* First and One Off Payments Tab */}
              <Tabs.Content value="First and One Off Payments">
                <div className="min-h-[350px]">
                  <DataGrid columns={paymentColumns} data={paymentRows} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(paymentRows.length) : ""} />
                  <ReadOnlyInput label="Total First Payments" width="w-[180px]" value={showData ? fmt(totalAmount) : ""} />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" value={showData ? fmt(totalTax) : ""} />
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
                      <ActionButton label="Show Payments" variant="secondary" onClick={handleShowPayments} />
                      <ActionButton label="Print Report" variant="secondary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="min-w-[302px]">
                      <SelectInput
                        label="Payment Type"
                        value={paymentType}
                        options={["All", "First", "One Off"]}
                        onChange={setPaymentType}
                      />
                    </div>
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
                  <DataGrid columns={paymentColumns} data={[]} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value="" />
                  <ReadOnlyInput label="Total Net" width="w-[160px]" value="" />
                  <ReadOnlyInput label="Total Gross" width="w-[180px]" value="" />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" value="" />
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
                  <div className="flex-1 border border-[#BBBBBB] rounded-[8px] bg-white" />
                </div>
              </Tabs.Content>

              {/* Maturities Tab */}
              <Tabs.Content value="Maturities">
                <div className="min-h-[350px]">
                  <DataGrid columns={maturityColumns} data={paymentRows} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(paymentRows.length) : ""} />
                  <ReadOnlyInput label="Total Maturity Payments" width="w-[200px]" value={showData ? fmt(totalAmount) : ""} />
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
                  <DataGrid columns={paymentColumns} data={paymentRows} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(paymentRows.length) : ""} />
                  <ReadOnlyInput label="Total First Payments" width="w-[180px]" value={showData ? fmt(totalAmount) : ""} />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" value={showData ? fmt(totalTax) : ""} />
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
                      <ActionButton label="Show Payments" variant="secondary" onClick={handleShowPayments} />
                      <ActionButton label="Print Report" variant="secondary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="min-w-[302px]">
                      <SelectInput
                        label="Payment Type"
                        value={paymentType}
                        options={["All", "First", "One Off"]}
                        onChange={setPaymentType}
                      />
                    </div>
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
                  <DataGrid columns={paymentColumns} data={[]} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value="" />
                  <ReadOnlyInput label="Total Tax Free Cash" width="w-[200px]" value="" />
                  <div className="ml-auto">
                    <ActionButton label="Save And Commit To Bacs" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
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
