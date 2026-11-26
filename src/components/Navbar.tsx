
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Phone, ArrowRight } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { useRouter } from "@/lib/router";
import { useCart } from "@/lib/cart";

export function Navbar() {
  const { path, navigate } = useRouter();
  const { totalQuantity, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  const isActive = (linkPath: string) =>
    path.split("?")[0] === linkPath;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(16,29,50,0.12)]"
        : "bg-white shadow-[0_3px_15px_rgba(16,29,50,0.05)]"
        }`}
    >
      {/* PREMIUM TOP CONTACT BAR */}
      <div className="hidden md:block bg-[#101D32] text-[#F7F5F0]">
        <div className="max-w-[1440px] mx-auto px-8 h-10 flex items-center justify-between text-xs tracking-wide">

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 text-[#E8D5A3] font-semibold">
              <Phone className="w-3.5 h-3.5" />
              {site.mobile}
            </span>

            <span className="text-white/25">|</span>

            <span className="text-white/75">
              {site.landline}
            </span>
          </div>

          <div className="flex items-center gap-5 text-white/75">
            <a
              href={`mailto:${site.emails[0]}`}
              className="hover:text-[#E8D5A3] transition-colors"
            >
              {site.emails[0]}
            </a>

            <span className="text-white/25">|</span>

            <span className="text-[#E8D5A3] font-medium">
              {site.website}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-10 h-[88px] flex items-center justify-between gap-5">

        {/* PREMIUM BRAND LOGO */}
        <button
          onClick={() => go("/")}
          className="flex items-center gap-4 group shrink-0 text-left"
          aria-label="Go to homepage"
        >
          {/* Logo badge */}
          {/* Logo badge */}
          <span className="relative w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white group-hover:scale-105 transition-transform duration-300">
            <img
              src="/stps-logo.png"
              alt="Susheen Techno Power Systems Logo"
              className="w-[118%] h-[118%] max-w-none object-cover rounded-full"
            />
          </span>

          {/* Brand name */}
          <span className="flex flex-col items-start justify-center leading-tight">
            <span className="text-[#101D32] font-extrabold text-lg sm:text-xl lg:text-[22px] tracking-tight">
              Susheen Techno
            </span>

            <span className="text-[#B88A3B] text-[11px] sm:text-xs font-bold tracking-[0.20em] uppercase mt-1">
              Power Systems
            </span>

            <span className="text-[#192B46]/65 text-[9px] sm:text-[10px] font-semibold tracking-[0.17em] uppercase mt-1.5">
              House of Power Devices
            </span>
          </span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`relative px-3 xl:px-4 py-4 text-[13px] xl:text-sm font-bold tracking-wide transition-colors duration-200 ${isActive(link.path)
                ? "text-[#B88A3B]"
                : "text-[#192B46] hover:text-[#B88A3B]"
                }`}
            >
              {link.label}

              <span
                className={`absolute bottom-2 left-4 right-4 h-[2px] rounded-full bg-[#B88A3B] transition-transform duration-300 origin-left ${isActive(link.path)
                  ? "scale-x-100"
                  : "scale-x-0"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* CART AND MOBILE MENU */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Shopping cart */}
          <button
            onClick={() => setOpen(true)}
            className="relative w-12 h-12 rounded-xl bg-[#101D32] text-[#E8D5A3] border border-[#B88A3B]/40 flex items-center justify-center hover:bg-[#192B46] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />

            {totalQuantity > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#B88A3B] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#F7F5F0]">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-12 h-12 rounded-xl border border-[#B88A3B]/40 bg-white text-[#101D32] flex items-center justify-center hover:bg-[#101D32] hover:text-[#E8D5A3] transition-all duration-300"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${menuOpen
          ? "max-h-[520px] border-t border-[#B88A3B]/25 shadow-xl"
          : "max-h-0"
          }`}
      >
        <div className="px-5 py-5 flex flex-col gap-1 max-w-7xl mx-auto">

          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`text-left px-4 py-3.5 rounded-lg text-sm font-bold transition-all ${isActive(link.path)
                ? "text-[#B88A3B] bg-[#101D32]/[0.06] border-l-[3px] border-[#B88A3B]"
                : "text-[#192B46] hover:bg-[#101D32]/[0.04]"
                }`}
            >
              {link.label}
            </button>
          ))}

          {/* Mobile contact details */}
          <div className="mt-3 pt-4 border-t border-[#101D32]/10 flex flex-col gap-3 text-xs text-[#192B46]/75">

            <a
              href={`tel:${site.mobile}`}
              className="flex items-center gap-3 hover:text-[#B88A3B] transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-[#101D32] flex items-center justify-center text-[#E8D5A3]">
                <Phone className="w-3.5 h-3.5" />
              </span>
              {site.mobile}
            </a>

            <a
              href={`mailto:${site.emails[0]}`}
              className="flex items-center gap-3 hover:text-[#B88A3B] transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-[#101D32] flex items-center justify-center text-[#E8D5A3]">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              {site.emails[0]}
            </a>

          </div>
        </div>
      </div>
    </header>
  );
}
