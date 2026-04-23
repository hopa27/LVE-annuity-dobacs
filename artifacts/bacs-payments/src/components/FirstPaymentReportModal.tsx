import { useState, useEffect } from "react";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdChevronLeft,
  MdChevronRight,
  MdPrint,
  MdSave,
  MdClose,
  MdInsertDriveFile,
  MdZoomIn,
  MdFitScreen,
  MdFolderOpen,
  MdLocalPrintshop,
} from "react-icons/md";

interface FirstPaymentReportModalProps {
  open: boolean;
  onClose: () => void;
  dateRange: string;
}

interface Row {
  sortCode: string;
  accountNo: string;
  zero: string;
  accountName: string;
  bankRef: string;
  nineNine: string;
  grossAnn: string;
  amountToPay: string;
  tax: string;
  policyRef: string;
}

const ROWS: Row[] = [
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testatcchcba", bankRef: "SCC8308", nineNine: "99", grossAnn: "548", amountToPay: "548.00", tax: "0.00", policyRef: "1017452" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Teststclgfa", bankRef: "02759", nineNine: "99", grossAnn: "1620.08", amountToPay: "1620.08", tax: "0.00", policyRef: "1018892" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testspcciied", bankRef: "D120978", nineNine: "99", grossAnn: "1083.32", amountToPay: "1083.32", tax: "0.00", policyRef: "1019085" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testjycciiei", bankRef: "JHPT/982", nineNine: "99", grossAnn: "1632.41", amountToPay: "1632.41", tax: "0.00", policyRef: "1019090" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testatccjbgg", bankRef: "SCC8607", nineNine: "99", grossAnn: "1966.08", amountToPay: "1966.08", tax: "0.00", policyRef: "1019408" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testatccjccb", bankRef: "SCC4432", nineNine: "99", grossAnn: "3188.33", amountToPay: "3188.33", tax: "0.00", policyRef: "1019463" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testseccjccc", bankRef: "736301", nineNine: "99", grossAnn: "500", amountToPay: "500.00", tax: "0.00", policyRef: "1019696" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testalccjefe", bankRef: "SCC6345", nineNine: "99", grossAnn: "1161.08", amountToPay: "1161.08", tax: "0.00", policyRef: "1019746" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testskccjfag", bankRef: "S-4590", nineNine: "99", grossAnn: "1666.66", amountToPay: "1666.66", tax: "0.00", policyRef: "1019748" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testskccjfag", bankRef: "S-4590", nineNine: "99", grossAnn: "1666.66", amountToPay: "1666.66", tax: "0.00", policyRef: "1019748" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testalccjfja", bankRef: "SCC4440", nineNine: "99", grossAnn: "833.33", amountToPay: "833.33", tax: "0.00", policyRef: "1019832" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testsecdaaei", bankRef: "D145204", nineNine: "99", grossAnn: "1000", amountToPay: "1000.00", tax: "0.00", policyRef: "1020290" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testatcdaccf", bankRef: "SCC4397", nineNine: "99", grossAnn: "2500", amountToPay: "2500.00", tax: "0.00", policyRef: "1020467" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testjncdadlg", bankRef: "JHPT/998", nineNine: "99", grossAnn: "537.08", amountToPay: "537.08", tax: "0.00", policyRef: "1020628" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testipcdaef", bankRef: "3634", nineNine: "99", grossAnn: "1061.83", amountToPay: "1061.83", tax: "0.00", policyRef: "1020701" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmpcdagbc", bankRef: "17177 S", nineNine: "99", grossAnn: "9378.25", amountToPay: "9378.25", tax: "0.00", policyRef: "1020854" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testspcdaidb", bankRef: "D154675", nineNine: "99", grossAnn: "3333.33", amountToPay: "3333.33", tax: "0.00", policyRef: "1021073" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testspcdaihf", bankRef: "D161113", nineNine: "99", grossAnn: "3377.91", amountToPay: "3377.91", tax: "0.00", policyRef: "1021117" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testancdajhd", bankRef: "SCC9747", nineNine: "99", grossAnn: "416.66", amountToPay: "416.66", tax: "0.00", policyRef: "1021215" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testspcdbafb", bankRef: "D116484", nineNine: "99", grossAnn: "583.33", amountToPay: "583.33", tax: "0.00", policyRef: "1021293" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testspcdbbaj", bankRef: "D116492", nineNine: "99", grossAnn: "2166.66", amountToPay: "2166.66", tax: "0.00", policyRef: "1021351" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testspcdbbaj", bankRef: "D116492", nineNine: "99", grossAnn: "2166.66", amountToPay: "2166.66", tax: "0.00", policyRef: "1021351" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccfbdb", bankRef: "225131", nineNine: "99", grossAnn: "860.75", amountToPay: "860.75", tax: "0.00", policyRef: "1015373" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccfdbf", bankRef: "225315", nineNine: "99", grossAnn: "1047.5", amountToPay: "1047.50", tax: "0.00", policyRef: "1015557" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccfebd", bankRef: "225413", nineNine: "99", grossAnn: "608.58", amountToPay: "608.58", tax: "0.00", policyRef: "1015655" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccfedf", bankRef: "225435", nineNine: "99", grossAnn: "397.25", amountToPay: "397.25", tax: "0.00", policyRef: "1015674" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmdccgdhg", bankRef: "226376", nineNine: "99", grossAnn: "356.41", amountToPay: "356.41", tax: "0.00", policyRef: "1016618" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmdccgeed", bankRef: "226443", nineNine: "99", grossAnn: "2690", amountToPay: "2361.80", tax: "-328.20", policyRef: "1016685" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testjsccgfbh", bankRef: "226517", nineNine: "99", grossAnn: "2083.33", amountToPay: "1876.33", tax: "-207.00", policyRef: "1016759" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmyccgfch", bankRef: "226527", nineNine: "99", grossAnn: "833.33", amountToPay: "833.33", tax: "0.00", policyRef: "1016769" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccggbb", bankRef: "226611", nineNine: "99", grossAnn: "602.16", amountToPay: "602.16", tax: "0.00", policyRef: "1016853" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmsccghfb", bankRef: "226751", nineNine: "99", grossAnn: "6000", amountToPay: "4647.94", tax: "-1352.06", policyRef: "1016993" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testysccghih", bankRef: "226787", nineNine: "99", grossAnn: "1666.66", amountToPay: "1543.06", tax: "-123.60", policyRef: "1017029" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testjnccgiaj", bankRef: "226809", nineNine: "99", grossAnn: "24702", amountToPay: "15207.90", tax: "-9494.10", policyRef: "1017051" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccgicf", bankRef: "226825", nineNine: "99", grossAnn: "1214.16", amountToPay: "1181.16", tax: "-33.00", policyRef: "1017067" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmdccgiii", bankRef: "226888", nineNine: "99", grossAnn: "1406.58", amountToPay: "1334.98", tax: "-71.60", policyRef: "1017130" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testddccgjai", bankRef: "42093041", nineNine: "99", grossAnn: "600", amountToPay: "600.00", tax: "0.00", policyRef: "1017150" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testbsccgjaj", bankRef: "226909", nineNine: "99", grossAnn: "1023.5", amountToPay: "1023.50", tax: "0.00", policyRef: "1017151" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmsccgjcg", bankRef: "226926", nineNine: "99", grossAnn: "400", amountToPay: "342.20", tax: "-57.80", policyRef: "1017168" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmtccgjig", bankRef: "226986", nineNine: "99", grossAnn: "635.41", amountToPay: "635.41", tax: "0.00", policyRef: "1017228" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmrcchaaj", bankRef: "227009", nineNine: "99", grossAnn: "500", amountToPay: "500.00", tax: "0.00", policyRef: "1017251" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmcchabd", bankRef: "227013", nineNine: "99", grossAnn: "677.16", amountToPay: "677.16", tax: "0.00", policyRef: "1017255" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmcchabd", bankRef: "227013", nineNine: "99", grossAnn: "338.58", amountToPay: "338.58", tax: "0.00", policyRef: "1017255" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testbdcchabe", bankRef: "227014", nineNine: "99", grossAnn: "833.33", amountToPay: "833.33", tax: "0.00", policyRef: "1017256" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testgtcchacg", bankRef: "227026", nineNine: "99", grossAnn: "18586", amountToPay: "17384.80", tax: "-1201.20", policyRef: "1017268" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchadi", bankRef: "227038", nineNine: "99", grossAnn: "779.58", amountToPay: "779.58", tax: "0.00", policyRef: "1017280" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmecchadj", bankRef: "227039", nineNine: "99", grossAnn: "375", amountToPay: "375.00", tax: "0.00", policyRef: "1017281" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testircchaea", bankRef: "227040", nineNine: "99", grossAnn: "541.66", amountToPay: "526.46", tax: "-15.20", policyRef: "1017282" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmecchaej", bankRef: "227049", nineNine: "99", grossAnn: "250", amountToPay: "250.00", tax: "0.00", policyRef: "1017291" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testdtcchagi", bankRef: "227069", nineNine: "99", grossAnn: "690.33", amountToPay: "690.33", tax: "0.00", policyRef: "1017311" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testircchahe", bankRef: "227074", nineNine: "99", grossAnn: "787", amountToPay: "787.00", tax: "0.00", policyRef: "1017316" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchbag", bankRef: "227106", nineNine: "99", grossAnn: "111.16", amountToPay: "111.16", tax: "0.00", policyRef: "1017348" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchbbe", bankRef: "227114", nineNine: "99", grossAnn: "200", amountToPay: "200.00", tax: "0.00", policyRef: "1017356" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnchccj", bankRef: "227229", nineNine: "99", grossAnn: "416.66", amountToPay: "416.66", tax: "0.00", policyRef: "1017471" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testpscchcch", bankRef: "227247", nineNine: "99", grossAnn: "1916.66", amountToPay: "1743.06", tax: "-173.60", policyRef: "1017489" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testpscchcei", bankRef: "227248", nineNine: "99", grossAnn: "250", amountToPay: "250.00", tax: "0.00", policyRef: "1017490" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testcyccchcha", bankRef: "227270", nineNine: "99", grossAnn: "1372.91", amountToPay: "1308.11", tax: "-64.80", policyRef: "1017512" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testgecchcjd", bankRef: "227293", nineNine: "99", grossAnn: "1250", amountToPay: "1209.80", tax: "-40.20", policyRef: "1017535" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmlcchdbb", bankRef: "227311", nineNine: "99", grossAnn: "1666.66", amountToPay: "1543.06", tax: "-123.60", policyRef: "1017553" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchdbd", bankRef: "227313", nineNine: "99", grossAnn: "2500", amountToPay: "2209.80", tax: "-290.20", policyRef: "1017555" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmpcchdbi", bankRef: "227318", nineNine: "99", grossAnn: "700", amountToPay: "566.16", tax: "-133.84", policyRef: "1017560" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testdnchdgh", bankRef: "227367", nineNine: "99", grossAnn: "333.33", amountToPay: "333.33", tax: "0.00", policyRef: "1017609" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testitcchdii", bankRef: "227388", nineNine: "99", grossAnn: "2500", amountToPay: "1998.80", tax: "-501.20", policyRef: "1017630" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testitcchdii", bankRef: "227388", nineNine: "99", grossAnn: "130", amountToPay: "102.80", tax: "-27.20", policyRef: "1017630" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchdj", bankRef: "227389", nineNine: "99", grossAnn: "849.83", amountToPay: "849.83", tax: "0.00", policyRef: "1017631" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testdhcchdje", bankRef: "227394", nineNine: "99", grossAnn: "679.58", amountToPay: "679.58", tax: "0.00", policyRef: "1017636" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testiscchean", bankRef: "227407", nineNine: "99", grossAnn: "750", amountToPay: "750.00", tax: "0.00", policyRef: "1017649" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmpccheaj", bankRef: "227409", nineNine: "99", grossAnn: "951.16", amountToPay: "760.96", tax: "-190.20", policyRef: "1017651" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testascchecc", bankRef: "227422", nineNine: "99", grossAnn: "1000", amountToPay: "1000.00", tax: "0.00", policyRef: "1017664" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccheeh", bankRef: "227447", nineNine: "99", grossAnn: "608.33", amountToPay: "608.33", tax: "0.00", policyRef: "1017689" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testgecchefe", bankRef: "227454", nineNine: "99", grossAnn: "1000", amountToPay: "1000.00", tax: "0.00", policyRef: "1017696" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmxcchegg", bankRef: "227466", nineNine: "99", grossAnn: "1360", amountToPay: "1297.80", tax: "-62.20", policyRef: "1017708" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnchhegh", bankRef: "227467", nineNine: "99", grossAnn: "416.66", amountToPay: "416.66", tax: "0.00", policyRef: "1017709" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmtcchegi", bankRef: "227468", nineNine: "99", grossAnn: "54.91", amountToPay: "54.91", tax: "0.00", policyRef: "1017710" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmycchehc", bankRef: "227472", nineNine: "99", grossAnn: "2000", amountToPay: "1809.80", tax: "-190.20", policyRef: "1017714" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testpncchehf", bankRef: "227475", nineNine: "99", grossAnn: "2907", amountToPay: "2362.40", tax: "-544.60", policyRef: "1017717" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testpncchehf", bankRef: "227475", nineNine: "99", grossAnn: "250", amountToPay: "236.80", tax: "-13.20", policyRef: "1017717" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testdscccheng", bankRef: "227476", nineNine: "99", grossAnn: "859.58", amountToPay: "859.58", tax: "0.00", policyRef: "1017718" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmcccheia", bankRef: "227482", nineNine: "99", grossAnn: "813.58", amountToPay: "813.58", tax: "0.00", policyRef: "1017722" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmrccheid", bankRef: "227483", nineNine: "99", grossAnn: "12501", amountToPay: "12501.00", tax: "0.00", policyRef: "1017725" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmlcchfdb", bankRef: "227531", nineNine: "99", grossAnn: "607.5", amountToPay: "486.10", tax: "-121.40", policyRef: "1017773" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testjncchffe", bankRef: "227554", nineNine: "99", grossAnn: "683", amountToPay: "411.60", tax: "-271.40", policyRef: "1017796" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmycchfhj", bankRef: "227579", nineNine: "99", grossAnn: "12570", amountToPay: "12570.00", tax: "0.00", policyRef: "1017821" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testjycchfle", bankRef: "227584", nineNine: "99", grossAnn: "250", amountToPay: "250.00", tax: "0.00", policyRef: "1017826" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Teststcchffif", bankRef: "227585", nineNine: "99", grossAnn: "558.66", amountToPay: "558.66", tax: "0.00", policyRef: "1017827" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchffi", bankRef: "227588", nineNine: "99", grossAnn: "668", amountToPay: "668.00", tax: "0.00", policyRef: "1017830" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testbrcchgbg", bankRef: "227616", nineNine: "99", grossAnn: "516.66", amountToPay: "516.66", tax: "0.00", policyRef: "1017858" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchgeb", bankRef: "227641", nineNine: "99", grossAnn: "1275", amountToPay: "1229.80", tax: "-45.20", policyRef: "1017883" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testrecchgeg", bankRef: "227646", nineNine: "99", grossAnn: "416.66", amountToPay: "416.66", tax: "0.00", policyRef: "1017888" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchgfh", bankRef: "227657", nineNine: "99", grossAnn: "358.33", amountToPay: "286.73", tax: "-71.60", policyRef: "1017899" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testcscchggi", bankRef: "227668", nineNine: "99", grossAnn: "200", amountToPay: "200.00", tax: "0.00", policyRef: "1017910" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmecchgia", bankRef: "227690", nineNine: "99", grossAnn: "1820", amountToPay: "1441.20", tax: "-378.80", policyRef: "1017932" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmecchgib", bankRef: "227691", nineNine: "99", grossAnn: "626.75", amountToPay: "626.75", tax: "0.00", policyRef: "1017933" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchgic", bankRef: "227692", nineNine: "99", grossAnn: "1221.5", amountToPay: "1186.90", tax: "-34.60", policyRef: "1017934" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchgif", bankRef: "227695", nineNine: "99", grossAnn: "833.33", amountToPay: "833.33", tax: "0.00", policyRef: "1017937" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testshcchhfd", bankRef: "227753", nineNine: "99", grossAnn: "500", amountToPay: "500.00", tax: "0.00", policyRef: "1017995" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testsycchhga", bankRef: "227764", nineNine: "99", grossAnn: "1033.83", amountToPay: "1033.83", tax: "0.00", policyRef: "1018002" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmtcchhgg", bankRef: "227766", nineNine: "99", grossAnn: "250", amountToPay: "250.00", tax: "0.00", policyRef: "1018008" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchhgh", bankRef: "227767", nineNine: "99", grossAnn: "15482", amountToPay: "10136.90", tax: "-5345.10", policyRef: "1018009" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchhj", bankRef: "227769", nineNine: "99", grossAnn: "2333.33", amountToPay: "2076.33", tax: "-257.00", policyRef: "1018011" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmdcchhig", bankRef: "227786", nineNine: "99", grossAnn: "1285.75", amountToPay: "1238.35", tax: "-47.40", policyRef: "1018028" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmdcchhje", bankRef: "227794", nineNine: "99", grossAnn: "400", amountToPay: "400.00", tax: "0.00", policyRef: "1018036" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmecchhjf", bankRef: "227795", nineNine: "99", grossAnn: "200", amountToPay: "200.00", tax: "0.00", policyRef: "1018037" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmrccchhjh", bankRef: "227797", nineNine: "99", grossAnn: "905.66", amountToPay: "905.66", tax: "0.00", policyRef: "1018039" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testincchiaa", bankRef: "227800", nineNine: "99", grossAnn: "611.25", amountToPay: "611.25", tax: "0.00", policyRef: "1018042" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchiac", bankRef: "227802", nineNine: "99", grossAnn: "420.82", amountToPay: "420.82", tax: "0.00", policyRef: "1018044" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testcecchibc", bankRef: "227816", nineNine: "99", grossAnn: "500", amountToPay: "410.20", tax: "-89.80", policyRef: "1018058" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmecchiig", bankRef: "227886", nineNine: "99", grossAnn: "512.5", amountToPay: "512.50", tax: "0.00", policyRef: "1018128" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testrycchiih", bankRef: "227887", nineNine: "99", grossAnn: "250", amountToPay: "250.00", tax: "0.00", policyRef: "1018129" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testjsccchiii", bankRef: "227888", nineNine: "99", grossAnn: "208.33", amountToPay: "208.33", tax: "0.00", policyRef: "1018130" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchiij", bankRef: "227889", nineNine: "99", grossAnn: "500", amountToPay: "500.00", tax: "0.00", policyRef: "1018131" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmrccchjaj", bankRef: "227909", nineNine: "99", grossAnn: "867.08", amountToPay: "867.08", tax: "0.00", policyRef: "1018151" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmlcchjdd", bankRef: "227933", nineNine: "99", grossAnn: "1224.66", amountToPay: "1189.46", tax: "-35.20", policyRef: "1018175" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchjdi", bankRef: "227950", nineNine: "99", grossAnn: "1681", amountToPay: "1554.60", tax: "-126.40", policyRef: "1018180" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscchjfa", bankRef: "227950", nineNine: "99", grossAnn: "2500", amountToPay: "2209.80", tax: "-290.20", policyRef: "1018192" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testgnccchjfc", bankRef: "227952", nineNine: "99", grossAnn: "748.33", amountToPay: "748.33", tax: "0.00", policyRef: "1018194" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testpncchjff", bankRef: "227955", nineNine: "99", grossAnn: "3257", amountToPay: "2815.40", tax: "-441.60", policyRef: "1018197" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmtcchjfh", bankRef: "227957", nineNine: "99", grossAnn: "350", amountToPay: "350.00", tax: "0.00", policyRef: "1018199" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchjjga", bankRef: "227962", nineNine: "99", grossAnn: "1280.08", amountToPay: "1233.88", tax: "-46.20", policyRef: "1018202" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testaecchjgc", bankRef: "227962", nineNine: "99", grossAnn: "880.16", amountToPay: "880.16", tax: "0.00", policyRef: "1018204" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmlcchjgd", bankRef: "227963", nineNine: "99", grossAnn: "306.91", amountToPay: "306.91", tax: "0.00", policyRef: "1018205" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmrcchjgg", bankRef: "227966", nineNine: "99", grossAnn: "603.58", amountToPay: "603.58", tax: "0.00", policyRef: "1018208" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccchjhe", bankRef: "227969", nineNine: "99", grossAnn: "174.25", amountToPay: "174.25", tax: "0.00", policyRef: "1018216" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmlcchjia", bankRef: "227980", nineNine: "99", grossAnn: "866", amountToPay: "866.00", tax: "0.00", policyRef: "1018222" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmlcchjic", bankRef: "227982", nineNine: "99", grossAnn: "831.58", amountToPay: "831.58", tax: "0.00", policyRef: "1018224" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testciccchjih", bankRef: "227987", nineNine: "99", grossAnn: "250", amountToPay: "186.80", tax: "-63.20", policyRef: "1018228" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testcycchjii", bankRef: "227988", nineNine: "99", grossAnn: "102.5", amountToPay: "102.50", tax: "0.00", policyRef: "1018230" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testrcciaab", bankRef: "228001", nineNine: "99", grossAnn: "895.25", amountToPay: "895.25", tax: "0.00", policyRef: "1018243" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmtcciaac", bankRef: "228002", nineNine: "99", grossAnn: "20000", amountToPay: "16000.00", tax: "-4000.00", policyRef: "1018244" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscciaad", bankRef: "228003", nineNine: "99", grossAnn: "682.58", amountToPay: "682.58", tax: "0.00", policyRef: "1018245" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmscciaah", bankRef: "228007", nineNine: "99", grossAnn: "373", amountToPay: "373.00", tax: "0.00", policyRef: "1018249" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmycciacj", bankRef: "228029", nineNine: "99", grossAnn: "239.41", amountToPay: "191.61", tax: "-47.80", policyRef: "1018271" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testptcciaea", bankRef: "228040", nineNine: "99", grossAnn: "1326.32", amountToPay: "1270.72", tax: "-55.60", policyRef: "1018282" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testmnccciaec", bankRef: "228042", nineNine: "99", grossAnn: "261.5", amountToPay: "249.70", tax: "-11.80", policyRef: "1018284" },
  { sortCode: "77-48-14", accountNo: "24782346", zero: "0", accountName: "Testnycdcadd", bankRef: "INVENC2", nineNine: "99", grossAnn: "625", amountToPay: "625.00", tax: "0.00", policyRef: "1022275" },
];

