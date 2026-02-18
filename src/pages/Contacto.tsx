import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contacto = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    privacy: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Generate simple captcha
  const [captcha] = useState(() => ({
    num1: Math.floor(Math.random() * 10) + 1,
    num2: Math.floor(Math.random() * 5) + 1,
  }));

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate captcha
    const correctAnswer = captcha.num1 + captcha.num2;
    if (parseInt(captchaAnswer) !== correctAnswer) {
      setCaptchaError(true);
      return;
    }

    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Dirección',
      content: 'C. Marie Curie, 9, 28521 Rivas-Vaciamadrid, Madrid',
      link: 'https://maps.google.com/?q=C.+Marie+Curie,+9,+28521+Rivas-Vaciamadrid',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'info@veralyaconsulting.com',
      link: 'mailto:info@veralyaconsulting.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Teléfono',
      content: '+34 646 18 11 50',
      link: 'tel:+34646181150',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Horario',
      content: 'Lunes a Viernes: 9:00 - 18:00',
      link: null,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full flex items-center overflow-hidden bg-gradient-light pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-veralya-light/50 blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="reveal-element font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-veralya-dark leading-tight mb-6">
              ¿Empezamos a <span className="text-veralya-green">transformar tu equipo</span>?
            </h1>
            <p className="reveal-element font-body text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              En Veralya Consulting ayudamos a CEOs, directivos y líderes a mejorar la
              productividad, cohesión y motivación de sus equipos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Form */}
              <div className="reveal-element">
                <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                  Escríbenos
                </span>
                <h2 className="font-display text-3xl lg:text-4xl font-semibold text-veralya-dark mb-6">
                  Cuéntanos tu reto
                </h2>
                <p className="font-body text-gray-600 mb-8">
                  Si quieres alinear talento con objetivos estratégicos y obtener resultados reales,
                  este es el primer paso. No se trata de trabajar más, sino de trabajar mejor.
                </p>

                {isSubmitted ? (
                  <div className="bg-veralya-light rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-veralya-green flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-veralya-dark mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="font-body text-gray-600">
                      Gracias por contactarnos. Te responderemos en menos de 24 horas.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-sm text-gray-700 mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green focus:border-transparent transition-all"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm text-gray-700 mb-2">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green focus:border-transparent transition-all"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-sm text-gray-700 mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green focus:border-transparent transition-all"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green focus:border-transparent transition-all"
                          placeholder="+34 600 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-sm text-gray-700 mb-2">
                        ¿Qué necesitas? *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green focus:border-transparent transition-all resize-none"
                        placeholder="Cuéntanos brevemente sobre tu equipo o proyecto..."
                      />
                    </div>

                    {/* Captcha */}
                    <div>
                      <label className="block font-body text-sm text-gray-700 mb-2">
                        Verificación: {captcha.num1} + {captcha.num2} = ?
                      </label>
                      <input
                        type="number"
                        value={captchaAnswer}
                        onChange={(e) => {
                          setCaptchaAnswer(e.target.value);
                          setCaptchaError(false);
                        }}
                        className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-veralya-green focus:border-transparent transition-all ${captchaError ? 'border-red-500' : 'border-gray-200'
                          }`}
                        placeholder="Respuesta"
                      />
                      {captchaError && (
                        <p className="text-red-500 text-sm mt-1">Respuesta incorrecta. Inténtalo de nuevo.</p>
                      )}
                    </div>

                    {/* Privacy checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="privacy"
                        id="privacy"
                        required
                        checked={formData.privacy}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-veralya-green focus:ring-veralya-green mt-0.5"
                      />
                      <label htmlFor="privacy" className="font-body text-sm text-gray-600">
                        He leído y acepto la{' '}
                        <span className="text-veralya-green hover:underline cursor-pointer">
                          Política de Privacidad
                        </span>{' '}
                        y el{' '}
                        <span className="text-veralya-green hover:underline cursor-pointer">
                          Aviso Legal
                        </span>
                        .
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-veralya-green text-white font-body font-medium rounded-full hover:bg-veralya-dark transition-colors duration-300 shadow-lg"
                    >
                      Enviar mensaje
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="reveal-element">
                <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                  Información de contacto
                </span>
                <h2 className="font-display text-3xl lg:text-4xl font-semibold text-veralya-dark mb-6">
                  Estamos aquí para ayudarte
                </h2>

                <div className="space-y-6 mb-10">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-veralya-light transition-colors duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-veralya-green flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-veralya-dark mb-1">
                          {item.title}
                        </h4>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="font-body text-gray-600 hover:text-veralya-green transition-colors"
                            target={item.link.startsWith('http') ? '_blank' : undefined}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="font-body text-gray-600">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calendly CTA */}
                <div className="bg-gradient-to-r from-veralya-green to-veralya-emerald rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-8 h-8" />
                    <h3 className="font-display text-xl font-semibold">
                      Agenda una reunión
                    </h3>
                  </div>
                  <p className="font-body text-white/90 mb-6">
                    Cuéntanos tu reto y diseñaremos una solución a medida.
                    Primera sesión de consultoría gratuita.
                  </p>
                  <a
                    href="https://calendly.com/descubre-veralyaconsulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors duration-300"
                  >
                    Reservar cita
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
              Tu equipo puede ser tu mayor activo
            </h2>
            <p className="font-body text-xl text-white/80 mb-10">
              Empecemos a activarlo hoy.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://calendly.com/descubre-veralyaconsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors duration-300 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Agenda tu diagnóstico gratuito
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacto;
