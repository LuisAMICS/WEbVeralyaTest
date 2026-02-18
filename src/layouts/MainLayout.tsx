import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
    // Close mobile menu on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { href: '/soluciones', label: 'Soluciones' },
    { href: '/equipo-veralya', label: 'Equipo Veralya' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="grain-overlay">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="nav-item flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-veralya-green flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-display font-bold text-lg">V</span>
            </div>
            <span
              className={`font-display font-semibold text-xl transition-colors duration-300 ${isScrolled ? 'text-veralya-dark' : 'text-veralya-dark'
                }`}
            >
              Veralya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-item underline-anim font-body text-sm font-medium transition-colors duration-300 ${isActive(link.href)
                  ? 'text-veralya-green'
                  : 'text-gray-700 hover:text-veralya-green'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block nav-item">
            <Link
              to="/contacto"
              className="magnetic-btn px-6 py-3 bg-veralya-green text-white font-body text-sm font-medium rounded-full hover:bg-veralya-dark transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Agenda tu diagnóstico
            </Link>
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
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-display text-2xl text-veralya-dark hover:text-veralya-green transition-colors duration-300"
          >
            Inicio
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl text-veralya-dark hover:text-veralya-green transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full"
          >
            Agenda tu diagnóstico
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-veralya-dark text-white">
        {/* Main Footer */}
        <div className="w-full px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-7xl mx-auto">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-veralya-green flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">V</span>
                </div>
                <span className="font-display font-semibold text-2xl">Veralya</span>
              </Link>
              <p className="font-body text-white/70 mb-6 max-w-sm leading-relaxed">
                Transformamos equipos y potenciamos líderes mediante coaching ejecutivo,
                selección estratégica y programas de alto rendimiento.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70">
                  <span className="text-veralya-green">📍</span>
                  <span className="font-body text-sm">
                    C. Marie Curie, 9, 28521 Rivas-Vaciamadrid, Madrid
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="text-veralya-green">✉️</span>
                  <a
                    href="mailto:info@veralyaconsulting.com"
                    className="font-body text-sm hover:text-veralya-green transition-colors"
                  >
                    info@veralyaconsulting.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="text-veralya-green">📞</span>
                  <a
                    href="tel:+34646181150"
                    className="font-body text-sm hover:text-veralya-green transition-colors"
                  >
                    +34 646 18 11 50
                  </a>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-display font-semibold text-lg mb-6">Servicios</h4>
              <ul className="space-y-3">
                <li><Link to="/soluciones" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Coaching Ejecutivo</Link></li>
                <li><Link to="/soluciones" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Selección Estratégica</Link></li>
                <li><Link to="/soluciones" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Equipos de Alto Rendimiento</Link></li>
                <li><Link to="/soluciones" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Formaciones</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6">Empresa</h4>
              <ul className="space-y-3">
                <li><Link to="/equipo-veralya" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Quiénes Somos</Link></li>
                <li><Link to="/equipo-veralya" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Nuestro Equipo</Link></li>
                <li><Link to="/soluciones" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Metodología</Link></li>
                <li><Link to="/contacto" className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><span className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors cursor-pointer">Política de Privacidad</span></li>
                <li><span className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors cursor-pointer">Aviso Legal</span></li>
                <li><span className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors cursor-pointer">Política de Cookies</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="w-full px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
              <p className="font-body text-sm text-white/50">
                {new Date().getFullYear()} Veralya Consulting. Todos los derechos reservados.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-veralya-green hover:text-white transition-colors duration-300"
                >
                  <span className="text-lg">in</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-veralya-green hover:text-white transition-colors duration-300"
                >
                  <span className="text-lg">📷</span>
                </a>
                <a
                  href="mailto:info@veralyaconsulting.com"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-veralya-green hover:text-white transition-colors duration-300"
                >
                  <span className="text-lg">✉️</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
