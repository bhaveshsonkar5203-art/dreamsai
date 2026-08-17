# ASCEND Atelier Studio — UI/UX Design System, Buttons & Interaction Specification

> **Document Version:** 4.0 (Comprehensive Specification for Stitch UI/UX)  
> **Target Audience:** Stitch UI/UX Designers, Product Managers, Frontend Engineers  
> **Application:** ASCEND Atelier Studio (Luxury Jewellery PR, High-Fashion Styling & Asset Curation Suite)  

---

## 1. Executive Summary & Core Philosophy

**ASCEND Atelier Studio** is an enterprise luxury jewellery management, curation, and PR campaign tracking platform. In high-fashion celebrity styling (Met Gala, Cannes, Red Carpet, Editorial Shoots), millions of dollars in precious jewellery move rapidly between brand ateliers, celebrity stylists, security personnel, and red carpet events.

### The Golden UX Rule: Strict Information Architecture Separation
1. **HOME (Projects Gateway):** Pure, clean, editorial **High-Level Index**.
   * **Displays ONLY 4 fields:** `Stylist`, `Title`, `Celebrity`, `Relevant Dates`.
   * **Zero clutter:** No product counts, no status badges, no financial numbers, no action buttons.
   * **Purpose:** Allows atelier directors and executives to scan active campaigns in seconds without operational noise.
2. **PROJECT DASHBOARD:** The complete **Operational Command Center**.
   * **Houses everything else:** Real-time curation stages, product return check-ins, financial invoicing, social media PR verification, agreed deliverables progress, stylist notes, and audit history.
   * **Purpose:** Gives stylists, account managers, and logistics teams all granular controls, modal triggers, and status updates needed to run the project.

---

## 2. Global Navigation & Workspace Layout

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ASCEND ATELIER STUDIO SHELL                                                                      │
├────────────────────────────────┬─────────────────────────────────────────────────────────────────┤
│ SIDEBAR NAVIGATION             │ MAIN WORKSPACE CANVAS                                           │
│ ┌────────────────────────────┐ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 💎 ASCEND · Atelier Studio │ │ │ TOP CONTEXTUAL PROJECT BAR                                  │ │
│ ├────────────────────────────┤ │ │ [← All Projects] Stylist: Natasha K | Muse: Shreya | Active│ │
│ │ [⌂] Home Projects Gateway  │ │ └─────────────────────────────────────────────────────────────┘ │
│ │ [◫] Project Dashboard      │ │                                                                 │
│ │ [◫] Inventory Catalog      │ │ [ACTIVE VIEW CONTAINER]                                         │
│ │ [⇲] Pulls (Selected) [3]   │ │ 1. HOME: Minimal Project Cards Grid                             │
│ │ [💼] Final Tray             │ │ 2. DASHBOARD: Full Operations, Metrics & Actions                │
│ │ [↺] Returns Processing     │ │ 3. CATALOG: High-Density Search & Category Filter Grid          │
│ └────────────────────────────┘ │ 4. PULLS: Staged Items for Lookbook Curation                    │
│                                │ 5. FINAL TRAY: Confirmed Event Pieces & PDF Studio Generator    │
│                                │ 6. RETURNS: Asset Check-in & Loss Prevention Suite              │
└────────────────────────────────┴─────────────────────────────────────────────────────────────────┘
```

---

## 3. Screen-by-Screen UI, Buttons & Interactive Controls

### 3.1 Home Page (Projects Gateway Overlay)

The entry portal to all atelier operations. Designed with luxury white-space, subtle gold accents, and editorial typography.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [💎] ASCEND Communications                                                   [+ New Project]     │
│ PR Campaign Dashboard — monitor active pulls, pending returns, and client deliverables.          │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [ ☰ Menu ]   [ ⚙ Filters ]                                                                       │
│                                                                                                  │
│ [COLLAPSIBLE FILTERS PANEL]                                                                      │
│ [Search Project...] [Celebrity: All ▼] [Stylist: All ▼] [Brand: All ▼] [Status: All ▼] [Clear]  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ MINIMAL PROJECTS CARDS GRID (3-Col Desktop / 2-Col Tablet / 1-Col Mobile)                        │
│                                                                                                  │
│ ┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐             │
│ │ STYLIST                              │  │ STYLIST                              │             │
│ │ Natasha K                            │  │ Vikram R                             │             │
│ │                                      │  │                                      │             │
│ │ Red Carpet Gala Pull (Shreya)        │  │ Vogue Cover Showcase (Rahul)         │             │
│ │                                      │  │                                      │             │
│ │ CELEBRITY                            │  │ CELEBRITY                            │             │
│ │ Shreya Ghosal                        │  │ Rahul                                │             │
│ │ ──────────────────────────────────── │  │ ──────────────────────────────────── │             │
│ │ Final List               12 Aug 2026 │  │ Final List               17 Aug 2026 │             │
│ │ Follow-up                27 Aug 2026 │  │ Follow-up                21 Aug 2026 │             │
│ │ Return Due               19 Aug 2026 │  │ Return Due               24 Aug 2026 │             │
│ │                                    → │  │                                    → │             │
│ └──────────────────────────────────────┘  └──────────────────────────────────────┘             │
│                                                                                                  │
│ Showing 1–6 of 12 projects                                      [Previous] [1] [2] [Next]        │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Buttons & Controls on Home Page:
| Button / UI Control | Selector / ID | Action & Click Behavior | Why It Is Crucial |
| :--- | :--- | :--- | :--- |
| **`+ New Project`** | `.btn-create-project-top` | Opens `#newProjectModalOverlay` dialog. | Fast-tracks creating a new styling campaign without navigating away. |
| **`☰ Menu Toggle`** | `#hpMenuToggleBtn` | Expands/collapses executive statistics overview (Total campaigns, Active loans, Overdue value). | Gives directors high-level business intelligence on demand without cluttering the screen. |
| **`⚙ Filters Toggle`** | `#hpFilterToggleBtn` | Expands/collapses multi-criteria search & filtering bar. | Enables rapid multi-parameter filtering across hundreds of active campaigns. |
| **`Clear Filters`** | `.btn-clear-filters` | Resets all dropdowns (Celebrity, Stylist, Brand, Status, Payment, Returns) to default. | Instantly restores the full master project list. |
| **`Home Project Card`** | `.hp-project-card` | Executes `window.handleProjectChange(p.id)`. Activates project context & switches to `#dashboardTab`. | Provides single-click transition from discovery index directly into operational command. |
| **`Pagination Next/Prev`**| `.hp-pagination-btn` | Executes `setHomepagePage(pageNumber)`. | Prevents DOM bloating and keeps page rendering at 60 FPS on large project datasets. |

