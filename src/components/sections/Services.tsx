import { useEffect, useRef, useState } from 'react'
import { Scissors, Sparkles, Palette, CircleDot, Brush, User } from 'lucide-react'

const services = [
  {
    icon: Scissors,
    name: 'Precision Cuts',
    description: 'Sculpted to your face, lifestyle, and identity. Every cut is a conversation — not a transaction.',
    price: 'From £65',
  },
  {
    icon: Sparkles,
    name: 'Braiding',
    description: 'Intricate patterns, cultural artistry, and structural beauty. Traditional techniques, contemporary expression.',
    price: 'From £80',
  },
  {
    icon: Palette,
    name: 'Colour',
    description: 'Balayage, highlights, full transformation. Colour that looks like it grew from your hair, not landed on it.',
    price: 'From £120',
  },
  {
    icon: CircleDot,
    name: 'Dreadlocks',
    description: 'Installation, maintenance, and styling. Patient craftsmanship for locs that mature beautifully over time.',
    price: 'From £90',
  },
  {
    icon: Brush,
    name: 'Grooming',
    description: 'Beard shaping, skin fades, hot towel treatments. The details that make the difference.',
    price: 'From £40',
  },
  {
    icon: User,
    name: 'Consultation',
    description: 'A private session to discuss your vision. We listen before we cut. Complimentary with your first booking.',
    price: 'Complimentary',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 120)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  const IconComponent = service.icon

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-6) var(--space-4)',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all var(--duration-base) var(--ease-luxury)`,
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <IconComponent
          size={24}
          strokeWidth={1.5}
          style={{
            color: isHovered ? 'var(--color-gold)' : 'var(--color-text-muted)',
            transition: `color var(--duration-fast) var(--ease-luxury)`,
          }}
        />
      </div>

      {/* Service Name */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 600,
          color: 'var(--color-heading)',
          marginBottom: 'var(--space-2)',
          letterSpacing: '-0.01em',
        }}
      >
        {service.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: 'var(--space-3)',
        }}
      >
        {service.description}
      </p>

      {/* Price */}
      <span
        style={{
          fontFamily: 'var(--font-sub)',
          fontSize: '16px',
          color: 'var(--color-gold)',
          fontWeight: 400,
          fontStyle: 'italic',
        }}
      >
        {service.price}
      </span>

      {/* Hover underline — slides in from left */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          backgroundColor: 'var(--color-gold)',
          width: isHovered ? '100%' : '0%',
          transition: `width var(--duration-base) var(--ease-luxury)`,
        }}
      />
    </div>
  )
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleVisible(true)
      },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      style={{
        padding: 'var(--space-16) 0',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--space-4)',
        }}
      >
        {/* Section Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-12)',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.8s var(--ease-luxury)`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            Signature Services
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: 'var(--color-heading)',
              marginBottom: 'var(--space-3)',
            }}
          >
            The Craft
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: 'var(--color-text-muted)',
              fontWeight: 300,
              fontStyle: 'italic',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Every service begins with listening. We understand your vision before we touch your hair.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
