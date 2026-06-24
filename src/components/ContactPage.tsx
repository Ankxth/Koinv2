import React, { useEffect } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useInView } from "../hooks/useInView";

export default function ContactPage() {
  const { ref: headerRef, inView: headerInView } = useInView(0.1);
  const { ref: contentRef, inView: contentInView } = useInView(0.1);

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
            Koin Interior Concierge
          </p>
          <h1
            className="font-serif text-5xl lg:text-7xl font-normal leading-tight mb-6 text-white drop-shadow-md"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            We would love to hear from you
          </h1>
          <div className="w-16 h-[2px] bg-[#819A9C] mx-auto mb-8 shadow-sm" />
          <p className="max-w-2xl mx-auto text-[17px] lg:text-[19px] font-light leading-relaxed text-white/95 drop-shadow-md">
            Should you have any design inquiries or wish to collaborate, please connect via our direct communication channels in Bengaluru.
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
      <div className="relative z-10 bg-[#EEE9DF] py-24 px-6 lg:px-12 shadow-[0_-15px_60px_rgba(0,0,0,0.18)] rounded-t-[32px] border-t border-stone-200/20 w-full" data-ocid="contact.content-container">
        <div className="max-w-[1200px] w-full mx-auto">

          {/* Simplified Contact Info Grid */}
          <section
            ref={contentRef as React.RefObject<HTMLDivElement>}
            className={`reveal ${contentInView ? "in-view" : ""} max-w-[900px] mx-auto transition-all duration-700`}
          >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Address Card */}
            <div className="bg-white rounded-xl p-8 border border-stone-100 shadow-xs hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-full bg-stone-50 text-[#819A9C] inline-flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#17181A]" style={{ fontFamily: 'var(--font-serif)' }}>
                    Address
                  </h3>
                </div>
                <p className="text-sm font-light text-[#5c5c5c] leading-relaxed">
                  No.555, KNO.129 Bhavana Building, Begur Koppa Road, SRY Layout, Mylasandra Dinne, Begur, Bengaluru - 560068
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl p-8 border border-stone-100 shadow-xs hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-full bg-stone-50 text-[#819A9C] inline-flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#2f020c]" style={{ fontFamily: 'var(--font-serif)' }}>
                    email
                  </h3>
                </div>
                <a
                  href="mailto:info@koininterior.com"
                  className="text-sm font-semibold text-[#2f020c] hover:text-[#819A9C] transition-colors break-all inline-block mt-2 font-mono"
                >
                  info@koininterior.com
                </a>
              </div>
            </div>

            {/* Our Hours Card */}
            <div className="bg-white rounded-xl p-8 border border-stone-100 shadow-xs hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-full bg-stone-50 text-[#819A9C] inline-flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#2f020c]" style={{ fontFamily: 'var(--font-serif)' }}>
                    Working hours
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-[#5c5c5c] font-light">
                  <p className="font-semibold text-[#2f020c]">09:30 AM - 7.00 PM</p>
                  <p>Monday - Saturday</p>
                  <p className="text-red-500 font-semibold text-xs mt-1">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Phone Numbers Card */}
            <div className="bg-white rounded-xl p-8 border border-stone-100 shadow-xs hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-full bg-stone-50 text-[#819A9C] inline-flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#2f020c]" style={{ fontFamily: 'var(--font-serif)' }}>
                    Phone numbers
                  </h3>
                </div>
                <div className="space-y-1.5 text-sm font-mono font-semibold text-[#2f020c]">
                  <p>+91-84315 81291</p>
                  <p>+91-90191 92192</p>
                  <p>+91-96324 76480</p>
                </div>
                
                {/* Instant Link to WhatsApp */}
                <div className="mt-4 pt-4 border-t border-stone-100">
                  <a
                    href="https://wa.me/918431581291"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs transition-colors no-underline border-none cursor-pointer"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        </div>
      </div>

    </div>
  );
}
