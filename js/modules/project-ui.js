/**
 * High-Fashion Stylists & Celebrities Homepage Gateway UI
 * Controls project creation asking for Celebrity Name, Project Name, and Stylist.
 * Supports selecting existing saved Stylists OR adding a new Stylist on the fly!
 * Fully synced with Google Sheets API & Local Storage.
 */

import * as ProjectStore from './project-store.js';

let homepageProjectSwitchCallback = null;
let homepageProjectFilterRenderTimer = null;
const homepageProjectMenuState = {
  menuOpen: false,
  activeSection: '',
  filtersOpen: false
};
const homepageProjectPagination = {
  currentPage: 1,
  pageSize: 10
};
const homepageProjectFilters = {
  searchCelebrity: '',
  searchStylist: '',
  searchBrand: '',
  projectStatus: '',
  paymentStatus: '',
  returnStatus: '',
  socialStatus: ''
};

function getProjectDisplayStatus(project) {
  return project.projectStatus || project.status || 'Active';
}

function getProjectStatusClass(status) {
  const value = String(status || '').trim();
  if (value === 'Completed') return 'proj-completed';
  if (value === 'Waiting for Return') return 'proj-return';
  if (value === 'Waiting for Deliverables') return 'proj-deliverables';
  if (value === 'Waiting for Social Post') return 'proj-social';
  if (value === 'Active' || value === 'Lookbook Sent') return 'proj-active';
  return 'proj-upcoming';
}

function getPaymentStatus(project) {
  return project.payment?.status || 'Pending';
}

function getPaymentStatusClass(status) {
  const value = String(status || '').trim();
  if (value === 'Paid') return 'pay-paid';
  if (value === 'Partial') return 'pay-partial';
  if (value === 'Overdue') return 'pay-overdue';
  return 'pay-pending';
}

function getSocialStatus(project) {
  return project.socialPosting?.status || 'Pending';
}

function getSocialStatusClass(status) {
  const value = String(status || '').trim();
  if (value === 'Posted') return 'soc-posted';
  if (value === 'Verified') return 'soc-verified';
  return 'soc-pending';
}

function getProductStats(project) {
  const stats = project.productStats || {};
  return {
    sent: Number(stats.sent || 0),
    returned: Number(stats.returned || 0),
    pending: Number(stats.pending || 0),
    missing: Number(stats.missing || 0)
  };
}

function getDeliverables(project) {
  const deliverables = project.deliverables || {};
  const completed = Number(deliverables.completed || 0);
  const total = Math.max(Number(deliverables.total || 0), 1);
  return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));
}

function isDateOverdue(dateValue) {
  if (!dateValue) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateValue);
  if (Number.isNaN(target.getTime())) return false;
  target.setHours(0, 0, 0, 0);
  return target < today;
}

function getHomepageSummaryStats(projects) {
  return {
    active: projects.filter(p => String(getProjectDisplayStatus(p)).toLowerCase() === 'active').length,
    pendingReturns: projects.filter(p => {
      const stats = getProductStats(p);
      return stats.pending > 0 || stats.missing > 0;
    }).length,
    missingProducts: projects.filter(p => getProductStats(p).missing > 0).length,
    pendingDeliverables: projects.filter(p => {
      const deliv = getDeliverables(p);
      return deliv.completed < deliv.total;
    }).length,
    pendingSocial: projects.filter(p => getSocialStatus(p) === 'Pending').length,
    pendingPayments: projects.filter(p => getPaymentStatus(p) !== 'Paid').length,
    revenueReceived: projects.reduce((sum, p) => sum + Number(p.payment?.amountReceived || 0), 0)
  };
}

function getFilteredHomepageProjects(projects) {
  const searchCelebrity = homepageProjectFilters.searchCelebrity.trim().toLowerCase();
  const searchStylist = homepageProjectFilters.searchStylist.trim().toLowerCase();
  const searchBrand = homepageProjectFilters.searchBrand.trim().toLowerCase();

  return projects.filter(project => {
    const celebrity = ProjectStore.getCelebrityById(project.celebrityId);
    const stylist = ProjectStore.getStylistById(project.stylistId);
    const celebrityName = celebrity ? celebrity.name : '';
    const stylistName = stylist ? stylist.name : '';
    const brand = project.jewelleryBrand || '';
    const status = getProjectDisplayStatus(project);
    const paymentStatus = getPaymentStatus(project);
    const returnStatus = (() => {
      const stats = getProductStats(project);
      if (stats.missing > 0) return 'Missing';
      if (stats.pending > 0) return 'Pending';
      if (stats.returned > 0) return 'Returned';
      return 'Completed';
    })();
    const socialStatus = getSocialStatus(project);

    if (searchCelebrity && !celebrityName.toLowerCase().includes(searchCelebrity)) return false;
    if (searchStylist && !stylistName.toLowerCase().includes(searchStylist)) return false;
    if (searchBrand && !brand.toLowerCase().includes(searchBrand)) return false;
    if (homepageProjectFilters.projectStatus && status !== homepageProjectFilters.projectStatus) return false;
    if (homepageProjectFilters.paymentStatus && paymentStatus !== homepageProjectFilters.paymentStatus) return false;
    if (homepageProjectFilters.returnStatus && returnStatus !== homepageProjectFilters.returnStatus) return false;
    if (homepageProjectFilters.socialStatus && socialStatus !== homepageProjectFilters.socialStatus) return false;
    return true;
  });
}

function scheduleHomepageProjectRender() {
  clearTimeout(homepageProjectFilterRenderTimer);
  homepageProjectFilterRenderTimer = window.setTimeout(() => {
    renderHomepageProjectsGateway(homepageProjectSwitchCallback);
  }, 160);
}

let isHomepageMenuOutsideClickAttached = false;

function setupHomepageMenuOutsideClick() {
  if (isHomepageMenuOutsideClickAttached) return;
  isHomepageMenuOutsideClickAttached = true;
  document.addEventListener('click', (e) => {
    if (homepageProjectMenuState.menuOpen) {
      const container = document.querySelector('.hp-menu-container');
      if (container && !container.contains(e.target)) {
        homepageProjectMenuState.menuOpen = false;
        renderHomepageProjectsGateway(homepageProjectSwitchCallback);
      }
    }
  });
}

function toggleHomepageProjectMenu(action) {
  if (action === 'toggleMenu' || !action) {
    homepageProjectMenuState.menuOpen = !homepageProjectMenuState.menuOpen;
  } else if (action === 'closeMenu') {
    homepageProjectMenuState.menuOpen = false;
  }
  renderHomepageProjectsGateway(homepageProjectSwitchCallback);
}

