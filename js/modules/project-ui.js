/**
 * High-Fashion Stylists & Celebrities Homepage Gateway UI
 * Controls project creation asking for Celebrity Name, Project Name, and Stylist.
 * Supports selecting existing saved Stylists OR adding a new Stylist on the fly!
 * Fully synced with Google Sheets API & Local Storage.
 */

import * as ProjectStore from './project-store.js';
import { formatDateDisplay } from '../utils/helpers.js';

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
  if (value === 'Return pending') return 'proj-return';
  if (value === 'Missing deliverables') return 'proj-deliverables';
  if (value === 'Social pending') return 'proj-social';
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

function addDaysToDateString(dateStr, days = 15) {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return '';
  dateObj.setDate(dateObj.getDate() + days);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}



function getFollowUpStatus(dateValue) {
  if (!dateValue) return 'none';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateValue);
  if (Number.isNaN(target.getTime())) return 'none';
  target.setHours(0, 0, 0, 0);

  if (target < today) return 'overdue';
  if (target.getTime() === today.getTime()) return 'due';
  return 'future';
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
    total: projects.length,
    active: projects.filter(p => {
      const s = String(getProjectDisplayStatus(p)).toLowerCase();
      return s === 'active' || s === 'lookbook sent' || s.includes('active');
    }).length,
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
  window.handleProjectChange = (projId, callback, targetTab = null) => handleProjectChange(projId, callback || onProjectSwitch, targetTab);
  window.handleCreateCelebritySubmit = handleCreateCelebritySubmit;
  window.handleCreateProjectSubmit = (e) => handleCreateProjectSubmit(e, onProjectSwitch);
  window.handleQuickNewProject = () => openNewProjectDialog();
  window.showHomepageGateway = showHomepageGateway;
  window.unlockStudioWorkspace = unlockStudioWorkspace;
  window.updateCurrentProjectStatus = updateCurrentProjectStatus;
  window.renderHomepageProjectsGateway = () => renderHomepageProjectsGateway(homepageProjectSwitchCallback);
  window.renderDashboard = renderProjectDashboard;
  window.renderProjectDashboard = renderProjectDashboard;
  window.toggleHomepageProjectFilters = toggleHomepageProjectFilters;
  window.changeHomepageProjectPage = changeHomepageProjectPage;
  window.quickFilterOverview = (type) => {
    if (type === 'active') {
      homepageProjectFilters.projectStatus = homepageProjectFilters.projectStatus === 'Active' ? '' : 'Active';
      homepageProjectFilters.returnStatus = '';
      homepageProjectFilters.paymentStatus = '';
    } else if (type === 'pendingReturns') {
      homepageProjectFilters.returnStatus = homepageProjectFilters.returnStatus === 'Pending' ? '' : 'Pending';
      homepageProjectFilters.projectStatus = '';
      homepageProjectFilters.paymentStatus = '';
    } else if (type === 'missing') {
      homepageProjectFilters.returnStatus = homepageProjectFilters.returnStatus === 'Missing' ? '' : 'Missing';
      homepageProjectFilters.projectStatus = '';
      homepageProjectFilters.paymentStatus = '';
    } else if (type === 'revenue') {
      homepageProjectFilters.paymentStatus = homepageProjectFilters.paymentStatus === 'Paid' ? '' : 'Paid';
      homepageProjectFilters.projectStatus = '';
      homepageProjectFilters.returnStatus = '';
    } else {
      homepageProjectFilters.projectStatus = '';
      homepageProjectFilters.returnStatus = '';
      homepageProjectFilters.paymentStatus = '';
    }
    homepageProjectPagination.currentPage = 1;
    renderHomepageProjectsGateway(homepageProjectSwitchCallback);
  };
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

  const celebrityName = celebrity ? celebrity.name : "Unassigned";
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
      <div class="project-bar-left">
        <button class="btn-switch-projects" onclick="showHomepageGateway()" title="Return to Projects Gateway">
          <i class="fa-solid fa-grid-2-plus"></i> <span>Gateway</span>
        </button>

        <div class="project-bar-divider"></div>

        <div class="project-meta-group">
          <span class="project-pill" onclick="openProjectDrawer()" title="Click to view project details">
            <i class="fa-solid fa-layer-group"></i>
            <span class="project-title-text">${escapeHtml(projectTitle)}</span>
            <span class="project-code">${escapeHtml(projectCode)}</span>
          </span>
          <span class="status-badge ${statusBadgeClass}">${escapeHtml(projectStatus)}</span>
        </div>
      </div>

      <div class="project-bar-center">
        <div class="people-pills-group">
          <span class="meta-pill stylist-pill" title="Stylist">
            <i class="fa-solid fa-user-tie"></i>
            <span class="pill-label">Stylist:</span>
            <strong>${escapeHtml(stylistName)}</strong>
          </span>
          <span class="meta-pill celebrity-pill" title="Celebrity">
            <i class="fa-solid fa-star"></i>
            <span class="pill-label">Celebrity:</span>
            <strong>${escapeHtml(celebrityName)}</strong>
          </span>
        </div>
      </div>

      <div class="project-bar-right">
        <div class="project-bar-stats">
          <span class="stat-tag" title="Selected pieces">
            <i class="fa-solid fa-gem"></i>
            <strong>${selectedCount}</strong> <span class="stat-lbl">Pieces</span>
          </span>
          <span class="stat-tag" title="Exported PDFs">
            <i class="fa-solid fa-file-pdf"></i>
            <strong>${pdfCount}</strong> <span class="stat-lbl">PDFs</span>
          </span>
        </div>

        ${(() => {
          const activeDept = ProjectStore.selectedDepartment || (typeof window.getSelectedDepartment === 'function' ? window.getSelectedDepartment() : '');
          const allProjects = ProjectStore.getProjects();
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const dueCount = allProjects.filter(p => {
            if (!p.followUpDate) return false;
            const fDate = new Date(p.followUpDate);
            if (isNaN(fDate.getTime())) return false;
            fDate.setHours(0, 0, 0, 0);
            return today >= fDate;
          }).length;

          return `
            <button class="btn-project-manage fashion-btn ${dueCount > 0 ? 'has-reminders-pulse' : ''}" 
                    onclick="window.showDepartmentFollowUpModal('${escapeHtml(activeDept || '')}')" 
                    title="${dueCount > 0 ? `${dueCount} Follow-up Reminders Due` : 'Follow-up Reminders'}"
                    style="position: relative; padding: 6px 12px;">
              <i class="fa-solid fa-bell" style="color: ${dueCount > 0 ? '#fb923c' : 'inherit'};"></i>
              ${dueCount > 0 ? `<span class="project-bar-bell-badge">${dueCount}</span>` : ''}
            </button>
          `;
        })()}

        <button class="btn-project-manage fashion-btn" onclick="openProjectDrawer()" title="Open Project Manager">
          <i class="fa-solid fa-sliders"></i>
          <span>Manager</span>
        </button>
      </div>
    </div>
  `;
}

let _hasMigratedFollowUpDates = false;

/**
 * Renders the homepage gateway as a polished campaign dashboard with project overviews, filters, and quick actions.
 */
export function renderHomepageProjectsGateway(onProjectSwitch) {
  let container = document.getElementById("homepageProjectsGatewayContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "homepageProjectsGatewayContainer";
    container.className = "homepage-gateway-overlay";
    const appMain = document.querySelector(".app-main") || document.body;
    appMain.prepend(container);
  }

  const activeElement = document.activeElement;
  const activePlaceholder = activeElement && activeElement.tagName === 'INPUT' ? activeElement.getAttribute('placeholder') : '';
  const selectionStart = activeElement && typeof activeElement.selectionStart === 'number' ? activeElement.selectionStart : null;
  const selectionEnd = activeElement && typeof activeElement.selectionEnd === 'number' ? activeElement.selectionEnd : null;

  const allProjects = ProjectStore.getProjects();

  // Auto-derive followUpDate for existing projects that have finalTraySharedDate but no followUpDate
  if (!_hasMigratedFollowUpDates) {
    _hasMigratedFollowUpDates = true;
    allProjects.forEach(p => {
      if (p.finalTraySharedDate && !p.followUpDate) {
        const derived = addDaysToDateString(p.finalTraySharedDate, 15);
        if (derived) {
          p.followUpDate = derived;
          ProjectStore.updateProject(p.id, { followUpDate: derived });
        }
      }
    });
  }

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
          <h2><i class="fa-solid fa-gem" style="color: #d4af37; margin-right: 8px;"></i> ASCEND Communications</h2>
          <p>PR Campaign Dashboard — monitor active pulls, pending returns, client deliverables, and launch new projects.</p>
        </div>
        <div class="hp-gateway-actions">
          <button class="btn-create-project-main" onclick="openNewProjectDialog()">
            <i class="fa-solid fa-plus"></i> New Project
          </button>
        </div>
      </div>

      <!-- Direct Homepage Overview Statistics with Visual Indicators -->
      <div class="hp-overview-section">
        <div class="hp-summary-cards-grid">
          <button class="hp-summary-card card-indicator-green ${homepageProjectFilters.projectStatus === 'Active' ? 'is-filter-active' : ''}"
                  onclick="window.quickFilterOverview('active')"
                  title="Filter Active Projects">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-active"><i class="fa-solid fa-chart-line"></i></div>
              <span class="hp-status-pill pill-green"><span class="pulse-dot dot-green"></span> Active</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${summary.active}</span>
              <span class="summary-lbl">Active Projects</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-amber ${homepageProjectFilters.returnStatus === 'Pending' ? 'is-filter-active' : ''}"
                  onclick="window.quickFilterOverview('pendingReturns')"
                  title="Filter Pending Returns">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-pending-returns"><i class="fa-solid fa-rotate-left"></i></div>
              <span class="hp-status-pill pill-amber"><span class="pulse-dot dot-amber"></span> Pending</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${summary.pendingReturns}</span>
              <span class="summary-lbl">Pending Returns</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-red ${homepageProjectFilters.returnStatus === 'Missing' ? 'is-filter-active' : ''}"
                  onclick="window.quickFilterOverview('missing')"
                  title="Filter Missing Products">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-missing"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <span class="hp-status-pill pill-red"><span class="pulse-dot dot-red"></span> Missing</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${summary.missingProducts}</span>
              <span class="summary-lbl">Missing Products</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-slate ${(!homepageProjectFilters.projectStatus && !homepageProjectFilters.returnStatus && !homepageProjectFilters.paymentStatus) ? 'is-filter-active' : ''}"
                  onclick="window.quickFilterOverview('all')"
                  title="View All Projects">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-total"><i class="fa-solid fa-folder-open"></i></div>
              <span class="hp-status-pill pill-slate">Total</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${summary.total}</span>
              <span class="summary-lbl">Total Projects</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-emerald ${homepageProjectFilters.paymentStatus === 'Paid' ? 'is-filter-active' : ''}"
                  onclick="window.quickFilterOverview('revenue')"
                  title="Filter Settled Revenue">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-revenue"><i class="fa-solid fa-indian-rupee-sign"></i></div>
              <span class="hp-status-pill pill-emerald"><i class="fa-solid fa-check"></i> Settled</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${formatCurrency(summary.revenueReceived || summary.totalValue)}</span>
              <span class="summary-lbl">Revenue Received</span>
            </div>
          </button>
        </div>
      </div>

      <div class="hp-toolbar-actions">
        <div class="hp-section-heading">
          <h3 class="hp-section-title">Projects Directory</h3>
          <span class="hp-project-count-badge">${filteredProjects.length} ${filteredProjects.length === 1 ? 'Project' : 'Projects'}</span>
        </div>

        <button class="hp-filter-toggle-btn ${homepageProjectMenuState.filtersOpen ? 'is-active' : ''}"
                onclick="event.stopPropagation(); window.toggleHomepageProjectFilters()"
                aria-expanded="${homepageProjectMenuState.filtersOpen}"
                aria-controls="homepageProjectFilterPanel"
                aria-label="Toggle Project Filters">
          <i class="fa-solid fa-sliders"></i> Filters
        </button>
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
            <option value="Return pending" ${homepageProjectFilters.projectStatus === 'Return pending' ? 'selected' : ''}>Return pending</option>
            <option value="Missing deliverables" ${homepageProjectFilters.projectStatus === 'Missing deliverables' ? 'selected' : ''}>Missing deliverables</option>
            <option value="Social pending" ${homepageProjectFilters.projectStatus === 'Social pending' ? 'selected' : ''}>Social pending</option>
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
        ${filteredProjects.length === 0 ? '<div class="hp-project-card"><strong>No projects match the selected filters.</strong></div>' : paginatedProjects.map(p => {
    const isActive = activeProject && p.id === activeProject.id;
    const celebrity = ProjectStore.getCelebrityById(p.celebrityId);
    const stylist = ProjectStore.getStylistById(p.stylistId);
    const celebrityName = celebrity ? celebrity.name : (p.celebrityName || 'Celebrity');
    const stylistName = p.headStylist || (stylist ? stylist.name : 'Unassigned Stylist');

    const sharedDate = p.finalTraySharedDate || '';
    const followUpDate = p.followUpDate || (sharedDate ? addDaysToDateString(sharedDate, 15) : '');
    const returnDueDate = p.returnDueDate || '';
    const hasAnyDates = Boolean(sharedDate || followUpDate || returnDueDate);

    return `
            <div class="hp-project-card ${isActive ? 'active-project' : ''}" onclick="window.handleProjectChange('${p.id}', null, null)" role="button" tabindex="0" aria-label="Open ${escapeHtml(p.title)} inventory">
              <div class="hp-card-stylist-block">
                <span class="hp-meta-label">STYLIST</span>
                <span class="hp-stylist-val">${escapeHtml(stylistName)}</span>
              </div>

              <div class="hp-card-title-block">
                <h3 class="hp-project-title">${escapeHtml(p.title)}</h3>
              </div>

              <div class="hp-card-celebrity-block">
                <span class="hp-meta-label">CELEBRITY</span>
                <span class="hp-celebrity-val">${escapeHtml(celebrityName)}</span>
              </div>

              ${hasAnyDates ? `
                <div class="hp-card-divider-clean"></div>
                <div class="hp-dates-vertical">
                  ${sharedDate ? `
                    <div class="hp-date-line">
                      <span class="hp-date-type">Final List</span>
                      <span class="hp-date-val">${escapeHtml(formatDateDisplay(sharedDate))}</span>
                    </div>
                  ` : ''}
                  ${followUpDate ? `
                    <div class="hp-date-line">
                      <span class="hp-date-type">Follow-up</span>
                      <span class="hp-date-val">${escapeHtml(formatDateDisplay(followUpDate))}</span>
                    </div>
                  ` : ''}
                  ${returnDueDate ? `
                    <div class="hp-date-line">
                      <span class="hp-date-type">Return Due</span>
                      <span class="hp-date-val">${escapeHtml(formatDateDisplay(returnDueDate))}</span>
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <div class="hp-card-footer-actions">
                <button class="hp-card-btn-dashboard" onclick="event.stopPropagation(); window.handleProjectChange('${p.id}', null, 'dashboard')" title="Open Project Dashboard">
                  <i class="fa-solid fa-gauge-high"></i> Dashboard
                </button>
                <div class="hp-card-browse-link" onclick="event.stopPropagation(); window.handleProjectChange('${p.id}', null, 'browse')" title="Open Inventory">
                  <span class="hp-browse-lbl">Inventory</span>
                  <span class="hp-arrow-link"><i class="fa-solid fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          `;
  }).join('')}
      </div>

      ${paginationHtml}
    </div>
  `;

  // Check for follow-up reminders once per session
  checkAndShowFollowUpReminders();

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
          <h3><i class="fa-solid fa-folder-plus"></i> New Project</h3>
          <button class="btn-close-modal" onclick="closeNewProjectDialog()">&times;</button>
        </div>
        <form onsubmit="submitNewProjectDialog(event)" style="padding: 24px;">
          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Celebrity Name:</label>
            <input type="text" id="dialogCelebrityName" value="${escapeHtml(defaultCelebrity)}" placeholder="e.g. Shreya" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Project Title:</label>
            <input type="text" id="dialogProjectTitle" placeholder="e.g. Monday Bridal Selection" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Stylist:</label>
            <select id="dialogStylistSelect" class="pm-select" onchange="handleStylistSelectChange(this.value)" style="margin-top: 6px; width: 100%;">
              <!-- Dynamic populated -->
            </select>

            <div id="newStylistInputContainer" style="display: none; margin-top: 10px;">
              <input type="text" id="dialogNewStylistName" placeholder="Enter New Stylist Name (e.g. Natasha)" class="pm-select" style="width: 100%; border-color: #d4af37;" />
            </div>
          </div>

          <button type="submit" class="btn-proceed-large" style="margin-top: 0;">
            <i class="fa-solid fa-arrow-right"></i> Create Project
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
      window.showToast("Please enter the name of the new Stylist.");
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
  document.body.classList.remove("department-selection-active");
  
  const ds = document.getElementById("departmentSelectionScreen");
  if (ds) ds.classList.add("hidden");

  const container = document.getElementById("homepageProjectsGatewayContainer");
  if (container) {
    container.style.display = "block";
  }
  
  // Re-render the gateway to ensure it reflects the currently selected department's projects
  if (typeof renderHomepageProjectsGateway === 'function') {
    renderHomepageProjectsGateway(homepageProjectSwitchCallback);
  }

  const allNavItems = document.querySelectorAll(".sidebar-nav-item, .bottom-nav-item");
  allNavItems.forEach(el => el.classList.remove("active"));
  const homeBtn = document.getElementById("tabDashboardBtn");
  if (homeBtn) homeBtn.classList.add("active");
  const bottomHome = document.getElementById("bottomNavHome");
  if (bottomHome) bottomHome.classList.add("active");
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

        <button class="btn-primary-sm full-width" onclick="openNewProjectDialog()">+ New Project</button>
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

let isProjectSwitchingLocked = false;

function showProjectSwitchLoader() {
  let loader = document.getElementById("projectSwitchLoader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "projectSwitchLoader";
    loader.style.cssText = "position: fixed; inset: 0; background: rgba(15, 17, 23, 0.4); backdrop-filter: blur(4px); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; gap: 12px; font-family: var(--font-sans);";
    loader.innerHTML = `
      <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2.5rem; color: #c5a059;"></i>
      <span style="font-weight: 600; font-size: 0.95rem; letter-spacing: 0.05em;">Switching Project...</span>
    `;
    document.body.appendChild(loader);
  }
  loader.style.display = "flex";
}

function hideProjectSwitchLoader() {
  const loader = document.getElementById("projectSwitchLoader");
  if (loader) loader.style.display = "none";
}

function showProjectSwitchError(projectId, callback, targetTab) {
  hideProjectSwitchLoader();
  isProjectSwitchingLocked = false;
  let errModal = document.getElementById("projectSwitchErrorModal");
  if (!errModal) {
    errModal = document.createElement("div");
    errModal.id = "projectSwitchErrorModal";
    errModal.className = "project-modal-overlay";
    document.body.appendChild(errModal);
  }
  errModal.innerHTML = `
    <div class="project-modal-card" style="max-width: 440px; padding: 24px; text-align: center;">
      <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.8rem; color: #ef4444; margin-bottom: 12px;"></i>
      <h3 style="margin: 0 0 8px; font-family: var(--font-serif); font-size: 1.3rem;">Unable to Switch Project</h3>
      <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 20px;">We encountered an issue loading project ID: <strong>${escapeHtml(projectId || 'Unknown')}</strong>.</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button class="btn-dash-action" onclick="document.getElementById('projectSwitchErrorModal').style.display='none'">Dismiss</button>
        <button class="btn-dash-action btn-dash-primary" onclick="document.getElementById('projectSwitchErrorModal').style.display='none'; handleProjectChange('${projectId}', null, '${targetTab}')">
          <i class="fa-solid fa-rotate-right"></i> Retry
        </button>
      </div>
    </div>
  `;
  errModal.style.display = "flex";
}

function handleProjectChange(projectId, callback, targetTab = null) {
  if (isProjectSwitchingLocked) return;
  isProjectSwitchingLocked = true;
  showProjectSwitchLoader();

  setTimeout(() => {
    try {
      const project = ProjectStore.getProjectById(projectId);
      if (!project) {
        throw new Error(`Project ${projectId} not found in store.`);
      }

      const tabToLoad = targetTab || project.activeTab || 'dashboard';

      ProjectStore.setActiveContext(project.celebrityId, project.id);
      renderProjectBar();
      closeProjectDrawer();
      unlockStudioWorkspace();

      if (typeof callback === 'function') {
        callback(project);
      }
      if (typeof window.switchTab === 'function') {
        window.switchTab(tabToLoad);
      }
      if (tabToLoad === 'dashboard') {
        renderProjectDashboard();
      }

      hideProjectSwitchLoader();
      isProjectSwitchingLocked = false;
    } catch (err) {
      console.error("Project Switch Failed:", err);
      showProjectSwitchError(projectId, callback, targetTab);
    }
  }, 180);
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
  renderProjectDashboard();
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
    window.switchTab('dashboard');
  }
  renderProjectDashboard();
}

function updateCurrentProjectStatus(projectId, newStatus) {
  ProjectStore.updateProject(projectId, { status: newStatus, projectStatus: newStatus });
  ProjectStore.logProjectActivity(projectId, "Stage Updated", `Curation stage updated to "${newStatus}".`);
  renderProjectBar();
  refreshProjectModalContent();
  renderHomepageProjectsGateway();
  renderProjectDashboard();
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
                  <option value="Return pending">Return pending</option>
                  <option value="Missing deliverables">Missing deliverables</option>
                  <option value="Social pending">Social pending</option>
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
  renderProjectDashboard();
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
  renderProjectDashboard();
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
  renderProjectDashboard();
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
  renderProjectDashboard();
};

window.toggleNewCelebrityForm = function () {
  const form = document.getElementById("newCelebrityForm");
  if (form) form.style.display = form.style.display === "none" ? "flex" : "none";
};

function checkAndShowFollowUpReminders() {
  // Automatic modal pop-up disabled; follow-ups are now triggered explicitly via department bell icons.
}

window.showDepartmentFollowUpModal = function(deptName) {
  const allProjects = ProjectStore.getProjects();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueProjects = allProjects.filter(p => {
    const matchesDept = !deptName || !p.department || p.department.toLowerCase() === String(deptName).toLowerCase();
    if (!matchesDept) return false;
    if (!p.followUpDate) return false;
    const fDate = new Date(p.followUpDate);
    if (isNaN(fDate.getTime())) return false;
    fDate.setHours(0, 0, 0, 0);
    return today >= fDate;
  });

  showFollowUpReminderModal(dueProjects, deptName);
};

function showFollowUpReminderModal(dueProjects, deptName = '') {
  let modal = document.getElementById("followUpReminderModalOverlay");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "followUpReminderModalOverlay";
    modal.className = "project-modal-overlay";
    document.body.appendChild(modal);
  }

  const itemsHtml = dueProjects.length > 0 ? dueProjects.map(p => {
    const celebrity = ProjectStore.getCelebrityById(p.celebrityId);
    const stylist = ProjectStore.getStylistById(p.stylistId);
    const celebrityName = celebrity ? celebrity.name : 'Celebrity';
    const stylistName = stylist ? stylist.name : 'Stylist';
    const status = getFollowUpStatus(p.followUpDate);
    const badgeText = status === 'overdue' ? 'Overdue' : 'Due Today';
    const badgeClass = status === 'overdue' ? 'badge-missing' : 'badge-pending';

    return `
      <div style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 8px; margin-bottom: 10px; background: #fafaf9; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
        <div>
          <div style="font-weight: 700; font-size: 0.92rem; color: #1c1917;">${escapeHtml(p.title)}</div>
          <div style="font-size: 0.82rem; color: #78716c; margin-top: 2px;">
            <i class="fa-solid fa-star"></i> ${escapeHtml(celebrityName)} &nbsp;|&nbsp; <i class="fa-solid fa-user-tie"></i> ${escapeHtml(stylistName)}
          </div>
          <div style="font-size: 0.8rem; color: #a8a29e; margin-top: 2px;">
            Follow-up date: <strong>${formatDateDisplay(p.followUpDate)}</strong>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <span class="prod-badge ${badgeClass}" style="margin:0;">${badgeText}</span>
          <button class="btn-qa btn-qa-primary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="window.closeFollowUpReminderModal(); window.selectDepartment('${escapeHtml(deptName || p.department || '')}'); window.handleProjectChange('${p.id}');">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project
          </button>
        </div>
      </div>
    `;
  }).join('') : `
    <div style="text-align: center; padding: 30px 10px; color: #78716c;">
      <i class="fa-regular fa-bell-slash" style="font-size: 2rem; color: #cbd5e1; margin-bottom: 10px;"></i>
      <p style="margin: 0; font-weight: 600;">No pending follow-ups for ${escapeHtml(deptName || 'this department')}.</p>
    </div>
  `;

  modal.innerHTML = `
    <div class="project-modal-card fashion-theme" style="max-width: 540px; box-sizing: border-box;">
      <div class="project-modal-header">
        <h3><i class="fa-solid fa-bell" style="color: #cba72f;"></i> ${escapeHtml(deptName ? deptName + ' Follow-ups' : 'Follow-up Reminders')} (${dueProjects.length})</h3>
        <button class="btn-close-modal" onclick="window.closeFollowUpReminderModal()">&times;</button>
      </div>
      <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
        ${dueProjects.length > 0 ? `<p style="margin: 0 0 14px 0; font-size: 0.88rem; color: #78716c;">Campaign project(s) requiring follow-up in <strong>${escapeHtml(deptName || 'Department')}</strong>:</p>` : ''}
        ${itemsHtml}
      </div>
      <div class="project-modal-footer" style="padding: 12px 20px; display: flex; justify-content: flex-end; background: #fafaf9; border-top: 1px solid #e7e5e4;">
        <button class="btn-qa btn-qa-secondary" onclick="window.closeFollowUpReminderModal()">Close</button>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

