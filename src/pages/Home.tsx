
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Headset,
  Zap,
  Battery,
  Power,
  Gauge,
  TrendingUp,
  Star,
  Quote,
  Plus,
  Minus,
  Building2,
  Hospital,
  Server,
  Factory,
  Cpu,
  Wifi,
  CheckCircle2,
  Award,
  ChevronRight,
} from "lucide-react";

import { supabase, type Product } from "@/lib/supabase";
import { useRouter } from "@/lib/router";
import { ProductCard } from "@/components/ProductCard";
import { site } from "@/lib/site";
import { Reveal, AnimatedCounter } from "@/lib/useReveal";

/* =========================================================
   DESIGN COLOURS
   Midnight Navy:   #101D32
   Deep Navy:       #192B46
   Champagne Gold:  #E8D5A3
   Warm Gold:       #B88A3B
   Soft Background: #F7F5F0
========================================================= */

const COLORS = {
  navy: "#101D32",
  deepNavy: "#192B46",
  gold: "#B88A3B",
  champagne: "#E8D5A3",
  background: "#F7F5F0",
};

export function HomePage() {
  const { navigate } = useRouter();
const [featured, setFeatured] = useState<Product[]>([]);
const [topSelling, setTopSelling] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  let active = true;

  (async () => {
    try {
      // Load products for the Popular Power Products section
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true })
        .limit(6);

      if (!active) return;

      if (error) {
        console.error("Unable to load featured products:", error);
      } else {
        setFeatured((data as Product[]) ?? []);
      }

      // Load all three products for Top Selling Products
      const { data: topSellingData, error: topSellingError } =
        await supabase
          .from("products")
          .select("*")
          .in("slug", [
            "tall-tubular-batteries",
            "dhu-series-1kva-1-5kva",
            "nxhi-solar-off-grid-inverter",
          ])
          .order("display_order", { ascending: true });

      if (!active) return;

      if (topSellingError) {
        console.error("Unable to load top selling products:", topSellingError);
      } else {
        setTopSelling((topSellingData as Product[]) ?? []);
      }
    } catch (error) {
      console.error("Home page products error:", error);
    } finally {
      if (active) setLoading(false);
    }
  })();

  return () => {
    active = false;
  };
}, []);

  const categories = [
    {
      icon: Power,
      name: "On-Line UPS",
      desc: "Reliable double-conversion power protection for critical equipment.",
      img: "https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    },
    {
      icon: Battery,
      name: "Batteries",
      desc: "Dependable battery solutions for backup and power storage.",
      img: "https://images.pexels.com/photos/698485/pexels-photo-698485.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    },
    {
      icon: Zap,
      name: "Inverters",
      desc: "Efficient power backup solutions for homes and businesses.",
      img: "https://images.pexels.com/photos/38171130/pexels-photo-38171130.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    },
    {
      icon: ShieldCheck,
      name: "Off-Line UPS",
      desc: "Practical backup protection for computers and electronics.",
      img: "https://images.pexels.com/photos/33174696/pexels-photo-33174696.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    },
    {
      icon: Gauge,
      name: "Stabilizers",
      desc: "Voltage regulation solutions for sensitive electrical equipment.",
      img: "https://images.pexels.com/photos/7867332/pexels-photo-7867332.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    },
    {
      icon: Headset,
      name: "Service & AMCs",
      desc: "Installation, maintenance and ongoing technical assistance.",
      img: "https://images.pexels.com/photos/19841116/pexels-photo-19841116.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-[#101D32]">



 
      {/* =====================================================
    PREMIUM STPS SHOWROOM HERO SECTION
===================================================== */}
      <section className="relative w-full min-h-[620px] md:min-h-[680px] lg:min-h-[740px] flex items-center justify-center overflow-hidden bg-[#101D32]">

        {/* BACKGROUND SHOWROOM IMAGE */}
        <img
          src="/stps-showroom.jpg"
          alt="Susheen Techno Power Systems showroom"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />


        {/* CENTER TEXT READABILITY */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,29,50,0.90)_0%,rgba(16,29,50,0.68)_50%,rgba(16,29,50,0.12)_100%)]" />

        {/* STPS LOGO */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 border-2 border-[#E8D5A3] shadow-xl">
            <img
              src="/stps-logo.png"
              alt="STPS Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* DECORATIVE TOP LIGHT */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-[#E8D5A3] to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-28 sm:py-32 text-center">

          <Reveal variant="up">

            {/* BRAND TAGLINE */}
            <div className="flex items-center justify-center gap-4 mb-7">
              <span className="w-10 sm:w-20 h-px bg-[#E8D5A3]" />

              <span className="text-[#E8D5A3] text-sm sm:text-base md:text-lg font-semibold tracking-[0.16em]">
                House of Power Devices
              </span>

              <span className="w-10 sm:w-20 h-px bg-[#E8D5A3]" />
            </div>

            {/* MAIN HEADING */}
            <h1 className="max-w-5xl mx-auto text-white text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold leading-[1.12] tracking-tight">
              Powering Your World
              <br />
              With <span className="text-[#E8D5A3]">Confidence.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="max-w-4xl mx-auto mt-7 text-white text-sm sm:text-base md:text-xl font-medium leading-7 sm:leading-9">
              Dependable power protection for homes, businesses and industries.
              <br className="hidden sm:block" />
              Discover quality UPS systems, batteries, inverters and voltage
              stabilizers from Susheen Techno Power Systems.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

              <button
                onClick={() => navigate("/services")}
                className="w-full sm:w-auto min-w-[210px] inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E8D5A3] text-[#101D32] rounded-full text-sm sm:text-base font-bold shadow-lg hover:bg-white hover:-translate-y-1 transition-all duration-300"
              >
                <ShieldCheck className="w-5 h-5" />
                Our Services
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto min-w-[210px] inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#101D32]/60 border border-white/80 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-white hover:text-[#101D32] hover:-translate-y-1 transition-all duration-300"
              >
                <Headset className="w-5 h-5" />
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

            {/* PRODUCT CATEGORY SHORTCUTS */}
            <div className="max-w-4xl mx-auto mt-12 pt-7 border-t border-white/30">
              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5">

                {[
                  "Solar Inverters",
                  "Online UPS",
                  "Battery Systems",
                  "Inverters",
                  "Voltage Stabilizers",
                  
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-3 text-white text-xs sm:text-sm md:text-base font-medium whitespace-nowrap"
                  >
                    <span className="text-[#E8D5A3] text-base">◆</span>
                    {item}
                  </span>
                ))}

              </div>
            </div>

          </Reveal>
        </div>

        {/* BOTTOM GOLD SEPARATOR */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

      </section>


      <section className="bg-white border-y border-[#EAE5DA]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-9">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Quality Products",
                desc: "Power equipment selected for dependable performance.",
              },
              {
                icon: Clock,
                title: "Prompt Assistance",
                desc: "Support to help you find the right power solution.",
              },
              {
                icon: Headset,
                title: "Expert Guidance",
                desc: "Technical assistance before and after your purchase.",
              },
              {
                icon: TrendingUp,
                title: "Value & Reliability",
                desc: "Solutions designed around your power requirements.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={`delay-${index + 1}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#101D32] border border-[#B88A3B]/50 rounded-sm group-hover:bg-[#F5F0E5] transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#E8D5A3] group-hover:text-[#101D32] transition-colors duration-300" />
                  </div>

                  <div>
                    <h3 className="text-[#101D32] text-sm font-bold">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-6 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* =====================================================
    PREMIUM SPLIT-SCREEN HERO SECTION
===================================================== */}
      <section className="bg-[#101D32] overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[540px] lg:min-h-[620px]">

          {/* LEFT CONTENT */}
          <div className="flex items-center px-6 sm:px-10 lg:px-14 xl:px-20 py-16 lg:py-20">
            <div className="max-w-xl mx-auto lg:mx-0">

              <Reveal variant="up">
                <div className="flex items-center gap-3 mb-7">
                  <span className="w-10 h-px bg-[#E8D5A3]" />
                  <span className="text-[#E8D5A3] text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
                    SUSHEEN TECHNO POWER SYSTEMS
                  </span>
                </div>

                <h1 className="text-white text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight">
                  Power That
                  <br />
                  Keeps You
                  <br />
                  <span className="text-[#E8D5A3]">Moving Forward.</span>
                </h1>

                <p className="max-w-lg mt-7 text-white/75 text-sm sm:text-base leading-8">
                  Protect what matters with dependable power backup and
                  voltage protection solutions. Explore UPS systems,
                  batteries, inverters and stabilizers for homes,
                  businesses and industrial environments.
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-3 mt-9">

                  <button
                    onClick={() => navigate("/products")}
                    className="inline-flex items-center gap-3 px-7 py-4 bg-[#E8D5A3] text-[#101D32] rounded-sm text-sm font-bold hover:bg-white transition-all duration-300"
                  >
                    Explore Our Products
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate("/contact")}
                    className="inline-flex items-center gap-3 px-7 py-4 border border-white/40 text-white rounded-sm text-sm font-semibold hover:bg-white hover:text-[#101D32] transition-all duration-300"
                  >
                    Talk to Our Team
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

                {/* PRODUCT SPECIALITIES */}

                <div className="flex flex-wrap justify-center gap-3 mt-9">
                  {[
                    "On-Line UPS",
                    "Batteries",
                    "Inverters",
                    "Stabilizers",
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        navigate(
                          `/products?category=${encodeURIComponent(category)}`
                        )
                      }
                      className="px-4 py-2 text-xs sm:text-sm font-medium text-white border border-white/30 bg-[#101D32]/40 rounded-md hover:border-[#E8D5A3] hover:text-[#E8D5A3] transition-all duration-300"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </Reveal>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-h-[340px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-[#192B46]">

            <img
              src="https://www.voomstore.ci/81194-large_default/onduleur-monophase-itys-6kva-230v-on-line-batterie-ity3-tw060b.jpg"
              alt="Online UPS power protection system in a server room"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
            />

            {/* Subtle image edge treatment */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#101D32]/15 via-transparent to-transparent pointer-events-none" />

            {/* Gold frame */}
            <div className="absolute inset-5 sm:inset-7 border border-[#E8D5A3]/40 pointer-events-none" />

            {/* Image caption */}
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-white text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase">
                Reliable Power Protection
              </p>
              <div className="w-12 h-0.5 bg-[#E8D5A3] mt-3" />
            </div>

          </div>

        </div>

        {/* BOTTOM GOLD ACCENT */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />
      </section>


      {/* =====================================================
          TRUST / SERVICE HIGHLIGHTS
      ===================================================== */}


      {/* =====================================================
          STATS BAND
      ===================================================== */}
      <StatsBand />
{/* =====================================================
    FEATURED PRODUCTS
===================================================== */}


{/* =====================================================
    TOP SELLING PRODUCTS
===================================================== */}

<section className="relative overflow-hidden bg-white py-20 md:py-28">
  <div className="mx-auto max-w-7xl px-5 sm:px-8">

    <Reveal>
      <SectionHeading
        eyebrow="Customer Favourites"
        title="Top Selling Products"
        subtitle="Explore popular power backup and energy solutions selected for residential and commercial requirements."
      />
    </Reveal>
{loading ? (
  <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="h-80 bg-white border border-[#E9E3D8] animate-pulse"
      />
    ))}
  </div>
) : topSelling.length > 0 ? (
      <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {topSelling.map((product, index) => (
          <Reveal
            key={product.id}
            delay={`delay-${index + 1}`}
            variant="up"
          >
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    ) : (
      <div className="mt-12 border border-[#E9E3D8] bg-white px-6 py-12 text-center">
        <Battery className="mx-auto mb-4 h-10 w-10 text-[#B88A3B]" />

        <h3 className="text-lg font-bold text-[#101D32]">
          Products Coming Soon
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Please visit our product catalogue or contact our team.
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mt-5 inline-flex items-center gap-2 bg-[#101D32] px-6 py-3 text-sm font-bold text-[#E8D5A3] hover:bg-[#192B46]"
        >
          Explore Products
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    )}

    <Reveal variant="up">
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-3 border border-[#101D32] px-8 py-4 text-sm font-bold text-[#101D32] transition-all duration-300 hover:bg-[#101D32] hover:text-[#E8D5A3]"
        >
          View Complete Product Catalogue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Reveal>

  </div>
</section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Product Range"
              title="Power Solutions for Every Need"
              subtitle="Explore our range of power backup and protection products for residential, commercial and industrial applications."
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            {categories.map((cat, index) => (
              <Reveal
                key={cat.name}
                delay={`delay-${(index % 3) + 1}`}
                variant="up"
              >
                <button
                  onClick={() =>
                    navigate(
                      cat.name === "Service & AMCs"
                        ? "/services"
                        : `/products?category=${encodeURIComponent(cat.name)}`
                    )
                  }
                  className="group w-full text-left bg-white border border-[#E9E3D8] rounded-sm overflow-hidden hover:border-[#B88A3B]/60 hover:shadow-xl hover:shadow-[#101D32]/8 transition-all duration-500"
                >
                  <div className="relative h-60 overflow-hidden bg-[#EEEAE1]">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4 w-11 h-11 bg-[#101D32] border border-[#B88A3B]/50 flex items-center justify-center shadow-md group-hover:bg-[#F5F0E5] transition-all duration-300">
                      <cat.icon className="w-5 h-5 text-[#E8D5A3] group-hover:text-[#101D32] transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#101D32]">
                      {cat.name}
                    </h3>

                    <p className="text-sm text-slate-500 leading-7 mt-3 min-h-[56px]">
                      {cat.desc}
                    </p>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#EEEAE1]">
                      <span className="text-xs font-bold tracking-wide uppercase text-[#A47B36]">
                        Explore Range
                      </span>

                      <span className="w-8 h-8 flex items-center justify-center border border-[#E8D5A3] group-hover:bg-[#101D32] group-hover:border-[#101D32] transition-colors">
                        <ArrowRight className="w-4 h-4 text-[#B88A3B] group-hover:text-white transition-colors" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <div className="flex items-end justify-between flex-wrap gap-5 mb-12">
            <Reveal variant="left">
              <SectionHeading
                eyebrow="Selected Products"
                title="Popular Power Products"
                subtitle="Explore selected products from our power solutions range."
                align="left"
              />
            </Reveal>

            <Reveal variant="right">
              <button
                onClick={() => navigate("/products")}
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#A47B36] hover:text-[#101D32] transition-colors"
              >
                View All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Reveal>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-80 rounded-sm bg-[#F1EEE7] animate-pulse"
                />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((product, index) => (
                <Reveal
                  key={product.id}
                  delay={`delay-${(index % 3) + 1}`}
                  variant="up"
                >
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[#E9E3D8]">
              <Power className="w-10 h-10 text-[#B88A3B] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#101D32]">
                Products Coming Soon
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Please visit our products page or contact us for assistance.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="mt-5 text-sm font-bold text-[#A47B36] hover:text-[#101D32]"
              >
                Contact Us <ArrowRight className="inline w-4 h-4 ml-1" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
      ===================================================== */}
      <IndustriesStrip />

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <Reveal variant="left">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1100"
                  alt="Electrical engineering and power infrastructure"
                  loading="lazy"
                  className="w-full h-[360px] sm:h-[470px] object-cover rounded-sm"
                />

                <div className="absolute -bottom-6 -right-4 sm:-right-7 bg-[#101D32] text-white p-6 sm:p-8 max-w-[230px] shadow-xl">
                  <Award className="w-8 h-8 text-[#E8D5A3] mb-4" />
                  <p className="text-lg font-semibold">
                    Your Power Partner
                  </p>
                  <p className="text-xs text-slate-300 leading-6 mt-2">
                    Solutions for homes, offices and industrial requirements.
                  </p>
                </div>

                <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#B88A3B]/50 -z-0" />
              </div>
            </Reveal>

            <Reveal variant="right">
              <div className="lg:pl-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-px bg-[#B88A3B]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47B36]">
                    Why Susheen Techno Power Systems
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-semibold text-[#101D32] leading-tight">
                  The Right Power
                  <br />
                  Solution Makes
                  <br />
                  <span className="text-[#B88A3B]">All the Difference.</span>
                </h2>

                <p className="text-slate-600 leading-8 mt-6">
                  Choosing the right power equipment is important for
                  protecting your systems and maintaining business
                  continuity. We help you identify suitable products
                  based on your equipment, capacity and backup requirements.
                </p>

                <div className="space-y-5 mt-8">
                  {[
                    {
                      title: "Solutions for Different Requirements",
                      desc: "Options for residential, commercial and industrial applications.",
                    },
                    {
                      title: "Product Selection Guidance",
                      desc: "Assistance in understanding capacity and product suitability.",
                    },
                    {
                      title: "Support & Service",
                      desc: "Help with product enquiries and ongoing requirements.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-9 h-9 flex-shrink-0 bg-white border border-[#E8D5A3] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#B88A3B]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#101D32]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-6 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/about")}
                  className="inline-flex items-center gap-3 mt-9 px-6 py-3.5 bg-[#101D32] text-white text-sm font-semibold hover:bg-[#192B46] transition-colors"
                >
                  Know More About Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}
      <TestimonialsSection />

      {/* =====================================================
          FAQ
      ===================================================== */}
      <FAQSection />

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="bg-[#101D32] py-20 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full border border-white/[0.06] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full border border-white/[0.06] -translate-x-1/3 translate-y-1/3" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#E8D5A3]/20 to-transparent" />

        <Reveal variant="scale">
          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#E8D5A3]" />
              <span className="text-[#E8D5A3] text-xs font-bold tracking-[0.22em] uppercase">
                Let's Discuss Your Requirements
              </span>
              <span className="w-8 h-px bg-[#E8D5A3]" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
              Looking for the Right
              <br />
              <span className="text-[#E8D5A3]">
                Power Solution?
              </span>
            </h2>

            <p className="max-w-2xl mx-auto mt-6 text-slate-300 leading-8">
              Tell us about your power requirements. Our team can help
              you explore suitable UPS systems, batteries, inverters
              and voltage stabilizers.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#E8D5A3] text-[#101D32] font-bold text-sm hover:bg-[#DCC28A] transition-colors"
              >
                Request a Consultation
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                WhatsApp Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  );
}

/* =========================================================
   STATS BAND
========================================================= */

function StatsBand() {
  const stats = [
    {
      value: 15,
      suffix: "+",
      label: "Years in Business",
      desc: "Serving since 2009",
    },
    {
      value: 5000,
      suffix: "+",
      label: "Units Delivered",
      desc: "Across Telangana & AP",
    },
    {
      value: 1200,
      suffix: "+",
      label: "Happy Clients",
      desc: "Homes, offices & industries",
    },
    {
      value: 99,
      suffix: "%",
      label: "On-Time Delivery",
      desc: "Committed to deadlines",
    },
  ];

  return (
    <section className="bg-[#101D32] py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={`delay-${index + 1}`}>
              <div className="text-center px-3 lg:border-r lg:border-white/10 last:border-0">
                <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#E8D5A3]">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </p>

                <p className="text-white font-semibold text-sm mt-3">
                  {stat.label}
                </p>

                <p className="text-slate-400 text-xs mt-2">
                  {stat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INDUSTRIES
========================================================= */

function IndustriesStrip() {
  const industries = [
    { icon: Server, name: "Data Centers" },
    { icon: Hospital, name: "Healthcare" },
    { icon: Factory, name: "Manufacturing" },
    { icon: Building2, name: "Offices" },
    { icon: Cpu, name: "IT & Telecom" },
    { icon: Wifi, name: "Networking" },
  ];

  return (
    <section className="py-20 md:py-24 bg-white border-y border-[#EAE5DA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Powering Different Sectors"
            subtitle="Power protection solutions for a wide range of professional environments."
          />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {industries.map((industry, index) => (
            <Reveal
              key={industry.name}
              delay={`delay-${(index % 3) + 1}`}
              variant="up"
            >
              <div className="group bg-white border border-[#EAE5DA] px-4 py-7 text-center hover:bg-[#101D32] hover:border-[#101D32] transition-all duration-300">
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#101D32] border border-[#B88A3B]/50 group-hover:bg-[#F5F0E5] transition-all duration-300">
                  <industry.icon className="w-6 h-6 text-[#E8D5A3] group-hover:text-[#101D32] transition-colors duration-300" />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-[#101D32] group-hover:text-white mt-4 transition-colors">
                  {industry.name}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TESTIMONIALS
========================================================= */

function TestimonialsSection() {
  const testimonials = [
    {
      name: "R. Krishna Murthy",
      role: "IT Manager, Secunderabad",
      text: "Susheen Techno installed a 10 kVA on-line UPS for our server room. Zero downtime in two years. Their AMC service is prompt and professional.",
      rating: 5,
    },
    {
      name: "Dr. Anjali Reddy",
      role: "Clinic Owner, Hyderabad",
      text: "We needed clean power for our medical equipment. The team recommended the right stabilizer and UPS combo. Excellent guidance and fair pricing.",
      rating: 5,
    },
    {
      name: "Suresh Patel",
      role: "Factory Supervisor",
      text: "Their servo stabilizer handles our CNC machines perfectly. Voltage fluctuations are a thing of the past. Highly recommend for industrial use.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Client Experiences"
            title="What Our Clients Say"
            subtitle="Feedback from customers who have chosen our power solutions."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={`delay-${index + 1}`}
              variant="up"
            >
              <div className="h-full bg-white border border-[#E9E3D8] p-7 hover:shadow-xl hover:shadow-[#101D32]/5 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <Quote className="w-8 h-8 text-[#B88A3B]/50" />

                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="w-3.5 h-3.5 text-[#B88A3B]"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-7 mt-6 min-h-[120px]">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3 mt-7 pt-5 border-t border-[#EEEAE1]">
                  <div className="w-11 h-11 flex items-center justify-center bg-[#101D32] text-[#E8D5A3] font-bold">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#101D32]">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
========================================================= */

function FAQSection() {
  const faqs = [
    {
      q: "Do you provide on-site installation?",
      a: "Yes. Please contact our team to confirm installation availability, site requirements and applicable charges for your location.",
    },
    {
      q: "What warranty do your products carry?",
      a: "Warranty terms vary depending on the product and manufacturer. Please check the specific product warranty details with our team before purchasing.",
    },
    {
      q: "Can you help me choose the right capacity?",
      a: "Absolutely. Share your connected load, required backup time and location. Our team can help you understand the suitable UPS, inverter or battery capacity.",
    },
    {
      q: "Do you offer Annual Maintenance Contracts?",
      a: "Please contact us to discuss maintenance and service requirements for your equipment and location.",
    },
    {
      q: "How can I enquire about product availability?",
      a: "You can contact us by phone, WhatsApp or through our enquiry page. Share the product name and required capacity so our team can assist you.",
    },
    {
      q: "Do you supply to other states?",
      a: "Contact us with your delivery location and product requirements. Our team can confirm availability and delivery possibilities.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Helpful Information"
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our products and services."
          />
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <Reveal
              key={faq.q}
              delay={`delay-${(index % 3) + 1}`}
              variant="up"
            >
              <div
                className={`border transition-colors duration-300 ${open === index
                  ? "border-[#B88A3B]/50 bg-white"
                  : "border-[#E9E3D8] bg-white"
                  }`}
              >
                <button
                  onClick={() =>
                    setOpen(open === index ? null : index)
                  }
                  aria-expanded={open === index}
                  className="w-full flex items-center justify-between gap-5 px-5 sm:px-6 py-5 text-left"
                >
                  <span
                    className={`text-sm font-semibold ${open === index
                      ? "text-[#A47B36]"
                      : "text-[#101D32]"
                      }`}
                  >
                    {faq.q}
                  </span>

                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#E8D5A3]">
                    {open === index ? (
                      <Minus className="w-4 h-4 text-[#B88A3B]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#B88A3B]" />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${open === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-7">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REUSABLE SECTION HEADING
========================================================= */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "text-center max-w-3xl mx-auto"
          : "text-left max-w-2xl"
      }
    >
      <div
        className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : "justify-start"
          }`}
      >
        <span className="w-8 h-px bg-[#B88A3B]" />
        <span className="text-[#A47B36] text-xs font-bold uppercase tracking-[0.22em]">
          {eyebrow}
        </span>
        <span className="w-8 h-px bg-[#B88A3B]" />
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#101D32] leading-tight tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-500 mt-5 text-sm sm:text-base leading-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