function selectHomepageMenuSection(section) {
  if (section === 'overview') {
    homepageProjectMenuState.activeSection = homepageProjectMenuState.activeSection === 'overview' ? 'none' : 'overview';
  }
  homepageProjectMenuState.menuOpen = false;
  renderHomepageProjectsGateway(homepageProjectSwitchCallback);
}

function toggleHomepageProjectFilters() {
  homepageProjectMenuState.filtersOpen = !homepageProjectMenuState.filtersOpen;
  renderHomepageProjectsGateway(homepageProjectSwitchCallback);
}

function changeHomepageProjectPage(page) {
  const allProjects = ProjectStore.getProjects();
  const filteredProjects = getFilteredHomepageProjects(allProjects);
  const totalPages = Math.ceil(filteredProjects.length / homepageProjectPagination.pageSize);

  if (page < 1 || (totalPages > 0 && page > totalPages)) {
    return;
  }

  homepageProjectPagination.currentPage = page;
  renderHomepageProjectsGateway(homepageProjectSwitchCallback);
}

export function initProjectUI({ onProjectSwitch }) {
  homepageProjectSwitchCallback = onProjectSwitch || null;
  renderProjectBar();
  renderHomepageProjectsGateway(homepageProjectSwitchCallback);
  injectProjectModal();
  injectNewProjectModal(onProjectSwitch);
  setupHomepageMenuOutsideClick();

  // Show gateway if user has not proceeded yet
  showHomepageGateway();

  // Attach event listeners to window scope
  window.openProjectDrawer = openProjectDrawer;
  window.closeProjectDrawer = closeProjectDrawer;
  window.openNewProjectDialog = openNewProjectDialog;
  window.closeNewProjectDialog = closeNewProjectDialog;
  window.handleStylistSelectChange = handleStylistSelectChange;
  window.submitNewProjectDialog = (e) => submitNewProjectDialog(e, onProjectSwitch);
  window.handleCelebrityChange = handleCelebrityChange;
  window.handleProjectChange = (projId) => handleProjectChange(projId, onProjectSwitch);
  window.handleCreateCelebritySubmit = handleCreateCelebritySubmit;
  window.handleCreateProjectSubmit = (e) => handleCreateProjectSubmit(e, onProjectSwitch);
  window.handleQuickNewProject = () => openNewProjectDialog();
  window.showHomepageGateway = showHomepageGateway;
  window.updateCurrentProjectStatus = updateCurrentProjectStatus;
  window.renderHomepageProjectsGateway = () => renderHomepageProjectsGateway(homepageProjectSwitchCallback);
  window.toggleHomepageProjectMenu = toggleHomepageProjectMenu;
  window.selectHomepageMenuSection = selectHomepageMenuSection;
  window.toggleHomepageProjectFilters = toggleHomepageProjectFilters;
  window.changeHomepageProjectPage = changeHomepageProjectPage;
  window.handleHomepageProjectFilterChange = (field, value) => {
    homepageProjectFilters[field] = value;
    homepageProjectPagination.currentPage = 1;
    const isTextFilter = ['searchCelebrity', 'searchStylist', 'searchBrand'].includes(field);
    if (isTextFilter) {
      scheduleHomepageProjectRender();
    } else {
      renderHomepageProjectsGateway(homepageProjectSwitchCallback);
    }
  };
  window.clearHomepageProjectFilters = () => {
    Object.assign(homepageProjectFilters, {
      searchCelebrity: '',
      searchStylist: '',
      searchBrand: '',
      projectStatus: '',
      paymentStatus: '',
      returnStatus: '',
      socialStatus: ''
    });
    homepageProjectPagination.currentPage = 1;
    renderHomepageProjectsGateway(homepageProjectSwitchCallback);
  };
}

export function renderProjectBar() {
  let bar = document.getElementById("dreamsaiProjectBar");
  if (!bar) {
    const parentContainer = document.querySelector(".top-bar") || document.body.firstElementChild || document.body;
    bar = document.createElement("div");
    bar.id = "dreamsaiProjectBar";
    bar.className = "dreamsai-project-bar fashion-bar";
    parentContainer.prepend(bar);
  }

  const { celebrity, project, stylist } = ProjectStore.getActiveContext();

  const celebrityName = celebrity ? celebrity.name : "No Celebrity Selected";
  const stylistName = stylist ? stylist.name : "Unassigned Stylist";
  const projectTitle = project ? project.title : "No Active Project";
  const projectCode = project ? project.code : "N/A";
  const projectStatus = project ? project.status : "Curating";
  const selectedCount = project && project.selectedSerials ? project.selectedSerials.length : 0;
  const pdfCount = project && project.pdfRecords ? project.pdfRecords.length : 0;

  let statusBadgeClass = "badge-curating";
  if (projectStatus === "Lookbook Sent") statusBadgeClass = "badge-sent";
  if (projectStatus === "Celebrity Approved") statusBadgeClass = "badge-approved";
  if (projectStatus === "Sample Reserved") statusBadgeClass = "badge-reserved";
  if (projectStatus === "Order Placed") statusBadgeClass = "badge-order";

  bar.innerHTML = `
    <div class="project-bar-container">
      <div class="project-bar-info">
        <button class="btn-switch-projects" onclick="showHomepageGateway()" title="Return to Projects Gateway">
          <i class="fa-solid fa-arrow-left"></i> All Projects Gateway
        </button>
        <span class="stylist-pill">
          <i class="fa-solid fa-user-tie"></i> Stylist: <strong>${escapeHtml(stylistName)}</strong>
        </span>
        <span class="celebrity-pill">
          <i class="fa-solid fa-star"></i> Celebrity: <strong>${escapeHtml(celebrityName)}</strong>
        </span>
        <span class="divider">/</span>
        <span class="project-pill" onclick="openProjectDrawer()" title="Click to view details">
          <i class="fa-solid fa-layer-group"></i> Active Project: <strong>${escapeHtml(projectTitle)}</strong>
          <span class="project-code">(${escapeHtml(projectCode)})</span>
        </span>
        <span class="status-badge ${statusBadgeClass}">${escapeHtml(projectStatus)}</span>
      </div>

      <div class="project-bar-stats">
        <span class="stat-tag"><i class="fa-solid fa-gem"></i> ${selectedCount} Pieces</span>
        <span class="stat-tag"><i class="fa-solid fa-file-pdf"></i> ${pdfCount} PDFs</span>
        <button class="btn-project-manage fashion-btn" onclick="openProjectDrawer()">
          <i class="fa-solid fa-sliders"></i> Manager
        </button>
      </div>
    </div>
  `;
}

/**
 * Renders the homepage gateway as a polished campaign dashboard with project overviews, filters, and quick actions.
 */
