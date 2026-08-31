export function sanitizeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function isSafeHttpUrl(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const url = new URL(trimmed);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

export function normalizeRemoteImageUrl(value, { allowData = false } = {}) {
  if (!value || typeof value !== 'string') return '';

  const trimmed = value.trim();
  if (!trimmed) return '';

  try {
    const url = new URL(trimmed, 'https://example.com');

    if (!['http:', 'https:'].includes(url.protocol)) {
      return '';
    }

    if (url.protocol === 'data:' && !allowData) {
      return '';
    }

    const trackingKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    trackingKeys.forEach((key) => {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
      }
    });

    return url.toString();
  } catch {
    return '';
  }
}
