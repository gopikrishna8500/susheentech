
import { useEffect, useMemo, useState } from "react";
import {
  SlidersHorizontal,
  Search,
  AlertCircle,
  BatteryCharging,
  Zap,
  ShieldCheck,
  Activity,
  ChevronRight,
  X,
  Package,
  Folder,
} from "lucide-react";

import { supabase, type Product } from "@/lib/supabase";
import { useRouter } from "@/lib/router";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/lib/useReveal";

/* =========================================
   PRODUCT CATALOGUE
   Main Category → Products

   Subcategories are used internally only.
   They will NOT appear in the sidebar.
========================================= */

type SubCategoryItem = {
  name: string;
  products: string[];
};

type MainCategoryItem = {
  name: string;
  dbCategories: string[];
  products: string[];
  subcategories: SubCategoryItem[];
};

const catalogue: MainCategoryItem[] = [
  {
    name: "Batteries",
    dbCategories: ["Batteries"],
    products: [],
    subcategories: [
      {
        name: "Tubular Batteries",
        products: [
          "STPS Tubular Batteries",
          "Tall Tubular Batteries",
        ],
      },
      {
        name: "SMF Batteries",
        products: [],
      },
      {
        name: "Lithium Batteries",
        products: [],
      },
    ],
  },

  {
    name: "Electric Generator",
    dbCategories: ["Electric Generator"],
    products: [],
    subcategories: [
      {
        name: "NXEG Series",
        products: [
          "Electric Generator NxEG990 G4 (40kVA-200kVA) (3:3)",
          "Electric Generator NXEG900R (6KVA)",
          "Electric Generator NXEG990R (6KVA-40KVA)",
        ],
      },
    ],
  },

  {
    name: "Inverters",
    dbCategories: ["Inverters"],
    products: [],
    subcategories: [
      {
        name: "Inbuilt Lithium Inverter",
        products: [
          "Inbuilt Lithium Inverter",
        ],
      },
      {
        name: "Lithium Inverter",
        products: [
          "NHU Plus Series",
        ],
      },
    ],
  },

  {
    name: "LINE INTERACTIVE",
    dbCategories: ["LINE INTERACTIVE"],
    products: [
      "NX 200LI (400VA - 3000VA)",
    ],
    subcategories: [],
  },

  {
    name: "LINE INTERACTIVE UPS",
    dbCategories: ["Off-Line UPS", "LINE INTERACTIVE UPS"],
    products: [],
    subcategories: [
      {
        name: "Off-Line UPS",
        products: [],
      },
      {
        name: "Line Interactive UPS",
        products: [],
      },
    ],
  },

  {
    name: "Power Protective Device (PPD)",
    dbCategories: [
      "Power Protective Device (PPD)",
      "Power Protective Device-PPD",
    ],
    products: [
      "Power Protective Device-PPD",
    ],
    subcategories: [],
  },

  {
    name: "Power Quality Solution",
    dbCategories: ["Power Quality Solution"],
    products: [
      "Static Var Generator Module",
      "Active Power Filter",
    ],
    subcategories: [],
  },

  {
    name: "Solar Inverters",
    dbCategories: ["Solar Inverters"],
    products: [],
    subcategories: [
      {
        name: "Hybrid",
        products: [
          "NX HI Solar Inverter Double Output",
          "NX HI Solar Inverter",
          "NXHI Solar 30kw",
        ],
      },
      {
        name: "Off-Grid",
        products: [
          "NXHI Off-Grid Inverter",
          "NXHI Solar Off-Grid Inverter",
        ],
      },
    ],
  },
  {
    name: "Stabilizers",
    dbCategories: ["Stabilizers"],
    products: [],
    subcategories: [
      {
        name: "General Voltage Stabilizers",
        products: [],
      },
      {
        name: "Static Voltage Stabilizers",
        products: [
          "DS SERIES (5kVA-40kVA)(1:1)",
          "DS SERIES (5kVA-90kVA)(3:3)",
          "DS SERIES (100kVA-300kVA)(3:3)",
          "DHS SERIES (100kVA-2000kVA) (3:3)",
        ],
      },
      {
        name: "Servo Voltage Stabilizers",
        products: [
          "DSP Servo Stabilizer (1kVA-40kVA)(1:1)",
          "DSP Servo Stabilizer (3kVA-3500kVA) (Air & Oil Cooled)(3:3)",
        ],
      },
    ],
  },

  {
    name: "Test",
    dbCategories: ["Test"],
    products: [],
    subcategories: [],
  },

  {
    name: "Transformer",
    dbCategories: ["Transformer"],
    products: [
      "Isolation Transformer (3kva)",
      "Isolation Transformer (up to 1500 kVA)(3Ph)",
    ],
    subcategories: [],
  },

  {
  name: "UPS",
  dbCategories: ["UPS"],
  products: [],
  subcategories: [
    {
      name: "ONLINE UPS",
      products: [
        "DOU Series (RT)LI (1kVA-3kVA)",
        "DOU Series (1kVA-10KVA)(1:1)",
        "DOU Series RT G4(1kVA-3kVA)",
        "DOU Series (RT) G4 (5 kVA~10 KVA)",
        "DOU Series G3 (1kva -3kva)",
        "Online UPS NX900RT G4(10-20kVA )(3:1/1:1)",
        "Online UPS 990 G5 RT(10kVA-60kVA)(3:3)",
        "Online UPS Nx800 (10kVA-30kVA)(3:1)",
        "Online UPS Nx890 A(10kVA-120kVA)(3:3)",
        "Online UPS Nx890 B(80kVA-600kVA)(3:3)",
        "Online UPS Nx900 G5(10 kVA-20 kVA)(3:1/1:1)",
        "Online UPS Nx990 G5(10kVA-60kVA)(3:3/3:1)",
        "Online UPS Nx990 G4(40kVA-200 kVA)(3:3)",
        "Online UPS Nx7910-79600(10kVA-600kVA)",
        "Online UPS Nx310 (10 kVA-120 kVA) (3:3)(3:1)",
        "Online UPS Nx300 (3kVA-50kVA) (1:1)(3:1)",
      ],
    },
    {
      name: "ADP MACHINES",
      products: [
        "ADP Machines DOU Series (1kVA - 10KVA) (1:1)",
        "ADP Machines Nx660B (50kVA - 600kVA)",
        "ADP Machines NX660A (20 kVA - 200kVA)",
        "ADP Machines Nx660C (400kVA - 1200kVA)",
        "ADP Machines Nx890A (10kVA -120kVA)",
        "ADP Machines Nx990 G5 (10 kVA - 60 kVA)(3:3)",
        "ADP Machines Nx990 G4 (40 kVA - 200 kVA)(3:3)",
        "ADP Machines Nx900 G5 (10 kVA - 20 kVA)(3:1/1:1)",
      ],
    },
    {
      name: "MODULAR UPS",
      products: [
        "Modular UPS Nx660 A(20 kVA-200kVA)",
        "Modular UPS Nx660 B(50kVA-600kVA)",
        "Modular UPS Nx660 C(400 kVA-1200kVA)",
        "Modular UPS NX600 D (10KVA-200KVA)",
      ],
    },
    {
      name: "HOME UPS",
      products: [
        "DHU Series (2kVA-7.5kVA)",
        "DHU Series (1kVA-1.5kVA)",
      ],
    },
  ],
},
];