export function renderHomepageProjectsGateway(onProjectSwitch) {
  let container = document.getElementById("homepageProjectsGatewayContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "homepageProjectsGatewayContainer";
    container.className = "homepage-gateway-overlay";
    document.body.prepend(container);
  }

  const activeElement = document.activeElement;
  const activePlaceholder = activeElement && activeElement.tagName === 'INPUT' ? activeElement.getAttribute('placeholder') : '';
  const selectionStart = activeElement && typeof activeElement.selectionStart === 'number' ? activeElement.selectionStart : null;
  const selectionEnd = activeElement && typeof activeElement.selectionEnd === 'number' ? activeElement.selectionEnd : null;

  const allProjects = ProjectStore.getProjects();
  const filteredProjects = getFilteredHomepageProjects(allProjects);
  const { project: activeProject } = ProjectStore.getActiveContext();
  const summary = getHomepageSummaryStats(allProjects);

  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / homepageProjectPagination.pageSize);
  homepageProjectPagination.currentPage = Math.min(
    homepageProjectPagination.currentPage,
    Math.max(totalPages, 1)
  );
  const currentPage = homepageProjectPagination.currentPage;
  const startIndex = (currentPage - 1) * homepageProjectPagination.pageSize;
  const endIndex = startIndex + homepageProjectPagination.pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const displayStart = totalProjects === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(endIndex, totalProjects);

  let paginationHtml = '';
  if (totalProjects > 0) {
    let pagesToDisplay = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pagesToDisplay.push(i);
    } else {
      pagesToDisplay.push(1);
      if (currentPage > 3) pagesToDisplay.push('...');
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        if (!pagesToDisplay.includes(i)) pagesToDisplay.push(i);
      }
      if (currentPage < totalPages - 2) pagesToDisplay.push('...');
      pagesToDisplay.push(totalPages);
    }

    const pageButtonsHtml = pagesToDisplay.map(p => {
      if (p === '...') {
        return `<span class="hp-pagination-ellipsis">...</span>`;
      }
      const isActive = p === currentPage;
      return `<button class="hp-pagination-page ${isActive ? 'is-active' : ''}"
                      onclick="window.changeHomepageProjectPage(${p})"
                      aria-label="Page ${p}">
                ${p}
              </button>`;
    }).join('');

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    paginationHtml = `
      <div class="hp-pagination-container">
        <div class="hp-pagination-info">
          Showing <strong>${displayStart}–${displayEnd}</strong> of <strong>${totalProjects}</strong> projects
        </div>
        ${totalPages > 1 ? `
        <div class="hp-pagination-controls" role="navigation" aria-label="Projects Pagination">
          <button class="hp-pagination-btn"
                  onclick="window.changeHomepageProjectPage(${currentPage - 1})"
                  ${isPrevDisabled ? 'disabled aria-disabled="true"' : ''}>
            <i class="fa-solid fa-arrow-left"></i> Previous
          </button>

          <div class="hp-pagination-pages">
            ${pageButtonsHtml}
          </div>

          <button class="hp-pagination-btn"
                  onclick="window.changeHomepageProjectPage(${currentPage + 1})"
                  ${isNextDisabled ? 'disabled aria-disabled="true"' : ''}>
            Next <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        ` : ''}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="hp-gateway-wrapper">
      <div class="hp-gateway-header">
        <div class="hp-gateway-title">
          <h2><i class="fa-solid fa-gem"></i> Projects &amp; Stylists Gateway</h2>
          <p>Monitor every campaign at a glance, from delivery progress to payments and social posting.</p>
        </div>
      </div>

      <div class="hp-toolbar-actions">
        <div class="hp-menu-container">
          <button class="hp-menu-btn ${homepageProjectMenuState.menuOpen ? 'is-active' : ''}"
                  onclick="event.stopPropagation(); window.toggleHomepageProjectMenu('toggleMenu')"
                  aria-haspopup="menu"
                  aria-expanded="${homepageProjectMenuState.menuOpen}"
                  aria-controls="homepageProjectDropdownMenu"
                  aria-label="Toggle Project Menu">
            <i class="fa-solid fa-bars"></i> Menu
          </button>

          <div id="homepageProjectDropdownMenu" class="hp-dropdown-menu ${homepageProjectMenuState.menuOpen ? 'is-open' : ''}" role="menu" aria-label="Project Menu">
            <div class="hp-dropdown-header">Project Menu</div>

            <button role="menuitem" class="hp-dropdown-item ${homepageProjectMenuState.activeSection === 'overview' ? 'is-active' : ''}"
                    onclick="event.stopPropagation(); window.selectHomepageMenuSection('overview')">
              <span class="hp-dropdown-item-label">
                <i class="fa-solid fa-chart-pie"></i> Overview
              </span>
            </button>

            <button role="menuitem" class="hp-dropdown-item is-disabled" onclick="event.stopPropagation();" disabled aria-disabled="true">
              <span class="hp-dropdown-item-label">
                <i class="fa-solid fa-chart-line"></i> Analytics
              </span>
              <span class="hp-badge-coming-soon">Coming soon</span>
            </button>

            <button role="menuitem" class="hp-dropdown-item is-disabled" onclick="event.stopPropagation();" disabled aria-disabled="true">
              <span class="hp-dropdown-item-label">
                <i class="fa-solid fa-file-lines"></i> Reports
              </span>
              <span class="hp-badge-coming-soon">Coming soon</span>
            </button>

            <button role="menuitem" class="hp-dropdown-item is-disabled" onclick="event.stopPropagation();" disabled aria-disabled="true">
              <span class="hp-dropdown-item-label">
                <i class="fa-solid fa-clock-rotate-left"></i> Activity
              </span>
              <span class="hp-badge-coming-soon">Coming soon</span>
            </button>

            <button role="menuitem" class="hp-dropdown-item is-disabled" onclick="event.stopPropagation();" disabled aria-disabled="true">
              <span class="hp-dropdown-item-label">
                <i class="fa-solid fa-gear"></i> Settings
              </span>
              <span class="hp-badge-coming-soon">Coming soon</span>
            </button>
          </div>
        </div>

        <button class="hp-filter-toggle-btn ${homepageProjectMenuState.filtersOpen ? 'is-active' : ''}"
                onclick="event.stopPropagation(); window.toggleHomepageProjectFilters()"
                aria-expanded="${homepageProjectMenuState.filtersOpen}"
                aria-controls="homepageProjectFilterPanel"
                aria-label="Toggle Project Filters">
          <i class="fa-solid fa-sliders"></i> Filters
        </button>
      </div>

      <div class="hp-summary-cards-grid ${homepageProjectMenuState.activeSection === 'overview' ? 'is-open' : 'is-collapsed'}">
        <div class="hp-summary-card accent-card">
          <div class="summary-icon icon-active"><i class="fa-solid fa-chart-line"></i></div>
          <div class="summary-info">
            <span class="summary-val">${summary.active}</span>
            <span class="summary-lbl">Active Projects</span>
          </div>
        </div>
        <div class="hp-summary-card">
          <div class="summary-icon icon-pending-returns"><i class="fa-solid fa-rotate-left"></i></div>
          <div class="summary-info">
            <span class="summary-val">${summary.pendingReturns}</span>
            <span class="summary-lbl">Pending Returns</span>
          </div>
        </div>
        <div class="hp-summary-card">
          <div class="summary-icon icon-missing"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <div class="summary-info">
            <span class="summary-val">${summary.missingProducts}</span>
            <span class="summary-lbl">Missing Products</span>
          </div>
        </div>
        <div class="hp-summary-card">
          <div class="summary-icon icon-deliverables"><i class="fa-solid fa-list-check"></i></div>
          <div class="summary-info">
            <span class="summary-val">${summary.pendingDeliverables}</span>
            <span class="summary-lbl">Pending Deliverables</span>
          </div>
        </div>
        <div class="hp-summary-card">
          <div class="summary-icon icon-social"><i class="fa-solid fa-share-nodes"></i></div>
          <div class="summary-info">
            <span class="summary-val">${summary.pendingSocial}</span>
            <span class="summary-lbl">Pending Social Posts</span>
          </div>
        </div>
        <div class="hp-summary-card">
          <div class="summary-icon icon-payment"><i class="fa-solid fa-wallet"></i></div>
          <div class="summary-info">
            <span class="summary-val">${summary.pendingPayments}</span>
            <span class="summary-lbl">Pending Payments</span>
          </div>
        </div>
        <div class="hp-summary-card">
          <div class="summary-icon icon-revenue"><i class="fa-solid fa-indian-rupee-sign"></i></div>
          <div class="summary-info">
            <span class="summary-val">${formatCurrency(summary.revenueReceived)}</span>
            <span class="summary-lbl">Revenue Received</span>
          </div>
        </div>
      </div>

      <div id="homepageProjectFilterPanel" class="hp-filter-toolbar ${homepageProjectMenuState.filtersOpen ? 'is-open' : 'is-collapsed'}">
        <div class="filter-inputs-row">
          <div class="input-with-icon">
            <i class="fa-solid fa-user"></i>
            <input type="text" placeholder="Search by Celebrity" value="${escapeHtml(homepageProjectFilters.searchCelebrity)}" oninput="window.handleHomepageProjectFilterChange('searchCelebrity', this.value)">
          </div>
          <div class="input-with-icon">
            <i class="fa-solid fa-user-tie"></i>
            <input type="text" placeholder="Search by Stylist" value="${escapeHtml(homepageProjectFilters.searchStylist)}" oninput="window.handleHomepageProjectFilterChange('searchStylist', this.value)">
          </div>
          <div class="input-with-icon">
            <i class="fa-solid fa-gem"></i>
            <input type="text" placeholder="Search by Jewellery Brand" value="${escapeHtml(homepageProjectFilters.searchBrand)}" oninput="window.handleHomepageProjectFilterChange('searchBrand', this.value)">
          </div>
        </div>
        <div class="filter-selects-row">
          <select value="${escapeHtml(homepageProjectFilters.projectStatus)}" onchange="window.handleHomepageProjectFilterChange('projectStatus', this.value)">
            <option value="">Project Status</option>
            <option value="Upcoming" ${homepageProjectFilters.projectStatus === 'Upcoming' ? 'selected' : ''}>Upcoming</option>
            <option value="Active" ${homepageProjectFilters.projectStatus === 'Active' ? 'selected' : ''}>Active</option>
            <option value="Waiting for Return" ${homepageProjectFilters.projectStatus === 'Waiting for Return' ? 'selected' : ''}>Waiting for Return</option>
            <option value="Waiting for Deliverables" ${homepageProjectFilters.projectStatus === 'Waiting for Deliverables' ? 'selected' : ''}>Waiting for Deliverables</option>
            <option value="Waiting for Social Post" ${homepageProjectFilters.projectStatus === 'Waiting for Social Post' ? 'selected' : ''}>Waiting for Social Post</option>
            <option value="Completed" ${homepageProjectFilters.projectStatus === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('paymentStatus', this.value)">
            <option value="">Payment Status</option>
            <option value="Paid" ${homepageProjectFilters.paymentStatus === 'Paid' ? 'selected' : ''}>Paid</option>
            <option value="Partial" ${homepageProjectFilters.paymentStatus === 'Partial' ? 'selected' : ''}>Partial</option>
            <option value="Pending" ${homepageProjectFilters.paymentStatus === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Overdue" ${homepageProjectFilters.paymentStatus === 'Overdue' ? 'selected' : ''}>Overdue</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('returnStatus', this.value)">
            <option value="">Return Status</option>
            <option value="Returned" ${homepageProjectFilters.returnStatus === 'Returned' ? 'selected' : ''}>Returned</option>
            <option value="Pending" ${homepageProjectFilters.returnStatus === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Missing" ${homepageProjectFilters.returnStatus === 'Missing' ? 'selected' : ''}>Missing</option>
            <option value="Completed" ${homepageProjectFilters.returnStatus === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('socialStatus', this.value)">
            <option value="">Social Posting</option>
            <option value="Pending" ${homepageProjectFilters.socialStatus === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Posted" ${homepageProjectFilters.socialStatus === 'Posted' ? 'selected' : ''}>Posted</option>
            <option value="Verified" ${homepageProjectFilters.socialStatus === 'Verified' ? 'selected' : ''}>Verified</option>
          </select>
          <button class="btn-clear-filters" onclick="window.clearHomepageProjectFilters()">Clear Filters</button>
        </div>
      </div>

      <div class="hp-projects-cards-grid">
        <div class="hp-project-card new-project-card" onclick="openNewProjectDialog()">
          <div class="new-card-icon"><i class="fa-solid fa-plus"></i></div>
          <strong> Create New Project</strong>
          <span>Select saved Stylist or add new</span>
        </div>

        ${filteredProjects.length === 0 ? '<div class="hp-project-card"><strong>No projects match the selected filters.</strong></div>' : paginatedProjects.map(p => {
    const isActive = activeProject && p.id === activeProject.id;
    const celebrity = ProjectStore.getCelebrityById(p.celebrityId);
    const stylist = ProjectStore.getStylistById(p.stylistId);
    const celebrityName = celebrity ? celebrity.name : 'Celebrity';
    const stylistName = stylist ? stylist.name : 'Unassigned Stylist';
    const projectStatus = getProjectDisplayStatus(p);
    const paymentStatus = getPaymentStatus(p);
    const socialStatus = getSocialStatus(p);
    const productStats = getProductStats(p);
    const deliverables = getDeliverables(p);
    const returnStatus = productStats.missing > 0 ? 'Missing' : productStats.pending > 0 ? 'Pending' : productStats.returned > 0 ? 'Returned' : 'Completed';
    const sharedDate = p.finalTraySharedDate || '';
    const followUpDate = p.followUpDate || '';
    const returnDueDate = p.returnDueDate || '';

    return `
            <div class="hp-project-card ${isActive ? 'active-project' : ''}" onclick="window.handleProjectChange('${p.id}')">
              ${isActive ? '<div class="active-ribbon">Selected Project</div>' : ''}
              <div class="hp-card-header">
                <div>
                  <h3 class="hp-card-project-name">${escapeHtml(p.title)}</h3>
                </div>
                <span class="proj-status-badge ${getProjectStatusClass(projectStatus)}">${escapeHtml(projectStatus)}</span>
              </div>

              <div class="hp-card-basic-grid">
                <div class="basic-item"><i class="fa-solid fa-star"></i> ${escapeHtml(celebrityName)}</div>
                <div class="basic-item"><i class="fa-solid fa-user-tie"></i> ${escapeHtml(stylistName)}</div>
              
              </div>

              <hr class="hp-card-divider" />

              <div class="hp-card-section">
          
                <div class="hp-dates-row">
                  <div class="date-chip ${isDateOverdue(sharedDate) ? 'date-overdue' : ''}">
                    <span class="d-label">Final Tray</span>
                    <span class="d-val">${escapeHtml(sharedDate || '—')}</span>
                  </div>
                  <div class="date-chip ${isDateOverdue(followUpDate) ? 'date-overdue' : ''}">
                    <span class="d-label">Follow-up</span>
                    <span class="d-val">${escapeHtml(followUpDate || '—')}</span>
                  </div>
                  <div class="date-chip ${isDateOverdue(returnDueDate) ? 'date-overdue' : ''}">
                    <span class="d-label">Return Due</span>
                    <span class="d-val">${escapeHtml(returnDueDate || '—')}</span>
                  </div>
                </div>
              </div>

              <div class="hp-card-section">
                <div class="hp-section-label">Product Status</div>
                <div class="hp-prod-badges-row">
                  <span class="prod-badge badge-returned">Returned ${productStats.returned}</span>
                  <span class="prod-badge badge-pending">Pending ${productStats.pending}</span>
                  <span class="prod-badge badge-missing">Missing ${productStats.missing}</span>
                </div>
              </div>

              <div class="hp-card-dual-grid">
                <div class="soc-badge-wrap">
                  <div class="hp-section-label">Social</div>
                  <span class="soc-badge ${getSocialStatusClass(socialStatus)}">${escapeHtml(socialStatus)}</span>
                  <div class="soc-date">${escapeHtml(socialStatus === 'Pending' ? 'No posting date yet' : (p.socialPosting?.postingDate || '—'))}</div>
                </div>
                <div class="pay-badge-wrap">
                  <div class="hp-section-label">Payment</div>
                  <span class="soc-badge ${getPaymentStatusClass(paymentStatus)}">${escapeHtml(paymentStatus)}</span>
                  <div class="pay-details">Invoice ${formatCurrency(p.payment?.invoiceAmount || 0)} · Received ${formatCurrency(p.payment?.amountReceived || 0)}</div>
                </div>
              </div>

              <div class="hp-card-quick-actions">

                <button class="btn-qa btn-qa-secondary" onclick="event.stopPropagation(); window.openQuickEditProjectModal('${p.id}')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                <button class="btn-qa btn-qa-secondary" onclick="event.stopPropagation(); window.openQuickUpdateReturnModal('${p.id}')"><i class="fa-solid fa-rotate-left"></i> Update Return</button>
                
                <button class="btn-qa btn-qa-secondary" onclick="event.stopPropagation(); window.quickToggleSocialPosted('${p.id}')"><i class="fa-solid fa-share-nodes"></i> Social</button>
              </div>
            </div>
          `;
  }).join('')}
      </div>

      ${paginationHtml}
    </div>
  `;

  if (activePlaceholder) {
    const restoredInput = container.querySelector(`input[placeholder="${activePlaceholder}"]`);
    if (restoredInput) {
      window.requestAnimationFrame(() => {
        restoredInput.focus();
        if (selectionStart !== null && selectionEnd !== null) {
          const start = Math.min(selectionStart, restoredInput.value.length);
          const end = Math.min(selectionEnd, restoredInput.value.length);
          restoredInput.setSelectionRange(start, end);
        }
      });
    }
  }
}

