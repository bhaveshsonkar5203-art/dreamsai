export function deriveDepartmentsFromInventory(items = []) {
  if (!Array.isArray(items)) return [];

  const map = new Map();

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;

    const departmentName = String(
      item.Department || item.department || item['Department Name'] || item.category || item.Category || 'Other'
    ).trim();

    const normalizedDepartmentName = departmentName || 'Other';
    const brandName = String(
      item['Brand Name'] || item.brand || item.Brand || item['Brand'] || ''
    ).trim();

    if (!map.has(normalizedDepartmentName)) {
      map.set(normalizedDepartmentName, new Set());
    }

    if (brandName) {
      map.get(normalizedDepartmentName).add(brandName);
    }
  }

  return Array.from(map.entries()).map(([name, brandSet]) => ({
    name,
    brands: Array.from(brandSet).sort((a, b) => a.localeCompare(b))
  }));
}
