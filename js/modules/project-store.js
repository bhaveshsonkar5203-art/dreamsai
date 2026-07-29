/**
 * High-Fashion Stylist & Celebrity Curation Store Module
 * Handles dual-sync persistence with Google Sheets API and local fallback.
 * Automatically saves Projects, Stylists, Celebrities, and Item Selections directly to Google Sheets!
 */

export const API_URL = "https://script.google.com/macros/s/AKfycbx0eH7JARm9zfA7thFyCYt4LYUTcPzw0MdKFuVTAg-z6il9_r2YSJG00WiRwv2QJmQ/exec";

const STORAGE_KEYS = {
  STYLISTS: "dreamsai_celebrity_stylists_v6",
  CELEBRITIES: "dreamsai_celebrities_v6",
  PROJECTS: "dreamsai_celebrity_projects_v6",
  ACTIVE_CONTEXT: "dreamsai_celebrity_active_context_v6"
};

// Helper for safe localStorage access
function safeGetItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`[CelebrityStore] Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function safeSetItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[CelebrityStore] Error saving ${key} to localStorage`, e);
  }
}

// Default Seed Data tailored for High Fashion Stylists & Celebrities
function initializeDefaultData() {
  let stylists = safeGetItem(STORAGE_KEYS.STYLISTS, null);
  let celebrities = safeGetItem(STORAGE_KEYS.CELEBRITIES, null);
  let projects = safeGetItem(STORAGE_KEYS.PROJECTS, null);

  if (!stylists || !Array.isArray(stylists) || stylists.length === 0) {
    stylists = [
      {
        id: "sty_ananya_01",
        name: "Ananya Sharma",
        title: "Lead Red Carpet Stylist",
        specialty: "High Fine & Couture Jewellery",
        createdAt: new Date().toISOString()
      },
      {
        id: "sty_rohan_02",
        name: "Rohan Mehta",
        title: "Celebrity Fashion Director",
        specialty: "Runway & Award Season",
        createdAt: new Date().toISOString()
      }
    ];
    safeSetItem(STORAGE_KEYS.STYLISTS, stylists);
  }

  if (!celebrities || !Array.isArray(celebrities) || celebrities.length === 0) {
    celebrities = [
      {
        id: "cel_shreya_001",
        name: "Shreya",
        category: "A-List Actress & Icon",
        house: "Red Carpet Gala",
        phone: "+91 9876543210",
        email: "shreya@atelier.com",
        createdAt: new Date().toISOString()
      },
      {
        id: "cel_rahul_002",
        name: "Rahul",
        category: "Fashion Icon & Artist",
        house: "Vogue Showcase",
        phone: "+91 9812345678",
        email: "rahul@vogue.com",
        createdAt: new Date().toISOString()
      }
    ];
    safeSetItem(STORAGE_KEYS.CELEBRITIES, celebrities);
  }

  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    const now = new Date();
    const monDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();

    projects = [
      {
        id: "proj_shreya_mon_001",
        celebrityId: "cel_shreya_001",
        stylistId: "sty_ananya_01",
        code: "LB-2026-FW01",
        title: "Monday Gala Pull (Shreya)",
        season: "Fall / Winter 2026",
        purpose: "Red Carpet Gala",
        status: "Lookbook Sent",
        notes: "Initial requirement provided on Monday by Shreya. Curated by Stylist Ananya Sharma.",
        createdAt: monDate,
        updatedAt: monDate,
        selectedSerials: [],
        pdfRecords: [
          {
            id: "pdf_001",
            pdfTitle: "Shreya_Gala_Curation_Mon.pdf",
            pdfKind: "Celebrity Lookbook",
            generatedAt: monDate,
            itemCount: 0
          }
        ],
        activityLog: [
          {
            id: "act_001",
            timestamp: monDate,
            action: "Curation Initiated",
            details: "Lookbook created for Celebrity Shreya by Stylist Ananya Sharma."
          }
        ]
      }
    ];
    safeSetItem(STORAGE_KEYS.PROJECTS, projects);
  }
}

// Initialize on load
initializeDefaultData();

/* --- GOOGLE SHEETS CLOUD SYNC HELPERS --- */

