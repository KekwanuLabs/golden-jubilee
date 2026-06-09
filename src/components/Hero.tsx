import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, UserRound } from 'lucide-react';

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number;
}
interface HeroProps {
  onScrollToEvent: () => void;
}

function useCountdown(targetDate: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const compute = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000)  / 60_000),
        seconds: Math.floor((diff % 60_000)      / 1_000),
      });
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center bg-white/70 border border-[#d4af37]/50 rounded-xl px-3 py-2.5 md:px-4 md:py-3 min-w-[60px] md:min-w-[76px] shadow-sm">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="font-heading font-bold text-xl md:text-3xl text-[#7a5c00] leading-none"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="font-sans text-xs uppercase tracking-[0.15em] text-[#8b6914] mt-1">{label}</div>
    </div>
  );
}

function CouplePhoto() {
  const [src, setSrc] = useState('/images/couple.jpg');
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (src === '/images/couple.jpg') {
      setSrc('/images/couple-placeholder.svg');
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="relative flex-shrink-0">
      {/* Outer glow ring — pulsing */}
      <div
        className="absolute -inset-5 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, rgba(184,150,12,0.1) 50%, transparent 70%)',
          animation: 'bokeh-float 6s ease-in-out infinite',
          '--bokeh-op': '1',
        } as React.CSSProperties}
      />

      {/* Gold corner ornaments */}
      {[
        'top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl',
        'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl',
        'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl',
        'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl',
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-8 h-8 border-[#d4af37] ${cls} z-20 pointer-events-none`}
        />
      ))}

      {/* Main photo frame */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: 'clamp(220px, 72vw, 380px)',
          aspectRatio: '3 / 4',
          border: '2px solid rgba(212,175,55,0.6)',
          boxShadow: '0 8px 40px rgba(139,105,20,0.25), 0 2px 8px rgba(139,105,20,0.1)',
        }}
      >
        {!failed ? (
          <img
            src={src}
            alt="Chief Engr & Lolo Cosmas U. Onwuneme"
            className="w-full h-full object-cover object-center"
            onError={handleError}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-4"
            style={{ background: 'linear-gradient(160deg, #fdf0cc 0%, #f5e3a8 50%, #ede0a0 100%)' }}
          >
            <UserRound className="w-14 h-14 text-[#b8960c]/30" />
            <p className="font-heading text-[#8b6914] text-xs font-bold uppercase tracking-wider text-center px-6">
              Add photo at public/images/couple.jpg
            </p>
          </div>
        )}

        {/* Subtle inner vignette */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1)' }}
        />
      </div>

      {/* 50 Years badge overlapping bottom of photo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, type: 'spring', stiffness: 180 }}
        className="absolute -bottom-5 -left-5 z-30"
      >
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-400/60"
          style={{ animation: 'pulse-ring-expand 2.4s ease-out infinite' }} />
        <div className="absolute inset-0 rounded-full border-2 border-amber-400/40"
          style={{ animation: 'pulse-ring-expand 2.4s ease-out 1.2s infinite' }} />

        <div
          className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #3d2800 0%, #1a1000 60%, #0d0800 100%)',
            border: '3px solid #d4af37',
            boxShadow: '0 0 0 5px rgba(212,175,55,0.18), 0 0 25px rgba(212,175,55,0.35), 0 6px 24px rgba(0,0,0,0.4)',
          }}
        >
          <span className="font-heading font-black leading-none"
            style={{ color: '#ffe082', fontSize: '1.85rem', textShadow: '0 0 12px rgba(255,224,82,0.8)' }}>
            50
          </span>
          <span className="font-sans text-[#d4af37]/80 text-[8px] tracking-widest uppercase mt-0.5">Years</span>
        </div>
      </motion.div>

      {/* Tagline ribbon overlapping right side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-30"
      >
        <div
          className="px-3 py-6 rounded-lg text-center"
          style={{
            background: 'linear-gradient(180deg, #1a1000 0%, #3d2800 100%)',
            border: '1px solid rgba(212,175,55,0.4)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          <span className="font-heading text-[#d4af37] text-[9px] uppercase tracking-[0.3em] font-bold">
            God's Faithfulness · Love · Grace
          </span>
        </div>
      </motion.div>
    </div>
  );
}

const FLOATERS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.4) % 90}%`,
  bottom: `${5 + (i * 6.8) % 55}%`,
  size: 2 + (i % 4),
  duration: 4 + (i % 6),
  delay: (i * 0.5) % 6,
}));

const BOKEH_ORBS = [
  { left: '6%',  top: '18%', size: 90,  op: 0.055, dur: 10, delay: 0   },
  { left: '78%', top: '12%', size: 70,  op: 0.065, dur: 12, delay: 2   },
  { left: '42%', top: '62%', size: 110, op: 0.04,  dur: 14, delay: 1   },
  { left: '87%', top: '52%', size: 75,  op: 0.06,  dur: 11, delay: 3.5 },
  { left: '18%', top: '73%', size: 55,  op: 0.07,  dur: 9,  delay: 5   },
  { left: '62%', top: '82%', size: 65,  op: 0.05,  dur: 13, delay: 1.5 },
  { left: '3%',  top: '48%', size: 48,  op: 0.07,  dur: 11, delay: 4   },
  { left: '52%', top: '8%',  size: 60,  op: 0.055, dur: 10, delay: 2.5 },
];

export default function Hero({ onScrollToEvent }: HeroProps) {
  const target = useMemo(() => new Date('2026-12-29T08:00:00'), []);
  const timeLeft = useCountdown(target);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(150deg, #fef6e3 0%, #fdf0cc 45%, #fef6e3 75%, #fdf4dc 100%)' }}
    >
      {/* Parchment glow blobs */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 20% 30%, rgba(212,175,55,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(184,150,12,0.08) 0%, transparent 55%)`,
        }}
      />

      {/* Bokeh orbs — large blurred gold spheres */}
      {BOKEH_ORBS.map((b, i) => (
        <div
          key={`bokeh-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: b.left, top: b.top,
            width: b.size, height: b.size,
            background: 'radial-gradient(circle, #ffe082 0%, #d4af37 40%, transparent 70%)',
            filter: `blur(${Math.round(b.size * 0.28)}px)`,
            '--bokeh-op': b.op,
            opacity: b.op,
            animation: `bokeh-float ${b.dur}s ${b.delay}s ease-in-out infinite`,
          } as React.CSSProperties}
        />
      ))}

      {/* Floating sparkles */}
      {FLOATERS.map(f => (
        <span key={f.id} className="sparkle opacity-40"
          style={{ left: f.left, bottom: f.bottom, width: f.size, height: f.size,
            '--duration': `${f.duration}s`, '--delay': `${f.delay}s` } as React.CSSProperties}
        />
      ))}

      {/* Corner ornaments */}
      <div className="absolute top-5 left-5 text-[#d4af37]/25 text-5xl font-serif select-none pointer-events-none leading-none">❧</div>
      <div className="absolute top-5 right-5 text-[#d4af37]/25 text-5xl font-serif select-none pointer-events-none leading-none" style={{ transform: 'scaleX(-1)' }}>❧</div>
      <div className="absolute bottom-14 left-5 text-[#d4af37]/15 text-4xl font-serif select-none pointer-events-none leading-none">✿</div>
      <div className="absolute bottom-14 right-5 text-[#d4af37]/15 text-4xl font-serif select-none pointer-events-none leading-none">✿</div>

      {/* Top & bottom gold lines — animated shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[4px]"
        style={{
          background: 'linear-gradient(to right, transparent, #8b6914 10%, #d4af37 25%, #fff8c0 50%, #d4af37 75%, #8b6914 90%, transparent)',
          backgroundSize: '300% 100%',
          animation: 'shimmer 3s linear infinite',
          boxShadow: '0 0 10px rgba(212,175,55,0.5)',
        }} />
      <div className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(to right, transparent, #8b6914 10%, #d4af37 25%, #fff8c0 50%, #d4af37 75%, #8b6914 90%, transparent)',
          backgroundSize: '300% 100%',
          animation: 'shimmer 3s linear infinite reverse',
          boxShadow: '0 0 8px rgba(212,175,55,0.4)',
        }} />

      {/* ─── Two-column layout ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-16 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">

        {/* LEFT: Couple photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <CouplePhoto />
        </motion.div>

        {/* RIGHT: Text content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            className="font-serif italic text-[#8b6914] text-base md:text-lg mb-1">
            You are joyfully invited to
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
            className="font-heading text-[#5c4500] text-sm md:text-base tracking-[0.25em] uppercase mb-2">
            Our Parents'
          </motion.p>

          {/* Script title */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.9, ease: 'easeOut' }}>
            <h1 className="font-display leading-none select-none" style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              color: '#c9920c',
              textShadow: '0 0 50px rgba(212,175,55,0.55), 0 0 100px rgba(212,175,55,0.25), 0 3px 6px rgba(80,40,0,0.35)',
            }}>
              Golden
            </h1>
            <h1 className="font-display leading-none -mt-3 md:-mt-5 select-none" style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              color: '#c9920c',
              textShadow: '0 0 50px rgba(212,175,55,0.55), 0 0 100px rgba(212,175,55,0.25), 0 3px 6px rgba(80,40,0,0.35)',
            }}>
              Jubilee
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }}
            className="font-heading text-[#5c4500] text-sm md:text-lg tracking-[0.22em] uppercase mt-2 mb-5">
            Celebration
          </motion.p>

          {/* Ornament divider */}
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center gap-3 mb-4 w-full max-w-xs md:mr-auto md:ml-0 mx-auto">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #d4af37)' }} />
            <span className="text-[#d4af37] text-base tracking-widest">❧ ❖ ❧</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #d4af37)' }} />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 0.6 }}
            className="font-serif italic text-[#8b6914] text-base md:text-lg mb-1">
            Honoring
          </motion.p>

          <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.7 }}
            className="font-heading font-bold text-[#2d1f00] text-lg md:text-2xl lg:text-3xl tracking-wide mb-1">
            Chief Engr &amp; Lolo Cosmas U. Onwuneme
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: 0.6 }}
            className="font-sans text-[#7a5c00] text-sm md:text-base tracking-[0.1em] uppercase mb-6">
            Tuesday, 29th December 2026 · Umuago Urualla, Imo State
          </motion.p>

          {/* Countdown */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.7 }}
            className="flex gap-2 md:gap-3 mb-7">
            <CountdownBox value={timeLeft.days}    label="Days"    />
            <CountdownBox value={timeLeft.hours}   label="Hours"   />
            <CountdownBox value={timeLeft.minutes} label="Minutes" />
            <CountdownBox value={timeLeft.seconds} label="Seconds" />
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3">
            <button onClick={onScrollToEvent} className="btn-gold px-7 py-3.5 rounded text-sm cursor-pointer">
              View Event Details
            </button>
            <a href="#guestbook" className="btn-outline-gold px-7 py-3.5 rounded text-sm text-center cursor-pointer">
              RSVP Now
            </a>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={onScrollToEvent}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#b8960c]/60">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5 text-[#b8960c]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
