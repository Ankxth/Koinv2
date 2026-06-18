import React, { useState, useEffect } from "react";
import { Menu, X, MessageSquare, Shield } from "lucide-react";
import logo from "../assets/logo.png";

export type ViewType = "home" | "about" | "projects" | "contact" | "appointment";

interface NVItem {
  label: string;
  id: ViewType;
}

const NAV_ITEMS: NVItem[] = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Appointment", id: "appointment" },
  { label: "Projects", id: "projects" },
  { label: "Contact Us", id: "contact" },
];

interface Props {
  onOpenModal: () => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Navigation({ onOpenModal, currentView, onViewChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = !scrolled && !mobileOpen;

  const handleItemClick = (item: NVItem, e: React.MouseEvent) => {
    e.preventDefault();
    onViewChange(item.id);
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      mobileOpen
        ? "bg-[#933B5B] md:bg-transparent md:shadow-none md:border-b-0 shadow-md border-b border-white/5"
        : isTransparent
          ? "bg-transparent shadow-none border-b border-transparent"
          : "bg-[#933B5B]/65 backdrop-blur-md shadow-md border-b border-white/5"
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 h-24 lg:h-28 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onViewChange("home");
          }}
          className="flex items-center gap-3 no-underline py-2"
          data-ocid="nav.link"
        >
          <img
            src={logo}
            alt="Koin Interior"
            referrerPolicy="no-referrer"
            className="h-20 lg:h-26 w-auto transition-all duration-300 hover:scale-102"
          />
        </a>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isCurrent = currentView === item.id;
            
            return (
              <div key={item.label} className="nav-item flex items-center gap-2 relative">
                <a
                  onClick={(e) => handleItemClick(item, e)}
                  className={`no-underline transition-all duration-300 relative py-2 block cursor-pointer ${
                    isCurrent
                      ? "text-[#eff3f6] font-bold"
                      : "text-[#eff3f6]/80 hover:text-white font-medium"
                  }`}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    letterSpacing: "0.03em",
                  }}
                  data-ocid="nav.link"
                >
                  {item.label}
                  {isCurrent && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-colors duration-300 bg-[#eff3f6]" />
                  )}
                </a>
              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://wa.me/918431581219"
            target="_blank"
            rel="noopener noreferrer"
            className={`no-underline px-5 py-2.5 active:scale-98 transition-all font-bold text-xs tracking-wider uppercase rounded-full shadow-sm flex items-center gap-2 ${
              isTransparent
                ? "bg-transparent border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                : "bg-[#25D366] text-white hover:bg-[#20ba59]"
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.723-1.455L0 24zm6.59-4.846c1.665.988 3.3.15 4.972.152 5.51-.003 9.995-4.493 9.998-10.007.002-2.673-1.037-5.186-2.927-7.078-1.89-1.891-4.401-2.932-7.075-2.932-5.515 0-10.002 4.49-10.004 10.009-.001 1.93.476 3.81 1.38 5.485l-.974 3.56 3.655-.959c1.6.874 3.4.15 4.972.15zm8.475-6.852c-.228-.114-1.347-.665-1.556-.74-.208-.076-.36-.114-.512.114-.152.228-.588.74-.721.89-.133.15-.265.17-.493.057-.228-.114-.962-.355-1.832-1.13-.677-.604-1.134-1.35-1.267-1.578-.133-.228-.014-.351.099-.464.103-.102.228-.265.342-.398.114-.133.152-.228.228-.38.076-.152.038-.285-.019-.398-.057-.114-.512-1.233-.701-1.688-.184-.443-.368-.383-.512-.39-.132-.006-.284-.007-.436-.007-.152 0-.4-.057-.608.171-.208.228-.797.779-.797 1.898s.816 2.204.93 2.356c.114.152 1.606 2.451 3.892 3.438.544.234.968.374 1.3.48.546.173 1.043.149 1.435.09.438-.066 1.347-.55 1.537-1.082.19-.532.19-.988.133-1.082-.057-.095-.208-.152-.436-.266z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          {!mobileOpen && (
            <a
              href="https://wa.me/918431581219"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full flex items-center justify-center shadow-sm transition-all ${
                isTransparent
                  ? "bg-transparent border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                  : "bg-[#25D366] text-white hover:bg-[#20ba59]"
              }`}
              aria-label="WhatsApp"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.723-1.455L0 24zm6.59-4.846c1.665.988 3.3.15 4.972.152 5.51-.003 9.995-4.493 9.998-10.007.002-2.673-1.037-5.186-2.927-7.078-1.89-1.891-4.401-2.932-7.075-2.932-5.515 0-10.002 4.49-10.004 10.009-.001 1.93.476 3.81 1.38 5.485l-.974 3.56 3.655-.959c1.6.874 3.4.15 4.972.15zm8.475-6.852c-.228-.114-1.347-.665-1.556-.74-.208-.076-.36-.114-.512.114-.152.228-.588.74-.721.89-.133.15-.265.17-.493.057-.228-.114-.962-.355-1.832-1.13-.677-.604-1.134-1.35-1.267-1.578-.133-.228-.014-.351.099-.464.103-.102.228-.265.342-.398.114-.133.152-.228.228-.38.076-.152.038-.285-.019-.398-.057-.114-.512-1.233-.701-1.688-.184-.443-.368-.383-.512-.39-.132-.006-.284-.007-.436-.007-.152 0-.4-.057-.608.171-.208.228-.797.779-.797 1.898s.816 2.204.93 2.356c.114.152 1.606 2.451 3.892 3.438.544.234.968.374 1.3.48.546.173 1.043.149 1.435.09.438-.066 1.347-.55 1.537-1.082.19-.532.19-.988.133-1.082-.057-.095-.208-.152-.436-.266z" />
              </svg>
            </a>
          )}
          
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 transition-colors focus:outline-hidden text-[#eff3f6] hover:text-white"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed right-0 top-24 bottom-0 w-full md:w-1/2 bg-[#933B5B] md:bg-[#933B5B]/65 md:backdrop-blur-md z-40 flex flex-col justify-between p-8 border-t md:border-t-0 md:border-l border-white/10 animate-fade-in shadow-2xl">
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const isCurrent = currentView === item.id;
              
              return (
                <div key={item.label} className="flex items-center gap-4 justify-between pr-4 border-b border-white/5 pb-2">
                  <a
                    onClick={(e) => handleItemClick(item, e)}
                    className={`no-underline py-2 block text-xl tracking-wide flex-grow cursor-pointer ${
                      isCurrent ? "text-[#e7dfd5] font-bold border-l-4 border-[#819A9C] pl-3" : "text-white font-medium"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.label}
                  </a>

                  {item.id === "contact" && (
                    <a
                      href="https://wa.me/918431581219"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 transition-transform flex items-center justify-center shrink-0 shadow-sm"
                      aria-label="Contact on WhatsApp"
                    >
                      <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.723-1.455L0 24zm6.59-4.846c1.665.988 3.3.15 4.972.152 5.51-.003 9.995-4.493 9.998-10.007.002-2.673-1.037-5.186-2.927-7.078-1.89-1.891-4.401-2.932-7.075-2.932-5.515 0-10.002 4.49-10.004 10.009-.001 1.93.476 3.81 1.38 5.485l-.974 3.56 3.655-.959c1.6.874 3.4.15 4.972.15zm8.475-6.852c-.228-.114-1.347-.665-1.556-.74-.208-.076-.36-.114-.512.114-.152.228-.588.74-.721.89-.133.15-.265.17-.493.057-.228-.114-.962-.355-1.832-1.13-.677-.604-1.134-1.35-1.267-1.578-.133-.228-.014-.351.099-.464.103-.102.228-.265.342-.398.114-.133.152-.228.228-.38.076-.152.038-.285-.019-.398-.057-.114-.512-1.233-.701-1.688-.184-.443-.368-.383-.512-.39-.132-.006-.284-.007-.436-.007-.152 0-.4-.057-.608.171-.208.228-.797.779-.797 1.898s.816 2.204.93 2.356c.114.152 1.606 2.451 3.892 3.438.544.234.968.374 1.3.48.546.173 1.043.149 1.435.09.438-.066 1.347-.55 1.537-1.082.19-.532.19-.988.133-1.082-.057-.095-.208-.152-.436-.266z" />
                      </svg>
                    </a>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="space-y-6">
            <a
              href="https://wa.me/918431581219"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline w-full text-center bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-98 font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.723-1.455L0 24zm6.59-4.846c1.665.988 3.3.15 4.972.152 5.51-.003 9.995-4.493 9.998-10.007.002-2.673-1.037-5.186-2.927-7.078-1.89-1.891-4.401-2.932-7.075-2.932-5.515 0-10.002 4.49-10.004 10.009-.001 1.93.476 3.81 1.38 5.485l-.974 3.56 3.655-.959c1.6.874 3.4.15 4.972.15zm8.475-6.852c-.228-.114-1.347-.665-1.556-.74-.208-.076-.36-.114-.512.114-.152.228-.588.74-.721.89-.133.15-.265.17-.493.057-.228-.114-.962-.355-1.832-1.13-.677-.604-1.134-1.35-1.267-1.578-.133-.228-.014-.351.099-.464.103-.102.228-.265.342-.398.114-.133.152-.228.228-.38.076-.152.038-.285-.019-.398-.057-.114-.512-1.233-.701-1.688-.184-.443-.368-.383-.512-.39-.132-.006-.284-.007-.436-.007-.152 0-.4-.057-.608.171-.208.228-.797.779-.797 1.898s.816 2.204.93 2.356c.114.152 1.606 2.451 3.892 3.438.544.234.968.374 1.3.48.546.173 1.043.149 1.435.09.438-.066 1.347-.55 1.537-1.082.19-.532.19-.988.133-1.082-.057-.095-.208-.152-.436-.266z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-white/55 text-xs">
              <Shield size={14} className="text-[#819A9C]" />
              <span>Koin Interior Architecture</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
