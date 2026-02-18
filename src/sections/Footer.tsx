import { Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servicios: [
      { label: 'Coaching Ejecutivo', href: '#servicios' },
      { label: 'Selección Estratégica', href: '#servicios' },
      { label: 'Equipos de Alto Rendimiento', href: '#programas' },
      { label: 'Formaciones', href: '#servicios' },
    ],
    programas: [
      { label: 'LAE N1 - Liderazgo', href: '#programas' },
      { label: 'LAE N2 - Adaptativo', href: '#programas' },
      { label: 'EAR - Equipos', href: '#programas' },
      { label: 'Selección Directiva', href: '#programas' },
    ],
    empresa: [
      { label: 'Nuestra Esencia', href: '#equipo' },
      { label: 'Equipo', href: '#equipo' },
      { label: 'Metodología', href: '#metodologia' },
      { label: 'Testimonios', href: '#testimonios' },
    ],
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-veralya-dark text-white">
      {/* Main Footer */}
      <div className="w-full px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-7xl mx-auto">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-veralya-green flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">V</span>
              </div>
              <span className="font-display font-semibold text-2xl">Veralya</span>
            </div>
            <p className="font-body text-white/70 mb-6 max-w-sm leading-relaxed">
              Transformamos equipos y potenciamos líderes mediante coaching ejecutivo, 
              selección estratégica y programas de alto rendimiento.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-veralya-green" />
                <span className="font-body text-sm">
                  C. Marie Curie, 9, 28521 Rivas-Vaciamadrid, Madrid
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-veralya-green" />
                <a
                  href="mailto:info@veralyaconsulting.com"
                  className="font-body text-sm hover:text-veralya-green transition-colors"
                >
                  info@veralyaconsulting.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-veralya-green" />
                <a
                  href="tel:+34600123456"
                  className="font-body text-sm hover:text-veralya-green transition-colors"
                >
                  +34 600 123 456
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Programas</h4>
            <ul className="space-y-3">
              {footerLinks.programas.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
            <p className="font-body text-sm text-white/50">
              {currentYear} Veralya Consulting. Todos los derechos reservados.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-veralya-green hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-veralya-green hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@veralyaconsulting.com"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-veralya-green hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <button className="font-body text-sm text-white/50 hover:text-white transition-colors">
                Política de privacidad
              </button>
              <button className="font-body text-sm text-white/50 hover:text-white transition-colors">
                Aviso legal
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
