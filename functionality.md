# ASCEND Atelier Studio — Detailed Website Functionality

This document explains how the website is actually used in production: selecting inventory, building a final tray, generating PDFs, tracking missing and damaged returns, saving projects, and maintaining a live dashboard for PR-style jewellery curation.

This is based on the current implementation in the app and the real project state model used by the codebase.

---

## 1. What this website does

This is a luxury jewellery curation and asset workflow tool for stylists, PR teams, and project managers. It helps a user:

- Browse jewellery inventory by department and category
- Select products into a working tray
- Save selections as a project
- Build a final client tray / final kit
- Generate a PDF of the final tray or lookbook
- Track what is sent, returned, missing, or damaged
- Save project records in local storage and sync them to Firebase when available
- Review project status on a dashboard with follow-up and return dates

This is not a generic catalog site. It is a working operations dashboard for managing jewellery pulls, final trays, client handoff, and business follow-up.

---

## 2. Core user flow

### 2.1 Home / project gateway

When the app loads, it shows the project gateway or homepage. This is the entry point for the studio workflow.

From here, the user can:

- Open an existing project
- Create a new project for a celebrity or stylist
- View saved projects with status fields
- See project metrics such as sent, pending, missing, and return dates
- Switch between active project context and saved states

Each project is stored as an object with fields like:

- id
- title
- season
- purpose
- celebrityId
- stylistId
- code
- selectedSerials
- finalTraySharedDate
- followUpDate
- returnDueDate
- productStats
- deliverables
- pdfRecords
- activityLog

The actual project logic is handled by `js/modules/project-store.js`.

### 2.2 Creating a project

A project is created through `createProject(...)` in `project-store.js`.

That function:

- creates a unique `id`
- builds a code like `LB-2026-001`
- stores the selected serials if they already exist
- sets initial metadata such as `status`, `notes`, `activeTab`, and dates
- saves it into localStorage
- sets the project as the active context
- syncs to Firebase if available

Example fields written at creation time:

```js
const newProject = {
  id: "proj_...",
  celebrityId: ...,
  stylistId: ...,
  code: "LB-2026-001",
  title: "Celebrity Curation",
  season: "Fall / Winter 2026",
  purpose: "Red Carpet Pull",
  department: selectedDepartment,
  status: "Active",
  notes: "",
  activeTab: "browse",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
  selectedSerials: initialSerials,
  pdfRecords: [],
  activityLog: []
};
```

This means the app can reopen saved projects and restore the same inventory selections without redoing the work.

---

## 3. Inventory and selection model

### 3.1 Current selection state

The global UI state is stored in `js/state.js` and includes tracking for:

- selected items
- final tray serials
- currently active category
- department selection

The main selection arrays are conceptually:

- `selected` → current active selection or working tray
- `finalTraySerials` → final tray items that are going to be sent or exported

The code also keeps legacy compatibility by supporting both old and new names for the final tray state.

### 3.2 Serial-based inventory tracking

The app tracks inventory by serial number, not by item object alone.

This is important because each piece is unique. For example:

```js
finalTraySerials = ["A-1201", "C-4352", "N-8901"];
```

When a user adds an item to the final tray, the app normalizes and adds the serial to the final tray list. If the same serial is added again, it is prevented through a set check.

The workflow uses functions like:

- `addSerialsToFinalTray(...)`
- `removeSerialFromFinalTray(...)`
- `resolveItemsBySerials(...)`
- `validateFinalTrayAvailabilityAndProceed(...)`

This allows the app to map serial numbers to actual catalog item metadata such as image, code, category, and name.

---

## 4. Final tray workflow

### 4.1 Building the final tray

The final tray is the list of pieces selected to be sent to a client or stylist. This is where the app moves from “inventory browsing” into a sendable kit.

The actual generation logic begins in `generateFinalTrayFromSerials(...)` inside `js/app.js`.

This function does several things:

1. Reads from `finalTraySerials`
2. If no serials are present, tries to read values from the current project or active selection
3. Resolves each serial into full catalog item data
4. Validates availability before proceeding
5. Builds a collage for all selected items
6. Creates a PDF preview
7. Persists the result in the current project record
8. Builds return-tracking state for the final tray

The key sequence is:

```js
const exportItems = resolveItemsBySerials(serials);
const itemChunks = chunkArray(exportItems, 6);

for (const chunkItems of itemChunks) {
  let blob = await buildCollageBlob(chunkItems);
  generatedBlobs.push(blob);
}

lastExportKind = "final-tray";
await rebuildPdfPreview();
```

