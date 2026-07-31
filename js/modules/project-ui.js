/**
 * High-Fashion Stylists & Celebrities Homepage Gateway UI
 * Controls project creation asking for Celebrity Name, Project Name, and Stylist.
 * Supports selecting existing saved Stylists OR adding a new Stylist on the fly!
 * Fully synced with Google Sheets API & Local Storage.
 */

import * as ProjectStore from './project-store.js';

export function initProjectUI({ onProjectSwitch }) {
  renderProjectBar();
  renderHomepageProjectsGateway(onProjectSwitch);
  injectProjectModal();
  injectNewProjectModal(onProjectSwitch);

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
  window.renderHomepageProjectsGateway = () => renderHomepageProjectsGateway(onProjectSwitch);
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
 * Renders the clean Homepage Project Gateway showing ONLY Project, Stylist & Celebrity names.
 */
export function renderHomepageProjectsGateway(onProjectSwitch) {
  let container = document.getElementById("homepageProjectsGatewayContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "homepageProjectsGatewayContainer";
    container.className = "homepage-gateway-overlay";
    document.body.prepend(container);
  }

  const allProjects = ProjectStore.getProjects();
  const { project: activeProject } = ProjectStore.getActiveContext();

  container.innerHTML = `
    <div class="hp-gateway-wrapper">
      <div class="hp-gateway-header">
        <div class="hp-gateway-title">
          <h2><i class="fa-solid fa-gem"></i> Projects &amp; Stylists Gateway</h2>
          <p>Please select an existing project or create a new project to proceed to catalogue selection.</p>
        </div>
        <button class="btn-create-project-main" onclick="openNewProjectDialog()">
          <i class="fa-solid fa-plus"></i> + Create New Project
        </button>
      </div>

      <div class="hp-projects-cards-grid">
        <!-- New Project Card Button -->
        <div class="hp-project-card new-project-card" onclick="openNewProjectDialog()">
          <div class="new-card-icon"><i class="fa-solid fa-plus"></i></div>
          <strong>+ Create New Project</strong>
          <span>Select saved Stylist or add new</span>
        </div>

        ${allProjects.map(p => {
    const isActive = activeProject && p.id === activeProject.id;
    const celebrity = ProjectStore.getCelebrityById(p.celebrityId);
    const stylist = ProjectStore.getStylistById(p.stylistId);
    const celebrityName = celebrity ? celebrity.name : "Celebrity";
    const stylistName = stylist ? stylist.name : "Unassigned Stylist";

    let badgeClass = "badge-curating";
    if (p.status === "Lookbook Sent") badgeClass = "badge-sent";
    if (p.status === "Celebrity Approved") badgeClass = "badge-approved";
    if (p.status === "Sample Reserved") badgeClass = "badge-reserved";
    if (p.status === "Order Placed") badgeClass = "badge-order";

    return `
            <div class="hp-project-card ${isActive ? 'active-project' : ''}" onclick="handleProjectChange('${p.id}')">
              ${isActive ? '<div class="active-ribbon">Selected Project</div>' : ''}
              
              <div class="hp-card-stylist-banner">
                <i class="fa-solid fa-user-tie"></i> Stylist: <strong>${escapeHtml(stylistName)}</strong>
              </div>

              <h3 class="hp-card-project-name">${escapeHtml(p.title)}</h3>
              
              <div class="hp-card-info-simple">
                <span><i class="fa-solid fa-star"></i> Celebrity: <strong>${escapeHtml(celebrityName)}</strong></span>
                <span class="status-badge ${badgeClass}">${escapeHtml(p.status)}</span>
              </div>

              <div class="hp-card-proceed-footer">
                <span class="btn-proceed-action"><i class="fa-solid fa-circle-play"></i> Click to Proceed &amp; Select</span>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;
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