/* =========================================
   HELPERS
========================================= */

function normalizeName(value: string | null | undefined) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function productMatchesName(product: Product, name: string) {
  return normalizeName(product.name) === normalizeName(name);
}

/*
  Collect all products belonging to a main category.

  This checks:
  1. The database category.
  2. Product names listed directly in the catalogue.
  3. Product names inside all internal subcategories.

  Subcategory names are NOT used as sidebar filters.
*/


function getCategoryProducts(
  products: Product[],
  category: MainCategoryItem
) {
  const catalogueNames = [
    ...category.products,
    ...category.subcategories.flatMap((sub) => sub.products),
  ];

  const categoryNames = category.dbCategories.map(normalizeName);

  const subcategoryNames = category.subcategories.map((sub) =>
    normalizeName(sub.name)
  );

  if (category.name === "UPS") {
    return products.filter((product) =>
      subcategoryNames.includes(normalizeName(product.subcategory))
    );
  }

  return products.filter((product) => {
    const dbCategory = normalizeName(product.category);
    const dbSubcategory = normalizeName(product.subcategory);

    const categoryMatch = categoryNames.includes(dbCategory);
    const subcategoryMatch = subcategoryNames.includes(dbSubcategory);

    const nameMatch = catalogueNames.some((name) =>
      productMatchesName(product, name)
    );

    return categoryMatch || subcategoryMatch || nameMatch;
  });
}

