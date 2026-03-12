import React from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Heart, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { motion } from 'framer-motion'
import { getProductById } from '@/data/products'

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get('id')
  const product = getProductById(productId)

  if (!product) {
    return (
      <div className="bg-[#FFF7ED] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-orange-500 mb-4">Product not found</h1>
          <Link to={createPageUrl('Home')} className="text-orange-500 underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FFF7ED] min-h-screen">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <Link
          to={createPageUrl('Products') + `?category=${product.category}`}
          className="inline-flex items-center text-orange-500 mb-6 hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Back to {product.category}</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-sm aspect-square flex items-center justify-center p-8"
          >
            <img src={product.image_url} alt={product.name} className="max-w-full max-h-full object-contain" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {product.is_best_seller && (
              <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 mb-4 w-fit">
                Best Seller
              </span>
            )}

            <h1
              className="text-3xl md:text-4xl text-orange-500 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {product.name}
            </h1>

            {product.description && <p className="text-gray-600 mb-4">{product.description}</p>}

            <p className="text-2xl text-orange-500 font-medium mb-8">
              {product.price_from && <span className="font-normal text-lg">from </span>}R{product.price?.toLocaleString()}
            </p>

            <div className="space-y-4 mt-auto">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-base tracking-wide">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Bag
              </Button>

              <Button
                variant="outline"
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-6 text-base tracking-wide"
              >
                <Heart className="w-5 h-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
