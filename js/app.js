import * as ProjectStore from './modules/project-store.js';
import { initProjectUI, renderProjectBar } from './modules/project-ui.js';

let data = [];
let selected = [];

Object.defineProperty(window, 'selected', {
  get: () => selected,
  set: (val) => { selected = val; },
  configurable: true
});

Object.defineProperty(window, 'data', {
  get: () => data,
  set: (val) => { data = val; },
  configurable: true
});
let lastBlob = null;
let collageBlobs = [];
let lastExportItems = [];
let lastExportTitle = "Jewellery Catalogue";
let lastExportKind = "none";
let lastPdfBlob = null;
let lastPdfUrl = "";
let gridCurrentPage = 1;
let gridPageSize = 36;
let selectedCurrentPage = 1;
let selectedPageSize = 24;
let lastSearchQuery = "";
let lastSortBy = "";
let controlsCollapsed = false;
let finalTraySerials = [];
let finalTraySuggestionIndex = -1;
let dataBySerial = new Map();

const API_URL = "https://script.google.com/macros/s/AKfycbx0eH7JARm9zfA7thFyCYt4LYUTcPzw0MdKFuVTAg-z6il9_r2YSJG00WiRwv2QJmQ/exec";
const APP_BUILD_TAG = "script-20260410-guard-logs-1";

function traceFinalTray(step, details) {
  const stamp = new Date().toISOString();
  if (details === undefined) {
    console.log(`[FinalTray ${stamp}] ${step}`);
    return;
  }
  console.log(`[FinalTray ${stamp}] ${step}`, details);
}

function syncCurrentSelectionToProject() {
  const { project } = ProjectStore.getActiveContext();
  if (project) {
    ProjectStore.updateProjectItems(project.id, selected);
    renderProjectBar();
    if (typeof window.renderHomepageProjectsSection === 'function') {
      window.renderHomepageProjectsSection();
    }
  }
}

// Initialize Project Bar & Workspace
initProjectUI({
  onProjectSwitch: (project) => {
    selected = project && project.selectedSerials ? [...project.selectedSerials] : [];
    updateTabBadge();
    render();
    if (typeof window.renderHomepageProjectsSection === 'function') {
      window.renderHomepageProjectsSection();
    }
  }
});

// Load active project items into selection
const { project: initialActiveProject } = ProjectStore.getActiveContext();
if (initialActiveProject && Array.isArray(initialActiveProject.selectedSerials)) {
  selected = [...initialActiveProject.selectedSerials];
}

/* FETCH DATA */
initFinalTrayUi();
loadData();

async function loadData() {
  const statSelectedNode = document.getElementById("statSelected");
  if (statSelectedNode) {
    statSelectedNode.innerText = selected.length;
  }
  const vraiCartBadge = document.getElementById("vraiNavCartCount");
  if (vraiCartBadge) {
    vraiCartBadge.innerText = selected.length;
  }

  const hideMarkedNode = document.getElementById("hideMarked");
  if (hideMarkedNode) {
    hideMarkedNode.checked = true;
  }

  const res = await fetch(API_URL);
  const json = await res.json();
  data = Array.isArray(json) ? json : (json.data || []);
  rebuildDataIndex();
  selected = selected.filter(id => {
    const item = dataBySerial.get(id);
    return item && normalizeStatus(item["Status"]) !== "marked";
  });
  initFilter();
  render();
  renderFinalTraySerialManager();
  updateMiniWebsiteModalPreview();
}

async function getInventoryForExport() {
  if (Array.isArray(data) && data.length) {
    return data;
  }

  const res = await fetch(API_URL);
  const json = await res.json();
  return Array.isArray(json) ? json : (json.data || []);
}

window.getInventoryForExport = getInventoryForExport;


function updateTabBadge() {
  renderFloatingSelectionBar();
  const badge = document.getElementById("browseTabBadge");
  if (badge) {
    if (selected.length > 0) {
      badge.textContent = `${selected.length}`;
    } else {
      badge.textContent = "";
    }
  }
}

window.updateTabBadge = updateTabBadge;

function toggleControlsCollapse() {
  const content = document.getElementById("controlsContent");
  const btn = document.getElementById("collapseBtn");
  
  if (!content || !btn) {
    return;
  }
  
  controlsCollapsed = !controlsCollapsed;
  content.classList.toggle("collapsed", controlsCollapsed);
  btn.textContent = controlsCollapsed ? "+" : "−";
  btn.title = controlsCollapsed ? "Expand controls" : "Collapse controls";
}

function toggleFilterMenu(event) {
  if (event) {
    event.stopPropagation();
  }
  const menu = document.getElementById("controlsContent");
  const btn = document.getElementById("filterToggleBtn");
  if (!menu || !btn) {
    return;
  }

  const willOpen = menu.classList.contains("hidden");
  menu.classList.toggle("hidden");

  if (willOpen) {
    positionFilterMenu(menu, btn);
  }
}

function toggleBreakdown(event) {
  if (event) {
    event.stopPropagation();
  }
  const node = document.getElementById("countSummary");
  const btn = document.getElementById("breakdownToggleBtn");
  if (!node || !btn) {
    return;
  }
  const isHidden = node.classList.contains("hidden");
  node.classList.toggle("hidden");
  btn.textContent = isHidden ? "Hide brand & type breakdown" : "View brand & type breakdown";
}

window.toggleBreakdown = toggleBreakdown;

