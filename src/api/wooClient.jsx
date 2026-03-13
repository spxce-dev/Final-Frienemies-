const API = "https://farbeyond.co.za/wordpress/wp-json/farbeyond/v1";

// Normalize product from proxy list OR proxy detail OR Woo-like shape
function normalizeProduct(p) {
  if (!p) return null;

  const image =
    p.image ||
    p.image_url ||
    p?.images?.[0]?.src ||
    "";

  const permalink = p.link || p.permalink || "";

  const attributes = Array.isArray(p.attributes)
    ? p.attributes.map((attr) => ({
        id: attr?.id,
        name: attr?.name || "",
        slug: attr?.slug || "",
        variation: Boolean(attr?.variation),
        visible: attr?.visible !== false,
        options: Array.isArray(attr?.options)
          ? attr.options
          : Array.isArray(attr?.terms)
          ? attr.terms
          : [],
      }))
    : [];

  return {
    // required
    id: p.id,
    name: p.name || "",

    // product type / variations
    type: p.type || "simple",
    attributes,
    variations: Array.isArray(p.variations) ? p.variations : [],
    variations_data: Array.isArray(p.variations_data) ? p.variations_data : [],

    // pricing
    price: p.price ?? "",
    regular_price: p.regular_price ?? p.regularPrice ?? "",
    sale_price: p.sale_price ?? p.salePrice ?? "",
    on_sale: p.on_sale === true || p.onSale === true,

    // media/link
    image,
    image_url: image,
    permalink,
    link: permalink,

    // extras
    short_description: p.short_description || "",
    description: p.description || "",
    categories: Array.isArray(p.categories) ? p.categories : [],
    featured: p.featured === true,
    stock_status: p.stock_status || "",
    sku: p.sku || "",
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

  if (!Array.isArray(data)) return [];
  return data.map(normalizeProduct).filter(Boolean);
}

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

export const addToCartUrl = (id, qty = 1) =>
  `https://farbeyond.co.za/wordpress/?add-to-cart=${encodeURIComponent(id)}&quantity=${encodeURIComponent(qty)}`;
