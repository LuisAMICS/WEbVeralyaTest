import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Quote, Star, CheckCircle, Menu, X, ChevronDown, BookOpen, Award, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const words = titleRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words, { y: 100, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.3
        });
      }

      // Image reveal
      gsap.fromTo(imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.2 },
        { clipPath: 'ellipse(75% 90% at 60% 50%)', scale: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 }
      );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: 150, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      });

      // Title blur on scroll
      gsap.to(titleRef.current, {
        filter: 'blur(10px)', opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '50% top', scrub: true }
      });

      // Scroll animations
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(section, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const services = [
    {
      title: 'Evaluación DISC + Fuerzas Impulsoras',
      subtitle: 'El diagnóstico que transforma equipos',
      description: 'Identifica cómo actúa cada miembro del equipo y qué le motiva realmente. Mejora la comunicación y reduce fricciones internas.',
      benefits: ['Perfil conductual completo', '6 motivadores fundamentales', 'Informe de 50 páginas', 'Feedback personalizado'],
      features: ['Análisis DISC (D-I-S-C)', 'Fuerzas Impulsoras', 'Talent Insights', 'Comparativa de perfiles']
    },
    {
      title: 'Programa LAE N1 - Liderazgo',
      subtitle: 'Autoconocimiento del líder',
      description: 'Descubre las dimensiones ocultas de tu estilo de liderazgo mediante herramientas científicamente validadas.',
      benefits: ['Mayor consciencia del impacto', 'Comprensión de fortalezas', 'Plan de acción SMART', 'Resultados medibles'],
      features: ['Evaluación DISC completa', 'Modelo O.S.A.R', '5 dimensiones del liderazgo', '50 páginas de análisis']
    },
    {
      title: 'Programa LAE N2 - Adaptativo',
      subtitle: 'Adaptación del líder al equipo',
      description: 'Potencia tus hablidades para identificar estilos DISC en colaboradores y adaptar tu enfoque para maximizar el potencial.',
      benefits: ['85% mejora en comunicación', '67% reducción de conflictos', '73% más compromiso', '92% adaptabilidad'],
      features: ['Semáforo del Liderazgo', 'Gestión de conflictos', 'Escucha generativa', 'Preguntas poderosas']
    },
    {
      title: 'Programa EAR - Equipos',
      subtitle: 'Equipos de Alto Rendimiento',
      description: 'Transforma equipos convencionales en equipos de alto rendimiento mediante autoconocimiento y principios sistémicos.',
      benefits: ['37% más productividad', '48% mejor satisfacción', 'ROI 387% primer año', 'Equipos cohesionados'],
      features: ['3 leyes sistémicas', 'Superación piloto automático', '6 módulos progresivos', 'Seguimiento continuo']
    },
    {
      title: 'Selección Estratégica',
      subtitle: 'Encuentra el talento ideal',
      description: 'Proceso estructurado en tres fases para encontrar al candidato perfecto para tu organización.',
      benefits: ['Precisión científica', 'Ahorro de tiempo', 'Reducción de riesgo', 'Acompañamiento completo'],
      features: ['Consultoría gratuita inicial', 'Definición perfil ideal', 'Talent Comparison Report', '3-5 candidatos finalistas']
    }
  ];

  const discProfiles = [
    { letter: 'D', name: 'Dominancia', desc: 'Resultados, decisión, acción', color: 'bg-veralya-green', textColor: 'text-white' },
    { letter: 'I', name: 'Influencia', desc: 'Comunicación, entusiasmo, personas', color: 'bg-veralya-dark', textColor: 'text-white' },
    { letter: 'S', name: 'Estabilidad', desc: 'Paciencia, apoyo, persistencia', color: 'bg-veralya-accent', textColor: 'text-veralya-dark' },
    { letter: 'C', name: 'Cumplimiento', desc: 'Precisión, calidad, análisis', color: 'bg-veralya-nude', textColor: 'text-veralya-dark' }
  ];

  const motivators = [
    { name: 'Teórico', desc: 'Conocimiento y verdad' },
    { name: 'Utilitario', desc: 'Resultados prácticos' },
    { name: 'Estético', desc: 'Armonía y belleza' },
    { name: 'Social', desc: 'Ayudar a otros' },
    { name: 'Individualista', desc: 'Autonomía y poder' },
    { name: 'Tradicional', desc: 'Orden y estructura' }
  ];

  const testimonials = [
    {
      name: 'Laura G.',
      role: 'CEO startup software educativo',
      location: 'Madrid',
      quote: 'Estábamos desbordados, cada uno tirando en una dirección. El diagnóstico DISC nos hizo ver lo que no queríamos enfrentar: falta de roles claros, comunicación pobre y desgaste. En dos semanas con Veralya, teníamos foco, estructura y un equipo que por fin respiraba en sincronía.'
    },
    {
      name: 'Antonia R.',
      role: 'Directora Comercial',
      location: 'Valencia',
      quote: 'He dirigido equipos comerciales toda mi vida, pero nunca había visto una herramienta que revelara tanto en tan poco tiempo. Gracias al método DISC y a la sesión de feedback con Veralya, entendí por qué algunos de mis mejores vendedores estaban desmotivados.'
    },
    {
      name: 'Miriam G.',
      role: 'Responsable de equipo',
      location: 'Barcelona',
      quote: 'Pensaba que necesitábamos más formación, pero lo que realmente nos faltaba era comprendernos. Veralya nos ayudó a traducir nuestras diferencias en fortalezas. Hoy no solo trabajamos mejor, también nos sentimos mejor como equipo.'
    }
  ];

  const navLinks = [
    { id: 'disc', label: 'Método DISC' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'programas', label: 'Programas' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <div className="grain-overlay">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <img src="./veralya-logo-new.png" alt="Veralya" className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300" />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="font-body text-sm font-medium text-gray-700 hover:text-veralya-green transition-colors underline-anim">
                {link.label}
              </button>
            ))}
          </div>

          <button onClick={() => scrollToSection('contacto')} className="hidden lg:block px-6 py-3 bg-veralya-green text-white font-body text-sm font-medium rounded-full hover:bg-veralya-dark transition-colors shadow-lg">
            Agenda tu diagnóstico
          </button>

          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-veralya-dark" /> : <Menu className="w-6 h-6 text-veralya-dark" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="font-display text-2xl text-veralya-dark hover:text-veralya-green transition-colors">
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollToSection('contacto')} className="mt-8 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full">
              Agenda tu diagnóstico
            </button>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen w-full flex items-center overflow-hidden bg-gradient-light">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-veralya-nude/40 blur-3xl animate-pulse-soft" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-veralya-light/30 blur-3xl" />
          </div>

          <div className="relative z-10 w-full px-6 lg:px-12 py-32">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-[1800px] mx-auto">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-veralya-nude/20 backdrop-blur-sm rounded-full border border-veralya-nude/30 shadow-sm mb-8">
                  <Sparkles className="w-4 h-4 text-veralya-green" />
                  <span className="text-sm font-body text-veralya-dark">Resultados visibles en 30 días</span>
                </div>

                <h1 ref={titleRef} className="hero-title font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-veralya-dark leading-tight mb-6">
                  <span className="word inline-block">Transformamos</span>{' '}
                  <span className="word inline-block text-veralya-green">equipos</span>
                  <br />
                  <span className="word inline-block">con</span>{' '}
                  <span className="word inline-block text-veralya-green">DISC</span>
                </h1>

                <p className="font-body text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                  Evaluación conductual, desarrollo de liderazgo y programas de alto rendimiento
                  basados en el método DISC y Fuerzas Impulsoras para empresas que quieren crecer.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => scrollToSection('disc')} className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-all shadow-lg">
                    Descubre el método DISC
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => scrollToSection('servicios')} className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-veralya-green text-veralya-green font-body font-medium rounded-full hover:bg-veralya-green hover:text-white transition-all">
                    Nuestros servicios
                  </button>
                </div>

                <div className="mt-16 grid grid-cols-3 gap-8">
                  <div className="p-4 bg-veralya-nude/10 rounded-2xl border border-veralya-nude/20">
                    <div className="font-display text-3xl lg:text-4xl font-bold text-veralya-green">500+</div>
                    <div className="font-body text-sm text-gray-500 mt-1">Líderes evaluados</div>
                  </div>
                  <div className="p-4 bg-veralya-nude/10 rounded-2xl border border-veralya-nude/20">
                    <div className="font-display text-3xl lg:text-4xl font-bold text-veralya-green">98%</div>
                    <div className="font-body text-sm text-gray-500 mt-1">Satisfacción</div>
                  </div>
                  <div className="p-4 bg-veralya-nude/10 rounded-2xl border border-veralya-nude/20">
                    <div className="font-display text-3xl lg:text-4xl font-bold text-veralya-green">10+</div>
                    <div className="font-body text-sm text-gray-500 mt-1">Años experiencia</div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div ref={imageRef} className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img src="./hero-image.jpg" alt="Equipo colaborando" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/20 to-transparent" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl floating">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div>
                        <div className="font-display font-semibold text-veralya-dark">Equipos enfocados</div>
                        <div className="font-body text-sm text-gray-500">Más productividad</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-veralya-green text-white rounded-2xl p-4 shadow-xl" style={{ animation: 'float 5s ease-in-out infinite 1s' }}>
                    <div className="font-display font-bold text-2xl">+37%</div>
                    <div className="font-body text-xs opacity-90">Productividad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* DISC Method Section */}
        <section id="disc" className="py-24 lg:py-32 bg-veralya-nude/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-veralya-light/20 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="reveal-section inline-block px-4 py-2 bg-white rounded-full text-veralya-green font-body text-sm font-medium mb-6 shadow-sm">El Método DISC</span>
                <h2 className="reveal-section font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                  Conoce el <span className="text-veralya-green">ADN conductual</span> de tu equipo
                </h2>
                <p className="reveal-section font-body text-lg text-gray-600">
                  El método DISC identifica cuatro estilos de comportamiento que determinan cómo nos comunicamos,
                  tomamos decisiones y respondemos a los desafíos. Combinado con las Fuerzas Impulsoras,
                  descubrimos no solo CÓMO actúas, sino POR QUÉ.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="reveal-section">
                  <h3 className="font-display text-2xl font-semibold text-veralya-dark mb-6">Los 4 estilos DISC</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {discProfiles.map((profile, index) => (
                      <div key={index} className={`${profile.color} ${profile.textColor} rounded-2xl p-6`}>
                        <div className="font-display text-5xl font-bold mb-2">{profile.letter}</div>
                        <div className="font-display font-semibold text-lg mb-1">{profile.name}</div>
                        <div className="font-body text-sm opacity-90">{profile.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reveal-section">
                  <h3 className="font-display text-2xl font-semibold text-veralya-dark mb-6">Las 6 Fuerzas Impulsoras</h3>
                  <div className="space-y-3">
                    {motivators.map((m, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-veralya-nude/10 hover:border-veralya-nude/40 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-veralya-nude/20 flex items-center justify-center text-veralya-green font-display font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-display font-semibold text-veralya-dark">{m.name}</div>
                          <div className="font-body text-sm text-gray-500">{m.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reveal-section bg-white rounded-2xl p-8 shadow-lg border border-veralya-nude/20 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-veralya-nude/5 rounded-full -mr-16 -mt-16" />
                <h3 className="font-display text-2xl font-semibold text-veralya-dark mb-6 text-center italic">¿Qué conseguimos con DISC + Fuerzas Impulsoras?</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    'Identificar cómo actúa cada persona y qué le motiva',
                    'Mejorar la comunicación y reducir fricciones',
                    'Alinear comportamientos con objetivos estratégicos',
                    'Potenciar la productividad y colaboración'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-veralya-nude/5 border border-veralya-nude/10">
                      <CheckCircle className="w-5 h-5 text-veralya-green flex-shrink-0 mt-0.5" />
                      <p className="font-body text-gray-700 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-24 lg:py-32 bg-white relative">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-veralya-nude/15 rounded-full blur-3xl -ml-48 -mb-48" />
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="reveal-section inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">Nuestros Servicios</span>
                <h2 className="reveal-section font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                  Paquetes diseñados para <span className="text-veralya-green">transformar</span>
                </h2>
                <p className="reveal-section font-body text-lg text-gray-600">
                  Cada organización es única. Adaptamos nuestras evaluaciones y programas
                  a tus necesidades específicas para maximizar el impacto.
                </p>
              </div>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="reveal-section bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <button onClick={() => setActiveService(activeService === index ? null : index)} className="w-full p-6 lg:p-8 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-veralya-dark">{service.title}</h3>
                        <p className="font-body text-veralya-green">{service.subtitle}</p>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-veralya-green transition-transform ${activeService === index ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ${activeService === index ? 'max-h-[600px]' : 'max-h-0'}`}>
                      <div className="p-6 lg:p-8 pt-0 border-t border-gray-100">
                        <p className="font-body text-gray-600 mb-6">{service.description}</p>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-display font-semibold text-veralya-dark mb-3">Beneficios</h4>
                            <ul className="space-y-2">
                              {service.benefits.map((b, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-veralya-green" />{b}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-display font-semibold text-veralya-dark mb-3">Incluye</h4>
                            <ul className="space-y-2">
                              {service.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-veralya-accent" />{f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programas" className="py-24 lg:py-32 bg-veralya-dark text-white">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="reveal-section inline-block px-4 py-2 bg-white/10 rounded-full text-veralya-accent font-body text-sm font-medium mb-6">Nuestros Programas</span>
                <h2 className="reveal-section font-display text-4xl lg:text-5xl font-semibold mb-6">
                  Programas basados en <span className="text-veralya-accent">DISC</span>
                </h2>
                <p className="reveal-section font-body text-lg text-white/80">
                  Estructurados para generar cambios profundos y sostenibles en el liderazgo
                  y el rendimiento de los equipos.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'LAE N1',
                    subtitle: 'Liderazgo Altamente Efectivo - Nivel 1',
                    desc: 'Autoconocimiento del líder mediante DISC y Motivadores. 50 páginas de análisis personalizado.',
                    duration: '3 meses',
                    features: ['Perfil DISC completo', '6 motivadores', 'Modelo O.S.A.R', 'Plan SMART']
                  },
                  {
                    title: 'LAE N2',
                    subtitle: 'Liderazgo Adaptativo - Nivel 2',
                    desc: 'Adapta tu estilo según las necesidades del equipo. Identifica perfiles DISC en colaboradores.',
                    duration: '4 meses',
                    features: ['Semáforo del Liderazgo', 'Gestión de conflictos', 'Escucha generativa', '85% mejora comunicación']
                  },
                  {
                    title: 'EAR',
                    subtitle: 'Equipos de Alto Rendimiento',
                    desc: 'Transforma equipos mediante las 3 leyes sistémicas y superación del piloto automático.',
                    duration: '6 meses',
                    features: ['3 leyes sistémicas', '6 módulos progresivos', 'ROI 387%', 'Seguimiento continuo']
                  },
                  {
                    title: 'Selección Directiva',
                    subtitle: 'Proceso de Selección de Talento',
                    desc: 'Proceso en 3 fases con evaluación DISC para encontrar el candidato ideal.',
                    duration: 'Variable',
                    features: ['Consultoría inicial gratis', 'Perfil DISC ideal', 'Talent Comparison', '3-5 finalistas']
                  }
                ].map((program, index) => (
                  <div key={index} className="reveal-section bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-colors border border-white/10 hover:border-veralya-nude/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-2xl font-semibold">{program.title}</h3>
                      <span className="px-3 py-1 bg-veralya-nude/20 text-veralya-nude border border-veralya-nude/30 rounded-full text-sm font-body">{program.duration}</span>
                    </div>
                    <p className="font-body text-veralya-accent mb-3">{program.subtitle}</p>
                    <p className="font-body text-white/80 mb-6">{program.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {program.features.map((f, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm font-body text-white/90 border border-white/5">{f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="equipo" className="py-24 lg:py-32 bg-white">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="reveal-section inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">Nuestro Equipo</span>
                <h2 className="reveal-section font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                  Conoce a las <span className="text-veralya-green">fundadoras</span>
                </h2>
                <p className="reveal-section font-body text-lg text-gray-600">
                  Mónica y Raquel, hermanas y socias, imparten directamente todas las evaluaciones
                  y formaciones, asegurando coherencia metodológica y máxima implicación.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    name: 'Mónica Arroyo Romero',
                    role: 'Cofundadora & Consultora Senior',
                    image: '/team-monica.png',
                    imageClass: 'object-top scale-100',
                    desc: 'Psicóloga y experta en recursos humanos con más de diez años de experiencia en desarrollo del talento y liderazgo en organizaciones internacionales.',
                    specialties: ['Análisis conductual y motivacional (DISC)', 'Fuerzas Impulsoras 3 TTI Success Insights', 'Desarrollo de liderazgo', 'Comunicación efectiva'],
                    credentials: ['Certificada en DISC y Fuerzas Impulsoras', 'Experta en desarrollo del talento', 'Experiencia en organizaciones internacionales']
                  },
                  {
                    name: 'Raquel Arroyo Romero',
                    role: 'Cofundadora & Estratega de Desarrollo',
                    image: '/team-raquel.png',
                    imageClass: 'object-[center_15%] scale-[1.45] origin-top',
                    desc: 'Experta en desarrollo humano y estrategia para pymes y emprendedores. Máster en Desarrollo Humano y Practitioner en PNL.',
                    specialties: ['Estrategia para pymes y emprendedores', 'Programación Neurolingüística (PNL)', 'DISC y Fuerzas Impulsoras TTI', 'Mentalidad y comportamiento organizacional'],
                    credentials: ['Máster en Desarrollo Humano', 'Practitioner en PNL', 'Certificada en DISC y Fuerzas Impulsoras']
                  }
                ].map((member, index) => (
                  <div key={index} className="reveal-section bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
                    <div className="grid md:grid-cols-12 h-full">
                      <div className="md:col-span-5 relative overflow-hidden bg-gray-50">
                        <img src={member.image} alt={member.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${member.imageClass || 'object-top'} group-hover:scale-110`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/20 to-transparent md:bg-gradient-to-r" />
                      </div>
                      <div className="md:col-span-7 p-8 lg:p-12 flex flex-col">
                        <div className="flex-grow">
                          <h3 className="font-display text-2xl lg:text-3xl font-semibold text-veralya-dark mb-1">{member.name}</h3>
                          <p className="font-body text-veralya-green font-medium mb-6 text-sm lg:text-base">{member.role}</p>
                          <p className="font-body text-gray-600 mb-8 leading-relaxed text-sm lg:text-base">{member.desc}</p>

                          <div className="mb-8">
                            <h4 className="font-display font-semibold text-veralya-dark mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400">
                              <BookOpen className="w-4 h-4 text-veralya-green" />
                              Especialidades
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {member.specialties.map((s, i) => (
                                <span key={i} className="px-3 py-1 bg-veralya-light text-veralya-dark text-xs font-body rounded-full">{s}</span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-display font-semibold text-veralya-dark mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400">
                              <Award className="w-4 h-4 text-veralya-green" />
                              Credenciales
                            </h4>
                            <ul className="space-y-2">
                              {member.credentials.map((f, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-body">
                                  <span className="w-1.5 h-1.5 rounded-full bg-veralya-accent" />{f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-10 pt-8 border-t border-gray-100">
                          <button className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green hover:bg-veralya-green hover:text-white transition-all duration-300">
                            <Linkedin className="w-5 h-5" />
                          </button>
                          <button className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green hover:bg-veralya-green hover:text-white transition-all duration-300">
                            <Mail className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-24 lg:py-32 bg-veralya-nude/10">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="reveal-section inline-block px-4 py-2 bg-white rounded-full text-veralya-green font-body text-sm font-medium mb-6">Testimonios</span>
                <h2 className="reveal-section font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                  Lo que dicen quienes han vivido la <span className="text-veralya-green">experiencia DISC</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                  <div key={index} className="reveal-section glass-card rounded-2xl p-6 lg:p-8">
                    <Quote className="w-10 h-10 text-veralya-green/30 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-veralya-green text-veralya-green" />)}
                    </div>
                    <p className="font-body text-gray-700 leading-relaxed mb-6 text-sm">"{t.quote.substring(0, 180)}..."</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <img src={`/testimonial-${index + 1}.jpg`} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-display font-semibold text-veralya-dark">{t.name}</h4>
                        <p className="font-body text-xs text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contacto" className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-veralya" style={{ backgroundSize: '200% 200%', backgroundPosition: '0% 50%' }} />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="reveal-section max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6">
                Tu equipo puede ser tu <span className="text-veralya-accent">mayor activo</span>
              </h2>
              <p className="font-body text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Empecemos a activarlo hoy. Agenda tu evaluación DISC gratuita y descubre
                el potencial oculto de tu organización.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Primera evaluación DISC gratuita', 'Diagnóstico sin compromiso', 'Propuesta en 48h'].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90">
                    <CheckCircle className="w-4 h-4 text-veralya-accent" />
                    <span className="text-sm font-body">{b}</span>
                  </div>
                ))}
              </div>

              <a href="https://calendly.com/descubre-veralyaconsulting" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors shadow-lg">
                Agenda tu evaluación DISC gratuita
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 bg-veralya-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-veralya-nude via-veralya-green to-veralya-nude opacity-30" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-veralya-nude/5 rounded-full blur-3xl -mt-48" />
        <div className="w-full px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img src="./veralya-logo-footer.png" alt="Veralya" className="h-16 w-auto object-contain" />
              </div>
              <p className="font-body text-white/70 mb-6 max-w-sm">
                Transformamos equipos mediante evaluación DISC, desarrollo de liderazgo
                y programas de alto rendimiento.
              </p>
              <div className="space-y-2">
                <p className="font-body text-sm text-white/70">📍 C. Marie Curie, 9, 28521 Rivas-Vaciamadrid</p>
                <p className="font-body text-sm text-white/70">✉️ info@veralyaconsulting.com</p>
                <p className="font-body text-sm text-white/70">📞 +34 646 18 11 50</p>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6">Servicios</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('disc')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Evaluación DISC</button></li>
                <li><button onClick={() => scrollToSection('programas')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Programa LAE N1</button></li>
                <li><button onClick={() => scrollToSection('programas')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Programa LAE N2</button></li>
                <li><button onClick={() => scrollToSection('programas')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Programa EAR</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Selección Directiva</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6">Empresa</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('equipo')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Quiénes Somos</button></li>
                <li><button onClick={() => scrollToSection('equipo')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Nuestro Equipo</button></li>
                <li><button onClick={() => scrollToSection('disc')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Método DISC</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className="font-body text-sm text-white/70 hover:text-veralya-green transition-colors">Contacto</button></li>
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

        <div className="border-t border-white/10">
          <div className="w-full px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
              <p className="font-body text-sm text-white/50">{new Date().getFullYear()} Veralya Consulting. Todos los derechos reservados.</p>
              <div className="flex items-center gap-4">
                <span className="text-white/40 font-body text-xs">TTI Success Insights Partner</span>
                <span className="text-white/20">•</span>
                <span className="text-white/40 font-body text-xs">DISC Certificado</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
