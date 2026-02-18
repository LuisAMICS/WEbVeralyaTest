import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, UserCircle, Users, GraduationCap, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
}

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      id: 1,
      title: 'Coaching Ejecutivo',
      subtitle: 'Lidera desde la autenticidad',
      description:
        'Para líderes que buscan claridad, foco y gestión emocional en entornos exigentes. Descubre tu estilo de liderazgo único y potencia tus fortalezas naturales.',
      image: '/service-coaching.jpg',
      icon: <UserCircle className="w-6 h-6" />,
      features: [
        'Evaluación DISC personalizada',
        'Descubrimiento de motivadores',
        'Plan de desarrollo individual',
        'Sesiones de seguimiento',
      ],
    },
    {
      id: 2,
      title: 'Selección Estratégica',
      subtitle: 'Talento que encaja y aporta',
      description:
        'Proceso de selección con mirada cultural y estratégica. Encontramos talento que no solo encaja, sino que aporta valor desde el primer día.',
      image: '/service-selection.jpg',
      icon: <Search className="w-6 h-6" />,
      features: [
        'Definición del perfil ideal',
        'Evaluación DISC + Motivadores',
        'Proceso de 3 fases estructurado',
        'Informe comparativo de candidatos',
      ],
    },
    {
      id: 3,
      title: 'Equipos de Alto Rendimiento',
      subtitle: 'Transforma la dinámica grupal',
      description:
        'Desbloquea dinámicas tóxicas, mejora la confianza y reconecta con el propósito colectivo. Programas diseñados para equipos que quieren destacar.',
      image: '/service-teams.jpg',
      icon: <Users className="w-6 h-6" />,
      features: [
        'Análisis de dinámicas grupales',
        'Las 3 leyes sistémicas',
        'Superación del piloto automático',
        'Medición de resultados',
      ],
    },
    {
      id: 4,
      title: 'Formaciones',
      subtitle: 'Aprendizaje que transforma',
      description:
        'Experiencias dinámicas y prácticas que mejoran la comunicación, la colaboración y la motivación real de tus equipos.',
      image: '/service-training.jpg',
      icon: <GraduationCap className="w-6 h-6" />,
      features: [
        'Comunicación efectiva',
        'Gestión de conflictos',
        'Liderazgo adaptativo',
        'Trabajo en equipo',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        '.services-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.service-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="services-title max-w-3xl mb-16">
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

        {/* Horizontal Accordion Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row gap-4 lg:gap-2 lg:h-[600px]"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeIndex === index
                  ? 'lg:flex-[3] flex-auto h-[400px] lg:h-auto'
                  : 'lg:flex-1 flex-auto h-[120px] lg:h-auto'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    activeIndex === index ? 'scale-100' : 'scale-110'
                  }`}
                />
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeIndex === index
                      ? 'bg-gradient-to-t from-veralya-dark/90 via-veralya-dark/50 to-transparent'
                      : 'bg-gradient-to-t from-veralya-dark/80 to-veralya-dark/40'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="relative h-full p-6 lg:p-8 flex flex-col justify-end">
                {/* Icon */}
                <div
                  className={`mb-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-500 ${
                    activeIndex === index ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {service.icon}
                </div>

                {/* Title - always visible */}
                <h3 className="font-display text-xl lg:text-2xl font-semibold text-white mb-2">
                  {service.title}
                </h3>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeIndex === index
                      ? 'max-h-[400px] opacity-100'
                      : 'max-h-0 opacity-0 lg:max-h-0'
                  }`}
                >
                  <p className="font-body text-sm text-white/80 mb-2">
                    {service.subtitle}
                  </p>
                  <p className="font-body text-white/90 mb-6 max-w-md">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-white/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-veralya-green" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const element = document.querySelector('#contacto');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-white font-body font-medium hover:text-veralya-accent transition-colors"
                  >
                    Saber más
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