function positionFilterMenu(menu, btn) {
  const rect = btn.getBoundingClientRect();
  const menuWidth = menu.offsetWidth || 420;
  const margin = 16;

  let left = rect.right - menuWidth;
  left = Math.max(margin, Math.min(left, window.innerWidth - menuWidth - margin));

  let top = rect.bottom + 10;
  const menuHeight = menu.offsetHeight || 300;
  if (top + menuHeight > window.innerHeight - margin) {
    top = Math.max(margin, rect.top - menuHeight - 10);
  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

window.addEventListener("resize", () => {
  const menu = document.getElementById("controlsContent");
  const btn = document.getElementById("filterToggleBtn");
  if (menu && btn && !menu.classList.contains("hidden")) {
    positionFilterMenu(menu, btn);
  }
});

window.toggleFilterMenu = toggleFilterMenu;

document.addEventListener("click", (event) => {
  const menu = document.getElementById("controlsContent");
  const wrap = document.querySelector(".filter-menu-wrap");
  if (!menu || !wrap) {
    return;
  }
  if (!menu.classList.contains("hidden") && !wrap.contains(event.target)) {
    menu.classList.add("hidden");
  }
});

window.toggleControlsCollapse = toggleControlsCollapse;

function updateFilterDropdowns(changedSource = "") {
  const filterTypeNode = document.getElementById("filterType");
  const filterBrandNode = document.getElementById("filterBrand");
  const filterStatusNode = document.getElementById("filterStatus");
  const hideMarkedNode = document.getElementById("hideMarked");
  const searchSerialNode = document.getElementById("searchSerial");

  const currentType = filterTypeNode ? filterTypeNode.value : "";
  const currentBrand = filterBrandNode ? filterBrandNode.value : "";
  const currentStatus = filterStatusNode ? filterStatusNode.value : "";
  const hideMarked = hideMarkedNode ? hideMarkedNode.checked : false;
  const searchQuery = searchSerialNode ? searchSerialNode.value.trim().toUpperCase() : "";

  function matches(item, ignoreType = false, ignoreBrand = false) {
    const status = normalizeStatus(item["Status"]);
    if (hideMarked && status === "marked") return false;
    if (currentStatus === "marked" && status !== "marked") return false;
    if (currentStatus === "unmarked" && status === "marked") return false;
    if (searchQuery && !String(item["Serial No"] || "").toUpperCase().includes(searchQuery)) return false;

    if (!ignoreType && currentType && String(item["Type"] || "").trim() !== currentType) return false;
    if (!ignoreBrand && currentBrand && String(item["Brand Name"] || "").trim() !== currentBrand) return false;

    return true;
  }

  // Type counts matching active Brand + Status + Search
  const typeCounts = new Map();
  data.forEach(item => {
    if (matches(item, true, false)) {
      const type = String(item["Type"] || "").trim();
      if (type) {
        typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
      }
    }
  });

  // Brand counts matching active Type + Status + Search
  const brandCounts = new Map();
  data.forEach(item => {
    if (matches(item, false, true)) {
      const brand = String(item["Brand Name"] || "").trim();
      if (brand) {
        brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
      }
    }
  });

  // Re-populate Type select options dynamically
  if (filterTypeNode) {
    const allTypes = Array.from(new Set(data.map(i => String(i["Type"] || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    const totalMatchingType = data.filter(i => matches(i, true, false)).length;
    let typeHtml = `<option value="">All Types (${totalMatchingType})</option>`;
    allTypes.forEach(t => {
      const count = typeCounts.get(t) || 0;
      typeHtml += `<option value="${t}">${t} (${count})</option>`;
    });
    filterTypeNode.innerHTML = typeHtml;
    if (currentType && allTypes.includes(currentType)) {
      filterTypeNode.value = currentType;
    }
  }

  // Re-populate Brand select options dynamically
  if (filterBrandNode) {
    const allBrands = Array.from(new Set(data.map(i => String(i["Brand Name"] || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    const totalMatchingBrand = data.filter(i => matches(i, false, true)).length;
    let brandHtml = `<option value="">All Brands (${totalMatchingBrand})</option>`;
    allBrands.forEach(b => {
      const count = brandCounts.get(b) || 0;
      brandHtml += `<option value="${b}">${b} (${count})</option>`;
    });
    filterBrandNode.innerHTML = brandHtml;
    if (currentBrand && allBrands.includes(currentBrand)) {
      filterBrandNode.value = currentBrand;
    }
  }

  renderCategoryBar(typeCounts);
  renderCountSummary(brandCounts, typeCounts);
  updateFilterActiveBadge();
  updateSelectButtonLabel();
}

function updateFilterActiveBadge() {
  const filterType = document.getElementById("filterType")?.value || "";
  const filterBrand = document.getElementById("filterBrand")?.value || "";
  const filterStatus = document.getElementById("filterStatus")?.value || "";
  const searchQuery = document.getElementById("searchSerial")?.value.trim() || "";

  let count = 0;
  if (filterType) count++;
  if (filterBrand) count++;
  if (filterStatus) count++;
  if (searchQuery) count++;

  const badge = document.getElementById("filterActiveBadge");
  if (badge) {
    if (count > 0) {
      badge.textContent = String(count);
      badge.classList.remove("hidden");
    } else {
      badge.textContent = "0";
      badge.classList.add("hidden");
    }
  }
}

function updateSelectButtonLabel() {
  const btn = document.getElementById("selectAllFilteredBtn") || document.querySelector("button[onclick='selectAllByBrand()']");
  if (!btn) return;

  const filterType = document.getElementById("filterType")?.value || "";
  const filterBrand = document.getElementById("filterBrand")?.value || "";

  const filtered = getFilteredItems();
  const unmarkedCount = filtered.filter(d => normalizeStatus(d["Status"]) !== "marked").length;

  if (filterBrand && filterType) {
    btn.textContent = `Select ${filterBrand} ${filterType}s (${unmarkedCount})`;
  } else if (filterBrand) {
    btn.textContent = `Select full ${filterBrand} (${unmarkedCount})`;
  } else if (filterType) {
    btn.textContent = `Select all ${filterType}s (${unmarkedCount})`;
  } else {
    btn.textContent = `Select matching items (${unmarkedCount})`;
  }
}

function renderCategoryBar(typeCounts) {
  const bar = document.getElementById("categoryBar");
  if (!bar) return;

  const filterTypeNode = document.getElementById("filterType");
  const activeType = filterTypeNode ? filterTypeNode.value : "";

  const allTypesSet = new Set(data.map(item => String(item["Type"] || "").trim()).filter(Boolean));
  const types = [...allTypesSet].sort((a, b) => a.localeCompare(b));

  let totalCount = 0;
  types.forEach(type => {
    totalCount += (typeCounts ? (typeCounts.get(type) || 0) : 0);
  });

  let html = `<button type="button" class="category-pill ${!activeType ? 'active' : ''}" onclick='selectCategory("")'>All <span class="count">${totalCount}</span></button>`;

  types.forEach(type => {
    const count = typeCounts ? (typeCounts.get(type) || 0) : 0;
    html += `<button type="button" class="category-pill ${activeType === type ? 'active' : ''}" onclick='selectCategory("${type.replace(/'/g, "\\'")}")'>${type} <span class="count">${count}</span></button>`;
  });

  bar.innerHTML = html;
}

function selectCategory(type) {
  const filterTypeNode = document.getElementById("filterType");
  if (filterTypeNode) {
    filterTypeNode.value = type;
  }
  onFilterChanged("type");
}

window.selectCategory = selectCategory;

/* FILTER INITIALIZATION */
function initFilter() {
  updateFilterDropdowns();
}

function renderCountSummary(brandCounts, typeCounts) {
  const summaryNode = document.getElementById("countSummary");
  if (!summaryNode) {
    return;
  }

  const topBrands = [...brandCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10);

  const allTypes = [...typeCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const renderPills = (entries) => entries
    .map(([name, count]) => `<span class="breakdown-pill">${name} <strong>${count}</strong></span>`)
    .join("");

  summaryNode.innerHTML = `
    <div class="breakdown-group">
      <p class="breakdown-label">Brands</p>
      <div class="breakdown-pills">${renderPills(topBrands) || '<span class="breakdown-pill">No brands found</span>'}</div>
    </div>
    <div class="breakdown-group">
      <p class="breakdown-label">Types</p>
      <div class="breakdown-pills">${renderPills(allTypes) || '<span class="breakdown-pill">No types found</span>'}</div>
    </div>
  `;
}

function updateDashboardStats(visibleCount) {
  const total = data.length;
  const marked = data.filter(item => normalizeStatus(item["Status"]) === "marked").length;
  const available = Math.max(0, total - marked);

  const totalNode = document.getElementById("statTotal");
  const availableNode = document.getElementById("statAvailable");
  const selectedNode = document.getElementById("statSelected");
  const markedNode = document.getElementById("statMarked");
  const summaryNode = document.getElementById("gridSummary");

  if (totalNode) totalNode.textContent = String(total);
  if (availableNode) availableNode.textContent = String(available);
  if (selectedNode) selectedNode.textContent = String(selected.length);
  if (markedNode) markedNode.textContent = String(marked);
  if (summaryNode) summaryNode.textContent = `${visibleCount} visible item${visibleCount === 1 ? "" : "s"}`;
  const headingNode = document.getElementById("gridSummaryHeading");
  if (headingNode) headingNode.textContent = `${visibleCount} visible item${visibleCount === 1 ? "" : "s"}`;
}

function onFilterChanged(source = "") {
  lastSearchQuery = document.getElementById("searchSerial") ? document.getElementById("searchSerial").value.trim().toUpperCase() : "";
  lastSortBy = document.getElementById("sortBy") ? document.getElementById("sortBy").value : "";
  gridCurrentPage = 1;
  updateFilterDropdowns(source);
  render();
}
window.onFilterChanged = onFilterChanged;
let searchDebounceTimer = null;
function onSearchInput() {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    onFilterChanged("search");
  }, 250);
}
window.onSearchInput = onSearchInput;

/* RENDER GRID */
function render() {
  let filtered = getFilteredItems();

  const pageCount = Math.max(1, Math.ceil(filtered.length / gridPageSize));
  if (gridCurrentPage > pageCount) {
    gridCurrentPage = pageCount;
  }

  const startIndex = (gridCurrentPage - 1) * gridPageSize;
  const pageItems = filtered.slice(startIndex, startIndex + gridPageSize);
  let html = "";

  const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  pageItems.forEach(item => {
    const status = normalizeStatus(item["Status"]);
    let isSelected = selected.includes(item["Serial No"]);
    const imageUrl = getPreviewImageUrl(item);
    const fallbackImageUrl = getPreviewFallbackImageUrl(item);
    const onErrorAttr = fallbackImageUrl
      ? `onerror=\"this.onerror=null;this.src='${fallbackImageUrl.replace(/'/g, "\\'")}';\"`
      : "";

    html += `
      <div class="card ${isSelected ? 'selected' : ''} ${status === "marked" ? "marked-card" : ""}" onclick='toggle("${item["Serial No"]}")'>
        <div class="card-media">
          <img src="${imageUrl}" loading="lazy" ${onErrorAttr}>
          <div class="select-indicator">${checkSvg}</div>
          <p class="card-label">${item["Serial No"]}</p>
        </div>
      </div>
    `;
  });

  document.getElementById("grid").innerHTML = html;
  updateDashboardStats(filtered.length);
  renderGridPager(filtered.length);
  renderSelected();
  updateMiniWebsiteModalPreview();
}

function renderGridPager(totalItems) {
  const pageInfo = document.getElementById("gridPageInfo");
  const prevBtn = document.querySelector("#gridPager .pager-btn:first-child");
  const nextBtn = document.querySelector("#gridPager .pager-btn:nth-child(3)");
  const pageSizeNode = document.getElementById("pageSize");

  if (pageSizeNode) {
    pageSizeNode.value = String(gridPageSize);
  }

  const pageCount = Math.max(1, Math.ceil(totalItems / gridPageSize));
  if (pageInfo) {
    pageInfo.textContent = `Page ${gridCurrentPage} of ${pageCount}`;
  }
  if (prevBtn) {
    prevBtn.disabled = gridCurrentPage <= 1;
  }
  if (nextBtn) {
    nextBtn.disabled = gridCurrentPage >= pageCount;
  }
}

/* TOGGLE */
function toggle(id) {
  const item = data.find(d => d["Serial No"] === id);
  if (item && normalizeStatus(item["Status"]) === "marked") {
    alert("This item is already marked and is not selectable.");
    return;
  }

  if (selected.includes(id)) {
    selected = selected.filter(x => x !== id);
  } else {
    selected.push(id);
  }
  syncCurrentSelectionToProject();
  updateTabBadge();
  render();
}

/* SELECTION PREVIEW */
function renderSelected() {
  let area = document.getElementById("selectedArea");
  const selectedItems = data.filter(d => selected.includes(d["Serial No"]));
  const summary = document.getElementById("selectedSummary");

  if (summary) {
    summary.textContent = `${selectedItems.length} selected item${selectedItems.length === 1 ? "" : "s"}`;
  }

  const vraiCartBadge = document.getElementById("vraiNavCartCount");
  if (vraiCartBadge) {
    vraiCartBadge.innerText = selectedItems.length;
  }

  const selectedPageCount = Math.max(1, Math.ceil(selectedItems.length / selectedPageSize));
  if (selectedCurrentPage > selectedPageCount) {
    selectedCurrentPage = selectedPageCount;
  }

  const selectedStart = (selectedCurrentPage - 1) * selectedPageSize;
  const selectedPageItems = selectedItems.slice(selectedStart, selectedStart + selectedPageSize);

  if (!selectedItems.length) {
    area.innerHTML = '<div class="selection-empty">No items selected yet. Choose pieces from the catalogue to prepare a PDF.</div>';
    renderSelectedPager(0);
    return;
  }

  area.innerHTML = selectedPageItems
    .map(item => {
      const primaryUrl = getPreviewImageUrl(item);
      const fallbackUrl = getPreviewFallbackImageUrl(item);
      const onErrorAttr = fallbackUrl
        ? `onerror=\"this.onerror=null;this.src='${fallbackUrl.replace(/'/g, "\\'")}';\"`
        : "";

      return `
      <div class="selection-card">
        <button class="remove-btn" onclick="removeFromSelected('${item["Serial No"].replace(/'/g, "\\'")}')" title="Remove from selection">✕</button>
        <div class="card-media">
          <img src="${primaryUrl}" alt="${item["Serial No"]}" loading="lazy" ${onErrorAttr}>
          <p class="card-label">${item["Serial No"]}</p>
        </div>
      </div>
    `;
    }).join("");

  renderSelectedPager(selectedItems.length);

  if (typeof window.updateMiniWebsiteModalPreview === 'function') {
    window.updateMiniWebsiteModalPreview();
  }
}

function renderSelectedPager(totalItems) {
  const pageInfo = document.getElementById("selectedPageInfo");
  const prevBtn = document.getElementById("selectedPrevBtn");
  const nextBtn = document.getElementById("selectedNextBtn");
  const pageSizeNode = document.getElementById("selectedPageSize");
  const pageCount = Math.max(1, Math.ceil(totalItems / selectedPageSize));

  if (pageSizeNode) {
    pageSizeNode.value = String(selectedPageSize);
  }

  if (pageInfo) {
    pageInfo.textContent = `Page ${selectedCurrentPage} of ${pageCount}`;
  }

  if (prevBtn) {
    prevBtn.disabled = selectedCurrentPage <= 1;
  }

  if (nextBtn) {
    nextBtn.disabled = selectedCurrentPage >= pageCount;
  }
}

function goToPrevPage() {
  if (gridCurrentPage <= 1) {
    return;
  }
  gridCurrentPage -= 1;
  render();
}

function goToNextPage() {
  const totalItems = getFilteredItems().length;
  const pageCount = Math.max(1, Math.ceil(totalItems / gridPageSize));
  if (gridCurrentPage >= pageCount) {
    return;
  }
  gridCurrentPage += 1;
  render();
}

function changePageSize(value) {
  const nextSize = Number(value);
  if (!Number.isFinite(nextSize) || nextSize <= 0) {
    return;
  }
  gridPageSize = nextSize;
  gridCurrentPage = 1;
  render();
}

function goToPrevSelectedPage() {
  if (selectedCurrentPage <= 1) {
    return;
  }
  selectedCurrentPage -= 1;
  renderSelected();
}

function goToNextSelectedPage() {
  const selectedItems = data.filter(d => selected.includes(d["Serial No"]));
  const pageCount = Math.max(1, Math.ceil(selectedItems.length / selectedPageSize));
  if (selectedCurrentPage >= pageCount) {
    return;
  }
  selectedCurrentPage += 1;
  renderSelected();
}

function changeSelectedPageSize(value) {
  const nextSize = Number(value);
  if (!Number.isFinite(nextSize) || nextSize <= 0) {
    return;
  }
  selectedPageSize = nextSize;
  selectedCurrentPage = 1;
  renderSelected();
}

function getFilteredItems() {
  const filterTypeNode = document.getElementById("filterType");
  const filterBrandNode = document.getElementById("filterBrand");
  const filterStatusNode = document.getElementById("filterStatus");
  const hideMarkedNode = document.getElementById("hideMarked");

  const filterType = filterTypeNode ? filterTypeNode.value : "";
  const filterBrand = filterBrandNode ? filterBrandNode.value : "";
  const filterStatus = filterStatusNode ? filterStatusNode.value : "";
  const hideMarked = hideMarkedNode ? hideMarkedNode.checked : false;

  let filtered = data.filter(d => {
    const status = normalizeStatus(d["Status"]);
    const typeMatch = !filterType || d["Type"] === filterType;
    const brandMatch = !filterBrand || String(d["Brand Name"] || "").trim() === filterBrand;

    if (!typeMatch || !brandMatch) {
      return false;
    }

    if (hideMarked && status === "marked") {
      return false;
    }

    if (filterStatus === "marked" && status !== "marked") {
      return false;
    }

    if (filterStatus === "unmarked" && status === "marked") {
      return false;
    }

    if (lastSearchQuery && !String(d["Serial No"] || "").toUpperCase().includes(lastSearchQuery)) {
      return false;
    }

    return true;
  });

  if (lastSortBy === "serial") {
    filtered.sort((a, b) => String(a["Serial No"] || "").localeCompare(String(b["Serial No"] || "")));
  } else if (lastSortBy === "brand") {
    filtered.sort((a, b) => String(a["Brand Name"] || "").localeCompare(String(b["Brand Name"] || "")));
  } else if (lastSortBy === "type") {
    filtered.sort((a, b) => String(a["Type"] || "").localeCompare(String(b["Type"] || "")));
  }

  return filtered;
}

window.goToPrevPage = goToPrevPage;
window.goToNextPage = goToNextPage;
window.changePageSize = changePageSize;
window.goToPrevSelectedPage = goToPrevSelectedPage;
window.goToNextSelectedPage = goToNextSelectedPage;
window.changeSelectedPageSize = changeSelectedPageSize;

/* GENERATE SELECTION PDF */
async function generateSelectionPdf() {
  if (selected.length === 0) {
    alert("Select items to prepare the PDF.");
    return;
  }

  if (selected.length > 300) {
    alert("Large export detected. Compact PDF mode will be used to keep generation stable for high item counts.");
  }

  showSpinner(true);

  try {
    const exportItems = data.filter(d => selected.includes(d["Serial No"]));
    let generatedBlobs;

    try {
      generatedBlobs = await buildAllCollagesOnServer(selected);
    } catch (serverErr) {
      console.warn("Server collage failed, using browser fallback", serverErr);
      const chunks = chunkArray(selected, 6);
      generatedBlobs = [];
      for (const chunkIds of chunks) {
        const items = data.filter(d => chunkIds.includes(d["Serial No"]));
        let blob = await buildCollageBlob(items);
        if (chunkIds.length < 6) {
          blob = await trimOuterWhitespaceOnly(blob);
        }
        generatedBlobs.push(blob);
      }
    }

    if (generatedBlobs.length === 0) {
      throw new Error("Unable to prepare the PDF pages");
    }

    // Collect items whose images could not be loaded (browser fallback only)
    const allMissingImages = generatedBlobs.flatMap(b => b._missingItems || []);

    collageBlobs = generatedBlobs;
    lastBlob = collageBlobs[0];
    lastExportItems = exportItems;
    lastExportTitle = "Client Catalogue";
    lastExportKind = "selection";
    lastPdfBlob = null;

    await rebuildPdfPreview();

    const pageNote = collageBlobs.length > 1 ? `${collageBlobs.length} pages prepared. ` : "";
    if (allMissingImages.length) {
      alert(`${pageNote}PDF ready.\n\n⚠️ ${allMissingImages.length} item${allMissingImages.length === 1 ? "" : "s"} had no loadable image and show a placeholder:\n${allMissingImages.join(", ")}`);
    } else if (collageBlobs.length > 1) {
      alert(`${pageNote}Preview updated.`);
    }

  } catch (err) {
    console.error(err);
    alert("Error preparing the PDF. Please try different images.");
  } finally {
    showSpinner(false);
  }
}

async function generateFinalTrayFromSerials() {
  let serials = [...finalTraySerials];

  if (!serials.length) {
    const serialInput = document.getElementById("finalTraySearchInput") || document.getElementById("serialBulkInput");
    if (serialInput && serialInput.value) {
      const parsed = serialInput.value.split(/[\s,;\n]+/).map(s => s.trim()).filter(Boolean);
      if (parsed.length) {
        addSerialsToFinalTray(parsed);
        serials = [...finalTraySerials];
      }
    }
  }

  if (!serials.length && Array.isArray(selected) && selected.length) {
    addSerialsToFinalTray(selected);
    serials = [...finalTraySerials];
  }

  if (!serials.length) {
    try {
      const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
      if (store && store.getActiveContext) {
        const activeCtx = store.getActiveContext();
        if (activeCtx && activeCtx.project && Array.isArray(activeCtx.project.selectedSerials) && activeCtx.project.selectedSerials.length) {
          addSerialsToFinalTray(activeCtx.project.selectedSerials);
          serials = [...finalTraySerials];
        }
      }
    } catch (e) {}
  }

  if (!serials.length) {
    alert("Please select items from the catalogue or add serial codes to the Final Tray list first.");
    setSerialFeedback("Please select items or add serial codes first.", true);
    return;
  }

  if (serials.length > 300) {
    alert("Large export detected. Compact PDF mode will be used to keep generation stable.");
  }

  showSpinner(true);
  setSerialFeedback(`Preparing Final Tray PDF for ${serials.length} item(s)...`, false);

  try {
    const exportItems = resolveItemsBySerials(serials);
    if (!exportItems.length) {
      alert("No matching items found in inventory for the final tray serials.");
      setSerialFeedback("No matching items found in inventory.", true);
      return;
    }

    const itemChunks = chunkArray(exportItems, 6);
    const generatedBlobs = [];

    for (const chunkItems of itemChunks) {
      let blob = await buildCollageBlob(chunkItems);
      if (chunkItems.length < 6) {
        blob = await trimOuterWhitespaceOnly(blob);
      }
      generatedBlobs.push(blob);
    }

    if (!generatedBlobs.length) {
      throw new Error("Unable to prepare final tray PDF pages");
    }

    collageBlobs = generatedBlobs;
    lastBlob = collageBlobs[0];
    lastExportItems = exportItems;
    lastExportTitle = "Final Tray Catalogue";
    lastExportKind = "final-tray";
    lastPdfBlob = null;

    await rebuildPdfPreview();

    setSerialFeedback(`Done. Final tray PDF generated for ${exportItems.length} item(s).`, false);

    // Update active project status in background
    try {
      const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
      const activeCtx = store && store.getActiveContext ? store.getActiveContext() : {};
      const activeProject = activeCtx.project;
      if (store && store.updateProjectStatus && activeProject) {
        store.updateProjectStatus(activeProject.id, "Sample Reserved");
      }
    } catch (e) {}

  } catch (err) {
    console.error("Error creating final tray PDF:", err);
    alert("Error preparing final tray PDF. Please try again.");
    setSerialFeedback("Error preparing final tray PDF.", true);
  } finally {
    showSpinner(false);
  }
}
window.generateFinalTrayFromSerials = generateFinalTrayFromSerials;

function parseSerialInput(rawText) {
  const chunks = String(rawText || "")
    .replace(/\r/g, "\n")
    .split(/[\n,;]+/)
    .map(t => t.trim())
    .filter(Boolean);

  const tokens = [];

  chunks.forEach(chunk => {
    const matches = chunk.match(/[A-Za-z]+\s*-\s*[A-Za-z0-9]+/g);

    if (matches && matches.length) {
      matches.forEach(m => {
        const normalized = sanitizeSerialToken(m);
        if (normalized) {
          tokens.push(normalized);
        }
      });
      return;
    }

    const normalized = sanitizeSerialToken(chunk);
    if (normalized) {
      tokens.push(normalized);
    }
  });

  return [...new Set(tokens)];
}

function initFinalTrayUi() {
  const searchInput = document.getElementById("finalTraySearchInput");
  const bulkInput = document.getElementById("serialBulkInput");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", () => {
    finalTraySuggestionIndex = -1;
    renderFinalTraySerialManager();
  });

  searchInput.addEventListener("keydown", (event) => {
    const suggestions = getFinalTraySuggestions(searchInput.value || "");

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!suggestions.length) {
        return;
      }
      finalTraySuggestionIndex = Math.min(finalTraySuggestionIndex + 1, suggestions.length - 1);
      renderFinalTraySerialManager();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!suggestions.length) {
        return;
      }
      finalTraySuggestionIndex = Math.max(finalTraySuggestionIndex - 1, 0);
      renderFinalTraySerialManager();
      return;
    }

    if (event.key === "Enter" || event.key === "," || event.key === ";") {
      event.preventDefault();
      const picked = finalTraySuggestionIndex >= 0 && suggestions[finalTraySuggestionIndex]
        ? suggestions[finalTraySuggestionIndex]
        : searchInput.value;

      const added = addSerialsToFinalTray([picked]);
      if (added > 0) {
        searchInput.value = "";
      }
      finalTraySuggestionIndex = -1;
      renderFinalTraySerialManager();
    }

    if (event.key === "Backspace" && !searchInput.value && finalTraySerials.length) {
      finalTraySerials = finalTraySerials.slice(0, -1);
      renderFinalTraySerialManager();
    }
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      finalTraySuggestionIndex = -1;
      renderFinalTraySerialManager();
    }, 120);
  });

  searchInput.addEventListener("focus", () => {
    renderFinalTraySerialManager();
  });

  if (bulkInput) {
    bulkInput.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        addBulkSerialsToFinalTray();
      }
    });
  }
}

