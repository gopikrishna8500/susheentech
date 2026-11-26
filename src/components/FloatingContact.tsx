
import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingContact() {
  return (
    <div className="fixed right-5 bottom-6 z-[100] flex flex-col gap-3">

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#168B55] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Call */}
      <a
        href={`tel:${site.mobile}`}
        aria-label="Call Susheen Techno Power Systems"
        className="w-14 h-14 rounded-full bg-[#101D32] text-[#E8D5A3] border border-[#B88A3B]/60 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#192B46] transition-all duration-300"
      >
        <Phone className="w-6 h-6" />
      </a>

    </div>
  );
}
