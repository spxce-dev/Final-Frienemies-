import React from 'react'
import ProductCard from '../products/ProductCard'
import { getBestSellers } from '@/data/products'

export default function BestSellers() {
  const products = getBestSellers(6)

  return (
    <div className="bg-white py-12 px-4">
      <h2
        className="text-center text-2xl md:text-3xl text-orange-500 mb-10 tracking-wide"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Best Sellers
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  )
}