function buildKnownSerialDictionary() {
  const out = [];
  const seen = new Set();

  data.forEach((item) => {
    const normalized = sanitizeSerialToken(item["Serial No"] || "");
    if (!normalized || seen.has(normalized)) {
      return;
    }
    seen.add(normalized);
    out.push(normalized);
  });

  return out;
}

function addSerialsToFinalTray(values) {
  const incoming = Array.isArray(values) ? values : [];
  const existing = new Set(finalTraySerials);
  let addedCount = 0;

  incoming.forEach((value) => {
    const normalized = sanitizeSerialToken(value);
    if (!normalized || existing.has(normalized)) {
      return;
    }
    existing.add(normalized);
    finalTraySerials.push(normalized);
    addedCount += 1;
  });

  return addedCount;
}

function importLookbookSelectionToFinalTray(serials) {
  const incoming = Array.isArray(serials) ? serials.filter(Boolean) : [];
  if (!incoming.length) return 0;

  incoming.forEach(id => {
    const normalized = sanitizeSerialToken(id);
    if (normalized && !selected.includes(normalized)) {
      selected.push(normalized);
    }
  });

  const added = addSerialsToFinalTray(incoming);

  syncCurrentSelectionToProject();
  updateTabBadge();
  render();
  renderFinalTraySerialManager();
  updateMiniWebsiteModalPreview();

  setSerialFeedback(`Imported ${incoming.length} lookbook item${incoming.length === 1 ? '' : 's'} into Final Tray!`, false);

  const shareBox = document.getElementById("postCreationShareContainer");
  if (shareBox) {
    shareBox.style.display = "block";
  }

  return added;
}
window.importLookbookSelectionToFinalTray = importLookbookSelectionToFinalTray;

