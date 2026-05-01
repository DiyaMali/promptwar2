import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ROLES } from '../data/roles';
import type { RoleId } from '../types/voteflow.types';

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({
        d: String(d).padStart(2, '0'),
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0')
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const Icon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'voter': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    case 'candidate': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
    case 'officer': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'journalist': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h0M7 12h8M7 16h8" /></svg>;
    case 'role': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'decision': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    case 'law': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
    default: return null;
  }
};

interface LandingPageProps {
  onSelectRole: (role: RoleId) => void;
  onOpenRushPredictor: () => void;
  onOpenResources: () => void;
  onOpenLegislature: () => void;
}

export default function LandingPage({ onSelectRole, onOpenRushPredictor, onOpenResources, onOpenLegislature }: LandingPageProps) {
  const nextElection = new Date('2026-11-03T00:00:00');
  const cd = useCountdown(nextElection);
  const [hoveredRole, setHoveredRole] = useState<RoleId | null>(null);

  const roleThemes: Record<RoleId, { color: string, tag: string, btn: string }> = {
    voter: { color: 'var(--color-voter)', tag: '7 DECISIONS', btn: 'SELECT VOTER ROLE' },
    candidate: { color: 'var(--color-candidate)', tag: 'CAMPAIGN MODE', btn: 'SELECT CANDIDATE ROLE' },
    officer: { color: 'var(--color-officer)', tag: 'CRITICAL OPS', btn: 'SELECT OFFICER ROLE' },
    journalist: { color: 'var(--color-journalist)', tag: 'TRUTH SEEKING', btn: 'SELECT JOURNALIST ROLE' },
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white font-['Inter',sans-serif] selection:bg-gold-500 selection:text-navy-950">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(15,23,42,0.8)_0%,rgba(2,6,23,1)_100%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,rgba(20,184,166,0.15)_0%,transparent_50%)]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between backdrop-blur-xl border-b border-white/5 bg-navy-950/50">
        <div className="flex items-center gap-12">
          <span className="text-2xl font-bold tracking-tight text-gold-500">Chunav Mitra</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); onOpenRushPredictor(); }}>Rush Predictor</a>
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); onOpenResources(); }}>Resources</a>
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); onOpenLegislature(); }}>Legislature</a>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-3 shadow-[0_0_20px_rgba(255,214,0,0.1)]">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Election Countdown</span>
            <span className="font-mono text-xs text-gold-500">{cd.d}D {cd.h}H {cd.m}M {cd.s}S</span>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <header className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Layer 1: Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/indian_parliament.png" 
            alt="Indian Parliament"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Layer 2: Dark Overlay Layer */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)'
          }}
        />

        {/* Layer 3: Content Layer (Text) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 max-w-7xl mx-auto px-8 w-full"
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-gold-500" />
              <span className="text-[11px] font-black text-gold-500 tracking-[0.4em] uppercase">Civic Education Simulation</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
              Experience democracy <br />
              <span className="text-gold-500">from every angle.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mb-12 font-medium">
              Step into the shoes of voters, candidates, and election officials. 
              Navigate the complex protocols and real-world stakes of a modern election cycle.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              {[
                { icon: '👤', label: '4 Unique Roles' },
                { icon: '📍', label: '28 Decision Points' },
                { icon: '⚖️', label: 'Real Civic Law' }
              ].map((pill, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <span className="text-sm">{pill.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/90">{pill.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button className="px-12 py-5 rounded-full bg-gold-500 text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,214,0,0.3)] cursor-pointer">
                Launch Simulation
              </button>
              <button className="px-12 py-5 rounded-full bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md cursor-pointer">
                View Methodology
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">Scroll to Explore</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent" />
        </div>
      </header>

      {/* Role Cards Grid */}
      <section id="role-section" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROLES.map((role, i) => {
            const theme = roleThemes[role.id];
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => onSelectRole(role.id)}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-2xl" />
                <div 
                  className="relative h-full p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/20 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  style={{ 
                    boxShadow: hoveredRole === role.id ? `0 10px 40px ${theme.color}15` : 'none',
                    borderColor: hoveredRole === role.id ? `${theme.color}44` : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div 
                      className="p-4 rounded-2xl bg-navy-950/50 border border-white/10"
                      style={{ color: theme.color }}
                    >
                      <Icon name={role.id} className="w-8 h-8" />
                    </div>
                    <span 
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full border"
                      style={{ color: theme.color, borderColor: `${theme.color}33`, backgroundColor: `${theme.color}0a` }}
                    >
                      {theme.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4">{role.title}</h3>
                  <p className="text-muted text-lg mb-10 leading-relaxed">
                    {role.description}
                  </p>
                  
                  <button 
                    className="w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300"
                    style={{ 
                      backgroundColor: hoveredRole === role.id ? theme.color : 'rgba(255,255,255,0.05)',
                      color: hoveredRole === role.id ? '#fff' : 'rgba(255,255,255,0.6)',
                      boxShadow: hoveredRole === role.id ? `0 10px 20px ${theme.color}33` : 'none'
                    }}
                  >
                    {theme.btn}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-navy-900/50 py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-20 tracking-tight">How the Simulation Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connector lines (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-white/5" />
            
            {[
              { num: '01', title: 'Pick your role', desc: 'Select one of four civic actors', active: true },
              { num: '02', title: 'Make decisions', desc: 'Based on laws and ethics', active: false },
              { num: '03', title: 'See the outcome', desc: 'Watch impact of decisions', active: false }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div 
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold mb-8 border-2 transition-all duration-500 ${
                    step.active ? 'border-gold-500 bg-gold-500 text-navy-950 shadow-[0_0_30px_rgba(255,214,0,0.3)]' : 'border-white/10 bg-white/5 text-muted'
                  }`}
                >
                  {step.num}
                </div>
                <h4 className={`text-xl font-bold mb-3 ${step.active ? 'text-white' : 'text-muted'}`}>{step.title}</h4>
                <p className="text-muted max-w-[200px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
            <div>
              <div className="text-2xl font-bold text-gold-500 mb-4">Chunav Mitra</div>
              <div className="text-[11px] text-muted uppercase tracking-[0.3em]">© 2024 Chunav Mitra. Empowering voters through technology.</div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 text-sm font-medium">
              <a href="#" className="text-muted hover:text-white transition-colors">Methodology</a>
              <a href="#" className="text-muted hover:text-white transition-colors">Credits</a>
              <a href="#" className="text-muted hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          
          <div className="flex justify-end pt-8 border-t border-white/5">
            <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">Built with Google Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
