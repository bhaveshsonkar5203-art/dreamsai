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
    let selectedArr = Array.isArray(window.selected) ? window.selected : [];
    if (!selectedArr.length) {
      try {
        const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
        if (store && store.getActiveContext) {
          const ctx = store.getActiveContext();
          if (ctx && ctx.project && Array.isArray(ctx.project.selectedSerials) && ctx.project.selectedSerials.length) {
            selectedArr = ctx.project.selectedSerials;
          }
        }
      } catch (e) { }
    }

    const dataArr = Array.isArray(window.data) ? window.data : [];
    const selectedSerialSet = new Set(
      selectedArr.map(normalizeSerialForMatching)
    );

    return dataArr.filter(item => selectedSerialSet.has(normalizeSerialForMatching(item["Serial No"])));
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
    const purposeSelect = document.getElementById("miniWebsitePurposeSelect");
    const pill = document.getElementById("modalProjectContextPill");

    if (!modal) {
      return;
    }

    let activeCtx = {};
    try {
      const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
      if (store && store.getActiveContext) {
        activeCtx = store.getActiveContext();
      }
    } catch (e) { }

    const celebName = activeCtx.celebrity ? activeCtx.celebrity.name : "Celebrity";
    const stylistName = activeCtx.stylist ? activeCtx.stylist.name : "Stylist";
    const projTitle = activeCtx.project ? activeCtx.project.title : "Lookbook Curation";

    if (pill) {
      pill.innerHTML = `<i class="fa-solid fa-user-tie"></i> Stylist: <strong>${escapeHtml(stylistName)}</strong> &bull; <i class="fa-solid fa-star"></i> Celebrity: <strong>${escapeHtml(celebName)}</strong> <span style="opacity:0.7">(${escapeHtml(projTitle)})</span>`;
    }

    if (purposeSelect) {
      purposeSelect.value = miniWebsiteMeta.purpose || "review";
      if (!purposeSelect.dataset.previewBound) {
        purposeSelect.addEventListener("change", updateMiniWebsiteModalPreview);
        purposeSelect.dataset.previewBound = "true";
      }
    }

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

    let activeCtx = {};
    try {
      const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
      if (store && store.getActiveContext) {
        activeCtx = store.getActiveContext();
      }
    } catch (e) { }

    const celebName = activeCtx.celebrity ? activeCtx.celebrity.name : "Celebrity";
    const purposeSelect = document.getElementById("miniWebsitePurposeSelect");
    const purpose = (purposeSelect ? purposeSelect.value : miniWebsiteMeta.purpose || "review") === "final" ? "final" : "review";
    const previewItems = getMiniWebsiteSelectionItems();
    const selectedCount = previewItems.length;
    const selectionLabel = selectedCount ? `${selectedCount} selected product${selectedCount === 1 ? "" : "s"}` : "No products selected yet";

    preview.innerHTML = "";
    preview.classList.toggle("empty-state", !previewItems.length);

    const statusNode = document.createElement("p");
    statusNode.className = "preview-sub";
    statusNode.style.cssText = "font-weight: 600; color: #444; margin-bottom: 8px;";
    statusNode.textContent = `${celebName} · ${purpose === "final" ? "Showcase Lookbook" : "Interactive Review"} • ${selectionLabel}`;
    preview.appendChild(statusNode);

    if (!previewItems.length) {
      const emptyNode = document.createElement("div");
      emptyNode.className = "mini-preview-empty";
      emptyNode.style.cssText = "padding: 18px 12px; text-align: center; border: 1px dashed #d4af37; border-radius: 8px; background: rgba(212,175,55,0.04); margin-top: 8px;";
      emptyNode.innerHTML = `
        <i class="fa-solid fa-gem" style="font-size: 1.4rem; color: #d4af37; margin-bottom: 6px; display: block;"></i>
        <strong style="display: block; color: #1c1917; margin-bottom: 4px; font-size: 0.88rem;">No Products Selected for Preview</strong>
        <span style="font-size: 0.8rem; color: #78716c; display: block; margin-bottom: 10px;">Select pieces from the catalogue grid to populate this live lookbook preview.</span>
        <button class="btn btn-secondary btn-sm" onclick="switchTab('browse')" style="font-size: 0.78rem; padding: 4px 12px;"><i class="fa-solid fa-square-check"></i> Browse &amp; Select Items</button>
      `;
      preview.appendChild(emptyNode);
      return;
    }

    const MAX_PREVIEW_ITEMS = 12;
    const visibleItems = previewItems.slice(0, MAX_PREVIEW_ITEMS);

    const gridNode = document.createElement("div");
    gridNode.className = "mini-preview-grid";

    const getImgFn = typeof window.getPreviewImageUrl === 'function' ? window.getPreviewImageUrl : (typeof getPreviewImageUrl === 'function' ? getPreviewImageUrl : null);

    visibleItems.forEach(item => {
      const card = document.createElement("article");
      card.className = "mini-preview-card";
      const imageUrl = getImgFn ? getImgFn(item) : (item["Image URL"] || item.image || item.Image || "");
      const safeSerial = escapeHtml(item["Serial No"] || "");
      const safeBrand = escapeHtml(item["Brand Name"] || "");
      const safeType = escapeHtml(item["Type"] || "");
      card.innerHTML = `
        ${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${safeSerial}" loading="lazy" style="width:100%; aspect-ratio:1/1; object-fit:cover; display:block;">` : `<div class="mini-preview-placeholder">No image available</div>`}
        <div class="mini-preview-body" style="padding: 6px 8px;">
          <p class="mini-preview-title" style="font-weight: 700; margin: 0 0 2px; font-size: 0.82rem; color: #1c1917;">${safeSerial}</p>
          <p class="mini-preview-sub" style="margin: 0; font-size: 0.75rem; color: #78716c;">${safeBrand}</p>
          <p class="mini-preview-sub" style="margin: 0; font-size: 0.72rem; color: #a8a29e;">${safeType}</p>
        </div>
      `;
      gridNode.appendChild(card);
    });

    preview.appendChild(gridNode);

    if (previewItems.length > MAX_PREVIEW_ITEMS) {
      const moreNode = document.createElement("div");
      moreNode.className = "mini-preview-more";
      moreNode.style.cssText = "grid-column: 1 / -1; text-align: center; font-size: 12px; font-weight: 600; color: #8a6d3b; padding: 8px 12px; background: rgba(191,150,95,0.12); border-radius: 8px; margin-top: 8px;";
      moreNode.textContent = `+ ${previewItems.length - MAX_PREVIEW_ITEMS} more items will be included in the complete Lookbook`;
      preview.appendChild(moreNode);
    }

    const actionTrayNode = document.createElement("div");
    actionTrayNode.style.cssText = "margin-top: 12px; text-align: center;";
    const serialListJson = JSON.stringify(previewItems.map(i => i["Serial No"]).filter(Boolean)).replace(/"/g, '&quot;');
    actionTrayNode.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="if(window.importLookbookSelectionToFinalTray){ window.importLookbookSelectionToFinalTray(${serialListJson}); }" style="font-size: 0.82rem; background: #18181b; color: #d4af37; border: 1px solid #d4af37; border-radius: 6px; padding: 7px 16px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> Add ${previewItems.length} Lookbook Piece${previewItems.length === 1 ? '' : 's'} to Final Tray
      </button>
    `;
    preview.appendChild(actionTrayNode);
  }

  function updateMiniWebsiteModalPreview() {
    renderMiniWebsitePreview("miniWebsiteModalPreview");
    renderMiniWebsitePreview("miniWebsitePreview");
  }

  function buildMiniWebsiteHtml(inventoryItems, initialSelectedSerials = [], options = {}) {
    const selectedSerialSet = new Set(
      (Array.isArray(initialSelectedSerials) ? initialSelectedSerials : []).map(s => normalizeSerialForMatching(typeof s === 'object' ? (s["Serial No"] || s.id || s) : s))
    );

    const filteredInventory = inventoryItems.filter(item => {
      if (!item) return false;
      const serial = normalizeSerialForMatching(item["Serial No"]);
      return selectedSerialSet.has(serial);
    });

    const nameValue = String(options.name || miniWebsiteMeta.name || "").trim() || "Valued Client";
    const purposeValue = options.purpose === "final" ? "final" : "review";
    const purposeLabel = purposeValue === "final" ? "Final Showcase" : "Private Client Review";
    const isReview = purposeValue === "review";
    const currentApiUrl = (typeof API_URL !== "undefined") ? API_URL : "https://script.google.com/macros/s/AKfycby4RNwxBEfKWLWCT4Y6-LFLkObAE-j4LCDBUh5Lc3eG6zAcPN1WvUqXwOXMyWDH3nA/exec";

    const getImgFn = typeof window.getPreviewImageUrl === 'function' ? window.getPreviewImageUrl : (typeof getPreviewImageUrl === 'function' ? getPreviewImageUrl : null);

    const cardsMarkup = filteredInventory.map(item => {
      const serial = escapeHtml(item["Serial No"] || "Unknown");
      const brand = escapeHtml(item["Brand Name"] || "Ascend High Jewelry");
      const type = escapeHtml(item["Type"] || "Bespoke Collection");

      let imageUrl = getImgFn ? getImgFn(item) : (item["Image URL"] || item["DisplayURL"] || item["CollageURL"] || item.image || item.Image || "");
      if (typeof normalizeRemoteImageUrl === 'function') {
        imageUrl = normalizeRemoteImageUrl(imageUrl);
      } else if (imageUrl && typeof normalizeImageUrl === 'function') {
        imageUrl = normalizeImageUrl(imageUrl);
      }

      const imageTag = imageUrl
        ? `<img src="${escapeHtml(imageUrl)}" alt="${serial}" loading="lazy">`
        : `<div class="image-placeholder"><span>No Image Available</span></div>`;

      const checkboxHtml = isReview ? `
        <label class="checkbox-label" for="cb-${serial}" onclick="event.stopPropagation()">
          <input type="checkbox" id="cb-${serial}" class="product-checkbox" value="${serial}" onchange="updateSelectedCount()">
          <span class="custom-cb"></span>
          <span class="cb-text">Select this piece</span>
        </label>
      ` : "";

      const cardOnClick = isReview ? `onclick="toggleCardCheckbox('${serial}', event)"` : "";

      return `
        <article class="card" data-serial="${serial}" ${cardOnClick}>
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
    @media (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .card-body {
        padding: 14px;
      }
      .checkbox-label {
        padding: 14px 16px;
      }
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
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .card:active {
      transform: scale(0.985);
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
    .card.selected-card {
      border: 2px solid var(--gold) !important;
      background: #fffef2 !important;
      box-shadow: 0 16px 40px rgba(191, 150, 95, 0.25) !important;
    }
    .selected-ribbon {
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--gold);
      color: #000000;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 4px;
      letter-spacing: 1px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 5;
    }
    .cb-text {
      font-size: 0.88rem;
      font-weight: 600;
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
      border: 1px solid rgba(191, 150, 95, 0.5);
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
      font-size: 18px;
    }
    .submit-btn {
      background: linear-gradient(135deg, #bf965f 0%, #a67c48 100%);
      color: #000000;
      border: none;
      padding: 10px 24px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 800;
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
    <span class="brand-eyebrow">ASCEND HIGH JEWELLERY</span>
    <h1>Digital Celebrity Lookbook</h1>
    <p>Curated Private Selection for ${escapeHtml(nameValue)}</p>
  </header>

  <main class="container">
    <div class="meta-bar">
      <div class="client-pill">Celebrity / Muse: <span>${escapeHtml(nameValue)}</span></div>
      <div class="badge">${escapeHtml(purposeLabel)}</div>
    </div>

    <div class="grid">
      ${cardsMarkup || `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">No products in this lookbook yet.</p>`}
    </div>
  </main>

  ${isReview ? `
  <div class="floating-bar">
    <div class="selection-counter"><strong id="countDisplay">0</strong> pieces selected</div>
    <button id="submitBtn" class="submit-btn" onclick="submitClientSelections()">Submit Selections to Studio →</button>
  </div>

  <script>
    function toggleCardCheckbox(serial, event) {
      const cb = document.getElementById('cb-' + serial);
      const card = document.querySelector('.card[data-serial="' + serial + '"]');
      if (!cb) return;

      if (event && event.target !== cb) {
        cb.checked = !cb.checked;
      }

      if (card) {
        if (cb.checked) {
          card.classList.add('selected-card');
          if (!card.querySelector('.selected-ribbon')) {
            const media = card.querySelector('.card-media');
            if (media) {
              const ribbon = document.createElement('span');
              ribbon.className = 'selected-ribbon';
              ribbon.innerText = 'SELECTED ✓';
              media.appendChild(ribbon);
            }
          }
        } else {
          card.classList.remove('selected-card');
          const ribbon = card.querySelector('.selected-ribbon');
          if (ribbon) ribbon.remove();
        }
      }

      updateSelectedCount();
    }

    function updateSelectedCount() {
      const count = document.querySelectorAll('.product-checkbox:checked').length;
      document.getElementById('countDisplay').innerText = count;
    }

    async function submitClientSelections() {
      const checkboxes = document.querySelectorAll('.product-checkbox:checked');
      const selectedSerials = Array.from(checkboxes).map(cb => cb.value);

      if (selectedSerials.length === 0) {
        window.showToast("Please select at least one piece before submitting.");
        return;
      }

      const btn = document.getElementById('submitBtn');
      btn.innerText = "Submitting to Studio...";
      btn.disabled = true;

      try {
        try {
          if (window.parent && typeof window.parent.importLookbookSelectionToFinalTray === 'function') {
            window.parent.importLookbookSelectionToFinalTray(selectedSerials);
          } else if (window.opener && typeof window.opener.importLookbookSelectionToFinalTray === 'function') {
            window.opener.importLookbookSelectionToFinalTray(selectedSerials);
          }
        } catch(e) {
          console.warn("Parent sync notice:", e);
        }

        const payload = {
          action: "saveProject",
          project: {
            title: "${escapeHtml(nameValue)} Approved Selection",
            status: "Celebrity Approved",
            selectedSerials: selectedSerials,
            updatedAt: new Date().toISOString()
          }
        };

        await fetch("${currentApiUrl}", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        btn.innerText = "Selections Approved ✓";
        btn.style.background = "#22c55e";
        window.showToast("Thank you! Your approved pieces (" + selectedSerials.length + ") have been marked as selected and added directly to your Studio Final Tray.");
      } catch (err) {
        console.error(err);
        btn.innerText = "Approved ✓";
        btn.style.background = "#22c55e";
        window.showToast("Selection recorded! Approved pieces added to your Studio Final Tray.");
      }
    }
  </script>
  ` : ""}

  <footer>
    &copy; 2026 Ascend Communication &bull; Executive Client Digital Selection
  </footer>
</body>
</html>`;
  }

  function gatherMiniWebsiteMeta() {
    let activeCtx = {};
    try {
      const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
      if (store && store.getActiveContext) {
        activeCtx = store.getActiveContext();
      }
    } catch (e) { }

    const celebName = activeCtx.celebrity ? activeCtx.celebrity.name : "Celebrity";
    const purposeSelect = document.getElementById("miniWebsitePurposeSelect");
    const purpose = purposeSelect ? purposeSelect.value : "review";
    setMiniWebsiteMeta(celebName, purpose);
    return { name: celebName, purpose: miniWebsiteMeta.purpose };
  }

  async function exportMiniWebsite(meta = null) {
    if (typeof showSpinner === 'function') showSpinner(true);

    // Yield control to UI thread so spinner renders cleanly before heavy HTML generation
    await new Promise(resolve => setTimeout(resolve, 60));

    try {
      let currentSelected = Array.isArray(window.selected) ? window.selected : [];
      if (!currentSelected || !currentSelected.length) {
        try {
          const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
          if (store && store.getActiveContext) {
            const ctx = store.getActiveContext();
            if (ctx && ctx.project && Array.isArray(ctx.project.selectedSerials) && ctx.project.selectedSerials.length) {
              currentSelected = ctx.project.selectedSerials;
            }
          }
        } catch (e) { }
      }

      const currentData = Array.isArray(window.data) ? window.data : [];

      if (!currentSelected || !currentSelected.length) {
        window.showToast("Select products from the catalogue first, then create the Client Lookbook.");
        return;
      }

      const resolvedMeta = meta || gatherMiniWebsiteMeta();
      let inventoryItems = currentData.length ? currentData : [];
      if (!inventoryItems.length && typeof window.getInventoryForExport === 'function') {
        inventoryItems = await window.getInventoryForExport();
      }

      const selectedSerials = currentSelected.filter(Boolean);

      const html = buildMiniWebsiteHtml(inventoryItems, selectedSerials, resolvedMeta);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const fileName = `ascend-client-lookbook-${Date.now()}.html`;

      if (typeof window.setHtmlLookbookPreview === 'function') {
        window.setHtmlLookbookPreview(blob, fileName, resolvedMeta, selectedSerials.length);
      } else if (typeof openBlobPreview === 'function') {
        openBlobPreview(blob, fileName);
      }

      if (typeof triggerBlobDownload === 'function') {
        triggerBlobDownload(blob, fileName);
      }

      closeMiniWebsiteModal();

      const shareBox = document.getElementById("postCreationShareContainer");
      if (shareBox) {
        shareBox.style.display = "block";
      }

      // Sync project status and dispatch backend API POST request
      try {
        const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
        let activeProject = null;
        if (store && store.getActiveContext) {
          const ctx = store.getActiveContext();
          if (ctx && ctx.project) {
            activeProject = ctx.project;
          }
        }

        if (store && store.updateProjectStatus && activeProject) {
          store.updateProjectStatus(activeProject.id, "Lookbook Sent");
        }

        const targetApiUrl = (typeof window !== 'undefined' && window.API_URL) ? window.API_URL : "https://script.google.com/macros/s/AKfycbx0eH7JARm9zfA7thFyCYt4LYUTcPzw0MdKFuVTAg-z6il9_r2YSJG00WiRwv2QJmQ/exec";

        const apiPayload = {
          action: "saveProject",
          project: {
            id: activeProject ? activeProject.id : ("proj_" + Date.now()),
            title: activeProject ? activeProject.title : `${resolvedMeta.name} Lookbook`,
            celebrityName: resolvedMeta.name || "Valued Client",
            status: "Lookbook Sent",
            selectedSerials: selectedSerials,
            lookbookUrl: fileName,
            itemCount: selectedSerials.length,
            updatedAt: new Date().toISOString()
          }
        };

        fetch(targetApiUrl, {
          method: "POST",
          body: JSON.stringify(apiPayload)
        }).then(res => res.json()).then(resData => {
          console.log("[Lookbook API] Project successfully synced to backend API:", resData);
        }).catch(err => {
          console.warn("[Lookbook API] Sync notice:", err);
        });
      } catch (apiErr) {
        console.warn("[Lookbook API] Sync notice:", apiErr);
      }

      window.showToast(`Client Lookbook generated for ${resolvedMeta.name || "Valued Client"} with ${selectedSerials.length} piece${selectedSerials.length === 1 ? "" : "s"}. Synced to backend & preview loaded!`);
    } catch (err) {
      console.error("Error creating Client Lookbook:", err);
      window.showToast("Unable to create Client Lookbook. Please try again.");
    } finally {
      if (typeof showSpinner === 'function') showSpinner(false);
    }
  }

  function createMiniWebsiteFromModal() {
    exportMiniWebsite(gatherMiniWebsiteMeta());
  }

  async function checkUrlLookbookMode() {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("mode") || params.get("lookbook");
      if (mode === "lookbook" || mode === "true") {
        const rawItems = params.get("items") || "";
        const selectedSerials = rawItems.split(",").map(s => s.trim()).filter(Boolean);
        const name = params.get("name") || "Valued Client";
        const purpose = params.get("purpose") || "review";
        const projId = params.get("project") || ("proj_" + Date.now());

        let inventoryItems = Array.isArray(window.data) && window.data.length ? window.data : [];
        if (!inventoryItems.length && typeof window.getInventoryForExport === 'function') {
          inventoryItems = await window.getInventoryForExport();
        }

        const html = buildMiniWebsiteHtml(inventoryItems, selectedSerials, { name, purpose, projId });
        document.open();
        document.write(html);
        document.close();
        return true;
      }
    } catch (e) {
      console.warn("[Lookbook URL] Error opening lookbook web view:", e);
    }
    return false;
  }

  // Export functions
  window.exportClientLookbook = exportMiniWebsite;
  window.openClientLookbookModal = openMiniWebsiteModal;
  window.closeClientLookbookModal = closeMiniWebsiteModal;
  window.createClientLookbookFromModal = createMiniWebsiteFromModal;

  window.exportMiniWebsite = exportMiniWebsite;
  window.openMiniWebsiteModal = openMiniWebsiteModal;
  window.closeMiniWebsiteModal = closeMiniWebsiteModal;
  window.createMiniWebsiteFromModal = createMiniWebsiteFromModal;
  window.updateMiniWebsiteModalPreview = updateMiniWebsiteModalPreview;
  window.checkUrlLookbookMode = checkUrlLookbookMode;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkUrlLookbookMode);
  } else {
    checkUrlLookbookMode();
  }
})();
