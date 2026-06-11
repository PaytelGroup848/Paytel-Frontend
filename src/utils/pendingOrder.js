const STORAGE_KEY = 'cloudedata_pending_order';

export const savePendingOrder = (orderData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...orderData,
      savedAt: Date.now(),
    }));
  } catch (e) {
    console.error('Failed to save pending order', e);
  }
};

export const getPendingOrder = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Expire after 30 minutes
    if (Date.now() - data.savedAt > 30 * 60 * 1000) {
      clearPendingOrder();
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
};

export const clearPendingOrder = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
};
