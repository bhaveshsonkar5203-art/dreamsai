/**
 * High-Fashion Stylist & Celebrity Curation Store Module
 * Handles dual-sync persistence with Google Sheets API and local fallback.
 * Automatically saves Projects, Stylists, Celebrities, and Item Selections directly to Google Sheets!
 */

import { API_URL } from '../config.js';
export { API_URL };

import { selectedDepartment, setSelectedDepartment } from '../state.js';
export { selectedDepartment, setSelectedDepartment };
import { db, collection, setDoc, getDocs, getDoc, doc, deleteDoc } from './firebase-config.js';

const fallbackStorage = new Map();

/* --- STORAGE KEYS --- */
const STORAGE_KEYS = {
  STYLISTS: "dreamsai_celebrity_stylists_v6",
  CELEBRITIES: "dreamsai_celebrities_v6",
  PROJECTS: "dreamsai_celebrity_projects_v6",
  ACTIVE_CONTEXT: "dreamsai_celebrity_active_context_v6",
  SHARE_LINKS_INDEX: "dreamsai_share_links_index_v1",
  SHARE_LINKS_BY_PROJECT: "dreamsai_project_share_links_v1"
};

export const SHARE_LINK_STATUS = Object.freeze({
  ACTIVE: "active",
  LOCKED: "locked",
  EXPIRED: "expired",
  SUBMITTED: "submitted",
  CANCELLED: "cancelled"
});

function getShareLinkIndexMap() {
  return safeGetItem(STORAGE_KEYS.SHARE_LINKS_INDEX, {});
}

function setShareLinkIndexMap(map) {
  safeSetItem(STORAGE_KEYS.SHARE_LINKS_INDEX, map || {});
}

