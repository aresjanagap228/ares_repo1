"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '../components/ui';

// ── SVG icons ──
const TrustIcon = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
    <path d="M80 20 L130 42 L130 90 C130 118 80 140 80 140 C80 140 30 118 30 90 L30 42 Z" stroke="#6BC8C0" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M80 35 L115 52 L115 88 C115 108 80 124 80 124 C80 124 45 108 45 88 L45 52 Z" stroke="rgba(107,200,192,0.25)" strokeWidth="1" fill="none" strokeLinejoin="round"/>
    <path d="M60 82 L73 95 L100 65" stroke="#6BC8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MissionIcon = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
    <circle cx="80" cy="80" r="52" stroke="#6BC8C0" strokeWidth="1.5"/>
    <circle cx="80" cy="80" r="38" stroke="rgba(107,200,192,0.2)" strokeWidth="1" strokeDasharray="3 5"/>
    <circle cx="80" cy="80" r="4" fill="#6BC8C0" opacity="0.8"/>
    <path d="M80 76 L86 56 L80 62 L74 56 Z" stroke="#6BC8C0" strokeWidth="1.2" fill="rgba(107,200,192,0.3)" strokeLinejoin="round"/>
    <path d="M80 84 L86 104 L80 98 L74 104 Z" stroke="rgba(107,200,192,0.4)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    <line x1="80" y1="22" x2="80" y2="30" stroke="rgba(107,200,192,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="80" y1="130" x2="80" y2="138" stroke="rgba(107,200,192,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="80" x2="30" y2="80" stroke="rgba(107,200,192,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="130" y1="80" x2="138" y2="80" stroke="rgba(107,200,192,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const VisionIcon = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
    <path d="M20 80 C20 80 45 38 80 38 C115 38 140 80 140 80 C140 80 115 122 80 122 C45 122 20 80 20 80Z" stroke="#6BC8C0" strokeWidth="1.5" fill="none"/>
    <circle cx="80" cy="80" r="22" stroke="#6BC8C0" strokeWidth="1.5"/>
    <circle cx="80" cy="80" r="10" stroke="rgba(107,200,192,0.5)" strokeWidth="1"/>
    <circle cx="80" cy="80" r="3" fill="#6BC8C0" opacity="0.7"/>
    <circle cx="87" cy="74" r="3" fill="rgba(107,200,192,0.35)"/>
  </svg>
);

const TeamIcon = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
    <circle cx="80" cy="52" r="16" stroke="#6BC8C0" strokeWidth="1.5"/>
    <path d="M50 130 C50 108 62 98 80 98 C98 98 110 108 110 130" stroke="#6BC8C0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="38" cy="62" r="12" stroke="rgba(107,200,192,0.55)" strokeWidth="1.2"/>
    <path d="M14 128 C14 110 24 102 38 102 C52 102 62 110 62 128" stroke="rgba(107,200,192,0.55)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <circle cx="122" cy="62" r="12" stroke="rgba(107,200,192,0.55)" strokeWidth="1.2"/>
    <path d="M98 128 C98 110 108 102 122 102 C136 102 146 110 146 128" stroke="rgba(107,200,192,0.55)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
  </svg>
);

// ── Karaoke ──
const LINE1 = 'Serving Negros Island with integrity,';
const LINE2 = 'credibility, and excellence since 2015.';
const ALL_WORDS = [...LINE1.split(' '), ...LINE2.split(' ')];
const L1_COUNT  = LINE1.split(' ').length;

function KaraokeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const total    = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setProg(Math.min(1, Math.max(0, scrolled / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textStart = 0.15;
  const textRange = 0.85;
  const n = ALL_WORDS.length;

  const wordProg = (i: number) => {
    const s = textStart + (i / n) * textRange;
    const e = textStart + ((i + 1.6) / n) * textRange;
    return Math.max(0, Math.min(1, (prog - s) / (e - s)));
  };

  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)',
    fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.35,
    margin: 0, userSelect: 'none',
  };

  const renderLine = (words: string[], offset: number) =>
    words.map((word, j) => {
      const p = wordProg(offset + j);
      return (
        <span key={j} style={{ display: 'inline-block', marginRight: '0.3em', color: `rgba(255,255,255,${(0.13 + 0.87 * p).toFixed(3)})`, transition: 'color 0.1s ease' }}>
          {word}
        </span>
      );
    });

  return (
    <div ref={trackRef} style={{ height: '280vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="teal-glow" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ maxWidth: 1100, width: '100%', padding: '0 clamp(1.5rem,5vw,4rem)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ ...textStyle, marginBottom: '0.12em' }}>{renderLine(ALL_WORDS.slice(0, L1_COUNT), 0)}</p>
          <p style={textStyle}>{renderLine(ALL_WORDS.slice(L1_COUNT), L1_COUNT)}</p>
        </div>
      </div>
    </div>
  );
}

// ── About card — mirrors the floating SvcCard from the old services page ──
function AboutCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  const CIRCLE = 52;
  const HALF   = CIRCLE / 2;

  return (
    <div style={{ position: 'relative', display: 'inline-block', paddingTop: HALF, paddingLeft: HALF }}>
      {/* Circle — tangent to top-left corner */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: CIRCLE, height: CIRCLE,
        borderRadius: '50%',
        background: '#26242A',
        border: '1.5px solid rgba(107,200,192,0.35)',
        zIndex: 5,
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ width: '100%', height: '100%', padding: 10 }}>{icon}</div>
      </div>

      {/* Card */}
      <div style={{
        width: 340,
        background: '#26242A',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(107,200,192,0.13)',
        borderRadius: 16,
        padding: '1.5rem',
        boxShadow: '0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(107,200,192,0.07)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.55rem',
      }}>
        <h2 style={{
          fontSize: '1.05rem', fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.2,
          color: '#fff', margin: 0,
        }}>{title}</h2>
        <p style={{
          fontSize: '0.78rem', lineHeight: 1.8,
          color: 'rgba(255,255,255,0.4)', margin: 0,
        }}>{body}</p>
      </div>
    </div>
  );
}



