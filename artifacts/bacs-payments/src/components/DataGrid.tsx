interface Column {
  key: string;
  label: string;
}

interface DataGridProps {
  columns: Column[];
  data?: Record<string, string>[];
  minHeight?: string;
}

export default function DataGrid({ columns, data = [], minHeight = "min-h-[300px]" }: DataGridProps) {
  return (
    <div className={`border border-[#BBBBBB] rounded-[8px] bg-white overflow-hidden ${minHeight}`}>
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-[5px] font-['Livvic'] font-semibold text-[#002f5c] text-sm text-left border-b-[3px] border-b-[#04589b] border-t-[3px] border-t-[#04589b] bg-white"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="p-0"></td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className={`group hover:bg-[#05579B] ${i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-[5px] font-['Mulish'] font-light text-[#3d3d3d] text-sm group-hover:text-white"
                  >
                    {row[col.key] || ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
