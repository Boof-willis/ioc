import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  className?: string;
}

export default function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Insurance', href: '/insurance' },
    { label: 'Providers', href: '/providers' },
    { label: 'Location', href: '/location' },
  ];

  return (
    <div className={className} style={{ display: 'block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2"
        aria-label="Toggle menu"
        style={{
          color: '#1F2937',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 40,
            }}
          />
          
          {/* Mobile Menu */}
          <nav
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              zIndex: 50,
              borderTop: '1px solid #9ca3af',
              borderBottom: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              boxShadow: 'none',
              outline: 'none',
              transform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
          >
            <div style={{ padding: '24px 16px' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 0',
                    fontSize: '18px',
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
                href="tel:3852752110"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#4A90E2',
                  textDecoration: 'none',
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                (385) 275-2110
              </a>
              
              <a
                href="/book"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 24px',
                  marginTop: '8px',
                  textAlign: 'center',
                  fontSize: '16px',
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
