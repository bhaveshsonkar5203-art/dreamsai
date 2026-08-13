import assert from 'assert';

// 1. Mock global localStorage
const storageStore = new Map();
global.localStorage = {
  getItem: (key) => storageStore.get(key) || null,
  setItem: (key, val) => storageStore.set(key, String(val)),
  removeItem: (key) => storageStore.delete(key),
  clear: () => storageStore.clear()
};

// 2. Mock global fetch returning stale server projects
let mockServerProjectsResponse = [];
global.fetch = async (url, options) => {
  return {
    ok: true,
    json: async () => ({
      ok: true,
      projects: mockServerProjectsResponse,
      stylists: [],
      celebrities: []
    })
  };
};

// 3. Dynamically import ProjectStore
const ProjectStore = await import('./js/modules/project-store.js');

async function runTests() {
  console.log("Starting Final Tray persistence & ordering test suite...\n");

  // Step 1: Create a project
  const cel = ProjectStore.getCelebrities()[0];
  const project = ProjectStore.createProject({
    celebrityId: cel.id,
    title: "Test Final Tray Gala Pull"
  });

  assert.ok(project && project.id, "Project should be created successfully");
  console.log("✔ Step 1: Created Project:", project.id, project.title);

  // Step 2: Populate Final Tray data
  const updated = ProjectStore.updateProject(project.id, {
    status: "Waiting for Return",
    projectStatus: "Waiting for Return",
    finalTraySharedDate: "2026-08-10",
    followUpDate: "2026-08-25",
    returnDueDate: "2026-08-17",
    selectedSerials: ["JW-001", "JW-002", "JW-003"],
    productStats: { sent: 3, returned: 0, pending: 3, missing: 0 },
    deliverables: { completed: 0, total: 5 },
    socialPosting: { status: "Pending", postingDate: "" },
    payment: { invoiceAmount: 150000, amountReceived: 0, status: "Pending" }
  });

  assert.strictEqual(updated.finalTraySharedDate, "2026-08-10");
  assert.strictEqual(updated.selectedSerials.length, 3);
  console.log("✔ Step 2: Final Tray details & dates successfully assigned to project.");

  // Verify project is at index 0 (most recently updated)
  let currentProjects = ProjectStore.getProjects();
  assert.strictEqual(currentProjects[0].id, project.id, "Updated project should be at index 0 (top of list)");
  console.log("✔ Step 3: Verified project is at top of project list.");

  // Step 3: Simulate stale background Google Sheets response
  // Server returns an incomplete project object without Final Tray data and with an older timestamp
  mockServerProjectsResponse = [
    {
      id: "proj_shreya_mon_001",
      title: "Older Existing Project",
      createdAt: "2026-08-01T00:00:00.000Z",
      updatedAt: "2026-08-01T00:00:00.000Z"
    },
    {
      id: project.id,
      title: "Test Final Tray Gala Pull",
      // Notice missing finalTraySharedDate, followUpDate, returnDueDate, selectedSerials, productStats!
      createdAt: project.createdAt,
      updatedAt: "2026-08-01T00:00:00.000Z" // Stale timestamp
    }
  ];

  // Execute background fetch
  await ProjectStore.fetchProjectsFromGoogleSheets();

  // Step 4: Verify data persistence & project ordering after background sync
  const postSyncProjects = ProjectStore.getProjects();
  const syncedProject = postSyncProjects.find(p => p.id === project.id);

  assert.ok(syncedProject, "Project should still exist in store after background fetch");
  assert.strictEqual(syncedProject.finalTraySharedDate, "2026-08-10", "finalTraySharedDate must persist after background fetch");
  assert.strictEqual(syncedProject.followUpDate, "2026-08-25", "followUpDate must persist after background fetch");
  assert.strictEqual(syncedProject.returnDueDate, "2026-08-17", "returnDueDate must persist after background fetch");
  assert.deepStrictEqual(syncedProject.selectedSerials, ["JW-001", "JW-002", "JW-003"], "selectedSerials must persist after background fetch");
  assert.strictEqual(syncedProject.productStats.sent, 3, "productStats.sent must persist after background fetch");
  assert.strictEqual(postSyncProjects[0].id, project.id, "Project must remain at index 0 (top of list) after background fetch");

  console.log("✔ Step 4: Verified Final Tray data, dates, items, and card position persist after stale background fetch!");

  // Step 5: Create a second project and ensure original project is unaffected
  const project2 = ProjectStore.createProject({
    celebrityId: cel.id,
    title: "Second Project"
  });

  const finalProjects = ProjectStore.getProjects();
  const project1AfterProj2 = finalProjects.find(p => p.id === project.id);
  assert.strictEqual(project1AfterProj2.finalTraySharedDate, "2026-08-10", "Original project Final Tray data must remain intact when another project is created");
  assert.strictEqual(project1AfterProj2.selectedSerials.length, 3, "Original project selectedSerials must remain intact");

  console.log("✔ Step 5: Verified creating another project does not alter or corrupt existing project's Final Tray data.");
  console.log("\n✅ ALL PERSISTENCE AND ORDERING TESTS PASSED SUCCESSFULLY!");
}

runTests().catch(err => {
  console.error("❌ Test failed with error:", err);
  process.exit(1);
});
