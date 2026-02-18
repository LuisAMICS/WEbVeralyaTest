import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
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

      // Background gradient animation
      gsap.to('.cta-bg', {
        backgroundPosition: '100% 50%',
        duration: 8,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    'Primera sesión de consultoría gratuita',
    'Diagnóstico inicial sin compromiso',
    'Propuesta personalizada en 48h',
    'Acompañamiento continuo garantizado',
  ];

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="cta-bg absolute inset-0 bg-gradient-veralya"
        style={{
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%',
        }}
      />

      {/* Overlay pattern */}
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
        <div className="cta-content max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-8">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-body">Agenda disponible esta semana</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-tight">
            Tu equipo puede ser tu{' '}
            <span className="text-veralya-accent">mayor activo</span>
          </h2>

          <p className="font-body text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Empecemos a activarlo hoy. Agenda tu diagnóstico gratuito y descubre 
            el potencial oculto de tu organización.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90"
              >
                <CheckCircle className="w-4 h-4 text-veralya-accent" />
                <span className="text-sm font-body">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="magnetic-btn group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors duration-300 shadow-lg"
            >
              Agenda tu diagnóstico gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="mailto:info@veralyaconsulting.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-body font-medium rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              Escríbenos
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="font-body text-sm text-white/60 mb-4">
              Certificaciones y alianzas estratégicas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <span className="text-white/40 font-body text-sm">TTI Success Insights</span>
              <span className="text-white/20">•</span>
              <span className="text-white/40 font-body text-sm">DISC Certificado</span>
              <span className="text-white/20">•</span>
              <span className="text-white/40 font-body text-sm">Fuerzas Impulsoras</span>
              <span className="text-white/20">•</span>
              <span className="text-white/40 font-body text-sm">PNL Practitioner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-veralya-dark">
              Solicitar diagnóstico gratuito
            </DialogTitle>
            <DialogDescription className="font-body text-gray-600">
              Déjanos tus datos y nos pondremos en contacto contigo en menos de 24 horas.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div>
              <label className="block font-body text-sm text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green"
                placeholder="Nombre de tu empresa"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-gray-700 mb-1">
                ¿Qué necesitas?
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green resize-none"
                placeholder="Cuéntanos brevemente sobre tu equipo o proyecto..."
              />
            </div>
            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="w-full px-6 py-4 bg-veralya-green text-white font-body font-medium rounded-lg hover:bg-veralya-dark transition-colors duration-300"
            >
              Enviar solicitud
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTA;
