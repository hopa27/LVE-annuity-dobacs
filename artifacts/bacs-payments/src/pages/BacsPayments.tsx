import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import DateInput from "../components/DateInput";
import ActionButton from "../components/ActionButton";
import ReadOnlyInput from "../components/ReadOnlyInput";
import DataGrid from "../components/DataGrid";
import SelectInput from "../components/SelectInput";
import WarningDialog from "../components/WarningDialog";
import InfoDialog from "../components/InfoDialog";
import PrintPreviewModal, { type PrintRow } from "../components/PrintPreviewModal";
import ReportPrintModal, { type ReportColumn, type ReportTotal } from "../components/ReportPrintModal";
import FirstPaymentReportModal from "../components/FirstPaymentReportModal";
import ProcessedReportModal from "../components/ProcessedReportModal";
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

const FIRST_PAYMENTS = [
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "833.33", accountName: "Testmsccbdda", bankRef: "221330", nineNine: "99", bacsDate: "12/05/2025", policyNo: "221330", tax: "0.00", hash: "/9K4", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1459.65", accountName: "Testpsccchbi", bankRef: "222718", nineNine: "99", bacsDate: "22/04/2025", policyNo: "222718", tax: "-102.60", hash: "/PQS", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "412.58", accountName: "Testjeccfafa", bankRef: "225050", nineNine: "99", bacsDate: "02/05/2025", policyNo: "225050", tax: "0.00", hash: "/63S", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "2128.20", accountName: "Testmeccfbbc", bankRef: "225112", nineNine: "99", bacsDate: "08/05/2025", policyNo: "225112", tax: "-269.80", hash: "/4C7", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "860.75", accountName: "Testmnccfbdb", bankRef: "225131", nineNine: "99", bacsDate: "18/06/2025", policyNo: "225131", tax: "0.00", hash: "/XQA", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "890.73", accountName: "Testmsccfcbc", bankRef: "225212", nineNine: "99", bacsDate: "25/04/2025", policyNo: "225212", tax: "0.00", hash: "/MUC", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "269.11", accountName: "Testmsccfcbc", bankRef: "225212", nineNine: "99", bacsDate: "01/05/2025", policyNo: "225212", tax: "-27.80", hash: "/H4B", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "750.00", accountName: "Testnyccfcdf", bankRef: "INVENC269064", nineNine: "99", bacsDate: "14/04/2025", policyNo: "225235", tax: "0.00", hash: "/MGC", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "753.41", accountName: "Testjlccfcje", bankRef: "225294", nineNine: "99", bacsDate: "22/04/2025", policyNo: "225294", tax: "0.00", hash: "/A.H", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1047.50", accountName: "Testmnccfdbf", bankRef: "225315", nineNine: "99", bacsDate: "17/06/2025", policyNo: "225315", tax: "0.00", hash: "//01", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "174.75", accountName: "Testmnccfdbh", bankRef: "225317", nineNine: "99", bacsDate: "28/04/2025", policyNo: "225317", tax: "0.00", hash: "/S3J", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1000.00", accountName: "Testmyccfdii", bankRef: "225388", nineNine: "99", bacsDate: "14/05/2025", policyNo: "225388", tax: "0.00", hash: "/N12", payMethod: "B" },
];

const FIRST_PAYMENTS_TOTALS = {
  count: 867,
  totalFirstPayments: 1532011.10,
  totalTax: -305357.03,
};

const taxFreeColumns = [
  { key: "sortCode", label: "BANK_SORT_CODE" },
  { key: "accountNo", label: "BANK_ACCOUNT_NO" },
  { key: "amount", label: "TAX FREE CASH" },
  { key: "accountName", label: "BANK_ACCOUNT_NAME" },
  { key: "bankRef", label: "BANK_REF" },
  { key: "nineNine", label: "'99'" },
  { key: "cDate", label: "C_DATE" },
  { key: "policyNo", label: "POLICY_NO" },
  { key: "tax", label: "TAX" },
];

