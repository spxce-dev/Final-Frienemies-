export const products = [
  {
    id: '1',
    name: 'Frienemies Signature Tee',
    category: 'tshirts',
    description: 'Heavyweight cotton tee with clean front graphic and relaxed streetwear fit.',
    price: 499,
    price_from: false,
    is_best_seller: true,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80'
  },
  {
    id: '2',
    name: 'Orange Label Hoodie',
    category: 'hoodies',
    description: 'Premium fleece hoodie built for everyday layering and bold off-duty looks.',
    price: 899,
    price_from: false,
    is_best_seller: true,
    image_url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80'
  },
  {
    id: '3',
    name: 'Utility Street Jacket',
    category: 'jackets',
    description: 'Structured outer layer with minimal detailing and a sharp silhouette.',
    price: 1499,
    price_from: true,
    is_best_seller: false,
    image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80'
  },
  {
    id: '4',
    name: 'Core Cap',
    category: 'caps',
    description: 'Clean everyday cap with embroidered Frienemies mark.',
    price: 349,
    price_from: false,
    is_best_seller: true,
    image_url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=900&q=80'
  },
  {
    id: '5',
    name: 'Wide Leg Cargo Pant',
    category: 'pants',
    description: 'Relaxed cargo fit designed for movement, layering, and statement styling.',
    price: 1099,
    price_from: false,
    is_best_seller: false,
    image_url: 'https://images.unsplash.com/photo-1506629905607-c7b9ad4c2d2a?w=900&q=80'
  },
  {
    id: '6',
    name: 'Studio Zip Hoodie',
    category: 'hoodies',
    description: 'Zip-through fleece hoodie with premium trim and elevated fit.',
    price: 999,
    price_from: false,
    is_best_seller: true,
    image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80'
  },
  {
    id: '7',
    name: 'Monogram Tee',
    category: 'tshirts',
    description: 'Minimal tee with subtle chest branding and soft structured fabric.',
    price: 549,
    price_from: false,
    is_best_seller: false,
    image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=80'
  },
  {
    id: '8',
    name: 'Everyday Tote',
    category: 'accessories',
    description: 'Durable tote for daily carry with understated Frienemies branding.',
    price: 399,
    price_from: false,
    is_best_seller: false,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80'
  }
]

export function getBestSellers(limit = 6) {
  return products.filter((p) => p.is_best_seller).slice(0, limit)
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category)
}

export function getProductById(id) {
  return products.find((p) => String(p.id) === String(id))
}
