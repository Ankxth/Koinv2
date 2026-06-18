import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "../hooks/useInView";

interface Location {
  name: string;
  image: string;
}

interface HousesCarouselProps {
  locations: Location[];
  id: string;
}

export default function HousesCarousel({ locations, id }: HousesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (ref.current && inView) {
      ref.current.classList.add("in-view");
    }
  }, [inView, ref]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal relative"
      style={{ overflow: "hidden" }}
      data-ocid={`${id}.section`}
    >
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white rounded-full"
        style={{
          width: 48,
          height: 48,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Scroll left"
        data-ocid={`${id}.pagination_prev`}
      >
        <ChevronLeft size={20} color="#000" />
      </button>

      {/* Cards track */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {locations.map((loc, i) => (
          <CarouselCard
            key={loc.name}
            location={loc}
            index={i + 1}
            carouselId={id}
          />
        ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white rounded-full"
        style={{
          width: 48,
          height: 48,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Scroll right"
        data-ocid={`${id}.pagination_next`}
      >
        <ChevronRight size={20} color="#000" />
      </button>
    </section>
  );
}

function CarouselCard({
  location,
  index,
  carouselId,
}: {
  location: Location;
  index: number;
  carouselId: string;
  key?: string;
}) {
  const hoverRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    if (hoverRef.current) {
      hoverRef.current.style.opacity = "1";
    }
  };
  const onLeave = () => {
    if (hoverRef.current) {
      hoverRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      style={{
        minWidth: 280,
        width: 280,
        height: 380,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        scrollSnapAlign: "start",
        flexShrink: 0,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-ocid={`${carouselId}.item.${index}`}
    >
      <img
        src={location.image}
        alt={location.name}
        referrerPolicy="no-referrer"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        loading="lazy"
      />
      {/* Hover overlay */}
      <div
        ref={hoverRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          opacity: 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
      {/* Bottom gradient + label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
          padding: "48px 16px 16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 400,
            color: "#fff",
          }}
        >
          {location.name}
        </span>
      </div>
    </div>
  );
}