export function normalizeShareLinkRecord(record) {
  if (!record || typeof record !== 'object') return null;

  const projectId = typeof record.projectId === 'string' ? record.projectId.trim() : '';
  const token = typeof record.token === 'string' ? record.token.trim() : '';
  const selectedSerials = Array.isArray(record.selectedSerials)
    ? [...new Set(record.selectedSerials
        .filter(value => typeof value === 'string')
        .map(value => value.trim())
        .filter(Boolean))]
    : [];

  if (!projectId || !token || selectedSerials.length === 0) {
    return null;
  }

  const allowedStatuses = Object.values(SHARE_LINK_STATUS);
  const linkStatus = allowedStatuses.includes(record.linkStatus)
    ? record.linkStatus
    : SHARE_LINK_STATUS.ACTIVE;

  const nowIso = new Date().toISOString();
  const expiresAt = typeof record.expiresAt === 'string' && record.expiresAt
    ? record.expiresAt
    : null;

  const normalized = {
    id: typeof record.id === 'string' ? record.id : `share_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    projectId,
    token,
    title: typeof record.title === 'string' ? record.title.trim() : 'Shared Tray',
    selectedSerials,
    linkStatus,
    submitted: Boolean(record.submitted) || linkStatus === SHARE_LINK_STATUS.SUBMITTED || linkStatus === SHARE_LINK_STATUS.LOCKED,
    submittedAt: typeof record.submittedAt === 'string' && record.submittedAt ? record.submittedAt : null,
    expiresAt,
    createdAt: typeof record.createdAt === 'string' ? record.createdAt : nowIso,
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : nowIso,
    recipientName: typeof record.recipientName === 'string' ? record.recipientName.trim() : '',
    recipientEmail: typeof record.recipientEmail === 'string' ? record.recipientEmail.trim() : '',
    notes: typeof record.notes === 'string' ? record.notes.trim() : ''
  };

  if (expiresAt && new Date(expiresAt).getTime() <= Date.now() && linkStatus === SHARE_LINK_STATUS.ACTIVE) {
    normalized.linkStatus = SHARE_LINK_STATUS.EXPIRED;
    normalized.submitted = false;
  }

  return normalized;
}

export function buildShareLinkRecord(projectId, serials = [], options = {}) {
  const normalizedSerials = Array.isArray(serials)
    ? [...new Set(serials.filter(value => typeof value === 'string').map(value => value.trim()).filter(Boolean))]
    : [];

  if (!projectId || !normalizedSerials.length) {
    return null;
  }

  const now = new Date();
  const token = typeof options.token === 'string' && options.token.trim()
    ? options.token.trim()
    : `share_${now.getTime()}_${Math.random().toString(36).slice(2, 10)}`;

  return normalizeShareLinkRecord({
    projectId,
    token,
    title: options.title || 'Shared Tray',
    selectedSerials: normalizedSerials,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt: typeof options.expiresAt === 'string' ? options.expiresAt : new Date(now.getTime() + (options.expiresInDays || 30) * 24 * 60 * 60 * 1000).toISOString(),
    linkStatus: SHARE_LINK_STATUS.ACTIVE,
    submitted: false,
    submittedAt: null,
    recipientName: options.recipientName || '',
    recipientEmail: options.recipientEmail || '',
    notes: options.notes || ''
  });
}

export function getProjectShareLinks(projectId) {
  if (!projectId) return [];

  const projectList = safeGetItem(STORAGE_KEYS.PROJECTS, []);
  const project = projectList.find(item => item && item.id === projectId);
  const projectRecords = project && Array.isArray(project.shareLinks) ? project.shareLinks : [];
  const storageKey = `${STORAGE_KEYS.SHARE_LINKS_BY_PROJECT}:${projectId}`;
  const persisted = safeGetItem(storageKey, []);

  const source = projectRecords.length > 0 ? projectRecords : persisted;
  const normalized = (Array.isArray(source) ? source : [])
    .map(normalizeShareLinkRecord)
    .filter(Boolean);

  if (project) {
    project.shareLinks = normalized;
  }

  return normalized;
}

export function setProjectShareLinks(projectId, records = []) {
  if (!projectId) return [];

  const normalized = (Array.isArray(records) ? records : [])
    .map(normalizeShareLinkRecord)
    .filter(Boolean);

  const storageKey = `${STORAGE_KEYS.SHARE_LINKS_BY_PROJECT}:${projectId}`;
  safeSetItem(storageKey, normalized);

  const projects = safeGetItem(STORAGE_KEYS.PROJECTS, []);
  const projectIndex = projects.findIndex(item => item && item.id === projectId);
  if (projectIndex !== -1) {
    projects[projectIndex].shareLinks = normalized;
    projects[projectIndex].updatedAt = new Date().toISOString();
    safeSetItem(STORAGE_KEYS.PROJECTS, sortProjectsDescending(projects));
  }

  const indexMap = getShareLinkIndexMap();
  normalized.forEach(record => {
    indexMap[record.token] = record;
  });
  setShareLinkIndexMap(indexMap);

  return normalized;
}

export function saveShareLinkRecord(record) {
  const normalized = normalizeShareLinkRecord(record);
  if (!normalized) return null;

  const records = getProjectShareLinks(normalized.projectId);
  const existingIndex = records.findIndex(item => item.token === normalized.token);
  const nextRecords = existingIndex >= 0
    ? records.map(item => item.token === normalized.token ? normalized : item)
    : [...records, normalized];

  setProjectShareLinks(normalized.projectId, nextRecords);

  const indexMap = getShareLinkIndexMap();
  indexMap[normalized.token] = normalized;
  setShareLinkIndexMap(indexMap);

  return normalized;
}

export function getShareLinkByToken(token) {
  if (!token || typeof token !== 'string') return null;
  const cleanToken = token.trim();
  if (!cleanToken) return null;

  const indexMap = getShareLinkIndexMap();
  const candidate = indexMap[cleanToken];
  if (candidate) {
    return normalizeShareLinkRecord(candidate);
  }

  const projectList = safeGetItem(STORAGE_KEYS.PROJECTS, []);
  for (const project of projectList) {
    const matched = getProjectShareLinks(project.id).find(item => item.token === cleanToken);
    if (matched) {
      return matched;
    }
  }

  return null;
}


// Helper for safe localStorage access
function safeGetItem(key, fallback) {
  try {
    const storage = globalThis.localStorage || {
      getItem: (storageKey) => (fallbackStorage.has(storageKey) ? String(fallbackStorage.get(storageKey)) : null),
      setItem: (storageKey, value) => fallbackStorage.set(storageKey, value)
    };
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`[CelebrityStore] Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function safeSetItem(key, data) {
  try {
    const storage = globalThis.localStorage || {
      getItem: (storageKey) => (fallbackStorage.has(storageKey) ? String(fallbackStorage.get(storageKey)) : null),
      setItem: (storageKey, value) => fallbackStorage.set(storageKey, value)
    };
    storage.setItem(key, JSON.stringify(data));
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
    stylists = [];
    safeSetItem(STORAGE_KEYS.STYLISTS, stylists);
  }

  if (!celebrities || !Array.isArray(celebrities) || celebrities.length === 0) {
    celebrities = [];
    safeSetItem(STORAGE_KEYS.CELEBRITIES, celebrities);
  }

  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    const now = new Date();
    const monDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const returnDue = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Yesterday (Overdue)
    const followUp = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const sharedDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // projects = [
    //   {
    //     id: "proj_shreya_mon_001",
    //     celebrityId: "cel_shreya_001",
    //     stylistId: "sty_ananya_01",
    //     headStylist: "Natasha K",
    //     jewelleryBrand: "Ascend Fine Jewellery",
    //     code: "LB-2026-FW01",
    //     title: "Red Carpet Gala Pull (Shreya)",
    //     season: "Fall / Winter 2026",
    //     purpose: "Red Carpet Gala",
    //     status: "Active",
    //     projectStatus: "Waiting for Return",
    //     notes: "Requirement provided by Shreya. Curated by Stylist Ananya Sharma.",
    //     finalTraySharedDate: sharedDate,
    //     followUpDate: followUp,
    //     returnDueDate: returnDue,
    //     productStats: { sent: 18, returned: 14, pending: 3, missing: 1 },
    //     deliverables: { completed: 3, total: 5 },
    //     socialPosting: { status: "Pending", postingDate: "2026-08-05" },
    //     payment: { invoiceAmount: 150000, amountReceived: 100000, status: "Partial" },
    //     createdAt: monDate,
    //     updatedAt: monDate,
    //     selectedSerials: [],
    //     pdfRecords: [
    //       {
    //         id: "pdf_001",
    //         pdfTitle: "Shreya_Gala_Curation_Mon.pdf",
    //         pdfKind: "Celebrity Lookbook",
    //         generatedAt: monDate,
    //         itemCount: 0
    //       }
    //     ],
    //     activityLog: [
    //       {
    //         id: "act_001",
    //         timestamp: monDate,
    //         action: "Curation Initiated",
    //         details: "Lookbook created for Celebrity Shreya by Stylist Ananya Sharma."
    //       }
    //     ]
    //   },
    //   {
    //     id: "proj_rahul_vogue_002",
    //     celebrityId: "cel_rahul_002",
    //     stylistId: "sty_rohan_02",
    //     headStylist: "Vikram R",
    //     jewelleryBrand: "Luxe Heritage Jewels",
    //     code: "LB-2026-FW02",
    //     title: "Vogue Cover Showcase (Rahul)",
    //     season: "Fall / Winter 2026",
    //     purpose: "Editorial Shoot",
    //     status: "Lookbook Sent",
    //     projectStatus: "Active",
    //     notes: "High priority editorial lookbook shoot.",
    //     finalTraySharedDate: new Date().toISOString().split('T')[0],
    //     followUpDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    //     returnDueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    //     productStats: { sent: 12, returned: 12, pending: 0, missing: 0 },
    //     deliverables: { completed: 4, total: 4 },
    //     socialPosting: { status: "Posted", postingDate: "2026-07-30" },
    //     payment: { invoiceAmount: 220000, amountReceived: 220000, status: "Paid" },
    //     createdAt: now.toISOString(),
    //     updatedAt: now.toISOString(),
    //     selectedSerials: [],
    //     pdfRecords: [],
    //     activityLog: []
    //   }
    // ];

    projects = [];

    safeSetItem(STORAGE_KEYS.PROJECTS, sortProjectsDescending(projects));
  }
}

// Initialize on load
initializeDefaultData();

/* --- PROJECT MERGE & SORTING HELPERS --- */

export function sortProjectsDescending(projects = []) {
  if (!Array.isArray(projects)) return [];
  return [...projects].sort((a, b) => {
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return timeB - timeA;
  });
}

export function mergeProjects(localProjects = [], remoteProjects = []) {
  const localMap = new Map();
  (Array.isArray(localProjects) ? localProjects : []).forEach(p => {
    if (p && p.id) {
      localMap.set(p.id, p);
    }
  });

  const mergedMap = new Map();

  // Deduplicate remoteProjects by picking the newest one for each ID
  const remoteMap = new Map();
  (Array.isArray(remoteProjects) ? remoteProjects : []).forEach(remoteProj => {
    if (!remoteProj || !remoteProj.id) return;
    const existing = remoteMap.get(remoteProj.id);
    if (!existing) {
      remoteMap.set(remoteProj.id, remoteProj);
    } else {
      const existingTime = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
      const newTime = new Date(remoteProj.updatedAt || remoteProj.createdAt || 0).getTime();
      if (newTime > existingTime) {
        remoteMap.set(remoteProj.id, remoteProj);
      }
    }
  });

  Array.from(remoteMap.values()).forEach(remoteProj => {
    const localProj = localMap.get(remoteProj.id);
    if (!localProj) {
      mergedMap.set(remoteProj.id, { ...remoteProj });
      return;
    }

    const localTime = new Date(localProj.updatedAt || localProj.createdAt || 0).getTime();
    const remoteTime = new Date(remoteProj.updatedAt || remoteProj.createdAt || 0).getTime();

    const base = localTime >= remoteTime ? { ...remoteProj, ...localProj } : { ...localProj, ...remoteProj };

    mergedMap.set(remoteProj.id, {
      ...base,
      title: base.title || localProj.title || remoteProj.title,
      status: base.status || localProj.status || remoteProj.status,
      projectStatus: base.projectStatus || localProj.projectStatus || remoteProj.projectStatus,
      finalTraySharedDate: base.finalTraySharedDate || localProj.finalTraySharedDate || remoteProj.finalTraySharedDate || '',
      followUpDate: base.followUpDate || localProj.followUpDate || remoteProj.followUpDate || '',
      returnDueDate: base.returnDueDate || localProj.returnDueDate || remoteProj.returnDueDate || '',
      activeTab: base.activeTab || localProj.activeTab || remoteProj.activeTab || 'browse',
      selectedSerials: (Array.isArray(base.selectedSerials) && base.selectedSerials.length > 0)
        ? base.selectedSerials
        : ((Array.isArray(localProj.selectedSerials) && localProj.selectedSerials.length > 0) ? localProj.selectedSerials : (remoteProj.selectedSerials || [])),
      productStats: {
        sent: base.productStats?.sent ?? localProj.productStats?.sent ?? remoteProj.productStats?.sent ?? 0,
        returned: base.productStats?.returned ?? localProj.productStats?.returned ?? remoteProj.productStats?.returned ?? 0,
        pending: base.productStats?.pending ?? localProj.productStats?.pending ?? remoteProj.productStats?.pending ?? 0,
        missing: base.productStats?.missing ?? localProj.productStats?.missing ?? remoteProj.productStats?.missing ?? 0
      },
      deliverables: {
        completed: base.deliverables?.completed ?? localProj.deliverables?.completed ?? remoteProj.deliverables?.completed ?? 0,
        total: base.deliverables?.total ?? localProj.deliverables?.total ?? remoteProj.deliverables?.total ?? 5
      },
      socialPosting: {
        status: base.socialPosting?.status || localProj.socialPosting?.status || remoteProj.socialPosting?.status || 'Pending',
        postingDate: base.socialPosting?.postingDate || localProj.socialPosting?.postingDate || remoteProj.socialPosting?.postingDate || ''
      },
      payment: {
        invoiceAmount: base.payment?.invoiceAmount ?? localProj.payment?.invoiceAmount ?? remoteProj.payment?.invoiceAmount ?? 0,
        amountReceived: base.payment?.amountReceived ?? localProj.payment?.amountReceived ?? remoteProj.payment?.amountReceived ?? 0,
        status: base.payment?.status || localProj.payment?.status || remoteProj.payment?.status || 'Pending'
      },
      pdfRecords: (Array.isArray(base.pdfRecords) && base.pdfRecords.length > 0)
        ? base.pdfRecords
        : (localProj.pdfRecords || remoteProj.pdfRecords || []),
      updatedAt: localTime >= remoteTime
        ? (localProj.updatedAt || new Date().toISOString())
        : (remoteProj.updatedAt || localProj.updatedAt || new Date().toISOString())
    });

    localMap.delete(remoteProj.id);
  });

  localMap.forEach((localProj, id) => {
    mergedMap.set(id, { ...localProj });
  });

  const mergedList = Array.from(mergedMap.values());
  return sortProjectsDescending(mergedList);
}

/* --- FIREBASE CLOUD SYNC HELPERS --- */

export async function fetchDataFromFirebase() {
  try {
    const projectsSnap = await getDocs(collection(db, "projects"));
    const remoteProjects = [];
    projectsSnap.forEach((d) => remoteProjects.push(d.data()));

    // Firestore is authoritative: Replace local cache with Firestore projects, or merge un-synced new local creations if needed
    const localProjects = safeGetItem(STORAGE_KEYS.PROJECTS, []);
    const mergedProjects = mergeProjects(localProjects, remoteProjects);

    // Filter out any local projects that were deleted from Firestore (if remote projects collection was fetched successfully)
    const remoteIds = new Set(remoteProjects.map(p => p.id));
    const syncedProjects = mergedProjects.filter(p => remoteIds.has(p.id));

    safeSetItem(STORAGE_KEYS.PROJECTS, syncedProjects);

    const stylistsSnap = await getDocs(collection(db, "stylists"));
    const remoteStylists = [];
    stylistsSnap.forEach((d) => remoteStylists.push(d.data()));
    if (remoteStylists.length > 0) {
      safeSetItem(STORAGE_KEYS.STYLISTS, remoteStylists);
    }

    const celebsSnap = await getDocs(collection(db, "celebrities"));
    const remoteCelebs = [];
    celebsSnap.forEach((d) => remoteCelebs.push(d.data()));
    if (remoteCelebs.length > 0) {
      safeSetItem(STORAGE_KEYS.CELEBRITIES, remoteCelebs);
    }

    try {
      const activeCtxSnap = await getDoc(doc(db, "app_state", "active_context"));
      if (activeCtxSnap.exists()) {
        const remoteCtx = activeCtxSnap.data();
        if (remoteCtx && remoteCtx.celebrityId) {
          safeSetItem(STORAGE_KEYS.ACTIVE_CONTEXT, {
            celebrityId: remoteCtx.celebrityId,
            projectId: remoteCtx.projectId
          });
        }
      }
    } catch (errCtx) {
      console.warn("[FirebaseSync] Note reading active context:", errCtx);
    }

    console.log("[FirebaseSync] Successfully pulled and synced data from Firestore.");
    if (typeof window !== 'undefined' && typeof window.renderHomepageProjectsGateway === 'function') {
      window.renderHomepageProjectsGateway();
    }
    return { ok: true };
  } catch (e) {
    console.warn("[FirebaseSync] Error fetching from Firebase", e);
    return null;
  }
}

// Automatically sync from Firebase on load
fetchDataFromFirebase();


/* --- STYLIST APIs --- */

export function getStylists() {
  return safeGetItem(STORAGE_KEYS.STYLISTS, []);
}

export function getStylistById(id) {
  const stylists = getStylists();
  return stylists.find(s => s.id === id) || null;
}

export function saveStylist({ name, title = "Personal Stylist", specialty = "Couture Jewellery", phone = "", email = "" }) {
  const stylists = getStylists();
  const newStylist = {
    id: "sty_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    name: name.trim(),
    title: title.trim(),
    specialty: specialty.trim(),
    phone: phone.trim(),
    email: email.trim(),
    createdAt: new Date().toISOString()
  };
  stylists.unshift(newStylist);
  safeSetItem(STORAGE_KEYS.STYLISTS, stylists);

  // Sync to Firebase
  setDoc(doc(db, "stylists", newStylist.id), newStylist).catch(e => console.warn("Firebase sync error", e));

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

  // Sync to Firebase
  setDoc(doc(db, "celebrities", newCelebrity.id), newCelebrity).catch(e => console.warn("Firebase sync error", e));

  return newCelebrity;
}

/* --- PROJECT / LOOKBOOK APIs --- */

export function getProjects(celebrityId = null, stylistId = null) {
  let projects = safeGetItem(STORAGE_KEYS.PROJECTS, []);
  projects = sortProjectsDescending(projects);

  if (selectedDepartment) {
    projects = projects.filter(p => !p.department || p.department === selectedDepartment);
  }

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

export function createProject({ celebrityId, stylistId = null, title, season = "Fall / Winter 2026", purpose = "Red Carpet Pull", notes = "", selectedSerials = null }) {
  const projects = getProjects();
  const celebrity = getCelebrityById(celebrityId);
  const celebrityName = celebrity ? celebrity.name : "Celebrity";

  const stylists = getStylists();
  const activeStylist = stylistId ? getStylistById(stylistId) : (stylists[0] || null);

  const now = new Date();
  const projectCode = `LB-${now.getFullYear()}-${(projects.length + 1).toString().padStart(3, '0')}`;

  // Preserve initial selections if passed or currently selected in global workspace
  let initialSerials = [];
  if (Array.isArray(selectedSerials) && selectedSerials.length > 0) {
    initialSerials = [...selectedSerials];
  } else if (typeof window !== 'undefined' && Array.isArray(window.selected) && window.selected.length > 0) {
    initialSerials = [...window.selected];
  }

  const newProject = {
    id: "proj_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    celebrityId: celebrityId,
    stylistId: activeStylist ? activeStylist.id : null,
    code: projectCode,
    title: title.trim() || `${celebrityName} Curation`,
    season: season || "FW-2026",
    purpose: purpose || "Red Carpet Pull",
    department: selectedDepartment,
    status: "Active",
    notes: notes.trim(),
    activeTab: "browse",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    selectedSerials: initialSerials,
    shareLinks: [],
    pdfRecords: [],
    activityLog: [
      {
        id: "act_" + Date.now(),
        timestamp: now.toISOString(),
        action: "Curation Initiated",
        details: `Created lookbook "${title}" for Celebrity ${celebrityName}${activeStylist ? ` by Stylist ${activeStylist.name}` : ''}${initialSerials.length ? ` with ${initialSerials.length} initial selected items` : ''}.`
      }
    ]
  };

  projects.unshift(newProject);
  safeSetItem(STORAGE_KEYS.PROJECTS, sortProjectsDescending(projects));
  setActiveContext(celebrityId, newProject.id);

  // Sync to Firebase API
  setDoc(doc(db, "projects", newProject.id), newProject).catch(e => console.warn("Firebase sync error", e));

  return newProject;
}

export function updateProject(projectId, updates) {
  const projects = safeGetItem(STORAGE_KEYS.PROJECTS, []);
  const idx = projects.findIndex(p => p.id === projectId);
  if (idx === -1) return null;

  const updatedProject = {
    ...projects[idx],
    ...updates,
    shareLinks: Array.isArray(updates?.shareLinks)
      ? updates.shareLinks.map(normalizeShareLinkRecord).filter(Boolean)
      : (Array.isArray(projects[idx].shareLinks) ? projects[idx].shareLinks : []),
    updatedAt: new Date().toISOString()
  };
  projects[idx] = updatedProject;

  const sorted = sortProjectsDescending(projects);
  safeSetItem(STORAGE_KEYS.PROJECTS, sorted);

  // Sync update to Firebase API
  setDoc(doc(db, "projects", updatedProject.id), updatedProject).catch(e => console.warn("Firebase sync error", e));

  return updatedProject;
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

  // Sync to Firebase
  setDoc(doc(db, "projects", projects[idx].id), projects[idx]).catch(e => console.warn("Firebase sync error", e));

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
    itemCount: itemCount || 0
    // We explicitly OMIT dataUrl to prevent 1MB limit issues in Firestore
    // and QuotaExceeded errors in localStorage. PDFs can be dynamically
    // regenerated by the client if needed without eating up limits.
  };

  if (!projects[idx].pdfRecords) {
    projects[idx].pdfRecords = [];
  }
  projects[idx].pdfRecords.unshift(pdfRecord);
  projects[idx].updatedAt = new Date().toISOString();

  safeSetItem(STORAGE_KEYS.PROJECTS, projects);

  // Sync updated project with PDF record to Firebase
  setDoc(doc(db, "projects", projects[idx].id), projects[idx]).catch(e => console.warn("Firebase sync error", e));

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
  const ctx = { celebrityId, projectId, updatedAt: new Date().toISOString() };
  safeSetItem(STORAGE_KEYS.ACTIVE_CONTEXT, ctx);

  // Sync active context state to Firebase Firestore
  setDoc(doc(db, "app_state", "active_context"), ctx).catch(e => console.warn("Firebase sync active context error", e));

  return getActiveContext();
}

export async function deleteProject(projectId) {
  const projects = safeGetItem(STORAGE_KEYS.PROJECTS, []);
  const filtered = projects.filter(p => p.id !== projectId);
  safeSetItem(STORAGE_KEYS.PROJECTS, filtered);

  try {
    await deleteDoc(doc(db, "projects", projectId));
    console.log(`[ProjectStore] Deleted project ${projectId} from Firebase.`);
  } catch (e) {
    console.warn(`[ProjectStore] Error deleting project ${projectId} from Firebase`, e);
  }

  if (typeof window !== 'undefined' && typeof window.renderHomepageProjectsGateway === 'function') {
    window.renderHomepageProjectsGateway();
  }
}