const TOTAL_COUNT = 735;
const TOTAL_GROSS = "1545474.00";
const TOTAL_AMOUNT = "1265797.77";
const TOTAL_TAX = "-279676.23";

const TOTAL_PAGES = 22;
const LAST_PAGE = TOTAL_PAGES;
const DATA_ROWS = ROWS.slice(0, ROWS.length - 1);
const LAST_PAGE_ROW = ROWS[ROWS.length - 1];
const ROWS_PER_PAGE = Math.ceil(DATA_ROWS.length / 5);
const DATA_PAGES = [1, 2, 3, 4, 5];
const NAV_SEQUENCE = [...DATA_PAGES, LAST_PAGE];

export default function FirstPaymentReportModal({ open, onClose, dateRange }: FirstPaymentReportModalProps) {
  const [page, setPage] = useState(1);
  useEffect(() => { if (open) setPage(1); }, [open]);
  if (!open) return null;

  const navIdx = NAV_SEQUENCE.indexOf(page);
  const isFirst = navIdx <= 0;
  const isLast = navIdx === NAV_SEQUENCE.length - 1;
  const goPrev = () => { if (!isFirst) setPage(NAV_SEQUENCE[navIdx - 1]); };
  const goNext = () => { if (!isLast) setPage(NAV_SEQUENCE[navIdx + 1]); };
  const goFirst = () => setPage(NAV_SEQUENCE[0]);
  const goLast = () => setPage(LAST_PAGE);

  const isLastPage = page === LAST_PAGE;
  const pageRows: Row[] = isLastPage
    ? [LAST_PAGE_ROW]
    : DATA_ROWS.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const showBacsHeader = page === 1;

  const toolbarBtn =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#04589b] border border-[#04589b] font-bold hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors cursor-pointer";
  const toolbarBtnDisabled =
    "h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#979797] border border-[#979797] cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#BBBBBB] w-[1200px] max-h-[92vh] overflow-hidden flex flex-col">
        <div className="bg-[#00263e] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-['Livvic'] text-base font-semibold">Print Report</span>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          >
            <MdClose className="text-lg" />
          </button>
        </div>

        <div className="bg-white border-b border-[#BBBBBB] px-5 py-3 flex items-center gap-2 flex-wrap">
          <button title="Single page" className={toolbarBtn}><MdInsertDriveFile className="text-xl" /></button>
          <button title="100% Zoom" className={toolbarBtn}><MdZoomIn className="text-xl" /></button>
          <button title="Zoom to Width" className={toolbarBtn}><MdFitScreen className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="First page" onClick={goFirst} disabled={isFirst} className={isFirst ? toolbarBtnDisabled : toolbarBtn}><MdSkipPrevious className="text-xl" /></button>
          <button title="Previous page" onClick={goPrev} disabled={isFirst} className={isFirst ? toolbarBtnDisabled : toolbarBtn}><MdChevronLeft className="text-xl" /></button>
          <span className="font-['Mulish'] text-sm text-[#3d3d3d] px-2">{page} of {TOTAL_PAGES}</span>
          <button title="Next page" onClick={goNext} disabled={isLast} className={isLast ? toolbarBtnDisabled : toolbarBtn}><MdChevronRight className="text-xl" /></button>
          <button title="Last page" onClick={goLast} disabled={isLast} className={isLast ? toolbarBtnDisabled : toolbarBtn}><MdSkipNext className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Print" className={toolbarBtn}><MdPrint className="text-xl" /></button>
          <button title="Quick print" className={toolbarBtn}><MdLocalPrintshop className="text-xl" /></button>
          <div className="w-px h-6 bg-[#BBBBBB] mx-2" />
          <button title="Save" className={toolbarBtn}><MdSave className="text-xl" /></button>
          <button title="Open" className={toolbarBtn}><MdFolderOpen className="text-xl" /></button>
        </div>

        <div className="flex-1 overflow-auto bg-[#f0f0f0] p-6">
          <div className="bg-white shadow-md mx-auto rounded-[8px] border border-[#BBBBBB] px-12 py-10" style={{ width: "1080px" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Livvic'] text-2xl font-bold text-[#002f5c]">
                First Payments Report : <span className="font-normal text-[#3d3d3d]">{dateRange}</span>
              </h2>
              <span className="font-['Mulish'] text-xs text-[#3d3d3d]">Page {page} of {TOTAL_PAGES}</span>
            </div>

            <table className="w-full border-separate border-spacing-0 font-['Mulish'] text-[12px] text-[#3d3d3d]">
              <thead>
                <tr>
                  {["Plan Type", "Count", "Bank Sort Code", "Bank Account No", "0", "Bank Account Name", "Bank Ref", "99", "Gross Ann", "Amount To Pay", "Tax", "Policy Ref"].map((label, i) => (
                    <th
                      key={i}
                      className={`font-['Livvic'] font-semibold text-[#002f5c] py-2 px-2 border-b-[3px] border-t-[3px] border-[#04589b] underline ${["Gross Ann", "Amount To Pay", "Tax"].includes(label) ? "text-right" : "text-left"}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {showBacsHeader && (
                  <tr>
                    <td colSpan={12} className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c]">BACS</td>
                  </tr>
                )}
                {pageRows.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}>
                    <td className="py-1.5 px-2 text-left"></td>
                    <td className="py-1.5 px-2 text-left"></td>
                    <td className="py-1.5 px-2 text-left">{r.sortCode}</td>
                    <td className="py-1.5 px-2 text-left">{r.accountNo}</td>
                    <td className="py-1.5 px-2 text-left">{r.zero}</td>
                    <td className="py-1.5 px-2 text-left">{r.accountName}</td>
                    <td className="py-1.5 px-2 text-left">{r.bankRef}</td>
                    <td className="py-1.5 px-2 text-left">{r.nineNine}</td>
                    <td className="py-1.5 px-2 text-right">{r.grossAnn}</td>
                    <td className="py-1.5 px-2 text-right">{r.amountToPay}</td>
                    <td className="py-1.5 px-2 text-right">{r.tax}</td>
                    <td className="py-1.5 px-2 text-left">{r.policyRef}</td>
                  </tr>
                ))}
                {isLastPage && (
                <tr className="border-t-[2px] border-[#002f5c]">
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left">{TOTAL_COUNT}</td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-right">{TOTAL_GROSS}</td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-right">{TOTAL_AMOUNT}</td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-right">{TOTAL_TAX}</td>
                  <td className="py-2 px-2 font-['Livvic'] font-bold text-[#002f5c] border-t-[2px] border-[#002f5c] text-left"></td>
                </tr>
                )}
              </tbody>
            </table>

            {isLastPage && (
              <div className="mt-12 flex flex-col gap-8 max-w-[420px]">
                <div className="flex items-end gap-3">
                  <span className="font-['Mulish'] text-sm text-[#3d3d3d] whitespace-nowrap">Checked by:</span>
                  <span className="flex-1 border-b border-dotted border-[#3d3d3d] h-5" />
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-['Mulish'] text-sm text-[#3d3d3d] whitespace-nowrap">Authorised by:</span>
                  <span className="flex-1 border-b border-dotted border-[#3d3d3d] h-5" />
                </div>
              </div>
            )}

            <div className="mt-10 text-right font-['Mulish'] text-xs text-[#979797]">
              Page {page} of {TOTAL_PAGES}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
