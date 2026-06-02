import { useEffect, useRef, useState } from 'react'

const artists = [
  {
    name: 'Marcus Webb',
    specialty: 'Precision Cuts & Fades',
    bio: 'Ten years in the craft. Marcus reads hair like a sculptor reads stone — he finds the shape that was already there.',
    accentColor: 'rgba(212, 168, 92, 0.15)',
  },
  {
    name: 'Zara Chen',
    specialty: 'Braiding & Protective Styles',
    bio: 'Zara\'s braids are architecture. Every pattern tells a story, every strand has a purpose.',
    accentColor: 'rgba(155, 141, 196, 0.15)',
  },
  {
    name: 'Kai Williams',
    specialty: 'Colour & Transformation',
    bio: 'Kai doesn\'t apply colour — he designs it. Gradients that look like they belong to your hair, not on it.',
    accentColor: 'rgba(212, 168, 92, 0.12)',
  },
]

function ArtistCard({ artist, index }: { artist: typeof artists[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.3 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  // Generate initials for placeholder
  const initials = artist.name.split(' ').map(n => n[0]).join('')

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transition: `all 0.8s var(--ease-luxury)`,
      }}
    >
      {/* Portrait placeholder — grayscale by default, color on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--color-surface)',
          background: `
            radial-gradient(ellipse at center, ${artist.accentColor} 0%, var(--color-surface) 70%)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: isHovered ? 'grayscale(0)' : 'grayscale(0.8)',
          transition: `filter 0.6s var(--ease-luxury)`,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '80px',
            fontWeight: 700,
            color: isHovered ? 'var(--color-gold)' : 'var(--color-border)',
            transition: `color 0.6s var(--ease-luxury)`,
            opacity: 0.4,
          }}
        >
          {initials}
        </span>
      </div>

      {/* Gradient overlay at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(9, 9, 14, 0.95) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Info overlay — appears on hover */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'var(--space-4)',
          zIndex: 2,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          opacity: isHovered ? 1 : 0.7,
          transition: `all var(--duration-base) var(--ease-luxury)`,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--color-heading)',
            fontStyle: 'italic',
            marginBottom: '4px',
          }}
        >
          {artist.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-gold)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: 'var(--space-2)',
          }}
        >
          {artist.specialty}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sub)',
            fontSize: '15px',
            color: 'var(--color-text-muted)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.6,
            maxHeight: isHovered ? '100px' : '0',
            overflow: 'hidden',
            transition: `max-height 0.6s var(--ease-luxury)`,
          }}
        >
          {artist.bio}
        </p>
      </div>
    </div>
  )
}

export default function Artists() {
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
      id="artists"
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
            The Team
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
            Meet the Artists
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: 'var(--color-text-muted)',
              fontWeight: 300,
              fontStyle: 'italic',
              maxWidth: '550px',
              margin: '0 auto',
            }}
          >
            Not staff. Artists. Each one chosen for their vision, their patience, and their craft.
          </p>
        </div>

        {/* Artist Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {artists.map((artist, index) => (
            <ArtistCard key={artist.name} artist={artist} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
