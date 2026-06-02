import { MapPin, Phone, Mail, Instagram, Clock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-12) 0 var(--space-6)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--space-4)',
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-8)',
            paddingBottom: 'var(--space-8)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {/* Brand Column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-heading)',
                marginBottom: 'var(--space-3)',
              }}
            >
              House of <span style={{ color: 'var(--color-gold)' }}>Aura</span>
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sub)',
                fontSize: '18px',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Where presence is crafted.
            </p>
          </div>

          {/* Contact Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-1)',
              }}
            >
              Contact
            </h4>
            <a
              href="tel:+440000000000"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--color-text-muted)',
                fontSize: '14px',
                textDecoration: 'none',
                transition: `color var(--duration-fast) ease`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
            >
              <Phone size={14} strokeWidth={1.5} />
              +44 (0) 000 000 0000
            </a>
            <a
              href="mailto:hello@houseofaura.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--color-text-muted)',
                fontSize: '14px',
                textDecoration: 'none',
                transition: `color var(--duration-fast) ease`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
            >
              <Mail size={14} strokeWidth={1.5} />
              hello@houseofaura.com
            </a>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--color-text-muted)',
                fontSize: '14px',
              }}
            >
              <MapPin size={14} strokeWidth={1.5} />
              London, United Kingdom
            </div>
          </div>

          {/* Hours Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-1)',
              }}
            >
              Hours
            </h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--color-text-muted)',
                fontSize: '14px',
              }}
            >
              <Clock size={14} strokeWidth={1.5} />
              Mon — Fri: 9:00 — 20:00
            </div>
            <div
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '14px',
                paddingLeft: '22px',
              }}
            >
              Sat: 10:00 — 18:00
            </div>
            <div
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '14px',
                paddingLeft: '22px',
              }}
            >
              Sun: By appointment
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-4)',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              fontWeight: 300,
            }}
          >
            &copy; {currentYear} House of Aura. All rights reserved.
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              style={{
                color: 'var(--color-text-muted)',
                transition: `color var(--duration-fast) ease`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
