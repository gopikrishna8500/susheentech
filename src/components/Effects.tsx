
import { useState } from "react";

/** Subtle champagne-gold decorative accent */
export function LightningOverlay({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <div
        className="absolute top-0 left-[15%] w-px h-32 bg-gradient-to-b from-[#E8D5A3]/50 to-transparent"
        style={{ animation: "corporateGlow 5s ease-in-out infinite" }}
      />

      <div
        className="absolute top-0 right-[25%] w-px h-40 bg-gradient-to-b from-[#B88A3B]/40 to-transparent"
        style={{ animation: "corporateGlow 7s 2s ease-in-out infinite" }}
      />

      <div
        className="absolute top-0 left-[65%] w-px h-24 bg-gradient-to-b from-[#E8D5A3]/40 to-transparent"
        style={{ animation: "corporateGlow 6s 1s ease-in-out infinite" }}
      />
    </div>
  );
}

/** Floating champagne-gold decorative particles */
export function EnergyParticles({
  count = 12,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#E8D5A3",
            boxShadow: `0 0 ${p.size * 2}px #B88A3B`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.35,
          }}
        />
      ))}
    </div>
  );
}

/** Elegant champagne-gold horizontal divider */
export function EnergyFlowLine({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative h-px w-full overflow-hidden rounded-full bg-[#E8E3D9] ${className}`}
    >
      <div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#B88A3B] to-transparent"
        style={{ animation: "corporateLine 5s ease-in-out infinite" }}
      />
    </div>
  );
}

/** Minimal champagne-gold status indicator */
export function PulseDot({
  className = "",
  color = "#B88A3B",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span className={`relative inline-flex w-2.5 h-2.5 ${className}`}>
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: color, opacity: 0.25 }}
      />

      <span
        className="relative inline-flex w-2.5 h-2.5 rounded-full"
        style={{ background: color }}
      />
    </span>
  );
}

/** Subtle corporate grid background */
export function EnergyGridBg({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(232,213,163,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(232,213,163,0.045) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
        maskImage:
          "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 20%, transparent 80%)",
      }}
    />
  );
}
