const STORAGE_KEY = "customerToken";

export function getCustomerToken() {
  return localStorage.getItem(STORAGE_KEY);
}

export function saveCustomerToken(token) {
  localStorage.setItem(STORAGE_KEY, token);
}

export function clearCustomerToken() {
  localStorage.removeItem(STORAGE_KEY);
}
