import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

const CART_SYNC_API =
  "https://farbeyond.co.za/wordpress/wp-json/farbeyond/v1/cart/sync";

// localStorage key
const CART_KEY = "cart";

// Expected stored item shape:
// {
//   product_id: number,
//   name: string,
//   price: string|number,
//   image: string,
//   quantity: number
//   (optional) brand: string
// }

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart:updated'));
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setCartItems(readCart());
    setIsLoading(false);
  }, []);

  const cartWithProducts = cartItems
    .map((i) => ({
      // map to UI’s expected fields
      id: i.product_id, // stable key
      product_id: i.product_id,
      quantity: Number(i.quantity || 1),
      product: {
        id: i.product_id,
        name: i.name || "Product",
        price: Number(i.price || 0),
        image_url: i.image || "",
        brand: i.brand || "", // optional
      },
    }))
    .filter((i) => i.product && i.product_id);

  const subtotal = useMemo(() => {
    return cartWithProducts.reduce(
      (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
      0
    );
  }, [cartWithProducts]);

  const updateQty = (productId, nextQty) => {
    const qty = Math.max(1, Number(nextQty || 1));
    const updated = cartItems.map((i) =>
      Number(i.product_id) === Number(productId) ? { ...i, quantity: qty } : i
    );
    setCartItems(updated);
    writeCart(updated);
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter(
      (i) => Number(i.product_id) !== Number(productId)
    );
    setCartItems(updated);
    writeCart(updated);
  };

  const checkout = async () => {
    if (!cartItems.length) return;

    setIsCheckingOut(true);
    try {
      const res = await fetch(CART_SYNC_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((i) => ({
            product_id: Number(i.product_id),
            quantity: Math.max(1, Number(i.quantity || 1)),
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok || !data?.checkout_url) {
        throw new Error(data?.error || data?.message || "Cart sync failed");
      }

      window.location.href = data.checkout_url;
    } catch (e) {
      console.error(e);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Loading skeleton (keeps your original “premium” feel)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6">
                <Skeleton className="w-24 h-24" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state (same vibe as your original)
  if (cartWithProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-light tracking-wider mb-3">
            YOUR CART IS EMPTY
          </h2>
          <p className="text-neutral-500 mb-8">
            Looks like you haven&apos;t added anything yet
          </p>
          <Link
            to={createPageUrl("Shop")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm tracking-wider hover:bg-neutral-800 transition-colors"
          >
            CONTINUE SHOPPING
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl tracking-[0.2em] font-light text-neutral-900 mb-12 text-center md:text-left"
        >
          SHOPPING CART
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cartWithProducts.map((item) => (
                <motion.div
                  key={item.product_id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-6 pb-6 border-b border-neutral-100"
                >
                  {/* Image */}
                  <Link
                    to={{
                      pathname: createPageUrl("ProductDetail"),
                      search: `?id=${encodeURIComponent(item.product_id)}`,
                    }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {item.product.brand ? (
                        <p className="text-xs text-neutral-500 tracking-wider uppercase mb-1">
                          {item.product.brand}
                        </p>
                      ) : null}

                      <Link
                        to={{
                          pathname: createPageUrl("ProductDetail"),
                          search: `?id=${encodeURIComponent(item.product_id)}`,
                        }}
                      >
                        <h3 className="font-medium text-neutral-900 hover:underline">
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() =>
                            updateQty(item.product_id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.product_id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          R{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              to={createPageUrl("Shop")}
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-neutral-50 p-6 md:p-8">
              <h2 className="text-lg tracking-wider font-medium mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>R{subtotal.toFixed(2)}</span>
                </div>

                {/* Keep your original shipping logic if you want */}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span>{subtotal >= 100 ? "FREE" : "R150.00"}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    R{(subtotal + (subtotal >= 100 ? 0 : 150)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-black text-white text-sm tracking-wider hover:bg-neutral-800 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? "PROCESSING..." : "CHECKOUT"}
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-neutral-500">
                  Secure checkout powered by WooCommerce
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}