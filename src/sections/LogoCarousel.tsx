import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LogoCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const clients = [
    'TechStart Madrid',
    'Innovación Plus',
    'Global Solutions',
    'EcoEmpresas',
    'Future Leaders',
    'Smart Teams',
    'Growth Hub',
    'Talent First',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white overflow-hidden border-y border-gray-100"
    >
      <div className="w-full px-6 lg:px-12 mb-8">
        <p className="text-center font-body text-sm text-gray-500 uppercase tracking-wider">
          Empresas que han confiado en nosotros
        </p>
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling track */}
        <div ref={trackRef} className="flex animate-marquee">
          {/* First set */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 px-8 py-4 bg-gray-50 rounded-xl hover:bg-veralya-light transition-colors duration-300"
            >
              <span className="font-display text-lg text-gray-400 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
