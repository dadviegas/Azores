import { useMemo, useState } from "react";
import { Area, Table, TableWrap, Wrap } from "./CsvViewer.styles.js";

// Minimal CSV parser supporting quoted fields with embedded commas/newlines.
const parseCsv = (src: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQ) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = false;
      } else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else cur += c;
  }
  if (cur !== "" || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r[0] ?? "") !== "");
};

const SAMPLE = "name,role,years\nAna,Eng,4\nBruno,Design,7\nCarla,PM,2";

export const CsvViewer = (): JSX.Element => {
  const [src, setSrc] = useState(SAMPLE);
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const rows = useMemo(() => parseCsv(src), [src]);
  const head = rows[0] ?? [];
  const body = rows.slice(1);
  const sorted = useMemo(() => {
    if (sortCol == null) return body;
    return [...body].sort((a, b) => {
      const av = a[sortCol] ?? "";
      const bv = b[sortCol] ?? "";
      const an = parseFloat(av);
      const bn = parseFloat(bv);
      if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * dir;
      return av.localeCompare(bv) * dir;
    });
  }, [body, sortCol, dir]);

  return (
    <Wrap>
      <Area
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        spellCheck={false}
        aria-label="CSV input"
      />
      <TableWrap>
        <Table>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th
                  key={i}
                  onClick={() => {
                    if (sortCol === i) setDir((d) => (d === 1 ? -1 : 1));
                    else {
                      setSortCol(i);
                      setDir(1);
                    }
                  }}
                >
                  {h}
                  {sortCol === i ? (dir === 1 ? " ↑" : " ↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i}>
                {head.map((_, j) => (
                  <td key={j}>{r[j] ?? ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </Wrap>
  );
};

export default CsvViewer;
