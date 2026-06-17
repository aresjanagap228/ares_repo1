"use client";

import { useEffect, useState } from 'react';
import { CtaButton } from './components/ui';

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section style={{ position: 'relative', height: 'calc(100svh - 76px)', minHeight: 520, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', background: 'transparent' }}>
      <div className="teal-glow" style={{ width: 520, height: 520, top: '-120px', right: '-80px', animationDelay: '0s' }} />
      <div className="teal-glow" style={{ width: 380, height: 380, bottom: '-60px', left: '-60px', animationDelay: '3s' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(38,36,42,0.96) 0%, transparent 100%)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(2rem,6vw,5rem)', paddingBottom: 'clamp(3rem,8vw,6rem)', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ ...fadeIn(0.1), marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6BC8C0' }}>Law Firm &nbsp;·&nbsp; Since 2015</span>
        </div>
        <div style={{ ...fadeIn(0.2), marginBottom: '2.25rem' }}>
          <h1 style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#fff' }}>
            Nea Quiachon<br />
            <em style={{ color: '#fff', fontStyle: 'italic', fontWeight: 300 }}>&amp; Associates</em>
          </h1>
        </div>
        <div style={{ ...fadeIn(0.4), display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <p style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', marginBottom: '0.5rem' }}>
              Preventing Disputes. <span style={{ color: '#6BC8C0' }}>Protecting Interests.</span>
            </p>
            <p style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
              Integrity · Credibility · Professionalism · Excellence · Client Focus
            </p>
          </div>
          <CtaButton href="/contact">Book a Consultation</CtaButton>
        </div>
      </div>
    </section>
  );
}

function SocialStrip() {
  const socials = [
    { label: 'Facebook', icon: 'f' }, { label: 'Instagram', icon: '◉' },
    { label: 'X/Twitter', icon: '𝕏' }, { label: 'YouTube', icon: '▶' },
    { label: 'TikTok', icon: '♪' }, { label: 'LinkedIn', icon: 'in' },
  ];
  return (
    <div style={{ background: 'transparent', padding: '0.9rem clamp(1.5rem, 5vw, 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 'clamp(1.5rem,5vw,4rem)', right: 'clamp(1.5rem,5vw,4rem)', height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)' }} />
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {socials.map(s => (
          <a key={s.label} href="#" aria-label={s.label}
            style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s, transform 0.25s cubic-bezier(0.16,1,0.3,1)', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6BC8C0'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
          >{s.icon}</a>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