#### Strict Visual Rules for Home Project Cards:
* **Displays ONLY:**
  1. `STYLIST` (uppercase metadata label + stylist name)
  2. `TITLE` (large serif header: *Cormorant Garamond*, 1.75rem)
  3. `CELEBRITY` (uppercase metadata label + muse name)
  4. `DATES` (Final List, 15-day Follow-up, Return Due)
* **STRICTLY EXCLUDED FROM HOME CARDS:**
  - ❌ No Product Status badges (Returned/Pending/Missing)
  - ❌ No Social media posting tags or dates
  - ❌ No Payment amounts, invoices, or balances
  - ❌ No Quick Action buttons (Edit/Return/Social)
  - ❌ No Operational stage badges

---

### 3.2 Project Dashboard View (`#dashboardTab`)

The comprehensive operational command center rendered inside `#projectDashboardContent`.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [← All Projects]              [Edit Project] [Manage Returns] [Deliverables] [Social] [Catalog]  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ PROJECT HERO BANNER                                                                              │
│ Stylist: Natasha K • Celebrity: Shreya Ghosal • Code: LB-2026-FW01                               │
│ Red Carpet Gala Pull (Shreya)                                                                    │
│ Ascend Fine Jewellery | Fall / Winter 2026 | Red Carpet Gala                                     │
│                                           Status: [🟢 Active]    Curation Stage: [1. Curating ▼] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4-CARD KEY METRICS ROW                                                                           │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐             │
│ │ [💎] 18 Pieces    │ │ [↺] 14/18 (78%)  │ │ [₹] ₹1,00,000    │ │ [📢] Verified    │             │
│ │ Curated in Pull  │ │ Items Returned   │ │ Received / ₹1.5L │ │ Social PR Status │             │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘             │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 6-PANEL OPERATIONAL GRID (2-Column Desktop / 1-Column Mobile)                                    │
│                                                                                                  │
│ ┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐             │
│ │ 📅 IMPORTANT DATES          [Edit]   │  │ ↺ PRODUCT & RETURNS      [Update]    │             │
│ │ • Final List: 12 Aug 2026            │  │ Return Progress: 78% [████████░░]    │             │
│ │ • Follow-up: 27 Aug 2026 [Due Today] │  │ Sent: 18 | Ret: 14 | Pend: 3 | Miss: 1│            │
│ │ • Return Due: 19 Aug 2026 [Past Due] │  │ [Quick Update]  [Full Returns Studio]│             │
│ │ • Social Date: 20 Aug 2026           │  │                                      │             │
│ ├──────────────────────────────────────┤  ├──────────────────────────────────────┤             │
│ │ 📢 SOCIAL MEDIA & PR       [Toggle]  │  │ 💳 PAYMENT & INVOICING    [Edit]     │             │
│ │ Status: [🟢 Verified]                │  │ Status: [🟡 Partial]   Invoice: ₹1.5L │             │
│ │ Published: 20 Aug 2026               │  │ Received: ₹1,00,000  Balance: ₹50,000│             │
│ │ Tags: @shreya · @ascendjewels        │  │ [Update Invoice Details]             │             │
│ ├──────────────────────────────────────┤  ├──────────────────────────────────────┤             │
│ │ 📋 DELIVERABLES             [Update] │  │ 🕒 NOTES & ACTIVITY       [Edit]     │             │
│ │ Progress: 3/4 Completed [███████░░░] │  │ Curator Notes: "Lookbook approved."  │             │
│ │ [✔] Lookbook Selection PDF           │  │ • 12 Aug 10:30: Project Created      │             │
│ │ [✔] Celebrity Pull Dispatch          │  │ • 14 Aug 14:15: Stage -> Approved    │             │
│ │ [✔] Red Carpet Appearance            │  │ • 16 Aug 18:00: Received ₹1,00,000   │             │
│ └──────────────────────────────────────┘  └──────────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Buttons & Controls on Project Dashboard:
| Button / UI Control | Selector / Function | Action & Click Behavior | Why It Is Crucial |
| :--- | :--- | :--- | :--- |
| **`← All Projects`** | `.btn-dash-back` | Returns to Home Gateway (`showHomepageGateway()`). | Seamless navigation back to the global campaign catalog. |
| **`Edit Project`** | `openQuickEditProjectModal(id)` | Opens edit modal for dates, names, brand, financials. | Centralizes full metadata adjustments in one place. |
| **`Manage Returns`** | `openQuickUpdateReturnModal(id)`| Opens return numbers modal (Sent, Returned, Pending, Missing). | Quick inventory reconciliation without leaving the dashboard. |
| **`Update Deliverables`**| `openQuickUpdateDeliverablesModal(id)`| Opens deliverables checklist editor. | Ensures contract compliance (photoshoots, credits, tags). |
| **`Toggle Social`** | `quickToggleSocialPosted(id)` | Cycles social stage (`Pending` → `Posted` → `Verified`). | Real-time PR attribution tracking with single click. |
| **`Browse Catalog`** | `switchTab('browse')` | Takes user to the product gallery to add more pieces. | Direct workflow bridge between project and inventory. |
| **`Stage Dropdown`** | `.dash-stage-select` | Executes `updateCurrentProjectStatus(id, stage)`. | Manages the 5-stage curation lifecycle with instant persistence. |
| **`Full Returns Studio`**| `switchTab('returnProducts')`| Opens the item-by-item serialized check-in workspace. | Complete itemized custody tracking and condition checks. |
| **`Update Invoice`** | `openQuickEditProjectModal(id)`| Pre-focuses the financial inputs in the edit modal. | Eliminates billing disputes and tracks outstanding atelier revenue. |

