import * as ProjectStore from './modules/project-store.js';
import { initProjectUI, renderProjectBar } from './modules/project-ui.js';
import './pdf/pdf.js';
import './modules/catalog-data.js';
import './modules/mini-website.js';

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
let finalTrayItems = [];
let finalTraySuggestionIndex = -1;
let dataBySerial = new Map();
let returnProductsState = [];
let returnProductsFilter = "";

import { API_URL, APP_BUILD_TAG } from './config.js';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
    finalTraySerials = project && project.selectedSerials ? [...project.selectedSerials] : [];
    returnProductsState = []; // Force rebuild of return products state next time it's viewed
    updateTabBadge();
    render();
    if (typeof window.renderDashboard === 'function') {
      window.renderDashboard();
    }
    if (typeof window.renderFinalTraySerialManager === 'function') {
      window.renderFinalTraySerialManager();
    }
    if (typeof window.renderHomepageProjectsSection === 'function') {
      window.renderHomepageProjectsSection();
    }
  }
});

// Load active project items into selection
const { project: initialActiveProject } = ProjectStore.getActiveContext();
if (initialActiveProject && Array.isArray(initialActiveProject.selectedSerials)) {
  selected = [...initialActiveProject.selectedSerials];
  finalTraySerials = [...initialActiveProject.selectedSerials];
}

if (typeof window.renderDashboard === 'function') {
  window.renderDashboard();
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

  try {
    const res = await fetch(`${API_URL}?t=${new Date().getTime()}`, { cache: "no-store", redirect: "follow" });
    const json = await res.json();
    data = Array.isArray(json) ? json : (json.data || []);
  } catch (err) {
    console.warn("Could not fetch remote catalog data, using fallback archive", err);
  }

  if (!Array.isArray(data) || data.length === 0) {
    if (typeof window.getFallbackCatalogData === 'function') {
      data = window.getFallbackCatalogData();
    }
  }

  window.rebuildDataIndex();
  selected = selected.filter(id => {
    const item = dataBySerial.get(id);
    return item && window.normalizeStatus(item["Status"]) !== "marked";
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

  try {
    const res = await fetch(`${API_URL}?t=${new Date().getTime()}`, { cache: "no-store", redirect: "follow" });
    const json = await res.json();
    return Array.isArray(json) ? json : (json.data || []);
  } catch (err) {
    console.error("Failed to fetch inventory for export", err);
    return [];
  }
}

window.getInventoryForExport = getInventoryForExport;


function updateTabBadge() {
  renderFloatingSelectionBar();
  const badge = document.getElementById("browseTabBadge");
  const bottomBadge = document.getElementById("bottomNavBadge");
  if (badge) {
    if (selected.length > 0) {
      badge.textContent = `${selected.length}`;
    } else {
      badge.textContent = "";
    }
  }
  if (bottomBadge) {
    if (selected.length > 0) {
      bottomBadge.textContent = `${selected.length}`;
    } else {
      bottomBadge.textContent = "";
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
  if (event) event.stopPropagation();
  const overlay = document.getElementById("filterGalleryOverlay");
  const backdrop = document.getElementById("filterGalleryBackdrop");
  if (!overlay || !backdrop) return;
  overlay.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  // force reflow
  void overlay.offsetWidth;
  overlay.classList.add("open");
  backdrop.classList.add("open");
  renderFilterMenu();
}

function closeFilterMenu() {
  const overlay = document.getElementById("filterGalleryOverlay");
  const backdrop = document.getElementById("filterGalleryBackdrop");
  if (!overlay || !backdrop) return;
  overlay.classList.remove("open");
  backdrop.classList.remove("open");
  setTimeout(() => {
    overlay.classList.add("hidden");
    backdrop.classList.add("hidden");
  }, 300);
}

window.onFilterGalleryScroll = function() {
  const container = document.getElementById("filterSwipeContainer");
  const tabBrand = document.getElementById("filterTabBrand");
  const tabType = document.getElementById("filterTabType");
  if (!container || !tabBrand || !tabType) return;
  
  const scrollRatio = container.scrollLeft / container.clientWidth;
  if (scrollRatio > 0.5) {
    tabBrand.classList.remove("active");
    tabType.classList.add("active");
  } else {
    tabBrand.classList.add("active");
    tabType.classList.remove("active");
  }
};

window.scrollToFilterPage = function(page) {
  const container = document.getElementById("filterSwipeContainer");
  if (!container) return;
  if (page === 'type') {
    container.scrollTo({ left: container.clientWidth, behavior: 'smooth' });
  } else {
    container.scrollTo({ left: 0, behavior: 'smooth' });
  }
};

window.closeFilterMenu = closeFilterMenu;

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

  const clickedInsideMenu = menu.contains(event.target);
  const clickedToggle = event.target.closest('#filterToggleBtn');

  if (!menu.classList.contains("hidden") && !clickedInsideMenu && !clickedToggle && !wrap.contains(event.target)) {
    menu.classList.add("hidden");
  }
});

window.toggleControlsCollapse = toggleControlsCollapse;

function renderActiveFilterChips() {
  const container = document.getElementById("activeFiltersContainer");
  if (!container) return;
  
  const currentType = getActiveFilterSelections("type");
  const currentBrand = getActiveFilterSelections("brand");
  
  if (currentType.length === 0 && currentBrand.length === 0) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }
  
  container.classList.remove("hidden");
  
  let html = "";
  currentBrand.forEach(b => {
    html += `
      <div class="filter-chip">
        ${b}
        <div class="filter-chip-remove" onclick="toggleCatalogueFilter('brand', '${b.replace(/'/g, "\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    `;
  });
  
  currentType.forEach(t => {
    html += `
      <div class="filter-chip">
        ${t}
        <div class="filter-chip-remove" onclick="toggleCatalogueFilter('type', '${t.replace(/'/g, "\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function renderFilterMenu() {
  const filterTypePageNode = document.getElementById("filterTypePage");
  const filterBrandPageNode = document.getElementById("filterBrandPage");
  const filterTypeTriggerText = document.getElementById("filterTypeTriggerText");
  const filterBrandTriggerText = document.getElementById("filterBrandTriggerText");
  const filterStatusNode = document.getElementById("filterStatus");
  const hideMarkedNode = document.getElementById("hideMarked");
  const searchSerialNode = document.getElementById("searchSerial");

  const currentType = getActiveFilterSelections("type");
  const currentBrand = getActiveFilterSelections("brand");
  const currentStatus = filterStatusNode ? filterStatusNode.value : "";
  const hideMarked = hideMarkedNode ? hideMarkedNode.checked : false;
  const searchQuery = searchSerialNode ? searchSerialNode.value.trim().toUpperCase() : "";

  function matches(item, ignoreType = false, ignoreBrand = false) {
    const status = window.normalizeStatus(item["Status"]);
    if (hideMarked && status === "marked") return false;
    if (currentStatus === "marked" && status !== "marked") return false;
    if (currentStatus === "unmarked" && status === "marked") return false;
    if (searchQuery && !String(item["Serial No"] || "").toUpperCase().includes(searchQuery)) return false;

    if (!ignoreType && currentType.length && !currentType.includes(String(item["Type"] || "").trim())) return false;
    if (!ignoreBrand && currentBrand.length && !currentBrand.includes(String(item["Brand Name"] || "").trim())) return false;

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

  const allTypes = Array.from(new Set(data.map(i => String(i["Type"] || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
  const allBrands = Array.from(new Set(data.map(i => String(i["Brand Name"] || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

  if (filterTypePageNode) {
    const totalMatchingType = data.filter(i => matches(i, true, false)).length;
    if (filterTypeTriggerText) {
      const typeSummary = currentType.length ? currentType.join(', ') : 'All types';
      filterTypeTriggerText.textContent = typeSummary;
    }
    let html = `
      <div class="filter-item-row ${currentType.length === 0 ? 'selected' : ''}" onclick="toggleCatalogueFilter('type','')">
        <div class="filter-item-info">
          <span class="filter-item-name">All Types</span>
          <span class="filter-item-count">${totalMatchingType} items</span>
        </div>
        <div class="circular-checkbox"></div>
      </div>
    `;
    html += allTypes.map(t => {
      const count = typeCounts.get(t) || 0;
      const active = currentType.includes(t);
      return `
        <div class="filter-item-row ${active ? 'selected' : ''}" onclick="toggleCatalogueFilter('type','${t.replace(/'/g, "\\'")}' )">
          <div class="filter-item-info">
            <span class="filter-item-name">${t}</span>
            <span class="filter-item-count">${count} items</span>
          </div>
          <div class="circular-checkbox"></div>
        </div>
      `;
    }).join('');
    filterTypePageNode.innerHTML = html;
  }

  if (filterBrandPageNode) {
    const totalMatchingBrand = data.filter(i => matches(i, false, true)).length;
    if (filterBrandTriggerText) {
      const brandSummary = currentBrand.length ? currentBrand.join(', ') : 'All brands';
      filterBrandTriggerText.textContent = brandSummary;
    }
    let html = `
      <div class="filter-item-row ${currentBrand.length === 0 ? 'selected' : ''}" onclick="toggleCatalogueFilter('brand','')">
        <div class="filter-item-info">
          <span class="filter-item-name">All Brands</span>
          <span class="filter-item-count">${totalMatchingBrand} items</span>
        </div>
        <div class="circular-checkbox"></div>
      </div>
    `;
    html += allBrands.map(b => {
      const count = brandCounts.get(b) || 0;
      const active = currentBrand.includes(b);
      return `
        <div class="filter-item-row ${active ? 'selected' : ''}" onclick="toggleCatalogueFilter('brand','${b.replace(/'/g, "\\'")}' )">
          <div class="filter-item-info">
            <span class="filter-item-name">${b}</span>
            <span class="filter-item-count">${count} items</span>
          </div>
          <div class="circular-checkbox"></div>
        </div>
      `;
    }).join('');
    filterBrandPageNode.innerHTML = html;
  }

  renderActiveFilterChips();
  renderCategoryBar(typeCounts);
  renderCountSummary(brandCounts, typeCounts);
  updateFilterActiveBadge();
  updateSelectButtonLabel();
}

function getActiveFilterSelections(kind) {
  const storageKey = kind === 'type' ? 'catalogueFilterTypes' : 'catalogueFilterBrands';
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (e) {
    return [];
  }
}

function setActiveFilterSelections(kind, values) {
  const storageKey = kind === 'type' ? 'catalogueFilterTypes' : 'catalogueFilterBrands';
  window.localStorage.setItem(storageKey, JSON.stringify(values));
}

function toggleFilterChoice(kind) {
  const currentPanel = kind === 'type' ? document.getElementById('filterTypeOptions') : document.getElementById('filterBrandOptions');
  if (!currentPanel) return;
  const otherPanel = kind === 'type' ? document.getElementById('filterBrandOptions') : document.getElementById('filterTypeOptions');
  currentPanel.classList.toggle('hidden');
  if (otherPanel) {
    otherPanel.classList.add('hidden');
  }
}

window.toggleFilterChoice = toggleFilterChoice;

function toggleCatalogueFilter(kind, value) {
  const current = getActiveFilterSelections(kind);
  if (!value) {
    setActiveFilterSelections(kind, []);
  } else {
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    setActiveFilterSelections(kind, next);
  }
  onFilterChanged(kind);
}

window.toggleCatalogueFilter = toggleCatalogueFilter;

function clearCatalogueFilters() {
  setActiveFilterSelections('type', []);
  setActiveFilterSelections('brand', []);
  const filterStatusNode = document.getElementById('filterStatus');
  const hideMarkedNode = document.getElementById('hideMarked');
  const searchSerialNode = document.getElementById('searchSerial');
  if (filterStatusNode) filterStatusNode.value = '';
  if (hideMarkedNode) hideMarkedNode.checked = true;
  if (searchSerialNode) searchSerialNode.value = '';
  onFilterChanged('clear');
}

window.clearCatalogueFilters = clearCatalogueFilters;

function updateFilterActiveBadge() {
  const filterType = getActiveFilterSelections('type');
  const filterBrand = getActiveFilterSelections('brand');
  const filterStatus = document.getElementById("filterStatus")?.value || "";
  const searchQuery = document.getElementById("searchSerial")?.value.trim() || "";

  let count = 0;
  if (filterType.length) count++;
  if (filterBrand.length) count++;
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

  const filterType = getActiveFilterSelections('type');
  const filterBrand = getActiveFilterSelections('brand');

  const filtered = getFilteredItems();
  const unmarkedCount = filtered.filter(d => window.normalizeStatus(d["Status"]) !== "marked").length;

  if (filterBrand.length && filterType.length) {
    btn.textContent = `Select ${filterBrand.join(', ')} + ${filterType.join(', ')} (${unmarkedCount})`;
  } else if (filterBrand.length) {
    btn.textContent = `Select ${filterBrand.join(', ')} (${unmarkedCount})`;
  } else if (filterType.length) {
    btn.textContent = `Select ${filterType.join(', ')} (${unmarkedCount})`;
  } else {
    btn.textContent = `Select visible (${unmarkedCount})`;
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
  renderFilterMenu();
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
  const marked = data.filter(item => window.normalizeStatus(item["Status"]) === "marked").length;
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
  renderFilterMenu();
  render();
}
window.onFilterChanged = onFilterChanged;

window.selectAllFiltered = function() {
  const filtered = getFilteredItems();
  let addedCount = 0;
  const newSelected = [...selected];
  filtered.forEach(item => {
    const id = item["Serial No"];
    if (!newSelected.includes(id)) {
      newSelected.push(id);
      addedCount++;
    }
  });
  if (addedCount > 0) {
    selected = newSelected;
    updateTabBadge();
    render();
    renderSelected();
    showToast(`Added ${addedCount} items to your selection.`);
  } else {
    showToast("All matching items are already selected.");
  }
};

window.deselectAllFiltered = function() {
  const filtered = getFilteredItems();
  const filteredIds = new Set(filtered.map(item => item["Serial No"]));
  const initialLength = selected.length;
  
  selected = selected.filter(id => !filteredIds.has(id));
  const removedCount = initialLength - selected.length;
  
  if (removedCount > 0) {
    updateTabBadge();
    render();
    renderSelected();
    showToast(`Removed ${removedCount} items from your selection.`);
  } else {
    showToast("None of the matching items are currently selected.");
  }
};
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
    const status = window.normalizeStatus(item["Status"]);
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
        </div>
        <p class="card-label">${item["Serial No"]}</p>
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
  if (item && window.normalizeStatus(item["Status"]) === "marked") {
    showToast("This item is unavailable and cannot be selected.");
    return;
  }

  if (selected.includes(id)) {
    selected = selected.filter(x => x !== id);
  } else {
    selected = [...selected, id];
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
    if (selectedItems.length === 0) {
      summary.textContent = "0 items";
    } else {
      summary.textContent = `${selectedItems.length} item${selectedItems.length === 1 ? "" : "s"}`;
    }
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
    area.innerHTML = '<div class="selection-empty">No items selected. Select items from the inventory to continue.</div>';
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
        </div>
        <p class="card-label">${item["Serial No"]}</p>
      </div>
    `;
    }).join("");

  renderSelectedPager(selectedItems.length);

  if (typeof window.updateMiniWebsiteModalPreview === 'function') {
    window.updateMiniWebsiteModalPreview();
  }
}

