import React from 'react'
import ProductCard from '../components/products/ProductCard'
import { products as allProducts, getProductsByCategory } from '@/data/products'

export default function Products() {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get('category')
  const products = category ? getProductsByCategory(category) : allProducts

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'All Products'

  return (
    <div className="bg-[#FFF7ED] min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-center text-3xl md:text-4xl text-orange-500 mb-10 tracking-wide"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {categoryTitle}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          ) : (
            products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)
          )}
        </div>
      </div>
    </div>
  )
}
