import test from 'node:test';
import assert from 'node:assert/strict';

import { deriveDepartmentsFromInventory } from '../js/utils/catalog-structure.js';

test('deriveDepartmentsFromInventory builds department list from inventory data without metadata', () => {
  const departments = deriveDepartmentsFromInventory([
    { 'Serial No': 'J-100', Department: 'Jewellery', 'Brand Name': 'Brand A' },
    { 'Serial No': 'J-101', Department: 'Jewellery', 'Brand Name': 'Brand B' },
    { 'Serial No': 'F-200', Department: 'Footwear', 'Brand Name': 'Brand C' },
    { 'Serial No': 'X-300', Department: '', 'Brand Name': 'Brand D' },
    { 'Serial No': 'X-301', 'Brand Name': 'Brand E' }
  ]);

  assert.deepEqual(departments, [
    { name: 'Jewellery', brands: ['Brand A', 'Brand B'] },
    { name: 'Footwear', brands: ['Brand C'] },
    { name: 'Other', brands: ['Brand D', 'Brand E'] }
  ]);
});