/**
 * Injects a dialog for creating a new project asking for Celebrity, Stylist & Title.
 * Includes dropdown of saved Stylists + option to add a new Stylist.
 */
function injectNewProjectModal(onProjectSwitch) {
  if (document.getElementById("newProjectModalOverlay")) return;

  const celebrities = ProjectStore.getCelebrities();
  const defaultCelebrity = celebrities[0] ? celebrities[0].name : "Shreya";

  const modalHtml = `
    <div id="newProjectModalOverlay" class="project-modal-overlay" style="display: none;">
      <div class="project-modal-card fashion-theme" style="max-width: 520px;">
        <div class="project-modal-header">
          <h3><i class="fa-solid fa-folder-plus"></i> Create New Project</h3>
          <button class="btn-close-modal" onclick="closeNewProjectDialog()">&times;</button>
        </div>
        <form onsubmit="submitNewProjectDialog(event)" style="padding: 24px;">
          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">1. Celebrity Name:</label>
            <input type="text" id="dialogCelebrityName" value="${escapeHtml(defaultCelebrity)}" placeholder="e.g. Shreya" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">2. Project / Requirement Title:</label>
            <input type="text" id="dialogProjectTitle" placeholder="e.g. Monday Bridal Selection" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">3. Assigned Stylist:</label>
            <select id="dialogStylistSelect" class="pm-select" onchange="handleStylistSelectChange(this.value)" style="margin-top: 6px; width: 100%;">
              <!-- Dynamic populated -->
            </select>

            <div id="newStylistInputContainer" style="display: none; margin-top: 10px;">
              <input type="text" id="dialogNewStylistName" placeholder="Enter New Stylist Name (e.g. Natasha)" class="pm-select" style="width: 100%; border-color: #d4af37;" />
            </div>
          </div>

          <button type="submit" class="btn-proceed-large" style="margin-top: 0;">
            <i class="fa-solid fa-arrow-right"></i> Create Project &amp; Proceed
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

export function openNewProjectDialog() {
  const modal = document.getElementById("newProjectModalOverlay");
  const stylistSelect = document.getElementById("dialogStylistSelect");
  const newStylistContainer = document.getElementById("newStylistInputContainer");

  if (stylistSelect) {
    const stylists = ProjectStore.getStylists();
    stylistSelect.innerHTML = `
      ${stylists.map(s => `<option value="${s.id}">${escapeHtml(s.name)} (${escapeHtml(s.title)})</option>`).join('')}
      <option value="__NEW_STYLIST__">+ Add New Stylist...</option>
    `;
  }

  if (newStylistContainer) {
    newStylistContainer.style.display = "none";
  }

  if (modal) {
    modal.style.display = "flex";
  }
}

export function closeNewProjectDialog() {
  const modal = document.getElementById("newProjectModalOverlay");
  if (modal) {
    modal.style.display = "none";
  }
}

export function handleStylistSelectChange(val) {
  const container = document.getElementById("newStylistInputContainer");
  const input = document.getElementById("dialogNewStylistName");

  if (val === "__NEW_STYLIST__") {
    if (container) container.style.display = "block";
    if (input) input.focus();
  } else {
    if (container) container.style.display = "none";
  }
}

export function submitNewProjectDialog(e, callback) {
  e.preventDefault();
  const celebrityInput = document.getElementById("dialogCelebrityName");
  const titleInput = document.getElementById("dialogProjectTitle");
  const stylistSelect = document.getElementById("dialogStylistSelect");
  const newStylistInput = document.getElementById("dialogNewStylistName");

  if (!celebrityInput || !celebrityInput.value.trim()) return;
  if (!titleInput || !titleInput.value.trim()) return;

  const celebrityName = celebrityInput.value.trim();
  const projectTitle = titleInput.value.trim();
  let stylistId = stylistSelect ? stylistSelect.value : null;

  // Check if adding a brand new Stylist on the fly
  if (stylistId === "__NEW_STYLIST__") {
    if (!newStylistInput || !newStylistInput.value.trim()) {
      alert("Please enter the name of the new Stylist.");
      return;
    }
    const newStylist = ProjectStore.saveStylist({
      name: newStylistInput.value.trim(),
      title: "Stylist"
    });
    stylistId = newStylist.id;
  }

  // Find or create Celebrity
  const celebrities = ProjectStore.getCelebrities();
  let celebrity = celebrities.find(c => c.name.toLowerCase() === celebrityName.toLowerCase());

  if (!celebrity) {
    celebrity = ProjectStore.saveCelebrity({
      name: celebrityName,
      category: "A-List Celebrity"
    });
  }

  // Create Project
  const newProject = ProjectStore.createProject({
    celebrityId: celebrity.id,
    stylistId: stylistId,
    title: projectTitle
  });

  ProjectStore.setActiveContext(celebrity.id, newProject.id);
  renderProjectBar();
  renderHomepageProjectsGateway(callback);
  closeNewProjectDialog();
  closeProjectDrawer();
  unlockStudioWorkspace();

  if (typeof callback === 'function') {
    callback(newProject);
  }

  if (typeof window.switchTab === 'function') {
    window.switchTab('browse');
  }
}

export function showHomepageGateway() {
  document.body.classList.add("gateway-active");
  const container = document.getElementById("homepageProjectsGatewayContainer");
  if (container) {
    container.style.display = "block";
  }
}

export function unlockStudioWorkspace() {
  document.body.classList.remove("gateway-active");
  const container = document.getElementById("homepageProjectsGatewayContainer");
  if (container) {
    container.style.display = "none";
  }
}

export function openProjectDrawer() {
  const modal = document.getElementById("projectDrawerModal");
  if (modal) {
    refreshProjectModalContent();
    modal.style.display = "flex";
  }
}

export function closeProjectDrawer() {
  const modal = document.getElementById("projectDrawerModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function injectProjectModal() {
  if (document.getElementById("projectDrawerModal")) return;

  const modalHtml = `
    <div id="projectDrawerModal" class="project-modal-overlay" style="display: none;">
      <div class="project-modal-card fashion-theme">
        <div class="project-modal-header">
          <h3><i class="fa-solid fa-crown"></i> Stylists &amp; Celebrities Workspace Studio</h3>
          <button class="btn-close-modal" onclick="closeProjectDrawer()">&times;</button>
        </div>
        <div class="project-modal-body" id="projectModalBody">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function refreshProjectModalContent() {
  const body = document.getElementById("projectModalBody");
  if (!body) return;

  const celebrities = ProjectStore.getCelebrities();
  const stylists = ProjectStore.getStylists();
  const { celebrity, project } = ProjectStore.getActiveContext();

  const activeCelebrityId = celebrity ? celebrity.id : "";
  const celebrityProjects = activeCelebrityId ? ProjectStore.getProjects(activeCelebrityId) : [];

  body.innerHTML = `
    <div class="project-manager-grid">
      <div class="pm-section pm-sidebar">
        <h4>1. Celebrity / Muse Directory</h4>
        <div class="form-group">
          <select id="pmCelebritySelect" class="pm-select" onchange="handleCelebrityChange(this.value)">
            ${celebrities.map(c => `<option value="${c.id}" ${c.id === activeCelebrityId ? 'selected' : ''}>${escapeHtml(c.name)} (${escapeHtml(c.category || 'Celebrity')})</option>`).join('')}
          </select>
        </div>

        <button class="btn-secondary-sm full-width" onclick="toggleNewCelebrityForm()">+ Add New Celebrity</button>

        <form id="newCelebrityForm" style="display: none;" onsubmit="handleCreateCelebritySubmit(event)" class="pm-inline-form">
          <input type="text" id="newCelebrityName" placeholder="Celebrity Name (e.g. Shreya)" required />
          <select id="newCelebrityCategory" class="pm-select-sm">
            <option value="A-List Actress & Icon">A-List Actress & Icon</option>
            <option value="Red Carpet Musician">Red Carpet Musician</option>
          </select>
          <button type="submit" class="btn-primary-sm">Save Celebrity</button>
        </form>

        <hr class="pm-divider" />

        <h4>2. Celebrity Projects / Lookbooks</h4>
        <div class="project-list-box">
          ${celebrityProjects.length === 0 ? '<p class="pm-empty">No projects created yet for this celebrity.</p>' : ''}
          ${celebrityProjects.map(p => {
    const isActive = project && p.id === project.id;
    const stylist = ProjectStore.getStylistById(p.stylistId);
    const stylistName = stylist ? stylist.name : "Unassigned";
    return `
              <div class="project-item-card ${isActive ? 'active' : ''}" onclick="handleProjectChange('${p.id}')">
                <div class="pic-header">
                  <strong>${escapeHtml(p.title)}</strong>
                  <span class="pic-badge">${escapeHtml(p.status)}</span>
                </div>
                <div class="pic-meta">
                  <span>Stylist: ${escapeHtml(stylistName)}</span> • <span>${escapeHtml(p.code)}</span>
                </div>
              </div>
            `;
  }).join('')}
        </div>

        <button class="btn-primary-sm full-width" onclick="openNewProjectDialog()">+ Create New Project</button>
      </div>

      <div class="pm-section pm-details">
        ${project ? renderProjectDetailsHtml(project) : '<p class="pm-empty">Select or create a project to proceed.</p>'}
      </div>
    </div>
  `;
}

function renderProjectDetailsHtml(project) {
  const stylist = ProjectStore.getStylistById(project.stylistId);
  const stylistName = stylist ? stylist.name : "Unassigned";

  return `
    <div class="pd-header">
      <div>
        <h3>${escapeHtml(project.title)} <small>(${escapeHtml(project.code)})</small></h3>
        <p class="pd-subtitle">
          <span><i class="fa-solid fa-user-tie"></i> Stylist: <strong>${escapeHtml(stylistName)}</strong></span>
        </p>
      </div>
      <div class="pd-status-control">
        <label>Stage:</label>
        <select onchange="updateCurrentProjectStatus('${project.id}', this.value)" class="pm-select-sm fashion-status-select">
          <option value="Curating" ${project.status === 'Curating' ? 'selected' : ''}>1. Curating (In)</option>
          <option value="Lookbook Sent" ${project.status === 'Lookbook Sent' ? 'selected' : ''}>2. Lookbook Sent to Celebrity</option>
          <option value="Celebrity Approved" ${project.status === 'Celebrity Approved' ? 'selected' : ''}>3. Celebrity Approved Pieces</option>
          <option value="Sample Reserved" ${project.status === 'Sample Reserved' ? 'selected' : ''}>4. Sample Reserved / Pull</option>
          <option value="Order Placed" ${project.status === 'Order Placed' ? 'selected' : ''}>5. Production / Order Placed</option>
        </select>
      </div>
    </div>

    ${project.notes ? `<div class="pd-notes-box"><i class="fa-solid fa-pen-nib"></i> <strong>Notes:</strong> ${escapeHtml(project.notes)}</div>` : ''}

    <button class="btn-proceed-large" onclick="handleProjectChange('${project.id}')">
      <i class="fa-solid fa-circle-check"></i> Proceed with this Project
    </button>
  `;
}

function handleCelebrityChange(celebrityId) {
  const projects = ProjectStore.getProjects(celebrityId);
  const activeProjId = projects.length > 0 ? projects[0].id : null;
  ProjectStore.setActiveContext(celebrityId, activeProjId);
  refreshProjectModalContent();
}

function handleProjectChange(projectId, callback) {
  const project = ProjectStore.getProjectById(projectId);
  if (project) {
    ProjectStore.setActiveContext(project.celebrityId, project.id);
    renderProjectBar();
    closeProjectDrawer();
    unlockStudioWorkspace();

    if (typeof callback === 'function') {
      callback(project);
    }
    if (typeof window.switchTab === 'function') {
      window.switchTab('browse');
    }
  }
}

function handleCreateCelebritySubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("newCelebrityName");
  const categorySelect = document.getElementById("newCelebrityCategory");
  const phoneInput = document.getElementById("newCelebrityPhone");
  if (!nameInput || !nameInput.value.trim()) return;

  const newCelebrity = ProjectStore.saveCelebrity({
    name: nameInput.value,
    category: categorySelect ? categorySelect.value : "A-List Actress & Icon",
    phone: phoneInput ? phoneInput.value : ""
  });

  const stylists = ProjectStore.getStylists();
  const newProject = ProjectStore.createProject({
    celebrityId: newCelebrity.id,
    stylistId: stylists[0] ? stylists[0].id : null,
    title: `${newCelebrity.name} Requirement`
  });

  ProjectStore.setActiveContext(newCelebrity.id, newProject.id);
  renderProjectBar();
  refreshProjectModalContent();
}

