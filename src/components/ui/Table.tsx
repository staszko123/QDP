import type { ReactNode } from "react";

interface TableProps {
  headers: string[];
  rows: ReactNode[][];
}

export function Table({ headers, rows }: TableProps) {
  return (
    <div className="qd-table-shell">
      <table className="qd-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
