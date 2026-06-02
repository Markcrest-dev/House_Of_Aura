import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const lines = [
  'Complimentary drinks on arrival.',
  'Products chosen for your hair, not a shelf.',
  'A space designed around quiet.',
  'Artists who listen before they cut.',
  '',
  'This is House of Aura.',
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      const pin = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${lines.length * 300}`,
        pin: pinRef.current,
        pinSpacing: true,
      })

      // Reveal each line based on scroll progress
      lineRefs.current.forEach((line, i) => {
        if (!line) return
        gsap.set(line, { opacity: 0.08, y: 12 })

        gsap.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${i * 300} top`,
            end: `top+=${(i + 1) * 300} top`,
            toggleActions: 'play none none reverse',
          },
        })
      })

      return () => pin.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg)',
        position: 'relative',
      }}
    >
      <div
        ref={pinRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-16) var(--space-4)',
          position: 'relative',
        }}
      >
        {/* Subtle ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 168, 92, 0.03) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block',
            marginBottom: 'var(--space-8)',
          }}>
            The Experience
          </span>

          {lines.map((line, index) => {
            const isLastLine = index === lines.length - 1

            if (line === '') {
              return <div key={index} style={{ height: 'var(--space-6)' }} />
            }

            return (
              <p
                key={index}
                ref={el => { lineRefs.current[index] = el }}
                style={{
                  fontFamily: isLastLine ? 'var(--font-display)' : 'var(--font-sub)',
                  fontSize: isLastLine ? 'clamp(28px, 4vw, 48px)' : 'clamp(22px, 3vw, 36px)',
                  fontWeight: isLastLine ? 700 : 300,
                  color: isLastLine ? 'var(--color-heading)' : 'var(--color-text)',
                  lineHeight: 1.5,
                  marginBottom: 'var(--space-4)',
                }}
              >
                {line}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