async function postToGoogleSheets(payload) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      console.warn(`[GoogleSheetsSync] HTTP ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(`[GoogleSheetsSync] Network error syncing with Google Sheets`, err);
    return null;
  }
}

export async function fetchProjectsFromGoogleSheets() {
  try {
    const res = await postToGoogleSheets({ action: "getProjectsAndStylists" });
    if (res && res.ok) {
      if (Array.isArray(res.projects) && res.projects.length) {
        safeSetItem(STORAGE_KEYS.PROJECTS, res.projects);
      }
      if (Array.isArray(res.stylists) && res.stylists.length) {
        safeSetItem(STORAGE_KEYS.STYLISTS, res.stylists);
      }
      if (Array.isArray(res.celebrities) && res.celebrities.length) {
        safeSetItem(STORAGE_KEYS.CELEBRITIES, res.celebrities);
      }
      console.log("[GoogleSheetsSync] Successfully pulled projects from Google Sheets.");
      return res;
    }
  } catch (e) {
    console.warn("[GoogleSheetsSync] Error fetching from Google Sheets", e);
  }
  return null;
}

// Automatically sync from Google Sheets on load
fetchProjectsFromGoogleSheets();

/* --- STYLIST APIs --- */

export function getStylists() {
  return safeGetItem(STORAGE_KEYS.STYLISTS, []);
}

export function getStylistById(id) {
  const stylists = getStylists();
  return stylists.find(s => s.id === id) || null;
}

export function saveStylist({ name, title = "Personal Stylist", specialty = "Couture Jewellery" }) {
  const stylists = getStylists();
  const newStylist = {
    id: "sty_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    name: name.trim(),
    title: title.trim(),
    specialty: specialty.trim(),
    createdAt: new Date().toISOString()
  };
  stylists.unshift(newStylist);
  safeSetItem(STORAGE_KEYS.STYLISTS, stylists);

  // Sync to Google Sheets
  postToGoogleSheets({ action: "saveStylist", stylist: newStylist });

  return newStylist;
}

/* --- CELEBRITY APIs --- */

export function getCelebrities() {
  return safeGetItem(STORAGE_KEYS.CELEBRITIES, []);
}

export function getCelebrityById(id) {
  const celebrities = getCelebrities();
  return celebrities.find(c => c.id === id) || null;
}

export function saveCelebrity({ name, category = "A-List Actress & Icon", house = "", phone = "", email = "" }) {
  const celebrities = getCelebrities();
  const newCelebrity = {
    id: "cel_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    name: name.trim(),
    category: category || "A-List Actress & Icon",
    house: house.trim(),
    phone: phone.trim(),
    email: email.trim(),
    createdAt: new Date().toISOString()
  };
  celebrities.unshift(newCelebrity);
  safeSetItem(STORAGE_KEYS.CELEBRITIES, celebrities);

  // Sync to Google Sheets
  postToGoogleSheets({ action: "saveCelebrity", celebrity: newCelebrity });

  return newCelebrity;
}

/* --- PROJECT / LOOKBOOK APIs --- */

export function getProjects(celebrityId = null, stylistId = null) {
  let projects = safeGetItem(STORAGE_KEYS.PROJECTS, []);
  if (celebrityId) {
    projects = projects.filter(p => p.celebrityId === celebrityId);
  }
  if (stylistId) {
    projects = projects.filter(p => p.stylistId === stylistId);
  }
  return projects;
}

export function getProjectById(projectId) {
  const projects = getProjects();
  return projects.find(p => p.id === projectId) || null;
}

export function createProject({ celebrityId, stylistId = null, title, season = "Fall / Winter 2026", purpose = "Red Carpet Pull", notes = "" }) {
  const projects = getProjects();
  const celebrity = getCelebrityById(celebrityId);
  const celebrityName = celebrity ? celebrity.name : "Celebrity";

  const stylists = getStylists();
  const activeStylist = stylistId ? getStylistById(stylistId) : (stylists[0] || null);

  const now = new Date();
  const projectCode = `LB-${now.getFullYear()}-${(projects.length + 1).toString().padStart(3, '0')}`;

  const newProject = {
    id: "proj_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    celebrityId: celebrityId,
    stylistId: activeStylist ? activeStylist.id : null,
    code: projectCode,
    title: title.trim() || `${celebrityName} Curation`,
    season: season || "FW-2026",
    purpose: purpose || "Red Carpet Pull",
    status: "Curating",
    notes: notes.trim(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    selectedSerials: [],
    pdfRecords: [],
    activityLog: [
      {
        id: "act_" + Date.now(),
        timestamp: now.toISOString(),
        action: "Curation Initiated",
        details: `Created lookbook "${title}" for Celebrity ${celebrityName}${activeStylist ? ` by Stylist ${activeStylist.name}` : ''}.`
      }
    ]
  };

  projects.unshift(newProject);
  safeSetItem(STORAGE_KEYS.PROJECTS, projects);
  setActiveContext(celebrityId, newProject.id);

  // Sync to Google Sheets API
  postToGoogleSheets({ action: "saveProject", project: newProject });

  return newProject;
}

export function updateProject(projectId, updates) {
  const projects = getProjects();
  const idx = projects.findIndex(p => p.id === projectId);
  if (idx === -1) return null;

  projects[idx] = {
    ...projects[idx],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  safeSetItem(STORAGE_KEYS.PROJECTS, projects);

  // Sync update to Google Sheets API
  postToGoogleSheets({ action: "saveProject", project: projects[idx] });

  return projects[idx];
}

export function updateProjectItems(projectId, serials) {
  const project = getProjectById(projectId);
  if (!project) return null;

  const previousCount = project.selectedSerials ? project.selectedSerials.length : 0;
  const newCount = serials.length;

  const updatedProject = updateProject(projectId, { selectedSerials: [...serials] });

  if (previousCount !== newCount) {
    logProjectActivity(projectId, "Selection Updated", `curation updated: ${newCount} pieces selected.`);
  }

  return updatedProject;
}

export function logProjectActivity(projectId, action, details) {
  const projects = getProjects();
  const idx = projects.findIndex(p => p.id === projectId);
  if (idx === -1) return null;

  const newActivity = {
    id: "act_" + Date.now() + "_" + Math.random().toString(36).substr(2, 3),
    timestamp: new Date().toISOString(),
    action,
    details
  };

  if (!projects[idx].activityLog) {
    projects[idx].activityLog = [];
  }
  projects[idx].activityLog.unshift(newActivity);
  projects[idx].updatedAt = new Date().toISOString();

  safeSetItem(STORAGE_KEYS.PROJECTS, projects);

  // Sync to Google Sheets
  postToGoogleSheets({ action: "saveProject", project: projects[idx] });

  return newActivity;
}

export function addProjectPdfRecord(projectId, { pdfTitle, pdfKind, itemCount, dataUrl = null }) {
  const projects = getProjects();
  const idx = projects.findIndex(p => p.id === projectId);
  if (idx === -1) return null;

  const pdfRecord = {
    id: "pdf_" + Date.now(),
    pdfTitle,
    pdfKind: pdfKind || "Celebrity Lookbook",
    generatedAt: new Date().toISOString(),
    itemCount: itemCount || 0,
    dataUrl
  };

  if (!projects[idx].pdfRecords) {
    projects[idx].pdfRecords = [];
  }
  projects[idx].pdfRecords.unshift(pdfRecord);
  projects[idx].updatedAt = new Date().toISOString();

  safeSetItem(STORAGE_KEYS.PROJECTS, projects);

  logProjectActivity(projectId, "PDF Exported", `Generated ${pdfKind} PDF (${pdfTitle}) with ${itemCount} items.`);

  return pdfRecord;
}

/* --- ACTIVE STYLIST & CELEBRITY CONTEXT APIs --- */

export function getActiveContext() {
  const defaultCtx = { celebrityId: null, projectId: null };
  const ctx = safeGetItem(STORAGE_KEYS.ACTIVE_CONTEXT, defaultCtx);

  const celebrities = getCelebrities();
  const projects = getProjects();
  const stylists = getStylists();

  let activeProject = projects.find(p => p.id === ctx.projectId) || projects[0] || null;
  let activeCelebrity = activeProject ? (celebrities.find(c => c.id === activeProject.celebrityId) || celebrities[0]) : (celebrities.find(c => c.id === ctx.celebrityId) || celebrities[0] || null);
  let activeStylist = activeProject && activeProject.stylistId ? getStylistById(activeProject.stylistId) : (stylists[0] || null);

  return {
    celebrityId: activeCelebrity ? activeCelebrity.id : null,
    projectId: activeProject ? activeProject.id : null,
    stylistId: activeStylist ? activeStylist.id : null,
    celebrity: activeCelebrity,
    project: activeProject,
    stylist: activeStylist
  };
}

export function setActiveContext(celebrityId, projectId) {
  const ctx = { celebrityId, projectId };
  safeSetItem(STORAGE_KEYS.ACTIVE_CONTEXT, ctx);
  return getActiveContext();
}