window.closeFollowUpReminderModal = function() {
  const modal = document.getElementById("followUpReminderModalOverlay");
  if (modal) modal.style.display = "none";
};

/**
 * Complete Project Dashboard Workspace Renderer
 * Renders all operational details, metrics, dates, returns, payment, social, deliverables, and actions.
 */
export function renderProjectDashboard() {
  const container = document.getElementById("projectDashboardContent") || document.getElementById("dashboardTab");
  if (!container) return;

  const { celebrity, project, stylist } = ProjectStore.getActiveContext();
  const allProjects = ProjectStore.getProjects();
  const p = project || (allProjects.length > 0 ? allProjects[0] : null);

  if (!p) {
    container.innerHTML = `
      <div class="dash-empty-state" style="text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 20px 0;">
        <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 16px;"></i>
        <h3 style="font-family: 'EB Garamond', serif; font-size: 1.75rem; margin-bottom: 8px;">No Active Project Selected</h3>
        <p style="color: #64748b; margin-bottom: 24px;">Choose an existing project from the Home catalog or create a new campaign to manage.</p>
        <button class="btn-dash-action btn-dash-primary" onclick="showHomepageGateway()" style="padding: 10px 24px; background: #000; color: #fff; border-radius: 6px; border: none; font-weight: 600; cursor: pointer;">
          <i class="fa-solid fa-house" style="margin-right: 8px;"></i> Go to All Projects
        </button>
      </div>
    `;
    return;
  }

  const activeCelebrity = celebrity || ProjectStore.getCelebrityById(p.celebrityId);
  const activeStylist = stylist || ProjectStore.getStylistById(p.stylistId);
  const celebrityName = activeCelebrity ? activeCelebrity.name : (p.celebrityName || 'Zendaya');
  const stylistName = p.headStylist || (activeStylist ? activeStylist.name : 'Law Roach');
  const projectCode = p.code || p.id || 'PRJ-2024-MET';
  const brandName = p.jewelleryBrand || 'Maison Margiela · Couture Spring 2024';

  const projectStatus = getProjectDisplayStatus(p);
  const paymentStatus = getPaymentStatus(p);
  const socialStatus = getSocialStatus(p);
  const productStats = getProductStats(p);
  const deliverables = getDeliverables(p);

  const sharedDate = p.finalTraySharedDate || '';
  const followUpDate = p.followUpDate || (sharedDate ? addDaysToDateString(sharedDate, 15) : '');
  const returnDueDate = p.returnDueDate || '';
  const postingDate = p.socialPosting?.postingDate || '';

  const followUpStatus = getFollowUpStatus(followUpDate);
  const isReturnOverdue = isDateOverdue(returnDueDate);

  // Read real return products state from current project or active state
  const returnState = (p && Array.isArray(p.returnProductsState) && p.returnProductsState.length > 0)
    ? p.returnProductsState
    : (Array.isArray(window.returnProductsState) ? window.returnProductsState : []);

  const totalProducts = returnState.length || productStats.sent || (productStats.returned + productStats.pending + productStats.missing) || 0;
  const returnedCount = returnState.length ? returnState.filter(i => i.returnStatus === 'received').length : productStats.returned;
  const pendingReturnCount = returnState.length ? returnState.filter(i => i.returnStatus === 'pending').length : productStats.pending;
  const missingReturnCount = returnState.length ? returnState.filter(i => i.returnStatus === 'missing').length : productStats.missing;
  const damagedCount = returnState.length ? returnState.filter(i => i.condition === 'damaged').length : 0;
  const returnRate = totalProducts > 0 ? Math.round((returnedCount / totalProducts) * 100) : 0;

  const pay = p.payment || { invoiceAmount: 12500, amountReceived: 5000, status: 'Partial' };
  const invoiceAmt = Number(pay.invoiceAmount || 12500);
  const receivedAmt = Number(pay.amountReceived || 5000);
  const outstandingAmt = Math.max(0, invoiceAmt - receivedAmt);

  const delivCompleted = deliverables.completed || 2;
  const delivTotal = Math.max(deliverables.total || 4, 1);
  const delivRate = delivTotal > 0 ? Math.round((delivCompleted / delivTotal) * 100) : 50;

  const selectedPiecesCount = Array.isArray(p.selectedSerials) ? p.selectedSerials.length : (Array.isArray(window.selected) ? window.selected.length : 42);
  const activityLog = Array.isArray(p.activityLog) ? p.activityLog : [];

  // Stage mapping index
  const stages = ["Initial Brief", "Pulling", "Fitting", "Final Selection", "Archived"];
  let activeStageIdx = 2; // Fitting by default
  const statusLower = String(p.status || '').toLowerCase();
  if (statusLower.includes('brief') || statusLower.includes('curat')) activeStageIdx = 0;
  else if (statusLower.includes('pull') || statusLower.includes('sent')) activeStageIdx = 1;
  else if (statusLower.includes('fit') || statusLower.includes('approv')) activeStageIdx = 2;
  else if (statusLower.includes('final') || statusLower.includes('reserv')) activeStageIdx = 3;
  else if (statusLower.includes('archiv') || statusLower.includes('complet')) activeStageIdx = 4;

  container.innerHTML = `
    <div class="dash-workspace-wrapper" style="max-width: 1440px; margin: 0 auto; padding: 24px; font-family: 'Inter', sans-serif; color: #1a1c1d;">
      
      <!-- HERO SECTION -->
      <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 24px;">
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 11.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #515f74;">${escapeHtml(projectCode)}</span>
              <span style="background: #cba72f; color: #4e3d00; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 6px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: #4e3d00; display: inline-block;"></span>
                ${escapeHtml(projectStatus)}
              </span>
            </div>
            <h1 style="font-family: 'EB Garamond', serif; font-size: 2.5rem; font-weight: 400; color: #000; margin: 0 0 4px 0; line-height: 1.1;">${escapeHtml(p.title)}</h1>
            <p style="font-size: 1.1rem; color: #515f74; margin: 0;">${escapeHtml(celebrityName)} · ${escapeHtml(stylistName)} · ${escapeHtml(brandName)}</p>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
            <button class="btn-dash-action" onclick="window.openQuickEditProjectModal('${p.id}')" style="display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1c1d; cursor: pointer; transition: all 0.2s;">
              <i class="fa-solid fa-pen-to-square"></i> Edit Project
            </button>
            <button class="btn-dash-action" onclick="switchTab('browse')" style="display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; background: #000000; color: #ffffff; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s;">
              <i class="fa-solid fa-box-open"></i> Browse Catalog
            </button>
          </div>
        </div>

        <!-- CURATION STAGE PROGRESS -->
        <div style="border-top: 1px solid #e2e8f0; pt-20; padding-top: 24px;">
          <h3 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #76777d; margin-bottom: 20px;">Curation Stage Progress</h3>
          
          <div style="display: flex; align-items: center; justify-content: space-between; position: relative;">
            <!-- Connector Line -->
            <div style="position: absolute; left: 5%; right: 5%; top: 20px; height: 3px; background: #eeeeef; z-index: 1; border-radius: 2px;">
              <div style="height: 100%; width: ${(activeStageIdx / (stages.length - 1)) * 100}%; background: #cba72f; border-radius: 2px; transition: width 0.4s ease;"></div>
            </div>

            ${stages.map((stage, idx) => {
              const isCompleted = idx < activeStageIdx;
              const isCurrent = idx === activeStageIdx;
              return `
                <div style="display: flex; flex-col; flex-direction: column; align-items: center; position: relative; z-index: 2; cursor: pointer;" onclick="window.updateCurrentProjectStatus('${p.id}', '${stage}')" title="Click to set stage to ${stage}">
                  <div style="width: ${isCurrent ? '46px' : '40px'}; height: ${isCurrent ? '46px' : '40px'}; border-radius: 50%; background: ${isCurrent ? '#cba72f' : (isCompleted ? '#ffffff' : '#ffffff')}; border: 2px solid ${isCurrent ? '#735c00' : (isCompleted ? '#735c00' : '#e2e8f0')}; display: flex; align-items: center; justify-content: center; color: ${isCurrent ? '#ffffff' : (isCompleted ? '#735c00' : '#94a3b8')}; margin-bottom: 8px; box-shadow: ${isCurrent ? '0 0 12px rgba(203, 167, 47, 0.4)' : 'none'}; transition: all 0.2s;">
                    ${isCompleted ? '<i class="fa-solid fa-check" style="font-size: 16px;"></i>' : (isCurrent ? '<i class="fa-solid fa-sliders" style="font-size: 18px;"></i>' : `<span style="font-size: 14px; font-weight: 600;">${idx + 1}</span>`)}
                  </div>
                  <span style="font-size: 13px; font-weight: ${isCurrent ? '700' : '400'}; color: ${isCurrent ? '#000000' : '#515f74'};">${stage}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- KEY METRICS ROW -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 24px;">
        
        <!-- Curated Pieces -->
        <div onclick="switchTab('selected')" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.06)';" onmouseleave="this.style.transform='none'; this.style.boxShadow='none';">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <i class="fa-solid fa-shirt" style="font-size: 22px; color: #000;"></i>
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #76777d;">Curated Pieces</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 8px;">
            <span style="font-family: 'EB Garamond', serif; font-size: 2.2rem; font-weight: 600; color: #000;">${selectedPiecesCount}</span>
            <span style="font-size: 13px; color: #515f74;">/ ${totalProducts} Approved</span>
          </div>
          <div style="margin-top: 14px; width: 100%; background: #e8e8e9; height: 4px; border-radius: 2px; overflow: hidden;">
            <div style="background: #000000; height: 100%; width: ${Math.min(100, Math.round((selectedPiecesCount / totalProducts) * 100))}%;"></div>
          </div>
        </div>

        <!-- Returns Tracking -->
        <div onclick="window.filterReturnProductsBy('all', 'all')" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.06)';" onmouseleave="this.style.transform='none'; this.style.boxShadow='none';" title="Click to open Returns Processing Workspace">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-rotate-left" style="font-size: 20px; color: #000;"></i>
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #76777d;">Returns Tracking</span>
            </div>
            <span style="font-size: 11px; font-weight: 600; color: #3b82f6;">View All &rarr;</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span style="font-family: 'EB Garamond', serif; font-size: 2.2rem; font-weight: 600; color: #000;">${returnedCount}/${totalProducts}</span>
              <p style="font-size: 12px; color: #166534; background: #f0fdf4; padding: 2px 8px; border-radius: 4px; display: inline-block; margin: 4px 0 0 0; font-weight: 600;">${returnRate}% Returned</p>
            </div>
            <div style="width: 60px; height: 36px; border-radius: 4px; background: #f8fafc; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center;">
              <i class="fa-solid fa-chart-line" style="color: #166534; font-size: 18px;"></i>
            </div>
          </div>
        </div>

        <!-- Financials -->
        <div onclick="window.openQuickEditProjectModal('${p.id}')" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.06)';" onmouseleave="this.style.transform='none'; this.style.boxShadow='none';">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <i class="fa-solid fa-indian-rupee-sign" style="font-size: 20px; color: #000;"></i>
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #76777d;">Financials</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 8px;">
            <span style="font-family: 'EB Garamond', serif; font-size: 2.2rem; font-weight: 600; color: #000;">${formatCurrency(invoiceAmt)}</span>
          </div>
          <div style="margin-top: 10px; display: flex; align-items: center; gap: 12px;">
            <div style="flex: 1; space-y: 2px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: #515f74;">
                <span>Received</span>
                <strong style="color: #166534;">${formatCurrency(receivedAmt)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: #515f74;">
                <span>Due</span>
                <strong style="color: ${outstandingAmt > 0 ? '#991b1b' : '#166534'};">${formatCurrency(outstandingAmt)}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Social & PR -->
        <div onclick="window.quickToggleSocialPosted('${p.id}')" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.06)';" onmouseleave="this.style.transform='none'; this.style.boxShadow='none';">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <i class="fa-solid fa-bullhorn" style="font-size: 20px; color: #000;"></i>
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #76777d;">Social & PR</span>
          </div>
          <div>
            <span style="font-family: 'EB Garamond', serif; font-size: 2.2rem; font-weight: 600; color: #000;">${escapeHtml(socialStatus)}</span>
            <p style="font-size: 12px; color: #515f74; margin: 4px 0 0 0;">Tags: @${escapeHtml(celebrityName.toLowerCase().replace(/\s+/g, ''))}</p>
          </div>
        </div>

      </div>

      <!-- OPERATIONAL PANELS GRID -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px;">
        
        <!-- Panel 1: Important Dates -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; pb-12; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-regular fa-calendar-days" style="font-size: 20px; color: #000;"></i>
              <h3 style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #515f74; margin: 0;">Important Dates</h3>
            </div>
            <button onclick="window.openQuickEditProjectModal('${p.id}')" style="background: transparent; border: none; font-size: 12px; color: #cba72f; font-weight: 600; cursor: pointer;">Edit</button>
          </div>

          <div style="flex: 1; space-y: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed #f1f5f9;">
              <div>
                <span style="font-size: 14px; font-weight: 600; color: #1a1c1d; display: block;">Final List Shared</span>
                <span style="font-size: 12px; color: #76777d;">Curated selection to stylist</span>
              </div>
              <span style="font-size: 13.5px; font-weight: 500; color: #1a1c1d;">${escapeHtml(sharedDate ? formatDateDisplay(sharedDate) : 'May 4, 2024')}</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed #f1f5f9;">
              <div>
                <span style="font-size: 14px; font-weight: 600; color: #1a1c1d; display: block;">15-Day Follow-up</span>
                <span style="font-size: 12px; color: #76777d;">Check-in with team</span>
              </div>
              <span style="font-size: 13.5px; font-weight: 600; color: ${followUpStatus === 'overdue' ? '#991b1b' : '#1a1c1d'};">${escapeHtml(followUpDate ? formatDateDisplay(followUpDate) : 'May 19, 2024')}</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
              <div>
                <span style="font-size: 14px; font-weight: 600; color: #1a1c1d; display: block;">Return Due Date</span>
                <span style="font-size: 12px; color: #76777d;">Expected back at studio</span>
              </div>
              <span style="font-size: 13.5px; font-weight: 600; color: ${isReturnOverdue ? '#991b1b' : '#1a1c1d'};">${escapeHtml(returnDueDate ? formatDateDisplay(returnDueDate) : 'May 25, 2024')}</span>
            </div>
          </div>

          <button onclick="window.openQuickEditProjectModal('${p.id}')" style="margin-top: 20px; width: 100%; padding: 10px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1c1d; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f8fafc';" onmouseleave="this.style.background='#ffffff';">Update Timeline</button>
        </div>

        <!-- Panel 2: Flagged & Overdue Items -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-box-open" style="font-size: 20px; color: #000;"></i>
              <h3 style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #515f74; margin: 0;">Flagged Items (${pendingReturnCount + missingReturnCount + damagedCount})</h3>
            </div>
            <span style="background: ${missingReturnCount > 0 || damagedCount > 0 ? '#ffdad6' : '#fefce8'}; color: ${missingReturnCount > 0 || damagedCount > 0 ? '#93000a' : '#854d0e'}; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">Action Required</span>
          </div>

          <div style="flex: 1; space-y: 12px;">
            ${(() => {
              const flagged = returnState.filter(i => i.returnStatus === 'pending' || i.returnStatus === 'missing' || i.condition === 'damaged');
              if (flagged.length === 0) {
                return `
                  <div style="text-align: center; padding: 20px 10px; color: #166534; background: #f0fdf4; border-radius: 6px;">
                    <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; margin-bottom: 6px;"></i>
                    <p style="margin: 0; font-size: 0.88rem; font-weight: 600;">All products returned in good condition!</p>
                  </div>
                `;
              }
              return flagged.slice(0, 3).map(item => {
                const isMissing = item.returnStatus === 'missing';
                const isDamaged = item.condition === 'damaged';
                const statusText = isMissing ? 'Missing' : (isDamaged ? 'Damaged' : 'Pending');
                const statusBg = isMissing ? '#fef2f2' : (isDamaged ? '#fff1f2' : '#fefce8');
                const statusColor = isMissing ? '#991b1b' : (isDamaged ? '#be123c' : '#854d0e');
                const filterStatus = isMissing ? 'missing' : 'pending';
                const filterCond = isDamaged ? 'damaged' : 'all';

                return `
                  <div onclick="window.filterReturnProductsBy('${filterStatus}', '${filterCond}')" style="display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 6px; background: #f9f9fa; border: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f1f5f9';" onmouseleave="this.style.background='#f9f9fa';" title="Click to view in Returns Tab">
                    <div style="width: 40px; height: 40px; border-radius: 4px; background: #e2e2e3; display: flex; align-items: center; justify-content: center; color: #515f74; overflow: hidden;">
                      ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" style="width:100%; height:100%; object-fit:cover;">` : '<i class="fa-solid fa-gem"></i>'}
                    </div>
                    <div style="flex: 1; min-width: 0;">
                      <h4 style="font-size: 14px; font-weight: 600; margin: 0; color: #1a1c1d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(item.name || item.serial)}</h4>
                      <span style="font-size: 12px; color: #76777d;">Code: ${escapeHtml(item.code || item.serial)}</span>
                    </div>
                    <span style="font-size: 11px; font-weight: 700; color: ${statusColor}; background: ${statusBg}; padding: 4px 8px; border-radius: 4px;">${statusText}</span>
                  </div>
                `;
              }).join('');
            })()}
          </div>

          <button onclick="window.filterReturnProductsBy('pending', 'all')" style="margin-top: 20px; width: 100%; padding: 10px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1c1d; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f8fafc';" onmouseleave="this.style.background='#ffffff';">Manage Returns Workspace</button>
        </div>

        <!-- Panel 3: Social & PR Tasks -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-share-nodes" style="font-size: 20px; color: #000;"></i>
              <h3 style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #515f74; margin: 0;">Social & PR Deliverables</h3>
            </div>
          </div>

          <div style="flex: 1; space-y: 14px;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 24px; height: 24px; border-radius: 4px; background: #f0fdf4; color: #166534; display: flex; align-items: center; justify-content: center; margin-top: 2px;">
                <i class="fa-solid fa-check" style="font-size: 12px;"></i>
              </div>
              <div>
                <span style="font-size: 14px; font-weight: 600; color: #1a1c1d; display: block;">Getty Images PR Link</span>
                <span style="font-size: 12px; color: #76777d;">Uploaded by PR team</span>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 24px; height: 24px; border-radius: 4px; background: #fefce8; color: #854d0e; display: flex; align-items: center; justify-content: center; margin-top: 2px;">
                <i class="fa-solid fa-hourglass-start" style="font-size: 12px;"></i>
              </div>
              <div>
                <span style="font-size: 14px; font-weight: 600; color: #1a1c1d; display: block;">Instagram Reel Tags</span>
                <span style="font-size: 12px; color: #76777d;">Waiting for stylist approval</span>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 24px; height: 24px; border-radius: 4px; background: #fef2f2; color: #991b1b; display: flex; align-items: center; justify-content: center; margin-top: 2px;">
                <i class="fa-solid fa-exclamation" style="font-size: 12px;"></i>
              </div>
              <div>
                <span style="font-size: 14px; font-weight: 600; color: #1a1c1d; display: block;">Vogue Exclusive BTS</span>
                <span style="font-size: 12px; color: #991b1b;">Missing high-res photos</span>
              </div>
            </div>
          </div>

          <button onclick="window.openQuickUpdateDeliverablesModal('${p.id}')" style="margin-top: 20px; width: 100%; padding: 10px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1c1d; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f8fafc';" onmouseleave="this.style.background='#ffffff';">Upload Assets</button>
        </div>

        <!-- Panel 4: Balance Due -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-receipt" style="font-size: 20px; color: #000;"></i>
              <h3 style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #515f74; margin: 0;">Balance Due</h3>
            </div>
          </div>

          <div style="flex: 1; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 12px 0;">
            <span style="font-family: 'EB Garamond', serif; font-size: 2.8rem; font-weight: 500; color: #000; line-height: 1;">${formatCurrency(outstandingAmt)}</span>
            <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #76777d; margin-top: 6px;">Total Outstanding</span>

            <div style="margin-top: 20px; space-y: 8px; text-align: left;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #515f74;">
                <span>Styling Fee</span>
                <strong style="color: #000;">$5,000</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #515f74;">
                <span>Tailoring & Alterations</span>
                <strong style="color: #000;">$1,200</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #515f74;">
                <span>Courier & Shipping</span>
                <strong style="color: #000;">$450</strong>
              </div>
            </div>
          </div>

          <button onclick="window.openQuickEditProjectModal('${p.id}')" style="margin-top: 20px; width: 100%; padding: 10px; border: none; background: #000000; color: #ffffff; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s;" onmouseenter="this.style.opacity='0.85';" onmouseleave="this.style.opacity='1';">Send Invoice</button>
        </div>

        <!-- Panel 5: Deliverables Checklist -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-list-check" style="font-size: 20px; color: #000;"></i>
              <h3 style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #515f74; margin: 0;">Tasks & Milestones</h3>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #cba72f;">${delivRate}% Done</span>
          </div>

          <div style="flex: 1; space-y: 12px;">
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
              <input type="checkbox" checked disabled style="accent-color: #cba72f; width: 16px; height: 16px;">
              <span style="font-size: 14px; color: #76777d; text-decoration: line-through;">Moodboard Approval</span>
            </label>
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
              <input type="checkbox" checked disabled style="accent-color: #cba72f; width: 16px; height: 16px;">
              <span style="font-size: 14px; color: #76777d; text-decoration: line-through;">Look 1 Finalized</span>
            </label>
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
              <input type="checkbox" style="accent-color: #cba72f; width: 16px; height: 16px;">
              <span style="font-size: 14px; color: #1a1c1d; font-weight: 500;">Look 2 Accessories Pull</span>
            </label>
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
              <input type="checkbox" style="accent-color: #cba72f; width: 16px; height: 16px;">
              <span style="font-size: 14px; color: #1a1c1d; font-weight: 500;">Post-Event Seeding Report</span>
            </label>
          </div>

          <button onclick="window.openQuickUpdateDeliverablesModal('${p.id}')" style="margin-top: 20px; width: 100%; padding: 10px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1c1d; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f8fafc';" onmouseleave="this.style.background='#ffffff';">Edit Tasks</button>
        </div>

        <!-- Panel 6: Activity Feed & Notes -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-comments" style="font-size: 20px; color: #000;"></i>
              <h3 style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #515f74; margin: 0;">Activity Feed</h3>
            </div>
          </div>

          <div style="flex: 1; space-y: 16px; overflow-y: auto; max-height: 180px; padding-right: 4px;">
            <div style="display: flex; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #e2e2e3; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #000; flex-shrink: 0;">
                LR
              </div>
              <div>
                <p style="font-size: 13px; margin: 0; color: #1a1c1d;"><strong style="font-weight: 600;">${escapeHtml(stylistName)}</strong> added a note</p>
                <div style="background: #f3f3f4; padding: 8px 12px; border-radius: 0 8px 8px 8px; margin-top: 4px;">
                  <p style="font-size: 12.5px; color: #515f74; font-style: italic; margin: 0;">"Let's make sure the veil is steamed properly before the red carpet. Very fragile."</p>
                </div>
                <span style="font-size: 10px; color: #76777d; margin-top: 4px; display: block;">2 hours ago</span>
              </div>
            </div>

            <div style="display: flex; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #cba72f; display: flex; align-items: center; justify-content: center; color: #ffffff; flex-shrink: 0;">
                <i class="fa-solid fa-arrows-rotate" style="font-size: 12px;"></i>
              </div>
              <div>
                <p style="font-size: 13px; margin: 0; color: #1a1c1d;">Stage changed to <strong style="color: #735c00;">Fitting</strong></p>
                <span style="font-size: 10px; color: #76777d; margin-top: 4px; display: block;">Yesterday · 4:30 PM</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 16px; display: flex; gap: 8px;">
            <input type="text" placeholder="Add a note..." style="flex: 1; padding: 8px 14px; background: #f3f3f4; border: 1px solid #e2e8f0; border-radius: 9999px; font-size: 13px; outline: none;">
            <button style="width: 36px; height: 36px; border-radius: 50%; background: #000; color: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              <i class="fa-solid fa-paper-plane" style="font-size: 12px;"></i>
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}
 
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
