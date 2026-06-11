import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
   LogoSVG — Proportionally scaled spiritual logo.
   Uses clamp() for fluid sizing. Preserves aspect ratio via viewBox.
   ═══════════════════════════════════════════════════════════════════════════ */
const LogoSVG = ({ className = "w-[clamp(3.5rem,5vw,5rem)] h-auto" }) => (
   <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className={`max-w-full ${className}`}>
                <defs>
                  <linearGradient id="sunGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB300" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#F57C00" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="templeGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D84315" stopOpacity="1" />
                    <stop offset="100%" stopColor="#B71C1C" stopOpacity="1" />
                  </linearGradient>
                  <radialGradient id="auraGradientFooter" cx="50%" cy="30%">
                    <stop offset="0%" stopColor="#FFB300" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F57C00" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Icon section */}
                <g transform="translate(10, 10)">
                  {/* Spiritual aura */}
                  <circle cx="40" cy="40" r="38" fill="url(#auraGradientFooter)" />

                  {/* Rising sun rays */}
                  <g opacity="0.6">
                    <line x1="40" y1="8" x2="40" y2="0" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="55" y1="12" x2="61" y2="6" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="65" y1="24" x2="73" y2="20" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="68" y1="40" x2="76" y2="40" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="25" y1="12" x2="19" y2="6" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="15" y1="24" x2="7" y2="20" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="12" y1="40" x2="4" y2="40" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>

                  {/* Sun circle */}
                  <circle cx="40" cy="24" r="10" fill="url(#sunGradientFooter)" stroke="#FFB300" strokeWidth="2"/>

                  {/* Ganga river waves */}
                  <path d="M 8 60 Q 16 57 24 60 T 40 60 T 56 60 T 72 60" stroke="#1565C0" strokeWidth="2" fill="none" opacity="0.5"/>
                  <path d="M 8 64 Q 20 61 32 64 T 48 64 T 64 64 T 72 64" stroke="#1565C0" strokeWidth="2" fill="none" opacity="0.3"/>

                  {/* Temple structure */}
                  <rect x="28" y="40" width="24" height="20" fill="url(#templeGradientFooter)" rx="1"/>
                  <path d="M 25.6 40 L 40 32 L 54.4 40 Z" fill="url(#templeGradientFooter)"/>
                  <path d="M 30.4 32 L 40 27.2 L 49.6 32 Z" fill="url(#templeGradientFooter)"/>

                  {/* Temple kalash */}
                  <circle cx="40" cy="27.2" r="2" fill="#FFB300"/>
                  <rect x="39.2" y="24" width="1.6" height="3.2" fill="#FFB300"/>

                  {/* Om symbol */}
                  <path d="M 38.4 48 Q 38.4 46.4 40 46.4 Q 41.6 46.4 41.6 48 Q 41.6 49.6 40 49.6 Q 38.4 49.6 38.4 48 M 40 46.4 L 40 44 M 41.6 48 Q 43.2 48 43.2 49.6"
                        stroke="#ffffff" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>

                  {/* Temple door */}
                  <rect x="37.6" y="50.4" width="4.8" height="8" fill="#FFB300" opacity="0.3" rx="0.4"/>
                </g>

                {/* Text section */}
                <g transform="translate(95, 15)">
                  <text x="0" y="15" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700" fill="#B71C1C" letterSpacing="1.5">Varanasi</text>
                  <text x="0" y="48" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="800" fill="#D84315" letterSpacing="-1">SN</text>
                  <text x="0" y="65" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#F57C00" letterSpacing="2" style={{textTransform:'uppercase'}}>TOUR &amp; TRAVELS</text>
                </g>
              </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   NAV_ITEMS — Single source of truth for all navigation links.
   ═══════════════════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Tour Packages', path: '/tour-packages', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { label: 'Pickup & Route Guide', path: '/pickup-route-guide', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { 
    label: 'Services', 
    path: null, 
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    children: [
      { label: 'Car Rentals', path: '/car-rentals' },
      { label: 'Hotels', path: '/hotels' },
    ]
  },
  { label: 'Enquire', path: '/enquire-now', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { label: 'Blog', path: '/blog', matchPrefix: true, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   useOverflowDetection — Custom hook that uses ResizeObserver to detect
   when navbar content overflows its container.
   
   Instead of a fixed breakpoint (md:768px), this measures the actual
   rendered width of all nav links vs available space. When links don't 
   fit → returns shouldCollapse = true → hamburger appears.
   ═══════════════════════════════════════════════════════════════════════════ */
function useOverflowDetection(navRef, linksRef) {
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const rafRef = useRef(null);

  const checkOverflow = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!navRef.current || !linksRef.current) return;

      const navWidth = navRef.current.offsetWidth;
      const linksWidth = linksRef.current.scrollWidth;
      // Reserve space for logo (~200px) + padding (~80px) + safety margin (40px)
      const logoAndPadding = 320;
      const availableSpace = navWidth - logoAndPadding;

      setShouldCollapse(linksWidth > availableSpace);
    });
  }, [navRef, linksRef]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial check
    checkOverflow();

    // Observe resize of the nav container
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(nav);

    // Also listen for window resize as a fallback
    window.addEventListener('resize', checkOverflow, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [navRef, checkOverflow]);

  return shouldCollapse;
}