/* =========================================
   ANIMATED POWER SHOWCASE
========================================= */

function ProductPowerVisual() {
  return (
    <div className="product-showcase relative mx-auto flex min-h-[350px] w-full max-w-[490px] items-center justify-center overflow-hidden rounded-[28px] border border-[#E8D5A3]/20 bg-[#101D32] p-8 shadow-2xl">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B88A3B]/15 blur-3xl" />

      <div className="product-energy-ring absolute h-64 w-64 rounded-full border border-dashed border-[#E8D5A3]/30" />
      <div className="product-energy-ring-reverse absolute h-48 w-48 rounded-full border border-[#E8D5A3]/20" />

      <div className="product-power-core relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-[30px] border border-[#E8D5A3]/40 bg-[#192B46] shadow-[0_0_55px_rgba(184,138,59,0.2)]">
        <div className="absolute inset-2 rounded-[23px] border border-white/5" />

        <BatteryCharging className="product-charge-icon h-14 w-14 text-[#E8D5A3]" />

        <span className="mt-2 text-[10px] font-black tracking-[0.25em] text-white/75">
          STPS POWER
        </span>
      </div>

      <div className="product-node product-node-one">
        <Zap className="h-5 w-5 shrink-0 text-[#E8D5A3]" />
        <span>UPS SYSTEMS</span>
      </div>

      <div className="product-node product-node-two">
        <BatteryCharging className="h-5 w-5 shrink-0 text-[#E8D5A3]" />
        <span>BATTERIES</span>
      </div>

      <div className="product-node product-node-three">
        <ShieldCheck className="h-5 w-5 shrink-0 text-[#E8D5A3]" />
        <span>STABILIZERS</span>
      </div>

      <div className="product-energy-pulse absolute bottom-10 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

      <div className="product-spark absolute left-[18%] top-[24%] h-2 w-2 rounded-full bg-[#E8D5A3]" />

      <div className="product-spark product-spark-two absolute bottom-[23%] right-[18%] h-2 w-2 rounded-full bg-[#E8D5A3]" />

      <div className="absolute bottom-5 right-6 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-white/45">
        <Activity className="h-3.5 w-3.5 text-[#E8D5A3]" />
        POWERING PERFORMANCE
      </div>
    </div>
  );
}

/* =========================================
   PRODUCTS PAGE
========================================= */