function handleCreateProjectSubmit(e, callback) {
  e.preventDefault();
  const titleInput = document.getElementById("newProjectTitle");
  const stylistSelect = document.getElementById("newProjectStylist");
  const notesInput = document.getElementById("newProjectNotes");
  if (!titleInput || !titleInput.value.trim()) return;

  const { celebrityId } = ProjectStore.getActiveContext();
  if (!celebrityId) return;

  const newProject = ProjectStore.createProject({
    celebrityId: celebrityId,
    stylistId: stylistSelect ? stylistSelect.value : null,
    title: titleInput.value,
    notes: notesInput ? notesInput.value : ""
  });

  ProjectStore.setActiveContext(celebrityId, newProject.id);
  renderProjectBar();
  renderHomepageProjectsGateway(callback);
  closeProjectDrawer();
  unlockStudioWorkspace();

  if (typeof callback === 'function') {
    callback(newProject);
  }

  if (typeof window.switchTab === 'function') {
    window.switchTab('browse');
  }
}

function updateCurrentProjectStatus(projectId, newStatus) {
  ProjectStore.updateProject(projectId, { status: newStatus, projectStatus: newStatus });
  ProjectStore.logProjectActivity(projectId, "Stage Updated", `Curation stage updated to "${newStatus}".`);
  renderProjectBar();
  refreshProjectModalContent();
  renderHomepageProjectsGateway();
}

