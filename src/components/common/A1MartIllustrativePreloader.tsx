// A1MartIllustrativePreloader.tsx
// ─────────────────────────────────────────────────────────────────────────────
// "Spotlight Launch" Preloader v2 — improved animations + light mode
//
// ✦ Dark mode  : deep-dark radial bg, vivid orange glow & arcs, white text
// ✦ Light mode : warm cream bg, soft orange+purple accents, purple text
//
// New in v2:
//   • Floating sparkle particles that drift upward
//   • Linear fill progress bar (0→100% over full duration)
//   • Smoother logo entrance with spring overshoot
//   • Arc/dash rings fade in after logo settles
//   • Dot wave-bounce idle animation
//   • Status text cross-fades per message step
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const MESSAGES = [
  'Booting A1-MART ERP…',
  'Syncing Inventory & POS…',
  'Preparing Dashboards…',
  'Almost Ready!',
];

// Floating sparkle particles config
const PARTICLES = [
  { id: 0, x: '12%',  size: '5px',  dur: '3.2s', delay: '0s',    color: '#FF6600' },
  { id: 1, x: '25%',  size: '4px',  dur: '4.1s', delay: '0.6s',  color: '#7950F2' },
  { id: 2, x: '38%',  size: '6px',  dur: '3.6s', delay: '1.0s',  color: '#FFB347' },
  { id: 3, x: '52%',  size: '4px',  dur: '4.8s', delay: '0.3s',  color: '#FF6600' },
  { id: 4, x: '64%',  size: '5px',  dur: '3.4s', delay: '1.4s',  color: '#A855F7' },
  { id: 5, x: '76%',  size: '4px',  dur: '4.2s', delay: '0.8s',  color: '#FF6600' },
  { id: 6, x: '88%',  size: '6px',  dur: '3.8s', delay: '0.2s',  color: '#7950F2' },
  { id: 7, x: '6%',   size: '3px',  dur: '5.0s', delay: '1.8s',  color: '#FFB347' },
];

export default function A1MartIllustrativePreloader({
  onComplete,
  minDuration = 3200,
}: PreloaderProps) {
  const [visible,  setVisible]  = useState(true);
  const [exiting,  setExiting]  = useState(false);
  const [msgIdx,   setMsgIdx]   = useState(0);
  const [dotStep,  setDotStep]  = useState(0);

  /* ── Step message every quarter of the duration ── */
  useEffect(() => {
    const step = minDuration / MESSAGES.length;
    const timers = MESSAGES.map((_, i) =>
      i === 0 ? null : setTimeout(() => setMsgIdx(i), step * i)
    );
    return () => timers.forEach(t => t && clearTimeout(t));
  }, [minDuration]);

  /* ── Progress dots wave: 0-4, cycling (calm, steady rhythm) ── */
  useEffect(() => {
    const id = setInterval(() => setDotStep(d => (d + 1) % 5), 480);
    return () => clearInterval(id);
  }, []);

  /* ── Fade-out after minDuration ── */
  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;
    const startTime = Date.now();

    const complete = () => {
      const wait = Math.max(0, minDuration - (Date.now() - startTime));
      const hold = setTimeout(() => {
        setExiting(true);
        fadeTimer = setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 650);
      }, wait);
      return () => clearTimeout(hold);
    };

    let cleanup: (() => void) | undefined;
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      cleanup = complete();
    } else {
      const onLoad = () => { cleanup = complete(); };
      window.addEventListener('load', onLoad);
      return () => {
        window.removeEventListener('load', onLoad);
        cleanup?.();
        clearTimeout(fadeTimer);
      };
    }
    return () => { cleanup?.(); clearTimeout(fadeTimer); };
  }, [minDuration, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`splx-root ${exiting ? 'splx-exit' : 'splx-enter'}`}
      role="status"
      aria-live="polite"
      aria-label="Loading A1-MART Enterprise ERP"
    >
      {/* ── Floating sparkle particles ── */}
      <div className="splx-particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="splx-particle"
            style={{
              '--p-x':     p.x,
              '--p-size':  p.size,
              '--p-dur':   p.dur,
              '--p-delay': p.delay,
              '--p-color': p.color,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Orange radial spotlight ── */}
      <div className="splx-spotlight" aria-hidden="true" />

      {/* ── Logo centrepiece ── */}
      <div className="splx-logo-wrap">
        <img
          src="/a1mart_logo.png"
          alt="A1-MART — Daily Savings Daily Discount"
          className="splx-logo-img"
          draggable={false}
        />
        <div className="splx-logo-sheen" aria-hidden="true" />
      </div>

      {/* ── Linear fill progress bar ── */}
      <div className="splx-progress-wrap" aria-hidden="true">
        <div className="splx-progress-fill" />
      </div>

      {/* ── 4-dot wave indicator ── */}
      <div className="splx-dots" aria-hidden="true">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`splx-dot${dotStep > i ? ' splx-dot-active' : ''}`}
          />
        ))}
      </div>

      {/* ── Dynamic status text (re-mounts each step for re-animation) ── */}
      <p className="splx-status" key={msgIdx}>
        {MESSAGES[msgIdx]}
      </p>

      {/* ── Credit ── */}
      <span className="splx-credit">A1-MART Enterprise ERP v2.5</span>
    </div>
  );
}
