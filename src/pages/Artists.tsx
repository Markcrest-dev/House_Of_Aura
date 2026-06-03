import ArtistsSection from '../components/sections/Artists'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Artists() {
  const navigate = useNavigate()

  return (
    <div style={{ 
      minHeight: '100vh', 
      paddingTop: '120px', 
      backgroundColor: 'var(--color-bg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(155, 141, 196, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(212, 168, 92, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ArtistsSection />
        
        {/* Call to action */}
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 var(--space-4) var(--space-16)',
          textAlign: 'center'
        }}>
          <div style={{ 
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-12)',
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '28px', 
              color: 'var(--color-heading)',
              marginBottom: 'var(--space-2)'
            }}>
              Want to match with a specific artist?
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
              fontSize: '15px',
              marginBottom: 'var(--space-6)'
            }}>
              Take our 2-minute interactive Aura Finder to match with the stylist best suited for your hair archetype and sensory preferences.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="ghost" onClick={() => navigate('/rituals')}>
                Match with Your Stylist <ArrowRight size={14} style={{ marginLeft: '8px' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
