import React from "react";
import logo from "../assets/logo.png";
import { ViewType } from "./Navigation";

interface FooterProps {
  currentView?: ViewType;
}

export default function Footer({ currentView }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isTransparentTheme = true;

  return (
    <footer
      style={{
        background: isTransparentTheme ? "rgba(47, 2, 12, 0.82)" : "#2F020C",
        backdropFilter: isTransparentTheme ? "blur(12px)" : "none",
        WebkitBackdropFilter: isTransparentTheme ? "blur(12px)" : "none",
        color: "#f1f5f9",
        padding: "64px 24px 40px",
        textAlign: "center",
        transition: "background 0.5s ease, backdrop-filter 0.5s ease",
      }}
      data-ocid="footer.section"
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Scroll to Top Heading / Centered Logo */}
        <div
          onClick={scrollToTop}
          style={{
            cursor: "pointer",
            margin: 0,
            transition: "opacity 0.2s ease, transform 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.8";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "scale(1)";
          }}
          data-ocid="footer.logo"
        >
          <img
            src={logo}
            alt="Koin Interior"
            referrerPolicy="no-referrer"
            style={{
              height: "140px",
              width: "auto",
              display: "block",
              transform: "translateX(24px)", // Offsets the blank space on the right of the asset to ensure perfect optical centering
              filter: "brightness(2) contrast(1.5)", // Makes the logo bright on the gray footer
            }}
          />
        </div>

        {/* Contact Us Section */}
        <div style={{ maxWidth: 600 }}>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ffffff",
              marginBottom: 20,
            }}
          >
            Contact us
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 300,
              color: "#e2e8f0",
            }}
          >
            <a
              href="mailto:info@koininterior.com"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              info@koininterior.com
            </a>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
              <a
                href="https://wa.me/918431581219"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                +91-84315 81219
              </a>
              <a
                href="https://wa.me/919019192192"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                +91-90191 92192
              </a>
              <a
                href="https://wa.me/919632476480"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                +91-96324 76480
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 40,
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            width: "100%",
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 300,
            color: "#cbd5e1",
          }}
        >
          Copyright © 2026 Koin Interior - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