window.render = render;
window.initFilter = initFilter;
window.renderSelected = renderSelected;

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
  const filterStatusNode = document.getElementById("filterStatus");
  const hideMarkedNode = document.getElementById("hideMarked");

  const filterType = getActiveFilterSelections('type');
  const filterBrand = getActiveFilterSelections('brand');
  const filterStatus = filterStatusNode ? filterStatusNode.value : "";
  const hideMarked = hideMarkedNode ? hideMarkedNode.checked : false;

  let filtered = data.filter(d => {
    const status = window.normalizeStatus(d["Status"]);
    const itemType = String(d["Type"] || "").trim();
    const itemBrand = String(d["Brand Name"] || "").trim();
    const serial = String(d["Serial No"] || "").trim();
    const typeMatch = !filterType.length || filterType.includes(itemType);
    const brandMatch = !filterBrand.length || filterBrand.includes(itemBrand);
    const returnEntry = returnProductsState.find(entry => entry.serial === serial);
    const isDamaged = !!(returnEntry && returnEntry.condition === "damaged");

    if (!typeMatch || !brandMatch) {
      return false;
    }

    if (isDamaged) {
      return false;
    }

    if (hideMarked && status === "unavailable") {
      return false;
    }

    if (filterStatus === "unavailable" && status !== "unavailable") {
      return false;
    }

    if (filterStatus === "available" && status === "unavailable") {
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
    showToast("Please select items to prepare the PDF.");
    return;
  }

  if (selected.length > 300) {
    showToast("Large export detected. Compact PDF mode will be used to keep generation stable for high item counts.");
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
      showToast(`${pageNote}PDF ready.\n\n⚠️ ${allMissingImages.length} item${allMissingImages.length === 1 ? "" : "s"} had no loadable image and show a placeholder:\n${allMissingImages.join(", ")}`);
    } else if (collageBlobs.length > 1) {
      showToast(`${pageNote}Preview updated.`);
    }

  } catch (err) {
    console.error(err);
    showToast("Error preparing the PDF. Please try different images.");
  } finally {
    showSpinner(false);
  }
}