window.openQuickEditProjectModal = function (projectId) {
  const p = ProjectStore.getProjectById(projectId);
  if (!p) return;

  let modal = document.getElementById("quickEditProjectModal");
  if (!modal) {
    const modalHtml = `
      <div id="quickEditProjectModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 560px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-pen-to-square"></i> Edit Project Details</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickEditProjectModal').style.display='none'">&times;</button>
          </div>
          <form id="quickEditProjectForm" onsubmit="handleQuickEditProjectSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qeProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Project Title:</label>
              <input type="text" id="qeTitle" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Head Stylist:</label>
                <input type="text" id="qeHeadStylist" class="pm-select" required />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Jewellery Brand:</label>
                <input type="text" id="qeBrand" class="pm-select" required />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Shared Date:</label>
                <input type="date" id="qeSharedDate" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Follow-up Date:</label>
                <input type="date" id="qeFollowUpDate" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Return Due Date:</label>
                <input type="date" id="qeReturnDueDate" class="pm-select" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Project Status:</label>
                <select id="qeProjectStatus" class="pm-select">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Active">Active</option>
                  <option value="Waiting for Return">Waiting for Return</option>
                  <option value="Waiting for Deliverables">Waiting for Deliverables</option>
                  <option value="Waiting for Social Post">Waiting for Social Post</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Payment Status:</label>
                <select id="qePaymentStatus" class="pm-select">
                  <option value="Pending">🔴 Pending</option>
                  <option value="Partial">🟡 Partial</option>
                  <option value="Paid">🟢 Paid</option>
                  <option value="Overdue">🔴 Overdue</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Invoice Amount (₹):</label>
                <input type="number" id="qeInvoiceAmt" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Amount Received (₹):</label>
                <input type="number" id="qeAmtReceived" class="pm-select" />
              </div>
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Project Details</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    modal = document.getElementById("quickEditProjectModal");
  }

  document.getElementById("qeProjectId").value = p.id;
  document.getElementById("qeTitle").value = p.title;
  document.getElementById("qeHeadStylist").value = p.headStylist || "Natasha K";
  document.getElementById("qeBrand").value = p.jewelleryBrand || "Ascend Fine Jewellery";
  document.getElementById("qeSharedDate").value = p.finalTraySharedDate || "";
  document.getElementById("qeFollowUpDate").value = p.followUpDate || "";
  document.getElementById("qeReturnDueDate").value = p.returnDueDate || "";
  document.getElementById("qeProjectStatus").value = p.projectStatus || p.status || "Active";

  const pay = p.payment || { invoiceAmount: 150000, amountReceived: 100000, status: "Partial" };
  document.getElementById("qePaymentStatus").value = pay.status || "Pending";
  document.getElementById("qeInvoiceAmt").value = pay.invoiceAmount || 0;
  document.getElementById("qeAmtReceived").value = pay.amountReceived || 0;

  modal.style.display = "flex";
};

window.handleQuickEditProjectSubmit = function (e) {
  e.preventDefault();
  const pid = document.getElementById("qeProjectId").value;
  if (!pid) return;

  const updates = {
    title: document.getElementById("qeTitle").value.trim(),
    headStylist: document.getElementById("qeHeadStylist").value.trim(),
    jewelleryBrand: document.getElementById("qeBrand").value.trim(),
    finalTraySharedDate: document.getElementById("qeSharedDate").value,
    followUpDate: document.getElementById("qeFollowUpDate").value,
    returnDueDate: document.getElementById("qeReturnDueDate").value,
    projectStatus: document.getElementById("qeProjectStatus").value,
    status: document.getElementById("qeProjectStatus").value,
    payment: {
      invoiceAmount: parseFloat(document.getElementById("qeInvoiceAmt").value) || 0,
      amountReceived: parseFloat(document.getElementById("qeAmtReceived").value) || 0,
      status: document.getElementById("qePaymentStatus").value
    }
  };

  ProjectStore.updateProject(pid, updates);
  document.getElementById("quickEditProjectModal").style.display = "none";
  renderHomepageProjectsGateway();
  renderProjectBar();
};

window.openQuickUpdateReturnModal = function (projectId) {
  const p = ProjectStore.getProjectById(projectId);
  if (!p) return;
  const prod = p.productStats || { sent: 18, returned: 14, pending: 3, missing: 1 };

  let modal = document.getElementById("quickReturnModal");
  if (!modal) {
    const modalHtml = `
      <div id="quickReturnModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 440px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-rotate-left"></i> Update Product Return Status</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickReturnModal').style.display='none'">&times;</button>
          </div>
          <form onsubmit="handleQuickReturnSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qrProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Total Products Sent:</label>
              <input type="number" id="qrSent" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">🟢 Products Returned:</label>
              <input type="number" id="qrReturned" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">🟡 Pending Returns:</label>
              <input type="number" id="qrPending" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="font-weight:700; font-size:0.85rem;">🔴 Missing Products:</label>
              <input type="number" id="qrMissing" class="pm-select" required />
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Product Status</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    modal = document.getElementById("quickReturnModal");
  }

  document.getElementById("qrProjectId").value = p.id;
  document.getElementById("qrSent").value = prod.sent || 0;
  document.getElementById("qrReturned").value = prod.returned || 0;
  document.getElementById("qrPending").value = prod.pending || 0;
  document.getElementById("qrMissing").value = prod.missing || 0;

  modal.style.display = "flex";
};