function removeSerialFromFinalTray(serial) {
  const normalized = sanitizeSerialToken(serial);
  if (!normalized) {
    return;
  }
  finalTraySerials = finalTraySerials.filter((s) => s !== normalized);
  renderFinalTraySerialManager();
}

function addBulkSerialsToFinalTray() {
  const bulkInput = document.getElementById("serialBulkInput");
  const parsed = parseSerialInput(bulkInput ? bulkInput.value : "");
  const added = addSerialsToFinalTray(parsed);

  if (bulkInput && added > 0) {
    bulkInput.value = "";
  }

  if (added === 0 && parsed.length > 0) {
    setSerialFeedback("All parsed serials are already in the final list.", false);
  } else if (added > 0) {
    setSerialFeedback(`Added ${added} code${added === 1 ? "" : "s"} to final tray list.`, false);
  }

  finalTraySuggestionIndex = -1;
  renderFinalTraySerialManager();
}

function getFinalTraySuggestions(rawQuery) {
  const query = sanitizeSerialToken(rawQuery || "");
  if (!query) {
    return [];
  }

  const fromCurrentList = finalTraySerials.filter((serial) => serial.includes(query));
  const currentSet = new Set(fromCurrentList);
  const known = buildKnownSerialDictionary();
  const fromKnown = known
    .filter((serial) => serial.includes(query) && !currentSet.has(serial) && finalTraySerials.indexOf(serial) === -1)
    .slice(0, 10);

  return [...fromCurrentList, ...fromKnown].slice(0, 12);
}

