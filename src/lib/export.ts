export type CsvRow = Record<string, string | number | boolean | null | undefined>;

export const exportToCsv = (filename: string, rows: CsvRow[]) => {
  const safeRows = rows.length > 0 ? rows : [{ empty: "" }];
  const header = Array.from(
    safeRows.reduce<Set<string>>((acc, r) => {
      Object.keys(r).forEach(k => acc.add(k));
      return acc;
    }, new Set<string>())
  );
  const escape = (val: any) => {
    const s = String(val ?? "");
    if (s.includes(",") || s.includes("\n") || s.includes("\"")) {
      return '"' + s.replaceAll('"', '""') + '"';
    }
    return s;
  };
  const csv = [header.join(","), ...safeRows.map(r => header.map(h => escape((r as any)[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};