window.handleQuickReturnSubmit = function (e) {
  e.preventDefault();
  const pid = document.getElementById("qrProjectId").value;
  if (!pid) return;

  const productStats = {
    sent: parseInt(document.getElementById("qrSent").value) || 0,
    returned: parseInt(document.getElementById("qrReturned").value) || 0,
    pending: parseInt(document.getElementById("qrPending").value) || 0,
    missing: parseInt(document.getElementById("qrMissing").value) || 0
  };

  ProjectStore.updateProject(pid, { productStats });
  document.getElementById("quickReturnModal").style.display = "none";
  renderHomepageProjectsGateway();
};

window.openQuickUpdateDeliverablesModal = function (projectId) {
  const p = ProjectStore.getProjectById(projectId);
  if (!p) return;
  const deliv = p.deliverables || { completed: 3, total: 5 };

  let modal = document.getElementById("quickDeliverablesModal");
  if (!modal) {
    const modalHtml = `
      <div id="quickDeliverablesModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 440px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-list-check"></i> Update Deliverables</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickDeliverablesModal').style.display='none'">&times;</button>
          </div>
          <form onsubmit="handleQuickDeliverablesSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qdProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Completed Deliverables:</label>
              <input type="number" id="qdCompleted" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="font-weight:700; font-size:0.85rem;">Total Deliverables Agreed:</label>
              <input type="number" id="qdTotal" class="pm-select" required />
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Deliverables Progress</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    modal = document.getElementById("quickDeliverablesModal");
  }

  document.getElementById("qdProjectId").value = p.id;
  document.getElementById("qdCompleted").value = deliv.completed || 0;
  document.getElementById("qdTotal").value = deliv.total || 0;

  modal.style.display = "flex";
};

window.handleQuickDeliverablesSubmit = function (e) {
  e.preventDefault();
  const pid = document.getElementById("qdProjectId").value;
  if (!pid) return;

  const deliverables = {
    completed: parseInt(document.getElementById("qdCompleted").value) || 0,
    total: parseInt(document.getElementById("qdTotal").value) || 0
  };

  ProjectStore.updateProject(pid, { deliverables });
  document.getElementById("quickDeliverablesModal").style.display = "none";
  renderHomepageProjectsGateway();
};

window.quickToggleSocialPosted = function (projectId) {
  const p = ProjectStore.getProjectById(projectId);
  if (!p) return;

  const social = p.socialPosting || { status: "Pending", postingDate: "" };
  let newStatus = "Posted";
  let newDate = new Date().toISOString().split('T')[0];

  if (social.status === "Pending") {
    newStatus = "Posted";
  } else if (social.status === "Posted") {
    newStatus = "Verified";
  } else {
    newStatus = "Pending";
    newDate = "";
  }

  ProjectStore.updateProject(projectId, {
    socialPosting: { status: newStatus, postingDate: newDate }
  });

  renderHomepageProjectsGateway();
};

window.toggleNewCelebrityForm = function () {
  const form = document.getElementById("newCelebrityForm");
  if (form) form.style.display = form.style.display === "none" ? "flex" : "none";
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