function renderFinalTraySerialManager() {
  const listNode = document.getElementById("finalTrayList");
  const metaNode = document.getElementById("finalTrayListMeta");
  const inputNode = document.getElementById("finalTraySearchInput");
  const suggestionsNode = document.getElementById("finalTraySuggestions");

  if (!listNode || !metaNode || !suggestionsNode || !inputNode) {
    return;
  }

  metaNode.textContent = `${finalTraySerials.length} code${finalTraySerials.length === 1 ? "" : "s"} in final tray list`;

  if (!finalTraySerials.length) {
    listNode.innerHTML = '<span class="panel-meta">No serials added yet.</span>';
  } else {
    listNode.innerHTML = finalTraySerials.map((serial) => `
      <span class="final-tray-chip" title="${serial}">
        ${serial}
        <button type="button" class="final-tray-chip-remove" data-serial="${serial}" aria-label="Remove ${serial}">✕</button>
      </span>
    `).join("");

    listNode.querySelectorAll(".final-tray-chip-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeSerialFromFinalTray(btn.getAttribute("data-serial") || "");
      });
    });
  }

  const suggestions = getFinalTraySuggestions(inputNode.value || "");
  if (!suggestions.length || document.activeElement !== inputNode) {
    suggestionsNode.classList.add("hidden");
    suggestionsNode.innerHTML = "";
    return;
  }

  if (finalTraySuggestionIndex >= suggestions.length) {
    finalTraySuggestionIndex = suggestions.length - 1;
  }

  suggestionsNode.innerHTML = suggestions.map((serial, idx) => `
    <button type="button" class="final-tray-suggestion ${idx === finalTraySuggestionIndex ? "active" : ""}" data-serial="${serial}">${serial}</button>
  `).join("");

  suggestionsNode.querySelectorAll(".final-tray-suggestion").forEach((btn, idx) => {
    btn.addEventListener("mouseenter", () => {
      finalTraySuggestionIndex = idx;
      renderFinalTraySerialManager();
    });
    btn.addEventListener("mousedown", (event) => {
      event.preventDefault();
      const serial = btn.getAttribute("data-serial") || "";
      const added = addSerialsToFinalTray([serial]);
      if (added > 0) {
        inputNode.value = "";
      }
      finalTraySuggestionIndex = -1;
      renderFinalTraySerialManager();
    });
  });

  suggestionsNode.classList.remove("hidden");
}

function sanitizeSerialToken(token) {
  return String(token || "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function resolveItemsBySerials(serials) {
  const bySerial = new Map();

  data.forEach(item => {
    const key = sanitizeSerialToken(item["Serial No"] || "");
    if (key) {
      bySerial.set(key, item);
    }
  });

  const keys = [...bySerial.keys()];
  const items = [];
  const seen = new Set();

  serials.forEach(serial => {
    const normalized = sanitizeSerialToken(serial);
    if (!normalized) {
      return;
    }

    let match = bySerial.get(normalized);
    if (!match) {
      const suffixMatches = keys.filter(key => key.endsWith(normalized));
      if (suffixMatches.length === 1) {
        match = bySerial.get(suffixMatches[0]);
      }
    }

    if (match) {
      const serialNo = String(match["Serial No"] || "");
      if (!seen.has(serialNo)) {
        seen.add(serialNo);
        items.push(match);
      }
    }
  });

  return items;
}

function selectAllByBrand() {
  const filterBrand = document.getElementById("filterBrand")?.value || "";
  const filterType = document.getElementById("filterType")?.value || "";

  let filtered = getFilteredItems();
  const toAdd = filtered.filter(d => normalizeStatus(d["Status"]) !== "marked");

  if (!toAdd.length) {
    alert("No unmarked items match the current filter selection.");
    return;
  }

  let addedCount = 0;
  toAdd.forEach(item => {
    const id = item["Serial No"];
    if (!selected.includes(id)) {
      selected.push(id);
      addedCount++;
    }
  });

  render();
  updateTabBadge();

  const labelParts = [filterBrand, filterType].filter(Boolean);
  const desc = labelParts.length > 0 ? labelParts.join(" ") : "matching";

  if (addedCount === 0) {
    alert(`All ${desc} items are already in your selection.`);
  } else {
    alert(`Added ${addedCount} ${desc} item${addedCount === 1 ? "" : "s"} to selection.`);
  }
}

function removeFromSelected(id) {
  selected = selected.filter(x => x !== id);
  updateTabBadge();
  renderSelected();
}

function clearAllSelected() {
  if (selected.length === 0) {
    alert("No items selected.");
    return;
  }
  if (confirm(`Clear all ${selected.length} selected items?`)) {
    selected = [];
    updateTabBadge();
    renderSelected();
  }
}

function removeMarkedFromSelected() {
  const markedInSelection = selected.filter(id => {
    const item = dataBySerial.get(id);
    return item && normalizeStatus(item["Status"]) === "marked";
  });

  if (markedInSelection.length === 0) {
    alert("No marked items in selection.");
    return;
  }

  if (confirm(`Remove ${markedInSelection.length} marked item(s)?`)) {
    selected = selected.filter(id => {
      const item = dataBySerial.get(id);
      return !(item && normalizeStatus(item["Status"]) === "marked");
    });
    updateTabBadge();
    renderSelected();
  }
}

window.removeFromSelected = removeFromSelected;
window.clearAllSelected = clearAllSelected;
window.removeMarkedFromSelected = removeMarkedFromSelected;
window.addBulkSerialsToFinalTray = addBulkSerialsToFinalTray;

function setSerialFeedback(message, isError) {
  const node = document.getElementById("serialFeedback");
  node.textContent = message;
  node.style.color = isError ? "#b42318" : "#155724";
}

function updatePdfMeta() {
  const node = document.getElementById("pdfMeta");
  if (!node) {
    return;
  }

  if (!collageBlobs.length) {
    node.textContent = "No PDF generated yet";
    return;
  }

  node.textContent = `${lastExportTitle} · ${collageBlobs.length} page${collageBlobs.length === 1 ? "" : "s"} · ${lastExportItems.length} code${lastExportItems.length === 1 ? "" : "s"}`;
}

function clearPdfPreview() {
  const frame = document.getElementById("pdfPreviewFrame");
  const placeholder = document.getElementById("previewPlaceholder");
  const shareBox = document.getElementById("postCreationShareContainer");

  if (lastPdfUrl) {
    URL.revokeObjectURL(lastPdfUrl);
    lastPdfUrl = "";
  }

  lastPdfBlob = null;

  if (frame) {
    frame.removeAttribute("src");
    frame.classList.remove("visible");
  }

  if (placeholder) {
    placeholder.classList.remove("hidden");
  }

  if (shareBox) {
    shareBox.style.display = "none";
  }

  updatePdfMeta();
}

function setPdfPreview(blob) {
  const frame = document.getElementById("pdfPreviewFrame");
  const placeholder = document.getElementById("previewPlaceholder");
  const shareBox = document.getElementById("postCreationShareContainer");

  if (lastPdfUrl) {
    URL.revokeObjectURL(lastPdfUrl);
  }

  lastPdfBlob = blob;
  lastPdfUrl = URL.createObjectURL(blob);

  if (frame) {
    frame.src = lastPdfUrl;
    frame.classList.add("visible");
  }

  if (placeholder) {
    placeholder.classList.add("hidden");
  }

  if (shareBox) {
    shareBox.style.display = "block";
  }

  updatePdfMeta();
}

function setHtmlLookbookPreview(blob, fileName, meta, itemCount) {
  const frame = document.getElementById("pdfPreviewFrame");
  const placeholder = document.getElementById("previewPlaceholder");
  const shareBox = document.getElementById("postCreationShareContainer");
  const metaNode = document.getElementById("pdfMeta");

  if (lastPdfUrl) {
    URL.revokeObjectURL(lastPdfUrl);
  }

  lastPdfBlob = blob;
  lastPdfUrl = URL.createObjectURL(blob);

  if (frame) {
    frame.src = lastPdfUrl;
    frame.classList.add("visible");
  }

  if (placeholder) {
    placeholder.classList.add("hidden");
  }

  if (shareBox) {
    shareBox.style.display = "block";
  }

  if (metaNode) {
    metaNode.textContent = `Client Lookbook · ${meta.name || "Valued Client"} · ${itemCount} piece${itemCount === 1 ? "" : "s"}`;
  }
}
window.setHtmlLookbookPreview = setHtmlLookbookPreview;

async function rebuildPdfPreview() {
  if (!collageBlobs.length) {
    clearPdfPreview();
    return null;
  }

  if (!window.JewelleryPdf || typeof window.JewelleryPdf.buildPdfBlob !== "function") {
    throw new Error("PDF builder not loaded");
  }

  const pdfBlob = await window.JewelleryPdf.buildPdfBlob({
    pageBlobs: collageBlobs,
    items: lastExportItems,
    title: lastExportTitle
  });

  setPdfPreview(pdfBlob);
  return pdfBlob;
}

async function ensurePdfBlob() {
  if (lastPdfBlob) {
    return lastPdfBlob;
  }

  return rebuildPdfPreview();
}

/* DOWNLOAD */
function buildPdfFileName() {
  const title = String(lastExportTitle || "Jewellery PDF")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${title || "jewellery-pdf"}.pdf`;
}

async function downloadCurrentPdf() {
  if (!collageBlobs.length) {
    alert("Generate a PDF first.");
    return;
  }

  try {
    const pdfBlob = await ensurePdfBlob();
    triggerBlobDownload(pdfBlob, buildPdfFileName());
  } catch (err) {
    console.error(err);
    alert("Unable to build PDF. Please try again.");
  }
}

/* EXPORT & SHARE PDF TO WHATSAPP */
async function exportAndSharePdfToWhatsApp() {
  try {
    if (!lastPdfBlob && (!collageBlobs || collageBlobs.length === 0)) {
      if (Array.isArray(selected) && selected.length > 0) {
        await generateSelectionPdf();
      } else if (Array.isArray(finalTraySerials) && finalTraySerials.length > 0) {
        if (typeof window.generateFinalTrayFromSerials === 'function') {
          await window.generateFinalTrayFromSerials();
        }
      } else {
        alert("Please select items from the catalogue grid first to export a PDF.");
        return;
      }
    }
    await shareCurrentPdf();
  } catch (err) {
    console.error("Error in exportAndSharePdfToWhatsApp:", err);
    alert("Unable to export PDF: " + (err.message || err));
  }
}

/* SHARE CURRENT PDF TO WHATSAPP / NATIVE SHARE */
async function shareCurrentPdf() {
  let pdfBlob = lastPdfBlob;

  if (!pdfBlob && collageBlobs.length) {
    try {
      showSpinner(true);
      pdfBlob = await ensurePdfBlob();
    } catch (err) {
      console.error(err);
      alert("Unable to build PDF. Please try again.");
      return;
    } finally {
      showSpinner(false);
    }
  }

  if (!pdfBlob && Array.isArray(selected) && selected.length > 0) {
    try {
      await generateSelectionPdf();
      pdfBlob = lastPdfBlob;
    } catch (err) {
      console.error(err);
    }
  }

  if (!pdfBlob) {
    alert("Please select items from the catalogue grid first to generate a PDF.");
    return;
  }

  const fileName = buildPdfFileName();
  const file = new File([pdfBlob], fileName, { type: "application/pdf" });

  // 1. Try Native Web Share API with files array (mobile Chrome/Safari over HTTPS)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: lastExportTitle || "Jewellery PDF Catalogue",
        text: `📄 ${lastExportTitle || "Jewellery PDF Catalogue"}`
      });
      return;
    } catch (err) {
      console.log("Web Share API error/cancel:", err);
      if (err && err.name === "AbortError") {
        // User closed native share dialog
        return;
      }
    }
  }

  // 2. Fallback for desktop/browsers without file Web Share:
  // Trigger PDF download to user device first
  triggerBlobDownload(pdfBlob, fileName);

  const whatsappText = encodeURIComponent(
    `📄 *${(lastExportTitle || "ASCEND HIGH JEWELRY CURATION PDF").toUpperCase()}*\n` +
    `Document File: ${fileName}\n\n` +
    `The PDF catalogue has been downloaded to your device. Please attach it using the 📎 paperclip icon to send.`
  );
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const waUrl = isMobile 
    ? `https://api.whatsapp.com/send?text=${whatsappText}`
    : `https://web.whatsapp.com/send?text=${whatsappText}`;

  // Synchronous call inside user gesture handler so popups are never blocked
  const openedWin = window.open(waUrl, "_blank");
  if (!openedWin || openedWin.closed || typeof openedWin.closed === "undefined") {
    window.location.href = waUrl;
  }
}

async function shareFinalTrayPdf() {
  if (!lastPdfBlob && !collageBlobs.length) {
    if (typeof window.generateFinalTrayFromSerials === 'function' && finalTraySerials && finalTraySerials.length > 0) {
      await window.generateFinalTrayFromSerials();
    } else if (selected && selected.length > 0) {
      await generateSelectionPdf();
    }
  }
  return shareCurrentPdf();
}

function triggerBlobDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 2000);
}

