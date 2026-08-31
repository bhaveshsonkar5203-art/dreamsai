import test from 'node:test';
import assert from 'node:assert/strict';

import { sanitizeHtml, normalizeRemoteImageUrl } from '../js/utils/security.js';

test('sanitizeHtml escapes dangerous markup', () => {
  assert.equal(
    sanitizeHtml('<script>alert("xss")</script>'),
    '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
  );
});

test('normalizeRemoteImageUrl rejects unsafe schemes', () => {
  assert.equal(normalizeRemoteImageUrl('javascript:alert(1)'), '');
  assert.equal(normalizeRemoteImageUrl('data:text/html;base64,abc'), '');
});

test('normalizeRemoteImageUrl preserves valid remote image urls', () => {
  const url = normalizeRemoteImageUrl('https://images.example.com/photo.jpg?utm_source=demo&quality=high');
  assert.equal(url, 'https://images.example.com/photo.jpg?quality=high');
});
