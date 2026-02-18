import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, Heart, Lightbulb, Target, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${base}${cleanPath}`;
};

const Equipo = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-element',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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

  const teamMembers = [
    {
      name: 'Mónica Arroyo Romero',
      role: 'Cofundadora & Consultora Senior',
      image: getAssetPath('team-monica.png'),
      imageClass: 'object-top scale-100',
      description:
        'Psicóloga y experta en recursos humanos con más de diez años de experiencia en desarrollo del talento y liderazgo en organizaciones internacionales.',
      specialties: [
        'Análisis conductual y motivacional (DISC)',
        'Fuerzas Impulsoras 3 TTI Success Insights',
        'Desarrollo de liderazgo',
        'Comunicación efectiva',
      ],
      credentials: [
        'Certificada en DISC y Fuerzas Impulsoras',
        'Experta en desarrollo del talento',
        'Experiencia en organizaciones internacionales',
      ],
    },
    {
      name: 'Raquel Arroyo Romero',
      role: 'Cofundadora & Estratega de Desarrollo',
      image: getAssetPath('team-raquel.png'),
      imageClass: 'object-[center_15%] scale-[1.45] origin-top',
      description:
        'Experta en desarrollo humano y estrategia para pymes y emprendedores. Máster en Desarrollo Humano y Practitioner en PNL.',
      specialties: [
        'Estrategia para pymes y emprendedores',
        'Programación Neurolingüística (PNL)',
        'DISC y Fuerzas Impulsoras TTI',
        'Mentalidad y comportamiento organizacional',
      ],
      credentials: [
        'Máster en Desarrollo Humano',
        'Practitioner en PNL',
        'Certificada en DISC y Fuerzas Impulsoras',
      ],
    },
  ];

  const howWeWork = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Escuchamos antes de proponer',
      description: 'Nos tomamos el tiempo necesario para entender tu contexto, cultura y desafíos específicos.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Analizamos desde la raíz',
      description: 'Personas, cultura, comunicación. Identificamos las causas, no solo los síntomas.',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Diseñamos soluciones a medida',
      description: 'Prácticas, aplicables y con impacto medible en tu organización.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Acompañamos en el proceso',
      description: 'No solo en la estrategia, sino en la implementación y seguimiento continuo.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] w-full flex items-center overflow-hidden bg-gradient-light pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-veralya-nude/40 blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-veralya-light/20 blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="reveal-element inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-veralya-green font-body text-sm font-medium mb-6">
              Somos Veralya
            </span>
            <h1 className="reveal-element font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-veralya-dark leading-tight mb-6">
              Activamos el talento que{' '}
              <span className="text-veralya-green">transforma equipos</span>
            </h1>
            <p className="reveal-element font-body text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              En Veralya Consulting no creemos en soluciones estándar.
              Creemos en las personas y en el impacto que tiene un equipo alineado,
              motivado y liderado con claridad.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <div className="reveal-element">
              <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                ¿Quiénes Somos?
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-veralya-dark mb-6">
                Mónica y Raquel, hermanas, socias y profesionales apasionadas por el desarrollo del talento
              </h2>
              <p className="font-body text-gray-600 mb-6 leading-relaxed">
                Nuestra experiencia en coaching, PNL, inteligencia emocional y diagnóstico de perfiles
                (DISC + Fuerzas Impulsoras) nos permite trabajar desde una perspectiva estratégica y
                humanista a la vez.
              </p>
              <p className="font-body text-gray-600 mb-8 leading-relaxed">
                Llevamos años ayudando a líderes y equipos a desbloquear su potencial, mejorar la
                comunicación y transformar dinámicas de trabajo que frenaban resultados.
              </p>
              <blockquote className="border-l-4 border-veralya-green pl-6">
                <p className="font-display text-xl text-veralya-dark italic">
                  "Más allá de la consultoría: acompañamos personas, no procesos"
                </p>
              </blockquote>
            </div>

            <div className="reveal-element relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-veralya-nude/15 rounded-2xl p-6 border border-veralya-nude/20">
                    <div className="font-display text-4xl font-bold text-veralya-green mb-2">10+</div>
                    <div className="font-body text-sm text-gray-600">Años de experiencia</div>
                  </div>
                  <div className="bg-veralya-green rounded-2xl p-6 text-white shadow-lg shadow-veralya-green/20">
                    <div className="font-display text-4xl font-bold mb-2">500+</div>
                    <div className="font-body text-sm opacity-90">Líderes transformados</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-veralya-dark rounded-2xl p-6 text-white shadow-lg shadow-veralya-dark/20">
                    <div className="font-display text-4xl font-bold mb-2">98%</div>
                    <div className="font-body text-sm opacity-90">Satisfacción cliente</div>
                  </div>
                  <div className="bg-veralya-accent/30 rounded-2xl p-6 border border-veralya-accent/50">
                    <div className="font-display text-4xl font-bold text-veralya-dark mb-2">387%</div>
                    <div className="font-body text-sm text-veralya-dark">ROI promedio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 lg:py-32 bg-veralya-nude/10">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="reveal-element inline-block px-4 py-2 bg-white rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                Cómo Trabajamos
              </span>
              <h2 className="reveal-element font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                No se trata solo de formar,{' '}
                <span className="text-veralya-green">sino de transformar</span>
              </h2>
              <p className="reveal-element font-body text-lg text-gray-600">
                Cada empresa tiene su propia cultura. Nuestra misión es hacer que esa cultura
                sea un motor de crecimiento, no un freno.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howWeWork.map((item, index) => (
                <div
                  key={index}
                  className="reveal-element bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-semibold text-veralya-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="reveal-element inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
                Nuestro Equipo
              </span>
              <h2 className="reveal-element font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
                Conoce a las <span className="text-veralya-green">fundadoras</span>
              </h2>
              <p className="reveal-element font-body text-lg text-gray-600">
                Al ser las fundadoras quienes imparten directamente todas las formaciones,
                aseguramos coherencia metodológica y máxima implicación.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="reveal-element group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                >
                  <div className="grid md:grid-cols-12 h-full">
                    {/* Image */}
                    <div className="md:col-span-5 relative overflow-hidden bg-gray-50 min-h-[400px] md:min-h-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${member.imageClass || 'object-top'} group-hover:scale-110`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-veralya-dark/20 to-transparent md:bg-gradient-to-r" />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-2xl lg:text-3xl font-semibold text-veralya-dark mb-1">
                          {member.name}
                        </h3>
                        <p className="font-body text-veralya-green font-medium mb-6 text-sm lg:text-base">
                          {member.role}
                        </p>
                        <p className="font-body text-gray-600 mb-8 leading-relaxed text-sm lg:text-base">
                          {member.description}
                        </p>

                        {/* Specialties */}
                        <div className="mb-8">
                          <h4 className="font-display font-semibold text-veralya-dark mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400">
                            <BookOpen className="w-4 h-4 text-veralya-green" />
                            Especialidades
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-veralya-light text-veralya-dark text-xs font-body rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Credentials */}
                        <div>
                          <h4 className="font-display font-semibold text-veralya-dark mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400">
                            <Award className="w-4 h-4 text-veralya-green" />
                            Credenciales
                          </h4>
                          <ul className="space-y-2">
                            {member.credentials.map((credential, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-gray-600 font-body"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-veralya-accent" />
                                {credential}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Banner */}
      <section className="py-16 bg-veralya-nude/15">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="reveal-element bg-gradient-to-r from-veralya-green to-veralya-emerald rounded-2xl p-8 text-center text-white">
              <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="font-display text-2xl font-semibold mb-3">
                Garantía de Calidad Veralya
              </h3>
              <p className="font-body text-white/90 max-w-2xl mx-auto">
                Al ser las fundadoras quienes imparten directamente todas las formaciones,
                aseguramos coherencia metodológica, acompañamiento personalizado y máxima
                implicación en cada proyecto.
              </p>
            </div>
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
          <div className="reveal-element max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-6">
              Hablemos de tu equipo
            </h2>
            <p className="font-body text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Diseñemos juntos la evolución que necesitas. Agenda tu diagnóstico gratuito
              y descubre el potencial oculto de tu organización.
            </p>

            <Link
              to="/contacto"
              className="magnetic-btn group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-veralya-dark font-body font-medium rounded-full hover:bg-veralya-accent transition-colors duration-300 shadow-lg"
            >
              Contacta con nosotras
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Equipo;
