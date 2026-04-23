export interface QrpReport {
  title: string;
  dateRange?: string;
  columns: { key: string; label: string }[];
  rows: Record<string, unknown>[];
  totals?: Record<string, unknown>;
  recordsLabel?: string;
  recordsCount?: number;
}

function buildQrpContent(report: QrpReport): string {
  const lines: string[] = [];
  lines.push("QRP/1.0");
  lines.push(`TITLE\t${report.title}`);
  if (report.dateRange) lines.push(`RANGE\t${report.dateRange}`);
  if (report.recordsLabel && report.recordsCount !== undefined) {
    lines.push(`${report.recordsLabel.toUpperCase().replace(/\s+/g, "_")}\t${report.recordsCount}`);
  }
  lines.push("COLUMNS\t" + report.columns.map((c) => c.label).join("\t"));
  for (const r of report.rows) {
    lines.push("ROW\t" + report.columns.map((c) => String(r[c.key] ?? "")).join("\t"));
  }
  if (report.totals) {
    for (const [k, v] of Object.entries(report.totals)) {
      lines.push(`TOTAL\t${k}\t${v}`);
    }
  }
  lines.push("END");
  return lines.join("\n");
}

export function downloadQrp(report: QrpReport, fileName: string) {
  const content = buildQrpContent(report);
  const blob = new Blob([content], { type: "application/octet-stream" });
  const name = fileName.toLowerCase().endsWith(".qrp") ? fileName : `${fileName}.qrp`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function saveReportAsQrp(report: QrpReport, suggestedName: string) {
  const content = buildQrpContent(report);
  const blob = new Blob([content], { type: "application/octet-stream" });

  const w = window as unknown as {
    showSaveFilePicker?: (opts: {
      suggestedName?: string;
      types?: { description: string; accept: Record<string, string[]> }[];
    }) => Promise<{ createWritable: () => Promise<{ write: (b: Blob) => Promise<void>; close: () => Promise<void> }> }>;
  };

  if (typeof w.showSaveFilePicker === "function") {
    try {
      const handle = await w.showSaveFilePicker({
        suggestedName,
        types: [{ description: "Quick Report (QRP)", accept: { "application/octet-stream": [".qrp"] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = suggestedName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
