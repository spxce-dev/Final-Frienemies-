import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import ProductCard from "@/components/home/ProductCard";
import { getProducts } from "@/api/wooClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

function normalizeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function getQueryParams() {
  const url = window.location.href;
  const qIndex = url.indexOf("?");
  return new URLSearchParams(qIndex !== -1 ? url.slice(qIndex + 1) : "");
}

function getBrandValues(product) {
  const values = new Set();

  if (product?.brand) {
    values.add(normalizeSlug(product.brand));
  }

  const attrs = Array.isArray(product?.attributes) ? product.attributes : [];
  for (const attr of attrs) {
    const attrName = String(attr?.name || "").toLowerCase();
    if (attrName === "brand" || attrName === "pa_brand") {
      const options = Array.isArray(attr?.options)
        ? attr.options
        : Array.isArray(attr?.terms)
        ? attr.terms
        : [];

      for (const option of options) {
        values.add(normalizeSlug(option));
      }
    }
  }

  const categories = Array.isArray(product?.categories) ? product.categories : [];
  for (const category of categories) {
    if (category?.slug) values.add(normalizeSlug(category.slug));
    if (category?.name) values.add(normalizeSlug(category.name));
  }

  const productName = normalizeSlug(product?.name || "");
  if (productName) {
    [
      "armani-exchange",
      "dolce-gabbana",
      "burberry",
      "nike",
      "gucci",
      "prada",
    ].forEach((brandSlug) => {
      if (productName.includes(brandSlug)) values.add(brandSlug);
    });
  }

  return Array.from(values);
}

export default function Shop() {
  const params = getQueryParams();
  const categoryFromUrl = params.get("category");
  const brandFromUrl = params.get("brand");
  const isNew = params.get("new") === "true";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");
  const [selectedBrand, setSelectedBrand] = useState(brandFromUrl || "all");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ perPage: 48, page: 1 }),
  });

  const categories = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const cats = Array.isArray(p.categories) ? p.categories : [];
      for (const c of cats) {
        if (c?.slug && c?.name) map.set(c.slug, c.name);
      }
    }
    const items = Array.from(map.entries()).map(([value, label]) => ({ value, label }));
    items.sort((a, b) => a.label.localeCompare(b.label));
    return [{ value: "all", label: "All Categories" }, ...items];
  }, [products]);

  const brands = useMemo(() => {
    const map = new Map();
    for (const product of products) {
      const brandValues = getBrandValues(product);
      for (const brand of brandValues) {
        if (!brand) continue;
        if (!map.has(brand)) {
          const label = brand
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
          map.set(brand, label);
        }
      }
    }

    const items = Array.from(map.entries()).map(([value, label]) => ({ value, label }));
    items.sort((a, b) => a.label.localeCompare(b.label));
    return [{ value: "all", label: "All Brands" }, ...items];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const list = (products || []).filter((p) => {
      const cats = Array.isArray(p.categories) ? p.categories : [];
      const brandValues = getBrandValues(p);

      const categoryMatch =
        selectedCategory === "all" || cats.some((c) => c?.slug === selectedCategory);

      const brandMatch =
        selectedBrand === "all" || brandValues.includes(normalizeSlug(selectedBrand));

      const newMatch = !isNew;
      return categoryMatch && brandMatch && newMatch;
    });

    list.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.price || 0) - Number(b.price || 0);
        case "price-high":
          return Number(b.price || 0) - Number(a.price || 0);
        case "name":
          return String(a.name || "").localeCompare(String(b.name || ""));
        default:
          return Number(b.id || 0) - Number(a.id || 0);
      }
    });

    return list;
  }, [products, selectedCategory, selectedBrand, sortBy, isNew]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl tracking-[0.2em] font-light text-neutral-900"
          >
            SHOP
          </motion.h1>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 mb-10 flex-wrap">
          <div className="w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-64">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-64">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm tracking-[0.2em] font-medium">FILTERS</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-neutral-500 mb-2 tracking-wider">CATEGORY</p>
                    <div className="border border-neutral-200">
                      <select
                        className="w-full h-11 px-3 text-sm bg-white"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categories.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-500 mb-2 tracking-wider">BRAND</p>
                    <div className="border border-neutral-200">
                      <select
                        className="w-full h-11 px-3 text-sm bg-white"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      >
                        {brands.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-500 mb-2 tracking-wider">SORT BY</p>
                    <div className="border border-neutral-200">
                      <select
                        className="w-full h-11 px-3 text-sm bg-white"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full py-3 bg-black text-white text-sm tracking-wider"
                  >
                    APPLY
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-square w-full mb-4" />
                <Skeleton className="h-3 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-40 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-neutral-500 py-20">Failed to load products.</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-neutral-500 py-20">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
