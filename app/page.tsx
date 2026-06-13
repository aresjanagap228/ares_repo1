"use client";

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',        href: '#hero'        },
  { label: 'About',       href: '#about'       },
  { label: 'Practices',   href: '#practices'   },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Features',    href: '#features'    },
  { label: 'Contact',     href: '#contact'     },
];

const PRACTICES = [
  {
    title: 'General Law',
    body:  'Comprehensive legal services across a wide range of matters, offering sound advice and practical solutions tailored to each client — individuals, families, or organisations.',
  },
  {
    title: 'Corporate Law',
    body:  'Full-service corporate counsel across the entire business lifecycle — from company formation and compliance to contract drafting, mergers, and governance.',
  },
  {
    title: 'Environmental Law',
    body:  'Navigating the complex framework of environmental regulation and compliance requirements, handling disputes and supporting projects that balance development with stewardship.',
  },
  {
    title: 'Legal Training',
    body:  'Practical, engaging, and relevant legal training programs for individuals, companies, and institutions — building skills to address legal issues confidently.',
  },
];

const INITIATIVES = [
  {
    year:     '2019',
    name:     'CER',
    full:     'Corporate Environmental Responsibility',
    body:     'NQa CER promotes environmental accountability for companies — guiding policies that protect ecosystems, minimise waste, and ensure compliance with environmental regulations.',
    accent:   '#286D0A',
    logoSrc:  '/LOGO-A-BLACK.png', // Corrected extension
    logoAlt:  'CER – Corporate Environmental Responsibility',
  },
  {
    year:     '2021',
    name:     'Academy',
    full:     'NQa Academy',
    body:     'The legal learning arm of NQa — training students, individuals, and organisations to understand and apply law in their everyday lives through practical, engaging programs.',
    accent:   '#6BC8C0',
    logoSrc:  '/NQaAcademy_withborder-PNG.png', // Corrected extension
    logoAlt:  'NQa Academy',
  },
  {
    year:     '2024',
    name:     'Consultancy OPC',
    full:     'NQa Consultancy OPC',
    body:     'Expert business and legal advisory services, merging corporate strategy with legal insight to help organisations grow with confidence and clarity.',
    accent:   '#A89C94',
    logoSrc:  '/NQa Consultancy OPC Logo (1).png', // Corrected extension
    logoAlt:  'NQa Consultancy OPC',
  },
];

/* Karaoke sentence — starts from "Preventing disputes..." */
const KARAOKE_WORDS = `Serving clients across Negros Island with integrity, credibility, and excellence since 2015.`.split(' ');

