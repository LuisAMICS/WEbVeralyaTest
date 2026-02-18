import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      name: 'Laura G.',
      role: 'CEO de startup de software educativo',
      location: 'Madrid',
      image: '/testimonial-1.jpg',
      quote:
        'Estábamos desbordados, cada uno tirando en una dirección. El diagnóstico DISC nos hizo ver lo que no queríamos enfrentar: falta de roles claros, comunicación pobre y desgaste. En dos semanas con Veralya, teníamos foco, estructura y un equipo que por fin respiraba en sincronía.',
      rating: 5,
    },
    {
      name: 'Antonia R.',
      role: 'Directora Comercial',
      location: 'Valencia',
      image: '/testimonial-2.jpg',
      quote:
        'He dirigido equipos comerciales toda mi vida, pero nunca había visto una herramienta que revelara tanto en tan poco tiempo. Gracias al método DISC y a la sesión de feedback con Veralya, entendí por qué algunos de mis mejores vendedores estaban desmotivados. Ahora trabajamos en armonía… y vendemos más.',
      rating: 5,
    },
    {
      name: 'Miriam Gianonatti',
      role: 'Responsable de equipo',
      location: 'ONG, Barcelona',
      image: '/testimonial-3.jpg',
      quote:
        'Pensaba que necesitábamos más formación, pero lo que realmente nos faltaba era comprendernos. Veralya nos ayudó a traducir nuestras diferencias en fortalezas. Hoy no solo trabajamos mejor, también nos sentimos mejor como equipo.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
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

      // Parallax effect for columns
      const columns = sectionRef.current?.querySelectorAll('.testimonial-column');
      if (columns) {
        columns.forEach((col, index) => {
          const speed = index === 1 ? -20 : -50;
          gsap.fromTo(
            col,
            { y: 0 },
            {
              y: speed,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }

      gsap.fromTo(
        '.testimonial-card',
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

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-veralya-light/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-veralya-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-veralya-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="testimonials-title text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-veralya-green font-body text-sm font-medium mb-6 shadow-sm">
            Testimonios
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
            Lo que dicen quienes han vivido la{' '}
            <span className="text-veralya-green">experiencia Veralya</span>
          </h2>
        </div>

        {/* Testimonials Grid - Masonry style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-column testimonial-card ${
                index === 1 ? 'lg:mt-10' : index === 2 ? 'lg:mt-20' : ''
              }`}
            >
              <div className="glass-card rounded-2xl p-6 lg:p-8 h-full hover:shadow-xl transition-shadow duration-300">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-veralya-green/30 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-veralya-green text-veralya-green"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="font-body text-gray-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-veralya-dark">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                    <p className="font-body text-xs text-veralya-green">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '500+', label: 'Líderes transformados' },
              { value: '98%', label: 'Satisfacción del cliente' },
              { value: '10+', label: 'Años de experiencia' },
              { value: '387%', label: 'ROI promedio' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="font-display text-3xl lg:text-4xl font-bold text-veralya-green mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
