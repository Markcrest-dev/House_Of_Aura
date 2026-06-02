import { type ReactNode, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'ghost' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export default function Button({ 
  children, 
  variant = 'ghost', 
  size = 'md', 
  href,
  style,
  ...props 
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    border: '1px solid var(--color-gold)',
    borderRadius: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: `all var(--duration-fast) var(--ease-luxury)`,
    position: 'relative' as const,
    overflow: 'hidden',
    ...style,
  }

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '10px 24px', fontSize: '11px', fontWeight: 500 },
    md: { padding: '14px 36px', fontSize: '12px', fontWeight: 500 },
    lg: { padding: '18px 48px', fontSize: '13px', fontWeight: 500 },
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-gold)',
    },
    filled: {
      backgroundColor: 'var(--color-gold)',
      color: 'var(--color-bg)',
    },
  }

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    if (variant === 'ghost') {
      target.style.backgroundColor = 'var(--color-gold)'
      target.style.color = 'var(--color-bg)'
    } else {
      target.style.opacity = '0.85'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    if (variant === 'ghost') {
      target.style.backgroundColor = 'transparent'
      target.style.color = 'var(--color-gold)'
    } else {
      target.style.opacity = '1'
    }
  }

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        <button 
          style={combinedStyles} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </button>
      </a>
    )
  }

  return (
    <button 
      style={combinedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}
