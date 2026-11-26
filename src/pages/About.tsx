
import {
  Target,
  Eye,
  Award,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  Sparkles,
  Battery,
Activity,
ShieldCheck,
  Building2,
} from "lucide-react";

import { useRouter } from "@/lib/router";
import { site } from "@/lib/site";
import { SectionHeading } from "./Home";
import { Reveal, AnimatedCounter } from "@/lib/useReveal";

export function AboutPage() {
  const { navigate } = useRouter();

  const stats = [
    { v: 15, suffix: "+", l: "Years of Experience" },
    { v: 5000, suffix: "+", l: "Units Delivered" },
    { v: 100, suffix: "%", l: "Genuine Products" },
  ];

  const values = [
    {
      icon: Target,
      title: "Right Solution First",
      desc: "We recommend what fits your needs — not simply what sells best. Load assessment, runtime calculation, and honest guidance are at the heart of every recommendation.",
    },
    {
      icon: Award,
      title: "Quality You Can Trust",
      desc: "We focus on quality products from reputable manufacturers, with warranty support and dependable solutions for homes, offices, and industries.",
    },
    {
      icon: Eye,
      title: "Service That Lasts",
      desc: "From installation and maintenance to battery replacement, we aim to support our customers long after the initial purchase.",
    },
  ];

  return (
    <div className="about-page min-h-screen bg-white pt-28 pb-20 overflow-hidden">

      <style>{`
        @keyframes aboutFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes aboutFloatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        @keyframes aboutPulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: .8; transform: scale(1.08); }
        }

        @keyframes aboutShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes aboutLine {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        @keyframes aboutGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(184,138,59,.08); }
          50% { box-shadow: 0 0 30px rgba(184,138,59,.22); }
        }

        .about-float {
          animation: aboutFloat 6s ease-in-out infinite;
        }

        .about-float-reverse {
          animation: aboutFloatReverse 7s ease-in-out infinite;
        }

        .about-pulse {
          animation: aboutPulse 4s ease-in-out infinite;
        }

        .about-card {
          position: relative;
          overflow: hidden;
          transform: translateY(0);
          transition:
            background .45s ease,
            color .45s ease,
            transform .45s cubic-bezier(.2,.8,.2,1),
            box-shadow .45s ease,
            border-color .45s ease;
        }

        .about-card-navy {
          background: #101D32;
          border: 1px solid rgba(232,213,163,.2);
        }

        .about-card-light {
          background: #FFFFFF;
          border: 1px solid #E8E3D9;
        }

        .about-card-navy:hover {
          background: #F7F5F0;
          border-color: #D9C49A;
        }

        .about-card-light:hover {
          background: #101D32;
          border-color: rgba(232,213,163,.45);
        }

        .about-card:hover {
          transform: translateY(-9px);
          box-shadow: 0 22px 45px rgba(16,29,50,.14);
        }

        .about-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #B88A3B, #E8D5A3, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .5s ease;
        }

        .about-card:hover::before {
          transform: scaleX(1);
        }

        .about-stat-navy {
          background: #101D32;
          border-color: rgba(232,213,163,.2);
        }

        .about-stat-light {
          background: #FFFFFF;
          border-color: #E8E3D9;
        }

        .about-stat {
          transition: all .4s cubic-bezier(.2,.8,.2,1);
        }

        .about-stat:hover {
          transform: translateY(-7px);
          box-shadow: 0 18px 35px rgba(16,29,50,.13);
          border-color: #D9C49A;
        }

        .about-value-icon {
          transition: all .4s ease;
        }

        .about-card:hover .about-value-icon {
          transform: rotate(-8deg) scale(1.08);
          background: #101D32;
          border-color: #B88A3B;
        }

        .about-card-navy .about-value-icon {
          background: rgba(232,213,163,.1);
          border-color: rgba(232,213,163,.35);
          color: #E8D5A3;
        }

        .about-card-light .about-value-icon {
          background: #F5F0E5;
          border-color: #E8D5A3;
          color: #101D32;
        }

        .about-card-navy:hover .about-value-icon,
        .about-card-light:hover .about-value-icon {
          color: #E8D5A3;
        }

        .about-value-title {
          transition: color .4s ease;
        }

        .about-value-desc {
          transition: color .4s ease;
        }

        .about-card-navy .about-value-title {
          color: #E8D5A3;
        }

        .about-card-light .about-value-title {
          color: #101D32;
        }

        .about-card-navy .about-value-desc {
          color: #CBD5E1;
        }

        .about-card-light .about-value-desc {
          color: #687386;
        }

        .about-card-navy:hover .about-value-title {
          color: #101D32;
        }

        .about-card-light:hover .about-value-title {
          color: #E8D5A3;
        }

        .about-card-navy:hover .about-value-desc {
          color: #687386;
        }

        .about-card-light:hover .about-value-desc {
          color: #CBD5E1;
        }

        .about-value-line {
          transition: width .4s ease;
        }

        .about-card:hover .about-value-line {
          width: 65px;
        }

        .about-stat-number {
          transition: color .4s ease;
        }

        .about-stat-label {
          transition: color .4s ease;
        }

        .about-stat-navy .about-stat-number {
          color: #E8D5A3;
        }

        .about-stat-light .about-stat-number {
          color: #B88A3B;
        }

        .about-stat-navy .about-stat-label {
          color: #CBD5E1;
        }

        .about-stat-light .about-stat-label {
          color: #687386;
        }

        .about-leadership-row {
          transition: all .35s ease;
        }

        .about-leadership-row:hover {
          transform: translateX(5px);
          background: rgba(232,213,163,.1);
          border-color: rgba(232,213,163,.4);
        }

        .about-image {
          transition: transform .8s cubic-bezier(.2,.8,.2,1);
        }

        .about-image-frame:hover .about-image {
          transform: scale(1.07);
        }

        .about-hero-line {
          background: linear-gradient(90deg, #B88A3B, #E8D5A3, #B88A3B);
          background-size: 200% auto;
          animation: aboutShimmer 5s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-page *,
          .about-page *::before,
          .about-page *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }

/* PREMIUM POWER HERO ANIMATION */

.power-visual {
  isolation: isolate;
}

.power-glow {
  animation: powerGlow 4s ease-in-out infinite;
}

@keyframes powerGlow {
  0%, 100% {
    opacity: .45;
    transform: scale(.9);
  }
  50% {
    opacity: .9;
    transform: scale(1.12);
  }
}

.power-orbit {
  position: absolute;
  border: 1px solid rgba(184,138,59,.35);
  border-radius: 50%;
  pointer-events: none;
}

.power-orbit-outer {
  width: 92%;
  height: 92%;
  animation: powerRotate 24s linear infinite;
}

.power-orbit-middle {
  width: 74%;
  height: 74%;
  border-style: dashed;
  border-color: rgba(184,138,59,.4);
  animation: powerRotateReverse 19s linear infinite;
}

.power-orbit-inner {
  width: 59%;
  height: 59%;
  border-color: rgba(16,29,50,.2);
  animation: powerRotate 14s linear infinite;
}

@keyframes powerRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes powerRotateReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.power-orbit-dot {
  position: absolute;
  top: 12%;
  left: 12%;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #B88A3B;
  box-shadow: 0 0 15px rgba(184,138,59,.8);
}

.power-dot-two {
  top: 75%;
  left: 8%;
  width: 8px;
  height: 8px;
  background: #101D32;
}

.power-dot-three {
  top: 15%;
  left: 80%;
  width: 7px;
  height: 7px;
  background: #D9C49A;
}

.power-pulse {
  animation: powerPulse 3s ease-in-out infinite;
}

@keyframes powerPulse {
  0%, 100% {
    transform: scale(.94);
    opacity: .5;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
}

.power-rotate-reverse {
  animation: powerRotateReverse 30s linear infinite;
}

.power-core {
  animation: powerCoreFloat 5s ease-in-out infinite;
}

@keyframes powerCoreFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

.power-zap {
  filter: drop-shadow(0 0 10px rgba(232,213,163,.5));
  animation: powerZap 2.5s ease-in-out infinite;
}

@keyframes powerZap {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 5px rgba(232,213,163,.3));
  }
  50% {
    transform: scale(1.12);
    filter: drop-shadow(0 0 18px rgba(232,213,163,.8));
  }
}

.power-label {
  animation: powerLabelFloat 5s ease-in-out infinite;
}

.power-label-two {
  animation-delay: -1.5s;
}

.power-label-three {
  animation-delay: -3s;
}

@keyframes powerLabelFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
  .power-visual *,
  .power-visual *::before,
  .power-visual *::after {
    animation: none !important;
    transition: none !important;
  }
}

        }
      `}</style>

      {/* HERO */}
      
{/* HERO */}
<section className="max-w-7xl mx-auto px-6 pt-12 relative">
  <div className="grid lg:grid-cols-2 gap-10 items-center">

    {/* LEFT CONTENT */}
    <Reveal variant="left">
      <div className="relative z-10">

        <span className="inline-flex items-center gap-3 text-[#B88A3B] text-xs font-bold tracking-[0.22em] uppercase mb-6">
          <span className="w-9 h-px bg-[#B88A3B]" />
          About Susheen Techno Power Systems
          <Sparkles className="w-4 h-4" />
        </span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#101D32] leading-tight tracking-tight">
          The House of
          <span className="block text-[#B88A3B]">
            Power Devices.
          </span>
        </h1>

        <p className="mt-6 text-[#687386] text-base md:text-lg leading-8 max-w-xl">
          Your trusted partner in power backup and protection.
          Delivering dependable power solutions for homes, offices,
          and industries across Telangana.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <div className="w-12 h-1 bg-[#B88A3B] rounded-full" />
          <div className="w-3 h-1 bg-[#D9C49A] rounded-full" />
          <div className="w-2 h-1 bg-[#E8D5A3] rounded-full" />
        </div>

      </div>
    </Reveal>

    {/* RIGHT ANIMATED POWER VISUAL */}
    <Reveal variant="right">
      <div className="power-visual relative mx-auto w-full max-w-[520px] aspect-square flex items-center justify-center">

        {/* Background glow */}
        <div className="absolute w-[75%] h-[75%] rounded-full bg-[#D9C49A]/20 blur-[70px] power-glow" />

        {/* Outer orbit */}
        <div className="power-orbit power-orbit-outer">
          <span className="power-orbit-dot" />
        </div>

        {/* Middle orbit */}
        <div className="power-orbit power-orbit-middle">
          <span className="power-orbit-dot power-dot-two" />
        </div>

        {/* Inner orbit */}
        <div className="power-orbit power-orbit-inner">
          <span className="power-orbit-dot power-dot-three" />
        </div>

        {/* Decorative circles */}
        <div className="absolute w-[52%] h-[52%] rounded-full border border-[#B88A3B]/20 power-pulse" />
        <div className="absolute w-[42%] h-[42%] rounded-full border border-dashed border-[#B88A3B]/30 power-rotate-reverse" />

        {/* Central power unit */}
        <div className="power-core relative z-10 w-36 h-36 md:w-48 md:h-48 rounded-[2.5rem] bg-[#101D32] border border-[#E8D5A3]/50 shadow-[0_20px_60px_rgba(16,29,50,0.25)] flex flex-col items-center justify-center">

          <div className="absolute inset-2 rounded-[2rem] border border-[#E8D5A3]/15" />

          <div className="power-icon-glow absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#B88A3B]/15 blur-2xl" />

          <Zap className="relative w-14 h-14 md:w-20 md:h-20 text-[#E8D5A3] power-zap" />

          <span className="relative text-[9px] md:text-[10px] tracking-[0.25em] font-bold text-white/70 mt-3">
            STPS POWER
          </span>

        </div>

        {/* Floating labels */}
        <div className="power-label power-label-one absolute top-[13%] left-[3%] md:left-[5%] bg-white/90 backdrop-blur-md border border-[#E8E3D9] shadow-lg rounded-xl px-3 py-2 md:px-4 md:py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B88A3B]" />
            <span className="text-[10px] md:text-xs font-bold text-[#101D32]">Protection</span>
          </div>
        </div>

        <div className="power-label power-label-two absolute bottom-[16%] right-[1%] md:right-[3%] bg-white/90 backdrop-blur-md border border-[#E8E3D9] shadow-lg rounded-xl px-3 py-2 md:px-4 md:py-3">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-[#B88A3B]" />
            <span className="text-[10px] md:text-xs font-bold text-[#101D32]">Reliability</span>
          </div>
        </div>

        <div className="power-label power-label-three absolute bottom-[9%] left-[8%] bg-white/90 backdrop-blur-md border border-[#E8E3D9] shadow-lg rounded-xl px-3 py-2 md:px-4 md:py-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#B88A3B]" />
            <span className="text-[10px] md:text-xs font-bold text-[#101D32]">Performance</span>
          </div>
        </div>

      </div>
    </Reveal>

  </div>
</section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <Reveal variant="left" className="space-y-6">

            <div>
              <span className="text-[#B88A3B] text-xs font-bold tracking-[0.2em] uppercase">
                Who We Are
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-[#101D32] mt-3">
                Our Story
              </h2>

              <div className="w-16 h-1 bg-[#B88A3B] rounded-full mt-5" />
            </div>

            <p className="text-[#687386] leading-8 text-[15px]">
              Founded by{" "}
              <span className="text-[#101D32] font-bold">
                {site.owner}
              </span>
              , Susheen Techno Power Systems began with a simple mission:
              to deliver reliable power protection devices with honest
              advice and dependable service. Over the years, we have
              grown into a one-stop destination for on-line UPS,
              batteries, inverters, off-line UPS, and voltage stabilizers.
            </p>

            <p className="text-[#687386] leading-8 text-[15px]">
              We believe the right power solution is about more than
              buying a product. It is about understanding your electrical
              load, runtime requirements, and operating environment.
              Every recommendation is made with your requirements in mind.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 pt-5">

              {stats.map((s, i) => (
                <div
                  key={s.l}
                  className={`about-stat rounded-2xl border p-4 md:p-5 text-center shadow-sm ${
                    i % 2 === 0
                      ? "about-stat-navy"
                      : "about-stat-light"
                  }`}
                >
                  <p className="about-stat-number text-xl md:text-3xl font-bold">
                    <AnimatedCounter
                      value={s.v}
                      suffix={s.suffix}
                    />
                  </p>

                  <p className="about-stat-label text-[10px] md:text-xs font-semibold mt-2 leading-4">
                    {s.l}
                  </p>
                </div>
              ))}

            </div>
          </Reveal>

          {/* STORY IMAGE */}
          <Reveal variant="right">

            <div className="relative group about-image-frame">

              <div className="absolute -inset-3 border border-[#D9C49A] rounded-[2rem] translate-x-2 translate-y-2 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />

              <div className="absolute -top-7 -right-5 w-24 h-24 border border-[#B88A3B]/30 rounded-full about-float pointer-events-none" />

              <div className="relative rounded-[1.7rem] overflow-hidden h-[340px] md:h-[440px] bg-[#EAE6DD] shadow-xl">

                <img
                  src="https://images.pexels.com/photos/12157172/pexels-photo-12157172.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200"
                  alt="Power infrastructure"
                  className="about-image w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101D32]/50 via-transparent to-transparent" />

                <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-[#101D32]/80 backdrop-blur-md border border-[#E8D5A3]/40 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[#E8D5A3]" />
                </div>

              </div>

              <div className="absolute -bottom-5 left-5 md:left-8 bg-[#101D32] text-white p-5 md:p-6 rounded-2xl shadow-xl max-w-[250px] border border-[#E8D5A3]/20">
                <p className="text-[#E8D5A3] text-xs font-bold uppercase tracking-widest">
                  Our Commitment
                </p>
                <p className="text-sm md:text-base font-semibold mt-2 leading-6">
                  Reliable power. Dependable protection.
                </p>
              </div>

            </div>

          </Reveal>

        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="max-w-7xl mx-auto px-6 mt-28 md:mt-36">

        <Reveal>
          <SectionHeading
            eyebrow="Our Purpose"
            title="Vision & Mission"
            subtitle="The direction that guides us and the commitment behind every power solution we provide."
          />
        </Reveal>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-7 md:gap-8 items-center mt-12">

          {/* VISION */}
          <Reveal variant="left">
            <div className="about-card about-card-navy h-full min-h-[280px] rounded-3xl p-8 md:p-9 shadow-lg">
              <div className="about-value-icon w-16 h-16 rounded-2xl border flex items-center justify-center">
                <Eye className="w-8 h-8" />
              </div>

              <p className="text-[#E8D5A3] text-xs font-bold tracking-[0.2em] uppercase mt-7">
                Where We Aspire To Be
              </p>

              <h3 className="about-value-title text-2xl md:text-3xl font-bold mt-3">
                Our Vision
              </h3>

              <div className="w-14 h-1 bg-[#B88A3B] rounded-full mt-5" />

              <p className="about-value-desc text-sm md:text-base leading-8 mt-5">
                To become a trusted name in power backup and protection
                solutions, recognised for reliability, quality, and
                customer confidence. We aspire to help homes, businesses,
                and industries stay powered with dependable solutions.
              </p>
            </div>
          </Reveal>

          {/* STPS LOGO BETWEEN VISION AND MISSION */}
          <Reveal variant="scale">
            <div className="flex flex-col items-center justify-center py-3">
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-white border border-[#D9C49A] shadow-[0_15px_45px_rgba(16,29,50,0.12)] flex items-center justify-center p-5">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#B88A3B]/50" />
                <img
                  src="/stps-logo.png"
                  alt="Susheen Techno Power Systems Logo"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>

              <div className="w-12 h-1 bg-[#B88A3B] rounded-full mt-5" />
              <p className="text-[#101D32] text-xs font-bold tracking-[0.2em] mt-3 text-center">
                STPS
              </p>
              <p className="text-[#687386] text-[10px] tracking-widest uppercase mt-1 text-center">
                Powering Confidence
              </p>
            </div>
          </Reveal>

          {/* MISSION */}
          <Reveal variant="right">
            <div className="about-card about-card-light h-full min-h-[280px] rounded-3xl p-8 md:p-9 shadow-lg">
              <div className="about-value-icon w-16 h-16 rounded-2xl border flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>

              <p className="text-[#B88A3B] text-xs font-bold tracking-[0.2em] uppercase mt-7">
                What We Work Towards
              </p>

              <h3 className="about-value-title text-2xl md:text-3xl font-bold mt-3">
                Our Mission
              </h3>

              <div className="w-14 h-1 bg-[#B88A3B] rounded-full mt-5" />

              <p className="about-value-desc text-sm md:text-base leading-8 mt-5">
                To understand every customer's power requirements and
                provide suitable UPS, stabilizer, inverter, and solar
                inverter solutions. We are committed to offering genuine
                products, honest guidance, and dependable customer support
                throughout the journey.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 mt-28 md:mt-36">

        <Reveal>
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Values"
            subtitle="The principles behind every product we supply and every customer relationship we build."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={`delay-${i + 1}`}
              variant="up"
            >

              <div
                className={`about-card about-card-${i % 2 === 0 ? "navy" : "light"} h-full rounded-2xl p-7 shadow-sm`}
              >

                <div className="about-value-icon w-14 h-14 rounded-2xl border flex items-center justify-center">
                  <v.icon className="w-6 h-6" />
                </div>

                <h3 className="about-value-title font-bold text-xl mt-6">
                  {v.title}
                </h3>

                <p className="about-value-desc text-sm leading-7 mt-3">
                  {v.desc}
                </p>

                <div className="about-value-line w-10 h-1 bg-[#B88A3B] rounded-full mt-6" />

                <div className="absolute bottom-5 right-6 opacity-[0.06] pointer-events-none">
                  <v.icon className="w-24 h-24" />
                </div>

              </div>

            </Reveal>
          ))}

        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-6 mt-24">

        <Reveal variant="scale">

          <div className="relative rounded-[2rem] bg-[#101D32] p-8 md:p-12 lg:p-14 overflow-hidden shadow-xl border border-[#B88A3B]/20">

            {/* Decorative rings */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3 about-float" />

            <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full border border-[#E8D5A3]/10 translate-x-1/3 translate-y-1/3 about-float-reverse" />

            <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-[#B88A3B]/5 blur-3xl about-pulse" />

            <div className="relative grid md:grid-cols-2 gap-12 items-center">

              <div className="space-y-6">

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8D5A3]/10 border border-[#E8D5A3]/25 text-[#E8D5A3] text-xs font-bold tracking-widest uppercase">
                  <Building2 className="w-4 h-4" />
                  Leadership
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {site.owner}
                </h2>

                <p className="text-[#E8D5A3] font-semibold text-sm tracking-wide">
                  Proprietor, {site.business}
                </p>

                <div className="w-16 h-1 bg-[#B88A3B] rounded-full" />

                <p className="text-slate-300 leading-8 text-sm md:text-base max-w-lg">
                  "Power is not just a product — it is a promise that
                  your work, your data, and your home stay protected.
                  We are here to keep that promise."
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <ShieldCheck className="w-5 h-5 text-[#E8D5A3]" />
                  <span className="text-xs text-slate-300 font-semibold tracking-wide">
                    COMMITTED TO QUALITY & RELIABILITY
                  </span>
                </div>

              </div>

              {/* CONTACT DETAILS */}
              <div className="space-y-4">

                <ContactRow
                  icon={MapPin}
                  label="Address"
                  value={site.address}
                />

                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={`Mobile: ${site.mobile} · Landline: ${site.landline}`}
                />

                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={site.emails.join(", ")}
                />

              </div>

            </div>
          </div>

        </Reveal>

        {/* CONTACT BUTTON */}
        <Reveal variant="up">
          <div className="text-center mt-12">

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#101D32] text-[#E8D5A3] font-bold hover:bg-[#192B46] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
            >
              Get in Touch

              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </Reveal>

      </section>

    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="about-leadership-row group flex gap-4 rounded-xl bg-white/5 border border-white/10 p-4 md:p-5">

      <div className="w-11 h-11 rounded-xl bg-[#E8D5A3]/10 border border-[#B88A3B]/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#E8D5A3]" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[#E8D5A3] uppercase tracking-widest font-bold">
          {label}
        </p>

        <p className="text-white text-sm mt-1 leading-6 break-words">
          {value}
        </p>
      </div>

    </div>
  );
}
