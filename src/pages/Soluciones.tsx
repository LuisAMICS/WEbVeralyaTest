import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, UserCircle, Users, Search, GraduationCap, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Soluciones = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(0);

  const services = [
    {
      title: 'Coaching Ejecutivo Personalizado',
      subtitle: 'Lidera desde la calma, actúa con foco',
      description: 'Para emprendedores, ejecutivos y líderes que buscan avanzar con claridad y gestionar sus emociones en entornos exigentes.',
      icon: <UserCircle className="w-8 h-8" />,
      image: '/service-coaching.jpg',
      benefits: [
        'Mayor consciencia del impacto como líder',
        'Gestión emocional en entornos exigentes',
        'Toma de decisiones con seguridad',
        'Plan de desarrollo personalizado',
      ],
      features: [
        'Evaluación DISC completa',
        'Descubrimiento de motivadores',
        'Sesiones individuales de coaching',
        'Seguimiento y medición de progreso',
      ],
    },
    {
      title: 'Selección Estratégica de Cargos Especializados',
      subtitle: 'Talento que encaja, aporta y se queda',
      description: 'Proceso de selección con mirada cultural y estratégica. No solo contratamos talento, lo alineamos con tu visión desde el primer día.',
      icon: <Search className="w-8 h-8" />,
      image: '/service-selection.jpg',
      benefits: [
        'Reducción de rotación de personal',
        'Alineación cultural desde el inicio',
        'Proceso estructurado en 3 fases',
        'Informe comparativo de candidatos',
      ],
      features: [
        'Definición del perfil ideal con DISC',
        'Evaluación completa de candidatos',
        'Entrevistas especializadas',
        'Acompañamiento en la decisión final',
      ],
    },
    {
      title: 'Equipos de Alto Rendimiento',
      subtitle: 'Transforma la dinámica grupal',
      description: 'Para desbloquear dinámicas tóxicas, mejorar la confianza y reconectar con el propósito colectivo.',
      icon: <Users className="w-8 h-8" />,
      image: '/service-teams.jpg',
      benefits: [
        'Mayor cohesión y colaboración',
        'Reducción de conflictos internos',
        'Mejora del clima laboral',
        'Alineación con objetivos estratégicos',
      ],
      features: [
        'Análisis DISC del equipo completo',
        'Las 3 leyes sistémicas',
        'Superación del piloto automático',
        'Programa de 6 meses con seguimiento',
      ],
    },
    {
      title: 'Talleres y Formaciones',
      subtitle: 'Menos fricciones, más conexión',
      description: 'Experiencias dinámicas y prácticas que mejoran la comunicación, la colaboración y la motivación real.',
      icon: <GraduationCap className="w-8 h-8" />,
      image: '/service-training.jpg',
      benefits: [
        'Comunicación más efectiva',
        'Mejor coordinación entre equipos',
        'Reducción de malentendidos',
        'Equipos más comprometidos',
      ],
      features: [
        'Comunicación efectiva y liderazgo',
        'Gestión de conflictos',
        'Trabajo en equipo y colaboración',
        'Formación personalizada por necesidad',
      ],
    },
  ];

  const discFeatures = [
    'Identificar cómo actúa cada miembro del equipo y qué le motiva realmente',
    'Mejorar la comunicación y reducir fricciones internas',
    'Alinear comportamientos y motivaciones con los objetivos estratégicos',
    'Potenciar la productividad y la colaboración',
  ];

  const benefits = [
    'Equipos más autónomos y coordinados',
    'Líderes que delegan con claridad y ganan tiempo mental',
    'Reducción de fricciones y mejora del clima laboral',
    'Procesos de selección más eficaces',
    'Cultura organizacional sólida y alineada con la visión',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-element',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] w-full flex items-center overflow-hidden bg-gradient-light pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-veralya-light/50 blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-veralya-accent/30 blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="reveal-element font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-veralya-dark leading-tight mb-6">
              Soluciones para líderes que quieren equipos{' '}
              <span className="text-veralya-green">más enfocados, productivos y alineados</span>
            </h1>
            <p className="reveal-element font-body text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
              En Veralya Consulting ayudamos a CEOs, directivos de RRHH y responsables comerciales 
              a desarrollar equipos que rinden más, con menos fricciones, gracias a herramientas 
              como DISC, coaching ejecutivo y PNL.
            </p>
            <Link
              to="/contacto"
              className="reveal-element magnetic-btn group inline-flex items-center justify-center gap-3 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Agenda tu diagnóstico gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Strategic Consulting Section */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="reveal-element">
                <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                  Consultoría Estratégica
                </span>
                <h2 className="font-display text-3xl lg:text-4xl font-semibold text-veralya-dark mb-6">
                  Para activar talento y mejorar resultados
                </h2>
                <p className="font-body text-gray-600 mb-6 leading-relaxed">
                  En Veralya trabajamos con líderes que ya han llegado lejos, pero quieren ir 
                  más allá con sus equipos. Si tu organización está creciendo, cambiando o 
                  necesitas más claridad y cohesión, te ayudamos a optimizar tu estructura, 
                  reducir conflictos y transformar el potencial humano en resultados medibles.
                </p>
                <p className="font-body text-gray-600 mb-8 leading-relaxed">
                  La clave está en entender que no se trata de trabajar más, sino de trabajar 
                  mejor, con un equipo alineado a tu visión.
                </p>

                <div className="space-y-3">
                  {benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-veralya-green flex-shrink-0" />
                      <span className="font-body text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal-element relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/about-image.jpg"
                    alt="Consultoría estratégica"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/30 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-veralya-green text-white rounded-2xl p-6 shadow-xl">
                  <div className="font-display text-3xl font-bold">+37%</div>
                  <div className="font-body text-sm opacity-90">Productividad media</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISC Section */}
      <section className="py-24 lg:py-32 bg-veralya-light/30">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="reveal-element inline-block px-4 py-2 bg-white rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                La Clave para Equipos de Alto Rendimiento
              </span>
              <h2 className="reveal-element font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                DISC + <span className="text-veralya-green">Fuerzas Impulsoras</span>
              </h2>
              <p className="reveal-element font-body text-lg text-gray-600">
                Convierte el potencial de tu equipo en resultados reales con la combinación 
                más poderosa para optimizar el rendimiento.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-element order-2 lg:order-1">
                <h3 className="font-display text-2xl font-semibold text-veralya-dark mb-6">
                  ¿Qué conseguimos?
                </h3>
                <div className="space-y-4 mb-8">
                  {discFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green flex-shrink-0">
                        <span className="font-display font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="font-body text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-veralya-green rounded-2xl p-6 text-white">
                  <h4 className="font-display font-semibold text-lg mb-2">
                    Beneficio directo para la empresa
                  </h4>
                  <p className="font-body text-white/90">
                    Más foco, menos conflictos, mejor clima laboral y resultados visibles en tiempo récord.
                  </p>
                </div>
              </div>

              <div className="reveal-element order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-veralya-green rounded-2xl p-6 text-white">
                      <div className="font-display text-4xl font-bold mb-2">D</div>
                      <div className="font-body text-sm opacity-90">Dominancia</div>
                      <div className="font-body text-xs opacity-70 mt-1">Resultados, decisión</div>
                    </div>
                    <div className="bg-veralya-accent rounded-2xl p-6">
                      <div className="font-display text-4xl font-bold text-veralya-dark mb-2">S</div>
                      <div className="font-body text-sm text-veralya-dark">Estabilidad</div>
                      <div className="font-body text-xs text-veralya-dark/70 mt-1">Paciencia, apoyo</div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="bg-veralya-dark rounded-2xl p-6 text-white">
                      <div className="font-display text-4xl font-bold mb-2">I</div>
                      <div className="font-body text-sm opacity-90">Influencia</div>
                      <div className="font-body text-xs opacity-70 mt-1">Comunicación, entusiasmo</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="font-display text-4xl font-bold text-veralya-green mb-2">C</div>
                      <div className="font-body text-sm text-gray-700">Cumplimiento</div>
                      <div className="font-body text-xs text-gray-500 mt-1">Precisión, calidad</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-element mt-12 text-center">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-colors duration-300"
              >
                Descubre cómo potenciar a tu equipo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="reveal-element inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                Nuestros Servicios
              </span>
              <h2 className="reveal-element font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                Más soluciones para{' '}
                <span className="text-veralya-green">transformar equipos</span>
              </h2>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="reveal-element bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <button
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    className="w-full p-6 lg:p-8 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-veralya-dark">
                          {service.title}
                        </h3>
                        <p className="font-body text-sm text-veralya-green">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-veralya-green transition-transform duration-300 ${
                        activeService === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activeService === index ? 'max-h-[600px]' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 lg:p-8 pt-0 border-t border-gray-100">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <p className="font-body text-gray-600 mb-6">
                            {service.description}
                          </p>
                          <h4 className="font-display font-semibold text-veralya-dark mb-3">
                            Beneficios
                          </h4>
                          <ul className="space-y-2 mb-6">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-veralya-green" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-veralya-dark mb-3">
                            Qué incluye
                          </h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-veralya-accent" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link
                          to="/contacto"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-colors duration-300"
                        >
                          Solicitar información
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 lg:py-32 bg-veralya-dark text-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal-element font-display text-4xl lg:text-5xl font-semibold mb-6">
                Resultados medibles que transforman el día a día
              </h2>
              <p className="reveal-element font-body text-lg text-white/80">
                No se trata solo de mejorar procesos, sino de activar personas. 
                Equipos alineados, motivados y enfocados son el verdadero motor del crecimiento.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="reveal-element bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-veralya-green flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-body text-sm text-white/90">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-veralya"
          style={{
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 50%',
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="reveal-element max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-6">
              ¿Tu equipo podría rendir más con el enfoque adecuado?
            </h2>
            <p className="font-body text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Solicita una sesión exploratoria con Veralya y descubre cómo mejorar 
              el rendimiento de tus equipos y alinear talento con objetivos de negocio.
            </p>

            <Link
              to="/contacto"
              className="magnetic-btn group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors duration-300 shadow-lg"
            >
              Quiero mejorar el rendimiento de mi equipo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Soluciones;
