import React, { useRef, useEffect } from "react";

function handleBtnEnter(e: React.MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = "scale(1.02)";
  el.style.background = "#2f020c";
  el.style.color = "#fff";
}
function handleBtnLeave(e: React.MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = "scale(1)";
  el.style.background = "#fff";
  el.style.color = "#000";
}

interface Props {
  onOpenModal: () => void;
}

const VIDEOS = [
  "/assets/hero-video.mp4"
];

export default function HeroSection({ onOpenModal }: Props) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: 600 }}
      data-ocid="hero.section"
    >
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ zIndex: 2 }}>
        <h1
          style={{
            fontFamily: "var(--font-amsterdam)",
            fontSize: "clamp(55px, 9vw, 96px)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1,
            maxWidth: 800,
            marginBottom: 16,
            textShadow: "1px 1px 20px rgba(0,0,0,0.6)",
          }}
        >
          Live in Style
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 2.5vw, 20px)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "rgba(255, 255, 255, 0.95)",
            maxWidth: 600,
            marginBottom: 40,
            textShadow: "1px 1px 10px rgba(0,0,0,0.5)",
          }}
        >
          Designing Spaces That Reflect Your Lifestyle
        </p>
        <button
          type="button"
          onClick={onOpenModal}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 400,
            color: "#000",
            background: "#fff",
            borderRadius: 9999,
            padding: "14px 38px",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
            transition: "all 0.3s ease-out",
          }}
          onMouseEnter={handleBtnEnter}
          onMouseLeave={handleBtnLeave}
          data-ocid="hero.primary_button"
        >
          Book an appointment
        </button>
      </div>
    </section>
  );
}
