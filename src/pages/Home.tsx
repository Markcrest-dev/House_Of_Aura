import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap } from '../lib/gsap'

import Hero from '../components/sections/Hero'
import Button from '../components/ui/Button'
import ImageReveal from '../components/ui/ImageReveal'

function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate philosophy content
      gsap.from(textRef.current!.children, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        padding: 'var(--space-16) 0',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(155, 141, 196, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--space-4)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-12)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="philosophy-grid"
      >
        {/* Left Side: Brand Philosophy Text */}
        <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}
          >
            Philosophy
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              color: 'var(--color-heading)',
              lineHeight: 1.15,
            }}
          >
            A Sanctuary <br />
            of Restrained Luxury
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 'clamp(18px, 1.5vw, 24px)',
              color: 'var(--color-text)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.6,
              borderLeft: '2px solid var(--color-gold)',
              paddingLeft: 'var(--space-3)',
              margin: 'var(--space-2) 0',
            }}
          >
            "We believe styling is not a transaction. It is an alignment of craft, chemistry, and identity."
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
            }}
          >
            At House of Aura, we reject the transactional noise of the modern salon. True styling is the deliberate craft of listening before sculpting. We map your natural geometry, texture, and personal presence to reveal a design that is effortlessly and undeniably yours.
          </p>
          <div style={{ marginTop: 'var(--space-2)' }}>
            <Button variant="ghost" onClick={() => navigate('/rituals')}>
              Discover The Rituals <ArrowRight size={14} style={{ marginLeft: '8px' }} />
            </Button>
          </div>
        </div>

        {/* Right Side: Editorial Image Frame */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5' }}>
          <ImageReveal>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                position: 'relative',
              }}
            >
              <img
                src="/images/ritual_consult.png"
                alt="House of Aura Atelier Consultation"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.85,
                  filter: 'grayscale(0.2) brightness(0.9)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 'var(--space-2)',
                  border: '1px solid rgba(212, 168, 92, 0.15)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </ImageReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .philosophy-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
        }
      `}</style>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
    </main>
  )
}
