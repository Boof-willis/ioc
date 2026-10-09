import { useState, useEffect, useRef } from 'react';

interface MobileMenuProps {
  className?: string;
}

export default function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  // Lock page scroll while the menu is open.
  // Note: global.css sets `html { overflow-x: hidden }`, which stops `body`'s
  // overflow from propagating to the viewport, so we must lock `html` directly.
  // iOS Safari also ignores overflow locking for touch, so we block touchmove
  // outside the menu panel as well.
  useEffect(() => {
    if (!isOpen) return;
    setIsExiting(false);

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevOverscroll = html.style.overscrollBehavior;
    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';

    const blockScroll = (e: Event) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
    };
    document.addEventListener('touchmove', blockScroll, { passive: false });
    document.addEventListener('wheel', blockScroll, { passive: false });

    return () => {
      html.style.overflow = prevOverflow;
      html.style.overscrollBehavior = prevOverscroll;
      document.removeEventListener('touchmove', blockScroll);
      document.removeEventListener('wheel', blockScroll);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsExiting(false);
    }, 280);
  };

  const navItems = [
    { label: 'Services', href: '/#services' },
    { label: 'Our Team', href: '/team' },
    { label: 'Insurance', href: '/#insurance' },
    { label: 'Location', href: '/#location' },
    { label: 'Reviews', href: '/#testimonials' },
    { label: 'Patient Resources', href: '/patient-resources' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login', href: 'https://pp-wfe-102.advancedmd.com/156528/account/logon' },
  ];

  const showOverlay = isOpen || isExiting;
  const overlayClosing = isExiting;
  const panelClosing = isExiting;

  return (
    <div className={className} style={{ display: 'block' }}>
      <button
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
        className="lg:hidden relative w-10 h-10 flex items-center justify-center"
        aria-label="Toggle menu"
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div className="relative w-6 h-5">
          <span
            className="absolute left-0 w-full h-0.5 bg-ioc-gray-dark transition-all duration-300 ease-in-out"
            style={{
              top: isOpen ? '50%' : '25%',
              transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="absolute left-0 w-full h-0.5 bg-ioc-gray-dark transition-all duration-300 ease-in-out"
            style={{
              bottom: isOpen ? '50%' : '25%',
              transform: isOpen ? 'translateY(50%) rotate(-45deg)' : 'none',
            }}
          />
        </div>
      </button>

      {showOverlay && (
        <>
          {/* Backdrop */}
          <div
            role="presentation"
            onClick={closeMenu}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 40,
              opacity: overlayClosing ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Mobile Menu */}
          <nav
            ref={panelRef}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#ffffff',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'safe center',
              alignItems: 'center',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              transform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              clipPath: panelClosing ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
              opacity: panelClosing ? 0 : 1,
              transition: 'clip-path 0.3s ease-in-out, opacity 0.3s ease-in-out',
            }}
          >
            <div style={{ padding: '24px 16px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '12px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1F2937',
                    textDecoration: 'none',
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {item.label}
                </a>
              ))}

              <a
                href="tel:3853867026"
                onClick={closeMenu}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px 0',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#4A90E2',
                  textDecoration: 'none',
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                (385) 386-7026
              </a>

              <a
                href="https://pp-wfe-101.advancedmd.com/163338/onlineintake/demographic"
                onClick={closeMenu}
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '280px',
                  padding: '16px 24px',
                  marginTop: '16px',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#ffffff',
                  backgroundColor: '#4A90E2',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                Book Online
              </a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
