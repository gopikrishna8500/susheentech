
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Shield,
  Truck,
  Wrench,
} from "lucide-react";

import { supabase, type Product } from "@/lib/supabase";
import { useRouter } from "@/lib/router";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/lib/useReveal";

export function ProductDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedCapacity, setSelectedCapacity] = useState("");

  const capacityOptions = Array.isArray(product?.capacity_options)
    ? product.capacity_options
    : [];

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setProduct(null);
      setRelated([]);
      setQty(1);
      setSelectedCapacity("");

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (cancelled) return;

        if (error) {
          console.error("Product loading error:", error);
          setProduct(null);
          setLoading(false);
          return;
        }

        const p = data as Product | null;

        setProduct(p);

        if (p) {
          const options = Array.isArray(p.capacity_options)
            ? p.capacity_options
            : [];

          setSelectedCapacity(
            options[0] || p.capacity || "Standard"
          );

          const { data: rel, error: relatedError } = await supabase
            .from("products")
            .select("*")
            .eq("category", p.category)
            .neq("id", p.id)
            .limit(3);

          if (cancelled) return;

          if (relatedError) {
            console.error("Related products error:", relatedError);
          }

          setRelated((rel as Product[]) ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Product loading error:", err);
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-28 pb-20">
        <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-[#B88A3B] border-t-transparent" />
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 pt-28 pb-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#101D32]/10 bg-white">
          <ShoppingCart className="h-8 w-8 text-[#B88A3B]" />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-[#101D32]">
          Product not found
        </h1>

        <p className="mt-3 text-sm text-[#192B46]/60">
          The product may have been removed or the link may be incorrect.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-7 rounded-xl bg-[#101D32] px-7 py-3.5 text-sm font-bold text-[#E8D5A3] transition-colors hover:bg-[#192B46]"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Back navigation */}
        <button
          onClick={() => navigate("/products")}
          className="mt-5 mb-8 flex items-center gap-2 text-sm font-bold text-[#192B46]/60 transition-colors hover:text-[#B88A3B]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </button>

        {/* Main product section */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product image */}
          <Reveal variant="left">
            <div className="group relative h-80 overflow-hidden rounded-3xl border border-[#101D32]/10 bg-white shadow-[0_10px_35px_rgba(16,29,50,0.06)] sm:h-96 lg:sticky lg:top-32 lg:h-[30rem]">

              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-contain p-7 transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[#B88A3B]/60">
                  <ShoppingCart className="h-16 w-16" />
                </div>
              )}

              {/* Category label */}
              <span className="absolute left-5 top-5 rounded-full border border-[#B88A3B]/20 bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#9A702D] backdrop-blur">
                {product.category}
              </span>

              {/* STPS label */}
              <span className="absolute bottom-5 right-5 rounded-lg bg-[#101D32] px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#E8D5A3]">
                STPS
              </span>
            </div>
          </Reveal>

          {/* Product information */}
          <Reveal variant="right" className="space-y-7">

            {/* Heading */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#B88A3B]">
                SUSHEEN TECHNO POWER SYSTEMS
              </p>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#101D32] md:text-4xl lg:text-[42px]">
                {product.name}
              </h1>

              <p className="mt-3 text-lg font-bold text-[#B88A3B]">
                {product.capacity || "Multiple capacities available"} range
              </p>
            </div>

            {/* Description */}
            <p className="text-[15px] leading-8 text-[#192B46]/70">
              {product.long_description || product.short_description}
            </p>

            {/* Capacity selector */}
            <div className="rounded-2xl border border-[#101D32]/10 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B88A3B]">
                  Choose your requirement
                </p>

                <h3 className="mt-1 text-lg font-extrabold text-[#101D32]">
                  Select Capacity / Range
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {capacityOptions.length > 0 ? (
                  capacityOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedCapacity(opt)}
                      className={`rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all duration-200 ${
                        selectedCapacity === opt
                          ? "border-[#B88A3B] bg-[#B88A3B]/10 text-[#101D32]"
                          : "border-[#101D32]/10 bg-white text-[#192B46] hover:border-[#B88A3B]/50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {opt}
                        {selectedCapacity === opt && (
                          <Check className="h-4 w-4 text-[#B88A3B]" />
                        )}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="rounded-xl border border-[#101D32]/10 bg-white px-4 py-3 text-sm font-bold text-[#192B46]">
                    {selectedCapacity || product.capacity || "Standard"}
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="rounded-2xl border border-[#101D32]/10 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B88A3B]">
                  Technical information
                </p>

                <h3 className="mt-1 text-lg font-extrabold text-[#101D32]">
                  Product Specifications
                </h3>
              </div>

              <dl className="grid gap-x-6 sm:grid-cols-2">
                {(Array.isArray(product.specs) ? product.specs : []).map(
                  (s) => (
                    <div
                      key={s.label}
                      className="flex justify-between gap-4 border-b border-[#101D32]/10 py-3"
                    >
                      <dt className="text-sm font-medium text-[#192B46]/55">
                        {s.label}
                      </dt>

                      <dd className="text-right text-sm font-bold text-[#101D32]">
                        {s.value}
                      </dd>
                    </div>
                  )
                )}
              </dl>

              {(!product.specs || product.specs.length === 0) && (
                <p className="text-sm text-[#192B46]/60">
                  Contact our team for detailed product specifications.
                </p>
              )}
            </div>

            {/* Quantity and Add to Order */}
            <div className="flex flex-wrap items-center gap-4">

              {/* Quantity selector */}
              <div className="flex items-center gap-2 rounded-xl border border-[#101D32]/10 bg-white p-1.5">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#101D32] transition-colors hover:bg-[#101D32] hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-10 text-center text-base font-extrabold text-[#101D32]">
                  {qty}
                </span>

                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#101D32] transition-colors hover:bg-[#101D32] hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={() =>
                  addToCart(
                    product,
                    selectedCapacity || product.capacity || "Standard",
                    qty
                  )
                }
                className="flex min-h-12 min-w-[200px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#101D32] px-6 py-3.5 text-sm font-extrabold text-[#E8D5A3] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#192B46] hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
                Add {qty} to Order
              </button>
            </div>

            {/* Service highlights */}
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                { icon: Shield, label: "Warranty" },
                { icon: Truck, label: "Delivery Support" },
                { icon: Wrench, label: "Installation Support" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-[#101D32]/10 bg-white p-3.5 transition-all duration-300 hover:border-[#B88A3B]/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B88A3B]/10">
                    <item.icon className="h-5 w-5 text-[#B88A3B]" />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold text-[#101D32]">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-[10px] font-medium text-[#192B46]/50">
                      Contact for details
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote information */}
            <div className="flex items-start gap-3 rounded-xl border border-[#B88A3B]/20 bg-[#B88A3B]/[0.07] p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#B88A3B]" />

              <p className="text-xs font-medium leading-relaxed text-[#192B46]/75">
                Pricing is confirmed by our team based on selected capacity,
                quantity and delivery location. Add this item to your order
                and proceed to checkout to request a quote.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-[#101D32]/10 pt-16">
            <Reveal>
              <div className="mb-9">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B88A3B]">
                  YOU MAY ALSO LIKE
                </p>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D32]">
                  Related Products
                </h2>

                <p className="mt-2 text-sm text-[#192B46]/60">
                  Explore more products from the same category.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal
                  key={p.id}
                  delay={`delay-${i + 1}`}
                  variant="up"
                >
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
