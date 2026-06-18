import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

const FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E5E5E5",
  borderRadius: 8,
  padding: "14px 16px",
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  fontWeight: 300,
  color: "#2f020c",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#2f020c",
  marginBottom: 6,
};

export default function MembershipModal({ open, onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; submit?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  function handleClose() {
    onClose();
    // Reset after animation finishes
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setWhatsapp(true);
      setErrors({});
      setSubmitted(false);
      setSubmitting(false);
    }, 300);
  }

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
        "template_tvrl0ds",
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          time: new Date().toLocaleString(),
        },
        "xRVVMLbYQj4xZoQjS"
      );

      setSubmitting(false);
      // Clear fields on success
      setName("");
      setEmail("");
      setPhone("");
      setWhatsapp(true);
      setErrors({});
      
      onClose();
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

  function focusIn(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#2f020c";
  }
  function focusOut(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#E5E5E5";
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 16px",
            backdropFilter: "blur(4px)",
          }}
          data-ocid="membership_modal.modal"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 460,
              width: "100%",
              padding: "40px 36px",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: 20,
                right: 24,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: 18,
                fontWeight: 300,
                color: "#2f020c",
                lineHeight: 1,
                padding: "4px 6px",
              }}
            >
              ✕
            </button>

            {submitted ? (
              // ─── Success state ───
              <div
                style={{ textAlign: "center", padding: "16px 0" }}
                data-ocid="membership_modal.success_state"
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#2f020c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    role="img"
                    aria-label="Checkmark"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(24px, 4vw, 28px)",
                    fontWeight: 400,
                    color: "#2f020c",
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}
                >
                  Appointment Booked!
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    fontWeight: 300,
                    color: "#6b6b6b",
                    lineHeight: 1.6,
                    marginBottom: 28,
                  }}
                >
                  Thank you, <strong>{name}</strong>. Your request has been received. Our team will contact you at <strong>{phone}</strong> shortly to finalize your schedule.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    width: "100%",
                    background: "#2f020c",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9999,
                    padding: "14px 24px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              // ─── Form state ───
              <>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(24px, 4vw, 28px)",
                    fontWeight: 400,
                    color: "#2f020c",
                    marginBottom: 8,
                    lineHeight: 1.2,
                  }}
                >
                  Book an Appointment
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "#7b7b7b",
                    marginBottom: 24,
                    lineHeight: 1.5,
                  }}
                >
                  Fill out the form below to register your consultation slot with Koin Interior.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Name */}
                    <div>
                      <label style={LABEL_STYLE} htmlFor="app-name">
                        Name
                      </label>
                      <input
                        ref={firstInputRef}
                        id="app-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        onFocus={focusIn}
                        onBlur={focusOut}
                        placeholder="Your full name"
                        style={{
                          ...FIELD_STYLE,
                          borderColor: errors.name ? "#c0392b" : "#E5E5E5",
                        }}
                      />
                      {errors.name && <ErrorMsg msg={errors.name} />}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label style={LABEL_STYLE} htmlFor="app-email">
                        Email Address
                      </label>
                      <input
                        id="app-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        onFocus={focusIn}
                        onBlur={focusOut}
                        placeholder="Your email address"
                        style={{
                          ...FIELD_STYLE,
                          borderColor: errors.email ? "#c0392b" : "#E5E5E5",
                        }}
                      />
                      {errors.email && <ErrorMsg msg={errors.email} />}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label style={LABEL_STYLE} htmlFor="app-phone">
                        Phone Number
                      </label>
                      <input
                        id="app-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        onFocus={focusIn}
                        onBlur={focusOut}
                        placeholder="Your contact number"
                        style={{
                          ...FIELD_STYLE,
                          borderColor: errors.phone ? "#c0392b" : "#E5E5E5",
                        }}
                      />
                      {errors.phone && <ErrorMsg msg={errors.phone} />}
                    </div>

                    {/* WhatsApp Checkbox */}
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        userSelect: "none",
                        marginTop: 4,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.checked)}
                        style={{
                          width: 17,
                          height: 17,
                          accentColor: "#2f020c",
                          cursor: "pointer",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 13,
                          fontWeight: 300,
                          color: "#4A4A4A",
                        }}
                      >
                        Yes, send me updates via WhatsApp
                      </span>
                    </label>

                     {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        width: "100%",
                        background: submitting ? "#6b6b6b" : "#2f020c",
                        color: "#fff",
                        border: "none",
                        borderRadius: 9999,
                        padding: "15px 24px",
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        fontWeight: 400,
                        letterSpacing: "0.04em",
                        cursor: submitting ? "not-allowed" : "pointer",
                        marginTop: 12,
                        transition: "opacity 0.2s ease, transform 0.1s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!submitting) (e.currentTarget as HTMLElement).style.opacity = "0.85";
                      }}
                      onMouseLeave={(e) => {
                        if (!submitting) (e.currentTarget as HTMLElement).style.opacity = "1";
                      }}
                    >
                      {submitting ? "Booking appointment..." : "Book an appointment"}
                    </button>
                    {errors.submit && <div style={{ marginTop: 12 }}><ErrorMsg msg={errors.submit} /></div>}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        color: "#c0392b",
        margin: "5px 0 0",
        fontWeight: 400,
      }}
    >
      {msg}
    </p>
  );
}