const FEATURES_LIST = [
  'How Consultation Protects Your Business',
  'All About Trademarks',
  'How to Register a Marriage',
  'Employment and Labor Law Essentials',
  'Legal Essentials for Startups',
  "Data Privacy Laws You Can't Ignore",
  'Resolving Workplace Accountability',
];

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES  (injected once)
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --charcoal:   #26242A;
    --teal:       #6BC8C0;
    --warm-gray:  #A89C94;
    --blush:      #F4C2C2;
    --forest:     #286D0A;
    --light-gray: #DAD8D8;
    --off-white:  #F8F7F6;
    --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  }

  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

  body {
    font-family: 'Montserrat', Arial, sans-serif;
    background: var(--off-white);
    color: var(--charcoal);
    overflow-x: hidden;
    line-height: 1.6;
  }

  ::selection { background: #6BC8C0; color: #26242A; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #A89C94; border-radius: 2px; }

  @keyframes scrollLine {
    0%, 100% { opacity: 0.4; transform: scaleY(1);   transform-origin: top; }
    50%       { opacity: 1;   transform: scaleY(0.5); transform-origin: top; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  /* Nav desktop/mobile */
  @media (max-width: 768px) {
    .nav-links-desktop { display: none !important; }
    .hamburger         { display: flex !important; }
  }

  /* Tilt card */
  .tilt-card {
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.45s cubic-bezier(0.16,1,0.3,1),
                background 0.35s ease;
    transform-style: preserve-3d;
    will-change: transform;
  }

  /* Feature row hover */
  .feature-row {
    transition: color 0.2s ease, padding-left 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .feature-row:hover { color: #fff !important; padding-left: 12px !important; }

  /* Initiative row hover */
  .initiative-row {
    transition: background 0.35s ease;
    border-radius: 12px;
  }
  .initiative-row:hover { background: rgba(107,200,192,0.05); }

  /* ── Initiatives Hover Cards (Dark Theme) ── */
  .init-card {
    position: relative;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    height: 360px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: default;
  }
  .init-card:hover {
    border-color: var(--hover-accent, #6BC8C0);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    transform: translateY(-4px);
  }
  .init-default {
    position: absolute;
    inset: 2.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .init-card:hover .init-default {
    opacity: 0;
    transform: translateY(-15px);
    pointer-events: none;
  }
  .init-hover {
    position: absolute;
    inset: 2.2rem;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }
  .init-card:hover .init-hover {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.12) {
  const ref     = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* ─────────────────────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, vis } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TILT CARD  — subtle 3-D mouse-follow tilt
───────────────────────────────────────────────────────────── */
function TiltCard({
  children,
  darkHover = false,
  style = {},
}: {
  children: React.ReactNode;
  darkHover?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.025)`;
    el.style.boxShadow = darkHover
      ? `0 12px 40px rgba(0,0,0,0.35)`
      : `0 8px 30px rgba(38,36,42,0.12)`;
  }, [darkHover]);

  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    el.style.boxShadow = 'none';
  }, []);

  return (
    <div
      ref={ref}
      className="tilt-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   KARAOKE SCROLL SECTION  — ACFS-style full-page color inversion
───────────────────────────────────────────────────────────── */
function KaraokeSection() {
  const trackRef            = useRef<HTMLDivElement>(null);
  const stickyRef           = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [prog,   setProg  ] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current; if (!el) return;
      const rect    = el.getBoundingClientRect();
      const total   = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p        = Math.min(1, scrolled / total);
      const idx      = Math.floor(p * KARAOKE_WORDS.length) - 1;
      setActive(Math.min(idx, KARAOKE_WORDS.length - 1));
      setProg(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Track height: give ~3 scrolls per word for a relaxed pace */
  const trackH = `${Math.ceil(KARAOKE_WORDS.length / 3) * 100}vh`;

  /* Color interpolation */
  const lerp  = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
  const bgR   = lerp(248, 38,  prog);
  const bgG   = lerp(247, 36,  prog);
  const bgB   = lerp(246, 42,  prog);
  const bgStr = `rgb(${bgR},${bgG},${bgB})`;

  /* Active-word color: charcoal → white */
  const activeR   = lerp(38,  255, prog);
  const activeG   = lerp(36,  255, prog);
  const activeB   = lerp(42,  255, prog);
  const activeStr = `rgb(${activeR},${activeG},${activeB})`;

  /* Inactive-word opacity stays low but inverts with bg */
  const dimOpacity   = 0.18;
  const inactiveStr  = prog < 0.5
    ? `rgba(38,36,42,${dimOpacity})`
    : `rgba(255,255,255,${dimOpacity})`;

  return (
    <div
      ref={trackRef}
      style={{ height: trackH, position: 'relative' }}
    >
      {/* ── Sticky viewport-filling panel ── */}
      <div
        ref={stickyRef}
        style={{
          position:   'sticky',
          top:        0,
          height:     '100vh',
          overflow:   'hidden',
          background: bgStr,
        }}
      >
        <div style={{
          position:   'absolute',
          inset:      0,
          background: `radial-gradient(ellipse at 60% 50%, rgba(107,200,192,${prog * 0.07}) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div style={{
          position:              'relative',
          zIndex:                1,
          height:                '100%',
          display:               'flex',
          flexDirection:         'column',
          justifyContent:        'center',
          maxWidth:              1400,
          margin:                '0 auto',
          padding:               '0 clamp(1.5rem, 5vw, 4rem)',
        }}>
          <div style={{
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            paddingLeft:    'clamp(1rem, 2vw, 2rem)',
          }}>
            <p style={{
              fontFamily:    'Montserrat, Arial, sans-serif',
              fontSize:      'clamp(1.6rem, 4.2vw, 3.8rem)',
              fontWeight:    700,
              letterSpacing: '-0.025em',
              lineHeight:    1.15,
            }}>
              {KARAOKE_WORDS.map((word, i) => (
                <span
                  key={i}
                  style={{
                    display:     'inline-block',
                    marginRight: '0.32em',
                    color:       i <= active ? activeStr : inactiveStr,
                    transform:   i === active
                      ? 'scale(1.05) translateY(-3px)'
                      : 'scale(1) translateY(0)',
                    transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                    willChange: 'color, transform',
                  }}
                >
                  {word}
                </span>
              ))}
            </p>

            <div style={{
              marginTop:  '2.5rem',
              display:    'flex',
              alignItems: 'center',
              gap:        '0.65rem',
              opacity:    active < 0 ? 0.55 : 0,
              transition: 'opacity 0.5s ease',
            }}>
              <div style={{
                width:      32,
                height:     1,
                background: 'linear-gradient(to right, #6BC8C0, transparent)',
                animation:  'scrollLine 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily:    'Montserrat, Arial, sans-serif',
                fontSize:      '0.55rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         '#6BC8C0',
              }}>scroll</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav style={{
        position:       'fixed',
        top: 0, left: 0, right: 0,
        zIndex:         100,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        `0 clamp(1.5rem, 5vw, 4rem)`,
        height:         scrolled ? '60px' : '76px',
        background:     scrolled ? 'rgba(38,36,42,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        borderBottom:   scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        transition:     'height 0.4s ease, background 0.4s ease',
      }}>

        <a href="#hero" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <Image
            src="/NQa New Logo.png" // Corrected extension
            alt="NQa Law Firm"
            width={42}
            height={42}
            style={{ display: 'block', objectFit: 'contain' }}
            priority
          />
        </a>

        <ul
          className="nav-links-desktop"
          style={{ display: 'flex', gap: '2.25rem', listStyle: 'none', alignItems: 'center' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  fontFamily:      'Montserrat, Arial, sans-serif',
                  fontSize:        '0.68rem',
                  fontWeight:      600,
                  letterSpacing:   '0.12em',
                  textTransform:   'uppercase',
                  color:           'rgba(255,255,255,0.65)',
                  textDecoration:  'none',
                  transition:      'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#6BC8C0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <TiltCard>
              <a
                href="#contact"
                style={{
                  fontFamily:    'Montserrat, Arial, sans-serif',
                  fontSize:      '0.65rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color:         '#26242A',
                  background:    '#6BC8C0',
                  padding:       '0.65rem 1.5rem',
                  borderRadius:  '100px',
                  textDecoration:'none',
                  display:       'inline-block',
                }}
              >
                Book a Consultation
              </a>
            </TiltCard>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display:  'block', width: 22, height: 1.5,
              background: '#fff',
              transition: 'all 0.3s',
              transform:  menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      <div style={{
        position:      'fixed', inset: 0,
        background:    'rgba(38,36,42,0.97)',
        backdropFilter: 'blur(20px)',
        zIndex:        99,
        display:       'flex', flexDirection: 'column',
        alignItems:    'center', justifyContent: 'center', gap: '2rem',
        opacity:       menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition:    'opacity 0.35s ease',
      }}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily:     'Montserrat, Arial, sans-serif',
              fontSize:       '2rem',
              fontWeight:     700,
              letterSpacing:  '-0.02em',
              color:          '#fff',
              textDecoration: 'none',
              transition:     'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#6BC8C0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                 transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      id="hero"
      style={{
        position:   'relative',
        height:     '100svh',
        minHeight:  600,
        display:    'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow:   'hidden',
        background: '#26242A',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg,#1a1820 0%,#2e2b34 55%,#1e2318 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 68% 38%, rgba(107,200,192,0.09) 0%, transparent 58%)',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
        background: 'linear-gradient(to top, rgba(38,36,42,0.96) 0%, transparent 100%)',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(2rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,8vw,6rem)',
        maxWidth: 1400, margin: '0 auto', width: '100%',
      }}>

        <div style={{ ...fadeIn(0.1), display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', width: 24, height: 1.5, background: '#6BC8C0' }} />
          <span style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#6BC8C0',
          }}>
           since 2015
          </span>
        </div>

        <div style={{ ...fadeIn(0.2), display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.25rem', flexWrap: 'wrap' }}>
         
          <h1 style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize:   'clamp(2.5rem, 7vw, 6.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            color: '#fff',
          }}>
            NQa<br />
            <em style={{ color: '#6BC8C0', fontStyle: 'italic', fontWeight: 300 }}>
              Law Firm
            </em>
          </h1>
        </div>

        <div style={{
          ...fadeIn(0.4),
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          <div>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.65)', marginBottom: '0.5rem',
            }}>
              Preventing Disputes. Protecting Interests.
            </p>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
            }}>
              Integrity · Credibility · Professionalism · Excellence · Client Focus
            </p>
          </div>

          <TiltCard>
            <a
              href="#contact"
              style={{
                fontFamily:    'Montserrat, Arial, sans-serif',
                fontSize:      '0.7rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color:         '#26242A',
                background:    '#6BC8C0',
                padding:       '1rem 2.25rem',
                borderRadius:  '100px',
                textDecoration:'none',
                display:       'inline-block',
              }}
            >
              Book a Consultation
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SOCIAL STRIP
───────────────────────────────────────────────────────────── */
function SocialStrip() {
  const socials = [
    { label: 'Facebook',   icon: 'f'  },
    { label: 'Instagram',  icon: '◉' },
    { label: 'X/Twitter',  icon: '𝕏' },
    { label: 'YouTube',    icon: '▶' },
    { label: 'TikTok',     icon: '♪' },
    { label: 'LinkedIn',   icon: 'in' },
  ];
  return (
    <div style={{
      background: '#26242A',
      padding: '0.85rem clamp(1.5rem, 5vw, 4rem)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <p style={{
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.25)',
      }}>Follow Us</p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {socials.map(s => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none',
              transition: 'color 0.2s, transform 0.25s cubic-bezier(0.16,1,0.3,1)',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#6BC8C0';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ background: '#F8F7F6', padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

        <Reveal>
          <p style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#6BC8C0', marginBottom: '1rem',
          }}>About</p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}>

          <div>
            <Reveal>
              <h2 style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08,
                color: '#26242A', marginBottom: '2.5rem',
              }}>
                A firm built on<br />
                <span style={{ color: '#6BC8C0' }}>trust</span>,<br />
                not transactions.
              </h2>
            </Reveal>

            {/* NQa Law Firm main logo in About section */}
            <Reveal delay={0.1}>
              <div style={{ width: 140, height: 140, marginBottom: '2rem' }}>
                <Image
                  src="/NQa New Logo.png" // Corrected extension
                  alt="NQa Law Firm"
                  width={140}
                  height={140}
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { t: 'Mission', b: 'To uplift all our clients and stakeholders through noble Law and Accounting, providing quality service delivery and capacity building.' },
                  { t: 'Vision',  b: 'To be the leading firm in preventive litigation and integrity accounting in the Negros Island Region.' },
                ].map(({ t, b }) => (
                  <div key={t}>
                    <p style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: '#6BC8C0', marginBottom: '0.4rem',
                    }}>{t}</p>
                    <p style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '0.875rem', lineHeight: 1.75, color: '#A89C94',
                    }}>{b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1}>
              <p style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                lineHeight: 1.85, color: '#26242A', marginBottom: '1.5rem',
              }}>
                Founded in 2015, NQa Law Firm is a dynamic general practice dedicated to delivering exceptional legal services with professionalism, responsiveness, and integrity. Led by Senior Partner Atty. Nea Cecille Quiachon and Partner Atty. Jay-an Ditchella, the firm has earned the trust of individuals and organisations alike through strategic counsel, clear guidance, and steadfast advocacy.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                lineHeight: 1.85, color: '#A89C94', marginBottom: '2.5rem',
              }}>
                With over 15 corporate clients, the firm continues extensive experience in litigation, legal research, and corporate advisory. Operations and Finance Manager Grethel Inayan ensures seamless service delivery and quality client support.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <blockquote style={{
                padding: '1.5rem 0 1.5rem 1.5rem',
                borderLeft: '2px solid #6BC8C0',
              }}>
                <p style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: '1rem', fontStyle: 'italic', fontWeight: 300,
                  lineHeight: 1.75, color: '#26242A', marginBottom: '0.9rem',
                }}>
                  "NQa Law Firm provided exceptional legal service from start to finish. Their team was professional, responsive, and truly took the time to understand my case."
                </p>
                <cite style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: '0.65rem', fontWeight: 600, fontStyle: 'normal',
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A89C94',
                }}>
                  — Mr. Alex Cayoca
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRACTICES
───────────────────────────────────────────────────────────── */
function Practices() {
  return (
    <section id="practices" style={{ background: '#26242A', padding: 'clamp(5rem,10vw,9rem) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem) 0' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem', marginBottom: 'clamp(3rem,6vw,5rem)',
        }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: 'clamp(2rem,4vw,3.2rem)',
              fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: '#fff',
            }}>
              How we<br /><span style={{ color: '#6BC8C0' }}>serve you.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.85rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.38)',
              maxWidth: '44ch',
            }}>
              We ensure every case is handled with precision, integrity, and care.
            </p>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRight: 'none', borderBottom: 'none',
        }}>
          {PRACTICES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <TiltCard
                darkHover
                style={{
                  padding: 'clamp(1.75rem,3.5vw,2.5rem)',
                  borderRight:  '1px solid rgba(255,255,255,0.08)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  background:   'transparent',
                  cursor:       'default',
                  height:       '100%',
                }}
              >
                <p style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#6BC8C0', marginBottom: '1rem',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: 'clamp(1.05rem,2vw,1.25rem)',
                  fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2,
                  color: '#fff', marginBottom: '0.85rem',
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)',
                }}>{p.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   INITIATIVES
   — Re-designed to emulate the grid card hover interactions
   — Dark theme matching Practices section
───────────────────────────────────────────────────────────── */
function Initiatives() {
  return (
    <section id="initiatives" style={{ background: '#26242A', padding: 'clamp(5rem,10vw,9rem) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

        <Reveal>
          <p style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#6BC8C0', marginBottom: '1rem',
          }}>Initiatives</p>
        </Reveal>

        <Reveal>
          <h2 style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08,
            color: '#fff', marginBottom: 'clamp(1rem,3vw,2rem)',
          }}>
            Beyond law —<br />
            a commitment to <span style={{ color: '#6BC8C0' }}>impact.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)',
            maxWidth: '55ch', marginBottom: 'clamp(3rem,6vw,5rem)',
          }}>
            Three key initiatives extend NQa's impact beyond traditional legal services — reflecting the firm's commitment to professional excellence, education, and environmental stewardship.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {INITIATIVES.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.1}>
              <div
                className="init-card"
                style={{ '--hover-accent': item.accent } as React.CSSProperties}
              >
                {/* ── Default State ── */}
                <div className="init-default">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.35)',
                    }}>
                      {item.year}
                    </span>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 6
                    }}>
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        width={32}
                        height={32}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      color: '#fff',
                      marginBottom: '0.5rem',
                    }}>
                      {item.full}
                    </h3>
                    <p style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.5,
                    }}>
                      {item.name} Initiative
                    </p>
                  </div>
                </div>

                {/* ── Hover State ── */}
                <div className="init-hover">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 6,
                      flexShrink: 0,
                    }}>
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        width={28}
                        height={28}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <h3 style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      color: '#fff',
                    }}>
                      {item.full}
                    </h3>
                  </div>
                  <p style={{
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontSize: '0.875rem',
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.45)',
                  }}>
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURES TEASER
───────────────────────────────────────────────────────────── */
function FeaturesTease() {
  return (
    <section id="features" style={{ background: '#26242A', padding: 'clamp(5rem,10vw,9rem) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem) 0' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem', marginBottom: 'clamp(3rem,6vw,4rem)',
        }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: 'clamp(2rem,4vw,3.2rem)',
              fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: '#fff',
            }}>
              Know your<br /><span style={{ color: '#6BC8C0' }}>rights.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#"
              style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#6BC8C0', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                transition: 'gap 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.gap = '0.9rem')}
              onMouseLeave={e => (e.currentTarget.style.gap = '0.5rem')}
            >
              View all topics
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </Reveal>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {FEATURES_LIST.map((t, i) => (
            <Reveal key={t} delay={i * 0.04}>
              <a
                href="#"
                className="feature-row"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.2rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: 'clamp(0.85rem,1.4vw,1rem)',
                  fontWeight: 400,
                }}
              >
                <span>{t}</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
                  <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER / CONTACT
───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact">
      <div style={{
        background: '#26242A',
        padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)',
        textAlign: 'center',
      }}>
        <Reveal>
          <p style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#6BC8C0', marginBottom: '1.5rem',
          }}>Get in Touch</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: 'clamp(2.2rem,5vw,4.5rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: '#fff', marginBottom: '2.75rem',
          }}>
            Let's protect<br />
            <em style={{ color: '#6BC8C0', fontStyle: 'italic', fontWeight: 300 }}>
              your interests.
            </em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <TiltCard style={{ display: 'inline-block' }}>
            <a
              href="mailto:nqalawfirm@gmail.com"
              style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#26242A', background: '#6BC8C0',
                padding: '1.1rem 2.75rem',
                borderRadius: '100px', textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Book a Consultation
            </a>
          </TiltCard>
        </Reveal>
      </div>

      <div style={{
        background: '#F8F7F6',
        borderTop: '1px solid rgba(38,36,42,0.08)',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
        }}>
          {/* Brand block with NQa Law Firm logo */}
          <div>
            <div style={{ width: 72, height: 72, marginBottom: '1rem' }}>
              <Image
                src="/NQa New Logo.png" // Corrected extension
                alt="NQa Law Firm"
                width={72}
                height={72}
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.9rem', fontWeight: 600, color: '#26242A', marginBottom: '0.3rem',
            }}>Nea Quiachon &amp; Associates</p>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.75rem', fontStyle: 'italic', fontWeight: 300, color: '#A89C94',
            }}>Preventing Disputes. Protecting Interests.</p>
          </div>

          <div>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#A89C94', marginBottom: '1rem',
            }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '0.85rem', color: '#26242A', textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'inline-block',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#6BC8C0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#26242A')}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#A89C94', marginBottom: '1rem',
            }}>Contact</p>
            {[
              { l: 'Phone',  v: '(034) 432-0585'        },
              { l: 'Mobile', v: '+63 945 007 4610'       },
              { l: 'Email',  v: 'nqalawfirm@gmail.com'  },
            ].map(({ l, v }) => (
              <div key={l} style={{ marginBottom: '0.85rem' }}>
                <p style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#A89C94', marginBottom: '0.15rem',
                }}>{l}</p>
                <p style={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontSize: '0.875rem', color: '#26242A',
                }}>{v}</p>
              </div>
            ))}
          </div>

          <div>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#A89C94', marginBottom: '1rem',
            }}>Address</p>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.875rem', lineHeight: 1.85, color: '#26242A',
            }}>
              Doors No. 31 and 34, BL (3rd Flr, Land Tower of Sanders Lauren),<br />
              1st Lacson St., Bacolod City, Negros Occidental,<br />
              Philippines 6100
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(38,36,42,0.08)',
          padding: '1.4rem clamp(1.5rem,5vw,4rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem',
          maxWidth: 1200, margin: '0 auto',
        }}>
          <p style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.7rem', color: '#A89C94',
          }}>
            © {new Date().getFullYear()} Nea Quiachon &amp; Associates Law Firm. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(168,156,148,0.5)',
          }}>
            Integrity · Credibility · Professionalism · Excellence · Client Focus
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <style precedence="default" href="nqa-global-styles">
        {GLOBAL_CSS}
      </style>

      <Navbar />

      <main>
        <Hero />
        <SocialStrip />
        <About />
        <KaraokeSection />
        <Practices />
        <Initiatives />
        <FeaturesTease />
      </main>

      <Footer />
    </>
  );
}