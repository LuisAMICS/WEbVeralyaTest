import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - word by word
      const words = titleRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1 }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.3 }
      );

      // Image reveal with organic mask
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse move effect for image
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = image.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / rect.width) * 5;
      const rotateX = ((centerY - e.clientY) / rect.height) * 5;

      gsap.to(image, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
              style={{ perspective: '1000px' }}
            >
              <span className="word inline-block">Transformamos</span>{' '}
              <span className="word inline-block text-veralya-green">equipos.</span>
              <br />
              <span className="word inline-block">Potenciamos</span>{' '}
              <span className="word inline-block text-veralya-green">líderes.</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-body text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl"
            >
              Coaching ejecutivo, selección estratégica y programas de alto rendimiento 
              para empresas que quieren crecer con sus personas.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="magnetic-btn group inline-flex items-center justify-center gap-3 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Descubre cómo lo hacemos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('#servicios');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-veralya-green text-veralya-green font-body font-medium rounded-full hover:bg-veralya-green hover:text-white transition-all duration-300"
              >
                Nuestros servicios
              </button>
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
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="./hero-image.jpg"
                  alt="Equipo colaborando"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay gradient */}
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
  );
};

export default Hero;
