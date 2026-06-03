import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Coffee, 
  Sparkles, 
  Scissors, 
  Sun, 
  ArrowRight, 
  RotateCcw, 
  Compass, 
  Check, 
  ChevronRight
} from 'lucide-react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

const RITUAL_STEPS = [
  {
    number: 'I',
    title: 'Aura Consult',
    icon: Coffee,
    tagline: 'The alignment of craft and identity.',
    description: 'Begin your journey in our quiet atelier lounge. Over a complimentary pour-over espresso, botanical tea infusion, or organic wine, your artist conducts a sensory consult. We explore your hair\'s organic texture, behavioral patterns, and personal aesthetic goals before touching a comb.',
    image: '/images/ritual_consult.png',
    quote: '"Quiet, deliberate conversation is the foundation of high artistry."'
  },
  {
    number: 'II',
    title: 'Botanical Wash',
    icon: Sparkles,
    tagline: 'A restorative purification ritual.',
    description: 'Transition to our dim, low-lit washing space. Experience a warm-compress head massage and steam purification. We use customized organic clays, rich scalp botanicals, and cold-pressed oil formulations chosen specifically to restore your scalp ecosystem and prepare your hair canvas.',
    image: '/images/ritual_wash.png',
    quote: '"To transform the hair, we must first restore the foundation."'
  },
  {
    number: 'III',
    title: 'The Sculpting',
    icon: Scissors,
    tagline: 'Precision texturizing and flow.',
    description: 'Our master stylists execute a dry-cutting, texturizing, or braiding sequence tailored precisely to your facial geometry and hair\'s organic fall. We reject copy-paste salon trends, crafting architectural shapes that grow out beautifully and require minimal styling.',
    image: '/images/ritual_sculpt.png',
    quote: '"We find the shape that was already there, hidden in the raw texture."'
  },
  {
    number: 'IV',
    title: 'Luminous Glow',
    icon: Sun,
    tagline: 'The radiant reveal finish.',
    description: 'We complete the transformation with our signature cold-pressed gold elixir. Formulated with lightweight argan, jojoba, and marula oils, it locks in hydration, seals cuticles, and reflects natural light, leaving your hair with an ineffable, healthy aura.',
    image: '/images/ritual_glow.png',
    quote: '"The aura is the intangible glow you carry out into the world."'
  }
]

const QUIZ_QUESTIONS = [
  {
    id: 'hairType',
    question: "Select your hair's natural canvas",
    options: [
      { value: 'straight-wavy', label: 'Straight / Wavy', desc: 'Fine, medium, or thick strands with loose wave patterns' },
      { value: 'curly-coiled', label: 'Curly / Coiled', desc: 'Spirals, springy coils, or tight zig-zag texture patterns' },
      { value: 'braids-locks', label: 'Braids / Protective', desc: 'Bespoke protective designs, twists, dreadlocks, or locs' },
      { value: 'short-groomed', label: 'Classic / Short', desc: 'Precision skin fades, structural clipper crops, or beard work' }
    ]
  },
  {
    id: 'styleGoal',
    question: 'Define your desired presence',
    options: [
      { value: 'structured', label: 'Structured & Sharp', desc: 'High-definition lines, architectural shapes, and clean outlines' },
      { value: 'natural', label: 'Natural & Free-flowing', desc: 'Effortless movement, textured layers, and soft organic lines' },
      { value: 'creative', label: 'Bold & Avant-Garde', desc: 'Bespoke color panels, creative braiding patterns, or statement cuts' },
      { value: 'restored', label: 'Nourished & Restored', desc: 'Hydration focus, structural restoration, and scalp health' }
    ]
  },
  {
    id: 'vibe',
    question: 'Choose your preferred sensory state',
    options: [
      { value: 'quiet', label: 'Silent Atelier', desc: 'Minimal dialogue, dim lighting, meditative quietude' },
      { value: 'collaborative', label: 'Artistic Dialogue', desc: 'Co-creating, active idea-sharing, and styling education' },
      { value: 'warm', label: 'Warm & Social', desc: 'Engaging storytelling, lively salon atmosphere, botanical beverage pairings' }
    ]
  }
]

