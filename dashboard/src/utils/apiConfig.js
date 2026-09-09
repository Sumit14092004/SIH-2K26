/**
 * Dynamic API Base URL resolver.
 * In the browser, return '' (empty string) so that all /api/* and /ws/* requests
 * are relative to the current host and route transparently through Vite's proxy.
 * This prevents Mixed Content errors on HTTPS tunnels and avoids hard-coding port 8000.
 */
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  return 'http://localhost:8000';
};
