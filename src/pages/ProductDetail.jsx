import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, ChevronLeft, Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import FeaturedProducts from "@/components/home/FeaturedProducts";

import { getProducts, CHECKOUT_URL } from "@/api/wooClient";

const API = "https://farbeyond.co.za/wordpress/wp-json/farbeyond/v1";

function getIdFromUrl(location) {
  const fromSearch = new URLSearchParams(location.search).get("id");
  if (fromSearch) return fromSearch;

  const hash = location.hash || "";
  const qIndex = hash.indexOf("?");
  if (qIndex !== -1) {
    const hashQuery = hash.slice(qIndex + 1);
    const fromHash = new URLSearchParams(hashQuery).get("id");
    if (fromHash) return fromHash;
  }

  return null;
}

async function getProductById(id) {
  const res = await fetch(`${API}/product/${id}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.ok) throw new Error(data?.message || "Product not found");
  return data.product;
}

function addToLocalCart(product, quantity) {
  const key = "cart";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  const pid = Number(product.id);
  const selectedSize = product.selected_size || "";

  const found = existing.find(
    (i) =>
      Number(i.product_id) === pid &&
      String(i.size || "") === String(selectedSize || "")
  );

  if (found) {
    found.quantity = Math.max(1, Number(found.quantity || 1) + Number(quantity || 1));
  } else {
    existing.push({
      product_id: pid,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity: Math.max(1, Number(quantity || 1)),
      size: selectedSize,
    });
  }

  localStorage.setItem(key, JSON.stringify(existing));
  window.dispatchEvent(new Event("cart:updated"));
}

export default function ProductDetail() {
  const location = useLocation();
  const productId = getIdFromUrl(location);

  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const { data: relatedRaw = [] } = useQuery({
    queryKey: ["related-products"],
    queryFn: async () => {
      const list = await getProducts({ perPage: 12, page: 1 });
      return list || [];
    },
    enabled: true,
  });

  const filteredRelated = useMemo(() => {
    const pid = String(productId || "");
    return (relatedRaw || [])
      .filter((p) => String(p.id) !== pid)
      .slice(0, 4)
      .map((p) => ({
        ...p,
        image_url: p.image || p.image_url || "",
        permalink: p.link || p.permalink || "",
        original_price: p.regular_price || null,
      }));
  }, [relatedRaw, productId]);

  const rawAttributes = Array.isArray(product?.attributes) ? product.attributes : [];

  const sizeAttribute = rawAttributes.find(
    (attr) => String(attr?.name || "").toLowerCase() === "size"
  );

  const sizeOptions = Array.isArray(sizeAttribute?.options)
    ? sizeAttribute.options
    : [];

  const isVariable = product?.type === "variable" || sizeOptions.length > 0;

  if (!productId) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Product not found (missing id)</p>
          <Link to={createPageUrl("Shop")} className="text-sm underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-2">Product not found</p>
          <p className="text-xs text-neutral-400 mb-4">
            id: {String(productId)} {error?.message ? `• ${error.message}` : ""}
          </p>
          <Link to={createPageUrl("Shop")} className="text-sm underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const image = product.image || "";
  const name = product.name || "Product";

  const price = product.price ?? "";
  const regularPrice = product.regular_price ?? "";
  const salePrice = product.sale_price ?? "";
  const onSale = product.on_sale === true;

  const displayPrice = onSale && salePrice !== "" ? salePrice : price;

  const showStrike =
    regularPrice !== "" && displayPrice !== "" && Number(regularPrice) > Number(displayPrice);

  const discountPct = showStrike
    ? Math.round((1 - Number(displayPrice) / Number(regularPrice)) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isVariable && !selectedSize) {
      alert("Please select a size");
      return;
    }

    addToLocalCart(
      {
        ...product,
        selected_size: selectedSize,
      },
      quantity
    );

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1200);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="px-6 md:px-12 py-4">
        <Link
          to={createPageUrl("Shop")}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square bg-neutral-50 rounded-lg overflow-hidden"
          >
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                No image
              </div>
            )}

            {onSale ? (
              <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs tracking-wider">
                SALE
              </span>
            ) : null}

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-600"
                }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4">{name}</h1>

            <div className="flex items-center gap-3 mb-6">
              {showStrike ? (
                <span className="text-lg text-neutral-400 line-through">R{regularPrice}</span>
              ) : null}

              <span className="text-2xl font-semibold text-neutral-900">R{displayPrice}</span>

              {showStrike ? (
                <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-medium">
                  {discountPct}% OFF
                </span>
              ) : null}
            </div>

            {product.short_description ? (
              <p className="text-neutral-600 leading-relaxed mb-8">{product.short_description}</p>
            ) : null}

            {isVariable && sizeOptions.length > 0 ? (
              <div className="mb-8">
                <span className="text-sm font-medium mb-3 block">Size</span>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => {
                    const active = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[64px] px-4 py-3 border text-sm transition-colors ${
                          active
                            ? "bg-black text-white border-black"
                            : "bg-white text-neutral-900 border-neutral-300 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mb-8">
              <span className="text-sm font-medium mb-3 block">Quantity</span>
              <div className="flex items-center border border-neutral-200 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-wider transition-all ${
                addedToCart ? "bg-green-600 text-white" : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  ADDED
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  ADD TO CART
                </>
              )}
            </button>

            <a
              href={CHECKOUT_URL}
              className="mt-3 text-center text-sm underline text-neutral-600 hover:text-neutral-900"
            >
              Go to checkout
            </a>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <div className="space-y-3 text-sm text-neutral-600">
                <p>✓ Free shipping on orders over R1000</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Authenticity guaranteed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {filteredRelated.length > 0 ? (
        <div className="mt-20">
          <FeaturedProducts
            products={filteredRelated}
            title="YOU MAY ALSO LIKE"
            subtitle="Similar styles from our collection"
          />
        </div>
      ) : null}
    </div>
  );
}