### 4.2 Final tray PDF generation

The app creates a client kit or final tray PDF using a collage process:

- items are grouped into chunks of six
- each chunk is rendered into a visual page
- the page is turned into a PDF blob
- the app combines the pages into a single final PDF preview

This is done through functions such as:

- `buildCollageBlob(...)`
- `trimOuterWhitespaceOnly(...)`
- `rebuildPdfPreview()`
- `generateFinalTrayFromSerials(...)`

If some images are missing, the app tracks them and prints a warning in the toast message. The missing items are collected and surfaced as placeholders.

### 4.3 Final tray data saved to project

When the final tray is generated, the active project is updated with:

- `status: "Waiting for Return"`
- `projectStatus: "Waiting for Return"`
- `finalTraySharedDate`
- `followUpDate`
- `returnDueDate`
- `selectedSerials: serials`
- `productStats: { sent, returned, pending, missing }`
- `deliverables` summary

This ensures the home dashboard reflects the current final tray status and follow-up timeline.

Example:

```js
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
  }
});
```

This is how the app ties the physical send-out to the dashboard and return workflow.

---

## 5. Return tracking system

### 5.1 The return model

Return tracking is handled with a local array called `returnProductsState`.

This array is built from the final tray or selected items and contains one entry per product with:

- serial
- name
- code
- category
- image
- quantity
- returnStatus
- condition

Typical values:

- `returnStatus`: `pending`, `received`, `missing`
- `condition`: `good`, `damaged`

The app creates this state using `buildReturnProductsStateFromFinalTray()` and persists it with `persistReturnProductsState()`.

### 5.2 Why this is important

The return workflow is essential because the application is not only “sending a tray”; it also tracks what comes back.

The summary logic is:

```js
function getReturnProductSummary() {
  const total = returnProductsState.length;
  const received = returnProductsState.filter(item => item.returnStatus === "received").length;
  const pending = returnProductsState.filter(item => item.returnStatus === "pending").length;
  const missing = returnProductsState.filter(item => item.returnStatus === "missing").length;
  const damaged = returnProductsState.filter(item => item.condition === "damaged").length;
  return { total, received, pending, missing, damaged };
}
```

These summary cards show on the return dashboard:

- Total Sent
- Received
- Pending
- Missing
- Damaged

### 5.3 Status and condition filters

The return section supports filtered views using:

- status filter: all / received / pending / missing
- condition filter: all / good / damaged

The UI updates the list and summary cards whenever the user changes filters.

### 5.4 Updating product status

The app exposes actions such as:

- `window.updateReturnProductStatus(serial, status)`
- `window.updateReturnProductCondition(serial, condition)`
- `window.markReturnProductReceived(serial)`
- `window.markReturnProductMissing(serial)`

These functions update the item’s return status and condition, then save the updated state back to local storage or project context.

Example logic:

```js
if (item.returnStatus === "received") return "Received";
if (item.returnStatus === "missing") return "Missing";
return "Pending Return";
```

This creates a simple but reliable operational record for every product returned from the client.

---

## 6. Missing and damaged tracking

The system explicitly tracks both missing and damaged outcomes.

### 6.1 Missing items

An item can be flagged as missing when a user selects “Missing” in the return section.

This is important because the app tracks not only normal returns but also missing or unaccounted pieces, which have high operational risk.

### 6.2 Damaged items

The condition field can be switched from `good` to `damaged`.

This allows the dashboard to count damaged pieces separately.

The return summary cards include a dedicated damage counter:

```js
{ label: "Damaged", value: summary.damaged, statusFilter: "all", condFilter: "damaged" }
```

This lets the team answer questions like:

- How many items are still pending?
- How many came back damaged?
- How many were marked missing?

---

## 7. Project dashboard and saved state

### 7.1 Project persistence

Projects are saved in localStorage under dedicated keys like:

- `dreamsai_celebrity_projects_v6`
- `dreamsai_celebrity_active_context_v6`

The store uses helper functions:

- `safeGetItem(...)`
- `safeSetItem(...)`

These wrappers keep the app resilient when localStorage is inaccessible or malformed.

### 7.2 Sorting and merging projects

The project store normalizes projects with:

- `sortProjectsDescending(...)`
- `mergeProjects(...)`

This is critical because local data and Firebase data may each contain partially updated records. The merge strategy keeps the newest version of each record and preserves fields like:

- selectedSerials
- finalTraySharedDate
- followUpDate
- returnDueDate
- productStats
- deliverables
- pdfRecords
- activityLog