async function generateFinalTrayFromSerials(isBypassed = false) {
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

  let itemsToExport = resolveItemsBySerials(serials);
  if (!itemsToExport.length && (!finalTraySerials || !finalTraySerials.length)) {
    showToast("Please select items from the inventory or add serials to the Client Kit first.");
    return;
  }

  // Validate availability before proceeding
  if (!isBypassed) {
    validateFinalTrayAvailabilityAndProceed((bypassed) => {
      generateFinalTrayFromSerials(true);
    }, isBypassed);
    return;
  }

  if (serials.length > 300) {
    showToast("Large export detected. Compact PDF mode will be used to keep generation stable.");
  }

  showSpinner(true);
  setSerialFeedback(`Preparing Client Kit PDF for ${serials.length} item(s)...`, false);

  try {
    const exportItems = resolveItemsBySerials(serials);
    if (!exportItems.length) {
      showToast("No matching items found in inventory for the Client Kit serials.");
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
      throw new Error("Unable to prepare Client Kit PDF pages");
    }

    collageBlobs = generatedBlobs;
    lastBlob = collageBlobs[0];
    lastExportItems = exportItems;
    lastExportTitle = "Client Kit Catalogue";
    lastExportKind = "final-tray";
    lastPdfBlob = null;

    await rebuildPdfPreview();

    setSerialFeedback(`Done. Client Kit PDF generated for ${exportItems.length} item(s).`, false);

    if (typeof buildReturnProductsStateFromFinalTray === 'function') {
      buildReturnProductsStateFromFinalTray();
      if (typeof persistReturnProductsState === 'function') {
        persistReturnProductsState();
      }
    }

    const postActions = document.getElementById("finalTrayPostActions");
    if (postActions) {
      postActions.classList.remove("hidden-actions");
      postActions.classList.add("visible-actions");
    }

    // Persist final-tray summary onto the active project so the homepage dashboard reflects it
    try {
      const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
      const activeCtx = store && store.getActiveContext ? store.getActiveContext() : {};
      const activeProject = activeCtx.project;
      if (store && store.updateProject && activeProject) {
        const today = new Date().toISOString().split('T')[0];
        const finalTraySharedDate = activeProject.finalTraySharedDate || today;
        
        // Calculate followUpDate = 15 days after finalTraySharedDate if missing
        let followUpDate = activeProject.followUpDate;
        if (!followUpDate) {
          const d = new Date(finalTraySharedDate);
          d.setDate(d.getDate() + 15);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          followUpDate = `${yyyy}-${mm}-${dd}`;
        }

        let returnDueDate = activeProject.returnDueDate;
        if (!returnDueDate) {
          const d = new Date(finalTraySharedDate);
          d.setDate(d.getDate() + 7);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          returnDueDate = `${yyyy}-${mm}-${dd}`;
        }

        const finalTrayStatus = "Waiting for Return";
        const updatedProject = store.updateProject(activeProject.id, {
          status: finalTrayStatus,
          projectStatus: finalTrayStatus,
          finalTraySharedDate,
          followUpDate,
          returnDueDate,
          selectedSerials: serials,
          productStats: {
            sent: exportItems.length,
            returned: 0,
            pending: exportItems.length,
            missing: 0
          },
          deliverables: {
            completed: 0,
            total: 5
          },
          socialPosting: {
            status: "Pending",
            postingDate: ""
          },
          payment: {
            invoiceAmount: activeProject.payment?.invoiceAmount || 0,
            amountReceived: activeProject.payment?.amountReceived || 0,
            status: activeProject.payment?.status || "Pending"
          }
        });

        if (updatedProject && typeof window.renderHomepageProjectsGateway === 'function') {
          window.renderHomepageProjectsGateway();
        }
      }
    } catch (e) {
      console.warn("Could not persist final tray project summary", e);
    }

  } catch (err) {
    console.error("Error preparing Client Kit PDF:", err);
    showToast("Error preparing Client Kit PDF. Please try again.");
    setSerialFeedback("Error preparing Client Kit PDF.", true);
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
    
    // Add rich object representation
    finalTrayItems.push({
      serial: normalized,
      quantity: 1,
      customPrice: null,
      notes: ""
    });
    
    addedCount += 1;
  });

  // Sync with AppStore
  if (typeof store !== 'undefined' && store.setFinalTrayItems) {
    store.setFinalTrayItems(finalTrayItems);
  }

  if (addedCount > 0 && typeof buildReturnProductsStateFromFinalTray === 'function') {
    buildReturnProductsStateFromFinalTray();
    if (typeof persistReturnProductsState === 'function') {
      persistReturnProductsState();
    }
  }

  return addedCount;
}

function importLookbookSelectionToFinalTray(serials) {
  const incoming = Array.isArray(serials) ? serials.filter(Boolean) : [];
  if (!incoming.length) return 0;

  let newSelected = [...selected];
  incoming.forEach(id => {
    const normalized = sanitizeSerialToken(id);
    if (normalized && !newSelected.includes(normalized)) {
      newSelected.push(normalized);
    }
  });
  selected = newSelected;

  const added = addSerialsToFinalTray(incoming);

  syncCurrentSelectionToProject();
  updateTabBadge();
  render();
  renderFinalTraySerialManager();
  updateMiniWebsiteModalPreview();

  setSerialFeedback(`Imported ${incoming.length} lookbook item${incoming.length === 1 ? '' : 's'} into Client Kit!`, false);

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
  finalTrayItems = finalTrayItems.filter((item) => item.serial !== normalized);
  if (typeof store !== 'undefined' && store.setFinalTrayItems) {
    store.setFinalTrayItems(finalTrayItems);
  }
  if (Array.isArray(returnProductsState)) {
    returnProductsState = returnProductsState.filter(item => item.serial !== normalized);
    if (typeof persistReturnProductsState === 'function') {
      persistReturnProductsState();
    }
  }
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
    setSerialFeedback(`Added ${added} code${added === 1 ? "" : "s"} to Client Kit list.`, false);
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

function isProductAvailableForFinalTray(serialNo, currentProjectId = null) {
  if (!serialNo) return { available: false, reason: "Invalid item", project: null };
  const sNo = String(serialNo).trim();
  if (!sNo) return { available: false, reason: "Invalid item", project: null };

  // 1. Check dataBySerial status
  if (typeof dataBySerial !== 'undefined' && dataBySerial && dataBySerial.has(sNo)) {
    const item = dataBySerial.get(sNo);
    const statusStr = String(item["Status"] || "").toLowerCase();
    if (statusStr === "missing") {
      return { available: false, reason: "Marked as Missing", project: null };
    }
  }

  // 2. Check active projects in ProjectStore
  const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
  if (store && typeof store.getProjects === 'function') {
    const projects = store.getProjects();
    for (const p of projects) {
      // Skip current project (Rule 21: Current Project Exception)
      if (currentProjectId && p.id === currentProjectId) {
        continue;
      }

      const pStatus = String(p.projectStatus || p.status || "").toLowerCase();
      const isCompleted = pStatus === 'completed' || pStatus === 'returned';
      const isFinalTrayShared = !!p.finalTraySharedDate && !isCompleted;

      if (isFinalTrayShared && Array.isArray(p.selectedSerials) && p.selectedSerials.includes(sNo)) {
        const celebrity = store.getCelebrityById ? store.getCelebrityById(p.celebrityId) : null;
        const stylist = store.getStylistById ? store.getStylistById(p.stylistId) : null;
        const celebName = celebrity ? celebrity.name : (p.title || 'Another Project');
        const stylistName = stylist ? stylist.name : '';
        const returnDue = p.returnDueDate || '';

        return {
          available: false,
          reason: `Out with ${celebName}${stylistName ? ' (Stylist: ' + stylistName + ')' : ''}`,
          project: p,
          projectTitle: p.title,
          celebrityName: celebName,
          stylistName: stylistName,
          returnDueDate: returnDue
        };
      }
    }
  }

  return { available: true, reason: "Available", project: null };
}

window.isProductAvailableForFinalTray = isProductAvailableForFinalTray;

function validateFinalTrayAvailabilityAndProceed(onProceed, isBypassed = false) {
  if (isBypassed) {
    onProceed();
    return;
  }

  const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
  const activeCtx = store && store.getActiveContext ? store.getActiveContext() : {};
  const activeProject = activeCtx.project;
  const activeProjectId = activeProject ? activeProject.id : null;

  let targetSerials = [...finalTraySerials];
  if (!targetSerials.length && Array.isArray(selected) && selected.length) {
    targetSerials = [...selected];
  }
  if (!targetSerials.length && activeProject && Array.isArray(activeProject.selectedSerials)) {
    targetSerials = [...activeProject.selectedSerials];
  }

  if (!targetSerials.length) {
    onProceed();
    return;
  }

  const availableSerials = [];
  const unavailableItems = [];

  targetSerials.forEach((serial) => {
    const avail = isProductAvailableForFinalTray(serial, activeProjectId);
    if (avail.available) {
      availableSerials.push(serial);
    } else {
      const itemData = typeof dataBySerial !== 'undefined' && dataBySerial ? dataBySerial.get(serial) : null;
      const title = itemData ? (itemData["Title"] || itemData["Name"] || serial) : serial;
      const brand = itemData ? (itemData["Brand"] || activeProject?.jewelleryBrand || "Ascend Fine Jewellery") : (activeProject?.jewelleryBrand || "Ascend Fine Jewellery");

      unavailableItems.push({
        serial: serial,
        title: title,
        brand: brand,
        reason: avail.reason,
        projectTitle: avail.projectTitle || "Another Project",
        celebrityName: avail.celebrityName || "Client",
        stylistName: avail.stylistName || "",
        returnDueDate: avail.returnDueDate || ""
      });
    }
  });

  if (unavailableItems.length === 0) {
    onProceed();
    return;
  }

  showUnavailableProductsModal({
    activeProject: activeProject,
    availableSerials: availableSerials,
    unavailableItems: unavailableItems,
    onContinueAvailable: () => {
      finalTraySerials = [...availableSerials];
      selected = [...availableSerials];
      if (store && store.updateProjectItems && activeProjectId) {
        store.updateProjectItems(activeProjectId, availableSerials);
      }
      renderFinalTraySerialManager();
      onProceed(true);
    }
  });
}

function showUnavailableProductsModal({ activeProject, availableSerials, unavailableItems, onContinueAvailable }) {
  let modal = document.getElementById("unavailableProductsModalOverlay");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "unavailableProductsModalOverlay";
    modal.className = "project-modal-overlay";
    document.body.appendChild(modal);
  }

  const unavailableRows = unavailableItems.map(item => `
    <div style="padding: 12px; border: 1px solid #fecaca; border-radius: 8px; margin-bottom: 10px; background: #fff5f5;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #991b1b;">
          <i class="fa-solid fa-xmark" style="color: #dc2626;"></i> ${escapeHtml(item.title)} (${escapeHtml(item.serial)})
        </div>
        <span class="prod-badge badge-missing" style="margin: 0; font-size: 0.75rem;">Unavailable</span>
      </div>
      <div style="font-size: 0.82rem; color: #7f1d1d; margin-top: 4px;">
        Brand: <strong>${escapeHtml(item.brand)}</strong> &nbsp;|&nbsp; ${escapeHtml(item.reason)}
      </div>
      ${item.returnDueDate ? `<div style="font-size: 0.8rem; color: #991b1b; margin-top: 2px;"><i class="fa-solid fa-clock"></i> Expected Return: <strong>${formatDateDisplay(item.returnDueDate)}</strong></div>` : ''}
    </div>
  `).join('');

  const hasAvailable = availableSerials.length > 0;

  modal.innerHTML = `
    <div class="project-modal-card fashion-theme" style="max-width: 560px; box-sizing: border-box;">
      <div class="project-modal-header" style="background: #fff1f2; border-bottom: 1px solid #fecdd3;">
        <h3 style="color: #9f1239;"><i class="fa-solid fa-triangle-exclamation" style="color: #e11d48;"></i> ${hasAvailable ? 'Some Selected Products Are Unavailable' : 'All Selected Products Are Unavailable'}</h3>
        <button class="btn-close-modal" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'">&times;</button>
      </div>

      <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
        <p style="margin: 0 0 14px 0; font-size: 0.88rem; color: #44403c;">
          ${hasAvailable ? `<strong>${unavailableItems.length}</strong> of your selected products are currently committed to other active projects and cannot be included in a new Client Kit:` : `No selected products are currently available for Client Kit sharing:`}
        </p>

        ${unavailableRows}

        ${hasAvailable ? `
          <div style="padding: 10px 14px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin-top: 14px; color: #166534; font-size: 0.86rem; font-weight: 600;">
            <i class="fa-solid fa-check" style="color: #16a34a;"></i> ${availableSerials.length} product(s) are available and ready to be shared.
          </div>
        ` : ''}
      </div>

      <div class="project-modal-footer" style="padding: 14px 20px; display: flex; flex-direction: column; gap: 10px; background: #fafaf9; border-top: 1px solid #e7e5e4;">
        <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
          <button class="btn-qa btn-qa-secondary" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'">Cancel</button>

          <button class="btn-qa btn-qa-secondary" style="border-color: #d4af37; color: #854d0e; background: #fefce8;" onclick="window.handleGenerateUnavailablePdfClick()">
            <i class="fa-solid fa-file-pdf"></i> Generate Unavailable PDF
          </button>

          ${hasAvailable ? `
            <button class="btn-qa btn-qa-primary" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'; window._onContinueAvailableAction();">
              <i class="fa-solid fa-arrow-right"></i> Continue with ${availableSerials.length} Available
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  window._onContinueAvailableAction = onContinueAvailable;
  window._lastUnavailableModalData = { activeProject, unavailableItems };
  modal.style.display = "flex";
}