const TAX_FREE_PAYMENTS = [
  { sortCode: "77-48-14", accountNo: "24782346", amount: "16563.41", accountName: "Testpsccchbi", bankRef: "222718", nineNine: "99", cDate: "17/04/2025", policyNo: "222718", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "4893.12", accountName: "Testjeccfafa", bankRef: "225050", nineNine: "99", cDate: "01/05/2025", policyNo: "225050", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "53032.52", accountName: "Testmeccfbbc", bankRef: "225112", nineNine: "99", cDate: "07/05/2025", policyNo: "225112", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "31423.71", accountName: "Testmnccfbdb", bankRef: "225131", nineNine: "99", cDate: "17/06/2025", policyNo: "225131", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "52180.62", accountName: "Testmsccfceh", bankRef: "225247", nineNine: "99", cDate: "03/04/2025", policyNo: "225247", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "12713.44", accountName: "Testjlccfcje", bankRef: "225294", nineNine: "99", cDate: "22/04/2025", policyNo: "225294", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "5851.69", accountName: "Testmnccfddh", bankRef: "225317", nineNine: "99", cDate: "25/04/2025", policyNo: "225317", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "57000.59", accountName: "Testmnccgdla", bankRef: "225319", nineNine: "99", cDate: "11/07/2025", policyNo: "225319", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "78965.47", accountName: "Testmnccfdfb", bankRef: "225351", nineNine: "99", cDate: "26/04/2025", policyNo: "225351", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "12345.67", accountName: "Testmnccfdhg", bankRef: "225381", nineNine: "99", cDate: "22/04/2025", policyNo: "225381", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "12518.74", accountName: "Testmnccfdfb", bankRef: "225381", nineNine: "99", cDate: "22/04/2025", policyNo: "225381", tax: "0" },
  { sortCode: "77-48-14", accountNo: "24782346", amount: "36605.41", accountName: "Testmnccdcdg", bankRef: "225386", nineNine: "99", cDate: "02/04/2025", policyNo: "225386", tax: "0" },
];

const TAX_FREE_TOTALS = {
  count: 505,
  totalTaxFreeCash: 15753633.63,
};

const MATURITY_PAYMENTS = [
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "111306", accountName: "Testaabbblc", bankRef: "AV2635737", nineNine: "99", policyNo: "191152", tax: "" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "68692", accountName: "Testdpbjdb", bankRef: "CA25483", nineNine: "99", policyNo: "195931", tax: "" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "71363", accountName: "Testdpbjhfa", bankRef: "CA25483", nineNine: "99", policyNo: "195750", tax: "" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "64678", accountName: "Testcecaecbc", bankRef: "FAE9BWPYLDUG", nineNine: "99", policyNo: "204212", tax: "" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "27915", accountName: "Testmebccg.b", bankRef: "121226", nineNine: "99", policyNo: "121226.1", tax: "0" },
];

const MATURITY_TOTALS = {
  count: 5,
  totalMaturityPayments: 343954,
};

const FIRST_PAYMENTS_MCP = [
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "526.99", accountName: "Testmdccfdcfa", bankRef: "225939", nineNine: "99", bacsDate: "04/04/2025", policyNo: "225939", tax: "0.00", hash: "/VQL", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1251.22", accountName: "Testmdccfdfg", bankRef: "225956", nineNine: "99", bacsDate: "09/04/2025", policyNo: "225956", tax: "0.00", hash: "/RB9", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "372.69", accountName: "Testmnccgabi", bankRef: "226018", nineNine: "99", bacsDate: "09/04/2025", policyNo: "226018", tax: "0.00", hash: "/GYI", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "126.23", accountName: "Testmnccgabj", bankRef: "226040", nineNine: "99", bacsDate: "04/04/2025", policyNo: "226040", tax: "0.00", hash: "/M.U", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1075.22", accountName: "Testmnccgaed", bankRef: "226043", nineNine: "99", bacsDate: "09/04/2025", policyNo: "226043", tax: "0.00", hash: "/U3-", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1157.31", accountName: "Testmnccgafg", bankRef: "226056", nineNine: "99", bacsDate: "04/04/2025", policyNo: "226056", tax: "0.00", hash: "/ZTG", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "834.66", accountName: "Testmnccgafi", bankRef: "226058", nineNine: "99", bacsDate: "04/04/2025", policyNo: "226058", tax: "0.00", hash: "/A.B", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "139.42", accountName: "Testmnccggii", bankRef: "226065", nineNine: "99", bacsDate: "04/04/2025", policyNo: "226065", tax: "0.00", hash: "/B0G", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "500.00", accountName: "Testdpccgaaf", bankRef: "226065", nineNine: "99", bacsDate: "04/04/2025", policyNo: "226065", tax: "0.00", hash: "/OPS", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "300.42", accountName: "Testmnccggaf", bankRef: "226065", nineNine: "99", bacsDate: "04/04/2025", policyNo: "226065", tax: "0.00", hash: "/UQO", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "192.45", accountName: "Testmccccgaf", bankRef: "226065", nineNine: "99", bacsDate: "04/04/2025", policyNo: "226065", tax: "0.00", hash: "/OPS", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "257.57", accountName: "Testmnccgaai", bankRef: "226068", nineNine: "99", bacsDate: "18/04/2025", policyNo: "226068", tax: "0.00", hash: "/SKH", payMethod: "B" },
];

