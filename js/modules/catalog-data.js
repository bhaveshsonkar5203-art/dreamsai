(function () {
  function normalizeStatus(status) {
    const value = String(status || "").trim().toLowerCase();
    if (value.includes("unavailable")) {
      return "unavailable";
    }
    if (value.includes("marked")) {
      return "marked";
    }
    return "unmarked";
  }

  function normalizeImageUrl(rawUrl) {
    const input = String(rawUrl || "").trim();
    if (!input) {
      return "";
    }

    try {
      const parsed = new URL(input, window.location.href);
      if (parsed.hostname.includes("drive.google.com")) {
        parsed.searchParams.delete("google_abuse");
      }
      if (parsed.hostname === "raw.githubusercontent.com") {
        parsed.pathname = parsed.pathname
          .split("/")
          .map(seg => {
            try {
              return encodeURIComponent(decodeURIComponent(seg).trim());
            } catch {
              return seg;
            }
          })
          .join("/");
      }
      return parsed.toString();
    } catch (err) {
      return encodeURI(input);
    }
  }

  function extractGoogleDriveId(url) {
    try {
      const parsed = new URL(url);
      const idFromQuery = parsed.searchParams.get("id");
      if (idFromQuery) {
        return idFromQuery;
      }

      const match = parsed.pathname.match(/\/d\/([A-Za-z0-9_-]+)/);
      return match ? match[1] : "";
    } catch (err) {
      return "";
    }
  }

  function buildImageSourceCandidates(item, preferCollageFirst) {
    const sources = preferCollageFirst
      ? [item["CollageURL"], item["DisplayURL"]]
      : [item["DisplayURL"], item["CollageURL"]];

    const out = [];
    const seen = new Set();

    const add = (url) => {
      const normalized = normalizeImageUrl(url);
      if (!normalized || seen.has(normalized)) {
        return;
      }
      seen.add(normalized);
      out.push(normalized);
    };

    sources.forEach((rawUrl) => {
      const normalized = normalizeImageUrl(rawUrl);
      if (!normalized) {
        return;
      }

      const driveId = extractGoogleDriveId(normalized);
      if (driveId) {
        add(`https://lh3.googleusercontent.com/d/${driveId}=w700`);
        add(`https://drive.google.com/thumbnail?id=${driveId}&sz=w700`);
        add(`https://drive.google.com/uc?export=view&id=${driveId}`);
      }

      add(normalized);
    });

    return out;
  }

  function getPreviewImageUrl(item) {
    const candidates = buildImageSourceCandidates(item, false);
    return candidates[0] || "";
  }

  function getPreviewFallbackImageUrl(item) {
    const candidates = buildImageSourceCandidates(item, false);
    return candidates[1] || "";
  }

  function getFallbackCatalogData() {
    return [
      {
        "Serial No": "RNG-901",
        "Brand Name": "Ascend Atelier",
        "Type": "Rings",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "RNG-902",
        "Brand Name": "VRAI Heritage",
        "Type": "Rings",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "NCK-401",
        "Brand Name": "Ascend Atelier",
        "Type": "Necklaces",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "NCK-402",
        "Brand Name": "Couture Pavé",
        "Type": "Necklaces",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "EAR-601",
        "Brand Name": "Ascend Atelier",
        "Type": "Earrings",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "EAR-602",
        "Brand Name": "VRAI Heritage",
        "Type": "Earrings",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "BRC-301",
        "Brand Name": "Ascend Atelier",
        "Type": "Bracelets",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "BRC-302",
        "Brand Name": "Couture Pavé",
        "Type": "Bracelets",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "HJ-801",
        "Brand Name": "Ascend Atelier",
        "Type": "High Jewellery",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&auto=format&fit=crop&q=80"
      },
      {
        "Serial No": "HJ-802",
        "Brand Name": "VRAI Heritage",
        "Type": "High Jewellery",
        "Status": "Available",
        "DisplayURL": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=700&auto=format&fit=crop&q=80",
        "CollageURL": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=700&auto=format&fit=crop&q=80"
      }
    ];
  }

  function rebuildDataIndex() {
    const currentData = Array.isArray(window.data) ? window.data : [];
    if (typeof window.dataBySerial !== 'undefined') {
      window.dataBySerial = new Map(currentData.map(item => [item["Serial No"], item]));
    }
  }

  window.normalizeStatus = normalizeStatus;
  window.normalizeImageUrl = normalizeImageUrl;
  window.extractGoogleDriveId = extractGoogleDriveId;
  window.buildImageSourceCandidates = buildImageSourceCandidates;
  window.getPreviewImageUrl = getPreviewImageUrl;
  window.getPreviewFallbackImageUrl = getPreviewFallbackImageUrl;
  window.rebuildDataIndex = rebuildDataIndex;
  window.getFallbackCatalogData = getFallbackCatalogData;
})();