### 7.3 Active context

The app keeps a single active project and celebrity context using `getActiveContext()` and `setActiveContext(...)`.

This lets the UI know which project is currently active and which client/stylist it belongs to, even after reload.

### 7.4 Activity log

Every important event is logged in `activityLog`, including:

- project creation
- selection update
- PDF export
- final tray generation
- return updates
- missing / damaged flagging

Example from `logProjectActivity(...)`:

```js
const newActivity = {
  id: "act_" + Date.now() + "_" + Math.random().toString(36).substr(2, 3),
  timestamp: new Date().toISOString(),
  action,
  details
};
```

This creates an operational timeline that helps teams understand what happened and when.

---

## 8. PDF and export process

### 8.1 Final tray export

The app can export the final tray as a PDF for sending to a stylist, client, or internal team.

The generation flow is:

- start from `finalTraySerials`
- resolve item data
- build visual collage pages
- export as Blob/PDF
- store `lastExportKind = "final-tray"`
- show preview and trigger download

### 8.2 Lookbook export

The same architecture is used for lookbook-style exports, but the output is more editorial and presentation-ready. The app builds product collage pages from selected items and exports them as a PDF.

Variables such as `lastExportTitle` and `lastExportItems` allow the UI to show a recent export summary.

### 8.3 Missing image handling

An important part of the PDF export is the missing-image fallback. If one of the product images fails to load, the app:

- records the missing item serial
- shows a placeholder image or default asset
- notifies the user that some items were missing visual content

This keeps the PDF export from failing completely.

---

## 9. Business logic around waiting, follow-up, and returns

The project model includes operational dates that are directly tied to business process:

- `finalTraySharedDate`
- `followUpDate` = `finalTraySharedDate + 15 days`
- `returnDueDate` = `finalTraySharedDate + 7 days`

The app computes these dates automatically when a final tray is created. That means the dashboard can show:

- when the tray was shared
- when follow-up is due
- when the return is expected

This is very important for jewellery loans, because missing or late returns can be very expensive and sensitive.

---

## 10. Example of actual end-to-end workflow

A common operational workflow in this website is:

1. User opens the inventory catalog.
2. User filters by category or department.
3. User selects jewellery items into the working tray.
4. User saves or creates a project.
5. User builds a final tray from selected items.
6. App resolves serials to actual items and generates a PDF kit.
7. System stores `finalTraySharedDate`, follow-up date, and return due date.
8. The project status changes to `Waiting for Return`.
9. The return tracking table is populated from final tray data.
10. Team updates each item to `received`, `pending`, or `missing`.
11. Damaged items are marked with condition `damaged`.
12. Dashboard updates summary counts.
13. Project remains saved in local storage and can be reopened later.

This is the real business process encoded in the app.

---

## 11. Data structure summary

### Project-level fields that matter most

- `id`
- `code`
- `title`
- `status`
- `projectStatus`
- `selectedSerials`
- `finalTraySharedDate`
- `followUpDate`
- `returnDueDate`
- `productStats`
- `deliverables`
- `pdfRecords`
- `activityLog`

### Return-level fields that matter most

- `serial`
- `name`
- `code`
- `category`
- `image`
- `quantity`
- `returnStatus`
- `condition`

### State-level fields that matter most

- `selected`
- `finalTraySerials`
- `activeCategory`
- `selectedDepartment`

---

## 12. What the app is really tracking

The website is designed to track more than a gallery of products. It is tracking a full operational lifecycle:

- curated product selection
- approved final tray
- shared client kit
- expected return date
- actual return status
- missing and damaged items
- saved project history
- exportable PDF records
- operational dashboard status

This is why the project code uses serial numbers and project state persistence instead of just temporary UI state.

---

## 13. Key implementation files

The real workflow is implemented in these files:

- `js/app.js` — main user workflow, final tray generation, return tracking, PDF generation
- `js/state.js` — selected/final-tray state
- `js/modules/project-store.js` — saved projects, active context, localStorage + Firebase sync
- `js/pdf/pdf.js` — PDF pipeline and export logic
- `index.html` — app shell and UI containers

---

## 14. Short summary

In plain language, the website helps a jewellery team:

- pick inventory,
- save and manage a project,
- build a final tray,
- export the tray as a PDF,
- monitor what has come back,
- flag missing or damaged pieces,
- and keep everything saved so the project can be reopened and worked on later.

This is why the app is built around serial tracking, project-level persistence, return summary cards, and final-tray generation rather than a simple product grid.
