import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Star, Users, Target, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  format: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
  color: string;
}

const Programs = () => {
  const [expandedProgram, setExpandedProgram] = useState<string | null>('lae-n1');
  const sectionRef = useRef<HTMLElement>(null);

  const programs: Program[] = [
    {
      id: 'lae-n1',
      title: 'LAE N1',
      subtitle: 'Liderazgo Altamente Efectivo - Nivel 1',
      description:
        'Programa diseñado para transformar la manera en que lideras equipos y organizaciones. Profundiza en el autoconocimiento del líder mediante herramientas científicamente validadas como DISC y Motivadores.',
      duration: '3 meses',
      format: 'Presencial, online o mixto',
      icon: <Star className="w-6 h-6" />,
      features: [
        'Evaluación DISC completa (50 páginas de análisis)',
        'Descubrimiento de los 6 motivadores fundamentales',
        'Modelo O.S.A.R para romper el piloto automático',
        '5 dimensiones del liderazgo efectivo',
        'Plan de acción personalizado SMART',
      ],
      benefits: [
        'Mayor consciencia del impacto como líder',
        'Comprensión profunda de fortalezas y áreas de mejora',
        'Herramientas prácticas para adaptarse a diferentes situaciones',
        'Resultados medibles en clima laboral y rendimiento',
      ],
      color: 'from-veralya-green to-veralya-emerald',
    },
    {
      id: 'lae-n2',
      title: 'LAE N2',
      subtitle: 'Liderazgo Adaptativo - Nivel 2',
      description:
        'Potencia tus habilidades de liderazgo a través del conocimiento y aplicación de los modelos DISC y Motivadores. Aprende a identificar diferentes estilos de comportamiento y adaptar tu enfoque para maximizar el potencial de cada miembro de tu equipo.',
      duration: '4 meses',
      format: 'Presencial, online o mixto',
      icon: <Users className="w-6 h-6" />,
      features: [
        'Identificación de estilos DISC en colaboradores',
        'Reconocimiento de motivadores en el equipo',
        'El Semáforo del Liderazgo Consciente',
        'Escucha generativa y preguntas poderosas',
        'Gestión de conflictos por diferencias de perfil',
      ],
      benefits: [
        '85% de mejora en comunicación con el equipo',
        '67% de reducción en conflictos interpersonales',
        '73% de incremento en compromiso del equipo',
        '92% de mejora en adaptabilidad del líder',
      ],
      color: 'from-veralya-emerald to-veralya-dark',
    },
    {
      id: 'ear',
      title: 'EAR',
      subtitle: 'Equipos de Alto Rendimiento',
      description:
        'Enfoque integral para transformar equipos convencionales en equipos de alto rendimiento a través del autoconocimiento, la colaboración estratégica y el alineamiento con los principios sistémicos.',
      duration: '6 meses',
      format: 'Sesiones quincenales presenciales',
      icon: <Target className="w-6 h-6" />,
      features: [
        'Las 3 leyes sistémicas: Pertenencia, Equilibrio, Reconocimiento',
        'Metodología DISC para autoconocimiento en equipos',
        'Sistema de Motivadores: el motor del compromiso',
        'Superación del piloto automático',
        '6 módulos progresivos con seguimiento',
      ],
      benefits: [
        '37% de incremento en productividad (estudio Harvard)',
        '48% de mejora en satisfacción de miembros',
        'ROI promedio de 387% durante el primer año',
        'Equipos más cohesionados y motivados',
      ],
      color: 'from-veralya-accent to-veralya-green',
    },
    {
      id: 'seleccion',
      title: 'Selección Directiva',
      subtitle: 'Proceso de Selección de Talento Profesional',
      description:
        'Proceso estructurado en tres fases diseñado para encontrar al candidato ideal para tu organización, combinando metodología avanzada con evaluación personalizada.',
      duration: 'Según complejidad',
      format: 'Proceso personalizado',
      icon: <Award className="w-6 h-6" />,
      features: [
        'Primera sesión de consultoría gratuita',
        'Definición del perfil con análisis TTI',
        'Evaluación completa con DISC + Motivadores',
        'Talent Comparison Report',
        'Propuesta de 3-5 candidatos finalistas',
      ],
      benefits: [
        'Precisión en la selección con metodología científica',
        'Ahorro de tiempo en el proceso de filtrado',
        'Reducción de riesgo de contratación inadecuada',
        'Acompañamiento completo en cada fase',
      ],
      color: 'from-veralya-dark to-veralya-emerald',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.programs-title',
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

      gsap.fromTo(
        '.program-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleProgram = (id: string) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  return (
    <section
      id="programas"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-light"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="programs-title max-w-3xl mb-16">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-veralya-green font-body text-sm font-medium mb-6 shadow-sm">
            Nuestros Programas
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
            Programas diseñados para{' '}
            <span className="text-veralya-green">transformar</span>
          </h2>
          <p className="font-body text-lg text-gray-600">
            Cada programa está estructurado para generar cambios profundos y 
            sostenibles en el liderazgo y el rendimiento de los equipos.
          </p>
        </div>

        {/* Programs Accordion */}
        <div className="max-w-4xl space-y-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="program-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggleProgram(program.id)}
                className="w-full p-6 lg:p-8 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${program.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-veralya-dark">
                      {program.title}
                    </h3>
                    <p className="font-body text-sm text-gray-500">
                      {program.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-right">
                    <span className="font-body text-sm text-gray-500">
                      {program.duration}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-veralya-green transition-transform duration-300 ${
                      expandedProgram === program.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  expandedProgram === program.id
                    ? 'max-h-[800px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 lg:p-8 pt-0 border-t border-gray-100">
                  <p className="font-body text-gray-600 mb-8">
                    {program.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Features */}
                    <div>
                      <h4 className="font-display font-semibold text-veralya-dark mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-veralya-green" />
                        Qué incluye
                      </h4>
                      <ul className="space-y-3">
                        {program.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-veralya-accent mt-1.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-display font-semibold text-veralya-dark mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-veralya-green" />
                        Beneficios
                      </h4>
                      <ul className="space-y-3">
                        {program.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-veralya-accent mt-1.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => {
                        const element = document.querySelector('#contacto');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-colors duration-300"
                    >
                      Solicitar información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
