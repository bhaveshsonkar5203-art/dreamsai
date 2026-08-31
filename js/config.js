const DEFAULT_API_URL = "https://script.google.com/macros/s/AKfycbxT3mIpM_TuLkuZ2465rnQf5z30qhLtDdhcKt282CReeRVbVkqkLfu2M0lXTXXZyc9D/exec";
const DEFAULT_BUILD_TAG = "script-20260410-guard-logs-1";

const readEnvValue = (key, fallback) => {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) || fallback;
  } catch {
    return fallback;
  }
};

export const API_URL = readEnvValue('VITE_API_URL', DEFAULT_API_URL);
export const APP_BUILD_TAG = readEnvValue('VITE_APP_BUILD_TAG', DEFAULT_BUILD_TAG);