function openBlobPreview(blob, fileName) {
  const previewUrl = URL.createObjectURL(blob);
  const previewWindow = window.open(previewUrl, "_blank", "noopener,noreferrer");

  if (!previewWindow) {
    const fallbackLink = document.createElement("a");
    fallbackLink.href = previewUrl;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener noreferrer";
    fallbackLink.style.display = "none";
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    fallbackLink.remove();
  }

  setTimeout(() => {
    URL.revokeObjectURL(previewUrl);
  }, 10000);

  return previewUrl;
}


/* SPINNER */
function showSpinner(show) {
  document.getElementById("spinner").classList.toggle("hidden", !show);
}

async function buildAllCollagesOnServer(selectedIds) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action: "buildAllCollages", selected: selectedIds })
  });

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }

  const payload = await response.json();
  if (!payload.ok || !Array.isArray(payload.pages) || payload.pages.length === 0) {
    throw new Error(payload.error || "Invalid server collage response");
  }

  const blobs = [];
  for (const page of payload.pages) {
    if (!page.base64) continue;
    if (page.debug && page.debug.insertedImages === 0) {
      throw new Error("Server could not insert any images on a page");
    }
    const blob = base64ToBlob(page.base64, page.mimeType || "image/png");
    const isBlank = await isMostlyWhiteBlob(blob);
    if (isBlank) {
      throw new Error("Server returned a blank/white collage page");
    }
    blobs.push(blob);
  }

  if (blobs.length === 0) {
    throw new Error("Server returned no valid collage pages");
  }

  return blobs;
}

async function buildAllAndMarkOnServer(serials) {
  const requestId = `srv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  traceFinalTray("server:request", {
    requestId,
    action: "buildAndMarkFinalTray",
    serialCount: serials.length,
    serialPreview: serials.slice(0, 8)
  });

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action: "buildAndMarkFinalTray", serials: serials })
  });

  traceFinalTray("server:http", {
    requestId,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText
  });

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }

  const rawText = await response.text();
  traceFinalTray("server:raw", {
    requestId,
    length: rawText.length,
    preview: rawText.slice(0, 260)
  });

  let payload;
  try {
    payload = JSON.parse(rawText);
  } catch (err) {
    traceFinalTray("server:parse-error", {
      requestId,
      message: err && err.message ? err.message : String(err)
    });
    throw new Error("Server returned invalid JSON");
  }

  traceFinalTray("server:payload", {
    requestId,
    ok: !!payload.ok,
    pageCount: Array.isArray(payload.pages) ? payload.pages.length : 0,
    updatedCount: Number(payload.updatedCount || 0),
    missingCount: Array.isArray(payload.missingSerials) ? payload.missingSerials.length : 0,
    error: payload.error || ""
  });

  return payload;
}

async function markFinalTrayOnlyOnServer(serials) {
  const requestId = `mark-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  traceFinalTray("server:mark-only:request", {
    requestId,
    action: "markFinalTrayOnly",
    serialCount: serials.length,
    serialPreview: serials.slice(0, 8)
  });

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action: "markFinalTrayOnly", serials: serials })
  });

  traceFinalTray("server:mark-only:http", {
    requestId,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText
  });

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }

  const rawText = await response.text();
  traceFinalTray("server:mark-only:raw", {
    requestId,
    length: rawText.length,
    preview: rawText.slice(0, 260)
  });

  let payload;
  try {
    payload = JSON.parse(rawText);
  } catch (err) {
    traceFinalTray("server:mark-only:parse-error", {
      requestId,
      message: err && err.message ? err.message : String(err)
    });
    throw new Error("Server returned invalid JSON");
  }

  traceFinalTray("server:mark-only:payload", {
    requestId,
    ok: !!payload.ok,
    updatedCount: Number(payload.updatedCount || 0),
    missingCount: Array.isArray(payload.missingSerials) ? payload.missingSerials.length : 0,
    error: payload.error || ""
  });

  const rawError = String(payload && payload.error ? payload.error : "");
  const unsupportedMarkAction = !payload.ok && /(unsupported|unknown|invalid|action)/i.test(rawError);

  if (unsupportedMarkAction) {
    traceFinalTray("server:mark-only:fallback-legacy", {
      requestId,
      error: rawError
    });

    const legacy = await buildAllAndMarkOnServer(serials);
    return {
      ok: !!legacy.ok,
      updatedCount: Number(legacy.updatedCount || 0),
      missingSerials: Array.isArray(legacy.missingSerials) ? legacy.missingSerials : [],
      error: legacy.error || ""
    };
  }

  return payload;
}

