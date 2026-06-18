import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Grid } from "lucide-react";
import { useInView } from "../hooks/useInView";

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

interface Props {
  onOpenModal: () => void;
}

export default function ProjectsPage({ onOpenModal }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { ref: headerRef, inView: headerInView } = useInView(0.1);
  const { ref: galleryRef, inView: galleryInView } = useInView(0.1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Automatic slideshow cycle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="text-[#2f020c] min-h-screen relative overflow-x-hidden">
      
      {/* Hero Header */}
      <header
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`reveal ${headerInView ? "in-view" : ""} relative h-screen min-h-[600px] flex flex-col items-center justify-center text-center px-6`}
      >
        <div className="max-w-[800px] mx-auto z-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#819A9C] font-semibold mb-4 drop-shadow-sm">
            Curation & Craft Portfolio
          </p>
          <h1
            className="font-serif text-5xl lg:text-7xl font-normal leading-tight mb-6 text-white drop-shadow-md"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Residence Gallery
          </h1>
          <div className="w-16 h-[2px] bg-[#819A9C] mx-auto mb-8 shadow-sm" />
          <p className="max-w-2xl mx-auto text-[17px] lg:text-[19px] font-light leading-relaxed text-white/95 drop-shadow-md">
            Seamlessly showcasing actual premium views, interior angles, and architectural details of our flagship residences.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-80 animate-bounce">
          <span className="text-[10px] tracking-[0.25em] text-white/60 font-light uppercase">Scroll Down</span>
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <polyline points="7 13 12 18 17 13" />
            <polyline points="7 6 12 11 17 6" />
          </svg>
        </div>
      </header>

      {/* Sliding Content Container */}
      <div 
        className="relative z-10 bg-[#EEE9DF] py-24 px-6 lg:px-12 shadow-[0_-15px_60px_rgba(0,0,0,0.18)] rounded-t-[32px] border-t border-stone-200/20 w-full"
        data-ocid="projects.content-container"
      >
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-normal mb-3">
              Comprehensive House Showcase
            </h2>
            <div className="w-12 h-[1px] bg-[#819A9C] mx-auto mb-4" />
            <p className="text-sm font-light text-[#5c5c5c] max-w-lg mx-auto">
              Browse the stunning layouts, luxury finishes, and curated residential settings of our active properties.
            </p>
          </div>

          {/* Interactive Slideshow Window */}
          <div 
            ref={galleryRef as React.RefObject<HTMLDivElement>}
            className={`reveal ${galleryInView ? "in-view" : ""} relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-200/40 bg-[#1e0108] mb-8 transition-all duration-700`}
          >
            {SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: idx === currentSlide ? 1 : 0,
                  zIndex: idx === currentSlide ? 10 : 1,
                  pointerEvents: idx === currentSlide ? "auto" : "none"
                }}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-100"
                  style={{
                    transform: idx === currentSlide ? "scale(1.04)" : "scale(1)"
                  }}
                />
                

              </div>
            ))}

            {/* Float Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-[#2f020c] flex items-center justify-center shadow-lg transition-all hover:scale-110"
              aria-label="Previous view"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-[#2f020c] flex items-center justify-center shadow-lg transition-all hover:scale-110"
              aria-label="Next view"
            >
              <ChevronRight size={24} />
            </button>

            {/* Playback Control Overlay Top Right */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 right-4 z-30 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 flex items-center gap-2 text-xs font-light hover:bg-black/60 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause size={12} className="fill-current" />
                  <span>Pause Cycle</span>
                </>
              ) : (
                <>
                  <Play size={12} className="fill-current" />
                  <span>Resume Cycle</span>
                </>
              )}
            </button>

            {/* Image index counter top left */}
            <div className="absolute top-4 left-4 z-30 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[10px] tracking-wider uppercase font-mono">
              View {currentSlide + 1} / {SLIDES.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-stone-300">
            {SLIDES.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsPlaying(false); // Pause auto-playing when choosing manually
                }}
                className={`relative shrink-0 w-20 aspect-video rounded-md overflow-hidden border-2 transition-all snap-center ${
                  idx === currentSlide 
                    ? "border-[#2f020c] shadow-md scale-102" 
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={slide.img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Centered Inquiry Callout */}
          <div className="mt-16 text-center border-t border-stone-200/50 pt-12">
            <p className="text-xs tracking-widest text-[#819A9C] font-semibold uppercase mb-4">
              LOVED OUR DESIGNS?
            </p>
            <button
              onClick={onOpenModal}
              className="font-sans text-[11px] uppercase tracking-widest bg-[#2f020c] font-semibold text-white px-8 py-3.5 rounded-full hover:opacity-90 transform hover:-translate-y-0.5 transition-all shadow-sm"
            >
              Inquire About These Designs
            </button>
          </div>

          {/* Bottom Catalog Stamp */}
          <footer className="text-center mt-20 text-stone-400 text-[10px] tracking-widest uppercase font-mono">
            &copy; All design elements cataloged under Koin collective.
          </footer>

        </div>
      </div>

    </div>
  );
}
