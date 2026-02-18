import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Quote, Star, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${base}${cleanPath}`;
};

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const words = titleRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.2 },
        {
          clipPath: 'ellipse(75% 90% at 60% 50%)',
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Title blur on scroll
      gsap.to(titleRef.current, {
        filter: 'blur(10px)',
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      // Scroll animations for sections
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: 'Laura G.',
      role: 'CEO de startup de software educativo',
      location: 'Madrid',
      quote: 'Estábamos desbordados, cada uno tirando en una dirección. El diagnóstico DISC nos hizo ver lo que no queríamos enfrentar: falta de roles claros, comunicación pobre y desgaste. En dos semanas con Veralya, teníamos foco, estructura y un equipo que por fin respiraba en sincronía.',
    },
    {
      name: 'Antonia R.',
      role: 'Directora Comercial',
      location: 'Valencia',
      quote: 'He dirigido equipos comerciales toda mi vida, pero nunca había visto una herramienta que revelara tanto en tan poco tiempo. Gracias al método DISC y a la sesión de feedback con Veralya, entendí por qué algunos de mis mejores vendedores estaban desmotivados.',
    },
    {
      name: 'Miriam G.',
      role: 'Responsable de equipo',
      location: 'Barcelona',
      quote: 'Pensaba que necesitábamos más formación, pero lo que realmente nos faltaba era comprendernos. Veralya nos ayudó a traducir nuestras diferencias en fortalezas. Hoy no solo trabajamos mejor, también nos sentimos mejor como equipo.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center overflow-hidden bg-gradient-light"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-veralya-light/50 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-veralya-accent/30 blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-[1800px] mx-auto">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-8">
                <Sparkles className="w-4 h-4 text-veralya-green" />
                <span className="text-sm font-body text-veralya-dark">
                  Resultados visibles en 30 días
                </span>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                className="hero-title font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-veralya-dark leading-tight mb-6"
              >
                <span className="word inline-block">Transformamos</span>{' '}
                <span className="word inline-block text-veralya-green">equipos.</span>
                <br />
                <span className="word inline-block">Potenciamos</span>{' '}
                <span className="word inline-block text-veralya-green">líderes.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-body text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                Coaching ejecutivo, selección estratégica y programas de alto rendimiento
                para empresas que quieren crecer con sus personas.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contacto"
                  className="magnetic-btn group inline-flex items-center justify-center gap-3 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Descubre cómo lo hacemos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/soluciones"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-veralya-green text-veralya-green font-body font-medium rounded-full hover:bg-veralya-green hover:text-white transition-all duration-300"
                >
                  Nuestros servicios
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div>
                  <div className="font-display text-3xl lg:text-4xl font-bold text-veralya-green">
                    500+
                  </div>
                  <div className="font-body text-sm text-gray-500 mt-1">
                    Líderes transformados
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl lg:text-4xl font-bold text-veralya-green">
                    98%
                  </div>
                  <div className="font-body text-sm text-gray-500 mt-1">
                    Satisfacción cliente
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl lg:text-4xl font-bold text-veralya-green">
                    10+
                  </div>
                  <div className="font-body text-sm text-gray-500 mt-1">
                    Años de experiencia
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div
                ref={imageRef}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={getAssetPath("hero-image.jpg")}
                    alt="Equipo colaborando"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/20 to-transparent" />
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl floating">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <div className="font-display font-semibold text-veralya-dark">
                        Equipos enfocados
                      </div>
                      <div className="font-body text-sm text-gray-500">
                        Más productividad
                      </div>
                    </div>
                  </div>
                </div>

                {/* Another floating element */}
                <div
                  className="absolute -top-4 -right-4 bg-veralya-green text-white rounded-2xl p-4 shadow-xl"
                  style={{ animation: 'float 5s ease-in-out infinite 1s' }}
                >
                  <div className="font-display font-bold text-2xl">+37%</div>
                  <div className="font-body text-xs opacity-90">Productividad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="reveal-section max-w-3xl mb-16">
            <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
              Nuestros Servicios
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
              Soluciones diseñadas para{' '}
              <span className="text-veralya-green">transformar</span>
            </h2>
            <p className="font-body text-lg text-gray-600">
              Cada organización es única. Por eso adaptamos nuestras metodologías
              a tus necesidades específicas para maximizar el impacto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Coaching Ejecutivo',
                subtitle: 'Lidera desde la autenticidad',
                description: 'Para líderes que buscan claridad, foco y gestión emocional.',
                image: getAssetPath('service-coaching.jpg'),
              },
              {
                title: 'Selección Estratégica',
                subtitle: 'Talento que encaja y aporta',
                description: 'Proceso de selección con mirada cultural y estratégica.',
                image: getAssetPath('service-selection.jpg'),
              },
              {
                title: 'Equipos de Alto Rendimiento',
                subtitle: 'Transforma la dinámica grupal',
                description: 'Desbloquea dinámicas tóxicas y reconecta con el propósito.',
                image: getAssetPath('service-teams.jpg'),
              },
              {
                title: 'Formaciones',
                subtitle: 'Aprendizaje que transforma',
                description: 'Experiencias dinámicas que mejoran comunicación y colaboración.',
                image: getAssetPath('service-training.jpg'),
              },
            ].map((service, index) => (
              <Link
                key={index}
                to="/soluciones"
                className="reveal-section group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/90 via-veralya-dark/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-veralya-accent mb-2">
                    {service.subtitle}
                  </p>
                  <p className="font-body text-sm text-white/80">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 lg:py-32 bg-veralya-light/30 overflow-hidden">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1600px] mx-auto">
            <div className="reveal-section">
              <span className="inline-block px-4 py-2 bg-white rounded-full text-veralya-green font-body text-sm font-medium mb-6 shadow-sm">
                Nuestra Esencia
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6 leading-tight">
                Veralya nace para recordar a las personas{' '}
                <span className="text-veralya-green">lo que ya son capaces</span>{' '}
                de hacer
              </h2>
              <p className="font-body text-lg text-gray-600 mb-8 leading-relaxed">
                No traemos soluciones estándar. Creamos espacios donde el talento
                se activa y florece. Nuestro enfoque combina el rigor científico
                de las evaluaciones psicométricas con la calidez del acompañamiento
                humano.
              </p>
              <blockquote className="border-l-4 border-veralya-green pl-6 mb-8">
                <p className="font-display text-xl lg:text-2xl text-veralya-dark italic">
                  "No necesitas cambiar quién eres. Solo recordar quién puedes ser."
                </p>
              </blockquote>
              <Link
                to="/equipo-veralya"
                className="inline-flex items-center gap-2 px-6 py-3 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-colors duration-300"
              >
                Conoce nuestro equipo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="reveal-section relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={getAssetPath("about-image.jpg")}
                  alt="Equipo Veralya"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-veralya-green/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="reveal-section text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
              Testimonios
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
              Lo que dicen quienes han vivido la{' '}
              <span className="text-veralya-green">experiencia Veralya</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="reveal-section glass-card rounded-2xl p-6 lg:p-8"
              >
                <Quote className="w-10 h-10 text-veralya-green/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-veralya-green text-veralya-green" />
                  ))}
                </div>
                <p className="font-body text-gray-700 leading-relaxed mb-6 text-sm">
                  "{testimonial.quote.substring(0, 150)}..."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={getAssetPath(`testimonial-${index + 1}.jpg`)}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-veralya-dark">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-xs text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
          <div className="reveal-section max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-tight">
              Tu equipo puede ser tu{' '}
              <span className="text-veralya-accent">mayor activo</span>
            </h2>
            <p className="font-body text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Empecemos a activarlo hoy. Agenda tu diagnóstico gratuito y descubre
              el potencial oculto de tu organización.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                'Primera sesión de consultoría gratuita',
                'Diagnóstico inicial sin compromiso',
                'Propuesta personalizada en 48h',
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90"
                >
                  <CheckCircle className="w-4 h-4 text-veralya-accent" />
                  <span className="text-sm font-body">{benefit}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contacto"
              className="magnetic-btn group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors duration-300 shadow-lg"
            >
              Agenda tu diagnóstico gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
