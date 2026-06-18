import React, { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// Project Slideshow Images
import img1 from "../assets/images/assets/project images/327862be-85eb-4282-a4b8-421088d982b9.png";
import img2 from "../assets/images/assets/project images/5def47dd-8053-402b-839a-b0f2690fbb76.png";
import img3 from "../assets/images/assets/project images/8b01ed69-585b-4149-8fc1-6067a45a9dd6.png";
import img4 from "../assets/images/assets/project images/133fa56a-5ab1-4e4b-98d3-395393adbd55.png";
import img5 from "../assets/images/assets/project images/ce2c65f0-127a-41b3-a90b-3d905c64def6.png";
import img6 from "../assets/images/assets/project images/25a8dd71-33c6-4a23-a401-0b84f9dfd632.png";
import img7 from "../assets/images/assets/project images/742b9019-281d-452a-b2a9-02361b2adef2.png";
import img8 from "../assets/images/assets/project images/1045157b-fe17-4c37-a1bd-15d1c53a3d15.png";
import img9 from "../assets/images/assets/project images/IMG-20260618-WA0009.jpg";
import img10 from "../assets/images/assets/project images/IMG-20260618-WA0014.jpg";
import img11 from "../assets/images/assets/project images/IMG-20260618-WA0016.jpg";
import img12 from "../assets/images/assets/project images/IMG-20260618-WA0023.jpg";
import img13 from "../assets/images/assets/project images/IMG-20260618-WA0025.jpg";
import img14 from "../assets/images/assets/project images/IMG-20260618-WA0030.jpg";

const SLIDES = [
  { img: img1, title: "Living Room" },
  { img: img2, title: "Kitchen" },
  { img: img3, title: "Bedroom" },
  { img: img4, title: "Facade" },
  { img: img5, title: "Quiet Alcove" },
  { img: img6, title: "Courtyard Patio" },
  { img: img7, title: "Heated Hearth" },
  { img: img8, title: "Home Office" },
  { img: img9, title: "Foyer Entrance" },
  { img: img10, title: "Sunlit Lounge" },
  { img: img11, title: "Hallway Gallery" },
  { img: img12, title: "Bathroom Suite" },
  { img: img13, title: "Wood Balcony" },
  { img: img14, title: "Veranda Overlook" },
];

interface FeaturedArticleProps {
  onViewChange?: (view: "home" | "about" | "projects" | "contact" | "appointment") => void;
}

export default function FeaturedArticle({ onViewChange }: FeaturedArticleProps) {
  const { ref, inView } = useInView();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (ref.current && inView) {
      ref.current.classList.add("in-view");
    }
  }, [inView, ref]);

  // Slideshow auto-play cycle (3.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering container project redirect
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering container project redirect
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal"
      style={{ background: "#EEE9DF", padding: "80px 24px" }}
      data-ocid="featured.section"
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: 48,
          alignItems: "center",
        }}
        className="featured-grid"
      >
        {/* Left column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#819A9C",
              marginBottom: 20,
            }}
          >
            Our Gallery
          </p>
          <h2
            style={{
               fontFamily: "var(--font-serif)",
               fontSize: "clamp(28px, 3.5vw, 40px)",
               fontWeight: 400,
               color: "#2f020c",
               lineHeight: 1.2,
               marginBottom: 24,
            }}
          >
            Explore our curated masterpieces and premium creations
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 300,
              color: "#2f020c",
              lineHeight: 1.75,
              marginBottom: 36,
            }}
          >
            From bespoke architectural design and space layouts to masterfully styled luxury fittings, we harmonize traditional craftsmanship and modern sensibilities. Check out our comprehensive collection of projects to see actual premium transformations.
          </p>
          <button
            onClick={() => onViewChange && onViewChange("projects")}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 400,
              color: "#fff",
              background: "#2f020c",
              borderRadius: 9999,
              padding: "12px 36px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "0.8";
              el.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "1";
              el.style.transform = "scale(1)";
            }}
            data-ocid="featured.primary_button"
          >
            View Projects Portfolio
          </button>
        </div>

        {/* Right column - Interactive Slideshow */}
        <div
          onClick={() => onViewChange && onViewChange("projects")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group"
          style={{
            position: "relative",
            overflow: "hidden",
            aspectRatio: "3/2",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
            cursor: "pointer",
            border: "1px solid rgba(47, 2, 12, 0.08)",
          }}
        >
          {/* Slide list */}
          {SLIDES.map((slide, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                inset: 0,
                opacity: idx === currentSlide ? 1 : 0,
                transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: idx === currentSlide ? "scale(1.02)" : "scale(1.08)",
                zIndex: idx === currentSlide ? 2 : 1,
              }}
            >
              <img
                src={slide.img}
                alt={slide.title}
                referrerPolicy="no-referrer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              
              {/* Overlay with details */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "24px",
                  background: isHovered 
                    ? "linear-gradient(to bottom, rgba(47, 2, 12, 0.2), rgba(47, 2, 12, 0.45))" 
                    : "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(47,2,12,0.35))",
                  transition: "background 0.4s ease-in-out",
                }}
              >
                {/* Visual Label Top Right */}
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] tracking-[0.2em] font-medium text-white/80 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full uppercase">
                    House View
                  </span>
                  
                  <div
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all transform group-hover:scale-110 duration-300"
                    style={{ opacity: isHovered ? 1 : 0.7 }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Bottom invitation hint kept minimal */}
                <div className="text-right">
                  <span className="text-white/60 text-[10px] tracking-[0.15em] font-light uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to View Portfolio
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Minimalist Slide Controls */}
          {isHovered && (
            <>
              <button
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2f020c",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2f020c",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "24px",
              zIndex: 10,
              display: "flex",
              gap: "6px",
            }}
          >
            {SLIDES.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === currentSlide ? "16px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor: i === currentSlide ? "#fff" : "rgba(255,255,255,0.4)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
