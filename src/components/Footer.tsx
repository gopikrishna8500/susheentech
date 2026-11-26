
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { site, navLinks } from "@/lib/site";
import { useRouter } from "@/lib/router";

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative bg-[#101D32] text-slate-300 overflow-hidden">

      {/* Gold Accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#101D32] via-[#B88A3B] to-[#E8D5A3]" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Company Information */}
          <div className="space-y-6">


            {/* Actual Company Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left group"
              aria-label="Susheen Techno Power Systems home"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/stps-logo.png"
                  alt="Susheen Techno Power Systems Logo"
                  className="w-[118%] h-[118%] max-w-none object-cover rounded-full"
                />
              </div>

              <span className="flex flex-col leading-tight">
                <span className="text-white font-extrabold text-lg tracking-tight">
                  Susheen Techno
                </span>
                <span className="text-[#E8D5A3] text-[11px] font-bold tracking-[0.2em] uppercase mt-1">
                  Power Systems
                </span>
              </span>
            </button>
            <p className="text-sm text-slate-400 leading-7 max-w-xs">
              {site.tagline}. Your trusted source for UPS,
              batteries, inverters, and voltage stabilizers
              in Secunderabad.
            </p>

            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-[#E8D5A3] text-sm font-semibold hover:bg-white/10 hover:border-[#B88A3B]/50 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.16em] mb-6">
              Explore
            </h4>

            <div className="w-10 h-[2px] bg-[#B88A3B] mb-6" />

            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#E8D5A3] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A3B]/60 group-hover:bg-[#E8D5A3] transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.16em] mb-6">
              Our Products
            </h4>

            <div className="w-10 h-[2px] bg-[#B88A3B] mb-6" />

            <ul className="space-y-4">
              {site.categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() =>
                      navigate(
                        `/products?category=${encodeURIComponent(category)}`
                      )
                    }
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#E8D5A3] transition-colors text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A3B]/60 group-hover:bg-[#E8D5A3] transition-colors" />
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.16em] mb-6">
              Get In Touch
            </h4>

            <div className="w-10 h-[2px] bg-[#B88A3B] mb-6" />

            <ul className="space-y-5">

              {/* Address */}
              <li className="group flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#101D32] border border-[#B88A3B]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5F0E5] transition-all duration-300">
                  <MapPin className="w-4 h-4 text-[#E8D5A3] group-hover:text-[#B88A3B] transition-colors duration-300" />
                </div>

                <div>
                  <p className="text-white text-xs font-bold mb-1">
                    Our Address
                  </p>
                  <p className="text-slate-400 text-sm leading-6">
                    {site.address}
                  </p>
                </div>
              </li>

              {/* Phone */}
              <li className="group flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#101D32] border border-[#B88A3B]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5F0E5] transition-all duration-300">
                  <Phone className="w-4 h-4 text-[#E8D5A3] group-hover:text-[#B88A3B] transition-colors duration-300" />
                </div>

                <div className="min-w-0">
                  <p className="text-white text-xs font-bold mb-1">
                    Phone Numbers
                  </p>

                  <p className="text-slate-400 text-sm leading-6 break-words">
                    Mobile: {site.mobile}
                  </p>

                  <p className="text-slate-400 text-sm leading-6 break-words">
                    Landline: {site.landline}
                  </p>
                </div>
              </li>

              {/* Email */}
              <li className="group flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#101D32] border border-[#B88A3B]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5F0E5] transition-all duration-300">
                  <Mail className="w-4 h-4 text-[#E8D5A3] group-hover:text-[#B88A3B] transition-colors duration-300" />
                </div>

                <div className="min-w-0">
                  <p className="text-white text-xs font-bold mb-1">
                    Email Address
                  </p>

                  {site.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-slate-400 text-sm leading-6 break-all hover:text-[#E8D5A3] transition-colors"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </li>

              {/* Website */}
              <li className="group flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#101D32] border border-[#B88A3B]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5F0E5] transition-all duration-300">
                  <Globe className="w-4 h-4 text-[#E8D5A3] group-hover:text-[#B88A3B] transition-colors duration-300" />
                </div>

                <div>
                  <p className="text-white text-xs font-bold mb-1">
                    Website
                  </p>

                  <a
                    href={
                      site.website.startsWith("http")
                        ? site.website
                        : `https://${site.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 text-sm hover:text-[#E8D5A3] transition-colors break-all"
                  >
                    {site.website}
                  </a>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-[#0C1729]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-300 font-semibold">
              {site.business}
            </span>
            . All rights reserved.
          </p>

          <p className="text-xs text-slate-500 text-center">
            Proprietor:{" "}
            <span className="text-[#E8D5A3] font-semibold">
              {site.owner}
            </span>
          </p>

          <button
            onClick={() => navigate("/")}
            className="text-xs text-slate-500 hover:text-[#E8D5A3] transition-colors"
          >
            Back to Home ↑
          </button>

        </div>
      </div>
    </footer>
  );
}
