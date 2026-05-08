import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-animate]')
    const counterItems = document.querySelectorAll('[data-count]')

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 },
    )

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const node = entry.target
          const target = Number(node.dataset.count || 0)
          const suffix = node.dataset.suffix || ''
          const start = performance.now()
          const duration = 1200

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const value = Math.floor(progress * target)
            node.textContent = `${value}${suffix}`
            if (progress < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
          counterObserver.unobserve(node)
        })
      },
      { threshold: 0.6 },
    )

    revealItems.forEach((item) => revealObserver.observe(item))
    counterItems.forEach((item) => counterObserver.observe(item))

    return () => {
      revealObserver.disconnect()
      counterObserver.disconnect()
    }
  }, [])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#funcionalidades', label: 'Funcionalidades' },
    { href: '#comunidad', label: 'Comunidad' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const aboutCards = [
    {
      title: 'Tenencia responsable',
      text: 'Guia practica para cuidar la salud, alimentacion y bienestar emocional.',
      icon: 'shield',
    },
    {
      title: 'Mascotas perdidas',
      text: 'Alertas rapidas con mapa comunitario y difusion instantanea.',
      icon: 'search',
    },
    {
      title: 'Adopcion consciente',
      text: 'Conecta hogares responsables con mascotas que necesitan amor.',
      icon: 'heart',
    },
    {
      title: 'Comunidad educativa',
      text: 'Talleres, campañas y recursos para aprender en comunidad.',
      icon: 'users',
    },
  ]

  const features = [
    {
      title: 'Publicacion de mascotas perdidas',
      text: 'Crea alertas con fotos, ubicacion y contacto directo con la comunidad.',
      tag: 'Alerta inmediata',
    },
    {
      title: 'Contenido educativo curado',
      text: 'Microcursos, guias y talleres con expertos en bienestar animal.',
      tag: 'Aprendizaje continuo',
    },
    {
      title: 'Registro de usuarios confiable',
      text: 'Perfiles verificados para fomentar adopciones responsables.',
      tag: 'Confianza',
    },
    {
      title: 'Experiencia mobile-first',
      text: 'Acceso rapido desde cualquier dispositivo para actuar a tiempo.',
      tag: 'Siempre disponible',
    },
    {
      title: 'Comunidad y campañas',
      text: 'Eventos universitarios y campañas solidarias coordinadas.',
      tag: 'Impacto local',
    },
    {
      title: 'Difusion por Instagram',
      text: 'Integra publicaciones sociales para alcanzar mas personas.',
      tag: 'Amplificacion',
    },
  ]

  const workshops = [
    {
      title: 'Talleres educativos',
      text: 'Charlas sobre salud, nutricion y cuidados preventivos.',
    },
    {
      title: 'Campañas de adopcion',
      text: 'Jornadas solidarias para encontrar hogares responsables.',
    },
    {
      title: 'Concientizacion comunitaria',
      text: 'Activaciones barriales y alianzas con refugios locales.',
    },
    {
      title: 'Actividades universitarias',
      text: 'Proyectos con estudiantes y voluntariado interdisciplinario.',
    },
  ]

  const testimonials = [
    {
      quote:
        'PetChain me dio recursos claros para mejorar la salud de mi perrita y sentirme acompanada.',
      name: 'Ana Ruiz',
      role: 'Duenia de mascota',
    },
    {
      quote:
        'La plataforma nos ayudo a coordinar campañas de adopcion con la comunidad universitaria.',
      name: 'Mario Torres',
      role: 'Estudiante voluntario',
    },
    {
      quote:
        'Pude publicar una alerta de mascota perdida y recibimos apoyo en minutos.',
      name: 'Lucia Campos',
      role: 'Participante comunitaria',
    },
  ]

  return (
    <div className="page">
      <header className="navbar">
        <div className="container nav-inner">
          <a className="logo" href="#inicio" aria-label="PetChain">
            <span className="logo-mark" />
            PetChain
          </a>
          <nav className="nav-links" aria-label="Navegacion principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="button primary" href="/login">
            Ingresar al sistema
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero section">
          <div className="container hero-grid">
            <div className="hero-content" data-animate>
              <span className="badge">Plataforma educativa + comunitaria</span>
              <h1>La plataforma que conecta el cuidado responsable de mascotas</h1>
              <p className="lead">
                Educacion, adopcion y comunidad en un solo lugar.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#funcionalidades">
                  Explorar plataforma
                </a>
                <a className="button ghost" href="#beneficios">
                  Ver funcionalidades
                </a>
              </div>
              <div className="hero-stats">
                <div>
                  <span className="stat">+100</span>
                  <span>personas alcanzadas</span>
                </div>
                <div>
                  <span className="stat">+20</span>
                  <span>registros</span>
                </div>
                <div>
                  <span className="stat">+15</span>
                  <span>asistentes en campanas</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" data-animate>
              <div className="mockup">
                <div className="mockup-header">
                  <div className="pill">Dashboard PetChain</div>
                  <div className="status">
                    <span className="dot" /> En vivo
                  </div>
                </div>
                <div className="mockup-grid">
                  <div className="mockup-card map glass">
                    <div className="map-header">
                      <span className="map-title">Mapa comunitario</span>
                      <span className="map-pill">3 alertas</span>
                    </div>
                    <div className="map-body">
                      <div className="map-pin" />
                      <div className="map-pin" />
                      <div className="map-pin" />
                    </div>
                  </div>
                  <div className="mockup-card highlight">
                    <h3>Campana activa</h3>
                    <p>Adopta con responsabilidad - mayo 2026</p>
                    <div className="progress">
                      <div className="progress-bar" />
                    </div>
                  </div>
                  <div className="mockup-card pets">
                    <h3>Mascotas destacadas</h3>
                    <div className="pet-list">
                      {['Luna', 'Rocky', 'Milo'].map((pet) => (
                        <div key={pet} className="pet-item">
                          <span className="pet-avatar" aria-hidden="true" />
                          <div>
                            <strong>{pet}</strong>
                            <span>Listo para adopcion</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mockup-card analytics glass">
                    <h3>Impacto semanal</h3>
                    <div className="mini-chart">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <p>+28% interacciones</p>
                  </div>
                </div>
              </div>
              <div className="floating-card" aria-hidden="true">
                <div className="floating-icon" />
                <div>
                  <p>Comunidad verificada</p>
                  <strong>97% confianza</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="section">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow">Que es PetChain</span>
              <h2>Una red responsable para educar, proteger y conectar</h2>
              <p>
                Unimos tecnologia y comunidad para crear entornos seguros para
                mascotas y personas.
              </p>
            </div>
            <div className="card-grid">
              {aboutCards.map((card) => (
                <article key={card.title} className="info-card" data-animate>
                  <div className="icon-wrap" aria-hidden="true">
                    <PetChainIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="section alt">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow">Funcionalidades</span>
              <h2>Todo lo que necesitas para impulsar impacto real</h2>
              <p>
                Herramientas disenadas para educar, movilizar y mantener a la
                comunidad informada.
              </p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="feature-card" data-animate>
                  <div className="feature-tag">{feature.tag}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  <div className="feature-mockup">
                    <div className="feature-chip">{feature.tag}</div>
                    <div className="feature-lines">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section impact" aria-label="Impacto">
          <div className="container">
            <div className="impact-card" data-animate>
              <div>
                <span className="eyebrow">Impacto</span>
                <h2>Resultados visibles en semanas</h2>
                <p>
                  Medimos la actividad comunitaria para impulsar decisiones
                  basadas en datos.
                </p>
              </div>
              <div className="impact-metrics">
                {[
                  { label: 'vistas', value: 100 },
                  { label: 'seguidores', value: 100 },
                  { label: 'interacciones', value: 100 },
                  { label: 'asistentes', value: 15 },
                  { label: 'registros', value: 20 },
                ].map((metric) => (
                  <div key={metric.label} className="metric">
                    <span
                      className="metric-value"
                      data-count={metric.value}
                      data-suffix="+"
                    >
                      0+
                    </span>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="ODS">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow">ODS</span>
              <h2>Compromiso con los objetivos globales</h2>
              <p>
                PetChain impulsa bienestar, prevencion y ciudades mas amables.
              </p>
            </div>
            <div className="ods-grid">
              <article className="ods-card" data-animate>
                <div className="ods-icon">03</div>
                <div>
                  <h3>Salud y bienestar</h3>
                  <p>
                    Promovemos habitos saludables y prevencion para mascotas y
                    familias.
                  </p>
                </div>
              </article>
              <article className="ods-card" data-animate>
                <div className="ods-icon">11</div>
                <div>
                  <h3>Ciudades y comunidades sostenibles</h3>
                  <p>
                    Conectamos actores locales para crear redes de apoyo.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="comunidad" className="section alt">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow">Talleres y campanas</span>
              <h2>Activamos experiencias que transforman</h2>
              <p>
                Espacios formativos y acciones colectivas para fortalecer la
                comunidad.
              </p>
            </div>
            <div className="gallery-grid">
              {workshops.map((item, index) => (
                <article key={item.title} className="gallery-card" data-animate>
                  <div className={`gallery-visual variant-${index + 1}`} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-label="Testimonios">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow">Testimonios</span>
              <h2>Historias reales de impacto</h2>
              <p>
                La comunidad PetChain comparte avances, aprendizajes y logros.
              </p>
            </div>
            <div className="testimonials">
              {testimonials.map((item) => (
                <article key={item.name} className="testimonial-card" data-animate>
                  <p className="quote">“{item.quote}”</p>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta" id="contacto">
          <div className="container cta-inner" data-animate>
            <div>
              <span className="eyebrow">Comunidad PetChain</span>
              <h2>
                Forma parte de una comunidad que protege y cuida a las mascotas.
              </h2>
              <p>
                Conecta con iniciativas reales, herramientas educativas y una
                red solidaria.
              </p>
            </div>
            <a className="button light" href="/login">
              Ingresar al sistema
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="logo" href="#inicio">
              <span className="logo-mark" />
              PetChain
            </a>
            <p>
              Plataforma educativa y comunitaria para la tenencia responsable de
              mascotas.
            </p>
          </div>
          <div className="footer-links">
            <span>Links rapidos</span>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <span>Redes sociales</span>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">YouTube</a>
          </div>
          <div className="footer-links">
            <span>Contacto</span>
            <a href="mailto:contacto@petchain.org">contacto@petchain.org</a>
            <span>Proyecto universitario 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PetChainIcon({ name }) {
  switch (name) {
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2l7 3v6c0 5.25-3.5 9-7 11-3.5-2-7-5.75-7-11V5l7-3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9.5 11.5l2 2 3.5-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="11"
            cy="11"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16.5 16.5L21 21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 20s-6-3.5-8-7.5C2.5 9 4.5 6 8 6c2 0 3.5 1.2 4 2.4C12.5 7.2 14 6 16 6c3.5 0 5.5 3 4 6.5-2 4-8 7.5-8 7.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M2 21c0-3 3-5 5-5s5 2 5 5M14 21c0-2.5 2-4 4-4 2.2 0 4 1.5 4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    default:
      return null
  }
}

export default App
