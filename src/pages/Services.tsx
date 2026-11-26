
import {
  Wrench,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headset,
  Gauge,
  Battery,
  Power,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Activity,
  Settings2,
} from "lucide-react";

import { useRouter } from "@/lib/router";
import { SectionHeading } from "./Home";
import { Reveal } from "@/lib/useReveal";

export function ServicesPage() {
  const { navigate } = useRouter();

  const services = [
    {
      icon: Power,
      number: "01",
      title: "UPS Supply & Installation",
      desc: "On-line and off-line UPS from 1 kVA to 40 kVA and beyond. We assess your load, recommend the right capacity, and handle professional installation with battery configuration.",
      points: [
        "Site load assessment",
        "Capacity planning",
        "Professional installation",
      ],
    },
    {
      icon: Battery,
      number: "02",
      title: "Battery Sales & Replacement",
      desc: "Tubular, gel, and SMF batteries for inverters, UPS, and solar. We also replace aging battery banks and dispose of old units responsibly.",
      points: [
        "Tubular & gel batteries",
        "Battery bank replacement",
        "Safe disposal of old units",
      ],
    },
    {
      icon: Zap,
      number: "03",
      title: "Inverter Solutions",
      desc: "Pure sine wave inverters with optional solar charging. From small home units to 5 kVA systems for offices and showrooms.",
      points: [
        "Pure sine wave output",
        "Solar-ready options",
        "Smart charging technology",
      ],
    },
    {
      icon: Gauge,
      number: "04",
      title: "Voltage Stabilizers",
      desc: "Servo-controlled stabilizers for medical equipment, CNC machines, HVAC systems, and industrial electrical loads.",
      points: [
        "Voltage regulation solutions",
        "1 kVA to 50 kVA+ options",
        "Wide input range options",
      ],
    },
    {
      icon: Wrench,
      number: "05",
      title: "Annual Maintenance Contracts",
      desc: "Maintenance support designed to keep your power systems running through periodic health checks, battery testing, and priority service.",
      points: [
        "Scheduled health checks",
        "Priority response",
        "Service reports",
      ],
    },
    {
      icon: RefreshCw,
      number: "06",
      title: "Repairs & Servicing",
      desc: "Repair and servicing support for UPS, inverters, and stabilizers of major brands, with a focus on reliable repairs and quality spare parts.",
      points: [
        "Major brand support",
        "Spare parts assistance",
        "Repair and maintenance",
      ],
    },
    {
      icon: Truck,
      number: "07",
      title: "Delivery & Site Visit",
      desc: "Site surveys, product delivery, and installation coordination to help ensure your power solution is suitable for your premises.",
      points: [
        "Site survey",
        "Delivery coordination",
        "Installation support",
      ],
    },
    {
      icon: Headset,
      number: "08",
      title: "Consultation & Quotation",
      desc: "Not sure what you need? Tell us your load and runtime requirements. We help you understand the options and prepare a suitable quotation.",
      points: [
        "Load and runtime analysis",
        "Solution recommendations",
        "Quotation assistance",
      ],
    },
  ];

  const steps = [
    {
      n: "01",
      t: "Tell Us Your Need",
      d: "Share your load, runtime requirements, and location.",
    },
    {
      n: "02",
      t: "Get a Recommendation",
      d: "We help identify the right capacity and product.",
    },
    {
      n: "03",
      t: "Delivery & Installation",
      d: "We coordinate delivery and installation at your premises.",
    },
    {
      n: "04",
      t: "Ongoing Support",
      d: "Get assistance with maintenance, repairs, and replacements.",
    },
  ];

  return (
    <div className="services-page min-h-screen bg-white pt-28 pb-20 overflow-hidden">

      <style>{`
        @keyframes serviceFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-13px); }
        }

        @keyframes servicePulse {
          0%, 100% { opacity: .35; transform: scale(.96); }
          50% { opacity: .75; transform: scale(1.04); }
        }

        @keyframes serviceShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .service-float {
          animation: serviceFloat 7s ease-in-out infinite;
        }

        .service-pulse {
          animation: servicePulse 6s ease-in-out infinite;
        }

        .service-shimmer {
          background-size: 200% auto;
          animation: serviceShimmer 5s linear infinite;
        }

        /* ALTERNATING SERVICE CARDS */

        .service-card {
          position: relative;
          transform: translateY(0);
          transition:
            background-color .45s ease,
            transform .45s cubic-bezier(.2,.8,.2,1),
            box-shadow .45s ease,
            border-color .4s ease;
        }

        /* NAVY SERVICE CARD */

        .service-card.is-navy {
          background: #101D32;
          border: 1px solid rgba(217,196,154,.25);
        }

        .service-card.is-navy:hover {
          background: #F7F5F0;
          border-color: #D9C49A;
          transform: translateY(-9px);
          box-shadow: 0 24px 55px rgba(16,29,50,.12);
        }

        /* WHITE SERVICE CARD */

        .service-card.is-white {
          background: #FFFFFF;
          border: 1px solid #E5DED0;
          box-shadow: 0 5px 18px rgba(16,29,50,.035);
        }

        .service-card.is-white:hover {
          background: #101D32;
          border-color: rgba(217,196,154,.5);
          transform: translateY(-9px);
          box-shadow: 0 24px 55px rgba(16,29,50,.16);
        }

        /* SERVICE ICON */

        .service-card .service-icon {
          border: 1px solid;
          transition: all .45s cubic-bezier(.2,.8,.2,1);
        }

        .service-card.is-navy .service-icon {
          background: rgba(232,213,163,.12);
          color: #E8D5A3;
          border-color: rgba(232,213,163,.35);
        }

        .service-card.is-navy:hover .service-icon {
          transform: rotate(-7deg) scale(1.08);
          background: #101D32;
          color: #E8D5A3;
          border-color: #101D32;
        }

        .service-card.is-white .service-icon {
          background: #F7F5F0;
          color: #B88A3B;
          border-color: #E8D5A3;
        }

        .service-card.is-white:hover .service-icon {
          transform: rotate(-7deg) scale(1.08);
          background: rgba(232,213,163,.12);
          color: #E8D5A3;
          border-color: rgba(232,213,163,.35);
        }

        /* SERVICE NUMBER */

        .service-number {
          width: 3rem;
          height: 3rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: .75rem;
          font-size: .875rem;
          letter-spacing: .08em;
          font-weight: 700;
          transition: all .4s ease;
        }

        .is-navy .service-number {
          border: 1px solid #D9C49A;
          background: #F7F5F0;
          color: #101D32;
        }

        .is-navy:hover .service-number {
          color: #E8D5A3;
          background: #101D32;
          border-color: #101D32;
          transform: translateY(-2px);
        }

        .is-white .service-number {
          border: 1px solid #E8D5A3;
          background: #101D32;
          color: #E8D5A3;
        }

        .is-white:hover .service-number {
          color: #101D32;
          background: #F7F5F0;
          border-color: #D9C49A;
          transform: translateY(-2px);
        }

        /* SERVICE TEXT COLORS */

        .service-title,
        .service-description,
        .service-point,
        .service-divider,
        .service-explore,
        .service-check {
          transition: color .45s ease, background-color .45s ease;
        }

        .is-navy .service-title {
          color: #E8D5A3;
        }

        .is-navy:hover .service-title {
          color: #101D32;
        }

        .is-white .service-title {
          color: #101D32;
        }

        .is-white:hover .service-title {
          color: #E8D5A3;
        }

        .is-navy .service-description,
        .is-navy .service-point {
          color: #CBD5E1;
        }

        .is-navy:hover .service-description,
        .is-navy:hover .service-point {
          color: #687386;
        }

        .is-white .service-description,
        .is-white .service-point {
          color: #687386;
        }

        .is-white:hover .service-description,
        .is-white:hover .service-point {
          color: #CBD5E1;
        }

        .is-navy .service-divider {
          background: rgba(255,255,255,.15);
        }

        .is-navy:hover .service-divider {
          background: #D9C49A;
        }

        .is-white .service-divider {
          background: #E8E3D9;
        }

        .is-white:hover .service-divider {
          background: rgba(255,255,255,.15);
        }

        .is-navy .service-check {
          color: #E8D5A3;
        }

        .is-navy:hover .service-check {
          color: #B88A3B;
        }

        .is-white .service-check {
          color: #B88A3B;
        }

        .is-white:hover .service-check {
          color: #E8D5A3;
        }

        .is-navy .service-explore {
          color: #E8D5A3;
        }

        .is-navy:hover .service-explore {
          color: #B88A3B;
        }

        .is-white .service-explore {
          color: #B88A3B;
        }

        .is-white:hover .service-explore {
          color: #E8D5A3;
        }

        /* SERVICE TOP LINE */

        .service-top-line {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .5s ease;
        }

        .service-card:hover .service-top-line {
          transform: scaleX(1);
        }

        /* ALTERNATING PROCESS CARDS */

        .process-card {
          position: relative;
          transform: translateY(0);
          transition:
            background-color .45s ease,
            transform .45s ease,
            box-shadow .45s ease,
            border-color .4s ease;
        }

        .process-card.is-navy {
          background: #101D32;
          border: 1px solid rgba(217,196,154,.25);
        }

        .process-card.is-navy:hover {
          background: #F7F5F0;
          border-color: #D9C49A;
          transform: translateY(-7px);
          box-shadow: 0 20px 45px rgba(16,29,50,.12);
        }

        .process-card.is-white {
          background: #FFFFFF;
          border: 1px solid #E5DED0;
          box-shadow: 0 5px 18px rgba(16,29,50,.035);
        }

        .process-card.is-white:hover {
          background: #101D32;
          border-color: rgba(217,196,154,.5);
          transform: translateY(-7px);
          box-shadow: 0 20px 45px rgba(16,29,50,.16);
        }

        /* PROCESS NUMBER */

        .process-number {
          width: 4rem;
          height: 4rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .4s ease;
        }

        .process-card.is-navy .process-number {
          background: rgba(232,213,163,.12);
          border: 1px solid rgba(232,213,163,.3);
          color: #E8D5A3;
        }

        .process-card.is-navy:hover .process-number {
          background: #101D32;
          border-color: #101D32;
          color: #E8D5A3;
        }

        .process-card.is-white .process-number {
          background: #F7F5F0;
          border: 1px solid #E8D5A3;
          color: #B88A3B;
        }

        .process-card.is-white:hover .process-number {
          background: rgba(232,213,163,.12);
          border-color: rgba(232,213,163,.3);
          color: #E8D5A3;
        }

        /* PROCESS TEXT */

        .process-title,
        .process-description,
        .process-arrow {
          transition: color .45s ease;
        }

        .process-card.is-navy .process-title {
          color: #E8D5A3;
        }

        .process-card.is-navy:hover .process-title {
          color: #101D32;
        }

        .process-card.is-white .process-title {
          color: #101D32;
        }

        .process-card.is-white:hover .process-title {
          color: #E8D5A3;
        }

        .process-card.is-navy .process-description {
          color: #CBD5E1;
        }

        .process-card.is-navy:hover .process-description {
          color: #687386;
        }

        .process-card.is-white .process-description {
          color: #687386;
        }

        .process-card.is-white:hover .process-description {
          color: #CBD5E1;
        }

        .process-card.is-navy .process-arrow {
          color: #E8D5A3;
        }

        .process-card.is-navy:hover .process-arrow {
          color: #B88A3B;
        }

        .process-card.is-white .process-arrow {
          color: #B88A3B;
        }

        .process-card.is-white:hover .process-arrow {
          color: #E8D5A3;
        }

        @media (prefers-reduced-motion: reduce) {
          .service-float,
          .service-pulse,
          .service-shimmer {
            animation: none !important;
          }

          .service-card,
          .process-card,
          .service-icon,
          .service-number,
          .process-number {
            transition: none !important;
          }
        }
      `}</style>

      {/* PREMIUM HERO */}

      <section className="relative max-w-7xl mx-auto px-6 pt-10 md:pt-16 pb-14">

        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#E8D5A3]/20 rounded-full blur-[110px] pointer-events-none service-pulse" />

        <div className="relative grid lg:grid-cols-[1.2fr_.8fr] gap-12 lg:gap-16 items-center">

          <Reveal variant="up">
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#E8E3D9] shadow-sm mb-7">
                <Sparkles className="w-4 h-4 text-[#B88A3B]" />
                <span className="text-[#101D32] text-[10px] md:text-xs font-bold tracking-[.22em] uppercase">
                  What We Do
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-bold text-[#101D32] leading-[1.12] tracking-tight">
                End-to-End
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B88A3B] via-[#D5B875] to-[#A67B32] service-shimmer">
                  Power Solutions.
                </span>
              </h1>

              <p className="mt-7 text-[#687386] text-base md:text-lg leading-8 max-w-2xl">
                Beyond supplying products, we support your power
                requirements through consultation, installation,
                maintenance, and repair services.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">

                <button
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#101D32] text-white font-semibold text-sm shadow-lg hover:bg-[#192B46] hover:shadow-xl transition-all duration-300"
                >
                  Discuss Your Requirements
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white border border-[#E5DED0] text-[#101D32] font-semibold text-sm hover:border-[#B88A3B] hover:bg-[#FBF9F4] transition-all duration-300"
                >
                  Explore Products
                </button>

              </div>

              <div className="flex items-center gap-3 mt-10">

                <div className="flex -space-x-2">
                  {[Power, Battery, Gauge].map((Icon, index) => (
                    <div
                      key={index}
                      className="w-9 h-9 rounded-full bg-[#101D32] border-2 border-[#F7F5F0] flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4 text-[#E8D5A3]" />
                    </div>
                  ))}
                </div>

                <span className="text-xs font-medium text-[#687386]">
                  Consultation · Installation · Support
                </span>

              </div>

            </div>
          </Reveal>

          {/* HERO VISUAL */}

          <Reveal variant="scale">
            <div className="relative max-w-md mx-auto w-full service-float">

              <div className="absolute -top-8 -right-6 w-36 h-36 border border-[#D9C49A]/50 rounded-full service-pulse" />
              <div className="absolute -bottom-8 -left-8 w-44 h-44 border border-[#D9C49A]/40 rounded-full" />

              <div className="relative rounded-[2rem] bg-[#101D32] p-8 md:p-10 overflow-hidden shadow-2xl">

                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10" />
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-[#E8D5A3]/15" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

                <div className="relative">

                  <div className="flex items-center justify-between">
                    <span className="text-[#E8D5A3] text-[10px] tracking-[.25em] font-bold uppercase">
                      STPS Services
                    </span>
                    <Activity className="w-5 h-5 text-[#E8D5A3]" />
                  </div>

                  <div className="py-14 text-center">

                    <div className="relative w-36 h-36 mx-auto rounded-full border border-[#E8D5A3]/30 flex items-center justify-center">

                      <div className="absolute inset-3 rounded-full border border-white/10" />

                      <div
                        className="absolute inset-0 rounded-full border-t-2 border-[#E8D5A3] animate-spin"
                        style={{ animationDuration: "12s" }}
                      />

                      <div className="w-24 h-24 rounded-2xl bg-[#E8D5A3]/10 border border-[#E8D5A3]/30 flex items-center justify-center">
                        <Power className="w-12 h-12 text-[#E8D5A3]" />
                      </div>

                    </div>

                    <h2 className="text-white text-2xl md:text-3xl font-bold mt-8">
                      Powering
                      <span className="block text-[#E8D5A3] mt-1">
                        Your Needs.
                      </span>
                    </h2>

                    <p className="text-slate-400 text-sm mt-4 leading-7">
                      From product selection to ongoing
                      support, explore our power services.
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <Settings2 className="w-5 h-5 text-[#E8D5A3] mb-3" />
                      <p className="text-white text-xs font-semibold">
                        Technical Support
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <ShieldCheck className="w-5 h-5 text-[#E8D5A3] mb-3" />
                      <p className="text-white text-xs font-semibold">
                        Power Solutions
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* SERVICES GRID */}

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">

        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl border border-[#D9C49A]/30 bg-[#101D32] p-7 md:p-10 mb-12 transition-all duration-500 hover:bg-white hover:border-[#D9C49A] hover:shadow-xl hover:-translate-y-1">

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              <div>

                <span className="inline-flex items-center gap-2 text-[#E8D5A3] group-hover:text-[#B88A3B] text-xs font-bold tracking-[.22em] uppercase transition-colors duration-500">
                  <span className="w-8 h-px bg-[#E8D5A3] group-hover:bg-[#B88A3B] transition-colors duration-500" />
                  Our Expertise
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#101D32] mt-4 tracking-tight transition-colors duration-500">
                  Services We Provide
                </h2>

                <p className="text-slate-300 group-hover:text-[#687386] text-sm mt-3 transition-colors duration-500">
                  Complete support for your power requirements.
                </p>

              </div>

              <p className="text-sm text-slate-300 group-hover:text-[#687386] max-w-md leading-7 transition-colors duration-500">
                Practical power solutions and support for residential,
                commercial, and industrial requirements.
              </p>

            </div>
          </div>
        </Reveal>

        {/* ALTERNATING SERVICE CARDS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {services.map((s, i) => {
            const isNavy = i % 2 === 0;

            return (
              <Reveal
                key={s.title}
                variant="up"
                delay={`delay-${(i % 4) + 1}`}
              >

                <div
                  className={`service-card ${
                    isNavy ? "is-navy" : "is-white"
                  } group relative h-full rounded-2xl p-6 md:p-7 shadow-sm overflow-hidden`}
                >

                  <div className="service-top-line absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B88A3B] via-[#E8D5A3] to-[#B88A3B]" />

                  <div className="flex items-center justify-between">

                    <div className="service-icon w-14 h-14 rounded-2xl flex items-center justify-center">
                      <s.icon className="w-6 h-6" />
                    </div>

                    <span className="service-number">
                      {s.number}
                    </span>

                  </div>

                  <h3 className="service-title font-bold text-lg leading-snug mt-7 min-h-[52px]">
                    {s.title}
                  </h3>

                  <p className="service-description text-sm leading-7 mt-3">
                    {s.desc}
                  </p>

                  <div className="service-divider w-full h-px my-6" />

                  <ul className="space-y-3">

                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="service-point flex items-start gap-2.5 text-xs leading-5"
                      >
                        <CheckCircle2 className="service-check w-4 h-4 flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}

                  </ul>

                  <div className="service-explore flex items-center gap-2 mt-7 text-xs font-bold">
                    <span>Explore this service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                </div>

              </Reveal>
            );
          })}

        </div>
      </section>

      {/* PROCESS SECTION */}

      <section className="max-w-7xl mx-auto px-6 mt-28">

        <Reveal>
          <div className="text-center max-w-2xl mx-auto">

            <span className="inline-flex items-center gap-2 text-[#B88A3B] text-xs font-bold tracking-[.22em] uppercase mb-4">
              <span className="w-8 h-px bg-[#B88A3B]" />
              How It Works
              <span className="w-8 h-px bg-[#B88A3B]" />
            </span>

            <SectionHeading
              eyebrow=""
              title="A Simple, Transparent Process"
              subtitle="From understanding your requirements to ongoing support, we make the process straightforward."
            />

          </div>
        </Reveal>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">

          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-[#E8D5A3]/20 via-[#B88A3B]/60 to-[#E8D5A3]/20" />

          {steps.map((step, i) => {
            const isNavy = i % 2 === 0;

            return (
              <Reveal
                key={step.n}
                variant="up"
                delay={`delay-${i + 1}`}
              >

                <div
                  className={`process-card ${
                    isNavy ? "is-navy" : "is-white"
                  } group relative h-full rounded-2xl p-7 shadow-sm`}
                >

                  <div className="relative z-10 flex items-center justify-between">

                    <div className="process-number shadow-lg">
                      <span className="text-2xl font-bold">
                        {step.n}
                      </span>
                    </div>

                    {i < 3 && (
                      <ArrowRight className="process-arrow hidden lg:block w-5 h-5 transition-colors duration-500" />
                    )}

                  </div>

                  <div className="w-12 h-1 bg-gradient-to-r from-[#B88A3B] to-[#E8D5A3] rounded-full mt-7" />

                  <h3 className="process-title font-bold text-lg mt-6">
                    {step.t}
                  </h3>

                  <p className="process-description text-sm mt-3 leading-7">
                    {step.d}
                  </p>

                </div>

              </Reveal>
            );
          })}

        </div>
      </section>

      {/* PREMIUM CTA */}

      <section className="max-w-7xl mx-auto px-6 mt-28">

        <Reveal variant="scale">
          <div className="relative rounded-[2rem] bg-[#101D32] p-9 md:p-14 lg:p-20 text-center overflow-hidden shadow-2xl">

            <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full border border-white/10 service-pulse" />
            <div className="absolute -top-20 -right-8 w-72 h-72 rounded-full border border-[#E8D5A3]/15" />
            <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full border border-[#E8D5A3]/10 service-float" />

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8D5A3] to-transparent" />

            <div className="relative max-w-3xl mx-auto">

              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8D5A3]/10 border border-[#E8D5A3]/25 text-[#E8D5A3] text-xs font-bold tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4" />
                Let's Get Started
              </span>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-8 leading-tight tracking-tight">
                Ready to Power
                <span className="block text-[#E8D5A3] mt-2">
                  Your Business?
                </span>
              </h2>

              <p className="text-slate-300 max-w-xl mx-auto mt-6 leading-8 text-sm md:text-base">
                Tell us about your power requirements. Our team
                will help you explore a suitable solution and
                provide a quotation.
              </p>

              <button
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center justify-center gap-3 mt-9 px-9 py-4 rounded-xl bg-[#E8D5A3] text-[#101D32] font-bold hover:bg-white transition-all duration-300 shadow-xl hover:shadow-[#E8D5A3]/10 hover:-translate-y-1"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-slate-400 text-xs mt-7 tracking-wide">
                Susheen Techno Power Systems · The House of Power Devices
              </p>

            </div>
          </div>
        </Reveal>

      </section>

    </div>
  );
}
