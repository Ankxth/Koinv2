import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import FeaturedArticle from "./components/FeaturedArticle";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HousesCarousel from "./components/HousesCarousel";
import MembershipModal from "./components/MembershipModal";
import MembershipSection from "./components/MembershipSection";
import Navigation, { ViewType } from "./components/Navigation";
import AboutPage from "./components/AboutPage";
import aboutBgImage from "./assets/images/assets/bgpics/pexels-artbovich-6782479.jpg";
import appointmentBgImage from "./assets/images/assets/bgpics/pexels-artbovich-6265836.jpg";
import projectsBgImage from "./assets/images/assets/bgpics/pexels-zion-9494898.jpg";
import contactBgImage from "./assets/images/assets/bgpics/pexels-erdemozdemir-16056400.jpg";
import ProjectsPage from "./components/ProjectsPage";
import ContactPage from "./components/ContactPage";
import AppointmentPage from "./components/AppointmentPage";

const ROW1_LOCATIONS = [
  {
    name: "FarmHouse Ibiza",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=560&q=80",
  },
  {
    name: "Marylebone House Manchester",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=560&q=80",
  },
  {
    name: "Marylebone House West Hollywood",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=560&q=80",
  },
  {
    name: "Marylebone House Berlin",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=560&q=80",
  },
  {
    name: "FarmHouse",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=560&q=80",
  },
  {
    name: "Marylebone House Paris",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=560&q=80",
  },
  {
    name: "Marylebone House Chicago",
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=560&q=80",
  },
];

const ROW2_LOCATIONS = [
  {
    name: "Barcelona Pool House",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=560&q=80",
  },
  {
    name: "DUMBO House",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=560&q=80",
  },
  {
    name: "Marylebone House Mexico City",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=560&q=80",
  },
  {
    name: "Marylebone House Bangkok",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=560&q=80",
  },
  {
    name: "Marylebone House Istanbul",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=560&q=80",
  },
  {
    name: "Babington House",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=560&q=80",
  },
  {
    name: "Shoreditch House",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=560&q=80",
  },
];

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(() => {
    try {
      const lastShown = localStorage.getItem("popup_last_shown");
      if (!lastShown) return false;
      const diff = Date.now() - parseInt(lastShown);
      return diff < 3 * 60 * 1000; // 3 minutes in ms
    } catch {
      return false;
    }
  });

  const handleSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setHasSubmitted(true);
    try {
      localStorage.setItem("popup_last_shown", Date.now().toString());
    } catch (e) {
      console.error(e);
    }
  };

  // Auto dismiss success toast after 6 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Timer for automatic popup (15 seconds)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    // Only show popup on home page, if they haven't submitted the forms, and if it's not already open
    if (currentView === "home" && !modalOpen && !hasSubmitted) {
      timer = setTimeout(() => {
  try {
    localStorage.setItem("popup_last_shown", Date.now().toString());
  } catch {}
  setModalOpen(true);
}, 15000);
    }
    
    return () => clearTimeout(timer);
  }, [currentView, modalOpen, hasSubmitted]);

  return (
    <div style={{ background: "#EEE9DF", minHeight: "100vh" }} className="relative overflow-x-hidden">
      {/* Shared Background Crossfade Panel for smooth transitions */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ zIndex: 0 }}>
        <AnimatePresence mode="popLayout">
          {currentView === "home" && (
            <motion.div
              key="home-hero-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#111]"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                src="/assets/hero-video.mp4"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3), rgba(0,0,0,0.5))" }}
              />
            </motion.div>
          )}

          {currentView === "about" && (
            <motion.div
              key="about-hero-bg"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#111]"
            >
              <img
                src={aboutBgImage}
                alt="About Us Background"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.3), rgba(0,0,0,0.55))" }}
              />
            </motion.div>
          )}

          {currentView === "appointment" && (
            <motion.div
              key="appointment-hero-bg"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#111]"
            >
              <img
                src={appointmentBgImage}
                alt="Appointment Background"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.3), rgba(0,0,0,0.55))" }}
              />
            </motion.div>
          )}

          {currentView === "projects" && (
            <motion.div
              key="projects-hero-bg"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#111]"
            >
              <img
                src={projectsBgImage}
                alt="Projects Background"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.3), rgba(0,0,0,0.55))" }}
              />
            </motion.div>
          )}

          {currentView === "contact" && (
            <motion.div
              key="contact-hero-bg"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#111]"
            >
              <img
                src={contactBgImage}
                alt="Contact Background"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.3), rgba(0,0,0,0.55))" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Navigation
        onOpenModal={() => setModalOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="relative z-1">
        {currentView === "home" && (
          <>
            <HeroSection onOpenModal={() => setModalOpen(true)} />
            <MembershipSection onOpenModal={() => setModalOpen(true)} />
            <FeaturedArticle onViewChange={setCurrentView} />
          </>
        )}
        {currentView === "about" && (
          <AboutPage onOpenModal={() => setModalOpen(true)} />
        )}
        {currentView === "projects" && (
          <ProjectsPage onOpenModal={() => setModalOpen(true)} />
        )}
        {currentView === "contact" && (
          <ContactPage />
        )}
        {currentView === "appointment" && (
          <AppointmentPage onSuccess={handleSuccess} />
        )}
      </main>
      <Footer currentView={currentView} />
      <MembershipModal 
  open={modalOpen} 
  onClose={() => {
    try {
      localStorage.setItem("popup_last_shown", Date.now().toString());
    } catch {}
    setModalOpen(false);
  }} 
  onSuccess={handleSuccess} 
/>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            style={{
              position: "fixed",
              top: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              background: "#1B2632",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "12px",
              padding: "16px 24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              color: "#EEE9DF",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              maxWidth: "90%",
              width: "480px",
            }}
          >
            <div style={{
              background: "#EEE9DF",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B2632" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div style={{ flexGrow: 1, fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, lineHeight: 1.5 }}>
              {successMessage}
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              style={{
                background: "none",
                border: "none",
                color: "#EEE9DF",
                opacity: 0.7,
                cursor: "pointer",
                padding: "4px",
                fontSize: "16px",
                fontFamily: "var(--font-sans)",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
