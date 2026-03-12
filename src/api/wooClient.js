const API = "https://farbeyond.co.za/wordpress/wp-json/farbeyond/v1";

// Normalize product from proxy list OR proxy detail OR Woo-like shape
function normalizeProduct(p) {
  if (!p) return null;

  // Proxy LIST shape: { id, name, price, image, link }
  const image =
    p.image ||
    p.image_url ||
    p?.images?.[0]?.src ||
    "";

  const permalink = p.link || p.permalink || "";

  return {
    // required
    id: p.id,
    name: p.name || "",

    // pricing
    price: p.price ?? "",
    regular_price: p.regular_price ?? p.regularPrice ?? "",
    sale_price: p.sale_price ?? p.salePrice ?? "",
    on_sale: p.on_sale === true || p.onSale === true,

    // media/link
    image, // ✅ always present when available
    image_url: image,
    permalink,
    link: permalink,

    // extras (safe defaults)
    short_description: p.short_description || "",
    categories: Array.isArray(p.categories) ? p.categories : [],
    featured: p.featured === true,
  };
}

export async function getProducts({ perPage = 8, page = 1 } = {}) {
  const params = new URLSearchParams({
    per_page: String(perPage),
    page: String(page),
  });

  const url = `${API}/products?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Products fetch failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  // ✅ Proxy returns array
  if (!Array.isArray(data)) return [];
  return data.map(normalizeProduct).filter(Boolean);
}

// ✅ Product Detail fetch (use your proxy /product/:id response)
export async function getProductById(id) {
  const res = await fetch(`${API}/product/${id}`);
  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data?.ok) {
    throw new Error(data?.message || `Product fetch failed: ${res.status}`);
  }

  return normalizeProduct(data.product);
}

export const CART_URL = "https://farbeyond.co.za/wordpress/cart/";
export const CHECKOUT_URL = "https://farbeyond.co.za/wordpress/checkout/";

// Keep Woo add-to-cart URL (optional)
export const addToCartUrl = (id, qty = 1) =>
  `https://farbeyond.co.za/wordpress/?add-to-cart=${encodeURIComponent(id)}&quantity=${encodeURIComponent(qty)}`;