export default function AboutPage() {
  return (
    <>
      <section style={{ background: 'transparent', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        {/* Glows — matching services page placement */}
        <div className="teal-glow" style={{ width: 600, height: 600, top: '-180px', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="teal-glow" style={{ width: 320, height: 320, top: '55%', right: '-80px' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

          {/* ── Header — identical structure to services ── */}
          <div style={{ padding: 'clamp(3rem,6vw,5rem) 0 clamp(3.5rem,7vw,6rem)', textAlign: 'center' }}>
            <Reveal>
              <h1 style={{
                fontSize: 'clamp(2.4rem,5.5vw,4.5rem)',
                fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#fff',
              }}>
                A firm built on<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6BC8C0' }}>trust.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p style={{
                fontSize: '0.875rem', lineHeight: 1.8,
                color: 'rgba(255,255,255,0.35)',
                maxWidth: '44ch', margin: '1.25rem auto 0',
              }}>
                A general practice rooted in Negros Island, dedicated to preventing disputes
                and protecting what matters most since 2015.
              </p>
            </Reveal>
          </div>

          {/* ── DESKTOP: orbital logo + 4 floating cards ── */}
          <div className="orbital-desktop" style={{
            position: 'relative',
            height: 760,
            marginBottom: '3rem',
          }}>

            {/* z=2: logo */}
            <div style={{
              position: 'absolute',
              top: '44%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 360, height: 360,
              zIndex: 2,
            }}>
              <Image src="/NQa New Logo.png" alt="NQA Law Firm" fill sizes="360px" style={{ objectFit: 'contain' }} priority />
            </div>

            {/* z=3: cards */}
            {/* TOP-LEFT — float duration 6s, no delay */}
            <div style={{ position: 'absolute', top: '3%', left: '3%', zIndex: 3, animation: 'floatY 6s ease-in-out infinite' }}>
              <Reveal delay={0.0}>
                <AboutCard
                  icon={<TrustIcon />}
                  title="Built on trust"
                  body="Founded in 2015 by Atty. Nea Cecille Quiachon, the firm has earned the trust of individuals and organisations through strategic counsel and steadfast advocacy."
                />
              </Reveal>
            </div>

            {/* TOP-RIGHT — float duration 7.5s, delay 1.2s */}
            <div style={{ position: 'absolute', top: '20%', right: '1%', zIndex: 3, animation: 'floatY 7.5s ease-in-out 1.2s infinite' }}>
              <Reveal delay={0.07}>
                <AboutCard
                  icon={<MissionIcon />}
                  title="Our mission"
                  body="To uplift all our clients through noble law and accounting — providing quality service delivery and capacity building that makes a lasting difference."
                />
              </Reveal>
            </div>

            {/* BOTTOM-LEFT — float duration 8.5s, delay 2.5s */}
            <div style={{ position: 'absolute', bottom: '4%', left: '3%', zIndex: 3, animation: 'floatY 8.5s ease-in-out 2.5s infinite' }}>
              <Reveal delay={0.11}>
                <AboutCard
                  icon={<VisionIcon />}
                  title="Leading preventive litigation"
                  body="To be the leading firm in preventive litigation and integrity accounting in the Negros Island Region — anticipating conflict before it arises."
                />
              </Reveal>
            </div>

            {/* BOTTOM-RIGHT — float duration 7s, delay 0.7s */}
            <div style={{ position: 'absolute', bottom: '15%', right: '1%', zIndex: 3, animation: 'floatY 7s ease-in-out 0.7s infinite' }}>
              <Reveal delay={0.15}>
                <AboutCard
                  icon={<TeamIcon />}
                  title="A team you can count on"
                  body="Over 15 corporate clients trust our team — led by Atty. Nea Cecille Quiachon, Atty. Jay-an Ditchella, and Operations Manager Grethel Inayan."
                />
              </Reveal>
            </div>

          </div>

          {/* ── MOBILE ── */}
          <div className="orbital-mobile" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', gap: '2rem', paddingBottom: '3rem' }}>
            <div style={{ position: 'relative', width: 180, height: 180, margin: '0.5rem 0 1.5rem' }}>
              <Image src="/NQa New Logo.png" alt="NQA Law Firm" fill sizes="180px" style={{ objectFit: 'contain' }} priority />
            </div>
            <AboutCard
              icon={<TrustIcon />}
              title="Built on trust"
              body="Founded in 2015 by Atty. Nea Cecille Quiachon, the firm has earned the trust of individuals and organisations through strategic counsel and steadfast advocacy."
            />
            <AboutCard
              icon={<MissionIcon />}
              title="MISSION"
              body="To uplift all our clients through noble law and accounting — providing quality service delivery and capacity building that makes a lasting difference."
            />
            <AboutCard
              icon={<VisionIcon />}
              title="VISION"
              body="To be the leading firm in preventive litigation and integrity accounting in the Negros Island Region — anticipating conflict before it arises."
            />
            <AboutCard
              icon={<TeamIcon />}
              title="A team you can count on"
              body="Over 15 corporate clients trust our team — led by Atty. Nea Cecille Quiachon, Atty. Jay-an Ditchella, and Operations Manager Grethel Inayan."
            />
          </div>

        </div>
      </section>

      <style>{`
        @keyframes floatY {
          0%   { transform: translateY(0px); animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
          25%  { transform: translateY(-14px); animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
          50%  { transform: translateY(-12px); animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
          75%  { transform: translateY(-2px); animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
          100% { transform: translateY(0px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="floatY"] { animation: none !important; }
        }
        @media (max-width: 768px) {
          .orbital-desktop { display: none !important; }
          .orbital-mobile  { display: flex !important; }
        }
      `}</style>

      <KaraokeSection />
    </>
  );
}
