import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

interface ImageRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.from(containerRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.4,
          ease: 'expo.inOut',
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    })
    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        clipPath: 'inset(0 0% 0 0)',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
