"use client";

import Image from 'next/image';
import { Reveal } from '../components/ui';

// ── Svc card — text in normal flow, icon on its own independent layer ──
function SvcCard({
  src,
  alt,
  title,
  body,
  reverse = false,
  side = 'left',
  iconSize = 240,
  iconOffset = 0, // negative = pull icon closer to text (reduces gap)
}: {
  src: string;
  alt: string;
  title: string;
  body: string;
  reverse?: boolean;
  side?: 'left' | 'right';
  iconSize?: number;
  iconOffset?: number;
}) {
  // Icon sits in its own layer, height reserved in flow (so layout doesn't collapse),
  // but the image itself is absolutely positioned inside so size/position can be tuned
  // independently of the text block above/below it.
  const iconLayer = (
    <div style={{
      width: '100%',
      height: 280,
      position: 'relative',
      overflow: 'visible',
    }}>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: iconSize,
        height: iconSize,
        transform: `translate(-50%, calc(-50% + ${reverse ? iconOffset * -1 : iconOffset}px))`,
        filter: 'drop-shadow(0 0 18px rgba(107,200,192,0.35)) drop-shadow(0 0 36px rgba(107,200,192,0.18))',
      }}>
        <Image src={src} alt={alt} fill sizes={`${iconSize}px`} style={{ objectFit: 'contain' }} />
      </div>
    </div>
  );

  const textBlock = (
    <div>
      <h2 style={{
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: 'clamp(1.2rem,2.4vw,1.8rem)',
        fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1,
        color: '#fff', marginBottom: '0.65rem',
      }}>{title}</h2>
      <p style={{
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '0.85rem', lineHeight: 1.85,
        color: 'rgba(255,255,255,0.45)',
      }}>{body}</p>
    </div>
  );

  // Default order is now TEXT then ICON (swapped from before).
  // reverse=true flips it back to ICON then TEXT.
  // Divider line: extends from the card's inner edge across the column gap,
  // landing exactly tangent on the centre line — calculated via the grid gap var.
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        gap: '1.25rem',
      }}>
        {textBlock}
        {iconLayer}
      </div>
      <div style={{
        position: 'absolute',
        bottom: '-2rem',
        height: 2,
        background: '#26242A',
        ...(side === 'left'
          ? { left: 0, right: 'calc(-1 * var(--grid-gap) / 2)' }
          : { right: 0, left: 'calc(-1 * var(--grid-gap) / 2)' }),
      }} />
    </div>
  );
}

// ── Consultation card — full-width, mirrors the old TeamCard treatment ──
function ConsultationCard() {
  return (
    <div style={{
      background: '#26242A',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(107,200,192,0.13)',
      borderRadius: 16,
      padding: 'clamp(2rem,4vw,3rem)',
      boxShadow: '0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(107,200,192,0.07)',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 'clamp(2rem,5vw,4rem)',
      alignItems: 'center',
    }}>
      <div>
        <h2 style={{
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontSize: 'clamp(1.5rem,3vw,2.2rem)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
          color: '#fff', marginBottom: '0.9rem',
        }}>
          Ready to talk to<br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6BC8C0' }}>someone who listens?</em>
        </h2>
        <p style={{
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontSize: '0.85rem', lineHeight: 1.85,
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '48ch',
          marginBottom: '1.75rem',
        }}>
          Whichever practice area applies to your situation, our team is ready to walk you
          through your options clearly, honestly, and without unnecessary delay.
        </p>
        <blockquote style={{ borderLeft: '2px solid rgba(107,200,192,0.4)', paddingLeft: '1rem' }}>
          <p style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.8rem', fontStyle: 'italic', fontWeight: 300,
            lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: '0.6rem',
          }}>
            &ldquo;Professional, responsive, and truly took the time to understand my case.&rdquo;
          </p>
          <cite style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '0.58rem', fontWeight: 700, fontStyle: 'normal',
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6BC8C0',
          }}>
            Mr. Alex Cayoca
          </cite>
        </blockquote>
      </div>

      <div style={{
        width: 'clamp(100px,12vw,160px)',
        height: 'clamp(100px,12vw,160px)',
        flexShrink: 0,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: '-30%',
          background: 'radial-gradient(circle, rgba(107,200,192,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <Image
          src="/NQa New Logo.png"
          alt="NQA Law Firm"
          fill
          sizes="160px"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <section style={{ background: 'transparent', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="teal-glow" style={{ width: 600, height: 600, top: '-180px', left: '50%', transform: 'translateX(-50%)' }} />
      <div className="teal-glow" style={{ width: 320, height: 320, top: '55%', right: '-80px' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

        {/* ── Header — kept as-is ── */}
        <div style={{ padding: 'clamp(3rem,6vw,5rem) 0 clamp(3.5rem,7vw,6rem)', textAlign: 'center' }}>
          <Reveal>
            <h1 style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: 'clamp(1.8rem,4.2vw,3.4rem)',
              fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#fff',
              whiteSpace: 'nowrap',
            }}>
              How we <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6BC8C0' }}>serve you.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '0.875rem', lineHeight: 1.8,
              color: 'rgba(255,255,255,0.35)',
              maxWidth: '60ch', margin: '1.25rem auto 0',
            }}>
              Precise, principled legal work across every area of practice — handled with integrity from the first consultation.
            </p>
          </Reveal>
        </div>

        {/* ── Staggered 2-column cards ── */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(2rem,4vw,4rem)',
          alignItems: 'start',
          paddingBottom: 'clamp(5rem,8vw,7rem)',
          '--grid-gap': 'clamp(2rem,4vw,4rem)',
        } as React.CSSProperties}>

          {/* Centre vertical line connecting all 4 horizontal divider lines */}
          <div className="centre-line" style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: 2,
            background: '#26242A',
            transform: 'translateX(-50%)',
            zIndex: 0,
          }} />

          {/* LEFT COLUMN */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4vw,3rem)' }}>
            <Reveal delay={0.0}>
              <SvcCard
                src="/generals.png" alt="General Law"
                title="General Law"
                body="Comprehensive legal services across a wide range of matters, offering sound advice and practical solutions tailored to each client — individuals, families, or organisations."
                iconSize={360}
                iconOffset={-50}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <SvcCard
                src="/environmentals.png" alt="Environmental Law"
                title="Environmental Law"
                body="Navigating the complex framework of environmental regulation and compliance requirements, handling disputes and supporting projects that balance development with stewardship."
                reverse
              />
            </Reveal>
          </div>

          {/* RIGHT COLUMN — offset down */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2rem,4vw,3rem)',
            paddingTop: 'clamp(0rem,8vw,5rem)',
          }}>
            <Reveal delay={0.04}>
              <SvcCard
                src="/corporates.png" alt="Corporate Law"
                title="Corporate Law"
                body="Full-service corporate counsel across the entire business lifecycle — from company formation and compliance to contract drafting, mergers, and governance."
                side="right"
                iconSize={288}
                iconOffset={-25}
              />
            </Reveal>
            <Reveal delay={0.12}>
              <SvcCard
                src="/legals.png" alt="Legal Training"
                title="Legal Training"
                body="Practical, engaging, and relevant legal training programs for individuals, companies, and institutions — building skills to address legal issues confidently."
                side="right"
                iconOffset={-20}
              />
            </Reveal>
          </div>

        </div>

        {/* ── Consultation card — full-width row below the 2-col grid ── */}
        <div style={{ paddingBottom: 'clamp(4rem,8vw,6rem)' }}>
          <Reveal delay={0.06}>
            <ConsultationCard />
          </Reveal>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .centre-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
