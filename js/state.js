export let data = [];
export let availableDepartments = [];
export let selectedDepartment = null;
export let selected = [];
export let lastBlob = null;
export let collageBlobs = [];
export let lastExportItems = [];
export let lastExportTitle = "Jewellery Catalogue";
export let lastExportKind = "none";
export let lastPdfBlob = null;
export let lastPdfUrl = "";
export let gridCurrentPage = 1;
export let gridPageSize = 36;
export let selectedCurrentPage = 1;
export let selectedPageSize = 24;
export let lastSearchQuery = "";
export let lastSortBy = "";
export let controlsCollapsed = false;
export let finalTraySerials = []; // legacy
export let finalTrayItems = [];
export let finalTraySuggestionIndex = -1;

export function setData(newData) {
  data = newData;
}

export function setAvailableDepartments(deps) {
  availableDepartments = deps;
}

export function setSelectedDepartment(dep) {
  selectedDepartment = dep;
}

export function setSelected(newSelection) {
  selected = newSelection;
}

export function setCollageBlobs(blobs) {
  collageBlobs = blobs;
}

export function setLastPdfBlob(blob) {
  lastPdfBlob = blob;
}

export function setLastPdfUrl(url) {
  lastPdfUrl = url;
}

export function setLastExportItems(items) {
  lastExportItems = items;
}

export function setLastExportTitle(title) {
  lastExportTitle = title;
}

export function setLastExportKind(kind) {
  lastExportKind = kind;
}

export function setGridCurrentPage(page) {
  gridCurrentPage = page;
}

export function setGridPageSize(size) {
  gridPageSize = size;
}

export function setSelectedCurrentPage(page) {
  selectedCurrentPage = page;
}

export function setSelectedPageSize(size) {
  selectedPageSize = size;
}

export function setLastSearchQuery(query) {
  lastSearchQuery = query;
}

export function setLastSortBy(sortBy) {
  lastSortBy = sortBy;
}

export function setControlsCollapsed(value) {
  controlsCollapsed = value;
}

export function setFinalTraySerials(values) {
  finalTraySerials = values;
}

export function setFinalTrayItems(items) {
  finalTrayItems = items;
}

export function setFinalTraySuggestionIndex(index) {
  finalTraySuggestionIndex = index;
}
