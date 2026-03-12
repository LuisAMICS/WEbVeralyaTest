import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, CheckCircle, Menu, X, BookOpen, Award, Linkedin, Mail } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';
import LogoCarousel from './sections/LogoCarousel';

gsap.registerPlugin(ScrollTrigger);

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${base}${cleanPath}`;
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Integration with GSAP Ticker for better efficiency
    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    lenis.on('scroll', handleScroll);

    // Mouse move for custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, [role="button"]');
      setIsCursorActive(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text for hero title
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'words,chars' });
        
        gsap.fromTo(split.chars, 
          { y: 100, opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2, 
            stagger: 0.03, 
            ease: 'expo.out', 
            delay: 0.5 
          }
        );
      }

      // Image reveal with refined clipPath and mask - targeting the container specifically
      gsap.fromTo('.hero-image-container',
        { clipPath: 'inset(10% 10% 10% 10% round 100px)', scale: 1.1, opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0% round 40px)', scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out', delay: 0.3 }
      );

      // Hero content animations
      gsap.fromTo('.hero-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 });
      gsap.fromTo('.hero-buttons', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4 });

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

      // Program images parallax
      gsap.utils.toArray<HTMLElement>('.program-image-container').forEach((container) => {
        const image = container.querySelector('img');
        gsap.to(image, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Scroll animations
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(section, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (expandedProgram) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.modal-content', 
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [expandedProgram]);

  const scrollToSection = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { offset: -80 });
      setIsMobileMenuOpen(false);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const navLinks = [
    { id: 'metodo-5d', label: 'Método 5D' },
    { id: 'programas', label: 'Programas' },
    { id: 'impacto', label: 'Resultados' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const programDetails: Record<string, any> = {
    'lae-n1': {
      title: 'LAE Nivel 1: Autoconocimiento',
      subtitle: 'El Origen del Liderazgo Extraordinario',
      image: 'program-lae1.png',
      content: 'El nivel 1 del Programa de Liderazgo Estratégico se centra en la base de cualquier éxito directivo: el autoconocimiento profundo. Trabajamos la claridad interna y el liderazgo consciente para generar entornos de mayor compromiso.',
      modules: [
        { name: 'Diagnóstico TTI Success Insights', desc: 'Análisis conductual y motivacional estructurado.' },
        { name: 'Autoconciencia Directiva', desc: 'Claridad interna y gestión emocional para líderes.' },
        { name: 'Liderazgo Consciente', desc: 'Influencia positiva y ética desde la claridad personal.' },
        { name: 'Plan de Desarrollo', desc: 'Hoja de ruta estratégica para el crecimiento sostenible.' }
      ],
      duration: '12 Horas de acompañamiento',
      format: 'Presencial / Híbrido'
    },
    'lae-n2': {
      title: 'LAE Nivel 2: Liderazgo Adaptativo',
      subtitle: 'La Maestría en la Interacción',
      image: 'program-lae2.png',
      content: 'El nivel 2 profundiza en el liderazgo adaptativo y la comunicación efectiva. Aprendemos a gestionar equipos con flexibilidad y a integrar el conocimiento práctico en el día a día corporativo.',
      modules: [
        { name: 'Liderazgo Adaptativo', desc: 'Flexibilidad y maestría en la interacción profesional.' },
        { name: 'Comunicación Efectiva', desc: 'Feedback estratégico y escucha activa para equipos.' },
        { name: 'Gestión Preventiva', desc: 'Solución constructiva de conflictos y tensiones.' },
        { name: 'Integración Práctica', desc: 'Transferencia directa del conocimiento al rendimiento.' }
      ],
      duration: '10 Horas de formación intensiva',
      format: 'Workshop In-Company'
    },
    'ear': {
      title: 'EAR: Equipos de Alto Rendimiento',
      subtitle: 'La Metodología Sistémica Definitiva',
      image: 'program-ear.png',
      content: 'Convertimos grupos de trabajo en sistemas de alto rendimiento multiplicando resultados y reduciendo fricciones internas mediante una intervención estructurada y estratégica.',
      modules: [
        { name: 'Propósito Compartido', desc: 'Alineación de objetivos y visión colectiva del equipo.' },
        { name: 'Comunicación y Confianza', desc: 'Seguridad psicológica y comunicación transparente.' },
        { name: 'Gestión del Conflicto', desc: 'Afrontamiento constructivo y coordinación operativa.' },
        { name: 'Integración Práctica', desc: 'Foco en resultados y ahorro de costes operativos.' }
      ],
      duration: 'Programa de acompañamiento estratégico',
      format: 'Acompañamiento In-Company'
    }
  };

  return (
    <div className="grain-bg cursor-none min-h-screen">
      <div 
        ref={cursorRef}
        className={`custom-cursor hidden lg:block ${isCursorActive ? 'active' : ''}`}
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) ${isCursorActive ? 'scale(4)' : 'scale(1)'}`
        }}
      />
      {/* Program Detail Modal */}
      {expandedProgram && programDetails[expandedProgram] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-veralya-dark/95 backdrop-blur-xl" onClick={() => setExpandedProgram(null)} />
          <div className="modal-content relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <button 
              onClick={() => setExpandedProgram(null)}
              className="absolute top-8 right-8 z-20 p-2 bg-gray-100 hover:bg-veralya-green hover:text-white rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="lg:w-1/2 relative min-h-[300px]">
              <img 
                src={getAssetPath(programDetails[expandedProgram].image)} 
                alt={programDetails[expandedProgram].title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/80 via-transparent to-transparent lg:bg-gradient-to-r" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <span className="inline-block px-4 py-1 bg-veralya-accent text-veralya-dark font-display font-bold rounded-full text-sm mb-4">Programa VIP</span>
                <h3 className="font-display text-4xl lg:text-5xl font-bold mb-2">{programDetails[expandedProgram].title}</h3>
                <p className="font-body text-xl opacity-80">{programDetails[expandedProgram].subtitle}</p>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 lg:p-16 overflow-y-auto">
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-4 py-2 bg-gray-100 rounded-2xl flex items-center gap-2">
                  <span className="text-xs font-body text-gray-500 uppercase tracking-widest leading-none">Duración</span>
                  <span className="text-sm font-display font-bold text-veralya-dark leading-none">{programDetails[expandedProgram].duration}</span>
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-2xl flex items-center gap-2">
                  <span className="text-xs font-body text-gray-500 uppercase tracking-widest leading-none">Formato</span>
                  <span className="text-sm font-display font-bold text-veralya-dark leading-none">{programDetails[expandedProgram].format}</span>
                </div>
              </div>
              
              <p className="font-body text-lg text-gray-600 leading-relaxed mb-10">
                {programDetails[expandedProgram].content}
              </p>
              
              <div className="space-y-6 mb-12">
                <h4 className="font-display text-xl font-bold text-veralya-dark border-b border-gray-100 pb-4">Itinerario del Programa</h4>
                {programDetails[expandedProgram].modules.map((mod: any, midx: number) => (
                  <div key={midx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-veralya-light flex items-center justify-center flex-shrink-0 text-veralya-green font-display font-bold">
                      {midx + 1}
                    </div>
                    <div>
                      <div className="font-display font-bold text-veralya-dark mb-1">{mod.name}</div>
                      <p className="font-body text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/34646181150" className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 bg-veralya-green text-white font-body font-bold rounded-2xl hover:bg-veralya-dark transition-all shadow-lg active:scale-95">
                  Solicitar Propuesta
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => setExpandedProgram(null)}
                  className="px-8 py-5 border border-gray-200 text-gray-400 font-body font-bold rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <img src={getAssetPath("veralya-logo-new.svg")} alt="Veralya" className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300" />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="font-body text-sm font-medium text-gray-700 hover:text-veralya-green transition-colors underline-anim">
                {link.label}
              </button>
            ))}
          </div>

          <a href="https://wa.me/34646181150?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20vuestros%20servicios" target="_blank" rel="noopener noreferrer" className="hidden lg:block px-6 py-3 bg-veralya-green text-white font-body text-sm font-medium rounded-full hover:bg-veralya-dark transition-colors shadow-lg">
            Agenda tu consultoría gratuita
          </a>

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
            <a href="https://wa.me/34646181150?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20vuestros%20servicios" target="_blank" rel="noopener noreferrer" className="mt-8 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full">
              Agenda tu consultoría gratuita
            </a>
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
                  <span className="word inline-block">con el</span>{' '}
                  <span className="word inline-block text-veralya-green">Método Veralya 5D</span>
                </h1>

                <p className="hero-text opacity-0 font-body text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                  Impulsamos el crecimiento empresarial mediante el desarrollo de liderazgo y equipos de alto rendimiento, integrando diagnóstico conductual y motivacional para crear intervenciones alineadas con la realidad y los objetivos de cada organización.
                </p>

                <div className="hero-buttons opacity-0 flex flex-col sm:flex-row gap-4">
                  <button onClick={() => scrollToSection('metodo-5d')} className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-all shadow-lg">
                    Descubre el Método 5D
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

              <div className="order-1 lg:order-2 relative overflow-visible">
                <div ref={imageRef} className="relative z-10">
                  <div className="hero-image-container relative rounded-3xl overflow-hidden shadow-2xl">
                    <img src={getAssetPath("hero-image.jpg")} alt="Equipo colaborando" className="w-full h-auto object-cover mask-image-fade" />
                    <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/20 to-transparent" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl floating z-20">
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
                  <div className="absolute -top-4 -right-4 bg-veralya-green text-white rounded-2xl p-4 shadow-xl z-20" style={{ animation: 'float 5s ease-in-out infinite 1s' }}>
                    <div className="font-display font-bold text-2xl">+37%</div>
                    <div className="font-body text-xs opacity-90">Productividad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <LogoCarousel />



        {/* Método Veralya 5D Section - Premium Redesign */}
        <section id="metodo-5d" className="py-24 lg:py-40 bg-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-veralya-nude/10 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-veralya-light/20 rounded-full blur-[100px] -ml-48 -mb-48" />
          
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
                <div className="max-w-2xl">
                  <span className="reveal-section inline-block px-4 py-2 bg-veralya-light/50 backdrop-blur-sm rounded-full text-veralya-green font-body text-sm font-semibold mb-6">Nuestra Metodología</span>
                  <h2 className="reveal-section font-display text-5xl lg:text-7xl font-bold text-veralya-dark leading-[1.1]">
                    Método <span className="text-veralya-green italic font-medium">Veralya 5D</span>
                  </h2>
                </div>
                <div className="lg:max-w-md pb-2">
                  <p className="reveal-section font-body text-lg text-gray-500 leading-relaxed border-l-2 border-veralya-green/20 pl-8">
                    El Método Veralya 5D es nuestro sistema propio de transformación organizacional. Un modelo claro, medible y aplicable que conecta el desarrollo del talento con el rendimiento corporativo.
                  </p>
                </div>
              </div>

              <div className="space-y-32">
                {[
                  {
                    step: '01',
                    title: 'DIAGNOSTICAR',
                    subtitle: 'Comprender antes de intervenir',
                    desc: 'Análisis conductual y motivacional para generar una base objetiva y estratégica para el desarrollo. Sin diagnóstico, no hay estrategia.',
                    details: ['Estilo de liderazgo', 'Dinámicas de equipo', 'Motivadores clave', 'Análisis conductual'],
                    color: 'text-veralya-emerald'
                  },
                  {
                    step: '02',
                    title: 'DESARROLLAR',
                    subtitle: 'Autoconocimiento y Liderazgo Consciente',
                    desc: 'Trabajamos con los líderes para fortalecer la autoconciencia, gestión emocional y la toma de decisiones estratégicas.',
                    details: ['Liderazgo estratégico', 'Mapa de motivadores', 'Fuerzas impulsoras', 'Capacidades críticas'],
                    color: 'text-veralya-green'
                  },
                  {
                    step: '03',
                    title: 'DINAMIZAR',
                    subtitle: 'Equipos de Alto Rendimiento',
                    desc: 'Convertimos grupos de trabajo en sistemas alineados mediante propósito compartido y comunicación efectiva.',
                    details: ['Propósito compartido', 'Confianza radical', 'Comunicación efectiva', 'Coordinación mutua'],
                    color: 'text-veralya-dark'
                  },
                  {
                    step: '04',
                    title: 'DESPLEGAR',
                    subtitle: 'Aplicación Directa al Entorno',
                    desc: 'Formación experiencial y orientada a la acción con transferencia inmediata al puesto de trabajo.',
                    details: ['Casos reales', 'Dinámicas prácticas', 'Planes de acción', 'Transferencia al puesto'],
                    color: 'text-veralya-accent'
                  },
                  {
                    step: '05',
                    title: 'DEMOSTRAR',
                    subtitle: 'Impacto Medible y Resultados',
                    desc: 'Medición del impacto organizacional y mejora en clima, compromiso y productividad.',
                    details: ['Clima laboral', 'Compromiso medido', 'Productividad', 'Retorno de inversión'],
                    color: 'text-veralya-green'
                  }
                ].map((item, index) => (
                  <div key={index} className="reveal-section group grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5 relative">
                      <div className={`font-display text-[12rem] lg:text-[16rem] font-bold leading-none opacity-5 absolute -top-16 -left-8 pointer-events-none select-none ${item.color}`}>
                        {item.step}
                      </div>
                      <div className="relative z-10 pt-8 pl-4">
                        <span className="font-body text-veralya-green font-bold tracking-[0.2em] mb-4 block uppercase text-sm">Paso {item.step}</span>
                        <h3 className="font-display text-4xl lg:text-5xl font-bold text-veralya-dark mb-6 tracking-tight group-hover:text-veralya-green transition-colors duration-500">
                          {item.title}
                        </h3>
                        <p className="font-display text-2xl font-medium text-veralya-green/80 italic mb-8">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-1 hidden lg:block h-full border-r border-dashed border-veralya-green/20 mx-auto" />
                    <div className="lg:col-span-6 pt-8">
                      <p className="font-body text-xl text-gray-600 leading-relaxed mb-10">
                        {item.desc}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {item.details.map((detail, dIndex) => (
                          <div key={dIndex} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl group-hover:bg-veralya-light/30 transition-colors duration-500">
                            <CheckCircle className="w-5 h-5 text-veralya-green flex-shrink-0" />
                            <span className="font-body text-sm text-veralya-dark font-medium">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-40 reveal-section glass-dark rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <h3 className="font-display text-4xl lg:text-5xl font-bold text-white mb-8">
                      Garantía de <span className="text-veralya-accent">Coherencia</span>
                    </h3>
                    <p className="font-body text-white/70 text-xl leading-relaxed mb-12">
                      Nuestro método no es una serie de talleres aislados, sino un ecosistema estratégico diseñado para que cada paso potencie al siguiente.
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-veralya-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-6 h-6 text-veralya-accent" />
                        </div>
                        <p className="font-display text-2xl text-veralya-accent italic leading-tight">"Sin un diagnóstico profundo, cualquier intervención es solo maquillaje corporativo."</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { val: '+37%', label: 'Productividad', sub: 'Rendimiento medido' },
                      { val: '-67%', label: 'Conflictos', sub: 'Clima organizacional' },
                      { val: '+85%', label: 'Comunicación', sub: 'Fluidez del mensaje' },
                      { val: 'TTI', label: 'Científico', sub: 'Insights validados' }
                    ].map((stat, sIndex) => (
                      <div key={sIndex} className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-veralya-accent/30 transition-all duration-500 group/stat">
                        <div className="font-display text-4xl lg:text-5xl font-bold text-veralya-accent mb-2 group-hover/stat:scale-110 transition-transform duration-500 origin-left">{stat.val}</div>
                        <div className="font-display text-lg font-semibold text-white mb-1 uppercase tracking-wider">{stat.label}</div>
                        <div className="font-body text-xs text-white/40 uppercase tracking-widest">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Catalog Section */}
        <section id="formacion" className="py-24 lg:py-32 bg-white relative">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-veralya-nude/15 rounded-full blur-3xl -ml-48 -mb-48" />
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="reveal-section inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">Resultados y Aprendizajes</span>
                <h2 className="reveal-section font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                  Impacto <span className="text-veralya-green">Medible</span>
                </h2>
                <p className="reveal-section font-body text-lg text-gray-600 max-w-2xl mx-auto">
                  Estudios vinculados a intervenciones estructuradas de liderazgo y equipos basadas en diagnóstico conductual reflejan resultados reales en la organización.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    title: 'Comunicación Efectiva',
                    hours: '6-8h',
                    desc: 'Mejorar la claridad, escucha activa y adaptación del mensaje a perfiles y feedback efectivo.'
                  },
                  {
                    title: 'Liderazgo Eficaz',
                    hours: '8-10h',
                    desc: 'Liderazgo situacional, gestión de personas, motivación, delegación y empoderamiento.'
                  },
                  {
                    title: 'Gestión de Conflictos',
                    hours: '6-8h',
                    desc: 'Comunicación en situaciones difíciles, gestión emocional y técnicas de resolución win-win.'
                  },
                  {
                    title: 'Ventas y Cliente',
                    hours: '8-12h',
                    desc: 'Estilos de venta, motivadores de compra, persuasión y fidelización estratégica.'
                  },
                  {
                    title: 'Planificación Estratégica',
                    hours: '6-10h',
                    desc: 'Pensamiento estratégico, OKR/KPIs y alineación de roles con los objetivos corporativos.'
                  },
                  {
                    title: 'Trabajo en Equipo',
                    hours: '6-8h',
                    desc: 'Fortalezas, coordinación operativa, gestión de expectativas y compromiso colectivo.'
                  }
                ].map((item, index) => (
                  <div key={index} className="reveal-section bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-veralya-green/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display text-xl font-bold text-veralya-dark">{item.title}</h3>
                      <span className="px-3 py-1 bg-veralya-light text-veralya-green text-xs font-bold rounded-full">{item.hours}</span>
                    </div>
                    <p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="reveal-section bg-veralya-light/30 rounded-3xl p-8 text-center border border-veralya-green/10">
                <p className="font-body text-veralya-dark font-medium">
                  ¿Necesitas un programa a medida? <span className="text-veralya-green font-bold">Adaptamos nuestras formaciones</span> de 6 a 12 horas para vuestro equipo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Programas Estratégicos - High-End Expansion */}
        <section id="programas" className="bg-gray-50 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10" />
          
          <div className="pt-24 lg:pt-32 pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="reveal-section max-w-3xl">
                <span className="inline-block px-4 py-2 bg-veralya-nude/20 rounded-full text-veralya-dark font-body text-xs font-bold uppercase tracking-widest mb-6">Programas de Transformación</span>
                <h2 className="font-display text-5xl lg:text-7xl font-bold text-veralya-dark mb-8">
                  Soluciones para el <span className="text-veralya-emerald">Alto Rendimiento</span>
                </h2>
                <p className="font-body text-xl text-gray-500 leading-relaxed">
                  Diseñamos itinerarios de desarrollo que conectan el propósito individual con los objetivos estratégicos de la compañía.
                </p>
              </div>
            </div>
          </div>

          {/* Program 1: LAE N1 */}
          <div className="py-16 lg:py-24 relative group overflow-hidden bg-white border-b border-gray-100">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-veralya-nude/10 clip-path-slant pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
            <div className="w-full px-6 lg:px-12 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="reveal-section">
                    <div className="inline-flex items-center gap-2 mb-8 text-veralya-green font-bold tracking-widest text-xs uppercase">
                      <span className="w-8 h-[1px] bg-veralya-green" />
                      Liderazgo Estratégico
                    </div>
                    <h2 className="font-display text-5xl lg:text-7xl font-bold text-veralya-dark mb-8">
                      LAE <span className="text-veralya-emerald">Nivel 1</span>
                    </h2>
                    <p className="font-display text-2xl text-veralya-green mb-8 italic">"El autoconocimiento es el origen de todo liderazgo extraordinario."</p>
                    <p className="font-body text-xl text-gray-500 leading-relaxed mb-12">
                      Mediante la integración del análisis del comportamiento y los motivadores, obtenemos una visión completa de cómo actúan las personas y qué factores influyen en su rendimiento y toma de decisiones estratégica.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 mb-12">
                      {[
                        { title: 'Informe Completo', desc: 'Análisis de conducta y motivadores.' },
                        { title: 'Sesión Feedback', desc: 'Interpretación experta de resultados.' },
                        { title: 'Plan de Acción', desc: 'Objetivos SMART personalizados.' },
                        { title: 'Capa L1', desc: 'Fundamentos del liderazgo consciente.' }
                      ].map((card, cidx) => (
                        <div key={cidx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group/card hover:bg-veralya-dark transition-all duration-500">
                          <h4 className="font-display font-bold text-lg text-veralya-dark mb-2 group-hover/card:text-white transition-colors">{card.title}</h4>
                          <p className="font-body text-sm text-gray-400 group-hover/card:text-white/60 transition-colors">{card.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button 
                        onClick={() => setExpandedProgram('lae-n1')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-veralya-dark text-white font-display font-bold rounded-full hover:bg-veralya-emerald transition-all shadow-lg active:scale-95"
                      >
                        Ver detalles del programa
                      </button>
                      <a href="https://wa.me/34646181150" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-veralya-dark text-veralya-dark font-display font-bold rounded-full hover:bg-veralya-dark hover:text-white transition-all group/link">
                        Solicitar Dossier
                        <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                      </a>
                    </div>
                  </div>
                  <div className="reveal-section relative">
                    <div className="program-image-container aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                      <img src={getAssetPath("program-lae1.png")} alt="LAE Level 1" className="w-full h-[120%] object-cover absolute top-[-10%] transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-12 left-12 right-12">
                        <div className="glass-effect p-8 rounded-3xl border border-white/30">
                          <div className="text-4xl font-display font-bold text-veralya-dark mb-1">Fase I</div>
                          <div className="text-sm font-body text-veralya-emerald font-bold uppercase tracking-wider">Cimentación del Líder</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program 2: LAE N2 */}
          <div className="py-16 lg:py-24 relative group overflow-hidden bg-gray-50">
            <div className="w-full px-6 lg:px-12 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="reveal-section order-2 lg:order-1 relative">
                    <div className="program-image-container aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                      <img src={getAssetPath("program-lae2.png")} alt="LAE Level 2" className="w-full h-[120%] object-cover absolute top-[-10%] transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-veralya-emerald/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-12 left-12">
                        <div className="glass-dark p-8 rounded-3xl border border-white/20">
                          <div className="text-4xl font-display font-bold text-veralya-accent mb-1">Fase II</div>
                          <div className="text-sm font-body text-white/80 font-bold uppercase tracking-wider">Liderazgo Relacional</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="reveal-section order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 mb-8 text-veralya-green font-bold tracking-widest text-xs uppercase">
                      <span className="w-8 h-[1px] bg-veralya-green" />
                      Liderazgo Adaptativo
                    </div>
                    <h2 className="font-display text-5xl lg:text-7xl font-bold text-veralya-dark mb-8">
                      LAE <span className="text-veralya-emerald italic">Nivel 2</span>
                    </h2>
                    <p className="font-display text-2xl text-veralya-green mb-8 italic">"El líder no trata a todos igual, trata a todos como necesitan ser tratados."</p>
                    <p className="font-body text-xl text-gray-500 leading-relaxed mb-12">
                      Fase avanzada enfocada en la maestría relacional. El líder aprende a adaptar su enfoque a las necesidades del entorno para reducir conflictos e integrar el conocimiento práctico en el rendimiento del equipo.
                    </p>
                    <div className="space-y-6 mb-12">
                      {[
                        'Liderazgo adaptativo y comunicación efectiva',
                        'Feedback estratégico y escucha activa',
                        'Gestión preventiva de conflictos',
                        'Integración práctica del conocimiento'
                      ].map((item, iidx) => (
                        <div key={iidx} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                          <div className="w-10 h-10 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <span className="font-body font-medium text-veralya-dark">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 items-center mt-8">
                      <button 
                        onClick={() => setExpandedProgram('lae-n2')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-veralya-green text-white font-display font-bold rounded-full hover:bg-veralya-dark transition-all shadow-lg active:scale-95"
                      >
                        Explorar Nivel 2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program 3: EAR */}
          <div className="py-16 lg:py-24 relative group overflow-hidden bg-veralya-dark text-white">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
            <div className="w-full px-6 lg:px-12 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-24">
                  <div className="inline-flex items-center gap-2 mb-8 text-veralya-accent font-bold tracking-widest text-xs uppercase">
                    <span className="w-8 h-[1px] bg-veralya-accent" />
                    Alto Rendimiento
                  </div>
                  <h2 className="font-display text-6xl lg:text-8xl font-bold mb-8">
                    EAR <span className="text-veralya-accent font-medium italic">Equipos</span>
                  </h2>
                  <p className="font-body text-xl text-white/60 leading-relaxed">
                    Transformación de grupos convencionales en sistemas de alto rendimiento mediante visión sistémica y superación del piloto automático organizacional.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: 'Propósito Compartido', val: '01', desc: 'Alineación total con los objetivos estratégicos y valores de la compañía.' },
                    { title: 'Confianza y Comunicación', val: '02', desc: 'Gestión constructiva del conflicto y coordinación operativa de alto grado.' },
                    { title: 'Integración Práctica', val: '03', desc: 'Transferencia directa al puesto para multiplicar resultados y reducir fricciones.' }
                  ].map((feat, fidx) => (
                    <div key={fidx} className="reveal-section bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 hover:border-veralya-accent/40 transition-all duration-500 group/ear">
                      <div className="text-6xl font-display font-bold text-veralya-accent/10 mb-8 group-hover/ear:text-veralya-accent/30 transition-colors">{feat.val}</div>
                      <h4 className="text-2xl font-display font-bold mb-4">{feat.title}</h4>
                      <p className="font-body text-white/50 leading-relaxed min-h-[80px]">{feat.desc}</p>
                      <div className="mt-8 pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-veralya-accent font-display italic">Sistemas de Alto Rendimiento</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-20 text-center">
                  <button 
                    onClick={() => setExpandedProgram('ear')}
                    className="inline-flex items-center gap-3 px-12 py-5 bg-veralya-accent text-veralya-dark font-display font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-veralya-accent/10 active:scale-95"
                  >
                    Quiero transformar mi equipo
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
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
                    image: getAssetPath('team-monica.png'),
                    imageClass: 'object-top scale-100',
                    desc: 'Experta en liderazgo y gestión de equipos, con más de 10 de experiencia en recursos humanos en empresas a nivel internacional.',
                    specialties: ['Gestión de equipos', 'Desarrollo de liderazgo', 'Análisis de la conducta humana', 'Comunicación efectiva'],
                    credentials: ['Certificación en análisis de la conducta humana por TTI Success Insights']
                  },
                  {
                    name: 'Raquel Arroyo Romero',
                    role: 'Cofundadora & Estratega de Desarrollo',
                    image: getAssetPath('team-raquel.png'),
                    imageClass: 'object-[center_15%] scale-[1.45] origin-top',
                    desc: 'Especialista en planificación estratégica para empresas y pymes. Experta en desarrollo humano, comunicación efectiva e inteligencia emocional.',
                    specialties: ['Planificación estratégica', 'Desarrollo humano', 'Comunicación efectiva', 'Inteligencia emocional'],
                    credentials: ['Certificación en análisis de la conducta humana por TTI Success Insights']
                  }
                ].map((member, index) => (
                  <div key={index} className="reveal-section team-card bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
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

        {/* Impacto Medible Section - Premium Redesign */}
        <section id="impacto" className="py-24 lg:py-40 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-veralya-green/20 to-transparent" />
          
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="reveal-section inline-block px-4 py-2 bg-veralya-light/50 backdrop-blur-sm rounded-full text-veralya-green font-body text-sm font-semibold mb-6">Resultados Reales</span>
                <h2 className="reveal-section font-display text-5xl lg:text-7xl font-bold text-veralya-dark leading-tight">
                  Impacto <span className="text-veralya-green italic">Medible</span>
                </h2>
                <p className="font-body text-xl text-gray-500 mt-8">
                  No creemos en el desarrollo subjetivo. Utilizamos métricas claras para demostrar el retorno de cada intervención estratégica.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-24"> {/* No services array needed here, using direct JSX components for premium control */}
                {[
                  { val: '+37%', label: 'Productividad', sub: 'Incremento medio en equipos directivos tras el programa LAE.' },
                  { val: '-67%', label: 'Conflictividad', sub: 'Reducción de barreras de comunicación y fricciones internas.' },
                  { val: '+85%', label: 'Alineación', sub: 'Mejora en la ejecución de objetivos estratégicos compartidos.' }
                ].map((stat, index) => (
                  <div key={index} className="reveal-section group p-12 bg-gray-50 rounded-[3rem] hover:bg-veralya-dark transition-all duration-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-veralya-green/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                    <div className="relative z-10">
                      <div className="font-display text-6xl lg:text-7xl font-bold text-veralya-green mb-6 group-hover:text-veralya-accent transition-colors">{stat.val}</div>
                      <div className="font-display text-2xl font-bold text-veralya-dark mb-4 group-hover:text-white transition-colors">{stat.label}</div>
                      <p className="font-body text-gray-500 group-hover:text-white/60 transition-colors leading-relaxed">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="reveal-section glass-dark p-12 lg:p-16 rounded-[4rem] text-center border border-white/10 shadow-3xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-veralya-green/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 max-w-2xl mx-auto">
                  <Award className="w-16 h-16 text-veralya-accent mx-auto mb-8 animate-pulse" />
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">Formación 100% Bonificable</h3>
                  <p className="font-body text-white/70 text-lg leading-relaxed mb-10">
                    Como expertos en gestión de bonificaciones FUNDAE, optimizamos tu crédito de formación para que el impacto organizacional no suponga una barrera financiera.
                  </p>
                  <button className="px-10 py-5 bg-veralya-accent text-veralya-dark font-display font-bold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-veralya-accent/20">
                    Consultar Crédito Disponible
                  </button>
                </div>
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
                Consultoría sin compromiso
              </h2>
              <p className="font-display text-2xl text-white/90 mb-6">
                Propuesta en 24h
              </p>
              <p className="font-body text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                En una primera conversación entendemos tu situación, detectamos el cuello de botella principal y te enviamos una propuesta clara.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Consultoría sin compromiso', 'Propuesta en 24h'].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90">
                    <CheckCircle className="w-4 h-4 text-veralya-accent" />
                    <span className="text-sm font-body">{b}</span>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/34646181150?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20vuestros%20servicios" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors shadow-lg">
                Agenda tu consultoría gratuita
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="bg-veralya-dark text-white pt-32 pb-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="w-full px-6 lg:px-12 relative z-10 pb-20">
          <div className="max-w-7xl mx-auto">
              <div className="reveal-section flex flex-col items-start lg:items-center text-center lg:text-left">
                <div className="mb-10 flex items-center gap-3">
                  <div className="w-12 h-12 bg-veralya-green rounded-xl flex items-center justify-center font-display text-2xl font-bold text-white shadow-lg shadow-veralya-green/20">V</div>
                  <span className="font-display text-3xl font-bold tracking-tight">Veralya<span className="text-veralya-green">.</span></span>
                </div>
                <h3 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-16 max-w-xl">
                  ¿Listo para transformar <br />
                  tus <span className="text-veralya-accent italic">objetivos</span> en resultados?
                </h3>
                
                <a href="mailto:equipo@veralyaconsulting.com" className="group flex items-center gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-veralya-green/50 transition-all duration-500 w-full max-w-lg mx-auto lg:mx-0">
                  <div className="w-16 h-16 bg-veralya-green/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-veralya-green" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-body text-white/40 uppercase tracking-widest mb-1">Escríbenos directamente</div>
                    <div className="text-2xl font-display font-medium group-hover:text-veralya-green transition-colors">equipo@veralyaconsulting.com</div>
                  </div>
                </a>

                {/* Decorative TTI Shield positioned below contact */}
                <div className="mt-24 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                   <img src={getAssetPath("tti-seal.jpg")} alt="TTI Success Insights Certified" className="h-28" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-12 text-white/30 font-body text-xs">
              <p>&copy; {new Date().getFullYear()} Veralya Consulting. Excelencia en Liderazgo Directivo.</p>
              <div className="flex gap-8 mt-6 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Legal</a>
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default App;
