import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav items on load
    gsap.fromTo(
      '.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#metodologia', label: 'Metodología' },
    { href: '#programas', label: 'Programas' },
    { href: '#equipo', label: 'Equipo' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="nav-item flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-full bg-veralya-green flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-display font-bold text-lg">V</span>
            </div>
            <span
              className={`font-display font-semibold text-xl transition-colors duration-300 ${
                isScrolled ? 'text-veralya-dark' : 'text-veralya-dark'
              }`}
            >
              Veralya
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`nav-item underline-anim font-body text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-veralya-green'
                    : 'text-gray-700 hover:text-veralya-green'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block nav-item">
            <button
              onClick={() => scrollToSection('#contacto')}
              className="magnetic-btn px-6 py-3 bg-veralya-green text-white font-body text-sm font-medium rounded-full hover:bg-veralya-dark transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Agenda tu diagnóstico
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden nav-item p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-veralya-dark" />
            ) : (
              <Menu className="w-6 h-6 text-veralya-dark" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-display text-2xl text-veralya-dark hover:text-veralya-green transition-colors duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contacto')}
            className="mt-8 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full"
          >
            Agenda tu diagnóstico
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
