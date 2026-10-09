const STORAGE_KEY = "token";

export function getAdminToken() {
  return localStorage.getItem(STORAGE_KEY);
}

export function saveAdminToken(token) {
  localStorage.setItem(STORAGE_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(STORAGE_KEY);
}
