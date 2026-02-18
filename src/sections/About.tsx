import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Puzzle, Heart, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: -50 },
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background marquee text
      gsap.to('.marquee-text', {
        x: '-50%',
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: 'Coaching + PNL + DISC',
      description: 'Combinamos las mejores metodologías para un desarrollo integral.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Humanismo con métricas',
      description: 'Creemos en las personas, pero medimos los resultados.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Procesos medibles',
      description: 'Cada intervención tiene objetivos claros y KPIs definidos.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-veralya-light/30 overflow-hidden"
    >
      {/* Background marquee text */}
      <div className="absolute inset-0 flex items-center overflow-hidden opacity-[0.03] pointer-events-none">
        <div className="marquee-text whitespace-nowrap font-display text-[20vw] font-bold text-veralya-dark">
          VERALYA CONSULTING • VERALYA CONSULTING • VERALYA CONSULTING •
        </div>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1600px] mx-auto">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
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

            <blockquote className="border-l-4 border-veralya-green pl-6 mb-10">
              <p className="font-display text-xl lg:text-2xl text-veralya-dark italic">
                "No necesitas cambiar quién eres. Solo recordar quién puedes ser."
              </p>
            </blockquote>

            {/* Pillars */}
            <div className="space-y-6">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-veralya-dark mb-1">
                      {pillar.title}
                    </h4>
                    <p className="font-body text-sm text-gray-600">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div ref={imageRef} className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/about-image.jpg"
                  alt="Equipo Veralya"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-veralya-green/10 rounded-full blur-2xl" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-veralya-accent/20 rounded-full blur-xl" />

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl"
                style={{ animation: 'float 5s ease-in-out infinite' }}
              >
                <div className="font-display text-4xl font-bold text-veralya-green mb-1">
                  10+
                </div>
                <div className="font-body text-sm text-gray-500">
                  Años de experiencia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
