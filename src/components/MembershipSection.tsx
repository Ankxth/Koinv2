import React, { useEffect } from "react";
import { useInView } from "../hooks/useInView";

function handleEnter(e: React.MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget as HTMLElement;
  el.style.opacity = "0.8";
  el.style.transform = "scale(1.02)";
}
function handleLeave(e: React.MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget as HTMLElement;
  el.style.opacity = "1";
  el.style.transform = "scale(1)";
}

interface Props {
  onOpenModal: () => void;
}

export default function MembershipSection({ onOpenModal }: Props) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (ref.current && inView) {
      ref.current.classList.add("in-view");
    }
  }, [inView, ref]);

  return (
    <section
      id="membership"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal"
      style={{ background: "#EEE9DF", padding: "100px 24px" }}
      data-ocid="membership.section"
    >
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 400,
            color: "#2f020c",
            lineHeight: 1.15,
            marginBottom: 40,
          }}
        >
          Your Dream Home Starts Here
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            fontWeight: 300,
            color: "#2f020c",
            lineHeight: 1.8,
            marginBottom: 24,
          }}
        >
          Your home is more than just a space—it’s where life happens. At Koin Interior,
          we take the time to understand your lifestyle, preferences, and vision to create
          interiors that truly feel like home. From the first conversation to the final
          finishing touch, we guide you through every step of the journey, making the process
          simple, enjoyable, and stress-free.
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            fontWeight: 300,
            color: "#2f020c",
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          Whether you&apos;re designing a new home or refreshing an existing space, our team
          combines thoughtful design, quality craftsmanship, and attention to detail to bring
          your ideas to life. We believe great interiors should not only look beautiful but
          also make everyday living more comfortable and meaningful.
        </p>
        <button
          type="button"
          onClick={onOpenModal}
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
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          data-ocid="membership.primary_button"
        >
          Apply for appointment
        </button>
      </div>
    </section>
  );
}
