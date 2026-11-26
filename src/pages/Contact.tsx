
import { useState, type FormEvent } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Clock,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Headset,
  Building2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { site } from "@/lib/site";
import { Reveal } from "@/lib/useReveal";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");

 
const submit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (status === "submitting") return;

  setStatus("submitting");
  setError("");

  const payload = {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    message: form.message.trim(),
  };

  try {
    // STEP 1: Save contact message in Supabase
    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert(payload);

    if (insertError) {
      console.error("Contact database insert error:", insertError);
      throw insertError;
    }

    // STEP 2: Send notification emails
    // Email failure will not undo the saved contact message.
    try {
      const { data: emailResult, error: emailError } =
        await supabase.functions.invoke("send-stps-notification", {
          body: {
            event_type: "contact",
            customer_name: payload.name,
            customer_email: payload.email,
            customer_phone: payload.phone,
            company: "Not provided",
            address: "Not provided",
            items: [],
            total_amount: 0,
            notes: payload.message,
          },
        });

      if (emailError) {
        console.error("Contact email notification failed:", emailError);
      } else if (!emailResult?.success) {
        console.error(
          "Contact email notification was not successful:",
          emailResult
        );
      } else {
        console.log("Contact notification emails sent successfully.");
      }
    } catch (emailErr) {
      console.error("Contact email notification error:", emailErr);
    }

    // STEP 3: Show success and clear form
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setStatus("success");

  } catch (err) {
    console.error("Contact submission failed:", err);

    setStatus("error");

    setError(
      err instanceof Error
        ? err.message
        : "Could not send your message. Please call or WhatsApp us."
    );
  }
};

  const contactDetails = [
    {
      icon: MapPin,
      label: "Visit Our Office",
      value: site.address,
      number: "01",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: `Mobile: ${site.mobile}\nLandline: ${site.landline}`,
      number: "02",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: site.emails.join("\n"),
      number: "03",
    },
    {
      icon: Globe,
      label: "Website",
      value: site.website,
      number: "04",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday – Saturday\n9:30 AM – 7:00 PM",
      number: "05",
    },
  ];

  return (
    <div className="contact-page min-h-screen bg-white pt-28 pb-20 overflow-hidden">

      <style>{`
        @keyframes contactFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes contactPulse {
          0%, 100% {
            opacity: .3;
            transform: scale(.96);
          }
          50% {
            opacity: .7;
            transform: scale(1.04);
          }
        }

        @keyframes contactShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes contactSlideUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contactGlow {
          0%, 100% { opacity: .2; }
          50% { opacity: .55; }
        }

        .contact-float {
          animation: contactFloat 7s ease-in-out infinite;
        }

        .contact-pulse {
          animation: contactPulse 6s ease-in-out infinite;
        }

        .contact-shimmer {
          background-size: 200% auto;
          animation: contactShimmer 5s linear infinite;
        }

        .contact-slide-up {
          animation: contactSlideUp .7s ease both;
        }

        .contact-glow {
          animation: contactGlow 5s ease-in-out infinite;
        }

        /* ALTERNATING CONTACT CARDS */

        .contact-info-card {
          position: relative;
          overflow: hidden;
          transform: translateY(0);
          transition:
            background-color .45s ease,
            color .45s ease,
            transform .45s cubic-bezier(.2,.8,.2,1),
            box-shadow .45s ease,
            border-color .4s ease;
        }

        /* NAVY CARD */

        .contact-info-card.is-navy {
          background: #101D32;
          border: 1px solid rgba(217,196,154,.25);
          color: #FFFFFF;
        }

        .contact-info-card.is-navy:hover {
          background: #F7F5F0;
          border-color: #D9C49A;
          transform: translateY(-7px);
          box-shadow: 0 20px 45px rgba(16,29,50,.13);
        }

        /* WHITE CARD */

        .contact-info-card.is-white {
          background: #FFFFFF;
          border: 1px solid #E5DED0;
          color: #101D32;
          box-shadow: 0 5px 18px rgba(16,29,50,.035);
        }

        .contact-info-card.is-white:hover {
          background: #101D32;
          border-color: rgba(217,196,154,.5);
          color: #FFFFFF;
          transform: translateY(-7px);
          box-shadow: 0 20px 45px rgba(16,29,50,.16);
        }

        /* CARD ICONS */

        .contact-info-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .4s ease;
        }

        .is-navy .contact-info-icon {
          background: rgba(232,213,163,.12);
          border: 1px solid rgba(232,213,163,.3);
          color: #E8D5A3;
        }

        .is-navy:hover .contact-info-icon {
          background: #101D32;
          border-color: #101D32;
          color: #E8D5A3;
          transform: rotate(-7deg) scale(1.08);
        }

        .is-white .contact-info-icon {
          background: #F7F5F0;
          border: 1px solid #E8D5A3;
          color: #B88A3B;
        }

        .is-white:hover .contact-info-icon {
          background: rgba(232,213,163,.12);
          border-color: rgba(232,213,163,.4);
          color: #E8D5A3;
          transform: rotate(-7deg) scale(1.08);
        }

        /* CARD TEXT */

        .contact-info-label {
          transition: color .4s ease;
        }

        .is-navy .contact-info-label {
          color: #E8D5A3;
        }

        .is-navy:hover .contact-info-label {
          color: #B88A3B;
        }

        .is-white .contact-info-label {
          color: #B88A3B;
        }

        .is-white:hover .contact-info-label {
          color: #E8D5A3;
        }

        .contact-info-value {
          transition: color .4s ease;
        }

        .is-navy .contact-info-value {
          color: #FFFFFF;
        }

        .is-navy:hover .contact-info-value {
          color: #101D32;
        }

        .is-white .contact-info-value {
          color: #101D32;
        }

        .is-white:hover .contact-info-value {
          color: #FFFFFF;
        }

        .contact-info-number {
          transition: color .4s ease;
        }

        .is-navy .contact-info-number {
          color: rgba(232,213,163,.55);
        }

        .is-navy:hover .contact-info-number {
          color: #B88A3B;
        }

        .is-white .contact-info-number {
          color: #B88A3B;
        }

        .is-white:hover .contact-info-number {
          color: rgba(232,213,163,.7);
        }

        /* CARD DECORATION */

        .contact-card-decoration {
          position: absolute;
          top: 0;
          right: 0;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          pointer-events: none;
          transition: opacity .4s ease;
        }

        .is-navy .contact-card-decoration {
          background: rgba(232,213,163,.06);
          filter: blur(25px);
        }

        .is-white .contact-card-decoration {
          background: rgba(184,138,59,.08);
          filter: blur(28px);
        }

        /* CONTACT FORM */

        .contact-form-panel {
          background: #101D32;
          border: 1px solid rgba(217,196,154,.25);
          transition:
            border-color .45s ease,
            box-shadow .45s ease;
        }

        .contact-input {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(232,213,163,.2);
          color: #FFFFFF;
          transition: all .3s ease;
        }

        .contact-input::placeholder {
          color: #94A0B2;
        }

        .contact-input:focus {
          background: rgba(255,255,255,.1);
          border-color: #E8D5A3;
          box-shadow: 0 0 0 3px rgba(232,213,163,.1);
          outline: none;
        }

        .contact-input option {
          color: #101D32;
          background: #FFFFFF;
        }

        .contact-form-button {
          transition: all .35s ease;
        }

        .contact-form-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(232,213,163,.15);
        }

        .contact-map {
          transition: all .5s ease;
        }

        .contact-map:hover {
          border-color: #D9C49A;
          box-shadow: 0 24px 55px rgba(16,29,50,.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-float,
          .contact-pulse,
          .contact-shimmer,
          .contact-slide-up,
          .contact-glow {
            animation: none !important;
          }

          .contact-info-card,
          .contact-form-panel,
          .contact-map {
            transition: none !important;
          }

/* CONTACT COMMUNICATION NETWORK */

.contact-network {
  isolation: isolate;
}

.contact-network-glow {
  animation: networkGlow 5s ease-in-out infinite;
}

@keyframes networkGlow {
  0%, 100% {
    opacity: .35;
    transform: scale(.9);
  }
  50% {
    opacity: .8;
    transform: scale(1.12);
  }
}

/* Orbit rings */

.contact-network-ring {
  position: absolute;
  border: 1px solid rgba(184,138,59,.35);
  border-radius: 50%;
  pointer-events: none;
}

.contact-ring-one {
  width: 94%;
  height: 94%;
  border-style: dashed;
  animation: networkRotate 35s linear infinite;
}

.contact-ring-two {
  width: 76%;
  height: 76%;
  border-color: rgba(184,138,59,.45);
  animation: networkRotateReverse 24s linear infinite;
}

.contact-ring-three {
  width: 59%;
  height: 59%;
  border-style: dotted;
  border-color: rgba(16,29,50,.25);
  animation: networkRotate 18s linear infinite;
}

@keyframes networkRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes networkRotateReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

/* Central hub */

.contact-network-core {
  animation: networkCoreFloat 5s ease-in-out infinite;
}

@keyframes networkCoreFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.contact-message-icon {
  animation: messagePulse 3s ease-in-out infinite;
  filter: drop-shadow(0 0 12px rgba(232,213,163,.35));
}

@keyframes messagePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

/* Communication nodes */

.contact-network-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  animation: networkNodeFloat 5s ease-in-out infinite;
}

.contact-network-node span {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .18em;
  color: #101D32;
}

.contact-node-icon {
  width: 53px;
  height: 53px;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B88A3B;
  background: rgba(255,255,255,.95);
  border: 1px solid #D9C49A;
  box-shadow: 0 10px 30px rgba(16,29,50,.12);
  transition: all .35s ease;
}

.contact-network-node:hover .contact-node-icon {
  transform: translateY(-5px) rotate(-8deg);
  background: #101D32;
  color: #E8D5A3;
  box-shadow: 0 15px 35px rgba(16,29,50,.2);
}

.contact-node-email {
  animation-delay: -1.2s;
}

.contact-node-location {
  animation-delay: -2.4s;
}

.contact-node-web {
  animation-delay: -3.6s;
}

@keyframes networkNodeFloat {
  0%, 100% { margin-top: 0; }
  50% { margin-top: -8px; }
}

/* Connecting lines */

.contact-network-line {
  animation: networkLineFlow 3s linear infinite;
}

@keyframes networkLineFlow {
  to {
    stroke-dashoffset: -48;
  }
}

/* Floating particles */

.contact-network-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #B88A3B;
  box-shadow: 0 0 15px rgba(184,138,59,.65);
  animation: networkParticle 4s ease-in-out infinite;
  pointer-events: none;
}

.particle-one {
  top: 22%;
  left: 23%;
}

.particle-two {
  top: 27%;
  right: 20%;
  animation-delay: -1s;
}

.particle-three {
  bottom: 24%;
  left: 21%;
  animation-delay: -2s;
}

.particle-four {
  bottom: 21%;
  right: 23%;
  animation-delay: -3s;
}

@keyframes networkParticle {
  0%, 100% {
    opacity: .3;
    transform: scale(.7);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* Mobile adjustments */

@media (max-width: 480px) {
  .contact-network-node .contact-node-icon {
    width: 43px;
    height: 43px;
    border-radius: 14px;
  }

  .contact-network-node span {
    font-size: 8px;
  }
}

/* Accessibility */

@media (prefers-reduced-motion: reduce) {
  .contact-network *,
  .contact-network *::before,
  .contact-network *::after {
    animation: none !important;
    transition: none !important;
  }
}

        }
      `}</style>

      {/* PREMIUM HERO */}

      <section className="relative max-w-7xl mx-auto px-6 pt-10 md:pt-16 pb-12">

        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#E8D5A3]/20 blur-[110px] pointer-events-none contact-pulse" />

        <div className="relative grid lg:grid-cols-[1.2fr_.8fr] gap-12 lg:gap-16 items-center">

          <Reveal variant="left">
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#E8E3D9] shadow-sm mb-7">
                <Sparkles className="w-4 h-4 text-[#B88A3B]" />
                <span className="text-[#101D32] text-[10px] md:text-xs font-bold tracking-[.22em] uppercase">
                  Contact STPS
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-bold text-[#101D32] leading-[1.12] tracking-tight">
                Let's Talk
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B88A3B] via-[#D5B875] to-[#A67B32] contact-shimmer">
                  Power Solutions.
                </span>
              </h1>

              <p className="mt-7 text-[#687386] text-base md:text-lg leading-8 max-w-2xl">
                Have a question, need a quotation, or looking for a
                reliable power backup solution? Our team is here to help.
                Get in touch with Susheen Techno Power Systems.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">

                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#101D32] text-[#E8D5A3] font-semibold text-sm shadow-lg hover:bg-[#192B46] hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`tel:${site.mobile}`}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-white border border-[#E5DED0] text-[#101D32] font-semibold text-sm hover:border-[#B88A3B] hover:bg-[#FBF9F4] transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[#B88A3B]" />
                  Call Our Team
                </a>

              </div>

              <div className="flex items-center gap-3 mt-10">

                <div className="flex -space-x-2">
                  {[Phone, Mail, Headset].map((Icon, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full bg-[#101D32] border-2 border-[#F7F5F0] flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4 text-[#E8D5A3]" />
                    </div>
                  ))}
                </div>

                <span className="text-xs font-medium text-[#687386]">
                  Consultation · Enquiries · Support
                </span>

              </div>

            </div>
          </Reveal>

          {/* HERO VISUAL */}


          {/* CONTACT COMMUNICATION NETWORK VISUAL */}

          <Reveal variant="scale">
            <div className="contact-network relative max-w-md mx-auto w-full aspect-square flex items-center justify-center">

              {/* Background glow */}
              <div className="absolute w-[75%] h-[75%] rounded-full bg-[#D9C49A]/30 blur-[80px] contact-network-glow" />

              {/* Outer rings */}
              <div className="contact-network-ring contact-ring-one" />
              <div className="contact-network-ring contact-ring-two" />
              <div className="contact-network-ring contact-ring-three" />

              {/* Connecting lines */}
              <svg
                viewBox="0 0 500 500"
                className="absolute inset-0 w-full h-full pointer-events-none"
                fill="none"
              >
                <path
                  d="M250 250 L250 75"
                  stroke="#B88A3B"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="contact-network-line"
                />
                <path
                  d="M250 250 L425 250"
                  stroke="#B88A3B"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="contact-network-line"
                />
                <path
                  d="M250 250 L250 425"
                  stroke="#B88A3B"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="contact-network-line"
                />
                <path
                  d="M250 250 L75 250"
                  stroke="#B88A3B"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="contact-network-line"
                />
              </svg>

              {/* Central communication hub */}
              <div className="contact-network-core relative z-20 w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] bg-[#101D32] border border-[#D9C49A]/60 shadow-[0_25px_65px_rgba(16,29,50,.25)] flex flex-col items-center justify-center">

                <div className="absolute inset-2 rounded-[2rem] border border-[#E8D5A3]/15" />

                <div className="absolute w-24 h-24 rounded-full bg-[#B88A3B]/15 blur-2xl" />

                <MessageCircle className="relative w-14 h-14 md:w-16 md:h-16 text-[#E8D5A3] contact-message-icon" />

                <span className="relative text-[9px] tracking-[.25em] font-bold text-white/70 mt-3">
                  LET'S CONNECT
                </span>
              </div>

              {/* Phone node */}
              <div className="contact-network-node contact-node-phone absolute top-[5%] left-1/2 -translate-x-1/2 z-30">
                <div className="contact-node-icon">
                  <Phone className="w-6 h-6" />
                </div>
                <span>CALL</span>
              </div>

              {/* Email node */}
              <div className="contact-network-node contact-node-email absolute right-[-1%] top-1/2 -translate-y-1/2 z-30">
                <div className="contact-node-icon">
                  <Mail className="w-6 h-6" />
                </div>
                <span>EMAIL</span>
              </div>

              {/* Location node */}
              <div className="contact-network-node contact-node-location absolute bottom-[5%] left-1/2 -translate-x-1/2 z-30">
                <div className="contact-node-icon">
                  <MapPin className="w-6 h-6" />
                </div>
                <span>VISIT US</span>
              </div>

              {/* Website node */}
              <div className="contact-network-node contact-node-web absolute left-[-1%] top-1/2 -translate-y-1/2 z-30">
                <div className="contact-node-icon">
                  <Globe className="w-6 h-6" />
                </div>
                <span>ONLINE</span>
              </div>

              {/* Floating connection particles */}
              <span className="contact-network-particle particle-one" />
              <span className="contact-network-particle particle-two" />
              <span className="contact-network-particle particle-three" />
              <span className="contact-network-particle particle-four" />

            </div>
          </Reveal>

        </div>
      </section>

      {/* CONTACT INFORMATION AND FORM */}

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">

        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl border border-[#D9C49A]/30 bg-[#101D32] p-7 md:p-10 mb-12 transition-all duration-500 hover:bg-white hover:border-[#D9C49A] hover:shadow-xl hover:-translate-y-1">

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              <div>
                <span className="inline-flex items-center gap-2 text-[#E8D5A3] group-hover:text-[#B88A3B] text-xs font-bold tracking-[.22em] uppercase transition-colors duration-500">
                  <span className="w-8 h-px bg-[#E8D5A3] group-hover:bg-[#B88A3B] transition-colors duration-500" />
                  Get in Touch
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#101D32] mt-4 tracking-tight transition-colors duration-500">
                  Let's Connect.
                </h2>

                <p className="text-slate-300 group-hover:text-[#687386] text-sm mt-3 transition-colors duration-500">
                  We are ready to understand your power requirements.
                </p>
              </div>

              <p className="text-sm text-slate-300 group-hover:text-[#687386] max-w-md leading-7 transition-colors duration-500">
                Reach our team through phone, email, WhatsApp or
                the enquiry form. We look forward to assisting you.
              </p>

            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

          {/* LEFT CONTACT INFORMATION */}

          <Reveal variant="left" className="lg:col-span-2">

            <div className="mb-7">
              <span className="text-[#B88A3B] text-xs font-bold tracking-[.2em] uppercase">
                Our Details
              </span>

              <h2 className="text-2xl md:text-3xl font-bold text-[#101D32] mt-2">
                Contact Information
              </h2>

              <p className="text-[#687386] text-sm leading-7 mt-3">
                Choose the most convenient way to connect with us.
                Our team is ready to assist.
              </p>
            </div>

            <div className="space-y-4">

              {contactDetails.map((c, i) => {
                const isNavy = i % 2 === 0;

                return (
                  <div
                    key={c.label}
                    className={`contact-info-card ${isNavy ? "is-navy" : "is-white"
                      } group flex gap-4 rounded-2xl p-5 contact-slide-up`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >

                    <div className="contact-card-decoration" />

                    <div className="contact-info-icon">
                      <c.icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 relative flex-1">

                      <div className="flex items-center justify-between gap-2">

                        <p className="contact-info-label text-xs uppercase tracking-widest font-bold">
                          {c.label}
                        </p>

                        <span className="contact-info-number text-[10px] font-bold tracking-widest">
                          {c.number}
                        </span>

                      </div>

                      <p className="contact-info-value text-sm mt-2 whitespace-pre-line leading-6 break-words">
                        {c.value}
                      </p>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* WHATSAPP BUTTON */}

            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 mt-5 py-4 px-5 rounded-2xl bg-white border border-[#D9C49A]/30 text-[#E8D5A3] font-bold hover:bg-[#101D32]  hover:text-white hover:border-[#D9C49A] transition-all duration-400 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat With Us on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

          </Reveal>

          {/* RIGHT ENQUIRY FORM */}

          <Reveal variant="right" className="lg:col-span-3">

            <div className="contact-form-panel relative h-full rounded-[2rem] p-7 md:p-10 shadow-xl overflow-hidden">

              <div className="absolute -top-28 -right-20 w-72 h-72 rounded-full border border-[#E8D5A3]/10 contact-pulse pointer-events-none" />
              <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full border border-[#E8D5A3]/10 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

              <div className="relative">

                {status === "success" ? (

                  <div className="text-center py-16 space-y-6">

                    <div className="w-20 h-20 mx-auto rounded-full bg-[#E8D5A3]/10 border border-[#E8D5A3]/30 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-[#E8D5A3]" />
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        Message Sent
                        <span className="block text-[#E8D5A3] mt-1">
                          Successfully!
                        </span>
                      </h3>

                      <p className="text-slate-300 text-sm leading-7 mt-4 max-w-md mx-auto">
                        Thank you for contacting Susheen Techno Power
                        Systems. We have received your enquiry and
                        appreciate your interest.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setStatus("idle");
                        setError("");
                      }}
                      className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#E8D5A3] text-[#101D32] font-bold hover:bg-white transition-all duration-300"
                    >
                      Send Another Message
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>

                ) : (

                  <form onSubmit={submit} className="space-y-6">

                    <div>
                      <span className="inline-flex items-center gap-2 text-[#E8D5A3] text-xs font-bold tracking-[.22em] uppercase">
                        <span className="w-7 h-px bg-[#E8D5A3]" />
                        Enquiry Form
                      </span>

                      <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">
                        Send Us a Message
                      </h2>

                      <p className="text-slate-300 text-sm mt-3 leading-7">
                        Fill in your details and tell us how we can help.
                        Our team will get in touch with you.
                      </p>
                    </div>

                    <div className="w-full h-px bg-white/10" />

                    <div className="grid sm:grid-cols-2 gap-5">

                      <Field
                        label="Your Name"
                        placeholder="Enter your full name"
                        required
                        value={form.name}
                        onChange={(v) =>
                          setForm({ ...form, name: v })
                        }
                      />

                      <Field
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(v) =>
                          setForm({ ...form, phone: v })
                        }
                      />

                    </div>

                    <Field
                      label="Email Address"
                      placeholder="Enter your email address"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) =>
                        setForm({ ...form, email: v })
                      }
                    />

                    <Field
                      label="How Can We Help You?"
                      placeholder="Tell us about your UPS, battery, inverter or stabilizer requirements..."
                      value={form.message}
                      onChange={(v) =>
                        setForm({ ...form, message: v })
                      }
                      textarea
                    />

                    {status === "error" && (
                      <div className="text-red-200 text-sm bg-red-500/10 border border-red-300/20 rounded-xl px-4 py-4 leading-6">
                        <strong>Unable to send your enquiry.</strong>

                        <p className="mt-1 break-words">
                          {error}
                        </p>

                        <p className="mt-2 text-slate-300">
                          You can also contact us by phone or WhatsApp.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="contact-form-button w-full py-4 px-6 rounded-xl bg-[#E8D5A3] text-[#101D32] font-bold hover:bg-white transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3 shadow-lg group"
                    >

                      {status === "submitting" ? (
                        <>
                          <span className="w-5 h-5 border-2 border-[#101D32]/30 border-t-[#101D32] rounded-full animate-spin" />
                          Sending Your Message...
                        </>
                      ) : (
                        <>
                          Send Enquiry
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}

                    </button>

                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                      <ShieldCheck className="w-4 h-4 text-[#E8D5A3]" />
                      Your enquiry details are submitted securely.
                    </div>

                  </form>
                )}

              </div>
            </div>

          </Reveal>

        </div>
      </section>

      {/* LOCATION SECTION */}

      <section className="max-w-7xl mx-auto px-6 mt-24">

        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl border border-[#D9C49A]/30 bg-[#101D32] p-7 md:p-10 mb-10 transition-all duration-500 hover:bg-white hover:border-[#D9C49A] hover:shadow-xl">

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

              <div>
                <span className="inline-flex items-center gap-2 text-[#E8D5A3] group-hover:text-[#B88A3B] text-xs font-bold tracking-[.22em] uppercase transition-colors duration-500">
                  <MapPin className="w-4 h-4" />
                  Find Us
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#101D32] mt-4 transition-colors duration-500">
                  Visit Our Location
                </h2>
              </div>

              <p className="text-sm text-slate-300 group-hover:text-[#687386] max-w-md leading-7 transition-colors duration-500">
                We welcome you to visit our office for product enquiries,
                consultations and power solution discussions.
              </p>

            </div>
          </div>
        </Reveal>

        <Reveal variant="scale">
          <div className="contact-map rounded-[2rem] overflow-hidden border border-[#E8E3D9] h-80 md:h-[440px] bg-white shadow-lg">
            <iframe
              title="Susheen Techno Power Systems location map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=78.49%2C17.43%2C78.55%2C17.49&layer=mapnik&marker=17.46,78.52"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

      </section>

      {/* FINAL CTA */}

      <section className="max-w-7xl mx-auto px-6 mt-24">

        <Reveal variant="scale">
          <div className="relative rounded-[2rem] bg-[#101D32] p-9 md:p-14 lg:p-16 text-center overflow-hidden shadow-2xl">

            <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full border border-white/10 contact-pulse" />
            <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full border border-[#E8D5A3]/15 contact-float" />

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

            <div className="relative max-w-3xl mx-auto">

              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8D5A3]/10 border border-[#E8D5A3]/25 text-[#E8D5A3] text-xs font-bold tracking-widest uppercase">
                <Building2 className="w-4 h-4" />
                Susheen Techno Power Systems
              </span>

              <h2 className="text-3xl md:text-5xl font-bold text-white mt-8 leading-tight tracking-tight">
                Your Power Needs,
                <span className="block text-[#E8D5A3] mt-2">
                  Our Commitment.
                </span>
              </h2>

              <p className="text-slate-300 max-w-xl mx-auto mt-6 leading-8 text-sm md:text-base">
                Whether you need a new power solution, product guidance
                or technical assistance, our team is ready to hear from you.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-9">

                <a
                  href={`tel:${site.mobile}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#E8D5A3] text-[#101D32] font-bold hover:bg-white transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>

                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[#E8D5A3]/40 text-[#E8D5A3] font-bold hover:bg-[#E8D5A3] hover:text-[#101D32] transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>

              </div>

              <p className="text-slate-400 text-xs mt-8 tracking-wide">
                The House of Power Devices
              </p>

            </div>
          </div>
        </Reveal>

      </section>

    </div>
  );
}

/* REUSABLE CONTACT FORM FIELD */

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls =
    "contact-input w-full px-4 py-3.5 rounded-xl text-sm";

  return (
    <label className="block">

      <span className="block text-xs font-bold text-[#E8D5A3] mb-2">
        {label}
        {required && <span className="text-[#B88A3B]"> *</span>}
      </span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          required={required}
          placeholder={placeholder}
          className={`${cls} resize-y min-h-[130px]`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}

    </label>
  );
}
