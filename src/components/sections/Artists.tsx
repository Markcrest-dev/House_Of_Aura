import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'

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

import ImageReveal from '../ui/ImageReveal'

function ArtistCard({ artist, index }: { artist: typeof artists[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance from bottom
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      })
    })
    return () => ctx.revert()
  }, [index])

  const initials = artist.name.split(' ').map(n => n[0]).join('')

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}
    >
      <ImageReveal delay={index * 0.2 + 0.2}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--color-surface)',
            background: `radial-gradient(ellipse at center, ${artist.accentColor} 0%, var(--color-surface) 70%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: isHovered ? 'grayscale(0) brightness(1.1)' : 'grayscale(0.8) brightness(0.9)',
            transition: 'filter 0.6s var(--ease-luxury)',
            width: '100%',
            height: '100%',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '80px', fontWeight: 700,
            color: isHovered ? 'var(--color-gold)' : 'var(--color-border)',
            transition: 'color 0.6s var(--ease-luxury)', opacity: 0.4,
          }}>
            {initials}
          </span>
        </div>
      </ImageReveal>

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
        background: 'linear-gradient(to top, rgba(9, 9, 14, 0.95) 0%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Info overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--space-4)', zIndex: 2,
        transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
        opacity: isHovered ? 1 : 0.7,
        transition: 'all var(--duration-base) var(--ease-luxury)',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700,
          color: 'var(--color-heading)', fontStyle: 'italic', marginBottom: '4px',
        }}>
          {artist.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-gold)',
          letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 400,
          marginBottom: 'var(--space-2)',
        }}>
          {artist.specialty}
        </p>
        <p style={{
          fontFamily: 'var(--font-sub)', fontSize: '15px', color: 'var(--color-text-muted)',
          fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6,
          maxHeight: isHovered ? '100px' : '0', overflow: 'hidden',
          transition: 'max-height 0.6s var(--ease-luxury)',
        }}>
          {artist.bio}
        </p>
      </div>
    </div>
  )
}

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current!.children, {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="artists" ref={sectionRef} style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block',
            marginBottom: 'var(--space-2)',
          }}>The Team</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: 'var(--color-heading)', marginBottom: 'var(--space-3)',
          }}>Meet the Artists</h2>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--color-text-muted)', fontWeight: 300, fontStyle: 'italic',
            maxWidth: '550px', margin: '0 auto',
          }}>
            Not staff. Artists. Each one chosen for their vision, their patience, and their craft.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3)' }}>
          {artists.map((artist, i) => <ArtistCard key={artist.name} artist={artist} index={i} />)}
        </div>
      </div>
    </section>
  )
}
