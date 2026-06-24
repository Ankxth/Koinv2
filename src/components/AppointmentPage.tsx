import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useInView } from "../hooks/useInView";

interface Props {
  onSuccess?: (message: string) => void;
}

export default function AppointmentPage({ onSuccess }: Props) {
  const { ref: headerRef, inView: headerInView } = useInView(0.1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; submit?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const errs: { name?: string; email?: string; phone?: string; submit?: string } = {};
    if (!name.trim()) {
      errs.name = "Name is required.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    const digitCount = phone.replace(/\D/g, "").length;
    if (!phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (digitCount < 10) {
      errs.phone = "Phone number must contain at least 10 digits.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      await emailjs.send(
        "service_yyokdfr",
        "template_40f8pec",
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          "project outline": message.trim() || "N/A",
          project_outline: message.trim() || "N/A",
        },
        "xRVVMLbYQj4xZoQjS"
      );

      setSubmitting(false);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
      setSubmitted(true);
      if (onSuccess) {
        onSuccess("Thank you! Your appointment request has been received. Our team will contact you shortly.");
      }
    } catch (err: any) {
      setSubmitting(false);
      setErrors({
        submit: err?.text || err?.message || "Failed to send appointment request. Please try again."
      });
    }
  }

  return (
    <div className="text-[#2f020c] min-h-screen relative overflow-x-hidden">
      {/* Hero Header */}
      <header
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`reveal ${headerInView ? "in-view" : ""} relative h-screen min-h-[600px] flex flex-col items-center justify-center text-center px-6`}
      >
        <div className="max-w-[800px] mx-auto z-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#819A9C] font-semibold mb-4 drop-shadow-sm">
            BESPOKE INTERIOR CONSULTATIONS
          </p>
          <h1
            className="font-serif text-5xl lg:text-7xl font-normal leading-tight mb-6 text-white drop-shadow-md"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Pre-3D Design Consultation
          </h1>
          <div className="w-16 h-[2px] bg-[#819A9C] mx-auto mb-8 shadow-sm" />
          <p className="max-w-2xl mx-auto text-[17px] lg:text-[19px] font-light leading-relaxed text-white/95 drop-shadow-md">
            Secure an exclusive personal slot with our architectural curators. We guide layout styles, furnishing palettes, and luxury curation alignments for premium projects in Bengaluru.
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
      <div className="relative z-10 bg-[#EEE9DF] py-24 px-6 lg:px-12 shadow-[0_-15px_60px_rgba(0,0,0,0.18)] rounded-t-[32px] border-t border-stone-200/20 w-full">
        <div className="max-w-[1200px] w-full mx-auto">
          {/* Content Layout - Centered Curation Form */}
          <div className="max-w-[680px] mx-auto w-full">
            {/* Form / Success panel */}
            <div className="bg-white rounded-xl p-8 lg:p-10 border border-stone-100 shadow-xs">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col justify-center items-center text-center py-12"
                >
                  <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck size={36} />
                  </div>
                  <h2 className="font-serif text-3xl font-normal text-[#2f020c] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    Appointment Registered
                  </h2>
                  <div className="max-w-md mx-auto space-y-4">
                    <p className="text-sm text-[#5c5c5c] font-light leading-relaxed">
                      Thank you! Your appointment request has been received. Our team will contact you shortly.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <a
                      href="https://wa.me/918431581291"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] hover:scale-103 transition-transform text-white rounded-full text-xs font-bold uppercase tracking-wider"
                    >
                      Ping Curator on WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setMessage("");
                      }}
                      className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-[#2f020c] text-xs font-bold uppercase tracking-wider rounded-full transition-colors font-semibold"
                    >
                      Submit Another Booking
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#2f020c]" style={{ fontFamily: "var(--font-serif)" }}>
                      Consultation Booking
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#819A9C]">Your Name *</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-lg text-sm font-light text-[#2f020c] outline-none transition-all focus:bg-white ${
                          errors.name ? "border-red-400 focus:border-red-500" : "border-stone-200 focus:border-[#819A9C]"
                        }`}
                        placeholder="e.g. Liam Smith"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                      />
                      {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-[#819A9C]">Email Address *</label>
                        <input
                          type="email"
                          className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-lg text-sm font-light text-[#2f020c] outline-none transition-all focus:bg-white ${
                            errors.email ? "border-red-400 focus:border-red-500" : "border-stone-200 focus:border-[#819A9C]"
                          }`}
                          placeholder="e.g. liam@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                        />
                        {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                      </div>

                      {/* Contact Number */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-[#819A9C]">Contact Number *</label>
                        <input
                          type="tel"
                          className={`w-full px-4 py-3.5 bg-stone-50/50 border rounded-lg text-sm font-light text-[#2f020c] outline-none transition-all focus:bg-white ${
                            errors.phone ? "border-red-400 focus:border-red-500" : "border-stone-200 focus:border-[#819A9C]"
                          }`}
                          placeholder="e.g. +91 84315 81291"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                        />
                        {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Project Outline */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-[#819A9C]">Project Outline</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-lg text-sm font-light text-[#2f020c] outline-none transition-all focus:bg-white focus:border-[#819A9C]"
                      placeholder="Describe your design space layout, desired furniture elements, or visual inspiration..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: submitting ? "#6b6b6b" : "#2f020c",
                      cursor: submitting ? "not-allowed" : "pointer"
                    }}
                    className="w-full py-4 text-white font-semibold text-xs tracking-wider uppercase rounded-full shadow-sm transition-transform hover:scale-[1.01] duration-150 border-none"
                  >
                    {submitting ? "Booking appointment..." : "confirm appointment"}
                  </button>
                  {errors.submit && (
                    <p className="text-[13px] text-red-500 text-center mt-3 font-semibold">
                      {errors.submit}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
