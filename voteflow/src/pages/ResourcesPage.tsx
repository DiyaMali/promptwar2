import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESOURCES_DATA, type Resource } from '../data/resourcesData';

const CATEGORIES = ['All Resources', 'Voting Rights', 'Election Law', 'Media Literacy', 'Local Government'];

export default function ResourcesPage({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES_DATA.filter(r => {
    const matchesCategory = activeCategory === 'All Resources' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = RESOURCES_DATA[0];

  const handleDownload = (title: string) => {
    alert(`Downloading ${title} as PDF...`);
  };

  return (
    <div className="min-h-screen bg-[#050D1A] text-white font-['Inter',sans-serif]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen border-r border-white/5 bg-[#0A1628]/50 p-8 hidden lg:block sticky top-0">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-white uppercase tracking-widest mb-8 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-12">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <div className="text-sm font-bold">Simulation Lead</div>
              <div className="text-[10px] text-muted uppercase tracking-widest font-bold">Voter Persona · Active</div>
            </div>
          </div>

          <nav className="space-y-6">
            {['Registration', 'Primaries', 'General Election', 'Ballot Casting', 'Tabulation', 'Certification'].map((step, i) => (
              <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted hover:text-white cursor-pointer transition-colors group">
                <div className="w-5 h-5 flex items-center justify-center border border-white/10 rounded group-hover:border-gold-500/50 group-hover:text-gold-500">{i + 1}</div>
                {step}
              </div>
            ))}
          </nav>

          <button className="mt-20 w-full py-4 rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-muted hover:bg-white/10 hover:text-white transition-all">
            Reset Simulation
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-4 tracking-tight">Chunav Mitra Resources</h1>
              <p className="text-muted leading-relaxed">Deep-dive guides and factual toolkits designed to empower your simulation journey and real-world civic literacy.</p>
            </div>
            <div className="relative w-full md:w-96 group">
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold-500/50 transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-gold-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </header>

          {/* Featured Hero */}
          <section className="relative rounded-3xl overflow-hidden border border-white/10 mb-16 bg-[#0A1628]">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative aspect-video lg:aspect-auto">
                <img 
                  src="/assets/capitol_dome.png" 
                  alt="Capitol"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A1628]/50 to-[#0A1628]" />
              </div>
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 text-[10px] font-bold uppercase tracking-widest border border-gold-500/20">{featured.type}</span>
                  <span className="text-[10px] text-muted font-bold uppercase tracking-widest">{featured.readTime} read</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight leading-tight">{featured.title}</h2>
                <p className="text-muted leading-relaxed mb-10 text-lg">{featured.description}</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedResource(featured)}
                    className="px-8 py-4 rounded-full bg-gold-500 text-black font-bold text-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    Read Guide
                  </button>
                  <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">Save for Later</button>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  activeCategory === cat ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_20px_rgba(255,214,0,0.2)]' : 'bg-white/5 border-white/10 text-muted hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredResources.map((r, i) => (
              <motion.div 
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-gold-500/30 transition-all relative overflow-hidden flex flex-col"
              >
                {/* Card Image Backdrop */}
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <img 
                    src={`https://images.unsplash.com/photo-${['1505664194779-8beaceb93744', '1591115765373-5ae39e23cda5', '1450133064473-71024230f91b'][i]}?auto=format&fit=crop&q=80&w=400`} 
                    alt={r.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold-500 border border-white/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 text-muted">{r.type}</span>
                </div>
                <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2">{r.category}</div>
                <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-gold-500 transition-colors">{r.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-8">{r.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{r.readTime} read</span>
                  <button 
                    onClick={() => setSelectedResource(r)}
                    className="text-xs font-bold text-gold-500 flex items-center gap-2 group/btn"
                  >
                    View Docs
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <section className="relative mt-24 p-12 lg:p-20 rounded-[3rem] overflow-hidden border border-white/10 text-center group">
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
              <img 
                src="/assets/civic_resources_bg.png" 
                alt="Civic Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A] via-transparent to-[#050D1A]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Missing something?</h2>
              <p className="text-muted max-w-2xl mx-auto mb-10 text-lg leading-relaxed">Our research team is constantly updating the Chunav Mitra library. Request a resource or contribute your own civic guide to our community repository.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="px-10 py-4 rounded-full bg-gold-500 text-black font-bold text-sm hover:scale-105 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,214,0,0.2)]">Request Topic</button>
                <button className="px-10 py-4 rounded-full border border-white/10 bg-white/5 font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">Submit Resource</button>
              </div>
            </div>
          </section>

          <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 pb-12">
              <div className="text-left">
                <div className="text-2xl font-bold text-gold-500 mb-2">Chunav Mitra</div>
                <div className="text-[10px] text-muted uppercase tracking-widest">© 2024 Chunav Mitra Civic Education. All rights reserved.</div>
              </div>
            <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              <a href="#" className="hover:text-white">Methodology</a>
              <a href="#" className="hover:text-white">Credits</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </footer>
        </main>
      </div>

      {/* Content Modal */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-[#050D1A]/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0D1B2D] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 lg:p-12 border-b border-white/5 flex items-center justify-between shrink-0">
                <div>
                  <div className="text-gold-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{selectedResource.category}</div>
                  <h3 className="text-3xl font-bold tracking-tight">{selectedResource.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedResource(null)}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
                {selectedResource.content.sections.map((section, i) => (
                  <div key={i} className="max-w-2xl">
                    <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{section.heading}</h4>
                    <p className="text-muted leading-relaxed text-lg">{section.text}</p>
                  </div>
                ))}
              </div>
              <div className="p-8 lg:p-12 border-t border-white/5 bg-navy-950/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-muted uppercase tracking-widest">{selectedResource.readTime} read time</span>
                  <button 
                    onClick={() => handleDownload(selectedResource.title)}
                    className="flex items-center gap-2 text-[10px] font-black text-gold-500 uppercase tracking-widest px-4 py-2 rounded-lg bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500 hover:text-black transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download PDF
                  </button>
                </div>
                <button 
                  onClick={() => setSelectedResource(null)}
                  className="px-10 py-4 rounded-full bg-gold-500 text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Close Docs
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
