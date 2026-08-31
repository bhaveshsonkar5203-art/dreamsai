import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SHARE_LINK_STATUS,
  buildShareLinkRecord,
  normalizeShareLinkRecord,
  getProjectShareLinks,
  setProjectShareLinks,
  getShareLinkByToken
} from '../js/modules/project-store.js';

test('buildShareLinkRecord creates a normalized, active share record', () => {
  const record = buildShareLinkRecord('proj_123', ['A-1201', 'A-1201', 'C-4352'], {
    title: 'Client Tray',
    expiresAt: '2099-12-31T00:00:00.000Z'
  });

  assert.equal(record.projectId, 'proj_123');
  assert.deepEqual(record.selectedSerials, ['A-1201', 'C-4352']);
  assert.equal(record.linkStatus, SHARE_LINK_STATUS.ACTIVE);
  assert.equal(record.submitted, false);
  assert.equal(record.title, 'Client Tray');
  assert.equal(record.expiresAt, '2099-12-31T00:00:00.000Z');
  assert.ok(record.token.length > 0);
});

test('normalizeShareLinkRecord rejects invalid records', () => {
  const invalid = {
    projectId: 'proj_123',
    token: '',
    selectedSerials: [],
    linkStatus: 'unknown'
  };

  assert.equal(normalizeShareLinkRecord(invalid), null);
});

test('project share storage stores and retrieves by token', () => {
  const projectId = 'proj_store_456';
  const record = buildShareLinkRecord(projectId, ['N-8901'], { title: 'Final tray' });

  setProjectShareLinks(projectId, [record]);

  assert.equal(getProjectShareLinks(projectId).length, 1);
  assert.deepEqual(getShareLinkByToken(record.token), record);
  assert.equal(getShareLinkByToken('missing-token'), null);
});
