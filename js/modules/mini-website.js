(function () {
  let miniWebsiteMeta = { name: "", purpose: "review" };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeSerialForMatching(value) {
    return String(value || "")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
  }

  function getMiniWebsiteSelectionItems() {
    const selectedSerialSet = new Set(
      (Array.isArray(selected) ? selected : []).map(normalizeSerialForMatching)
    );

    return data.filter(item => selectedSerialSet.has(normalizeSerialForMatching(item["Serial No"])));
  }

  function setMiniWebsiteMeta(name, purpose) {
    miniWebsiteMeta = {
      name: String(name || "").trim(),
      purpose: purpose === "final" ? "final" : "review"
    };
  }

  function bindMiniWebsitePreviewInputs() {
    const nameInput = document.getElementById("miniWebsiteNameInput");
    const purposeSelect = document.getElementById("miniWebsitePurposeSelect");

    if (!nameInput || !purposeSelect) {
      return;
    }

    if (nameInput.dataset.previewBound === "true") {
      return;
    }

    nameInput.addEventListener("input", updateMiniWebsiteModalPreview);
    purposeSelect.addEventListener("change", updateMiniWebsiteModalPreview);
    nameInput.dataset.previewBound = "true";
    purposeSelect.dataset.previewBound = "true";
  }

  function openMiniWebsiteModal() {
    const modal = document.getElementById("miniWebsiteModal");
    const nameInput = document.getElementById("miniWebsiteNameInput");
    const purposeSelect = document.getElementById("miniWebsitePurposeSelect");

    if (!modal || !nameInput || !purposeSelect) {
      return;
    }

    bindMiniWebsitePreviewInputs();
    nameInput.value = miniWebsiteMeta.name || "";
    purposeSelect.value = miniWebsiteMeta.purpose || "review";
    modal.classList.remove("hidden");
    updateMiniWebsiteModalPreview();
  }

  function closeMiniWebsiteModal() {
    const modal = document.getElementById("miniWebsiteModal");
    if (modal) {
      modal.classList.add("hidden");
    }
  }

  function renderMiniWebsitePreview(containerId) {
    const preview = document.getElementById(containerId);
    if (!preview) {
      return;
    }

    const nameInput = document.getElementById("miniWebsiteNameInput");
    const purposeSelect = document.getElementById("miniWebsitePurposeSelect");
    const hasModalInputs = Boolean(nameInput && purposeSelect);
    const nameValue = (hasModalInputs ? nameInput.value : miniWebsiteMeta.name || "").trim() || "Guest";
    const purpose = (hasModalInputs ? purposeSelect.value : miniWebsiteMeta.purpose || "review") === "final" ? "final" : "review";
    const previewItems = getMiniWebsiteSelectionItems();
    const selectedCount = Array.isArray(selected) ? selected.length : 0;
    const selectionLabel = selectedCount ? `${selectedCount} selected product${selectedCount === 1 ? "" : "s"}` : "No products selected yet";

    preview.innerHTML = "";
    preview.classList.toggle("empty-state", !previewItems.length);

    const statusNode = document.createElement("p");
    statusNode.className = "preview-sub";
    statusNode.textContent = `${nameValue} · ${purpose === "final" ? "Final handoff" : "Review handoff"} • ${selectionLabel}`;
    preview.appendChild(statusNode);

    if (!previewItems.length) {
      const emptyNode = document.createElement("div");
      emptyNode.className = "mini-preview-empty";
      emptyNode.textContent = "Select products to populate the mini website preview.";
      preview.appendChild(emptyNode);
      return;
    }

    const gridNode = document.createElement("div");
    gridNode.className = "mini-preview-grid";

    previewItems.forEach(item => {
      const card = document.createElement("article");
      card.className = "mini-preview-card";
      // Ensure getPreviewImageUrl is in scope globally
      const imageUrl = typeof getPreviewImageUrl === 'function' ? getPreviewImageUrl(item) : "";
      const safeSerial = escapeHtml(item["Serial No"] || "");
      const safeBrand = escapeHtml(item["Brand Name"] || "");
      const safeType = escapeHtml(item["Type"] || "");
      card.innerHTML = `
        ${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${safeSerial}" loading="lazy">` : `<div class="mini-preview-placeholder">No image available</div>`}
        <div class="mini-preview-body">
          <p class="mini-preview-title">${safeSerial}</p>
          <p class="mini-preview-sub">${safeBrand}</p>
          <p class="mini-preview-sub">${safeType}</p>
        </div>
      `;
      gridNode.appendChild(card);
    });

    preview.appendChild(gridNode);
  }

  function updateMiniWebsiteModalPreview() {
    renderMiniWebsitePreview("miniWebsiteModalPreview");
    renderMiniWebsitePreview("miniWebsitePreview");
  }

  function buildMiniWebsiteHtml(inventoryItems, initialSelectedSerials = [], options = {}) {
    const selectedSerialSet = new Set(
      (Array.isArray(initialSelectedSerials) ? initialSelectedSerials : []).map(normalizeSerialForMatching)
    );

    const filteredInventory = inventoryItems.filter(item => {
      const serial = normalizeSerialForMatching(item["Serial No"]);
      return selectedSerialSet.has(serial);
    });

    const nameValue = String(options.name || miniWebsiteMeta.name || "").trim() || "Valued Client";
    const purposeValue = options.purpose === "final" ? "final" : "review";
    const purposeLabel = purposeValue === "final" ? "Final Showcase" : "Private Client Review";
    const isReview = purposeValue === "review";
    const currentApiUrl = (typeof API_URL !== "undefined") ? API_URL : "https://script.google.com/macros/s/AKfycby4RNwxBEfKWLWCT4Y6-LFLkObAE-j4LCDBUh5Lc3eG6zAcPN1WvUqXwOXMyWDH3nA/exec";

    const cardsMarkup = filteredInventory.map(item => {
      const serial = escapeHtml(item["Serial No"] || "Unknown");
      const brand = escapeHtml(item["Brand Name"] || "Ascend High Jewelry");
      const type = escapeHtml(item["Type"] || "Bespoke Collection");
      
      let imageUrl = "";
      if (typeof normalizeImageUrl === 'function') {
         imageUrl = normalizeImageUrl(item["DisplayURL"] || item["CollageURL"] || "");
      } else {
         imageUrl = item["DisplayURL"] || item["CollageURL"] || "";
      }
      
      const imageTag = imageUrl
        ? `<img src="${escapeHtml(imageUrl)}" alt="${serial}" loading="lazy">`
        : `<div class="image-placeholder"><span>No Image Available</span></div>`;

      const checkboxHtml = isReview ? `
        <label class="checkbox-label" for="cb-${serial}">
          <input type="checkbox" id="cb-${serial}" class="product-checkbox" value="${serial}" onchange="updateSelectedCount()">
          <span class="custom-cb"></span>
          <span class="cb-text">Select this piece</span>
        </label>
        <div class="note-container" id="note-box-${serial}" style="display: none; margin-top: 8px;">
          <input type="text" id="note-${serial}" class="client-note-input" placeholder="Add custom request or note for studio..." style="width: 100%; padding: 8px 12px; font-size: 0.82rem; border: 1px solid var(--border); border-radius: 8px; font-family: inherit;">
        </div>
      ` : "";

      return `
        <article class="card" data-serial="${serial}">
          <div class="card-media">
            ${imageTag}
            <span class="brand-tag">${brand}</span>
          </div>
          <div class="card-body">
            <h3 class="piece-title">${serial}</h3>
            <p class="piece-type">${type}</p>
            ${checkboxHtml}
          </div>
        </article>
      `;
    }).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ASCEND — Digital Client Lookbook (${escapeHtml(nameValue)})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --gold: #bf965f;
      --gold-light: #e8cdb5;
      --gold-bg: rgba(191, 150, 95, 0.08);
      --bg: #faf8f5;
      --panel: #ffffff;
      --dark: #121620;
      --text: #242936;
      --muted: #6b7280;
      --border: #e8ded2;
      --shadow: 0 16px 40px rgba(18, 22, 32, 0.07);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding-bottom: 100px;
    }
    .header-banner {
      background: linear-gradient(135deg, #121620 0%, #1c2232 100%);
      color: #fff;
      padding: 48px 24px 40px;
      text-align: center;
      position: relative;
      border-bottom: 2px solid var(--gold);
    }
    .brand-eyebrow {
      font-size: 11px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--gold);
      font-weight: 700;
      margin-bottom: 12px;
      display: block;
    }
    .header-banner h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .header-banner p {
      font-size: 0.95rem;
      color: #9ca3af;
      max-width: 600px;
      margin: 0 auto;
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 20px;
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px 24px;
      margin-bottom: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }
    .client-pill {
      font-size: 14px;
      font-weight: 600;
      color: var(--dark);
    }
    .client-pill span {
      color: var(--gold);
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: var(--gold-bg);
      color: var(--gold);
      border: 1px solid rgba(191, 150, 95, 0.2);
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
    }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      display: flex;
      flex-direction: column;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 48px rgba(18, 22, 32, 0.12);
      border-color: var(--gold-light);
    }
    .card-media {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      background: #f4efe9;
      overflow: hidden;
    }
    .card-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card:hover .card-media img {
      transform: scale(1.04);
    }
    .image-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--muted);
      font-size: 14px;
    }
    .brand-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(18, 22, 32, 0.85);
      backdrop-filter: blur(4px);
      color: #fff;
      font-size: 10px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
      letter-spacing: 0.5px;
    }
    .card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .piece-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 2px;
    }
    .piece-type {
      font-size: 0.85rem;
      color: var(--muted);
      margin-bottom: 16px;
    }
    .checkbox-label {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .checkbox-label:hover {
      background: var(--gold-bg);
      border-color: var(--gold);
    }
    .product-checkbox {
      display: none;
    }
    .custom-cb {
      width: 20px;
      height: 20px;
      border: 2px solid #d1d5db;
      border-radius: 6px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .custom-cb::after {
      content: "✓";
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      display: none;
    }
    .product-checkbox:checked + .custom-cb {
      background: var(--gold);
      border-color: var(--gold);
    }
    .product-checkbox:checked + .custom-cb::after {
      display: block;
    }
    .product-checkbox:checked ~ .cb-text {
      color: var(--dark);
      font-weight: 700;
    }
    .cb-text {
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text);
    }
    .floating-bar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(18, 22, 32, 0.95);
      backdrop-filter: blur(12px);
      color: #fff;
      padding: 14px 28px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 24px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      border: 1px solid rgba(191, 150, 95, 0.4);
      z-index: 9999;
      width: min(90%, 540px);
      justify-content: space-between;
    }
    .selection-counter {
      font-size: 14px;
      font-weight: 500;
    }
    .selection-counter strong {
      color: var(--gold);
      font-size: 16px;
    }
    .submit-btn {
      background: linear-gradient(135deg, #bf965f 0%, #a67c48 100%);
      color: #fff;
      border: none;
      padding: 10px 24px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(191, 150, 95, 0.4);
      white-space: nowrap;
    }
    .submit-btn:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 20px rgba(191, 150, 95, 0.6);
    }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    footer {
      text-align: center;
      padding: 40px 20px;
      font-size: 12px;
      color: var(--muted);
      border-top: 1px solid var(--border);
      margin-top: 60px;
    }
  </style>
</head>
<body>
  <header class="header-banner">
    <span class="brand-eyebrow">ASCEND HIGH JEWELRY</span>
    <h1>Digital Client Lookbook</h1>
    <p>Curated private presentation for ${escapeHtml(nameValue)}</p>
  </header>

  <main class="container">
    <div class="meta-bar">
      <div class="client-pill">Prepared for: <span>${escapeHtml(nameValue)}</span></div>
      <div class="badge">${escapeHtml(purposeLabel)}</div>
    </div>

    <div class="grid">
      ${cardsMarkup || `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">No products in this lookbook yet.</p>`}
    </div>
  </main>

  ${isReview ? `
  <div class="floating-bar">
    <div class="selection-counter"><strong id="countDisplay">0</strong> pieces selected</div>
    <button id="submitBtn" class="submit-btn" onclick="submitClientSelections()">Submit Selections for Review</button>
  </div>

  <script>
    function updateSelectedCount() {
      const checkboxes = document.querySelectorAll('.product-checkbox');
      let count = 0;
      checkboxes.forEach(cb => {
        const noteBox = document.getElementById('note-box-' + cb.value);
        if (cb.checked) {
          count++;
          if (noteBox) noteBox.style.display = 'block';
        } else {
          if (noteBox) noteBox.style.display = 'none';
        }
      });
      document.getElementById('countDisplay').innerText = count;
    }

    async function submitClientSelections() {
      const checkboxes = document.querySelectorAll('.product-checkbox:checked');
      const selectedItems = Array.from(checkboxes).map(cb => {
        const noteInput = document.getElementById('note-' + cb.value);
        return {
          serial: cb.value,
          note: noteInput ? noteInput.value.trim() : ""
        };
      });

      if (selectedItems.length === 0) {
        alert("Please select at least one piece before submitting.");
        return;
      }

      const btn = document.getElementById('submitBtn');
      btn.innerText = "Submitting to Studio...";
      btn.disabled = true;

      const selectedSerials = selectedItems.map(item => item.serial);
      const notesSummary = selectedItems.filter(item => item.note).map(item => item.serial + ": " + item.note).join("; ");

      try {
        const payload = {
          action: "submitReview",
          status: "Under Review",
          color: "#FFF2CC",
          reviewerName: "${escapeHtml(nameValue)}",
          selectedSerials: selectedSerials,
          clientNotes: notesSummary,
          timestamp: new Date().toISOString()
        };

        await fetch("${currentApiUrl}", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        btn.innerText = "Selections Submitted ✓";
        btn.style.background = "#2e7d32";

        const messageText = encodeURIComponent("Hi Ascend Studio, I (" + "${escapeHtml(nameValue)}" + ") have confirmed my selections for " + selectedSerials.length + " piece(s): " + selectedSerials.join(", ") + (notesSummary ? " | Notes: " + notesSummary : ""));
        const waUrl = "https://wa.me/?text=" + messageText;

        if (confirm("Thank you! Your selections have been submitted for studio review.\n\nWould you like to open WhatsApp to send an instant confirmation message to the studio?")) {
          window.open(waUrl, "_blank");
        }
      } catch (err) {
        console.error(err);
        alert("Selections recorded successfully! Your Final Selection Tray is being prepared by the studio.");
        btn.innerText = "Submitted ✓";
        btn.style.background = "#2e7d32";
      }
    }
  </script>
  ` : ""}

  <footer>
    &copy; 2026 ASCEND High Jewelry Studio &bull; Private Client Digital Handoff
  </footer>
</body>
</html>`;
  }

  function gatherMiniWebsiteMeta() {
    const nameInput = document.getElementById("miniWebsiteNameInput");
    const purposeSelect = document.getElementById("miniWebsitePurposeSelect");
    const name = (nameInput ? nameInput.value : "").trim();
    const purpose = purposeSelect ? purposeSelect.value : "review";
    setMiniWebsiteMeta(name, purpose);
    return { name: miniWebsiteMeta.name, purpose: miniWebsiteMeta.purpose };
  }

  async function exportMiniWebsite(meta = null) {
    if (typeof showSpinner === 'function') showSpinner(true);

    try {
      if (!selected || !selected.length) {
        alert("Select products first, then share the Client Lookbook.");
        return;
      }

      const resolvedMeta = meta || gatherMiniWebsiteMeta();
      const inventoryItems = Array.isArray(data) && data.length
        ? data
        : (typeof getInventoryForExport === 'function' ? await getInventoryForExport() : []);
      
      const selectedSerials = Array.isArray(selected) ? selected.filter(Boolean) : [];

      const html = buildMiniWebsiteHtml(inventoryItems, selectedSerials, resolvedMeta);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const fileName = `ascend-client-lookbook-${Date.now()}.html`;

      if (typeof openBlobPreview === 'function') openBlobPreview(blob, fileName);
      if (typeof triggerBlobDownload === 'function') triggerBlobDownload(blob, fileName);
      
      closeMiniWebsiteModal();

      alert(`Client Lookbook generated for ${resolvedMeta.name || "Valued Client"} with ${selected.length} piece${selected.length === 1 ? "" : "s"}.`);
    } catch (err) {
      console.error(err);
      alert("Unable to create Client Lookbook. Please try again.");
    } finally {
      if (typeof showSpinner === 'function') showSpinner(false);
    }
  }

  function createMiniWebsiteFromModal() {
    exportMiniWebsite(gatherMiniWebsiteMeta());
  }

  // Export both primary names and legacy aliases for backwards compatibility
  window.exportClientLookbook = exportMiniWebsite;
  window.openClientLookbookModal = openMiniWebsiteModal;
  window.closeClientLookbookModal = closeMiniWebsiteModal;
  window.createClientLookbookFromModal = createMiniWebsiteFromModal;

  window.exportMiniWebsite = exportMiniWebsite;
  window.openMiniWebsiteModal = openMiniWebsiteModal;
  window.closeMiniWebsiteModal = closeMiniWebsiteModal;
  window.createMiniWebsiteFromModal = createMiniWebsiteFromModal;
  window.updateMiniWebsiteModalPreview = updateMiniWebsiteModalPreview;
})();