---

### 3.3 Inventory Catalog View (`#browseTab`)

High-density visual jewelry catalog with instant filtering and pull staging.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [ All Items ]  [ Rings ]  [ Earrings ]  [ Necklaces ]  [ Bracelets ]  [ High Jewellery ]         │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [ 🔍 Search Serial or Keyword... ]    [ Filter by Type ▼ ]    [ 📊 Inventory Breakdown ]         │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ PRODUCT CARDS GRID                                                                               │
│ ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐                     │
│ │ [ High-Res Image ]   │  │ [ High-Res Image ]   │  │ [ High-Res Image ]   │                     │
│ │                      │  │                      │  │                      │                     │
│ │ RING-001             │  │ EAR-042              │  │ NECK-108             │                     │
│ │ Solitaire Halo Ring  │  │ Emerald Drop Earring │  │ Choker Diamond Set   │                     │
│ │ 18k Yellow Gold      │  │ Platinum / Emerald   │  │ 18k White Gold       │                     │
│ │ ₹4,50,000            │  │ ₹8,20,000            │  │ ₹24,00,000           │                     │
│ │ [+ Add to Pull]      │  │ [✓ In Pull]          │  │ [+ Add to Pull]      │                     │
│ └──────────────────────┘  └──────────────────────┘  └──────────────────────┘                     │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ FLOATING SELECTION DOCK: [ 3 Pieces in Pull ]    [ Clear ]    [ View Staged Pulls → ]            │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Buttons & Controls in Inventory Catalog:
| Button / UI Control | Selector / Function | Action & Click Behavior | Why It Is Crucial |
| :--- | :--- | :--- | :--- |
| **`Category Pills`** | `.category-btn` | Filters grid by category (Rings, Necklaces, etc.). | Fast segment browsing during high-pressure styling sessions. |
| **`Search Input`** | `#searchSerial` | Real-time substring filter on serial, metal, stone, name. | Locates specific serialized assets instantly. |
| **`Type Filter Dropdown`**| `#typeFilter` | Granular filter by sub-type (Cocktail, Chandelier, Choker). | Precise thematic selection for specific red carpet looks. |
| **`Breakdown Drawer`**| `#breakdownToggleBtn` | Slides open inventory counts by availability status. | Real-time stock audit (Available vs Out on Loan). |
| **`+ Add to Pull`** | `.btn-add-pull` | Toggles item inclusion in `project.selectedSerials`. | Stages pieces for lookbook assembly without committing them. |
| **`Floating Pulls Dock`**| `.floating-pulls-bar` | Shows live piece counter and link to `#selectedTab`. | Constant visibility of staged pull size and quick checkout. |

