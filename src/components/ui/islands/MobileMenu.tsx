import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className={cn('lg:hidden', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-ioc-gray-dark hover:text-ioc-blue transition-colors focus:outline-none focus:ring-0 focus:shadow-none active:outline-none active:ring-0 active:shadow-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 top-20"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed top-20 left-0 right-0 bg-white z-50" style={{ outline: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', borderTop: '1px solid #e5e7eb' }}>
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-lg font-semibold text-ioc-gray-dark hover:text-ioc-blue transition-colors focus:outline-none focus:ring-0 focus:shadow-none active:outline-none active:ring-0 active:shadow-none no-underline"
                  style={{ textDecoration: 'none', outline: 'none', boxShadow: 'none', WebkitTapHighlightColor: 'transparent' }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="tel:3852752110"
                className="block py-3 text-lg font-semibold text-ioc-blue hover:text-ioc-blue-dark focus:outline-none focus:ring-0 focus:shadow-none active:outline-none active:ring-0 active:shadow-none no-underline"
                style={{ textDecoration: 'none', outline: 'none', boxShadow: 'none', WebkitTapHighlightColor: 'transparent' }}
                onClick={() => setIsOpen(false)}
              >
                (385) 275-2110
              </a>
              <a
                href="/book"
                className="block w-full py-3 px-6 text-center bg-ioc-blue text-white rounded-lg font-semibold hover:bg-ioc-blue-dark transition-colors focus:outline-none focus:ring-0 focus:shadow-none active:outline-none active:ring-0 active:shadow-none no-underline"
                style={{ textDecoration: 'none', outline: 'none', boxShadow: 'none', WebkitTapHighlightColor: 'transparent' }}
                onClick={() => setIsOpen(false)}
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