export function ProductsPage() {
  const { path, navigate } = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const [selectedCategory, setSelectedCategory] = useState("All");
const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  /* ---------------------------------------
     READ CATEGORY FROM URL
  --------------------------------------- */

  useEffect(() => {
    const params = new URLSearchParams(path.split("?")[1] || "");
    const urlCategory = params.get("category");

    if (!urlCategory || urlCategory === "All") {
      setSelectedCategory("All");
    } else {
      const matching = catalogue.find(
        (item) => item.name === urlCategory
      );

      setSelectedCategory(matching ? urlCategory : "All");
    }
  }, [path]);

  /* ---------------------------------------
     FETCH PRODUCTS FROM SUPABASE
  --------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .order("display_order", { ascending: true });

        if (cancelled) return;

        if (fetchError) {
          setProducts([]);
          setError(fetchError.message);
          return;
        }

        setProducts((data as Product[]) ?? []);
      } catch (err) {
        if (cancelled) return;

        setProducts([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load products."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [refresh]);

  /* ---------------------------------------
     FILTER PRODUCTS

     Only two filters:
     1. Main category
     2. Search

     All internal catalogue groupings are
     combined into their main category.
  --------------------------------------- */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Main category filter
    if (selectedCategory !== "All") {
      const category = catalogue.find(
        (item) => item.name === selectedCategory
      );

      if (category) {
        result = getCategoryProducts(result, category);
      }
    }

    // Search filter
    if (search.trim()) {
      const searchText = normalizeName(search);

      result = result.filter((product) => {
        const searchableText = normalizeName(
          [
            product.name,
            product.category,
            product.subcategory,
            product.short_description,
            product.long_description,
            product.capacity,
          ]
            .filter(Boolean)
            .join(" ")
        );

        return searchableText.includes(searchText);
      });
    }

    return result;
  }, [products, selectedCategory, search]);

  /* ---------------------------------------
     CATEGORY ACTIONS
  --------------------------------------- */

   /* ---------------------------------------
     CATEGORY ACTIONS
  --------------------------------------- */

  const selectAllCategories = () => {
    setSelectedCategory("All");
    setSearch("");
    setMobileCategoriesOpen(false);
  };

  const selectMainCategory = (name: string) => {
    setSelectedCategory(name);
    setSearch("");
    setMobileCategoriesOpen(false);
  };

  const clearFilters = () => {
    selectAllCategories();
  };

  const hasActiveFilters =
    selectedCategory !== "All" || search.trim() !== "";

  // Reusable category buttons for desktop and mobile
  const categoryButtons = (
    <>
      <button
        type="button"
        onClick={selectAllCategories}
        className={`mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
          selectedCategory === "All"
            ? "bg-[#B88A3B] text-white"
            : "text-[#101D32] hover:bg-[#E8D5A3]/30"
        }`}
      >
        <Package className="h-4 w-4" />

        <span className="flex-1">All Categories</span>

        <span className="text-xs">{products.length}</span>
      </button>

      <div className="space-y-1">
        {catalogue.map((main) => {
          const isSelected = selectedCategory === main.name;
          const listedCount = getCategoryProducts(products, main).length;

          return (
            <button
              key={main.name}
              type="button"
              onClick={() => selectMainCategory(main.name)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-bold transition-all duration-200 ${
                isSelected
                  ? "bg-[#101D32] text-[#E8D5A3] shadow-sm"
                  : "text-[#101D32] hover:bg-[#F7F5F0]"
              }`}
            >
              <Folder
                className={`h-4 w-4 shrink-0 ${
                  isSelected ? "text-[#E8D5A3]" : "text-[#B88A3B]"
                }`}
              />

              <span className="flex-1">{main.name}</span>

              <span className="rounded-full bg-[#B88A3B]/10 px-2 py-0.5 text-[10px] font-bold text-[#B88A3B]">
                {loading ? "..." : listedCount}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
  /* =======================================
     PAGE UI
  ======================================= */

  return (
    <div className="min-h-screen bg-white pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* HERO */}

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="up">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#B88A3B]/30 bg-white px-4 py-2 text-[10px] font-black tracking-[0.22em] text-[#B88A3B]">
                <Zap className="h-3.5 w-3.5" />
                ENGINEERED FOR POWER
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#101D32] sm:text-5xl lg:text-6xl">
                Our Product
                <span className="mt-2 block text-[#B88A3B]">
                  Collection.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#192B46]/65">
                Discover dependable power protection and energy
                solutions from Susheen Techno Power Systems.
                Explore our range of UPS systems, batteries,
                inverters and voltage stabilizers.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#101D32]/10 bg-white px-4 py-3 text-xs font-bold text-[#192B46]">
                  <ShieldCheck className="h-4 w-4 text-[#B88A3B]" />
                  Quality Solutions
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#101D32]/10 bg-white px-4 py-3 text-xs font-bold text-[#192B46]">
                  <Zap className="h-4 w-4 text-[#B88A3B]" />
                  Reliable Performance
                </div>
              </div>

              <div className="mt-9 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101D32] text-[#E8D5A3]">
                  <Package className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-extrabold text-[#101D32]">
                    Explore Our Solutions
                  </p>

                  <p className="text-xs text-[#192B46]/55">
                    Find the right power product for your needs
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="scale" delay="delay-2">
            <ProductPowerVisual />
          </Reveal>
        </div>

        {/* CATALOGUE HEADING */}

        <Reveal variant="up">
          <div className="mb-8 mt-20">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#B88A3B]">
              Browse Our Catalogue
            </span>

            <h2 className="mt-2 text-2xl font-black text-[#101D32] sm:text-3xl">
              Find Your Power Solution
            </h2>

            <p className="mt-2 text-sm text-[#192B46]/60">
              Choose a main category to view all its available products.
            </p>
          </div>
        </Reveal>

        {/* SEARCH */}

        <div className="mb-8 rounded-2xl border border-[#101D32]/10 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B88A3B]" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name, category or capacity..."
              aria-label="Search products"
              className="w-full rounded-xl border border-[#101D32]/15 bg-white py-3.5 pl-11 pr-11 text-sm text-[#101D32] outline-none transition focus:border-[#B88A3B] focus:ring-2 focus:ring-[#B88A3B]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#192B46]/50 hover:bg-[#E8D5A3]/30"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* SIDEBAR + PRODUCTS */}

               {/* SIDEBAR + PRODUCTS */}

        {/* MOBILE CATEGORY BUTTON */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileCategoriesOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border border-[#101D32]/10 bg-white px-4 py-3.5 text-sm font-extrabold text-[#101D32] shadow-sm"
            aria-expanded={mobileCategoriesOpen}
            aria-controls="mobile-product-categories"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#B88A3B]" />
              Categories
            </span>

            <span className="flex items-center gap-2 text-xs font-bold text-[#B88A3B]">
              {selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* MOBILE SLIDE-OUT CATEGORY DRAWER */}
        {mobileCategoriesOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Background overlay */}
            <button
              type="button"
              aria-label="Close categories menu"
              onClick={() => setMobileCategoriesOpen(false)}
              className="absolute inset-0 bg-[#101D32]/60"
            />

            {/* Slide-out panel */}
            <aside
              id="mobile-product-categories"
              className="absolute left-0 top-0 flex h-full w-[min(88vw,360px)] flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between bg-[#101D32] px-5 py-4">
                <div className="flex items-center gap-2 text-[#E8D5A3]">
                  <SlidersHorizontal className="h-4 w-4" />

                  <h3 className="text-sm font-black uppercase tracking-wider">
                    Product Categories
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileCategoriesOpen(false)}
                  aria-label="Close categories"
                  className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                {categoryButtons}
              </div>
            </aside>
          </div>
        )}

        {/* DESKTOP SIDEBAR + PRODUCT AREA */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[290px_minmax(0,1fr)]">

          {/* DESKTOP LEFT SIDEBAR */}
          <aside className="hidden overflow-hidden rounded-2xl border border-[#101D32]/10 bg-white shadow-sm lg:sticky lg:top-28 lg:block">
            <div className="bg-[#101D32] px-5 py-4">
              <div className="flex items-center gap-2 text-[#E8D5A3]">
                <SlidersHorizontal className="h-4 w-4" />

                <h3 className="text-sm font-black uppercase tracking-wider">
                  Product Categories
                </h3>
              </div>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-3">
              {categoryButtons}
            </div>
          </aside>



          {/* RIGHT PRODUCT AREA */}

          <section className="min-w-0">
            <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#101D32]/15 pb-5 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#B88A3B]" />

                  <h3 className="text-lg font-extrabold text-[#101D32]">
                    {selectedCategory === "All"
                      ? "All Products"
                      : selectedCategory}
                  </h3>
                </div>

                <p className="mt-1 text-xs text-[#192B46]/55">
                  {loading
                    ? "Loading products..."
                    : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""
                    } found`}
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B88A3B] hover:text-[#101D32]"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* LOADING */}

            {loading && (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-[#101D32]/10"
                  >
                    <div className="h-48 animate-pulse bg-[#EAE6DD]" />

                    <div className="space-y-3 p-5">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-[#EAE6DD]" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-[#EAE6DD]" />
                      <div className="h-9 animate-pulse rounded bg-[#EAE6DD]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 p-8 text-center">
                <AlertCircle className="mx-auto h-10 w-10 text-red-500" />

                <h3 className="mt-4 text-xl font-bold text-[#101D32]">
                  Unable to Load Products
                </h3>

                <p className="mt-3 break-words text-sm text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => setRefresh((value) => value + 1)}
                  className="mt-6 rounded-lg bg-[#101D32] px-7 py-3 text-sm font-bold text-[#E8D5A3]"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* EMPTY */}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-[#101D32]/10 px-6 py-16 text-center">
                <Search className="mx-auto h-9 w-9 text-[#B88A3B]" />

                <h3 className="mt-5 text-xl font-extrabold text-[#101D32]">
                  No Products Found
                </h3>

                <p className="mt-3 text-sm text-[#192B46]/60">
                  There are no products matching this selection in your product database yet.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-lg bg-[#101D32] px-7 py-3 text-sm font-bold text-[#E8D5A3]"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* PRODUCT CARDS */}

           {/* PRODUCT CARDS */}

{!loading && !error && filteredProducts.length > 0 && (
  selectedCategory === "Stabilizers" || selectedCategory === "UPS" ? (
    <div className="space-y-10">
      {catalogue
        .find((item) => item.name === selectedCategory)
        ?.subcategories
        .filter((subcategory) => subcategory.products.length > 0)
        .map((subcategory) => {
          const groupProducts = filteredProducts.filter(
            (product) =>
              normalizeName(product.subcategory) ===
                normalizeName(subcategory.name) ||
              subcategory.products.some((name) =>
                productMatchesName(product, name)
              )
          );

          if (groupProducts.length === 0) return null;

          return (
            <section key={subcategory.name}>
              <div className="mb-5 border-b border-[#B88A3B]/30 pb-3">
                <h4 className="text-xl font-black text-[#101D32]">
                  {subcategory.name}
                </h4>

                <p className="mt-1 text-xs text-[#192B46]/55">
                  {groupProducts.length} product
                  {groupProducts.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {groupProducts.map((product, i) => (
                  <Reveal
                    key={product.id}
                    delay={`delay-${(i % 4) + 1}`}
                    variant="up"
                  >
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
    </div>
  ) : (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {filteredProducts.map((product, i) => (
        <Reveal
          key={product.id}
          delay={`delay-${(i % 4) + 1}`}
          variant="up"
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  )
)}

          </section>
        </div>

        {/* BOTTOM CTA */}

        {!loading && !error && (
          <Reveal variant="up">
            <div className="mt-20 overflow-hidden rounded-3xl bg-[#101D32] p-8 text-center sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E8D5A3]/30 bg-[#192B46]">
                <ShieldCheck className="h-7 w-7 text-[#E8D5A3]" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-white sm:text-3xl">
                Need Help Choosing the Right Product?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60">
                Our team can help you identify a suitable power solution
                based on your application and requirements.
                Get in touch with Susheen Techno Power Systems.
              </p>

              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#E8D5A3] px-7 py-3.5 text-sm font-extrabold text-[#101D32] transition-all hover:-translate-y-1 hover:bg-white"
              >
                Contact Our Team
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        )}
      </div>

      {/* ANIMATION STYLES */}

      <style>{`
        .product-energy-ring {
          animation: productRingRotate 18s linear infinite;
        }

        .product-energy-ring-reverse {
          animation: productRingRotate 13s linear infinite reverse;
        }

        .product-power-core {
          animation: productCoreFloat 4s ease-in-out infinite;
        }

        .product-charge-icon {
          animation: productChargePulse 2s ease-in-out infinite;
        }

        .product-node {
          position: absolute;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 15px;
          border: 1px solid rgba(232, 213, 163, 0.3);
          border-radius: 14px;
          background: rgba(25, 43, 70, 0.94);
          color: white;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          white-space: nowrap;
          animation: productNodeFloat 4s ease-in-out infinite;
        }

        .product-node-one {
          top: 16%;
          left: 5%;
        }

        .product-node-two {
          right: 4%;
          top: 43%;
          animation-delay: 0.8s;
        }

        .product-node-three {
          bottom: 15%;
          left: 9%;
          animation-delay: 1.5s;
        }

        .product-energy-pulse {
          animation: productEnergyPulse 2.5s ease-in-out infinite;
        }

        .product-spark {
          animation: productSpark 2s ease-in-out infinite;
        }

        .product-spark-two {
          animation-delay: 1s;
        }

        @keyframes productRingRotate {
          to { transform: rotate(360deg); }
        }

        @keyframes productCoreFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        @keyframes productChargePulse {
          0%, 100% {
            opacity: 0.65;
            filter: drop-shadow(0 0 2px #E8D5A3);
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 12px #E8D5A3);
          }
        }

        @keyframes productNodeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes productEnergyPulse {
          0%, 100% {
            opacity: 0.25;
            transform: translateX(-50%) scaleX(0.65);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scaleX(1);
          }
        }

        @keyframes productSpark {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @media (max-width: 480px) {
          .product-showcase {
            min-height: 310px;
          }

          .product-energy-ring {
            width: 210px;
            height: 210px;
          }

          .product-energy-ring-reverse {
            width: 165px;
            height: 165px;
          }

          .product-node {
            padding: 9px 10px;
            gap: 6px;
            font-size: 8px;
          }

          .product-node-one { left: 2%; }
          .product-node-two { right: 2%; }
          .product-node-three { left: 3%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .product-energy-ring,
          .product-energy-ring-reverse,
          .product-power-core,
          .product-charge-icon,
          .product-node,
          .product-energy-pulse,
          .product-spark {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