async function isMostlyWhiteBlob(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      try {
        const width = Math.max(1, Math.min(400, img.width));
        const height = Math.max(1, Math.min(400, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, width, height);

        const pixels = ctx.getImageData(0, 0, width, height).data;
        let whiteCount = 0;
        let sampledCount = 0;
        const SAMPLE_STRIDE = 10; // check every 10th pixel instead of every pixel

        for (let i = 0; i < pixels.length; i += 4 * SAMPLE_STRIDE) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          sampledCount++;
          if (r > 245 && g > 245 && b > 245) {
            whiteCount++;
          }
        }

        URL.revokeObjectURL(url);
        resolve(whiteCount / sampledCount > 0.99);
      } catch (err) {
        URL.revokeObjectURL(url);
        resolve(false);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };

    img.src = url;
  });
}

function base64ToBlob(base64, mimeType) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType || "image/png" });
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

async function loadImageWithFallback(item) {
  const urls = buildImageSourceCandidates(item, true);
  const errors = [];

  for (const url of urls) {
    try {
      return await loadImage(url);
    } catch (err) {
      errors.push(url);
    }
  }

  // Only log once per item after all sources are exhausted
  console.warn(`[${item["Serial No"]}] All image sources failed (${errors.length} tried):`, errors);
  throw new Error(`Image not found for ${item["Serial No"]}`);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,         x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h,     x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x,     y + h,     x, y + h - r);
  ctx.lineTo(x,     y + r);
  ctx.quadraticCurveTo(x,     y,         x + r, y);
  ctx.closePath();
}

async function buildCollageBlob(items) {
  /* Canvas sized to match the PDF frame aspect ratio (≈ 0.9044).
     2 columns × 3 rows, zero outer padding, zero gaps.
     Reading order: 1=top-left, 2=top-right, 3=mid-left, 4=mid-right,
                    5=bot-left,  6=bot-right */
  const COLS    = 2;
  const ROWS    = 3;
  const W       = 1240;
  const H       = 1371;     /* 1240 / 0.9044 ≈ 1371 — matches PDF frame; 1371/3 = 457 px/row */
  const LABEL_H = 36;       /* serial label strip at bottom of each cell */
  const radius  = 10;

  const cellW = W / COLS;        /* 620 px */
  const cellH = H / ROWS;        /* 457 px — full cell (image + label) */
  const imgH  = cellH - LABEL_H; /* 421 px — image-only area */

  const canvas = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  const missingInCollage = [];
  const images = await Promise.all(
    items.map(async item => {
      try {
        return { id: item["Serial No"], image: await loadImageWithFallback(item) };
      } catch (err) {
        missingInCollage.push(item["Serial No"]);
        return { id: item["Serial No"], image: null };
      }
    })
  );

  for (let index = 0; index < 6; index++) {
    const col   = index % COLS;
    const row   = Math.floor(index / COLS);
    const x     = col * cellW;   /* zero outer padding, zero gap */
    const y     = row * cellH;   /* cellH already includes label — no double-count */
    const entry = images[index];

    /* — Image area — */
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, cellW, imgH);
    ctx.clip();

    if (entry && entry.image) {
      const src      = entry.image;
      const innerPad = 14;
      const boxW     = cellW - innerPad * 2;
      const boxH     = imgH  - innerPad * 2;
      const scale    = Math.max(boxW / src.width, boxH / src.height);
      const dw       = src.width  * scale;
      const dh       = src.height * scale;
      const dx       = x + innerPad + (boxW - dw) / 2;
      const dy       = y + innerPad + (boxH - dh) / 2;
      ctx.drawImage(src, dx, dy, dw, dh);
    } else {
      ctx.fillStyle = "#f0ebe4";
      ctx.fillRect(x, y, cellW, imgH);
      if (entry) {
        ctx.fillStyle = "#999999";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Image unavailable", x + cellW / 2, y + imgH / 2);
      }
    }
    ctx.restore();

    /* — Label strip — */
    ctx.save();
    roundRect(ctx, x, y, cellW, cellH, radius);
    ctx.clip();
    ctx.fillStyle = "#1f2431";
    ctx.fillRect(x, y + imgH, cellW, LABEL_H);
    ctx.restore();

    if (entry) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px 'Arial'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(entry.id || ""), x + cellW / 2, y + imgH + LABEL_H / 2);
    }

    /* — Cell border — */
    ctx.save();
    ctx.strokeStyle = "#d8c8b8";
    ctx.lineWidth = 1.5;
    roundRect(ctx, x + 0.75, y + 0.75, cellW - 1.5, cellH - 1.5, radius);
    ctx.stroke();
    ctx.restore();
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error("Unable to build collage blob"));
        return;
      }
      blob._missingItems = missingInCollage;
      resolve(blob);
    }, "image/png", 0.96);
  });
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function trimOuterWhitespaceOnly(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        const isWhitePixel = (i) => {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          return a < 10 || (r > 245 && g > 245 && b > 245);
        };

        const rowHasContent = (y) => {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            if (!isWhitePixel(i)) {
              return true;
            }
          }
          return false;
        };

        const colHasContent = (x) => {
          for (let y = 0; y < canvas.height; y++) {
            const i = (y * canvas.width + x) * 4;
            if (!isWhitePixel(i)) {
              return true;
            }
          }
          return false;
        };

        let top = 0;
        while (top < canvas.height && !rowHasContent(top)) top++;

        let bottom = canvas.height - 1;
        while (bottom >= 0 && !rowHasContent(bottom)) bottom--;

        let left = 0;
        while (left < canvas.width && !colHasContent(left)) left++;

        let right = canvas.width - 1;
        while (right >= 0 && !colHasContent(right)) right--;

        URL.revokeObjectURL(url);

        if (left >= right || top >= bottom) {
          resolve(blob);
          return;
        }

        const safePadding = 8;
        left = Math.max(0, left - safePadding);
        top = Math.max(0, top - safePadding);
        right = Math.min(canvas.width - 1, right + safePadding);
        bottom = Math.min(canvas.height - 1, bottom + safePadding);

        const width = right - left + 1;
        const height = bottom - top + 1;

        const out = document.createElement("canvas");
        out.width = width;
        out.height = height;
        const outCtx = out.getContext("2d");
        outCtx.drawImage(canvas, left, top, width, height, 0, 0, width, height);

        out.toBlob((croppedBlob) => {
          resolve(croppedBlob || blob);
        }, "image/png", 0.95);
      } catch (err) {
        URL.revokeObjectURL(url);
        resolve(blob);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(blob);
    };

    img.src = url;
  });
}

function renderFloatingSelectionBar() {
  let bar = document.getElementById("floatingSelectionBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "floatingSelectionBar";
    bar.className = "floating-selection-bar";
    document.body.appendChild(bar);
  }

  // Check if currently on the browse tab
  const browseTab = document.getElementById("browseTab");
  const isBrowseTabActive = browseTab && browseTab.classList.contains("active");

  if (selected.length === 0 || !isBrowseTabActive) {
    bar.style.display = "none";
    return;
  }

  bar.style.display = "flex";
  bar.innerHTML = `
    <div class="fsb-info">
      <i class="fa-solid fa-gem"></i> <strong>${selected.length}</strong> Piece${selected.length === 1 ? '' : 's'} Selected
    </div>
    <button class="fsb-btn-proceed" onclick="switchTab('selected')">
      Proceed to Export &amp; Share <i class="fa-solid fa-arrow-right"></i>
    </button>
  `;
}

