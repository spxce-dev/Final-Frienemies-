import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { readCart, writeCart } from "@/utils/cartStore";

export default function ProductCard({ product, index = 0 }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const image =
    product?.image ||
    product?.image_url ||
    product?.images?.[0]?.src ||
    "";

  const name = product?.name || "Product";
  const brand = product?.brand || "";
  const price = product?.price ?? "";
  const regularPrice = product?.regular_price ?? product?.original_price ?? "";
  const salePrice = product?.sale_price ?? "";
  const onSale = product?.on_sale === true || (salePrice && String(salePrice) !== "");

  const displayPrice =
    onSale && salePrice && String(salePrice) !== "" ? salePrice : price;

  const showStrike =
    regularPrice !== "" &&
    displayPrice !== "" &&
    Number(regularPrice) > Number(displayPrice);

  const hasSizeAttribute =
    Array.isArray(product?.attributes) &&
    product.attributes.some((attr) => String(attr?.name || "").toLowerCase() === "size");

  const isVariable =
    product?.type === "variable" ||
    hasSizeAttribute ||
    Array.isArray(product?.variations) ||
    Array.isArray(product?.variations_data);

  const productLink = {
    pathname: createPageUrl("ProductDetail"),
    search: `?id=${encodeURIComponent(product.id)}`,
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isVariable) return;

    const cart = readCart();
    const pid = Number(product.id);
    const existing = cart.find(
      (i) => Number(i.product_id) === pid && !i.variation_id
    );

    if (existing) {
      existing.quantity = Math.max(1, Number(existing.quantity || 1) + 1);
    } else {
      cart.push({
        product_id: pid,
        name,
        price: displayPrice || price || "",
        image,
        quantity: 1,
      });
    }

    writeCart(cart);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={productLink}>
        <div className="relative aspect-square bg-neutral-50 rounded-lg overflow-hidden mb-4">
          <div className="absolute top-3 left-3 z-10">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-neutral-400">
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="serif"
                  fill="currentColor"
                >
                  ✦
                </text>
              </svg>
            </div>
          </div>

          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-600"
              }`}
            />
          </motion.button>

          {product?.is_new ? (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="px-2 py-1 bg-black text-white text-[10px] tracking-wider font-medium">
                NEW
              </span>
            </div>
          ) : null}

          {image ? (
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
              No image
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            {isVariable ? (
              <div className="w-full py-3 bg-black/90 backdrop-blur-sm text-white text-xs tracking-wider flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                CHOOSE SIZE
              </div>
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-full py-3 bg-black/90 backdrop-blur-sm text-white text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-black transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                QUICK ADD
              </button>
            )}
          </motion.div>
        </div>
      </Link>

      <div className="text-center">
        {brand ? (
          <p className="text-xs text-neutral-500 tracking-wider mb-1 uppercase">
            {brand}
          </p>
        ) : null}

        <h3 className="text-sm font-medium text-neutral-800 mb-2 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-center gap-2">
          {showStrike ? (
            <span className="text-sm text-neutral-400 line-through">
              R{regularPrice}
            </span>
          ) : null}

          <span className="text-sm font-semibold text-neutral-900">
            R{displayPrice}
          </span>

          {onSale ? (
            <span className="text-[10px] tracking-wider text-rose-600">SALE</span>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