---

### 3.4 Pulls & Final Tray Workspaces (`#selectedTab`, `#finalTrayTab`)

The curation assembly and client presentation pipeline.

#### Pulls View (`#selectedTab`):
* **`Clear All Pulls`** (`clearSelected()`): Empties staged items if stylist wants to start fresh.
* **`Generate Lookbook PDF`** (`openPdfPreview()`): Renders vector-sharp PDF presentation for celebrity review.
* **`Promote to Final Tray`** (`promoteToFinalTray()`): Confirms client selection and dispatches pieces for physical fitting.
* **`Remove Piece [×]`** (`removeFromSelected(serial)`): Removes single item from staged selection.

#### Final Tray View (`#finalTrayTab`):
* **`Export Lookbook PDF`** (`generateFinalTrayPdf()`): Compiles client-ready lookbook document.
* **`Share via WhatsApp`** (`shareFinalTrayWhatsapp()`): Generates encoded WhatsApp dispatch text with item details.
* **`Generate Digital Showcase`** (`openMiniWebsiteModal()`): Builds interactive web lookbook for mobile viewing by celebrities.
* **`Mark Dispatched`** (`setFinalTraySharedDate()`): Records dispatch date and calculates 15-day follow-up date.

---

### 3.5 Returns Processing Workspace (`#returnProductsTab`)

High-security asset check-in and reconciliation workspace.

#### Buttons & Controls in Returns Processing:
* **`Check-in to Safe`** (`markItemReturned(serial)`): Changes item status to "Returned", increments return count, recalculates return %.
* **`Report Missing / Damaged`** (`markItemMissing(serial)`): Flags asset for insurance claim or goldsmith repair.
* **`Condition Selector`**: Logs condition ("Mint", "Polishing Required", "Stone Dislodged").
* **`Export Return Receipt PDF`**: Generates signed handover receipt for security and brand records.

---