async function shareSelectionToWhatsApp() {
  if (selected.length === 0) {
    alert("Please select at least 1 item to share.");
    return;
  }

  const { celebrity, project, stylist } = ProjectStore.getActiveContext();
  const selectedItems = data.filter(d => selected.includes(d["Serial No"]));

  const celebName = celebrity ? celebrity.name : "Celebrity";
  const stylistName = stylist ? stylist.name : "Stylist";
  const projTitle = project ? project.title : "Curation Pull";
  const safeFilename = `${celebName.replace(/[^a-zA-Z0-9]/g, '_')}_Curation.pdf`;

  // 1. Native Web Share API (Directly attaches PDF File to WhatsApp on supported devices!)
  if (lastPdfBlob && navigator.canShare) {
    try {
      const pdfFile = new File([lastPdfBlob], safeFilename, { type: "application/pdf" });
      if (navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          files: [pdfFile],
          title: `${celebName} Lookbook - ${projTitle}`,
          text: `✨ ASCEND ATELIER CURATION\n📁 Project: ${projTitle}\n👑 Celebrity: ${celebName}\n👤 Stylist: ${stylistName}`
        });
        console.log("[WebShare] Direct PDF file shared successfully!");
        return;
      }
    } catch (shareErr) {
      if (shareErr.name !== "AbortError") {
        console.warn("[WebShare] Native share failed, falling back to Web WhatsApp", shareErr);
      } else {
        return;
      }
    }
  }

  // 2. Desktop Browser Fallback
  if (typeof downloadCurrentPdf === 'function' && lastPdfBlob) {
    downloadCurrentPdf();
  }

  let msg = `✨ *ASCEND ATELIER CURATION PDF*\n`;
  msg += `---------------------------\n`;
  msg += `📁 *Project:* ${projTitle}\n`;
  msg += `👑 *Celebrity:* ${celebName}\n`;
  msg += `👤 *Stylist:* ${stylistName}\n`;
  msg += `💎 *Total Selected Pieces:* ${selectedItems.length}\n\n`;
  msg += `📄 *PDF Document:* Attached below (${safeFilename})\n\n`;
  msg += `*Curated Piece Serials:*\n`;

  selectedItems.slice(0, 10).forEach((item, idx) => {
    msg += `${idx + 1}. ${item["Serial No"]} (${item["Type"] || "Jewellery"})\n`;
  });

  if (selectedItems.length > 10) {
    msg += `...and ${selectedItems.length - 10} more pieces.\n`;
  }

  msg += `\nAscend High Jewelry Studio`;

  const waUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
  alert(`✅ PDF downloaded as "${safeFilename}".\n\nWhatsApp Web has been opened. Please click the 📎 (Paperclip / Attachment) icon in WhatsApp to attach the downloaded PDF file.`);
}

function switchTab(tabName) {
  if (typeof window.unlockStudioWorkspace === 'function') {
    window.unlockStudioWorkspace();
  }

  const tabs = {
    browse: { btn: "tabBrowseBtn", section: "browseTab" },
    selected: { btn: "tabSelectedBtn", section: "selectedTab" },
    finalTray: { btn: "tabFinalTrayBtn", section: "finalTrayTab" }
  };

  Object.keys(tabs).forEach(key => {
    const btn = document.getElementById(tabs[key].btn);
    const section = document.getElementById(tabs[key].section);

    if (key === tabName) {
      if (btn) btn.classList.add("active");
      if (section) section.classList.add("active");
    } else {
      if (btn) btn.classList.remove("active");
      if (section) section.classList.remove("active");
    }
  });

  const pageShell = document.querySelector(".page-shell");
  if (pageShell) {
    if (tabName === "browse") {
      pageShell.classList.add("browse-active");
    } else {
      pageShell.classList.remove("browse-active");
    }
  }

  if (tabName === "selected") {
    renderSelected();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderFloatingSelectionBar();
}

async function shareLookbookToWhatsApp() {
  const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
  let activeCtx = {};
  if (store && store.getActiveContext) {
    activeCtx = store.getActiveContext();
  }

  const celebName = activeCtx.celebrity ? activeCtx.celebrity.name : "Celebrity";
  const stylistName = activeCtx.stylist ? activeCtx.stylist.name : "Stylist";
  const projTitle = activeCtx.project ? activeCtx.project.title : "Lookbook Selection";
  const projId = activeCtx.project ? activeCtx.project.id : ("proj_" + Date.now());

  let currentSelected = Array.isArray(window.selected) ? window.selected : [];
  if (!currentSelected.length && activeCtx.project && Array.isArray(activeCtx.project.selectedSerials)) {
    currentSelected = activeCtx.project.selectedSerials;
  }

  if (!currentSelected.length) {
    alert("Select pieces from the catalogue first to create and share the Lookbook.");
    return;
  }

  const baseUrl = window.location.origin + window.location.pathname;
  const lookbookWebUrl = `${baseUrl}?mode=lookbook&project=${encodeURIComponent(projId)}&name=${encodeURIComponent(celebName)}&items=${encodeURIComponent(currentSelected.join(','))}`;

  const safeFilename = `${celebName.replace(/[^a-zA-Z0-9]/g, '_')}_Lookbook.pdf`;

  // Try to build or get PDF Blob
  let pdfBlob = lastPdfBlob;
  if (!pdfBlob && typeof ensurePdfBlob === 'function' && collageBlobs.length) {
    try {
      pdfBlob = await ensurePdfBlob();
    } catch (e) {
      console.warn("Could not generate PDF blob for sharing:", e);
    }
  }

  // 1. Try Native Web Share API with the PDF FILE attached
  if (pdfBlob && navigator.canShare) {
    try {
      const pdfFile = new File([pdfBlob], safeFilename, { type: "application/pdf" });
      if (navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          files: [pdfFile],
          title: `${celebName} Lookbook - ${projTitle}`,
          text: `✨ ASCEND ATELIER CURATION LOOKBOOK\n📁 Project: ${projTitle}\n👑 Celebrity: ${celebName}\n👤 Stylist: ${stylistName}\n🔗 Web Version: ${lookbookWebUrl}`
        });
        return;
      }
    } catch (shareErr) {
      if (shareErr.name === "AbortError") return;
      console.warn("[WebShare] Native file share failed, falling back", shareErr);
    }
  }

  // 2. Fallback: Download PDF + open WhatsApp text
  if (pdfBlob) {
    triggerBlobDownload(pdfBlob, safeFilename);
  }

  let msg = `✨ *ASCEND ATELIER DIGITAL CLIENT LOOKBOOK*\n`;
  msg += `---------------------------\n`;
  msg += `📁 *Project:* ${projTitle}\n`;
  msg += `👑 *Celebrity / Client:* ${celebName}\n`;
  msg += `👤 *Stylist:* ${stylistName}\n`;
  msg += `💎 *Curated Pieces:* ${currentSelected.length}\n\n`;
  msg += `🔗 *Open Interactive Web Lookbook:*\n${lookbookWebUrl}\n\n`;
  msg += `Ascend High Jewelry Studio`;

  const waUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

function importApprovedProjectToFinalTray() {
  const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
  let activeCtx = {};
  if (store && store.getActiveContext) {
    activeCtx = store.getActiveContext();
  }

  let serialsToImport = Array.isArray(window.selected) && window.selected.length ? [...window.selected] : [];

  if (!serialsToImport.length && activeCtx.project && Array.isArray(activeCtx.project.selectedSerials)) {
    serialsToImport = [...activeCtx.project.selectedSerials];
  }

  if (!serialsToImport.length) {
    alert("No lookbook items found to import. Select pieces or load an active project first.");
    return 0;
  }

  const addedCount = importLookbookSelectionToFinalTray(serialsToImport);

  if (typeof switchTab === 'function') {
    switchTab('finalTray');
  }

  return addedCount;
}

window.toggle = toggle;
window.removeFromSelected = function(id) {
  toggle(id);
};
window.syncCurrentSelectionToProject = syncCurrentSelectionToProject;
window.shareSelectionToWhatsApp = shareSelectionToWhatsApp;
window.shareLookbookToWhatsApp = shareLookbookToWhatsApp;
window.importApprovedProjectToFinalTray = importApprovedProjectToFinalTray;
window.renderFloatingSelectionBar = renderFloatingSelectionBar;
window.switchTab = switchTab;
window.generateSelectionPdf = generateSelectionPdf;
window.downloadCurrentPdf = downloadCurrentPdf;
window.downloadCoverPdf = downloadCoverPdf;
window.shareCurrentPdf = shareCurrentPdf;
window.exportAndSharePdfToWhatsApp = exportAndSharePdfToWhatsApp;
window.openMiniWebsiteModal = openMiniWebsiteModal;
window.createMiniWebsiteFromModal = createMiniWebsiteFromModal;
window.closeMiniWebsiteModal = closeMiniWebsiteModal;
window.addBulkSerialsToFinalTray = addBulkSerialsToFinalTray;
window.generateFinalTrayFromSerials = generateFinalTrayFromSerials;
window.shareFinalTrayPdf = shareFinalTrayPdf;
window.clearAllSelected = clearAllSelected;
window.removeMarkedFromSelected = removeMarkedFromSelected;
window.selectAllByBrand = selectAllByBrand;
window.toggleFilterMenu = toggleFilterMenu;
window.toggleBreakdown = toggleBreakdown;
window.onSearchInput = onSearchInput;
window.onFilterChanged = onFilterChanged;
window.goToPrevPage = goToPrevPage;
window.goToNextPage = goToNextPage;
window.changePageSize = changePageSize;
window.goToPrevSelectedPage = goToPrevSelectedPage;
window.goToNextSelectedPage = goToNextSelectedPage;
window.changeSelectedPageSize = changeSelectedPageSize;