const FIRST_PAYMENTS_MCP_TOTALS = {
  count: 753,
  totalFirstPayments: 606906.17,
  totalTax: 0,
};

const PROCESSED_MCP_PAYMENTS = [
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "412.58", accountName: "Testjeccfafa", bankRef: "225050", nineNine: "99", bacsDate: "02/05/2025", policyNo: "225050", tax: "0.00", hash: "/63S", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "860.75", accountName: "Testmnccfbdb", bankRef: "225131", nineNine: "99", bacsDate: "18/06/2025", policyNo: "225131", tax: "0.00", hash: "/XQA", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1075.22", accountName: "Testmnccgaed", bankRef: "226043", nineNine: "99", bacsDate: "09/04/2025", policyNo: "226043", tax: "0.00", hash: "/U3-", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "750.00", accountName: "Testnyccfcdf", bankRef: "INVENC269064", nineNine: "99", bacsDate: "14/04/2025", policyNo: "225235", tax: "0.00", hash: "/MGC", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "526.99", accountName: "Testmdccfdcfa", bankRef: "225939", nineNine: "99", bacsDate: "04/04/2025", policyNo: "225939", tax: "0.00", hash: "/VQL", payMethod: "B" },
];

const PROCESSED_MCP_TOTALS = {
  count: 5,
  totalTaxFreeCash: 3625.54,
};

const PROCESSED_PAYMENTS = [
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "1459.65", accountName: "Testpsccchbi", bankRef: "222718", nineNine: "99", bacsDate: "22/04/2025", policyNo: "222718", tax: "-102.60", hash: "/PQS", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "2128.20", accountName: "Testmeccfbbc", bankRef: "225112", nineNine: "99", bacsDate: "08/05/2025", policyNo: "225112", tax: "-269.80", hash: "/4C7", payMethod: "B" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", amount: "890.73", accountName: "Testmsccfcbc", bankRef: "225212", nineNine: "99", bacsDate: "25/04/2025", policyNo: "225212", tax: "0.00", hash: "/MUC", payMethod: "B" },
];

const PROCESSED_TOTALS = {
  count: 3,
  totalNet: 4478.58,
  totalGross: 4850.98,
  totalTax: -372.40,
};

const reportPaymentColumns: ReportColumn[] = [
  { key: "sortCode", label: "Bank Sort Code" },
  { key: "accountNo", label: "Bank Account No" },
  { key: "zero", label: "0" },
  { key: "amount", label: "Amount To Pay", align: "right" },
  { key: "accountName", label: "Bank Account Name" },
  { key: "bankRef", label: "Bank Ref" },
  { key: "nineNine", label: "99" },
  { key: "bacsDate", label: "BACS Date" },
  { key: "tax", label: "Tax", align: "right" },
  { key: "policyNo", label: "Policy Ref" },
];

const reportTaxFreeColumns: ReportColumn[] = [
  { key: "sortCode", label: "Bank Sort Code" },
  { key: "accountNo", label: "Bank Account No" },
  { key: "amount", label: "Tax Free Cash", align: "right" },
  { key: "accountName", label: "Bank Account Name" },
  { key: "bankRef", label: "Bank Ref" },
  { key: "nineNine", label: "99" },
  { key: "cDate", label: "C Date" },
  { key: "tax", label: "Tax", align: "right" },
  { key: "policyNo", label: "Policy Ref" },
];

const reportMaturityColumns: ReportColumn[] = [
  { key: "sortCode", label: "Bank Sort Code" },
  { key: "accountNo", label: "Bank Account No" },
  { key: "zero", label: "0" },
  { key: "amount", label: "Amount To Pay", align: "right" },
  { key: "accountName", label: "Bank Account Name" },
  { key: "bankRef", label: "Bank Ref" },
  { key: "nineNine", label: "99" },
  { key: "tax", label: "Tax", align: "right" },
  { key: "policyNo", label: "Policy Ref" },
];

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDateLong(d: string): string {
  const m = d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return d;
  const monthIdx = parseInt(m[2], 10) - 1;
  return `${m[1]}-${MONTH_ABBR[monthIdx] ?? m[2]}-${m[3]}`;
}