/* ═══════════════════════════════════════════════════════════════════════════
   NavLink — Desktop nav link with hover underline micro-interaction
   and active state indicator.
   ═══════════════════════════════════════════════════════════════════════════ */
function NavLink({ to, label, isActive, isLightText, matchPrefix }) {
  const baseClasses = "font-sans text-[clamp(0.65rem,0.6rem+0.2vw,0.75rem)] font-semibold tracking-[0.15em] uppercase transition-colors whitespace-nowrap nav-link-hover";
  
  const colorClass = isActive 
    ? 'text-gold nav-link-active' 
    : isLightText 
      ? 'text-white/80 hover:text-white' 
      : 'text-charcoal/70 hover:text-charcoal';

  return (
    <Link className={`${baseClasses} ${colorClass}`} to={to}>
      {label}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ServicesDropdown — Desktop dropdown with elegant scale + fade animation.
   Uses group-hover for CSS-only activation (no JS state needed).
   ═══════════════════════════════════════════════════════════════════════════ */
function ServicesDropdown({ children, isActive, isLightText, location }) {
  return (
    <div className="relative group py-2">
      <button 
        className={`font-sans text-[clamp(0.65rem,0.6rem+0.2vw,0.75rem)] font-semibold tracking-[0.15em] uppercase transition-colors whitespace-nowrap flex items-center gap-1.5 nav-link-hover ${
          isActive ? 'text-gold nav-link-active' : (isLightText ? 'text-white/80 group-hover:text-white' : 'text-charcoal/70 group-hover:text-charcoal')
        }`}
        aria-haspopup="true"
        aria-expanded="false"
      >
        Services
        <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
        <div className="pt-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100/80 py-2 overflow-hidden flex flex-col ring-1 ring-black/5">
            {children.map((child) => (
              <Link 
                key={child.path}
                className={`px-5 py-3.5 font-sans text-xs font-semibold tracking-[0.1em] uppercase hover:bg-gray-50 transition-all duration-200 ${
                  location.pathname === child.path ? 'text-gold bg-gold/5' : 'text-charcoal hover:text-charcoal'
                }`} 
                to={child.path}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MobileDrawer — Premium glassmorphism slide-in drawer.
   
   Features:
   - Dark glass background with backdrop blur
   - Staggered framer-motion animations for menu items
   - Body scroll lock when open
   - Touch-friendly large tap targets (48px min)
   - Mobile safe-area support
   - Gradient accent line at top
   ═══════════════════════════════════════════════════════════════════════════ */
function MobileDrawer({ isOpen, onClose, location }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position before locking
      const scrollY = window.scrollY;
      document.body.classList.add('overflow-locked');
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('overflow-locked');
      document.body.style.top = '';
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    return () => {
      document.body.classList.remove('overflow-locked');
      document.body.style.top = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if a path is active
  const isPathActive = (item) => {
    if (item.matchPrefix) return location.pathname.startsWith(item.path);
    return location.pathname === item.path;
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }
    },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[min(80vw,380px)] drawer-glass z-[60] shadow-2xl flex flex-col safe-area-top"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 35,
              mass: 0.8,
            }}
          >
            {/* Gradient accent line */}
            <div className="drawer-accent-line flex-shrink-0" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 shrink-0">
                <LogoSVG className="w-40 h-auto" />
              </Link>
              <motion.button
                onClick={onClose}
                className="text-white/50 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                aria-label="Close menu"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            {/* Drawer Links — Staggered animation */}
            <motion.div
              className="flex-1 overflow-y-auto py-6 px-4 space-y-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_ITEMS.map((item) => {
                // Services accordion
                if (item.children) {
                  const isChildActive = item.children.some(c => location.pathname === c.path);
                  return (
                    <motion.div key="services" variants={itemVariants}>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all duration-200 ${
                          isServicesOpen || isChildActive
                            ? 'bg-white/10 text-gold'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                          {item.label}
                        </div>
                        <svg className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Services sub-items */}
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            className="pl-12 mt-1 space-y-1 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                onClick={handleLinkClick}
                                className={`block py-2.5 font-sans text-sm font-medium transition-colors ${
                                  location.pathname === child.path
                                    ? 'text-gold'
                                    : 'text-white/50 hover:text-white/80'
                                }`}
                                to={child.path}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                // Regular nav items
                const active = isPathActive(item);
                return (
                  <motion.div key={item.path} variants={itemVariants}>
                    <Link
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all duration-200 ${
                        active
                          ? 'bg-gold/15 text-gold'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                      to={item.path}
                    >
                      <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Drawer Footer — CTA button */}
            <motion.div
              className="p-5 border-t border-white/10 safe-area-bottom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                onClick={handleLinkClick}
                className="bg-gold text-charcoal font-bold text-sm px-6 py-4 rounded-xl flex items-center justify-center transition-all hover:brightness-110 active:scale-[0.97] w-full shadow-lg shadow-gold/20"
                to="/enquire-now"
              >
                Get Free Quote
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Navbar — Main export.

   CORE INNOVATION: ResizeObserver-based overflow detection.
   
   Instead of @media(max-width:768px), a hidden measurement div renders
   all nav links. A ResizeObserver watches the nav container. When the
   measured links width exceeds available space → hamburger appears.
   
   This works perfectly on every device width including:
   ultrawide, laptop, tablet, phone, fold devices, landscape mobile.
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Refs for overflow detection
  const navRef = useRef(null);
  const linksRef = useRef(null);
  const shouldCollapse = useOverflowDetection(navRef, linksRef);

  // Scroll detection for transparent → solid header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isLightText = isHome;
  const isServicesActive = location.pathname === '/car-rentals' || location.pathname === '/hotels';

  // Dynamic header background
  const headerBgClass = isHome
    ? (scrolled 
        ? 'bg-charcoal/95 backdrop-blur-md shadow-xl shadow-black/10' 
        : 'bg-transparent')
    : (scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
        : 'bg-white shadow-sm border-b border-gray-100');

  // Check if a nav item is active
  const isActive = (item) => {
    if (item.matchPrefix) return location.pathname.startsWith(item.path);
    return location.pathname === item.path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${headerBgClass}`}
    >
      <nav 
        ref={navRef}
        className="w-full flex items-center justify-between gap-4"
        style={{
          padding: `clamp(0.25rem, 0.2rem + 0.2vw, 0.5rem) clamp(1rem, 2vw + 0.5rem, 4rem)`,
        }}
        aria-label="Main navigation"
      >
        {/* ─── LEFT: Hamburger (visible when collapsed) ─── */}
        {shouldCollapse && (
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2.5 -ml-1 rounded-xl transition-all duration-200 ${
                isLightText 
                  ? 'text-white hover:bg-white/10 active:bg-white/15' 
                  : 'text-charcoal hover:bg-gray-100 active:bg-gray-200'
              }`}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        )}

        {/* ─── CENTER (mobile) / LEFT (desktop): Logo ─── */}
        <Link 
          className={`flex items-center gap-3 transition-all duration-300 ${
            shouldCollapse ? 'flex-1 justify-center' : 'flex-shrink-0'
          }`}
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Varanasi SN Tour & Travels — Home"
        >
          <LogoSVG 
            className={`h-auto transition-all duration-500 ${
              shouldCollapse 
                ? 'w-[clamp(9rem,18vw,12rem)]' 
                : 'w-[clamp(14rem,22vw,16rem)]'
            }`} 
          />
        </Link>

        {/* ─── Invisible spacer (mobile only, keeps logo centered) ─── */}
        {shouldCollapse && <div className="w-10 flex-shrink-0" />}

        {/* ─── RIGHT: Desktop Nav Links (visible when NOT collapsed) ─── */}
        {/* 
          This is the VISIBLE nav links container.
          Hidden when shouldCollapse = true.
        */}
        {!shouldCollapse && (
          <div 
            className="flex items-center flex-shrink-0"
            style={{ gap: 'clamp(1rem, 1.5vw + 0.25rem, 2rem)' }}
          >
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <ServicesDropdown
                    key="services"
                    children={item.children}
                    isActive={isServicesActive}
                    isLightText={isLightText}
                    location={location}
                  />
                );
              }
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  isActive={isActive(item)}
                  isLightText={isLightText}
                  matchPrefix={item.matchPrefix}
                />
              );
            })}

            {/* CTA Button */}
            <Link
              className="bg-gold text-charcoal font-bold text-[clamp(0.7rem,0.65rem+0.2vw,0.85rem)] rounded-full inline-flex items-center justify-center transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-md whitespace-nowrap ml-1"
              style={{ padding: 'clamp(0.5rem, 0.4rem + 0.3vw, 0.7rem) clamp(1.25rem, 1rem + 0.5vw, 1.75rem)' }}
              to="/enquire-now"
            >
              Get Free Quote
            </Link>
          </div>
        )}

        {/* ─── HIDDEN MEASUREMENT DIV ───
          This renders all nav links in an invisible container.
          The useOverflowDetection hook measures its scrollWidth
          to determine if links fit in the available navbar space.
          
          This is the key to content-aware responsiveness:
          no hardcoded breakpoints, just actual rendered widths.
        */}
        <div 
          ref={linksRef}
          aria-hidden="true"
          className="flex items-center absolute invisible pointer-events-none whitespace-nowrap"
          style={{ 
            gap: 'clamp(1rem, 1.5vw + 0.25rem, 2rem)',
            top: -9999,
            left: -9999,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <span 
              key={item.label} 
              className="font-sans text-[clamp(0.65rem,0.6rem+0.2vw,0.75rem)] font-semibold tracking-[0.15em] uppercase whitespace-nowrap"
            >
              {item.label}
            </span>
          ))}
          {/* Account for CTA button width */}
          <span 
            className="font-bold text-[clamp(0.7rem,0.65rem+0.2vw,0.85rem)] whitespace-nowrap"
            style={{ padding: '0.5rem 1.75rem' }}
          >
            Get Free Quote
          </span>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─── */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        location={location}
      />
    </header>
  );
}