function getRecommendation(answers: { hairType: string; styleGoal: string; vibe: string }) {
  const { hairType, styleGoal } = answers
  
  if (hairType === 'braids-locks') {
    return {
      auraName: 'The Structural Guardian',
      desc: 'An architectural aura that honors texture and cultural lineage. Your styling emphasizes geometry, rhythm, and structural integrity.',
      artist: 'Zara Chen',
      service: 'Braiding',
      product: 'Aura Violet Scalp Nectar',
      accent: 'var(--color-violet)'
    }
  }
  
  if (styleGoal === 'creative') {
    return {
      auraName: 'The Avant-Garde Visionary',
      desc: 'A chromatic, high-contrast aura designed to capture attention. You look for bold statement elements, custom color scales, and editorial confidence.',
      artist: 'Kai Williams',
      service: 'Colour',
      product: 'Aura Luster Glossing Elixir',
      accent: 'var(--color-gold)'
    }
  }
  
  if (styleGoal === 'restored') {
    return {
      auraName: 'The Restored Minimalist',
      desc: 'A calm, deeply nourished aura highlighting hair health and scalp ecosystem balance. Your style emphasizes quiet recovery, shine, and natural elasticity.',
      artist: 'Kai Williams',
      service: 'Consultation',
      product: 'Botanical Repair Serum',
      accent: 'var(--color-violet)'
    }
  }
  
  if (hairType === 'short-groomed' && styleGoal === 'structured') {
    return {
      auraName: 'The Precision Sculpt',
      desc: 'A sharp, high-fidelity aura focused on clean angles, tight margins, and meticulous alignment. Your presence is defined and composed.',
      artist: 'Marcus Webb',
      service: 'Grooming',
      product: 'Aura Gold Pomade',
      accent: 'var(--color-gold)'
    }
  }
  
  return {
    auraName: 'The Radiant Natural',
    desc: 'An effortless, organic aura celebrating natural movement and textures. Your styling prioritizes soft hand-styled lines, weight distribution, and a healthy golden shine.',
    artist: 'Marcus Webb',
    service: 'Precision Cut',
    product: 'Aura Gold Elixir',
    accent: 'var(--color-gold)'
  }
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'rituals' | 'quiz'>('rituals')
  const [activeStep, setActiveStep] = useState(0)
  const [quizStep, setQuizStep] = useState<number>(-1) // -1 is start screen
  const [answers, setAnswers] = useState({ hairType: '', styleGoal: '', vibe: '' })
  const navigate = useNavigate()

  const handleOptionSelect = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
    setTimeout(() => {
      setQuizStep(prev => prev + 1)
    }, 300)
  }

  const resetQuiz = () => {
    setQuizStep(-1)
    setAnswers({ hairType: '', styleGoal: '', vibe: '' })
  }

  const activeStepData = RITUAL_STEPS[activeStep]
  const recommendation = quizStep === 3 ? getRecommendation(answers) : null

  const handleBookRecommendation = () => {
    if (recommendation) {
      const url = `/booking?artist=${encodeURIComponent(recommendation.artist)}&service=${encodeURIComponent(recommendation.service)}`
      navigate(url)
    }
  }

  return (
    <section
      id="experience"
      style={{
        backgroundColor: 'var(--color-bg)',
        position: 'relative',
        padding: 'var(--space-16) 0',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glows */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(212, 168, 92, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-4)', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block',
            marginBottom: 'var(--space-2)',
          }}>
            The Experience
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: 'var(--color-heading)', marginBottom: 'var(--space-4)',
          }}>
            Sensory Rituals
          </h2>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--color-text-muted)', fontWeight: 300, fontStyle: 'italic',
            maxWidth: '650px', margin: '0 auto var(--space-6)',
          }}>
            We believe styling is an exchange of energy, patience, and bespoke craft. Read our ritual process or consult our interactive finder.
          </p>

          {/* Toggle pill */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: '4px',
            borderRadius: '0',
            gap: '4px',
          }}>
            <button
              onClick={() => setActiveTab('rituals')}
              style={{
                padding: '8px 24px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: 'none',
                backgroundColor: activeTab === 'rituals' ? 'rgba(212, 168, 92, 0.08)' : 'transparent',
                color: activeTab === 'rituals' ? 'var(--color-gold)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'rituals' ? '1px solid var(--color-gold)' : '1px solid transparent',
                transition: 'all var(--duration-fast) var(--ease-luxury)',
              }}
            >
              Atelier Rituals
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              style={{
                padding: '8px 24px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: 'none',
                backgroundColor: activeTab === 'quiz' ? 'rgba(212, 168, 92, 0.08)' : 'transparent',
                color: activeTab === 'quiz' ? 'var(--color-gold)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'quiz' ? '1px solid var(--color-gold)' : '1px solid transparent',
                transition: 'all var(--duration-fast) var(--ease-luxury)',
              }}
            >
              Aura Finder
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'rituals' ? (
            <motion.div
              key="rituals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: 'var(--space-8)',
                alignItems: 'center',
              }}
              className="rituals-grid"
            >
              {/* Left Column: Steps list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {RITUAL_STEPS.map((step, idx) => {
                  const isSelected = activeStep === idx
                  const StepIcon = step.icon

                  return (
                    <div
                      key={step.title}
                      onClick={() => setActiveStep(idx)}
                      style={{
                        padding: 'var(--space-3)',
                        backgroundColor: isSelected ? 'rgba(16, 16, 24, 0.6)' : 'transparent',
                        border: `1px solid ${isSelected ? 'var(--color-border)' : 'transparent'}`,
                        borderLeft: `2px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-border)'}`,
                        opacity: isSelected ? 1 : 0.4,
                        transition: 'all var(--duration-base) var(--ease-luxury)',
                        cursor: 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.opacity = '0.85'
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.opacity = '0.4'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '8px' }}>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'var(--color-gold)',
                          fontWeight: 500
                        }}>
                          0{idx + 1} //
                        </span>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '20px',
                          fontWeight: 600,
                          margin: 0,
                          color: isSelected ? 'var(--color-heading)' : 'var(--color-text)',
                        }}>
                          {step.title}
                        </h3>
                        <StepIcon size={16} strokeWidth={1.5} color={isSelected ? 'var(--color-gold)' : 'var(--color-text-muted)'} style={{ marginLeft: 'auto' }} />
                      </div>
                      
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {step.tagline}
                        </motion.p>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Right Column: Dynamic Preview Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                }}>
                  {/* Subtle glow rim */}
                  <div style={{
                    position: 'absolute',
                    inset: '10px',
                    border: '1px solid rgba(212, 168, 92, 0.05)',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }} />

                  {/* Image crossfade container */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeStep}
                      src={activeStepData.image}
                      alt={activeStepData.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </AnimatePresence>

                  {/* Glassmorphic step tag */}
                  <div style={{
                    position: 'absolute',
                    bottom: 'var(--space-2)',
                    left: 'var(--space-2)',
                    backgroundColor: 'rgba(9, 9, 14, 0.85)',
                    border: '1px solid var(--color-border)',
                    padding: '6px 14px',
                    backdropFilter: 'blur(8px)',
                    zIndex: 3,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      color: 'var(--color-gold)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}>
                      Phase {activeStepData.number}
                    </span>
                  </div>
                </div>

                {/* Detailed Description Panel */}
                <div style={{
                  padding: 'var(--space-3) var(--space-1)',
                  minHeight: '140px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--color-text)',
                    lineHeight: 1.7,
                    marginBottom: 'var(--space-2)',
                  }}>
                    {activeStepData.description}
                  </p>
                  
                  <span style={{
                    fontFamily: 'var(--font-sub)',
                    fontSize: '16px',
                    color: 'var(--color-gold)',
                    fontStyle: 'italic',
                    opacity: 0.95,
                    display: 'block',
                  }}>
                    {activeStepData.quote}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Quiz Tab */
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                maxWidth: '650px',
                margin: '0 auto',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-6)',
                position: 'relative',
              }}
            >
              {/* Quiz step progression bar */}
              {quizStep >= 0 && quizStep < 3 && (
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                      Aura Consultation
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                      Question {quizStep + 1} of 3
                    </span>
                  </div>
                  <div style={{ height: '1px', backgroundColor: 'var(--color-border)', position: 'relative' }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: 'var(--color-gold)',
                      width: `${((quizStep + 1) / 3) * 100}%`,
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {quizStep === -1 && (
                  /* Welcome view */
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}
                  >
                    <Compass size={40} strokeWidth={1} color="var(--color-gold)" style={{ margin: '0 auto var(--space-4)' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      color: 'var(--color-heading)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      Discover Your Aura
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7,
                      maxWidth: '450px',
                      margin: '0 auto var(--space-6)',
                    }}>
                      Answer 3 quiet questions about your hair, goals, and sensory preferences. We will reveal your style archetype, product combination, and matched artist.
                    </p>
                    <Button variant="ghost" onClick={() => setQuizStep(0)}>
                      Begin Consultation <ArrowRight size={14} strokeWidth={1.5} />
                    </Button>
                  </motion.div>
                )}

                {quizStep >= 0 && quizStep < 3 && (
                  /* Question card */
                  <motion.div
                    key={quizStep}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px',
                      color: 'var(--color-heading)',
                      marginBottom: 'var(--space-4)',
                      textAlign: 'center',
                    }}>
                      {QUIZ_QUESTIONS[quizStep].question}
                    </h4>

                    <div style={{ display: 'grid', gap: '10px' }}>
                      {QUIZ_QUESTIONS[quizStep].options.map(option => {
                        const isSelected = answers[QUIZ_QUESTIONS[quizStep].id as keyof typeof answers] === option.value
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleOptionSelect(QUIZ_QUESTIONS[quizStep].id, option.value)}
                            style={{
                              padding: '16px 20px',
                              textAlign: 'left',
                              border: `1px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-border)'}`,
                              backgroundColor: isSelected ? 'rgba(212, 168, 92, 0.04)' : 'transparent',
                              borderRadius: '0',
                              transition: 'all var(--duration-fast) var(--ease-luxury)',
                              cursor: 'none',
                            }}
                            onMouseEnter={e => {
                              if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-text-muted)'
                            }}
                            onMouseLeave={e => {
                              if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border)'
                            }}
                          >
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              fontWeight: 500,
                              color: isSelected ? 'var(--color-gold)' : 'var(--color-text)',
                              display: 'block',
                              marginBottom: '2px',
                            }}>
                              {option.label}
                            </span>
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '12px',
                              color: 'var(--color-text-muted)',
                              fontWeight: 300,
                            }}>
                              {option.desc}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {quizStep === 3 && recommendation && (
                  /* Result screen */
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: 'center' }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      background: 'radial-gradient(circle, rgba(212, 168, 92, 0.1) 0%, transparent 80%)',
                    }}>
                      <Check size={20} strokeWidth={1.5} color="var(--color-gold)" />
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                    }}>
                      Your Archetype
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      color: 'var(--color-heading)',
                      margin: '4px 0 16px',
                      fontStyle: 'italic',
                    }}>
                      {recommendation.auraName}
                    </h3>

                    <p style={{
                      fontFamily: 'var(--font-sub)',
                      fontSize: '17px',
                      color: 'var(--color-text-muted)',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      marginBottom: 'var(--space-6)',
                      padding: '0 var(--space-2)',
                    }}>
                      {recommendation.desc}
                    </p>

                    {/* Results Panel */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      borderTop: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)',
                      padding: '20px 0',
                      marginBottom: 'var(--space-6)',
                      gap: '12px',
                    }} className="quiz-result-metrics">
                      <div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                          Matched Stylist
                        </span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--color-heading)', fontWeight: 600 }}>
                          {recommendation.artist}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                          Bespoke Service
                        </span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--color-heading)', fontWeight: 600 }}>
                          {recommendation.service}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                          Bespoke Product
                        </span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--color-heading)', fontWeight: 600 }}>
                          {recommendation.product}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                      <Button variant="filled" onClick={handleBookRecommendation}>
                        Book This Ritual <ChevronRight size={14} strokeWidth={1.5} />
                      </Button>
                      <button
                        onClick={resetQuiz}
                        style={{
                          background: 'none',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-muted)',
                          padding: '14px 24px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'none',
                          transition: 'all var(--duration-fast) ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-text-muted)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                      >
                        <RotateCcw size={13} strokeWidth={1.5} /> Reset
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Media query styling for responsive rituals grid */}
      <style>{`
        @media (max-width: 900px) {
          .rituals-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-4) !important;
          }
        }
        @media (max-width: 600px) {
          .quiz-result-metrics {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  )
}