## 4. Modal Dialogs & Full Form Controls

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ MODAL ARCHITECTURE                                                                               │
│                                                                                                  │
│ 1. #newProjectModalOverlay           2. #quickEditProjectModal                                   │
│ ┌──────────────────────────────┐     ┌────────────────────────────────────────────────────────┐  │
│ │ Create New Styling Project   │     │ Quick Edit Project Details                             │  │
│ │ • Title: [                 ] │     │ • Title: [                     ] Brand: [            ] │  │
│ │ • Celebrity: [             ] │     │ • Head Stylist: [              ] Season: [           ] │  │
│ │ • Stylist: [Select / +Add  ] │     │ • Final List Date: [YYYY-MM-DD ] Follow-up: [YYYY-MM-DD]│  │
│ │ [Cancel]       [Create & Go] │     │ • Return Due Date: [YYYY-MM-DD ] Status: [Active     ▼]│  │
│ └──────────────────────────────┘     │ • Invoice (₹): [      ] Received (₹): [              ] │  │
│                                      │ [Cancel]                                 [Save Changes]│  │
│                                      └────────────────────────────────────────────────────────┘  │
│ 3. #quickReturnModal                 4. #quickDeliverablesModal                                  │
│ ┌──────────────────────────────┐     ┌────────────────────────────────────────────────────────┐  │
│ │ Update Product Return Counts │     │ Update Project Deliverables Checklist                  │  │
│ │ • Total Dispatched: [ 18 ]   │     │ • Total Deliverables: [ 4 ] Completed: [ 3 ]           │  │
│ │ • Safely Returned:  [ 14 ]   │     │ [✔] Lookbook PDF    [✔] Red Carpet Appearance          │  │
│ │ • Pending Return:   [  3 ]   │     │ [✔] Brand Tagging   [ ] High-Res Editorial Photos      │  │
│ │ • Missing / Damaged:[  1 ]   │     │ [Cancel]                                 [Save Changes]│  │
│ │ [Cancel]      [Save Returns] │     └────────────────────────────────────────────────────────┘  │
│ └──────────────────────────────┘                                                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Design System Tokens & Styling Specifications

### 5.1 Color Tokens
```css
:root {
  --color-brand-primary: #0f172a;    /* Onyx Black for high-contrast typography */
  --color-brand-secondary: #334155;  /* Slate Gray for secondary descriptors */
  --accent: #d4af37;                 /* Atelier Champagne Gold */
  --accent-hover: #f1c40f;           /* Bright Gold hover state */
  --bg: #fcfcfd;                     /* Clean off-white workspace canvas */
  --surface: #ffffff;                /* Pure white card backgrounds */
  --line: #e2e8f0;                   /* Refined hairline borders */
  
  /* Semantic Status Colors */
  --status-returned-bg: #f0fdf4;
  --status-returned-text: #166534;
  --status-pending-bg: #fefce8;
  --status-pending-text: #854d0e;
  --status-missing-bg: #fef2f2;
  --status-missing-text: #991b1b;
}
```

### 5.2 Typography Tokens
```css
:root {
  --font-serif: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  --font-size-xs: 0.72rem;   /* 11.5px — Uppercase Field Labels */
  --font-size-sm: 0.84rem;   /* 13.5px — Table metadata, dates */
  --font-size-base: 0.94rem; /* 15px — Standard inputs & body */
  --font-size-lg: 1.15rem;   /* 18px — Card section headings */
  --font-size-xl: 1.75rem;   /* 28px — Home Project Card Title */
  --font-size-2xl: 2.2rem;   /* 35px — Dashboard Hero Title */
}
```

---

## 6. Why Every Single Functionality Is Mission-Critical

| Functionality Area | Why It Is Mission-Critical for Luxury Jewellery & PR |
| :--- | :--- |
| **Strict IA Separation (Home vs Dashboard)** | High-fashion directors review dozens of concurrent celebrity pulls. Overloading the home page with return tables and invoice receipts causes cognitive fatigue. The clean 4-field home card allows instant scanning, while the dashboard isolates execution details. |
| **15-Day Follow-Up & Return Due Alerts** | High-value jewelry cannot stay out indefinitely. 15-day follow-ups prevent client retention leakage, reduce insurance liabilities, and trigger automated reminders before red carpet return deadlines lapse. |
| **5-Stage Curation Lifecycle** | Coordinates atelier goldsmiths, PR agents, and celebrity stylists. Ensures pieces are not physically dispatched until celebrity approval is logged. |
| **4-Way Return Breakdown (Sent/Ret/Pend/Miss)** | Essential for daily safe balancing, vault audits, and immediate police/insurance escalation in case of stolen or damaged goods. |
| **Payment & Financial Balance Tracking** | Tracks security deposits, brand loan fees, and stylist commissions. Real-time balance calculations ensure accounts are settled before projects are closed. |
| **Social PR & Media Attribution** | Luxury jewellery brands lend millions to celebrities primarily for media impressions. Verifying tags, handles, and dates ensures contractual PR ROI is achieved. |
| **Vector PDF & Mini-Website Generation** | Red carpet styling happens under severe time pressure. Instant PDF export and mobile web lookbooks enable stylists to present pieces to VIPs in hotel suites within minutes. |
| **LocalStorage + Reactive State Bus** | Enables completely offline atelier catalog usage during vault showings, high-speed instant tab transitions, and seamless data recovery across browser sessions. |
