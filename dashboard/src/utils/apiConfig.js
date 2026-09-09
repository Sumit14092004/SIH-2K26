/**
 * Dynamic API Base URL resolver.
 * Ensures that when accessing the dashboard over the local network (LAN / Wi-Fi),
 * API requests automatically route to the host machine's IP instead of localhost.
 */
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location?.hostname) {
    return `http://${window.location.hostname}:8000`;
  }
  return 'http://localhost:8000';
};
