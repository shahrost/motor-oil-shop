// اقلام فاکتور: ناموجودها (تیک ادمین) از فاکتور و جمع کنار می‌رن
export function lineTotal(item) {
  return Number(item.price || 0) * Number(item.totalCount || 0);
}

export function splitAvailability(items = []) {
  return {
    available: items.filter((item) => !item.unavailable),
    unavailable: items.filter((item) => item.unavailable),
  };
}

export function availableTotal(items = []) {
  return splitAvailability(items).available.reduce((sum, item) => sum + lineTotal(item), 0);
}
