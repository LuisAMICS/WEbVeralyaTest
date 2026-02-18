import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, Users, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Methodology = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Diagnóstico con DISC + Motivadores',
      description:
        'Evaluación conductual del colectivo mediante test TTI certificado. Identificamos patrones de comportamiento y motivadores clave para diseñar la intervención con precisión.',
      icon: <ClipboardList className="w-6 h-6" />,
      details: [
        'Test Access Inside (DISC + Fuerzas Impulsoras)',
        'Lectura de resultados a nivel grupal',
        'Identificación de fortalezas y áreas de mejora',
      ],
    },
    {
      number: '02',
      title: 'Acompañamiento personalizado',
      description:
        'Diseñamos la intervención adaptando contenidos y dinámicas al contexto organizacional. Sesiones prácticas y participativas con enfoque orientado a la acción.',
      icon: <Users className="w-6 h-6" />,
      details: [
        'Definición de objetivos junto al cliente',
        'Adaptación de contenidos al contexto',
        'Formación presencial, online o mixta',
      ],
    },
    {
      number: '03',
      title: 'Medición de resultados y ajustes',
      description:
        'Medición cuantitativa de mejora en indicadores clave. Sesiones de seguimiento periódicas para evaluar el progreso y realizar ajustes estratégicos.',
      icon: <LineChart className="w-6 h-6" />,
      details: [
        'KPIs definidos al inicio del proceso',
        'Informes de progreso periódicos',
        'Ajustes continuos según evolución',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line draw animation
      if (lineRef.current) {
        const pathLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll('.step-item');
      if (stepElements) {
        stepElements.forEach((step, index) => {
          gsap.fromTo(
            step,
            { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Title animation
      gsap.fromTo(
        '.methodology-title',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="methodology-title text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
            Nuestra Metodología
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
            Un proceso probado para{' '}
            <span className="text-veralya-green">resultados medibles</span>
          </h2>
          <p className="font-body text-lg text-gray-600">
            Combinamos diagnóstico científico, diseño personalizado y formación 
            aplicada para garantizar resultados sostenibles.
          </p>
        </div>

        {/* Steps with connecting line */}
        <div ref={stepsRef} className="relative max-w-5xl mx-auto">
          {/* SVG Connecting Line - Desktop */}
          <svg
            className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
            viewBox="0 0 4 800"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 2 0 L 2 800"
              stroke="#7ec2b0"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-item relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div
                  className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    {/* Step number and icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-veralya-green flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                      <div>
                        <span className="font-display text-sm text-veralya-green font-medium">
                          Paso {step.number}
                        </span>
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-veralya-dark">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="font-body text-gray-600 mb-6">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-gray-700"
                        >
                          <span className="w-2 h-2 rounded-full bg-veralya-accent" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Node - Desktop */}
                <div
                  className={`hidden lg:flex justify-center ${
                    index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-veralya-green flex items-center justify-center text-white font-display text-2xl font-bold shadow-lg pulse-glow">
                      {step.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
