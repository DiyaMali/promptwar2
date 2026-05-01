import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Icon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'bolt': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'users': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case 'clock': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'trending': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
    case 'arrow-right': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
    case 'book': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'shield': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'support': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    default: return null;
  }
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{displayValue}</span>;
};

export default function RushPredictorPage({ onBack }: { onBack: () => void }) {
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold-500 selection:text-black font-['Inter',sans-serif] overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/20 to-black" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar (Internal) */}
      <nav className="relative z-10 px-8 py-6 flex items-center justify-between backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-muted hover:text-white transition-colors cursor-pointer">← Back</button>
          <span className="text-xl font-bold text-gold-500">Chunav Mitra Rush Predictor</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-muted">
          <span className="text-gold-500">Live Simulation</span>
          <span>Data Insights</span>
          <span>AI Prediction</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Alert Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 p-5 rounded-2xl border border-gold-500/30 bg-gold-500/5 backdrop-blur-xl flex items-center gap-4 overflow-hidden group shadow-[0_0_30px_rgba(255,214,0,0.05)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent animate-pulse" />
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-500">
            <Icon name="bolt" className="w-6 h-6" />
          </div>
          <p className="text-sm md:text-base font-medium leading-relaxed">
            <span className="text-gold-500 font-bold uppercase tracking-wider mr-2">Vibrant Fact:</span>
            Most voters require more than 60 seconds to vote, though the specific types accepted vary widely by jurisdiction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Visual / Hero Card */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group"
            >
              <img 
                src="/assets/night_crowd.png" 
                alt="Polling Station Crowd"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,214,0,0.1)_0%,transparent_70%)]" />
              
              <div className="absolute bottom-0 left-0 p-10 max-w-2xl">
                <h2 className="text-4xl font-bold mb-4 tracking-tight">The Morning Rush</h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  You arrive at the polling station at 7:45am. The line stretches around the block and a poll worker tells you wait is over 3 hours. Your shift starts at 11am.
                </p>
              </div>
            </motion.div>

            {/* Metrics Pills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Current Queue', val: 120, suffix: ' people', icon: 'users', color: '#FFD600' },
                { label: 'Est. Wait Time', val: 165, suffix: ' min', icon: 'clock', color: '#FFD600' },
                { label: 'Rush Level', val: 88, suffix: '%', icon: 'trending', color: '#ef4444' }
              ].map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3 mb-3 text-muted">
                    <Icon name={m.icon} className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{m.label}</span>
                  </div>
                  <div className="text-2xl font-bold flex items-baseline gap-1" style={{ color: m.color }}>
                    <AnimatedNumber value={m.val} />
                    <span className="text-xs font-medium text-white/40">{m.suffix}</span>
                  </div>
                  <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.val > 100 ? 100 : m.val}%` }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'wait', title: 'Wait in line and be late', desc: 'Stay committed to voting even if it means missing work.', tag: 'CIVIC PRIORITY' },
                { id: 'leave', title: 'Leave and try later', desc: 'Return during your lunch break and hope the line is shorter.', tag: 'TIME OPTIMIZED' }
              ].map((opt, i) => (
                <motion.div
                  key={opt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedDecision(opt.id)}
                  className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                    selectedDecision === opt.id ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      selectedDecision === opt.id ? 'border-gold-500 text-gold-500' : 'border-white/20 text-muted'
                    }`}>
                      {opt.tag}
                    </span>
                    {selectedDecision === opt.id && <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{opt.title}</h4>
                  <p className="text-muted text-sm leading-relaxed mb-8">{opt.desc}</p>
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-black transition-colors">
                      <Icon name="arrow-right" className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar / AI Recommendation */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 to-transparent backdrop-blur-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gold-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,214,0,0.4)]">
                  <span className="font-bold text-xs">AI</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight">Recommendation</h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-8">
                Based on current trends, the best time to visit this polling station is between <span className="text-gold-500 font-bold underline decoration-gold-500/30 underline-offset-4">1:30 PM – 3:00 PM</span> when voter density drops by <span className="text-gold-500 font-bold">~45%</span>.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Predicted Crowd Trend</span>
                </div>
                <div className="h-24 w-full flex items-end gap-1.5 px-2 pb-2 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden group">
                  <img 
                    src="/assets/rush_predictor.png" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity group-hover:opacity-40"
                    alt="Crowd Graph Backdrop"
                  />
                  {[20, 35, 60, 90, 80, 40, 20, 30, 55, 75, 45, 30, 25].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                      className={`flex-1 rounded-t-sm transition-colors relative z-10 ${i >= 6 && i <= 8 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : i < 4 ? 'bg-gold-500/50' : 'bg-red-500/50'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[8px] text-muted font-bold uppercase tracking-tighter px-1">
                  <span>7am</span>
                  <span>11am</span>
                  <span>2pm</span>
                  <span>6pm</span>
                </div>
              </div>
            </motion.div>

            {/* Smart Time Slots */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <h4 className="text-sm font-bold mb-6 tracking-widest uppercase text-muted">Best Times to Vote</h4>
              <div className="space-y-4">
                {[
                  { time: '7–9 AM', label: 'High', color: '#ef4444' },
                  { time: '10–12 PM', label: 'Medium', color: '#F4D03F' },
                  { time: '1–3 PM', label: 'Low', color: '#22c55e', highlight: true },
                  { time: '4–6 PM', label: 'Medium', color: '#F4D03F' }
                ].map((slot, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${slot.highlight ? 'border-green-500/30 bg-green-500/5' : 'border-transparent hover:bg-white/5'}`}>
                    <span className="text-sm font-medium">{slot.time}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: slot.color }} />
                      <span className="text-[10px] font-bold uppercase" style={{ color: slot.color }}>{slot.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Bottom */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'book', title: 'Historical Context', desc: 'How queue management has evolved over decades of election cycles.' },
            { icon: 'shield', title: 'Legal Rights', desc: 'Know your rights regarding time off work for voting in your jurisdiction.' },
            { icon: 'support', title: 'Voter Support', desc: 'Access resources for accessibility and assistance at your polling booth.' }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-white/20 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold-500 mb-6">
                <Icon name={card.icon} className="w-6 h-6" />
              </div>
              <h5 className="text-lg font-bold mb-3">{card.title}</h5>
              <p className="text-muted text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-muted uppercase tracking-[0.4em]">VoteFlow // Rush Prediction Matrix</p>
      </footer>
    </div>
  );
}
