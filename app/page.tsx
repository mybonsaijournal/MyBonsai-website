'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

// ============================================================================
// TYPES
// ============================================================================

type FeatureKey = 'journal' | 'garden' | 'wristband'

interface FeatureContent {
  title: string
  subtitle?: string
  progress?: { current: number; total: number; label: string }
  body: string[]
}

// ============================================================================
// BONSAI SPECIES DATA
// ============================================================================

const bonsaiSpecies = [
  { name: 'Cherry Blossom', image: '/assets/bonsai-img/cherry-blossom.png', theme: 'Renewal' },
  { name: 'Chinese Elm', image: '/assets/bonsai-img/chinese-elm.png', theme: 'Resilience' },
  { name: 'Boxwood', image: '/assets/bonsai-img/boxwood.png', theme: 'Patience' },
  { name: 'Camellia', image: '/assets/bonsai-img/camellia.png', theme: 'Self-compassion' },
  { name: 'Chinese Hackberry', image: '/assets/bonsai-img/chinese-hackberry.png', theme: 'Focus' },
]

// Floating bonsai images
const orbitImages = [
  '/assets/bonsai-img/japanese-maple.png',
  '/assets/bonsai-img/juniper.png',
  '/assets/bonsai-img/ficus.png',
  '/assets/bonsai-img/ginkgo.png',
  '/assets/bonsai-img/azalea.png',
  '/assets/bonsai-img/olive.png',
  '/assets/bonsai-img/japanese-black-pine.png',
  '/assets/bonsai-img/hinoki-cypress.png',
  '/assets/bonsai-img/trident-maple.png',
  '/assets/bonsai-img/white-pine.png',
  '/assets/bonsai-img/serissa.png',
  '/assets/bonsai-img/pomegranate.png',
  '/assets/bonsai-img/fukien-tea.png',
  '/assets/bonsai-img/japanese-zelkova.png',
  '/assets/bonsai-img/dwarf-jade.png',
  '/assets/bonsai-img/bald-cypress.png',
  '/assets/bonsai-img/chinese-juniper.png',
  '/assets/bonsai-img/cotoneaster.png',
]

// ============================================================================
// FEATURE CONTENT DATA
// ============================================================================

const featureContent: Record<FeatureKey, FeatureContent> = {
  journal: {
    title: 'JOURNAL',
    body: [
      'Your private space for reflection and growth.',
      'Write freely about your day, your thoughts, your challenges. The AI reads your entries deeply and learns who you are — your patterns, values, and struggles.',
      'Over time, it becomes a thinking partner that truly understands you. Every entry helps it give you better insights, sharper mantras, and more meaningful reflections.',
      'The more honest you are, the more powerful it becomes.',
    ],
  },
  garden: {
    title: 'GARDEN',
    progress: { current: 50, total: 50, label: '50 of 50 species unlocked' },
    body: [
      'Your mental growth, visualized.',
      'There are 50 unique species to unlock. Each one represents a different mental theme — resilience, focus, letting go, self-compassion, and more.',
      'As you journal, the AI detects when you\'re working through these themes and unlocks species that match your growth. It\'s not random — each unlock is tied to something real you wrote about.',
      'Click any polaroid to see why it was unlocked and the brain science behind that mental skill. Your garden is a map of how your mind is evolving.',
    ],
  },
  wristband: {
    title: 'WRISTBAND',
    body: [
      'Turn your insights into something you can wear.',
      'Based on everything you\'ve journaled, the AI generates mantras tailored specifically to you — your struggles, your goals, your mindset.',
      'Pick the one that resonates most, and we\'ll engrave it on a wristband you can wear every day. A physical reminder of the mental work you\'re doing.',
      'Hit the refresh button to generate new options whenever you need fresh perspective.',
    ],
  },
}

// ============================================================================
// ICONS
// ============================================================================

function CloseIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function WriteIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  )
}

function ReflectIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  )
}

function GrowIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  )
}

function LeafIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-8-7.582-8-12a8 8 0 0116 0c0 4.418-4 8-8 12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11M8 14l4-3 4 3" />
    </svg>
  )
}


function ShieldIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Navigation
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/80 backdrop-blur-nav shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src="/assets/bonsai.jpeg" 
            alt="My Bonsai Journal logo" 
            className="w-9 h-9 object-cover rounded-full"
          />
          <span className="font-display text-xl font-medium text-charcoal">
            My Bonsai Journal
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
            How it works
          </a>
          <a href="#pricing" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
            Pricing
          </a>
          <button className="px-5 py-2 text-sm font-medium text-white bg-sage rounded-full hover:bg-sage-dark transition-colors shadow-soft">
            Download
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-charcoal-muted hover:text-charcoal" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

// Pill Label
function PillLabel({ children, size = 'md' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-xs',
    lg: 'px-5 py-2 text-sm',
  }

  return (
    <span
      className={`inline-block pill-gradient rounded-full font-medium tracking-wider text-charcoal-muted uppercase ${sizeClasses[size]}`}
    >
      {children}
    </span>
  )
}

// Progress Bar
function ProgressBar({ progress, total, className = '' }: { progress: number; total: number; className?: string }) {
  const percentage = (progress / total) * 100

  return (
    <div className={`w-full ${className}`}>
      <div className="h-1 bg-beige-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-sage rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Floating Bonsai positions - scattered around the phone area
const floatingPositions = [
  { x: -180, y: -200, size: 52, duration: 12, animation: 1 },
  { x: 160, y: -180, size: 48, duration: 14, animation: 2 },
  { x: -200, y: 50, size: 44, duration: 11, animation: 3 },
  { x: 180, y: 80, size: 50, duration: 13, animation: 4 },
  { x: -140, y: -80, size: 46, duration: 12, animation: 1 },
  { x: 140, y: -60, size: 42, duration: 15, animation: 2 },
  { x: -160, y: 180, size: 48, duration: 13, animation: 3 },
  { x: 170, y: 200, size: 44, duration: 11, animation: 4 },
  { x: -80, y: -220, size: 40, duration: 14, animation: 2 },
  { x: 80, y: 220, size: 46, duration: 12, animation: 1 },
  { x: -220, y: -120, size: 42, duration: 13, animation: 4 },
  { x: 200, y: -20, size: 50, duration: 14, animation: 3 },
  { x: -100, y: -160, size: 38, duration: 11, animation: 2 },
  { x: 100, y: -140, size: 44, duration: 15, animation: 1 },
  { x: -240, y: -40, size: 40, duration: 12, animation: 4 },
  { x: 220, y: 140, size: 46, duration: 13, animation: 3 },
  { x: -60, y: 200, size: 42, duration: 14, animation: 1 },
  { x: 60, y: -240, size: 48, duration: 11, animation: 2 },
]

// Floating Bonsai Component
function FloatingBonsai({ images }: { images: string[] }) {
  const floatClasses = [
    'animate-float-1',
    'animate-float-2', 
    'animate-float-3',
    'animate-float-4',
  ]

  return (
    <>
      {images.map((src, index) => {
        const pos = floatingPositions[index % floatingPositions.length]
        const floatClass = floatClasses[(pos.animation - 1) % floatClasses.length]
        
        return (
          <div
            key={src}
            className={`absolute ${floatClass}`}
            style={{
              left: `calc(50% + ${pos.x}px)`,
              top: `calc(50% + ${pos.y}px)`,
              '--float-duration': `${pos.duration}s`,
              animationDelay: `${index * -2}s`,
            } as React.CSSProperties}
          >
            <Image
              src={src}
              alt="Bonsai"
              width={pos.size}
              height={pos.size}
              className="object-contain opacity-50 drop-shadow-lg"
            />
          </div>
        )
      })}
    </>
  )
}

// Phone Mockup with Floating Bonsai
function PhoneMockWithOrbits() {
  return (
    <div className="relative w-[320px] h-[580px] sm:w-[440px] sm:h-[680px] md:w-[500px] md:h-[740px]">
      {/* Floating bonsai scattered around */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <FloatingBonsai images={orbitImages} />
      </div>

      {/* Phone centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <PhoneMock />
      </div>
    </div>
  )
}

// Phone Mockup (Hero visual)
function PhoneMock() {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[240px] md:w-[260px] transform rotate-3 hover:rotate-0 transition-transform duration-500">
      {/* soft glow behind phone */}
      <div className="absolute -inset-8 -z-10 rounded-[48px] bg-gradient-to-br from-[#efe7dc] via-sage/10 to-transparent blur-3xl opacity-80" />

      {/* phone body */}
      <div className="rounded-[36px] bg-[#1c1c1e] p-[8px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.35)]">
        {/* side buttons */}
        <div className="absolute -left-[2px] top-[70px] h-[25px] w-[3px] rounded-l-sm bg-[#2c2c2e]" />
        <div className="absolute -left-[2px] top-[105px] h-[45px] w-[3px] rounded-l-sm bg-[#2c2c2e]" />
        <div className="absolute -left-[2px] top-[155px] h-[45px] w-[3px] rounded-l-sm bg-[#2c2c2e]" />
        <div className="absolute -right-[2px] top-[110px] h-[55px] w-[3px] rounded-r-sm bg-[#2c2c2e]" />
        
        {/* inner bezel */}
        <div className="relative overflow-hidden rounded-[30px] bg-[#0f1419]">
          {/* status bar */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 pt-2.5 text-[10px] font-semibold text-white">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              {/* Cellular signal bars */}
              <svg className="w-[17px] h-[12px]" viewBox="0 0 17 12" fill="white">
                <rect x="0" y="8" width="3" height="4" rx="0.5" fillOpacity="0.3"/>
                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5"/>
                <rect x="9" y="3" width="3" height="9" rx="0.5"/>
                <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
              </svg>
              {/* WiFi icon */}
              <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11" fill="white">
                <path d="M7.5 2.5C10.5 2.5 13 3.8 14.5 5.8L13.2 7.1C12 5.5 9.9 4.5 7.5 4.5C5.1 4.5 3 5.5 1.8 7.1L0.5 5.8C2 3.8 4.5 2.5 7.5 2.5Z" fillOpacity="0.3"/>
                <path d="M7.5 5.5C9.5 5.5 11.2 6.4 12.2 7.8L10.9 9.1C10.2 8.1 9 7.5 7.5 7.5C6 7.5 4.8 8.1 4.1 9.1L2.8 7.8C3.8 6.4 5.5 5.5 7.5 5.5Z"/>
                <circle cx="7.5" cy="10" r="1.2"/>
              </svg>
              {/* Battery icon */}
              <div className="flex items-center">
                <div className="relative w-[22px] h-[10px] rounded-[2.5px] border border-white/40 p-[1.5px]">
                  <div className="h-full w-[85%] rounded-[1px] bg-white" />
                </div>
                <div className="w-[1.5px] h-[4px] rounded-r-sm bg-white/40 ml-[0.5px]" />
              </div>
            </div>
          </div>

          {/* notch / dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-1.5 z-30 h-[20px] w-[90px] -translate-x-1/2 rounded-full bg-black flex items-center justify-center gap-2">
            <div className="w-[8px] h-[8px] rounded-full bg-[#1c1c1e] ring-1 ring-[#2a2a2e]" />
            <div className="w-[4px] h-[4px] rounded-full bg-[#0a3d12]" />
          </div>

          {/* screenshot */}
          <div className="relative aspect-[9/19.5] w-full">
            <Image
              src="/assets/demo_photo.png"
              alt="My Bonsai Journal app preview"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* subtle glass highlight */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
          
          {/* home indicator */}
          <div className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full bg-white/30" />
        </div>
      </div>

      {/* reflection/shadow underneath */}
      <div className="mx-auto mt-4 h-4 w-[70%] rounded-full bg-black/15 blur-md transform -skew-x-3" />
    </div>
  )
}

// Feature Card
function FeatureCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-3xl shadow-soft p-6 transition-all duration-300 hover:shadow-card hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
    >
      <div className="mb-4">
        <PillLabel>{title}</PillLabel>
      </div>
      <div className="mb-4 w-12 h-12 rounded-2xl bg-beige-100 flex items-center justify-center text-sage group-hover:bg-sage/10 transition-colors">
        {icon}
      </div>
      <p className="text-charcoal-muted text-sm leading-relaxed mb-4">{description}</p>
      <span className="text-sm font-medium text-sage group-hover:underline">
        Learn more →
      </span>
    </button>
  )
}

// Modal
function Modal({
  isOpen,
  onClose,
  featureKey,
}: {
  isOpen: boolean
  onClose: () => void
  featureKey: FeatureKey | null
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !featureKey) return null

  const content = featureContent[featureKey]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-cream rounded-3xl shadow-modal p-8 animate-scale-in"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-beige-200 transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* Pill title */}
        <div className="mb-6">
          <PillLabel size="lg">{content.title}</PillLabel>
        </div>

        {/* Progress bar (for Garden) */}
        {content.progress && (
          <div className="mb-6">
            <p className="text-sm text-charcoal-muted mb-2">{content.progress.label}</p>
            <ProgressBar progress={content.progress.current} total={content.progress.total} />
          </div>
        )}

        {/* Species preview (for Garden) */}
        {featureKey === 'garden' && (
          <div className="mb-6 flex justify-center gap-3">
            {bonsaiSpecies.map((species) => (
              <div 
                key={species.name}
                className="w-16 h-16 bg-beige-100 rounded-xl p-1 flex items-center justify-center"
                title={`${species.name} - ${species.theme}`}
              >
                <img 
                  src={species.image} 
                  alt={species.name}
                  className="h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {/* Body text */}
        <div className="space-y-4">
          {content.body.map((paragraph, index) => (
            <p
              key={index}
              className={`${index === 0 ? 'text-lg font-medium text-charcoal' : 'text-charcoal-muted'} leading-relaxed`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

// How It Works Step
function HowItWorksStep({
  icon,
  title,
  description,
  step,
}: {
  icon: React.ReactNode
  title: string
  description: string
  step: number
}) {
  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/10 text-sage mb-4">
        {icon}
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-beige-300 rounded-full text-xs font-medium text-charcoal flex items-center justify-center">
          {step}
        </span>
      </div>
      <h3 className="font-display text-xl font-medium text-charcoal mb-2">{title}</h3>
      <p className="text-sm text-charcoal-muted max-w-xs mx-auto">{description}</p>
    </div>
  )
}

// Demo Section
function DemoSection() {
  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Journal input */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-beige-200">
          <div className="mb-4">
            <PillLabel size="sm">Write</PillLabel>
          </div>
          <textarea
            placeholder="Write what's on your mind…"
            className="w-full h-40 p-4 bg-beige-100 rounded-2xl text-charcoal placeholder-charcoal-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-sage/30 text-sm leading-relaxed"
            defaultValue="Today felt overwhelming. I had back-to-back meetings and barely had time to think. But I noticed I handled the pressure better than last month. Maybe the breathing exercises are helping."
          />
        </div>

        {/* AI Insight */}
        <div className="p-8 bg-beige-100/50">
          <div className="mb-4">
            <PillLabel size="sm">AI Insight</PillLabel>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-sage flex-shrink-0" />
              <p className="text-sm text-charcoal-muted">You're recognizing your own growth—that's a sign of building resilience.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-sage flex-shrink-0" />
              <p className="text-sm text-charcoal-muted">Notice how you reframed "overwhelming" into progress. That mental shift is powerful.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-sage flex-shrink-0" />
              <p className="text-sm text-charcoal-muted">Consider protecting 15 minutes of quiet time tomorrow morning.</p>
            </div>
          </div>
          <button className="w-full py-3 px-4 bg-sage text-white text-sm font-medium rounded-full hover:bg-sage-dark transition-colors shadow-soft">
            Generate mantra
          </button>
        </div>
      </div>

      {/* Privacy note */}
      <div className="px-8 py-4 bg-beige-100 border-t border-beige-200">
        <div className="flex items-center justify-center gap-2 text-xs text-charcoal-muted">
          <ShieldIcon className="w-4 h-4 text-sage" />
          <span>Privacy first — your entries are encrypted and never shared</span>
        </div>
      </div>
    </div>
  )
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-beige-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/assets/bonsai.jpeg" 
              alt="My Bonsai Journal logo" 
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="font-display text-lg font-medium text-charcoal">My Bonsai Journal</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-charcoal-muted">
            <a href="/privacy-policy" className="hover:text-charcoal transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-charcoal transition-colors">Terms of Service</a>
            <a href="mailto:jtchitla@mybonsaijournal.com" className="hover:text-charcoal transition-colors">Support</a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-beige-200 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-beige-200 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-beige-200 text-center">
          <p className="text-xs text-charcoal-muted">
            © 2026 My Bonsai Journal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<FeatureKey | null>(null)

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div className="max-w-xl">
              <h1 className="font-display text-5xl md:text-6xl font-medium text-charcoal leading-tight mb-6">
                Your mind, nurtured daily.
              </h1>
              <p className="text-lg text-charcoal-muted leading-relaxed mb-8">
                A quiet space for reflection. Write, discover patterns, grow.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-sage text-white font-medium rounded-full hover:bg-sage-dark transition-colors shadow-soft">
                  Start journaling
                </button>
                <a
                  href="#how-it-works"
                  className="px-8 py-3 pill-gradient text-charcoal font-medium rounded-full hover:shadow-soft transition-all"
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Right: Phone Mockup with Orbiting Bonsai */}
            <div className="flex justify-center lg:justify-end">
              <PhoneMockWithOrbits />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-beige-100/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <PillLabel>How it works</PillLabel>
            <h2 className="font-display text-4xl font-medium text-charcoal mt-4">
              Three simple steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <HowItWorksStep
              step={1}
              icon={<WriteIcon />}
              title="Write"
              description="Spend a few minutes each day writing about your thoughts, feelings, and experiences."
            />
            <HowItWorksStep
              step={2}
              icon={<ReflectIcon />}
              title="Reflect"
              description="AI analyzes your entries and surfaces meaningful insights about your patterns and growth."
            />
            <HowItWorksStep
              step={3}
              icon={<GrowIcon />}
              title="Grow"
              description="Watch your mental garden bloom as you unlock species tied to your personal journey."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-beige-100/50">
        <div className="max-w-4xl mx-auto text-center">
          <PillLabel>Pricing</PillLabel>
          <h2 className="font-display text-4xl font-medium text-charcoal mt-4 mb-4">
            Start free, grow with us
          </h2>
          <p className="text-charcoal-muted mb-8 max-w-lg mx-auto">
            Begin your journey with our free plan. Upgrade when you're ready for deeper insights and physical reminders.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl shadow-soft p-8 text-left">
              <div className="mb-4">
                <PillLabel size="sm">Free</PillLabel>
              </div>
              <div className="mb-6">
                <span className="font-display text-4xl font-medium text-charcoal">$0</span>
                <span className="text-charcoal-muted">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-charcoal-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  Unlimited journal entries
                </li>
                <li className="flex items-center gap-3 text-sm text-charcoal-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  Basic AI insights
                </li>
                <li className="flex items-center gap-3 text-sm text-charcoal-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  10 garden species
                </li>
              </ul>
              <button className="w-full py-3 pill-gradient text-charcoal font-medium rounded-full hover:shadow-soft transition-all">
                Get started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-3xl shadow-card p-8 text-left ring-2 ring-sage/20">
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider text-white bg-sage rounded-full uppercase">
                  Pro
                </span>
              </div>
              <div className="mb-6">
                <span className="font-display text-4xl font-medium text-charcoal">$2.99</span>
                <span className="text-charcoal-muted">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-charcoal-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  Everything in Free
                </li>
                <li className="flex items-center gap-3 text-sm text-charcoal-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  Advanced AI analysis
                </li>
                <li className="flex items-center gap-3 text-sm text-charcoal-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  All 50 garden species
                </li>
                <li className="flex items-center gap-3 text-sm text-charcoal-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  Custom wristband included
                </li>
              </ul>
              <button className="w-full py-3 bg-sage text-white font-medium rounded-full hover:bg-sage-dark transition-colors shadow-soft">
                Start free trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Species Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <PillLabel>Your Garden</PillLabel>
            <h2 className="font-display text-4xl font-medium text-charcoal mt-4">
              Collect species as you grow
            </h2>
            <p className="text-charcoal-muted mt-4 max-w-lg mx-auto">
              Each bonsai represents a mental theme you've worked through. Your garden tells your unique story.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {bonsaiSpecies.map((species, index) => (
              <div 
                key={species.name}
                className="group bg-white rounded-2xl shadow-soft p-4 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-28 flex items-center justify-center mb-3">
                  <img 
                    src={species.image} 
                    alt={species.name}
                    className="h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-charcoal mb-1">{species.name}</h3>
                <span className="text-xs text-sage">{species.theme}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-charcoal-muted mt-8">
            And 45 more species waiting to be unlocked…
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-beige-100/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-charcoal mb-6">
            Begin your journey today
          </h2>
          <p className="text-lg text-charcoal-muted mb-8">
            Join thousands who are nurturing their minds, one entry at a time.
          </p>
          <button className="px-10 py-4 bg-sage text-white text-lg font-medium rounded-full hover:bg-sage-dark transition-colors shadow-soft">
            Start journaling for free
          </button>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        featureKey={activeModal}
      />
    </div>
  )
}

