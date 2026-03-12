function pickBrandFromTagsOrCategories(p) {
  // Prefer tags, then categories, else empty
  const tag = p.tags?.[0]?.name;
  const cat = p.categories?.[0]?.name;
  return (tag || cat || "").toUpperCase();
}

export function adaptWooProductToCard(p) {
  const salePrice = p.sale_price ? Number(p.sale_price) : null;
  const regularPrice = p.regular_price ? Number(p.regular_price) : null;
  const price = p.price ? Number(p.price) : null;

  return {
    id: p.id,
    name: p.name,
    brand: pickBrandFromTagsOrCategories(p),

    // Your card expects these:
    image_url: p.images?.[0]?.src || "",

    // Price display (your UI uses "$")
    price: price ?? salePrice ?? regularPrice ?? 0,
    original_price: salePrice && regularPrice ? regularPrice : null,

    // "NEW" badge: Woo doesn't have is_new; use featured OR created recently.
    // For now: show NEW if product is featured.
    is_new: !!p.featured,

    // Keep useful extras for later:
    permalink: p.permalink,
    slug: p.slug,
  };
}