window.handleGenerateUnavailablePdfClick = async function() {
  const data = window._lastUnavailableModalData;
  if (!data || !data.unavailableItems || !data.unavailableItems.length) return;

  const result = await generateUnavailableProductsPdf(data.activeProject, data.unavailableItems);
  if (!result || !result.blob) return;

  triggerBlobDownload(result.blob, result.fileName);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const projTitle = data.activeProject ? data.activeProject.title : "Jewellery Curation";
  const whatsappText = encodeURIComponent(
    `📄 *PRODUCT AVAILABILITY UPDATE — ${projTitle.toUpperCase()}*\n` +
    `Document File: ${result.fileName}\n\n` +
    `Some requested pieces are currently unavailable with other projects. Please see the attached PDF for details.`
  );

  const waUrl = isMobile
    ? `https://api.whatsapp.com/send?text=${whatsappText}`
    : `https://web.whatsapp.com/send?text=${whatsappText}`;

  if (navigator.canShare) {
    const file = new File([result.blob], result.fileName, { type: "application/pdf" });
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Unavailable Products Update",
          text: `📄 Unavailable Products Update - ${projTitle}`
        });
        return;
      } catch (e) {}
    }
  }

  openWhatsAppComposer(waUrl);
};

async function generateUnavailableProductsPdf(activeProject, unavailableItems) {
  const jsPdfApi = window.jspdf && window.jspdf.jsPDF;
  if (!jsPdfApi) {
    showToast("PDF generator library is loading. Please try again.");
    return null;
  }

  const pdf = new jsPdfApi({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 36;

  pdf.setFillColor(24, 24, 27);
  pdf.rect(0, 0, pageWidth, 75, "F");

  pdf.setFillColor(212, 175, 55);
  pdf.rect(0, 75, pageWidth, 4, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(255, 255, 255);
  pdf.text("PRODUCT AVAILABILITY UPDATE", margin, 42);

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(212, 175, 55);
  pdf.text("ASCEND HIGH JEWELRY CURATION", margin, 58);

  const projTitle = activeProject ? activeProject.title : "Jewellery Curation";
  const todayStr = formatDateDisplay(new Date().toISOString().split('T')[0]);

  let y = 105;
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(24, 24, 27);
  pdf.text(`Project: ${projTitle}`, margin, y);

  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(115, 115, 115);
  y += 16;
  pdf.text(`Generated Date: ${todayStr}   |   Total Excluded Items: ${unavailableItems.length}`, margin, y);

  y += 24;

  pdf.setFillColor(245, 245, 244);
  pdf.rect(margin, y, pageWidth - (margin * 2), 24, "F");
  pdf.setDrawColor(231, 229, 228);
  pdf.rect(margin, y, pageWidth - (margin * 2), 24, "S");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(24, 24, 27);
  pdf.text("Serial Code", margin + 10, y + 15);
  pdf.text("Product Details", margin + 110, y + 15);
  pdf.text("Availability Status", margin + 280, y + 15);
  pdf.text("Expected Return", margin + 440, y + 15);

  y += 24;

  unavailableItems.forEach((item, index) => {
    if (y > pageHeight - 60) {
      pdf.addPage();
      y = 40;
    }

    const rowBg = index % 2 === 0 ? [255, 255, 255] : [250, 250, 249];
    pdf.setFillColor(rowBg[0], rowBg[1], rowBg[2]);
    pdf.rect(margin, y, pageWidth - (margin * 2), 36, "F");
    pdf.setDrawColor(240, 238, 237);
    pdf.rect(margin, y, pageWidth - (margin * 2), 36, "S");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.setTextColor(24, 24, 27);
    pdf.text(String(item.serial), margin + 10, y + 21);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    const shortTitle = String(item.title).length > 28 ? String(item.title).substring(0, 26) + "..." : String(item.title);
    pdf.text(shortTitle, margin + 110, y + 15);
    pdf.setFontSize(7.5);
    pdf.setTextColor(120, 113, 108);
    pdf.text(`Brand: ${item.brand}`, margin + 110, y + 27);

    pdf.setFontSize(8.5);
    pdf.setTextColor(180, 83, 9);
    pdf.text(item.reason, margin + 280, y + 21);

    pdf.setTextColor(87, 83, 78);
    const retStr = item.returnDueDate ? formatDateDisplay(item.returnDueDate) : "Pending";
    pdf.text(retStr, margin + 440, y + 21);

    y += 36;
  });

  y += 20;
  if (y < pageHeight - 40) {
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(168, 162, 158);
    pdf.text("This document is an inventory availability notice. Available pieces will be shared in a separate Client Kit.", margin, y);
  }

  const pdfBlob = pdf.output("blob");
  const fileName = `Unavailable_Products_${String(projTitle).replace(/[^a-zA-Z0-9_-]/g, "_")}_${new Date().toISOString().split('T')[0]}.pdf`;

  return { blob: pdfBlob, fileName: fileName };
}

function renderFinalTraySerialManager() {
  const listNode = document.getElementById("finalTrayList");
  const metaNode = document.getElementById("finalTrayListMeta");
  const inputNode = document.getElementById("finalTraySearchInput");
  const suggestionsNode = document.getElementById("finalTraySuggestions");

  if (!listNode || !metaNode || !suggestionsNode || !inputNode) {
    return;
  }

  metaNode.textContent = `${finalTrayItems.length} code${finalTrayItems.length === 1 ? "" : "s"} in Client Kit list`;

  if (!finalTrayItems || finalTrayItems.length === 0) {
    listNode.innerHTML = '<span class="panel-meta">0 items</span>';
  } else {
    const resolvedItemsMap = new Map();
    const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
    const activeCtx = store && store.getActiveContext ? store.getActiveContext() : {};
    const activeProjectId = activeCtx.project ? activeCtx.project.id : null;

    if (Array.isArray(window.data) && window.data.length > 0) {
      window.data.forEach(item => {
        const key = sanitizeSerialToken(item["Serial No"] || "");
        if (key && !resolvedItemsMap.has(key)) {
          resolvedItemsMap.set(key, item);
        }
      });
    }

    listNode.innerHTML = finalTrayItems.map((ftItem) => {
      const serial = ftItem.serial;
      const cleanSerial = sanitizeSerialToken(serial);
      const matchedItem = resolvedItemsMap.get(cleanSerial);

      const avail = isProductAvailableForFinalTray(serial, activeProjectId);
      const isUnavailable = !avail.available;

      if (matchedItem) {
        const primaryUrl = typeof window.getPreviewImageUrl === 'function' ? window.getPreviewImageUrl(matchedItem) : (matchedItem.image || matchedItem["Image URL"] || '');
        const fallbackUrl = typeof window.getPreviewFallbackImageUrl === 'function' ? window.getPreviewFallbackImageUrl(matchedItem) : '';
        const onErrorAttr = fallbackUrl ? `onerror="this.onerror=null;this.src='${fallbackUrl.replace(/'/g, "\\'")}';"` : `onerror="this.onerror=null;this.classList.add('img-error');"`;

        const title = matchedItem["Title"] || matchedItem["Name"] || matchedItem["Serial No"] || serial;
        const brand = matchedItem["Brand"] || matchedItem["Category"] || matchedItem["Type"] || "Piece";
        const priceVal = matchedItem["Price"] || matchedItem["MRP"] || "";
        const priceStr = priceVal ? `₹${priceVal}` : "";
        const footerHtml = priceStr ? `<div class="ft-card-footer"><span class="ft-card-price">${escapeHtml(priceStr)}</span></div>` : '';

        const statusTag = isUnavailable
          ? `<span class="ft-card-badge ft-badge-unavailable" title="${escapeHtml(avail.reason)}"><i class="fa-solid fa-triangle-exclamation"></i> Unavailable</span>`
          : `<span class="ft-card-badge ft-badge-available"><i class="fa-solid fa-circle-check"></i> Available</span>`;

        const quantityVal = ftItem.quantity || 1;
        const notesVal = ftItem.notes || "";
        const priceOverrideVal = ftItem.customPrice || "";

        return `
          <div class="final-tray-card ${isUnavailable ? 'ft-card-disabled' : ''}">
            <button type="button" class="final-tray-card-remove" data-serial="${escapeHtml(serial)}" title="Remove ${escapeHtml(serial)}">✕</button>
            <div class="ft-card-media">
              <img src="${primaryUrl}" alt="${escapeHtml(title)}" loading="lazy" ${onErrorAttr}>
            </div>
            <div class="ft-card-info" style="flex: 1;">
              <div class="ft-card-header">
                <span class="ft-card-category">${escapeHtml(brand)}</span>
                ${statusTag}
              </div>
              <h4 class="ft-card-title">${escapeHtml(title)}</h4>
              ${footerHtml}
              
              <div class="ft-card-custom-inputs" style="margin-top: 12px; display: grid; grid-template-columns: 80px 1fr; gap: 8px;">
                <label style="font-size: 0.75rem; color: #57534e;">Quantity</label>
                <label style="font-size: 0.75rem; color: #57534e;">Stylist Notes</label>
                
                <input type="number" min="1" value="${quantityVal}" 
                       onchange="updateFinalTrayItemField('${escapeHtml(serial)}', 'quantity', parseInt(this.value, 10))" 
                       style="padding: 4px; border: 1px solid #d6d3d1; border-radius: 4px; font-size: 0.85rem;" />
                       
                <input type="text" value="${escapeHtml(notesVal)}" placeholder="Add custom notes..." 
                       onchange="updateFinalTrayItemField('${escapeHtml(serial)}', 'notes', this.value)" 
                       style="padding: 4px; border: 1px solid #d6d3d1; border-radius: 4px; font-size: 0.85rem;" />
              </div>
            </div>
          </div>
        `;
      } else {
        // Fallback card for custom / unrecognized serial codes
        const statusTag = isUnavailable
          ? `<span class="ft-card-badge ft-badge-unavailable" title="${escapeHtml(avail.reason)}"><i class="fa-solid fa-triangle-exclamation"></i> Unavailable</span>`
          : `<span class="ft-card-badge ft-badge-unknown"><i class="fa-solid fa-code"></i> Code Item</span>`;
          
        const quantityVal = ftItem.quantity || 1;
        const notesVal = ftItem.notes || "";

        return `
          <div class="final-tray-card ft-card-custom ${isUnavailable ? 'ft-card-disabled' : ''}">
            <button type="button" class="final-tray-card-remove" data-serial="${escapeHtml(serial)}" title="Remove ${escapeHtml(serial)}">✕</button>
            <div class="ft-card-media ft-custom-media">
              <i class="fa-solid fa-box-archive"></i>
            </div>
            <div class="ft-card-info" style="flex: 1;">
              <div class="ft-card-header">
                <span class="ft-card-category">Custom Code</span>
                ${statusTag}
              </div>
              <h4 class="ft-card-title">${escapeHtml(serial)}</h4>
              
              <div class="ft-card-custom-inputs" style="margin-top: 12px; display: grid; grid-template-columns: 80px 1fr; gap: 8px;">
                <label style="font-size: 0.75rem; color: #57534e;">Quantity</label>
                <label style="font-size: 0.75rem; color: #57534e;">Stylist Notes</label>
                
                <input type="number" min="1" value="${quantityVal}" 
                       onchange="updateFinalTrayItemField('${escapeHtml(serial)}', 'quantity', parseInt(this.value, 10))" 
                       style="padding: 4px; border: 1px solid #d6d3d1; border-radius: 4px; font-size: 0.85rem;" />
                       
                <input type="text" value="${escapeHtml(notesVal)}" placeholder="Add custom notes..." 
                       onchange="updateFinalTrayItemField('${escapeHtml(serial)}', 'notes', this.value)" 
                       style="padding: 4px; border: 1px solid #d6d3d1; border-radius: 4px; font-size: 0.85rem;" />
              </div>
            </div>
          </div>
        `;
      }
    }).join("");

    listNode.querySelectorAll(".final-tray-card-remove").forEach((btn) => {
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
        const trayItem = typeof finalTrayItems !== 'undefined' ? finalTrayItems.find(i => sanitizeSerialToken(i.serial) === normalized) : null;
        const enrichedMatch = { ...match };
        if (trayItem) {
          enrichedMatch._quantity = trayItem.quantity || 1;
          enrichedMatch._customPrice = trayItem.customPrice || null;
          enrichedMatch._notes = trayItem.notes || "";
        }
        items.push(enrichedMatch);
      }
    }
  });

  return items;
}

function selectAllByBrand() {
  const filterBrand = document.getElementById("filterBrand")?.value || "";
  const filterType = document.getElementById("filterType")?.value || "";

  let filtered = getFilteredItems();
  const availableItems = filtered.filter(d => window.normalizeStatus(d["Status"]) !== "unavailable");

  if (availableItems.length === 0) {
    showToast("No available items match these filters.");
    return;
  }

  let addedCount = 0;
  const newSelected = [...selected];
  availableItems.forEach(item => {
    const id = item["Serial No"];
    if (!newSelected.includes(id)) {
      newSelected.push(id);
      addedCount++;
    }
  });
  if (addedCount > 0) selected = newSelected;

  render();
  updateTabBadge();

  const labelParts = [filterBrand, filterType].filter(Boolean);
  const desc = labelParts.length > 0 ? labelParts.join(" ") : "matching";

  if (addedCount === 0) {
    showToast(`All ${desc} items are already in your selection.`);
  } else {
    showToast(`Added ${addedCount} ${desc} item${addedCount === 1 ? "" : "s"} to selection.`);
  }
}

function removeFromSelected(id) {
  selected = selected.filter(x => x !== id);
  updateTabBadge();
  renderSelected();
}

function clearAllSelected() {
  if (selected.length === 0) {
    showToast("No items selected.");
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
    return item && window.normalizeStatus(item["Status"]) === "unavailable";
  });

  if (markedInSelection.length === 0) {
    showToast("No unavailable items in selection.");
    return;
  }

  if (confirm(`Remove ${markedInSelection.length} unavailable item(s)?`)) {
    selected = selected.filter(id => {
      const item = dataBySerial.get(id);
      return !(item && window.normalizeStatus(item["Status"]) === "unavailable");
    });
    updateTabBadge();
    renderSelected();
  }
}

window.removeFromSelected = removeFromSelected;
window.clearAllSelected = clearAllSelected;
window.removeMarkedFromSelected = removeMarkedFromSelected;
window.addBulkSerialsToFinalTray = addBulkSerialsToFinalTray;

function showToast(message, isError = false) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.style.cssText = \`
    min-width: 250px;
    background: \${isError ? '#ef4444' : '#10b981'};
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  \`;
  toast.innerText = message;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
window.showToast = showToast;

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

function isMobilePreviewDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
}

function openPdfPreviewInNewTab() {
  if (!lastPdfBlob) {
    showToast("Please generate a PDF first.");
    return;
  }

  const previewWindow = window.open(lastPdfUrl, "_blank", "noopener,noreferrer");
  if (!previewWindow) {
    window.location.href = lastPdfUrl;
  }
}
window.openPdfPreview = openPdfPreviewInNewTab;

let visualPageUrls = [];

function clearVisualPageUrls() {
  visualPageUrls.forEach(url => URL.revokeObjectURL(url));
  visualPageUrls = [];
}

function renderVisualPdfPages(containerId, blobs) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!blobs || !blobs.length) {
    container.innerHTML = "";
    container.classList.add("hidden");
    return;
  }

  container.innerHTML = blobs.map((b, idx) => {
    const url = URL.createObjectURL(b);
    visualPageUrls.push(url);
    return `
      <div class="pdf-page-preview-wrapper">
        <div class="pdf-page-badge"><i class="fa-solid fa-file-lines"></i> Page ${idx + 1} of ${blobs.length}</div>
        <img src="${url}" alt="PDF Page ${idx + 1}" class="pdf-page-image" onclick="window.openPdfPreview()" title="Click to view full PDF" />
      </div>
    `;
  }).join('');
  container.classList.remove("hidden");
}

function clearPdfPreview() {
  const frame = document.getElementById("pdfPreviewFrame");
  const placeholder = document.getElementById("previewPlaceholder");
  const visualPreview = document.getElementById("pdfVisualPagesPreview");
  const finalTrayVisual = document.getElementById("finalTrayVisualPagesPreview");
  const finalTrayPanel = document.getElementById("finalTrayPreviewPanel");
  const mobileAction = document.getElementById("mobilePdfPreviewAction");
  const shareBox = document.getElementById("postCreationShareContainer");

  if (lastPdfUrl) {
    URL.revokeObjectURL(lastPdfUrl);
    lastPdfUrl = "";
  }

  clearVisualPageUrls();
  lastPdfBlob = null;

  if (frame) {
    frame.removeAttribute("src");
    frame.classList.remove("visible");
  }

  if (visualPreview) {
    visualPreview.innerHTML = "";
    visualPreview.classList.add("hidden");
  }

  if (finalTrayVisual) {
    finalTrayVisual.innerHTML = "";
    finalTrayVisual.classList.add("hidden");
  }

  if (finalTrayPanel) {
    finalTrayPanel.classList.add("hidden");
  }

  if (placeholder) {
    placeholder.classList.remove("hidden");
    placeholder.innerHTML = '<strong>Generate a PDF to preview it here.</strong><span>The preview will update after a selection or final tray PDF is created.</span>';
  }

  if (mobileAction) {
    mobileAction.classList.add("hidden");
  }

  if (shareBox) {
    shareBox.style.display = "none";
  }

  updatePdfMeta();
}

function setPdfPreview(blob) {
  const frame = document.getElementById("pdfPreviewFrame");
  const placeholder = document.getElementById("previewPlaceholder");
  const mobileAction = document.getElementById("mobilePdfPreviewAction");
  const shareBox = document.getElementById("postCreationShareContainer");
  const isMobile = isMobilePreviewDevice();

  if (lastPdfUrl) {
    URL.revokeObjectURL(lastPdfUrl);
  }

  lastPdfBlob = blob;
  lastPdfUrl = URL.createObjectURL(blob);

  clearVisualPageUrls();

  // Render crisp visual multi-page preview into both Selected tab and Final Tray tab shells
  renderVisualPdfPages("pdfVisualPagesPreview", collageBlobs);
  renderVisualPdfPages("finalTrayVisualPagesPreview", collageBlobs);

  const finalTrayPanel = document.getElementById("finalTrayPreviewPanel");
  if (finalTrayPanel && collageBlobs && collageBlobs.length > 0) {
    finalTrayPanel.classList.remove("hidden");
    const meta = document.getElementById("finalTrayPdfMeta");
    if (meta) {
      meta.textContent = `${lastExportTitle || 'Kit'} · ${collageBlobs.length} page${collageBlobs.length === 1 ? '' : 's'} · ${lastExportItems ? lastExportItems.length : 0} items`;
    }
  }

  if (frame) {
    if (!isMobile) {
      frame.src = lastPdfUrl;
      frame.classList.add("visible");
    } else {
      frame.removeAttribute("src");
      frame.classList.remove("visible");
    }
  }

  if (placeholder) {
    placeholder.classList.add("hidden");
  }

  if (mobileAction) {
    mobileAction.classList.remove("hidden");
  }

  if (shareBox) {
    shareBox.style.display = "block";
  }

  updatePdfMeta();
}

function setHtmlLookbookPreview(blob, fileName, meta, itemCount) {
  const frame = document.getElementById("pdfPreviewFrame");
  const placeholder = document.getElementById("previewPlaceholder");
  const mobileAction = document.getElementById("mobilePdfPreviewAction");
  const shareBox = document.getElementById("postCreationShareContainer");
  const metaNode = document.getElementById("pdfMeta");
  const isMobile = isMobilePreviewDevice();

  if (lastPdfUrl) {
    URL.revokeObjectURL(lastPdfUrl);
  }

  lastPdfBlob = blob;
  lastPdfUrl = URL.createObjectURL(blob);

  if (frame) {
    if (isMobile) {
      frame.removeAttribute("src");
      frame.classList.remove("visible");
    } else {
      frame.src = lastPdfUrl;
      frame.classList.add("visible");
    }
  }

  if (placeholder) {
    placeholder.classList.add("hidden");
  }

  if (mobileAction) {
    mobileAction.classList.remove("hidden");
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
    showToast("Generate a PDF first.");
    return;
  }

  try {
    const pdfBlob = await ensurePdfBlob();
    triggerBlobDownload(pdfBlob, buildPdfFileName());
  } catch (err) {
    console.error(err);
    showToast("Unable to build PDF. Please try again.");
  }
}

function downloadCoverPdf() {
  if (!lastPdfBlob && !collageBlobs.length) {
    showToast("Generate a PDF first.");
    return;
  }

  const pdfBlob = lastPdfBlob || null;
  if (pdfBlob) {
    triggerBlobDownload(pdfBlob, buildPdfFileName());
    return;
  }

  downloadCurrentPdf();
}

async function markCurrentFinalTrayAsDelivered(serials = []) {
  const normalizedSerials = (serials && serials.length ? serials : [...finalTraySerials])
    .map((value) => String(value || "").trim())
    .filter(Boolean);

  if (!normalizedSerials.length) {
    return { ok: false, updatedCount: 0, missingSerials: [], skipped: true };
  }

  try {
    const serverResult = await markFinalTrayOnlyOnServer(normalizedSerials);
    const updatedCount = Number(serverResult && serverResult.updatedCount ? serverResult.updatedCount : 0);
    const missingSerials = Array.isArray(serverResult && serverResult.missingSerials) ? serverResult.missingSerials : [];

    const matchedItems = resolveItemsBySerials(normalizedSerials);
    matchedItems.forEach((item) => {
      const serialNo = String(item["Serial No"] || "").trim();
      if (!serialNo) return;
      item["Status"] = "Marked & Delivered";
      const cachedItem = dataBySerial.get(serialNo);
      if (cachedItem) {
        cachedItem["Status"] = "Marked & Delivered";
      }
    });

    selected = selected.filter((id) => {
      const item = dataBySerial.get(id);
      return item && window.normalizeStatus(item["Status"]) !== "unavailable";
    });

    try {
      const store = ProjectStore;
      const activeCtx = store && store.getActiveContext ? store.getActiveContext() : {};
      const activeProject = activeCtx.project;
      if (store && store.updateProject && activeProject) {
        const today = new Date().toISOString().split('T')[0];
        const finalTraySharedDate = activeProject.finalTraySharedDate || today;
        let followUpDate = activeProject.followUpDate;
        if (!followUpDate) {
          const d = new Date(finalTraySharedDate);
          d.setDate(d.getDate() + 15);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          followUpDate = `${yyyy}-${mm}-${dd}`;
        }
        const deliveredProject = store.updateProject(activeProject.id, {
          status: "Delivered",
          projectStatus: "Delivered",
          finalTraySharedDate,
          followUpDate,
          returnDueDate: activeProject.returnDueDate || today,
          productStats: {
            sent: matchedItems.length,
            returned: matchedItems.length,
            pending: 0,
            missing: missingSerials.length
          },
          deliverables: {
            completed: 5,
            total: 5
          }
        });

        if (deliveredProject && typeof window.renderHomepageProjectsGateway === 'function') {
          window.renderHomepageProjectsGateway();
        }
      }
    } catch (projectErr) {
      console.warn("Could not update project state after Client Kit share", projectErr);
    }

    render();
    renderFinalTraySerialManager();
    updateTabBadge();
    updateMiniWebsiteModalPreview();
    buildReturnProductsStateFromFinalTray();

    return { ok: true, updatedCount, missingSerials };
  } catch (err) {
    console.warn("Could not mark final tray items as delivered", err);
    return { ok: false, updatedCount: 0, missingSerials: [], error: err && err.message ? err.message : String(err) };
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
        showToast("Please select items from the inventory grid first to export a PDF.");
        return;
      }
    }
    await shareCurrentPdf();
  } catch (err) {
    console.error("Error in exportAndSharePdfToWhatsApp:", err);
    showToast("Unable to export PDF: " + (err.message || err));
  }
}

function openWhatsAppComposer(waUrl) {
  try {
    const popup = window.open(waUrl, "_blank", "width=700,height=800,noopener,noreferrer");
    if (!popup) {
      window.location.href = waUrl;
    }
  } catch (err) {
    window.location.href = waUrl;
  }
}

/* SHARE CURRENT PDF TO WHATSAPP / NATIVE SHARE */
async function shareCurrentPdf(isBypassed = false) {
  if (!isBypassed) {
    validateFinalTrayAvailabilityAndProceed((bypassed) => {
      shareCurrentPdf(true);
    }, isBypassed);
    return;
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const shareLogPrefix = "[shareCurrentPdf]";
  let pendingWin = null;
  console.log(shareLogPrefix, "start", { isMobile, hasCanShare: !!navigator.canShare, selectedCount: Array.isArray(selected) ? selected.length : 0, hasLastPdfBlob: !!lastPdfBlob, collageCount: Array.isArray(collageBlobs) ? collageBlobs.length : 0 });
  
  if (!navigator.canShare) {
    console.log(shareLogPrefix, "opening fallback popup before share");
    pendingWin = window.open("about:blank", "_blank", "width=700,height=800,noopener,noreferrer");
  }

  let pdfBlob = lastPdfBlob;

  if (!pdfBlob && collageBlobs && collageBlobs.length) {
    try {
      console.log(shareLogPrefix, "rebuilding PDF blob from existing collage pages");
      showSpinner(true);
      pdfBlob = await ensurePdfBlob();
      console.log(shareLogPrefix, "rebuild success", { hasPdfBlob: !!pdfBlob });
    } catch (err) {
      console.error(shareLogPrefix, "rebuild failed", err);
    } finally {
      showSpinner(false);
    }
  }

  if (!pdfBlob && Array.isArray(selected) && selected.length > 0) {
    try {
      console.log(shareLogPrefix, "generating selection PDF for sharing");
      await generateSelectionPdf();
      pdfBlob = lastPdfBlob;
      console.log(shareLogPrefix, "selection PDF generation complete", { hasPdfBlob: !!pdfBlob });
    } catch (err) {
      console.error(shareLogPrefix, "selection PDF generation failed", err);
    }
  }

  if (!pdfBlob) {
    if (pendingWin) pendingWin.close();
    if (Array.isArray(selected) && selected.length > 0) {
      showToast("The PDF is still being prepared. Please wait a moment and try again.");
    } else {
      showToast("Please select items first, then tap Share PDF via WhatsApp again.");
    }
    return;
  }

  const isFinalTrayShare = lastExportKind === "final-tray" || (Array.isArray(finalTraySerials) && finalTraySerials.length > 0);

  if (isFinalTrayShare) {
    console.log(shareLogPrefix, "marking final tray items as delivered before WhatsApp share");
    const markResult = await markCurrentFinalTrayAsDelivered();
    if (markResult && markResult.ok) {
      setSerialFeedback(`Marked ${markResult.updatedCount || finalTraySerials.length} item(s) as delivered.`, false);
    }
  }

  const fileName = buildPdfFileName();
  const file = new File([pdfBlob], fileName, { type: "application/pdf" });
  console.log(shareLogPrefix, "prepared file", { fileName, size: file.size, type: file.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    console.log(shareLogPrefix, "attempting native Web Share API");
    if (pendingWin) pendingWin.close();
    try {
      await navigator.share({
        files: [file],
        title: lastExportTitle || "Jewellery PDF Catalogue",
        text: `📄 ${lastExportTitle || "Jewellery PDF Catalogue"}`
      });
      console.log(shareLogPrefix, "native share success");
      return;
    } catch (err) {
      console.log(shareLogPrefix, "native share aborted or failed", err);
      if (err && err.name === "AbortError") {
        return;
      }
    }
  }

  console.log(shareLogPrefix, "falling back to download + WhatsApp composer");
  triggerBlobDownload(pdfBlob, fileName);

  const whatsappText = encodeURIComponent(
    `📄 *${(lastExportTitle || "ASCEND HIGH JEWELRY CURATION PDF").toUpperCase()}*\n` +
    `Document File: ${fileName}\n\n` +
    `The PDF preview catalogue has been downloaded to your device. Please attach it using the 📎 paperclip icon to send.`
  );

  const waUrl = isMobile
    ? `https://api.whatsapp.com/send?text=${whatsappText}`
    : `https://web.whatsapp.com/send?text=${whatsappText}`;
  console.log(shareLogPrefix, "opening WhatsApp URL", { waUrl, isMobile });

  if (pendingWin && !pendingWin.closed) {
    pendingWin.location.href = waUrl;
    pendingWin.focus();
  } else {
    openWhatsAppComposer(waUrl);
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
        return { 
          id: item["Serial No"], 
          image: await loadImageWithFallback(item),
          qty: item._quantity,
          price: item._customPrice,
          notes: item._notes
        };
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
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let text = String(entry.id || "");
      const details = [];
      if (entry.qty && entry.qty > 1) details.push(`| Qty: ${entry.qty}`);
      if (entry.price) details.push(`| ${entry.price}`);
      if (entry.notes) details.push(`| ${entry.notes}`);
      
      if (details.length > 0) {
        ctx.font = "bold 16px 'Arial'"; // slightly smaller font for longer text
        text += `  ${details.join(' ')}`;
      } else {
        ctx.font = "bold 22px 'Arial'";
      }

      ctx.fillText(text, x + cellW / 2, y + imgH + LABEL_H / 2);
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
    showToast("Please select at least 1 item to share.");
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
  openWhatsAppComposer(waUrl);
  showToast(`✅ PDF downloaded as "${safeFilename}".\n\nWhatsApp Web has been opened. Please click the 📎 (Paperclip / Attachment) icon in WhatsApp to attach the downloaded PDF file.`);
}

function getReturnProductStatus(item) {
  if (!item) return "Pending Return";
  if (item.returnStatus === "received") return "Received";
  if (item.returnStatus === "missing") return "Missing";
  return "Pending Return";
}

function getReturnConditionLabel(item) {
  return item && item.condition === "damaged" ? "Damaged" : "Good";
}

function getReturnProductSummary() {
  const total = returnProductsState.length;
  const received = returnProductsState.filter(item => item.returnStatus === "received").length;
  const pending = returnProductsState.filter(item => item.returnStatus === "pending").length;
  const missing = returnProductsState.filter(item => item.returnStatus === "missing").length;
  const damaged = returnProductsState.filter(item => item.condition === "damaged").length;
  return { total, received, pending, missing, damaged };
}

function renderReturnProductsSummary() {
  const summaryNode = document.getElementById("returnSummaryCards");
  if (!summaryNode) return;
  const summary = getReturnProductSummary();
  summaryNode.innerHTML = [
    { label: "Total Sent", value: summary.total },
    { label: "Received", value: summary.received },
    { label: "Pending", value: summary.pending },
    { label: "Missing", value: summary.missing },
    { label: "Damaged", value: summary.damaged }
  ].map((card) => `
    <div class="return-summary-card">
      <strong>${card.value}</strong>
      <span>${card.label}</span>
    </div>
  `).join("");
}

function renderReturnProductsList() {
  const listNode = document.getElementById("returnProductsList");
  if (!listNode) return;

  const filtered = returnProductsState.filter((item) => {
    const query = (returnProductsFilter || "").trim().toUpperCase();
    if (!query) return true;
    return [item.serial, item.name, item.code, item.category].some((value) => String(value || "").toUpperCase().includes(query));
  });

  if (!returnProductsState || returnProductsState.length === 0) {
    listNode.innerHTML = '<div class="selection-empty">No return products loaded yet. Load from the Client Kit to begin.</div>';
    document.getElementById("returnSummaryCards").innerHTML = "";
    return;
  }

  listNode.innerHTML = filtered.map((item) => {
    const statusLabel = getReturnProductStatus(item);
    const conditionLabel = getReturnConditionLabel(item);
    const statusClass = item.returnStatus === "received" ? "received" : item.returnStatus === "missing" ? "missing" : "pending";
    const conditionClass = item.condition === "damaged" ? "damaged" : "good";
    const imageUrl = item.image || "";
    return `
      <div class="return-product-card ${item.returnStatus === "received" ? "is-received" : ""} ${item.condition === "damaged" ? "is-damaged" : ""}">
        <img src="${imageUrl}" alt="${item.name || item.serial}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=80';">
        <div class="return-product-meta">
          <div class="return-product-title">${item.name || item.serial}</div>
          <div class="return-product-subtext">Code: ${item.code || item.serial}</div>
          <div class="return-product-subtext">Category: ${item.category || "—"}</div>
          <div class="return-product-subtext">Quantity Sent: ${item.quantity || 1}</div>
          <div class="return-product-badges">
            <span class="return-status-pill ${statusClass}">${statusLabel}</span>
            <span class="return-condition-pill ${conditionClass}">${conditionLabel}</span>
          </div>
        </div>
        <div class="return-product-actions">
          <select data-serial="${item.serial}" onchange="window.updateReturnProductStatus('${item.serial}', this.value)">
            <option value="pending" ${item.returnStatus === "pending" ? "selected" : ""}>Pending Return</option>
            <option value="received" ${item.returnStatus === "received" ? "selected" : ""}>Received</option>
            <option value="missing" ${item.returnStatus === "missing" ? "selected" : ""}>Missing</option>
          </select>
          <select data-serial="${item.serial}" onchange="window.updateReturnProductCondition('${item.serial}', this.value)">
            <option value="good" ${item.condition === "good" ? "selected" : ""}>Good</option>
            <option value="damaged" ${item.condition === "damaged" ? "selected" : ""}>Damaged</option>
          </select>
          <button type="button" class="secondary" onclick="window.markReturnProductReceived('${item.serial}')">Mark Received</button>
          <button type="button" class="secondary btn-missing-action" onclick="window.markReturnProductMissing('${item.serial}')">Mark Missing</button>
        </div>
      </div>
    `;
  }).join("");

  renderReturnProductsSummary();
}

function refreshReturnProductsUi() {
  renderReturnProductsSummary();
  renderReturnProductsList();
}

function applyReturnProductInventoryRules() {
  if (!Array.isArray(data)) return;

  data.forEach((item) => {
    const serial = String(item["Serial No"] || "").trim();
    const matched = returnProductsState.find((entry) => entry.serial === serial);
    if (!matched) return;

    const isReturnedAndGood = matched.returnStatus === "received" && matched.condition === "good";

    if (isReturnedAndGood) {
      item["Status"] = "Unmarked";
    } else {
      item["Status"] = "Marked & Delivered";
      if (matched.condition === "damaged" && !String(item["Notes"] || "").includes("Damaged on return")) {
        item["Notes"] = (item["Notes"] || "") + (item["Notes"] ? " | " : "") + "Damaged on return";
      }
    }
  });

  if (typeof render === "function") {
    render();
  }
}

function buildReturnProductsStateFromFinalTray() {
  const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
  let activeProject = null;
  if (store && store.getActiveContext) {
    activeProject = store.getActiveContext().project;
  }

  const serialSource = finalTraySerials.length ? finalTraySerials : (Array.isArray(selected) && selected.length ? selected : (activeProject && Array.isArray(activeProject.selectedSerials) ? activeProject.selectedSerials : []));
  const serials = [...new Set(serialSource.filter(Boolean))];
  const items = resolveItemsBySerials(serials);

  const existingMap = new Map();
  if (Array.isArray(returnProductsState)) {
    returnProductsState.forEach(entry => {
      if (entry && entry.serial) {
        existingMap.set(entry.serial, entry);
      }
    });
  }
  if (activeProject && Array.isArray(activeProject.returnProductsState)) {
    activeProject.returnProductsState.forEach(entry => {
      if (entry && entry.serial && !existingMap.has(entry.serial)) {
        existingMap.set(entry.serial, entry);
      }
    });
  }

  returnProductsState = items.map((item) => {
    const serial = String(item["Serial No"] || "").trim();
    if (existingMap.has(serial)) {
      return existingMap.get(serial);
    }
    return {
      serial,
      name: String(item["Description"] || item["Name"] || item["Type"] || serial),
      code: serial,
      category: String(item["Type"] || "Jewellery"),
      quantity: 1,
      image: typeof getPreviewImageUrl === 'function' ? getPreviewImageUrl(item) : (item.image || ''),
      returnStatus: "pending",
      condition: "good"
    };
  });

  refreshReturnProductsUi();
  applyReturnProductInventoryRules();
}

function loadReturnProductsFromFinalTray(force = false) {
  buildReturnProductsStateFromFinalTray();
}

function handleReturnProductsSearch(value) {
  returnProductsFilter = value || "";
  renderReturnProductsList();
}

function persistReturnProductsState() {
  const store = window.ProjectStore || (typeof ProjectStore !== 'undefined' ? ProjectStore : null);
  if (store && store.updateProject && store.getActiveContext) {
    const activeProject = store.getActiveContext().project;
    if (activeProject) {
      const summary = getReturnProductSummary();
      const productStats = {
        sent: summary.total,
        returned: summary.received,
        pending: summary.pending,
        missing: summary.missing
      };
      // Keep projectStatus as 'Completed' if it's currently 'Completed', otherwise calculate it
      let newStatus = activeProject.projectStatus || activeProject.status || 'Active';
      if (newStatus !== 'Completed') {
        if (summary.pending > 0) newStatus = 'Waiting for Return';
        else if (summary.total > 0) newStatus = 'Waiting for Deliverables';
      }
      
      store.updateProject(activeProject.id, {
        returnProductsState: [...returnProductsState],
        productStats: productStats,
        status: newStatus,
        projectStatus: newStatus
      });
      
      // Force UI updates for the project list if the function exists
      if (typeof window.renderProjectBar === 'function') {
        window.renderProjectBar();
      }
    }
  }
}

function updateReturnProductStatus(serial, status) {
  const entry = returnProductsState.find((item) => item.serial === serial);
  if (!entry) return;
  entry.returnStatus = status;
  refreshReturnProductsUi();
  applyReturnProductInventoryRules();
  persistReturnProductsState();
}

function updateReturnProductCondition(serial, condition) {
  const entry = returnProductsState.find((item) => item.serial === serial);
  if (!entry) return;
  entry.condition = condition;
  refreshReturnProductsUi();
  applyReturnProductInventoryRules();
  persistReturnProductsState();
}

function markReturnProductReceived(serial) {
  updateReturnProductStatus(serial, "received");
}

function markReturnProductMissing(serial) {
  updateReturnProductStatus(serial, "missing");
}

function switchTab(tabName) {
  if (typeof window.unlockStudioWorkspace === 'function') {
    window.unlockStudioWorkspace();
  }

  const tabs = {
    dashboard: { btn: "tabOverviewBtn", section: "dashboardTab" },
    browse: { btn: "tabBrowseBtn", section: "browseTab" },
    selected: { btn: "tabSelectedBtn", section: "selectedTab" },
    finalTray: { btn: "tabFinalTrayBtn", section: "finalTrayTab" },
    returnProducts: { btn: "tabReturnProductsBtn", section: "returnProductsTab" }
  };

  const homeBtn = document.getElementById("tabDashboardBtn");
  if (homeBtn) homeBtn.classList.remove("active");

  Object.keys(tabs).forEach(key => {
    const btn = document.getElementById(tabs[key].btn);
    const section = document.getElementById(tabs[key].section);
    
    // Bottom nav mapping
    const bottomNavIds = {
      dashboard: "bottomNavHome",
      browse: "bottomNavBrowse",
      selected: "bottomNavSelected",
      finalTray: "bottomNavFinalTray",
      returnProducts: "bottomNavReturns"
    };
    const bottomBtn = bottomNavIds[key] ? document.getElementById(bottomNavIds[key]) : null;

    if (key === tabName) {
      if (btn) btn.classList.add("active");
      if (section) section.classList.add("active");
      if (bottomBtn) bottomBtn.classList.add("active");
    } else {
      if (btn) btn.classList.remove("active");
      if (section) section.classList.remove("active");
      if (bottomBtn) bottomBtn.classList.remove("active");
    }
  });

  const pageShell = document.querySelector(".page-shell");
  if (pageShell) {
    pageShell.classList.remove("browse-active", "dashboard-active");
    if (tabName === "browse") {
      pageShell.classList.add("browse-active");
    } else if (tabName === "dashboard") {
      pageShell.classList.add("dashboard-active");
    }
  }

  if (tabName === "dashboard") {
    renderDashboard();
  }

  if (tabName === "selected") {
    renderSelected();
  }

  if (tabName === "finalTray") {
    if (typeof renderFinalTraySerialManager === 'function') {
      renderFinalTraySerialManager();
    }
  }

  if (tabName === "returnProducts") {
    loadReturnProductsFromFinalTray();
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
    showToast("Select pieces from the catalogue first to create and share the Lookbook.");
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
  openWhatsAppComposer(waUrl);
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
    showToast("No lookbook items found to import. Select pieces or load an active project first.");
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
window.toggleMobileSidebar = function() {
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('is-open');
    overlay.classList.toggle('is-visible');
  }
};
window.renderDashboard = function() {
  if (typeof window.renderProjectDashboard === 'function') {
    window.renderProjectDashboard();
    return;
  }
};
window.loadReturnProductsFromFinalTray = loadReturnProductsFromFinalTray;
window.handleReturnProductsSearch = handleReturnProductsSearch;
window.updateReturnProductStatus = updateReturnProductStatus;
window.updateReturnProductCondition = updateReturnProductCondition;
window.markReturnProductReceived = markReturnProductReceived;
window.markReturnProductMissing = markReturnProductMissing;
window.generateSelectionPdf = generateSelectionPdf;
window.downloadCurrentPdf = downloadCurrentPdf;
window.downloadCoverPdf = downloadCoverPdf;
window.shareCurrentPdf = shareCurrentPdf;
window.exportAndSharePdfToWhatsApp = exportAndSharePdfToWhatsApp;

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




