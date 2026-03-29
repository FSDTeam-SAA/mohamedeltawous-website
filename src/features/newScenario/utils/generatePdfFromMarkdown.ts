// src/features/newScenario/utils/generatePdfFromMarkdown.ts
// Client-side only — uses jsPDF to convert API markdown report to a formatted PDF.

import { jsPDF } from "jspdf";

// ─── Colour palette ──────────────────────────────────────────────────────────
const C = {
  ink: [15, 23, 42] as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
  faint: [203, 213, 225] as [number, number, number],
  accent: [59, 130, 246] as [number, number, number],
  bg: [241, 245, 249] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  quote: [71, 85, 105] as [number, number, number],
  quoteBar: [148, 163, 184] as [number, number, number],
  tableHead: [15, 23, 42] as [number, number, number],
  tableAlt: [248, 250, 252] as [number, number, number],
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_L = 18;
const MARGIN_R = 18;
const MARGIN_T = 35;
const MARGIN_B = 22;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

// ─── Regex patterns ──────────────────────────────────────────────────────────
const RE_H1 = /^# (.+)/;
const RE_H2 = /^## (.+)/;
const RE_H3 = /^### (.+)/;
const RE_H4 = /^#### (.+)/;
const RE_BLOCKQUOTE = /^> (.+)/;
const RE_BULLET = /^[-*] (.+)/;
const RE_NUMBERED = /^(\d+)\. (.+)/;
const RE_HR = /^(-{3,}|\*{3,})$/;
const RE_TABLE_SEP = /^\|[-| :]+\|$/;
const RE_BOLD_SPLIT = /(\*\*[^*]+\*\*)/g;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function setColor(
  doc: jsPDF,
  rgb: [number, number, number],
  target: "fill" | "text" | "draw" = "fill",
): void {
  if (target === "text") doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  else if (target === "draw") doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  else doc.setFillColor(rgb[0], rgb[1], rgb[2]);
}

function stripInline(text: string): string {
  return text
    .replaceAll(/\*\*(.+?)\*\*/g, "$1")
    .replaceAll(/\*(.+?)\*/g, "$1")
    .replaceAll(/__(.+?)__/g, "$1")
    .replaceAll(/_(.+?)_/g, "$1")
    .replaceAll(/`(.+?)`/g, "$1");
}

function wrapLines(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

function lineHeight(fontSize: number): number {
  return fontSize * 0.3528 + 1.2;
}

// ─── Page chrome ─────────────────────────────────────────────────────────────

function drawPageChrome(
  doc: jsPDF,
  pageNum: number,
  dateStr: string,
  title: string,
  logoImg: HTMLImageElement | null,
): void {
  let textX = MARGIN_L;
  if (logoImg) {
    const aspect = logoImg.width / logoImg.height;
    const h = 10;
    const w = h * aspect;
    doc.addImage(logoImg, "PNG", MARGIN_L, 12, w, h);
    textX = MARGIN_L + w + 4;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  setColor(doc, C.ink, "text");
  doc.text(title, textX, 19);

  setColor(doc, C.faint, "draw");
  doc.setLineWidth(0.3);
  doc.line(MARGIN_L, MARGIN_T - 4, PAGE_W - MARGIN_R, MARGIN_T - 4);
  doc.line(
    MARGIN_L,
    PAGE_H - MARGIN_B + 4,
    PAGE_W - MARGIN_R,
    PAGE_H - MARGIN_B + 4,
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  setColor(doc, C.muted, "text");
  doc.text(
    "Strategic Scenario Planning Report — Confidential",
    MARGIN_L,
    PAGE_H - MARGIN_B + 8,
  );
  doc.text(`Page ${pageNum}`, PAGE_W - MARGIN_R, PAGE_H - MARGIN_B + 8, {
    align: "right",
  });
  doc.text(dateStr, PAGE_W / 2, PAGE_H - MARGIN_B + 8, { align: "center" });
}

// ─── Inline bold renderer ─────────────────────────────────────────────────────

function renderInlineLine(
  doc: jsPDF,
  rawLine: string,
  x: number,
  y: number,
  baseSize: number,
  color: [number, number, number],
): void {
  const parts = rawLine.split(RE_BOLD_SPLIT);
  let cursor = x;
  doc.setFontSize(baseSize);
  setColor(doc, color, "text");
  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      doc.setFont("helvetica", "bold");
      doc.text(inner, cursor, y);
      cursor += doc.getTextWidth(inner);
    } else if (part) {
      doc.setFont("helvetica", "normal");
      doc.text(part, cursor, y);
      cursor += doc.getTextWidth(part);
    }
  }
}

// ─── Table renderer ───────────────────────────────────────────────────────────

function parseTableRows(lines: string[]): string[][] {
  return lines
    .filter((l) => !RE_TABLE_SEP.test(l))
    .map((l) =>
      l
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => stripInline(c.trim())),
    );
}

interface TableRowOptions {
  doc: jsPDF;
  row: string[];
  colCount: number;
  colW: number;
  y: number;
  isHeader: boolean;
  rowIndex: number;
  fontSize: number;
}

function renderTableRow(opts: TableRowOptions): number {
  const { doc, row, colCount, colW, y, isHeader, rowIndex, fontSize } = opts;
  const cellPadX = 3;
  const cellPadY = 2.5;

  let maxLines = 1;
  for (const cell of row) {
    const wrapped = wrapLines(doc, cell, colW - cellPadX * 2);
    if (wrapped.length > maxLines) maxLines = wrapped.length;
  }
  const rowH = maxLines * (fontSize * 0.3528 + 0.8) + cellPadY * 2;

  for (let c = 0; c < colCount; c++) {
    const cx = MARGIN_L + c * colW;
    if (isHeader) {
      setColor(doc, C.tableHead, "fill");
    } else if (rowIndex % 2 === 0) {
      setColor(doc, C.tableAlt, "fill");
    } else {
      setColor(doc, C.white, "fill");
    }
    setColor(doc, C.faint, "draw");
    doc.setLineWidth(0.2);
    doc.rect(cx, y, colW, rowH, "FD");
    doc.setFont("helvetica", isHeader ? "bold" : "normal");
    setColor(doc, isHeader ? C.white : C.ink, "text");
    const wrapped = wrapLines(doc, row[c] ?? "", colW - cellPadX * 2);
    for (let wi = 0; wi < wrapped.length; wi++) {
      doc.text(
        wrapped[wi],
        cx + cellPadX,
        y + cellPadY + (wi + 1) * (fontSize * 0.3528 + 0.5),
      );
    }
  }
  return rowH;
}

function renderTable(
  doc: jsPDF,
  rows: string[][],
  startY: number,
  ensureSpace: (need: number) => number,
): number {
  if (rows.length === 0) return startY;
  const colCount = rows[0].length;
  const colW = CONTENT_W / colCount;
  const fontSize = 7.5;
  doc.setFontSize(fontSize);
  let y = startY;

  for (let r = 0; r < rows.length; r++) {
    const isHeader = r === 0;
    const rowH = rows[r].length * (fontSize * 0.3528 + 0.8) + 5;
    y = ensureSpace(rowH + 2);
    const actualH = renderTableRow({
      doc,
      row: rows[r],
      colCount,
      colW,
      y,
      isHeader,
      rowIndex: r,
      fontSize,
    });
    y += actualH;
  }
  return y + 4;
}

// ─── Block renderers ──────────────────────────────────────────────────────────

function renderHr(doc: jsPDF, y: number): number {
  setColor(doc, C.faint, "draw");
  doc.setLineWidth(0.4);
  doc.line(MARGIN_L, y, PAGE_W - MARGIN_R, y);
  return y + 4;
}

function renderH1(doc: jsPDF, text: string, y: number): number {
  setColor(doc, C.ink, "fill");
  doc.rect(MARGIN_L - 2, y - 2, CONTENT_W + 4, 14, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  setColor(doc, C.white, "text");
  doc.text(text, MARGIN_L + 1, y + 8);
  return y + 18;
}

function renderH2(doc: jsPDF, text: string, y: number): number {
  const wrapped = wrapLines(doc, text, CONTENT_W);
  const blockH = wrapped.length * 6 + 6;
  setColor(doc, C.accent, "fill");
  doc.rect(MARGIN_L, y, 3, blockH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  setColor(doc, C.ink, "text");
  for (let wi = 0; wi < wrapped.length; wi++) {
    doc.text(wrapped[wi], MARGIN_L + 6, y + 5 + wi * 6);
  }
  return y + blockH + 5;
}

function renderH3(doc: jsPDF, text: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  setColor(doc, C.ink, "text");
  const wrapped = wrapLines(doc, text, CONTENT_W);
  wrapped.forEach((wl, wi) => doc.text(wl, MARGIN_L, y + wi * 5));
  setColor(doc, C.faint, "draw");
  doc.setLineWidth(0.25);
  doc.line(
    MARGIN_L,
    y + wrapped.length * 5 + 1,
    PAGE_W - MARGIN_R,
    y + wrapped.length * 5 + 1,
  );
  return y + wrapped.length * 5 + 5;
}

function renderH4(doc: jsPDF, text: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  setColor(doc, C.muted, "text");
  const wrapped = wrapLines(doc, text, CONTENT_W);
  wrapped.forEach((wl, wi) => doc.text(wl, MARGIN_L, y + wi * 4.5));
  return y + wrapped.length * 4.5 + 3;
}

function renderBlockquote(doc: jsPDF, text: string, y: number): number {
  const wrapped = wrapLines(doc, text, CONTENT_W - 10);
  const blockH = wrapped.length * 4.5 + 6;
  setColor(doc, C.quoteBar, "fill");
  doc.rect(MARGIN_L, y, 2.5, blockH, "F");
  setColor(doc, C.bg, "fill");
  doc.rect(MARGIN_L + 2.5, y, CONTENT_W - 2.5, blockH, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  setColor(doc, C.quote, "text");
  wrapped.forEach((wl, wi) => doc.text(wl, MARGIN_L + 6, y + 4 + wi * 4.5));
  return y + blockH + 3;
}

function renderBullet(doc: jsPDF, text: string, y: number): number {
  const wrapped = wrapLines(doc, text, CONTENT_W - 8);
  setColor(doc, C.accent, "fill");
  doc.circle(MARGIN_L + 2, y + 2.5, 1, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  setColor(doc, C.ink, "text");
  wrapped.forEach((wl, wi) => doc.text(wl, MARGIN_L + 6, y + 3 + wi * 4.2));
  return y + wrapped.length * 4.2 + 1 + 1.5;
}

function renderNumbered(
  doc: jsPDF,
  num: string,
  text: string,
  y: number,
): number {
  const wrapped = wrapLines(doc, text, CONTENT_W - 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  setColor(doc, C.accent, "text");
  doc.text(`${num}.`, MARGIN_L, y + 3);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.ink, "text");
  wrapped.forEach((wl, wi) => doc.text(wl, MARGIN_L + 7, y + 3 + wi * 4.2));
  return y + wrapped.length * 4.2 + 1 + 1.5;
}

function renderParagraph(doc: jsPDF, line: string, y: number): number {
  const plainText = stripInline(line);
  const wrapped = wrapLines(doc, plainText, CONTENT_W);
  doc.setFontSize(8.8);

  if (line.includes("**")) {
    const inlineLines = wrapLines(doc, plainText, CONTENT_W);
    for (let wi = 0; wi < inlineLines.length; wi++) {
      renderInlineLine(
        doc,
        inlineLines[wi],
        MARGIN_L,
        y + 4 + wi * 4.5,
        8.8,
        C.ink,
      );
    }
    return y + inlineLines.length * 4.5 + 2;
  }

  doc.setFont("helvetica", "normal");
  setColor(doc, C.ink, "text");
  wrapped.forEach((wl, wi) => doc.text(wl, MARGIN_L, y + 4 + wi * 4.5));
  return y + wrapped.length * 4.5 + 2;
}

// ─── Block height estimators ──────────────────────────────────────────────────

function estimateBlockHeight(line: string): number {
  if (RE_HR.test(line.trim())) return 7;
  if (RE_H1.exec(line)) return 20;
  if (RE_H2.exec(line)) return 16;
  if (RE_H3.exec(line)) return 12;
  if (RE_H4.exec(line)) return 8;
  if (RE_BLOCKQUOTE.exec(line)) return 12;
  if (RE_BULLET.exec(line)) return 8;
  if (RE_NUMBERED.exec(line)) return 8;
  if (line.trim() === "") return 2.5;
  return lineHeight(8.8) * 2 + 2;
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function generatePdfFromMarkdown(
  markdown: string,
  filename: string,
  websiteTitle: string = "Second Sight",
): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  let logoImg: HTMLImageElement | null = null;
  try {
    logoImg = await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = "/images/logo.png";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  } catch {
    logoImg = null;
  }

  let pageNum = 1;
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  drawPageChrome(doc, pageNum, dateStr, websiteTitle, logoImg);
  let y = MARGIN_T;

  function newPage(): void {
    doc.addPage();
    pageNum++;
    drawPageChrome(doc, pageNum, dateStr, websiteTitle, logoImg);
    y = MARGIN_T;
  }

  function ensureSpace(need: number): number {
    if (y + need > PAGE_H - MARGIN_B) newPage();
    return y;
  }

  function gap(mm: number): void {
    y += mm;
    if (y > PAGE_H - MARGIN_B) newPage();
  }

  const lines = markdown.split("\n");
  let tableBuffer: string[] = [];
  let inTable = false;
  let i = 0;

  function processBlock(line: string, iIndex: number): number {
    if (inTable) {
      const rows = parseTableRows(tableBuffer);
      y = renderTable(doc, rows, y, ensureSpace);
      tableBuffer = [];
      inTable = false;
      gap(3);
      return iIndex;
    }

    if (RE_HR.test(line.trim())) {
      gap(3);
      ensureSpace(3);
      y = renderHr(doc, y);
      return iIndex + 1;
    }

    const mH1 = RE_H1.exec(line);
    if (mH1) {
      ensureSpace(20);
      y = renderH1(doc, stripInline(mH1[1]), y);
      return iIndex + 1;
    }

    const mH2 = RE_H2.exec(line);
    if (mH2) {
      ensureSpace(16);
      y = renderH2(doc, stripInline(mH2[1]), y);
      return iIndex + 1;
    }

    const mH3 = RE_H3.exec(line);
    if (mH3) {
      ensureSpace(12);
      y = renderH3(doc, stripInline(mH3[1]), y);
      return iIndex + 1;
    }

    const mH4 = RE_H4.exec(line);
    if (mH4) {
      ensureSpace(8);
      y = renderH4(doc, stripInline(mH4[1]), y);
      return iIndex + 1;
    }

    const mBq = RE_BLOCKQUOTE.exec(line);
    if (mBq) {
      ensureSpace(12);
      y = renderBlockquote(doc, stripInline(mBq[1]), y);
      return iIndex + 1;
    }

    const mBullet = RE_BULLET.exec(line);
    if (mBullet) {
      ensureSpace(8);
      y = renderBullet(doc, stripInline(mBullet[1]), y);
      return iIndex + 1;
    }

    const mNum = RE_NUMBERED.exec(line);
    if (mNum) {
      ensureSpace(8);
      y = renderNumbered(doc, mNum[1], stripInline(mNum[2]), y);
      return iIndex + 1;
    }

    if (line.trim() === "") {
      gap(2.5);
      return iIndex + 1;
    }

    ensureSpace(estimateBlockHeight(line));
    y = renderParagraph(doc, line, y);
    return iIndex + 1;
  }

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (line.startsWith("|")) {
      tableBuffer.push(line);
      inTable = true;
      i++;
      continue;
    }

    i = processBlock(line, i);
  }

  if (inTable && tableBuffer.length > 0) {
    const rows = parseTableRows(tableBuffer);
    y = renderTable(doc, rows, y, ensureSpace);
  }

  doc.save(filename);
}
