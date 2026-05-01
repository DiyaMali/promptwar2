import { motion } from 'framer-motion';

const BILLS = [
  { id: 'H.R. 4022', status: 'In Committee', title: 'Digital Privacy Rights Act', desc: 'Establishing a comprehensive federal framework for data protection, consume...', impact: 80, momentum: 'HIGH', hearing: 'OCT 12' },
  { id: 'S. 119', status: 'Floor Vote', title: 'Renewable Energy Infrastructure Initiative', desc: 'A multi-billion dollar allocation for the modernization of the national power grid...', impact: 40, momentum: 'LOW', hearing: 'TODAY' },
  { id: 'H.R. 882', status: 'In Drafting', title: 'Universal Civic Education Act', desc: 'Mandating digital literacy and civic responsibility modules within high school...', impact: 90, momentum: 'STEADY', hearing: 'NOV 05' },
];

export default function LegislaturePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#050D1A] text-white font-['Inter',sans-serif]">
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-72 min-h-screen border-r border-white/5 bg-[#0A1628]/50 p-8 hidden lg:block sticky top-0">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-white uppercase tracking-widest mb-8 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-12">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-500/30">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-bold">Simulation Lead</div>
              <div className="text-[10px] text-muted uppercase tracking-widest font-bold">Voter Persona · Active</div>
            </div>
          </div>

          <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-6">Legislative Tracking</div>
          <nav className="space-y-4 mb-12">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold uppercase tracking-widest cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Current Bills
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-muted hover:text-white text-xs font-bold uppercase tracking-widest cursor-pointer transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              My Representatives
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-muted hover:text-white text-xs font-bold uppercase tracking-widest cursor-pointer transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Voting History
            </div>
          </nav>

          <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-6">Simulation Steps</div>
          <nav className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted hover:text-white cursor-pointer transition-all">
              <div className="w-5 h-5 flex items-center justify-center border border-white/10 rounded">1</div>
              Registration
            </div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted hover:text-white cursor-pointer transition-all">
              <div className="w-5 h-5 flex items-center justify-center border border-white/10 rounded">2</div>
              Primaries
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          <div className="flex flex-col xl:flex-row gap-12">
            <div className="flex-1">
              <header className="mb-12">
                <h1 className="text-5xl font-bold mb-4 tracking-tight">Active Bills</h1>
                <p className="text-muted text-lg leading-relaxed max-w-2xl">Monitor the lifecycle of proposed legislation. Track progression from committee review to final floor votes in real-time simulation.</p>
              </header>

              <div className="space-y-6">
                {BILLS.map((bill, i) => (
                  <motion.div 
                    key={bill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2rem] border border-white/10 bg-white/5 flex flex-col md:flex-row items-center gap-8 group hover:border-gold-500/20 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">{bill.id}</span>
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">{bill.status}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-gold-500 transition-colors">{bill.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-6">{bill.desc}</p>
                      <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          Momentum: <span className="text-white">{bill.momentum}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          Hearing: <span className="text-white">{bill.hearing}</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-gold-500/30 transition-all">
                      <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1 z-10">Impact Score</div>
                      <div className="text-4xl font-bold text-gold-500 z-10">{bill.impact}</div>
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="50" fill="none" stroke="rgba(255,214,0,0.1)" strokeWidth="6" />
                        <circle cx="64" cy="64" r="50" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="314" strokeDashoffset={314 - (314 * bill.impact) / 100} className="text-gold-500" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="w-full xl:w-96 space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl rounded-full" />
                <div className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-8">Representative Spotlight</div>
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold-500/50 p-1">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Sen. Aruna Singh" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-2xl font-bold mb-1 tracking-tight">Sen. Aruna Singh</h3>
                <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-8">District 12 | Majority Leader</p>
                
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Affiliation</span>
                    <span className="text-sm font-bold">Reform Party</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Focus</span>
                    <span className="text-sm font-bold">Tech Regulation</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Approval</span>
                    <span className="text-sm font-bold text-green-400">72%</span>
                  </div>
                </div>

                <button className="mt-8 w-full py-4 rounded-2xl bg-gold-500 text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">Contact Representative</button>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-left">
                <div className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-8 text-center">Recent Voting Record</div>
                <div className="space-y-4">
                  {[
                    { title: 'Infrastructure Expansion', vote: 'AYE', date: '2 days ago', success: true },
                    { title: 'Trade Tariff Revision', vote: 'NAY', date: '5 days ago', success: false },
                    { title: 'Public Health Funding', vote: 'AYE', date: '1 week ago', success: true },
                  ].map((rec, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition-all cursor-pointer">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rec.success ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {rec.success ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold group-hover:text-white transition-colors">{rec.title}</div>
                        <div className="text-[10px] font-bold text-muted uppercase tracking-widest">Vote: <span className={rec.success ? 'text-green-500' : 'text-red-500'}>{rec.vote}</span> | {rec.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <footer className="mt-20 pt-12 border-t border-white/5 text-center">
            <div className="text-2xl font-bold text-gold-500 mb-2">Chunav Mitra</div>
            <div className="text-[10px] text-muted uppercase tracking-widest">© 2024 Chunav Mitra. All rights reserved.</div>
          </footer>
        </main>
      </div>
    </div>
  );
}
