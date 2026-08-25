const JSZip = require("jszip");

const COMMENT_FILE_PATTERNS = [
  /^xl\/comments\d*\.xml$/,
  /^xl\/threadedComments\/threadedComment\d*\.xml$/,
  /^xl\/persons\/person\.xml$/,
  /^xl\/drawings\/vmlDrawing\d*\.vml$/,
];

const RELATIONSHIP_TAG_RE = /<Relationship\b[^>]*\/>/g;
const REL_ID_RE = /\bId="([^"]+)"/;
const REL_TYPE_RE = /\bType="([^"]+)"/;
const COMMENT_REL_TYPE_RE = /(comments|vmlDrawing|threadedComment|person)/i;

// Works around a known ExcelJS crash ("Cannot read properties of undefined
// (reading 'comments')") when loading .xlsx files that contain cell
// comments/notes. We only need cell values, so it's safe to strip comment
// parts entirely before handing the buffer to ExcelJS.
// https://github.com/exceljs/exceljs/issues/2797
async function sanitizeXlsx(buffer) {
  let zip;

  try {
    zip = await JSZip.loadAsync(buffer);
  } catch {
    // Not a real zip (e.g. a .csv with an .xlsx-like extension) — let
    // ExcelJS handle/report it as-is.
    return buffer;
  }

  const removedRelIds = new Set();
  let touched = false;

  Object.keys(zip.files).forEach((filePath) => {
    if (COMMENT_FILE_PATTERNS.some((re) => re.test(filePath))) {
      zip.remove(filePath);
      touched = true;
    }
  });

  const relsFiles = Object.keys(zip.files).filter((p) =>
    /^xl\/worksheets\/_rels\/sheet\d+\.xml\.rels$/.test(p),
  );

  for (const relsPath of relsFiles) {
    const original = await zip.file(relsPath).async("string");

    const cleaned = original.replace(RELATIONSHIP_TAG_RE, (tag) => {
      const typeMatch = tag.match(REL_TYPE_RE);

      if (typeMatch && COMMENT_REL_TYPE_RE.test(typeMatch[1])) {
        const idMatch = tag.match(REL_ID_RE);
        if (idMatch) removedRelIds.add(idMatch[1]);
        return "";
      }

      return tag;
    });

    if (cleaned !== original) {
      zip.file(relsPath, cleaned);
      touched = true;
    }
  }

  const sheetFiles = Object.keys(zip.files).filter((p) =>
    /^xl\/worksheets\/sheet\d+\.xml$/.test(p),
  );

  for (const sheetPath of sheetFiles) {
    const original = await zip.file(sheetPath).async("string");

    let cleaned = original
      .replace(/<legacyDrawing\b[^>]*\/>/g, "")
      .replace(/<legacyDrawingHF\b[^>]*\/>/g, "")
      .replace(/<extLst>[\s\S]*?<\/extLst>/g, "");

    if (removedRelIds.size) {
      removedRelIds.forEach((id) => {
        cleaned = cleaned.split(`r:id="${id}"`).join("");
      });
    }

    if (cleaned !== original) {
      zip.file(sheetPath, cleaned);
      touched = true;
    }
  }

  if (!touched) return buffer;

  return zip.generateAsync({ type: "nodebuffer" });
}

module.exports = sanitizeXlsx;
