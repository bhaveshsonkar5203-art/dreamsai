import { isSafeHttpUrl } from './security.js';

const responseCache = new Map();

export function clearJsonCache() {
  responseCache.clear();
}

export async function fetchJsonWithCache(url, options = {}) {
  const {
    ttlMs = 5 * 60 * 1000,
    forceRefresh = false,
    timeoutMs = 15000,
    method = 'GET',
    headers = {},
    body,
    cacheKey
  } = options;

  const targetUrl = typeof url === 'string' ? url : new URL(url).toString();
  if (!isSafeHttpUrl(targetUrl)) {
    throw new Error('Unsafe or invalid network URL');
  }

  const finalCacheKey = cacheKey || `${method.toUpperCase()}:${targetUrl}`;
  const now = Date.now();

  if (!forceRefresh) {
    const cached = responseCache.get(finalCacheKey);
    if (cached && now - cached.timestamp < ttlMs) {
      return cached.value;
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      signal: controller.signal,
      cache: 'no-store',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    responseCache.set(finalCacheKey, { value: json, timestamp: Date.now() });
    return json;
  } finally {
    clearTimeout(timer);
  }
}