const MONTHLY_DIFF_PRINT_ROWS: PrintRow[] = [
  { policyNo: "920735.0", policyRef: "131855.0", paykey: "920735", currentDate: "13/03/2025", currentRef: "156", currentGross: "£2,353.07", previousDate: "13/02/2025", previousRef: "155", previousGross: "£2,349.77", paymentType: "B", pctChange: "0.14" },
  { policyNo: "920735.0", policyRef: "131855.0", paykey: "920735", currentDate: "13/03/2026", currentRef: "168", currentGross: "£2,356.58", previousDate: "13/02/2025", previousRef: "167", previousGross: "£2,353.15", paymentType: "B", pctChange: "0.15" },
  { policyNo: "892618.0", policyRef: "105469.0", paykey: "892618", currentDate: "20/02/2025", currentRef: "200", currentGross: "£2,087.92", previousDate: "20/01/2025", previousRef: "199", previousGross: "£2,084.75", paymentType: "B", pctChange: "0.15" },
  { policyNo: "892618.0", policyRef: "105469.0", paykey: "892618", currentDate: "20/02/2025", currentRef: "212", currentGross: "£2,091.22", previousDate: "20/01/2025", previousRef: "211", previousGross: "£2,087.97", paymentType: "B", pctChange: "0.16" },
  { policyNo: "964423.0", policyRef: "174201.0", paykey: "964423", currentDate: "16/05/2025", currentRef: "106", currentGross: "£2,800.71", previousDate: "16/04/2025", previousRef: "105", previousGross: "£2,794.45", paymentType: "B", pctChange: "0.22" },
  { policyNo: "894408.0", policyRef: "107255.0", paykey: "894408", currentDate: "17/06/2025", currentRef: "192", currentGross: "£440.94", previousDate: "17/05/2025", previousRef: "191", previousGross: "£439.90", paymentType: "B", pctChange: "0.24" },
  { policyNo: "961628.0", policyRef: "171884.0", paykey: "961628", currentDate: "31/03/2025", currentRef: "123", currentGross: "£564.54", previousDate: "28/02/2025", previousRef: "122", previousGross: "£563.01", paymentType: "B", pctChange: "0.27" },
  { policyNo: "962106.0", policyRef: "171884.0", paykey: "962106", currentDate: "29/03/2025", currentRef: "123", currentGross: "£368.84", previousDate: "28/02/2025", previousRef: "122", previousGross: "£367.82", paymentType: "B", pctChange: "0.28" },
  { policyNo: "114278.1", policyRef: "114278.1", paykey: "114278", currentDate: "30/11/2025", currentRef: "50", currentGross: "£381.90", previousDate: "30/10/2025", previousRef: "49", previousGross: "£380.81", paymentType: "B", pctChange: "0.29" },
  { policyNo: "952381.0", policyRef: "162159.0", paykey: "952381", currentDate: "11/02/2025", currentRef: "135", currentGross: "£460.63", previousDate: "11/01/2025", previousRef: "134", previousGross: "£459.16", paymentType: "B", pctChange: "0.32" },
  { policyNo: "908657.0", policyRef: "121428.0", paykey: "908657", currentDate: "16/05/2025", currentRef: "169", currentGross: "£1,973.08", previousDate: "16/04/2025", previousRef: "168", previousGross: "£1,965.82", paymentType: "B", pctChange: "0.37" },
  { policyNo: "888469.0", policyRef: "101333.0", paykey: "888469", currentDate: "19/05/2025", currentRef: "205", currentGross: "£721.64", previousDate: "19/04/2025", previousRef: "204", previousGross: "£718.77", paymentType: "B", pctChange: "0.40" },
  { policyNo: "146434.1", policyRef: "146434.1", paykey: "146434", currentDate: "01/07/2025", currentRef: "144", currentGross: "£1,036.19", previousDate: "01/06/2025", previousRef: "143", previousGross: "£1,031.93", paymentType: "B", pctChange: "0.41" },
  { policyNo: "938717.0", policyRef: "148495.0", paykey: "938717", currentDate: "28/11/2025", currentRef: "145", currentGross: "£308.73", previousDate: "28/10/2025", previousRef: "144", previousGross: "£307.43", paymentType: "B", pctChange: "0.42" },
  { policyNo: "923866.0", policyRef: "134498.0", paykey: "923866", currentDate: "30/04/2025", currentRef: "155", currentGross: "£335.57", previousDate: "30/03/2025", previousRef: "154", previousGross: "£334.13", paymentType: "B", pctChange: "0.43" },
  { policyNo: "100069.1", policyRef: "100069.1", paykey: "100069", currentDate: "25/03/2025", currentRef: "60", currentGross: "£240.38", previousDate: "25/02/2025", previousRef: "59", previousGross: "£239.32", paymentType: "B", pctChange: "0.44" },
  { policyNo: "100069.1", policyRef: "100069.1", paykey: "100069", currentDate: "25/03/2025", currentRef: "72", currentGross: "£241.55", previousDate: "25/02/2025", previousRef: "71", previousGross: "£240.48", paymentType: "B", pctChange: "0.44" },
];

