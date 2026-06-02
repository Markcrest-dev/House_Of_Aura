import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import { gsap } from '../../lib/gsap'

const testimonials = [
  { quote: 'I walked in feeling ordinary. I walked out feeling like I had a presence. That\'s the Aura effect.', name: 'Amara J.', service: 'Precision Cut & Styling', stars: 5 },
  { quote: 'Marcus doesn\'t just cut hair — he reads you. My fade has never looked this intentional.', name: 'David K.', service: 'Precision Fade', stars: 5 },
  { quote: 'Zara\'s braids last longer and look better than anywhere I\'ve been. The atmosphere is unreal.', name: 'Nkechi O.', service: 'Braiding — Box Braids', stars: 5 },
  { quote: 'The experience matters as much as the result. Complimentary drinks, quiet space, genuine artistry.', name: 'Sophie L.', service: 'Colour & Treatment', stars: 5 },
  { quote: 'I drove two hours for this. I\'d drive three. This is the standard now.', name: 'James R.', service: 'Full Grooming', stars: 5 },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title stagger
      gsap.from(titleRef.current!.children, {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      })

      // Card stagger with 3D perspective
      const cards = gridRef.current!.children
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        rotateY: 8,
        rotateX: 4,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: 'var(--space-2)',
          }}>Testimonials</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: 'var(--color-heading)' }}>Voices</h2>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--color-text-muted)',
            fontWeight: 300, fontStyle: 'italic', maxWidth: '500px', margin: 'var(--space-3) auto 0',
          }}>What stays with our clients long after they leave.</p>
        </div>

        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-3)', perspective: '1000px',
        }}>
          {testimonials.map((t, i) => {
            const rotateY = (i % 3 - 1) * 1.5
            return (
              <div key={t.name} style={{
                backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderLeft: '2px solid rgba(212, 168, 92, 0.4)', padding: 'var(--space-6) var(--space-4)',
                transform: `perspective(1000px) rotateY(${rotateY}deg)`,
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-3)' }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} strokeWidth={1.5} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <blockquote style={{
                  fontFamily: 'var(--font-accent)', fontSize: '16px', fontStyle: 'italic',
                  color: 'var(--color-text)', lineHeight: 1.7, marginBottom: 'var(--space-4)',
                }}>&ldquo;{t.quote}&rdquo;</blockquote>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                  color: 'var(--color-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                }}>{t.name}</p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)',
                  fontWeight: 300, marginTop: '4px',
                }}>{t.service}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
