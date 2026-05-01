import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ROLES } from '../data/roles';
import { OUTCOMES, getOutcomeTier } from '../data/outcomes';
import type { RoleId, Scores, Choice } from '../types/voteflow.types';

interface OutcomeScreenProps {
  role: RoleId;
  choices: Choice[];
  scores: Scores;
  onPlayAgain: () => void;
}

function AnimatedNumber({ target, delay = 0 }: { target: number; delay?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const dur = 1200;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        start = Math.round(eased * target);
        setVal(start);
        if (progress < 1) { ref.current = requestAnimationFrame(animate); }
      };
      ref.current = requestAnimationFrame(animate);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(ref.current); };
  }, [target, delay]);
  return <>{val}</>;
}

function ScoreRing({ value, label, delay, color }: { value: number; label: string; delay: number; color: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div className="flex-1 text-center p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }}>
      <span className="uppercase block mb-3" style={{ fontSize: 11, letterSpacing: '0.06em', color: '#8899AA' }}>{label}</span>
      <div className="relative inline-block">
        <svg width={96} height={96} viewBox="0 0 96 96">
          <circle cx={48} cy={48} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
          <circle cx={48} cy={48} r={r} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ} transform="rotate(-90 48 48)" style={{ transition: `stroke-dashoffset 1.5s ease ${delay}s`, strokeDashoffset: offset }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-bold" style={{ fontSize: 32, color }}>
          <AnimatedNumber target={value} delay={delay * 1000} />
        </span>
      </div>
    </div>
  );
}

export default function OutcomeScreen({ role, choices, scores, onPlayAgain }: OutcomeScreenProps) {
  const roleConfig = ROLES.find((r) => r.id === role)!;
  const tier = getOutcomeTier(scores.trust, scores.speed, scores.accuracy);
  const outcome = OUTCOMES[role][tier];
  const scoreColor = (v: number) => v > 65 ? '#1D9E75' : v > 40 ? '#F39C12' : '#E74C3C';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: '#050D1A' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-[720px] w-full text-center">

        {/* Badge */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${roleConfig.color}1A`, border: `1px solid ${roleConfig.color}4D`, color: roleConfig.color }}>{roleConfig.title}</span>
            <span style={{ fontSize: 13, color: '#8899AA' }}>· Journey Complete</span>
          </div>
          <div className="px-4 py-1.5 rounded-lg border border-success/30 bg-success/5 text-success text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Verified Process Completed
          </div>
        </div>

        {/* Confetti dots */}
        <div className="relative h-4 mb-2">
          {[roleConfig.color, '#F4D03F', '#1ABC9C', '#C0392B'].map((c, i) => (
            <span key={i} className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full" style={{ background: c, animation: `confetti-burst 0.8s ${i * 0.1}s ease-out forwards`, transformOrigin: 'center', marginLeft: `${(i - 1.5) * 12}px` }} />
          ))}
        </div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="font-bold mb-4" style={{ fontSize: 'clamp(28px,5vw,52px)', letterSpacing: '-0.02em' }}>{outcome.title}</motion.h1>

        <p className="mx-auto mb-10" style={{ fontSize: 16, color: '#8899AA', lineHeight: 1.8, maxWidth: 560 }}>{outcome.summary}</p>

        {/* Score rings */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <ScoreRing value={scores.trust} label="Trust" delay={0.3} color={scoreColor(scores.trust)} />
          <ScoreRing value={scores.speed} label="Efficiency" delay={0.6} color={scoreColor(scores.speed)} />
          <ScoreRing value={scores.accuracy} label="Accuracy" delay={0.9} color={scoreColor(scores.accuracy)} />
        </div>

        {/* Journey replay */}
        <div className="text-left mb-12">
          <h2 className="font-bold text-lg mb-4">Your Path</h2>
          {choices.map((ch, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `${roleConfig.color}1A`, color: roleConfig.color }}>{i + 1}</div>
              <span style={{ fontSize: 13, color: '#fff' }}>{ch.stepLabel}</span>
              <span className="ml-auto shrink-0" style={{ fontSize: 11, padding: '2px 10px', borderRadius: 6, background: `${roleConfig.color}1A`, border: `1px solid ${roleConfig.color}4D`, color: roleConfig.color }}>{ch.selected === 'a' ? 'A' : 'B'}</span>
            </div>
          ))}
        </div>

        {/* Share card */}
        <div className="p-8 mb-8 text-center" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A3058 100%)', border: '1px solid rgba(244,208,63,0.3)', borderRadius: 20 }}>
          <span className="block text-sm font-bold mb-4" style={{ color: '#F4D03F' }}>VoteFlow</span>
          <p className="mx-auto mb-6" style={{ fontSize: 16, lineHeight: 1.8, maxWidth: 480 }}>
            I played as <strong>{roleConfig.title}</strong> and ended with the outcome: <strong>{outcome.title}</strong>.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: `${roleConfig.color}1A`, border: `1px solid ${roleConfig.color}4D`, color: roleConfig.color }}>{roleConfig.title}</span>
            <span style={{ fontSize: 13, color: '#8899AA' }}>·</span>
            <span style={{ fontSize: 13, color: '#fff' }}>{outcome.title}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-8 py-3.5 rounded-xl font-bold cursor-pointer" style={{ background: '#F4D03F', color: '#050D1A', border: 'none', fontSize: 14, transition: 'transform 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>Share Result</button>
          <button onClick={onPlayAgain} className="px-8 py-3.5 rounded-xl font-bold cursor-pointer" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 14, transition: 'transform 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>Play another role</button>
        </div>
      </motion.div>
    </div>
  );
}
