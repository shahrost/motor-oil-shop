import { getItem, setItem, removeItem } from "./safeStorage";

const STORAGE_KEY = "token";

export function getAdminToken() {
  return getItem(STORAGE_KEY);
}

export function saveAdminToken(token) {
  setItem(STORAGE_KEY, token);
}

export function clearAdminToken() {
  removeItem(STORAGE_KEY);
}
