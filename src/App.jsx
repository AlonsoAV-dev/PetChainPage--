import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import './App.css'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const createPetChainMarker = (type) =>
  L.divIcon({
    className: `petchain-marker petchain-marker--${type}`,
    html: `
      <div class="petchain-marker__pin">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2c-3.9 0-7 3.1-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"
            fill="currentColor"
          />
          <circle cx="12" cy="9" r="3" fill="white" />
        </svg>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 42],
    popupAnchor: [0, -38],
  })

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
      text: 'Guía práctica para cuidar la salud, alimentación y bienestar emocional.',
      icon: 'shield',
    },
    {
      title: 'Mascotas perdidas',
      text: 'Alertas rápidas con mapa comunitario y difusión instantánea.',
      icon: 'search',
    },
    {
      title: 'Adopción consciente',
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
      title: 'Publicación de mascotas perdidas',
      text: 'Crea alertas con fotos, ubicación y contacto directo con la comunidad.',
      tag: 'Alerta inmediata',
    },
    {
      title: 'Contenido educativo curado',
      text: 'Microcursos, guías y talleres con expertos en bienestar animal.',
      tag: 'Aprendizaje continuo',
    },
    {
      title: 'Registro de usuarios confiable',
      text: 'Perfiles verificados para fomentar adopciones responsables.',
      tag: 'Confianza',
    },
    {
      title: 'Experiencia mobile-first',
      text: 'Acceso rápido desde cualquier dispositivo para actuar a tiempo.',
      tag: 'Siempre disponible',
    },
    {
      title: 'Comunidad y campañas',
      text: 'Eventos universitarios y campañas solidarias coordinadas.',
      tag: 'Impacto local',
    },
    {
      title: 'Difusión por Instagram',
      text: 'Integra publicaciones sociales para alcanzar más personas.',
      tag: 'Amplificación',
    },
  ]

  const workshops = [
    {
      title: 'Talleres educativos',
      text: 'Charlas sobre salud, nutrición y cuidados preventivos.',
      image: '/images/workshop-education.webp',
      alt: 'Taller educativo de cuidado responsable para mascotas.',
    },
    {
      title: 'Campañas de adopción',
      text: 'Jornadas solidarias para encontrar hogares responsables.',
      image: '/images/adoption-campaign.webp',
      alt: 'Campaña de adopción responsable con voluntarios y mascotas.',
    },
    {
      title: 'Concientización comunitaria',
      text: 'Activaciones barriales y alianzas con refugios locales.',
      image: '/images/community-awareness.webp',
      alt: 'Actividad comunitaria de concientizacion sobre bienestar animal.',
    },
    {
      title: 'Actividades universitarias',
      text: 'Proyectos con estudiantes y voluntariado interdisciplinario.',
      image: '/images/university-volunteers.webp',
      alt: 'Estudiantes universitarios voluntarios participando en PetChain.',
    },
  ]

  const testimonials = [
    {
      quote:
        'PetChain me dio recursos claros para mejorar la salud de mi perrita y sentirme acompañada.',
      name: 'Ana Ruiz',
      role: 'Dueña de mascota',
    },
    {
      quote:
        'La plataforma nos ayudó a coordinar campañas de adopción con la comunidad universitaria.',
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

  const mapPoints = [
    {
      name: 'Miraflores',
      detail: 'Reporte activo: mascota perdida',
      position: [-12.121, -77.0297],
      type: 'perdida',
    },
    {
      name: 'Barranco',
      detail: 'Campaña educativa en curso',
      position: [-12.1433, -77.0202],
      type: 'campana',
    },
    {
      name: 'San Isidro',
      detail: 'Punto de encuentro comunitario',
      position: [-12.098, -77.0377],
      type: 'encuentro',
    },
  ]

  return (
    <div className="page">
      <header className="navbar">
        <div className="container nav-inner">
          <a className="logo" href="#inicio" aria-label="PetChain">
            <img className="logo-image" src="/logo-petchain.png" alt="" />
            <span>PetChain</span>
          </a>
          <nav className="nav-links" aria-label="Navegacion principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
            <a
              className="button primary"
              href="https://sistema-pet-chain.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                Educación, adopción y comunidad en un solo lugar.
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
                  <span>asistentes en campañas</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" data-animate>
              <div className="hero-photo-frame">
                <img
                  src="/images/hero-community.webp"
                  alt="Comunidad PetChain cuidando mascotas con apoyo de tecnología."
                  fetchPriority="high"
                />
              </div>
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
                      <MapContainer
                        center={[-12.121, -77.0297]}
                        zoom={12}
                        scrollWheelZoom={false}
                        className="leaflet-map"
                        aria-label="Mapa comunitario"
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution="&copy; OpenStreetMap contributors"
                        />
                        {mapPoints.map((point) => (
                          <Marker
                            key={point.name}
                            position={point.position}
                            icon={createPetChainMarker(point.type)}
                          >
                            <Popup>
                              <strong>{point.name}</strong>
                              <br />
                              {point.detail}
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
                  <div className="mockup-card highlight">
                    <h3>Campaña activa</h3>
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
                            <span>Listo para adopción</span>
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
              <span className="eyebrow">Qué es PetChain</span>
              <h2>Una red responsable para educar, proteger y conectar</h2>
              <p>
                Unimos tecnología y comunidad para crear entornos seguros para
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
                Herramientas diseñadas para educar, movilizar y mantener a la
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
                PetChain impulsa bienestar, prevención y ciudades más amables.
              </p>
            </div>
            <div className="ods-grid">
              <article className="ods-card" data-animate>
                <div className="ods-icon">03</div>
                <div>
                  <h3>Salud y bienestar</h3>
                  <p>
                    Promovemos hábitos saludables y prevención para mascotas y
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
              <span className="eyebrow">Talleres y campañas</span>
              <h2>Activamos experiencias que transforman</h2>
              <p>
                Espacios formativos y acciones colectivas para fortalecer la
                comunidad.
              </p>
            </div>
            <div className="gallery-grid">
              {workshops.map((item, index) => (
                <article key={item.title} className="gallery-card" data-animate>
                  <img
                    className="gallery-image"
                    src={item.image}
                    alt={item.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
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
              <span className="comunidadColor" id="comunidadColor">
                Comunidad PetChain
              </span>
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
              <img className="logo-image footer-logo-image" src="/logo-petchain.png" alt="" />
              <span>PetChain</span>
            </a>
            <p>
              Plataforma educativa y comunitaria para la tenencia responsable de
              mascotas.
            </p>
          </div>
          <div className="footer-links">
            <span>Links rápidos</span>
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
            <a href="mailto:20223087@aloe.ulima.edu.pe">20223087@aloe.ulima.edu.pe</a>
            <span>PetChain Proyecto 2026</span>
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
