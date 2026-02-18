import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const teamMembers = [
    {
      name: 'Mónica Arroyo Romero',
      role: 'Cofundadora & Consultora Senior',
      image: '/team-monica.png',
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
      image: '/team-raquel.png',
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-title',
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
        '.team-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
      id="equipo"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="team-title text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-veralya-light rounded-full text-veralya-green font-body text-sm font-medium mb-6">
            Nuestro Equipo
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-veralya-dark mb-6">
            Conoce a las <span className="text-veralya-green">fundadoras</span>
          </h2>
          <p className="font-body text-lg text-gray-600">
            Al ser las fundadoras quienes imparten directamente todas las formaciones,
            aseguramos coherencia metodológica, acompañamiento personalizado y máxima
            implicación en cada proyecto.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
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

                  {/* Social Links */}
                  <div className="flex items-center gap-4 mt-10 pt-8 border-t border-gray-100">
                    <button className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green hover:bg-veralya-green hover:text-white transition-all duration-300">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-veralya-light flex items-center justify-center text-veralya-green hover:bg-veralya-green hover:text-white transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-veralya-green to-veralya-emerald rounded-2xl p-8 text-center text-white">
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
  );
};

export default Team;
