import { getItem, setItem, removeItem } from "./safeStorage";

const STORAGE_KEY = "customerToken";

export function getCustomerToken() {
  return getItem(STORAGE_KEY);
}

export function saveCustomerToken(token) {
  setItem(STORAGE_KEY, token);
}

export function clearCustomerToken() {
  removeItem(STORAGE_KEY);
}
