# BACS Payments — Application Digest

```yaml
application:
  name: BACS Payments
  version: 1.0.0
  type: Static web app (no backend) — recreation of legacy Windows desktop tool
  description: >
    Liverpool Victoria Friendly Society Limited internal tool for previewing,
    validating, exporting and committing BACS payment files across 8 payment
    workflows. Built with React + Vite, styled with the LV= design system,
    deployable as a static site.
  stack:
    framework: React 18 + Vite + TypeScript
    styling: Tailwind CSS, fonts Livvic + Mulish
    icons: react-icons (Material Design)
    pdf: jspdf + html2canvas
    routing: single page, tabbed
  fonts:
    heading: Livvic
    body: Mulish
  brand_colors:
    primary_blue: "#04589b"
    deep_blue: "#003578"
    navy: "#00263e"
    accent_blue: "#006cf4"
    title_blue: "#002f5c"
    gray_border: "#BBBBBB"
    text: "#3d3d3d"
    muted: "#979797"
    row_zebra: "#e7ebec34"

global_components:
  header:
    component: BacsHeader
    sticky: false
    background: "#00263e"
    height: 64px
    elements:
      left_section:
        - logo: { src: "LV=", color: white }
        - title:
            text: "BACS Payments for Liverpool Victoria Friendly Society Limited"
            font: Livvic
            color: white
      right_section:
        - logout_button:
            label: Logout
            shape: pill
            variant: outline-on-dark

  global_filters:
    component: GlobalFiltersBar
    visible_on: ALL_TABS
    background: white
    elements:
      - completion_start_date:
          control: DateInput
          format: dd/mm/yyyy
      - completion_end_date:
          control: DateInput
          format: dd/mm/yyyy
      - show_payments_button:
          variant: secondary
          action: open WarningDialog -> populate active tab grid
      - print_report_button:
          variant: secondary
          action: open WarningDialog -> open ReportPrintModal

  tab_bar:
    component: Tabs.Root (radix)
    tabs:
      - Tax Free
      - First and One Off Payments
      - Processed
      - Monthly Differences
      - Maturities
      - Reports
      - FirstPayments MCP
      - Processed MCP

  footer:
    background: white
    border_top: 1px solid #e5e5e5
    elements:
      left: { logo: "LV=" }
      right:
        text: "Liverpool Victoria Friendly Society Limited, County Gates, Bournemouth BH1 2NF"

screens:

  - id: tab_tax_free
    name: Tax Free
    layout: data-grid + bottom-totals + actions
    columns:
      - Bank Sort Code
      - Bank Account No
      - "0"
      - TaxFreeCash
      - Bank Account Name
      - Bank Ref
      - "99"
      - C_DATE
      - Policy No
      - Tax
    totals_bar:
      - Payments (read-only)
      - Total Tax Free Cash (read-only)
    actions:
      - { label: "Save To Bacs", variant: primary, disabled_when: !showData,
          action: open SaveAsDialog (BACS) }

  - id: tab_first_one_off
    name: First and One Off Payments
    columns:
      - Bank Sort Code
      - Bank Account No
      - "0"
      - Amount To Pay
      - Bank Account Name
      - Bank Ref
      - "99"
      - BACS Date
      - Policy No
      - Tax
      - Hash
      - Pay Method
    totals_bar: [Payments, Total First Payments, Total Tax]
    actions:
      - { label: "Save To Bacs", variant: primary, disabled_when: !showData,
          action: open SaveAsDialog (BACS) }
      - { label: "Save And Commit To BACS", variant: primary,
          disabled_when: !showData, action: handleSaveCommitBacs }

  - id: tab_processed
    name: Processed
    tab_filters:
      - start_run_month: { control: DateInput }
      - end_run_month: { control: DateInput }
      - payment_type: { control: Select, options: [All, First, One Off] }
      - include_non_paye: { control: GreenToggle }
      - show_payments_button: { variant: secondary }
      - print_report_button: { variant: secondary }
    columns: <standard 12-column payment grid>
    totals_bar: [Payments, Total Net, Total Gross, Total Tax]
    actions:
      - { label: "Save To Bacs", variant: primary, disabled_when: !showProcessed,
          action: openSaveAs(BACS) }
      - { label: "Save And Commit To BACS", variant: primary,
          disabled_when: !showProcessed, action: handleSaveCommitBacs }
      - { label: "Save To CSV", variant: primary, disabled_when: !showProcessed,
          action: open SaveAsDialog (CSV) directly  # bypasses date check }

  - id: tab_monthly_differences
    name: Monthly Differences
    tab_filters:
      - start_run_month: { control: DateInput }
      - end_run_month: { control: DateInput }
      - produce_list_button: { action: populate grid }
      - produce_nil_income_button: { action: open InfoDialog (no records) }
      - print_preview_button: { action: open PrintPreviewModal }
    columns:
      - Policy No
      - Current Date
      - Current Ref
      - Current Gross
      - Previous Date
      - Previous Ref
      - Previous Gross

  - id: tab_maturities
    name: Maturities
    columns: 9-column maturity grid
    totals_bar: [Payments, Total Maturity Payments]
    actions:
      - { label: "Save and Commit To Bacs", variant: primary }

  - id: tab_reports
    name: Reports
    tab_filters:
      - start_run_month: { control: DateInput }
      - end_run_month: { control: DateInput }
      - include_non_paye: { control: GreenToggle }
    actions:
      - { label: "Print First", action: open FirstPaymentReportModal }
      - { label: "Print Processed", action: open ProcessedReportModal }

  - id: tab_firstpayments_mcp
    name: FirstPayments MCP
    columns: standard 12-column payment grid
    totals_bar: [Payments, Total First Payments, Total Tax]
    actions:
      - { label: "Save To Bacs", action: open SaveAsDialog (BACS) }
      - { label: "Save And Commit To BACS", action: handleSaveCommitBacs }

  - id: tab_processed_mcp
    name: Processed MCP
    tab_filters:
      - start_run_month
      - end_run_month
      - payment_type: [All, First, One Off]
      - include_non_paye
    columns: standard 12-column payment grid
    totals_bar: [Payments, Total Tax Free Cash]
    actions:
      - { label: "Save And Commit To Bacs", action: handleSaveCommitBacs }

modals:

  - id: DateInput
    file: src/components/DateInput.tsx
    trigger: calendar icon in any date field
    views:
      - days:    { layout: "Mon..Sun grid, hatching for out-of-month days" }
      - months:  { layout: "3x4 grid 1..12, switch by clicking month name" }
      - years:   { layout: "5x5 grid range, switch by clicking year" }

  - id: SaveAsDialog
    file: src/components/SaveAsDialog.tsx
    style: Windows 11 File Explorer (Segoe UI Variable, Fluent)
    width: 860px
    triggers:
      - any "Save To Bacs" / "Save To CSV" button
      - 💾 toolbar button in any print modal
    sections:
      title_bar:
        text: "Save As"
        controls: [minimize, maximize, close (red hover)]
      toolbar:
        nav: [Back, Forward (disabled), Up, Refresh]
        breadcrumb: "📁 This PC > Ual3 (H:) > Annuities"
        search: "Search Annuities"
      body:
        left_nav:
          - Home
          - Gallery
          - OneDrive (expanded)
          - This PC group:
              - Desktop
              - Documents
              - Downloads
              - Music
              - Pictures
              - Videos
              - OS (C:)
              - Ual3 (H:)  [active]
          - Network
        file_list:
          columns: [Name, Date modified, Type, Size]
          rows: 14 placeholder folders (Tax Codes, ANB Controls, BACS, ...)
          selection: blue (#cfe4f7) row highlight
      footer:
        - file_name: { input + dropdown chevron }
        - save_as_type:
            QRP:  "QuickReport file (*.QRP)"
            BACS: "BACS file (*.BACS)"
            CSV:  "Comma Separated Values (*.CSV)"
        - hide_folders_toggle
        - actions: [Save (primary blue), Cancel (subtle)]
    on_save: callback(filename) -> caller writes file via blob download

  - id: PrintPreviewModal
    file: src/components/PrintPreviewModal.tsx
    used_by: Monthly Differences -> Print Preview
    width: 1024px
    header: "Print Preview" on navy bar with close
    toolbar:
      - nav: [⏮ ⏪ "1 of 1+" ⏩ ⏭]
      - 🖨 Print -> window.print()
      - 💾 Save -> opens SaveAsDialog (QRP); on save -> downloadQrp(...)
      - zoom: [50%, 75%, 100%, 125%, 150%]
      - status: Total / Zoom / Showing
    body:
      class: print-area  # only this prints via @media print
      content: 11-column compare table (Policy/Ref/Paykey/Current.../Previous.../Type/% Change)
    footer: [Close (outline), Print (primary, window.print)]

  - id: ReportPrintModal
    file: src/components/ReportPrintModal.tsx
    used_by: header Print Report; Tax Free / First Payments / Maturities / MCP reports
    toolbar:
      - zoom_modes: [Fit, Actual, Width]
      - nav: [⏮ ⏪ Page x/N ⏩ ⏭]
      - ⚙ Printer Setup -> PrintDialog
      - 🖨 Print -> window.print()
      - 💾 Save -> SaveAsDialog (QRP) -> downloadQrp(...)
      - 📂 Open
    body:
      class: print-area
      content: report header + table + totals + signature lines
        ("Checked by: ............    Authorised by: ............")
    footer: [Close, Print]

  - id: FirstPaymentReportModal
    file: src/components/FirstPaymentReportModal.tsx
    triggered_by: Reports tab -> Print First
    pages: multi-page paginated, page nav in toolbar
    save_button: -> SaveAsDialog (QRP) -> downloadQrp(First_Payments_Report.qrp)
    print_button: window.print()
    printer_setup: PrintDialog
    columns:
      - Bank Sort Code
      - Bank Account No
      - "0"
      - Bank Account Name
      - Bank Ref
      - "99"
      - Gross Ann
      - Amount To Pay
      - Tax
      - Policy Ref
    totals: [Count, Total Gross, Total Amount, Total Tax]

  - id: ProcessedReportModal
    file: src/components/ProcessedReportModal.tsx
    triggered_by: Reports tab -> Print Processed
    save_button: -> SaveAsDialog (QRP) -> downloadQrp(Payments_Report.qrp)
    print_button: window.print()
    printer_setup: PrintDialog
    totals: [Count, Total Net, Total Gross, Total Tax]

  - id: PrintDialog
    file: src/components/PrintDialog.tsx
    style: Windows 11 Fluent (formerly classic Win95-styled, now restyled)
    sections:
      printer:
        - name: dropdown
        - properties_button
        - status / type / where / comment lines
      print_range:
        - radio: All
        - radio: Pages from [_] to [_]
        - radio: Selection
      copies:
        - number: 1
        - collate: checkbox with page-icon illustrations
    actions: [OK, Cancel]

  - id: InfoDialog
    component: InfoDialog ("DoBacs" title)
    content: ℹ + message + [OK]
    used_for:
      - "No data found"
      - "Completion Start Date and End Date cannot be in the past."
      - "No BACS payments present."
      - "From and To date should not be in past date to save the BACS file."
      - Nil-Income empty result

  - id: WarningDialog
    component: WarningDialog ("BACS Payments" title)
    content: ⚠ + message + [Yes] [No]
    used_for:
      - Show Payments confirmation
      - Print Report confirmation
      - "Some of the payments have already been committed. Would you like to exclude these payments?"

flows:

  - id: flow_show_payments
    trigger: header [ Show Payments ]
    steps:
      - WarningDialog
      - on Yes: populate grid in active tab
      - on No: dismiss

  - id: flow_print_report
    trigger: header [ Print Report ]
    steps:
      - WarningDialog
      - on Yes: open ReportPrintModal
      - inside ReportPrintModal:
          - ⚙ -> PrintDialog
          - 🖨 -> window.print()
          - 💾 -> SaveAsDialog (QRP) -> downloadQrp -> browser download

  - id: flow_save_to_bacs
    trigger: any [ Save To Bacs ] (per tab)
    preconditions: tab has data
    steps:
      - openSaveAs(BACS):
          - if completion dates in past: InfoDialog "Completion Start Date and End Date cannot be in the past." (stops)
          - else: SaveAsDialog (BACS)
      - on Save: browser download .BACS file

  - id: flow_save_to_csv
    trigger: Processed tab [ Save To CSV ]
    behavior:
      - disabled when !showProcessed
      - when enabled: opens SaveAsDialog (CSV) directly (no preceding info dialog, no date check)
      - on Save: browser download .CSV file

  - id: flow_save_and_commit
    trigger: any [ Save And Commit To BACS ]
    steps:
      - check tab has data; if not: InfoDialog "No BACS payments present."
      - simulated commit conflict (1 in 3 chance): WarningDialog (Exclude already-committed?)
      - else: InfoDialog ("From and To date should not be in past date to save the BACS file.")

  - id: flow_monthly_differences
    trigger: Monthly Differences tab
    actions:
      - Produce List -> grid
      - Produce Nil-Income List -> InfoDialog
      - Print Preview -> PrintPreviewModal
          - 🖨 -> window.print()
          - 💾 -> SaveAsDialog (QRP) -> downloadQrp

  - id: flow_reports_tab
    trigger: Reports tab
    actions:
      - Print First -> FirstPaymentReportModal -> { ⚙ PrintDialog | 🖨 print | 💾 SaveAsDialog QRP }
      - Print Processed -> ProcessedReportModal -> { ⚙ PrintDialog | 🖨 print | 💾 SaveAsDialog QRP }

print_behavior:
  strategy: CSS @media print
  rules:
    - body * { visibility: hidden }
    - .print-area, .print-area * { visibility: visible }
    - .print-area positioned absolute at top-left; zoom:1
    - elements with .no-print are hidden
  result: only the report page renders to the printed sheet; modal chrome,
          toolbar, app shell are excluded automatically

file_export:
  qrp:
    library: src/lib/saveQrp.ts
    function: downloadQrp(report, filename)
    format: |
      QRP/1.0
      TITLE\t{title}
      RANGE\t{dateRange}
      COLUMNS\t{label1}\t{label2}\t...
      ROW\t{cell1}\t{cell2}\t...
      ...
      TOTAL\t{label}\t{value}
      ...
      END
  pdf:
    library: src/lib/savePdf.ts
    deps: [jspdf, html2canvas]
  csv:
    triggered_from: Save To CSV (Processed tab) via SaveAsDialog
  bacs:
    triggered_from: Save To Bacs in multiple tabs

state_model:
  global:
    - completionStart, completionEnd        # dd/mm/yyyy strings
    - activeTab                             # one of 8 tab ids
    - showData, showProcessed,
      showProcessedMcp, showMonthlyDiff     # per-tab "data populated" flags
    - saveAsOpen, saveAsType (BACS|CSV|QRP) # SaveAsDialog state
    - noDataOpen, noDataMessage             # InfoDialog state
    - commitWarningOpen                     # WarningDialog state for commits

design_notes:
  - Header navy (#00263e) with white logo + Logout pill
  - All primary buttons: blue #006cf4, hover #003578, pill (rounded-30px)
  - All secondary buttons: white background, blue #04589b border + text,
    hover fills navy (#003578) with white text
  - Disabled buttons: white bg, gray (#979797) border + text
  - Tables: striped (#e7ebec34 alt rows), hover full row #05579B with white text
  - Print modals open over a 40% black backdrop, shadow-2xl, 12px radius
  - SaveAsDialog and PrintDialog match Windows 11 Fluent visuals
    (Segoe UI Variable, 4px corner radius, accent #0067c0, light Mica grey #f3f3f3)
```
