const STORAGE_KEY = "products";

export function getProducts() {
  const saved = localStorage.getItem(STORAGE_KEY);

  return saved ? JSON.parse(saved) : null;
}

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function clearProducts() {
  localStorage.removeItem(STORAGE_KEY);
}