const nilIncomeColumns = [
  { key: "policyRef", label: "Policy Ref" },
  { key: "paykey", label: "Paykey" },
  { key: "benefitType", label: "Benefit Type" },
  { key: "newAnnuityAmount", label: "New Annuity Amount" },
  { key: "previousAnnuityAmount", label: "Previous Annuity Amount" },
  { key: "currentPaymentDate", label: "Current Payment Date" },
  { key: "previousPaymentDate", label: "Previous Payment Date" },
];

const monthlyDiffColumns = [
  { key: "policyNo", label: "Policy No" },
  { key: "currentDate", label: "Current Date" },
  { key: "currentRef", label: "Current Ref" },
  { key: "currentGross", label: "Current Gross" },
  { key: "previousDate", label: "Previous Date" },
  { key: "previousRef", label: "Previous Ref" },
  { key: "previousGross", label: "Previous Gross" },
];

const MONTHLY_DIFFERENCES = [
  { policyNo: "915265.0", currentDate: "21/02/2025", currentRef: "159", currentGross: "-£211.50", previousDate: "15/02/2025", previousRef: "158", previousGross: "-£211.50" },
  { policyNo: "986018.0", currentDate: "03/04/2025", currentRef: "10", currentGross: "-£900.00", previousDate: "30/03/2025", previousRef: "9", previousGross: "-£900.00" },
  { policyNo: "124084.1", currentDate: "04/04/2025", currentRef: "2", currentGross: "£558.20", previousDate: "06/03/2025", previousRef: "1", previousGross: "£1,116.40" },
  { policyNo: "987101.0", currentDate: "03/04/2025", currentRef: "49", currentGross: "£2,813.77", previousDate: "03/03/2025", previousRef: "48", previousGross: "£2,731.90" },
  { policyNo: "102918.1", currentDate: "03/06/2025", currentRef: "47", currentGross: "£441.67", previousDate: "03/04/2025", previousRef: "", previousGross: "£196.50" },
  { policyNo: "100272.9.0", currentDate: "03/06/2025", currentRef: "25", currentGross: "£641.29", previousDate: "03/05/2025", previousRef: "24", previousGross: "£819.79" },
  { policyNo: "105276.1", currentDate: "10/02/2025", currentRef: "8", currentGross: "£105.05", previousDate: "10/02/2025", previousRef: "7", previousGross: "£105.14" },
  { policyNo: "105276.1", currentDate: "10/03/2025", currentRef: "8", currentGross: "£105.05", previousDate: "10/02/2025", previousRef: "7", previousGross: "£105.14" },
  { policyNo: "934753.0", currentDate: "12/07/2025", currentRef: "14", currentGross: "£1,155.31", previousDate: "29/06/2025", previousRef: "13", previousGross: "£200.52" },
  { policyNo: "100161.9.0", currentDate: "03/04/2025", currentRef: "25", currentGross: "£442.04", previousDate: "03/03/2025", previousRef: "24", previousGross: "£429.24" },
  { policyNo: "918067.0", currentDate: "03/04/2025", currentRef: "159", currentGross: "£144.88", previousDate: "24/02/2025", previousRef: "158", previousGross: "£155.01" },
  { policyNo: "908148.0", currentDate: "03/06/2025", currentRef: "170", currentGross: "£441.67", previousDate: "03/05/2025", previousRef: "169", previousGross: "£403.65" },
  { policyNo: "919276.0", currentDate: "29/04/2025", currentRef: "7", currentGross: "£85.42", previousDate: "29/03/2025", previousRef: "7", previousGross: "£85.42" },
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
  const [startRunMonth, setStartRunMonth] = useState("01/01/2026");
  const [endRunMonth, setEndRunMonth] = useState("05/04/2026");
  const [mcpStartRunMonth, setMcpStartRunMonth] = useState("01/05/2024");
  const [mcpEndRunMonth, setMcpEndRunMonth] = useState("05/04/2026");
  const [monthlyStartRun, setMonthlyStartRun] = useState("01/02/2025");
  const [monthlyEndRun, setMonthlyEndRun] = useState("21/04/2026");
  const [reportsStartRun, setReportsStartRun] = useState("01/05/2025");
  const [reportsEndRun, setReportsEndRun] = useState("05/04/2026");
  const [paymentType, setPaymentType] = useState("All");
  const [includeNonPaye, setIncludeNonPaye] = useState(true);
  const [statusBarText] = useState("");
  const [showData, setShowData] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [showMonthlyDiff, setShowMonthlyDiff] = useState(false);
  const [showNilIncome, setShowNilIncome] = useState(false);
  const [noDataOpen, setNoDataOpen] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("No Data found");
  const [printPreviewOpen, setPrintPreviewOpen] = useState(false);
  const [reportPrintOpen, setReportPrintOpen] = useState(false);
  const [reportPrintWarningOpen, setReportPrintWarningOpen] = useState(false);
  const [firstReportOpen, setFirstReportOpen] = useState(false);
  const [processedReportOpen, setProcessedReportOpen] = useState(false);
  const handlePrintReport = () => {
    const tabHasData =
      (["Tax Free", "First and One Off Payments", "Maturities", "FirstPayments MCP"].includes(activeTab) && showData) ||
      (activeTab === "Processed" && showProcessed) ||
      (activeTab === "Processed MCP" && showProcessedMcp) ||
      (activeTab === "Monthly Differences" && showMonthlyDiff);
    if (!tabHasData) {
      setNoDataMessage("No Data found");
      setNoDataOpen(true);
      return;
    }
    if (!["Tax Free", "First and One Off Payments", "Maturities", "FirstPayments MCP"].includes(activeTab)) {
      setNoDataMessage("No Data found");
      setNoDataOpen(true);
      return;
    }
    setReportPrintWarningOpen(true);
  };
  const openReportPrintModal = () => { setReportPrintWarningOpen(false); setReportPrintOpen(true); };
  const reportConfig = (() => {
    const fmtNum = (n: number) => n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const dateRange = `${formatDateLong(completionStart)} to ${formatDateLong(completionEnd)}`;
    if (activeTab === "Tax Free") {
      return {
        title: "Tax Free Report",
        dateRange,
        columns: reportTaxFreeColumns,
        rows: TAX_FREE_PAYMENTS as Record<string, string | number>[],
        totals: [
          { columnKey: "amount", label: "Total Tax Free Cash", value: fmtNum(TAX_FREE_TOTALS.totalTaxFreeCash) },
        ] as ReportTotal[],
        recordsLabel: "Tax Free Records Count",
        recordsCount: TAX_FREE_TOTALS.count,
      };
    }
    if (activeTab === "First and One Off Payments") {
      return {
        title: "First Payment Report",
        dateRange,
        columns: reportPaymentColumns,
        rows: FIRST_PAYMENTS as Record<string, string | number>[],
        totals: [
          { columnKey: "amount", label: "Total", value: fmtNum(FIRST_PAYMENTS_TOTALS.totalFirstPayments) },
          { columnKey: "tax", label: "Tax", value: fmtNum(FIRST_PAYMENTS_TOTALS.totalTax) },
        ] as ReportTotal[],
        recordsLabel: "First Payment Records Count",
        recordsCount: FIRST_PAYMENTS_TOTALS.count,
      };
    }
    if (activeTab === "Maturities") {
      return {
        title: "Maturity Payment Report",
        dateRange,
        columns: reportMaturityColumns,
        rows: MATURITY_PAYMENTS as Record<string, string | number>[],
        totals: [
          { columnKey: "amount", label: "Total", value: fmtNum(MATURITY_TOTALS.totalMaturityPayments) },
        ] as ReportTotal[],
        recordsLabel: "Maturity Records Count",
        recordsCount: MATURITY_TOTALS.count,
      };
    }
    return {
      title: "First Payments MCP Report",
      dateRange,
      columns: reportPaymentColumns,
      rows: FIRST_PAYMENTS_MCP as Record<string, string | number>[],
      totals: [
        { columnKey: "amount", label: "Total", value: fmtNum(FIRST_PAYMENTS_MCP_TOTALS.totalFirstPayments) },
      ] as ReportTotal[],
      recordsLabel: "First Payments MCP Records Count",
      recordsCount: FIRST_PAYMENTS_MCP_TOTALS.count,
    };
  })();
  const [showProcessed, setShowProcessed] = useState(false);
  const [processedWarningOpen, setProcessedWarningOpen] = useState(false);
  const handleShowProcessed = () => setProcessedWarningOpen(true);
  const handleProcessedYes = () => { setProcessedWarningOpen(false); setShowProcessed(true); };
  const [showProcessedMcp, setShowProcessedMcp] = useState(false);
  const [processedMcpWarningOpen, setProcessedMcpWarningOpen] = useState(false);
  const handleShowProcessedMcp = () => setProcessedMcpWarningOpen(true);
  const handleProcessedMcpYes = () => { setProcessedMcpWarningOpen(false); setShowProcessedMcp(true); };
  const handleProcessedNo = () => { setProcessedWarningOpen(false); setShowProcessed(true); };
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
      <WarningDialog
        open={processedWarningOpen}
        message="Some of the payments have already been committed. Would you like to exclude these payments?"
        onYes={handleProcessedYes}
        onNo={handleProcessedNo}
      />
      <WarningDialog
        open={processedMcpWarningOpen}
        message="Some of the payments have already been committed. Would you like to exclude these payments?"
        onYes={handleProcessedMcpYes}
        onNo={handleProcessedMcpYes}
      />
      <FirstPaymentReportModal
        open={firstReportOpen}
        onClose={() => setFirstReportOpen(false)}
        dateRange={`${reportsStartRun} to ${reportsEndRun}`}
      />
      <ProcessedReportModal
        open={processedReportOpen}
        onClose={() => setProcessedReportOpen(false)}
        dateRange={`${reportsStartRun} to ${reportsEndRun}`}
      />
      <InfoDialog
        open={noDataOpen}
        title="DoBacs"
        message={noDataMessage}
        onOk={() => setNoDataOpen(false)}
      />
      <WarningDialog
        open={reportPrintWarningOpen}
        message="Some of the payments have already been committed. Would you like to exclude these payments?"
        onYes={openReportPrintModal}
        onNo={openReportPrintModal}
      />
      <ReportPrintModal
        open={reportPrintOpen}
        onClose={() => setReportPrintOpen(false)}
        title={reportConfig.title}
        dateRange={reportConfig.dateRange}
        columns={reportConfig.columns}
        rows={reportConfig.rows}
        totals={reportConfig.totals}
        recordsLabel={reportConfig.recordsLabel}
        recordsCount={reportConfig.recordsCount}
      />
      <PrintPreviewModal
        open={printPreviewOpen}
        onClose={() => setPrintPreviewOpen(false)}
        title="MAP Difference List"
        reportDate="21/04/2026"
        rows={MONTHLY_DIFF_PRINT_ROWS}
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
              <ActionButton label="Print Report" variant="secondary" onClick={handlePrintReport} />
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
                  <DataGrid columns={taxFreeColumns} data={showData ? TAX_FREE_PAYMENTS : []} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(TAX_FREE_TOTALS.count) : ""} />
                  <ReadOnlyInput label="Total Tax Free Cash" width="w-[200px]" value={showData ? fmt(TAX_FREE_TOTALS.totalTaxFreeCash) : ""} />
                  <div className="ml-auto">
                    <ActionButton label="Save To Bacs" icon variant="primary" />
                  </div>
                </div>
              </Tabs.Content>

              {/* First and One Off Payments Tab */}
              <Tabs.Content value="First and One Off Payments">
                <div className="min-h-[350px]">
                  <DataGrid columns={paymentColumns} data={showData ? FIRST_PAYMENTS : []} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(FIRST_PAYMENTS_TOTALS.count) : ""} />
                  <ReadOnlyInput label="Total First Payments" width="w-[180px]" value={showData ? fmt(FIRST_PAYMENTS_TOTALS.totalFirstPayments) : ""} />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" value={showData ? fmt(FIRST_PAYMENTS_TOTALS.totalTax) : ""} />
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
                      <ActionButton label="Show Payments" variant="secondary" onClick={handleShowProcessed} />
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
                  <DataGrid columns={paymentColumns} data={showProcessed ? PROCESSED_PAYMENTS : []} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showProcessed ? String(PROCESSED_TOTALS.count) : ""} />
                  <ReadOnlyInput label="Total Net" width="w-[160px]" value={showProcessed ? fmt(PROCESSED_TOTALS.totalNet) : ""} />
                  <ReadOnlyInput label="Total Gross" width="w-[180px]" value={showProcessed ? fmt(PROCESSED_TOTALS.totalGross) : ""} />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" value={showProcessed ? fmt(PROCESSED_TOTALS.totalTax) : ""} />
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
                      <ActionButton label="Produce List" variant="secondary" onClick={() => { setShowMonthlyDiff(true); setShowNilIncome(false); }} />
                      <ActionButton label="Produce Nil-Income List" variant="secondary" onClick={() => { setShowNilIncome(true); setShowMonthlyDiff(false); setNoDataMessage("No Data found"); setNoDataOpen(true); }} />
                      <ActionButton label="Print Preview" variant="secondary" onClick={() => {
                        if (showMonthlyDiff && MONTHLY_DIFFERENCES.length > 0) {
                          setPrintPreviewOpen(true);
                        } else {
                          setNoDataMessage("No data to print");
                          setNoDataOpen(true);
                        }
                      }} />
                    </div>
                  </div>
                </div>
                <div className="min-h-[350px]">
                  {showNilIncome ? (
                    <DataGrid columns={nilIncomeColumns} data={[]} />
                  ) : (
                    <DataGrid columns={monthlyDiffColumns} data={showMonthlyDiff ? MONTHLY_DIFFERENCES : []} />
                  )}
                </div>
              </Tabs.Content>

              {/* Maturities Tab */}
              <Tabs.Content value="Maturities">
                <div className="min-h-[350px]">
                  <DataGrid columns={maturityColumns} data={showData ? MATURITY_PAYMENTS : []} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(MATURITY_TOTALS.count) : ""} />
                  <ReadOnlyInput label="Total Maturity Payments" width="w-[200px]" value={showData ? fmt(MATURITY_TOTALS.totalMaturityPayments) : ""} />
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
                      <ActionButton label="Print First" variant="secondary" onClick={() => setFirstReportOpen(true)} />
                      <ActionButton label="Print Processed" variant="secondary" onClick={() => setProcessedReportOpen(true)} />
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
              </Tabs.Content>

              {/* FirstPayments MCP Tab */}
              <Tabs.Content value="FirstPayments MCP">
                <div className="min-h-[350px]">
                  <DataGrid columns={paymentColumns} data={showData ? FIRST_PAYMENTS_MCP : []} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showData ? String(FIRST_PAYMENTS_MCP_TOTALS.count) : ""} />
                  <ReadOnlyInput label="Total First Payments" width="w-[180px]" value={showData ? fmt(FIRST_PAYMENTS_MCP_TOTALS.totalFirstPayments) : ""} />
                  <ReadOnlyInput label="Total Tax" width="w-[120px]" value={showData ? fmt(FIRST_PAYMENTS_MCP_TOTALS.totalTax) : ""} />
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
                    <DateInput label="Start Run Month" value={mcpStartRunMonth} onChange={setMcpStartRunMonth} />
                    <DateInput label="End Run Month" value={mcpEndRunMonth} onChange={setMcpEndRunMonth} />
                    <div className="ml-auto flex items-center gap-3">
                      <ActionButton label="Show Payments" variant="secondary" onClick={handleShowProcessedMcp} />
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
                  <DataGrid columns={paymentColumns} data={showProcessedMcp ? PROCESSED_MCP_PAYMENTS : []} />
                </div>
                <div className="flex items-center gap-6 mt-5 flex-wrap">
                  <ReadOnlyInput label="Payments" value={showProcessedMcp ? String(PROCESSED_MCP_TOTALS.count) : ""} />
                  <ReadOnlyInput label="Total Tax Free Cash" width="w-[200px]" value={showProcessedMcp ? fmt(PROCESSED_MCP_TOTALS.totalTaxFreeCash) : ""} />
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
