import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Staggered entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Character-by-character reveal for headline
  const headlineText = 'House of Aura.'
  const subtitleText = 'Where presence is crafted.'

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video / Background Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* Cinematic gradient background — will be replaced with video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(212, 168, 92, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(155, 141, 196, 0.04) 0%, transparent 50%),
              var(--color-bg)
            `,
          }}
        />
        {/* Video overlay gradient — per build plan spec */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 55%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 var(--space-4)',
        }}
      >
        {/* Headline — character by character */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 110px)',
            fontWeight: 700,
            color: 'var(--color-heading)',
            lineHeight: 1.05,
            marginBottom: 'var(--space-3)',
            letterSpacing: '-0.02em',
          }}
        >
          {headlineText.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0) rotateX(0)' : 'translateY(60px) rotateX(-90deg)',
                transition: `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                transitionDelay: `${0.5 + i * 0.03}s`,
                whiteSpace: char === ' ' ? 'pre' : 'normal',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 'clamp(20px, 3vw, 36px)',
            fontWeight: 300,
            color: 'var(--color-text)',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 1s var(--ease-luxury)`,
            transitionDelay: '1.2s',
            marginBottom: 'var(--space-8)',
            fontStyle: 'italic',
          }}
        >
          {subtitleText}
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.8s var(--ease-luxury)`,
            transitionDelay: '1.6s',
          }}
        >
          <Button
            size="lg"
            onClick={() => {
              document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Book Your Appointment
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          opacity: isLoaded ? 1 : 0,
          transition: `opacity 1s ease`,
          transitionDelay: '2s',
        }}
      >
        {/* Thin vertical line */}
        <div
          style={{
            width: '1px',
            height: '48px',
            backgroundColor: 'var(--color-gold)',
            opacity: 0.4,
          }}
        />
        <div
          style={{
            animation: 'scrollBounce 2s infinite',
            color: 'var(--color-gold)',
            opacity: 0.6,
          }}
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </div>
      </div>

      {/* Scroll bounce keyframe */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  )
}
