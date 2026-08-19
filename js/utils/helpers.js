export function normalizeStatus(status) {
  const value = String(status || "").trim().toLowerCase();
  if (value.includes("marked")) {
    return "marked";
  }
  return "unmarked";
}

export function sanitizeSerialToken(token) {
  let str = String(token || "");
  
  // If it's a URL, try to extract the last path segment or query param
  try {
    if (str.startsWith('http')) {
      const url = new URL(str);
      // Check if there's an 'id' or 'serial' query param
      const param = url.searchParams.get('id') || url.searchParams.get('serial');
      if (param) {
        str = param;
      } else {
        // Fallback to the last part of the path
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts.length > 0) {
          str = parts[parts.length - 1];
        }
      }
    }
  } catch (e) {
    // Not a valid URL, ignore
  }

  return str
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
