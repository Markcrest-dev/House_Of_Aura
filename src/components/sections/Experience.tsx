import { useEffect, useRef, useState } from 'react'

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
  const [visibleLines, setVisibleLines] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - (rect.bottom - window.innerHeight) / rect.height))
      const lineCount = Math.floor(progress * (lines.length + 1))
      setVisibleLines(Math.min(lineCount, lines.length))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView])

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
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
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(212, 168, 92, 0.03) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
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
            marginBottom: 'var(--space-8)',
            opacity: visibleLines > 0 ? 1 : 0.3,
            transition: 'opacity 0.6s ease',
          }}
        >
          The Experience
        </span>

        {lines.map((line, index) => {
          const isLineVisible = index < visibleLines
          const isLastLine = index === lines.length - 1

          if (line === '') {
            return <div key={index} style={{ height: 'var(--space-6)' }} />
          }

          return (
            <p
              key={index}
              style={{
                fontFamily: isLastLine ? 'var(--font-display)' : 'var(--font-sub)',
                fontSize: isLastLine ? 'clamp(28px, 4vw, 48px)' : 'clamp(22px, 3vw, 36px)',
                fontWeight: isLastLine ? 700 : 300,
                color: isLastLine ? 'var(--color-heading)' : 'var(--color-text)',
                lineHeight: 1.5,
                marginBottom: 'var(--space-4)',
                opacity: isLineVisible ? 1 : 0.08,
                transform: isLineVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `all 0.8s var(--ease-luxury)`,
                transitionDelay: '0.1s',
              }}
            >
              {line}
            </p>
          )
        })}
      </div>
    </section>
  )
}
