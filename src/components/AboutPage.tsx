import React, { useEffect } from "react";
import { useInView } from "../hooks/useInView";
import { Users, Shield, Target, Award } from "lucide-react";
import maniBvImage from "../assets/images/assets/directors/mani_bv.png";
import soohyunChoiImage from "../assets/images/assets/directors/soohyun_choi.png";

interface Props {
  onOpenModal: () => void;
}

export default function AboutPage({ onOpenModal }: Props) {
  const { ref: headerRef, inView: headerInView } = useInView(0.1);
  const { ref: storyRef, inView: storyInView } = useInView(0.15);
  const { ref: teamRef, inView: teamInView } = useInView(0.15);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="text-[#2f020c] min-h-screen relative overflow-x-hidden">
      {/* Hero Header */}
      <header
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`reveal ${headerInView ? "in-view" : ""} relative h-screen min-h-[600px] flex flex-col items-center justify-center text-center px-6`}
      >
        <div className="max-w-[800px] mx-auto z-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#819A9C] font-semibold mb-4 drop-shadow-sm">
            A MODERN APPROACH TO LIVING
          </p>
          <h1
            className="font-serif text-5xl lg:text-7xl font-normal leading-tight mb-6 text-white drop-shadow-md"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Designed Around You
          </h1>
          <div className="w-16 h-[2px] bg-[#819A9C] mx-auto mb-8 shadow-sm" />
          <p className="max-w-2xl mx-auto text-[17px] lg:text-[19px] font-light leading-relaxed text-white/95 drop-shadow-md">
            We started with a simple idea — good design should not feel out of reach. Our work combines styling, renovations, and interior improvements tailored to each client’s needs, with a focus on clarity, comfort, and spaces that truly work for everyday living.
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
      <div className="relative z-10 bg-[#EEE9DF] py-24 px-6 lg:px-12 shadow-[0_-15px_60px_rgba(0,0,0,0.18)] rounded-t-[32px] border-t border-stone-200/20">
        {/* Two-Column Story Section */}
        <section
          ref={storyRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${storyInView ? "in-view" : ""} max-w-[1250px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28 transition-all duration-700`}
        >
          <div className="relative overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
              alt="Interior architectural detail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Designing for connection
            </h2>
            <div className="space-y-6 text-[16px] font-light leading-relaxed text-[#2f020c]">
              <p>
                At Koin Interior, we believe good interiors should feel personal, functional, and thoughtfully designed — without becoming unnecessarily expensive or complicated.
              </p>
              <p>
                We work on styling, renovations, space improvements, and interior fixes for homes and commercial spaces, helping clients create environments that feel both comfortable and refined. Whether it’s refreshing a single room, improving the functionality of a space, or transforming an entire interior, we focus on solutions that balance aesthetics, practicality, and budget.
              </p>
              <p>
                As a growing studio, we value clear communication, attention to detail, and a more hands-on approach to every project. We take the time to understand how a space is actually used so the final result not only looks good, but works well for everyday living.
              </p>
              <p className="pb-4">
                Our goal is simple: to create spaces that feel intentional, timeless, and genuinely suited to the people using them.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section
          ref={teamRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${teamInView ? "in-view" : ""} max-w-[1250px] mx-auto transition-all duration-700 mb-10`}
        >
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#819A9C] font-semibold mb-3">
              Our Team
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
              The People Behind the Vision
            </h2>
            <p className="max-w-xl mx-auto text-sm text-[#5c5c5c] font-light mt-4">
              Our dedicated team of professionals focused on delivering quality transformations and personal service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[700px] mx-auto">
            {[
              {
                name: "Mani BV",
                role: "Creative Director & Founder",
                desc: "Oversees aesthetic strategy, custom architectural preservation, and international brand partnerships.",
                image: maniBvImage,
              },
              {
                name: "Soohyun Choi",
                role: "Lead Interior Architect",
                desc: "Specializes in blending historical structures with minimalistic luxury comfort and modern utilities.",
                image: soohyunChoiImage,
              }
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group border border-stone-100"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-stone-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-normal mb-1">{member.name}</h3>
                    <p className="text-xs text-[#819A9C] tracking-wide uppercase font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs font-light text-[#5c5c5c] leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
