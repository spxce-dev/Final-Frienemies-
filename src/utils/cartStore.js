const CART_KEY = "cart";
const CART_EVENT = "cart:updated";

export function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items || []));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function getCartCount() {
  const items = readCart();
  return items.reduce((sum, i) => sum + Math.max(1, Number(i.quantity || 1)), 0);
}

export function subscribeCartUpdates(callback) {
  const handler = () => callback(getCartCount());
  window.addEventListener(CART_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CART_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
