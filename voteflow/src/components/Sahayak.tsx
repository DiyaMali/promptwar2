import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESOURCES_DATA } from '../data/resourcesData';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: { label: string; action: () => void }[];
}

interface MitraProps {
  currentScreen: string;
  selectedRole: string | null;
  onNavigate: (screen: any) => void;
  onSelectRole: (role: any) => void;
}

export default function Mitra({ currentScreen, onNavigate, onSelectRole }: Omit<MitraProps, 'selectedRole'>) {
  const [position, setPosition] = useState({ x: window.innerWidth - 150, y: window.innerHeight - 150 });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to add messages
  const addMessage = useCallback((text: string, sender: 'bot' | 'user', options?: any[]) => {
    const newMessage: Message = { id: Date.now().toString(), text, sender, options };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Helper for bot responses with typing animation
  const handleBotResponse = useCallback((text: string, options?: any[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, 'bot', options);
    }, 1000);
  }, [addMessage]);

  // Initial greeting - ONLY ONCE
  useEffect(() => {
    if (!hasGreeted && isOpen) {
      handleBotResponse("Hi! I'm Mitra 👋 How can I help you today?", [
        { label: "Start guided tour", action: () => handleUserAction("Start guided tour") },
        { label: "Explore a role", action: () => handleUserAction("Explore a role") },
        { label: "Check voting steps", action: () => handleUserAction("Check voting steps") },
        { label: "Open resources", action: () => handleUserAction("Open resources") },
      ]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted, handleBotResponse]);

  // Contextual check when screen changes (but only if already in conversation)
  useEffect(() => {
    if (hasGreeted && currentScreen === 'simulation' && messages.length > 0 && messages[messages.length-1].text.indexOf('simulation') === -1) {
      handleBotResponse(`I see you've started the simulation! What's our next move?`, [
        { label: "Start registration", action: () => handleUserAction("Start registration") },
        { label: "Check documents", action: () => handleUserAction("Check documents") },
      ]);
    }
  }, [currentScreen, hasGreeted]);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const moveToElement = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      setPosition({ 
        x: rect.left + rect.width / 2 - 40, 
        y: rect.top - 100 
      });
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('mitra-glow');
      setTimeout(() => el.classList.remove('mitra-glow'), 4000);
    }
  }, []);

  const handleUserAction = (choice: string) => {
    addMessage(choice, 'user');
    const input = choice.toLowerCase();
    
    // Knowledge Base Search
    const relevantResource = RESOURCES_DATA.find(r => 
      input.includes(r.title.toLowerCase()) || 
      r.content.sections.some(s => input.includes(s.heading.toLowerCase()) || input.includes(s.text.toLowerCase()))
    );

    if (relevantResource) {
      const summary = relevantResource.content.sections[0].text;
      handleBotResponse(`I found some information on that! ${summary}`, [
        { label: "Read Full Guide", action: () => { onNavigate('resources'); setIsOpen(false); } },
        { label: "Check More Docs", action: () => handleUserAction("Open resources") }
      ]);
      return;
    }

    if (input.includes("tour")) {
      handleBotResponse("Great! Let's start with the basics. First, you'll need to select a role. Should I show you where?", [
        { label: "Yes, show me", action: () => { moveToElement('role-section'); handleBotResponse("Choose one of these 4 roles to begin."); } },
        { label: "I'll find it", action: () => handleBotResponse("Perfect! Let me know when you've picked one.") }
      ]);
    } else if (input.includes("role")) {
      handleBotResponse("Each role offers a unique perspective. Which one would you like to explore?", [
        { label: "Voter", action: () => { onSelectRole('voter'); handleBotResponse("Voter selected! Next, you should check your registration."); } },
        { label: "Candidate", action: () => { onSelectRole('candidate'); handleBotResponse("Candidate selected! Time to prepare your manifesto."); } },
        { label: "See All", action: () => { onNavigate('landing'); moveToElement('role-section'); } }
      ]);
    } else if (input.includes("step") || input.includes("voting")) {
      handleBotResponse("The voting process has 7 key verification steps. Do you want to start the simulation to see them?", [
        { label: "Start Simulation", action: () => { onNavigate('simulation'); setIsOpen(false); } },
        { label: "Tell me more", action: () => handleBotResponse("It covers everything from ID upload to ballot casting. Ready to try?") }
      ]);
    } else if (input.includes("resource")) {
      handleBotResponse("Our resources include everything from voting laws to digital toolkits. Ready to dive in?", [
        { label: "Open Resources", action: () => onNavigate('resources') },
        { label: "See Legislature", action: () => onNavigate('legislature') }
      ]);
    } else if (input.includes("registration") || input.includes("documents")) {
      handleBotResponse("For registration, you'll need a valid Digital ID. Would you like to upload one now?", [
        { label: "Start Registration", action: () => onNavigate('simulation') },
        { label: "Back to Roles", action: () => onNavigate('landing') }
      ]);
    } else {
      handleBotResponse("I'm here to help you navigate democracy. What's our next step?", [
        { label: "Guided Tour", action: () => handleUserAction("Start guided tour") },
        { label: "Check Roles", action: () => handleUserAction("Explore a role") }
      ]);
    }
  };

  return (
    <>
      <style>{`
        .mitra-glow {
          box-shadow: 0 0 30px rgba(255, 214, 0, 0.4) !important;
          border: 2px solid #FFD600 !important;
          transition: all 0.5s ease;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {/* Mitra Robot Character */}
        <motion.div
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 40, damping: 12 }}
          className="absolute pointer-events-auto cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Robot Head */}
            <div className="w-20 h-16 bg-[#0A1628] rounded-[24px] border-2 border-gold-500 shadow-2xl flex flex-col items-center justify-center gap-2 overflow-hidden">
              <div className="flex gap-2.5">
                <div className="w-2.5 h-2.5 bg-gold-500 rounded-full animate-pulse" />
                <div className="w-2.5 h-2.5 bg-gold-500 rounded-full animate-pulse" />
              </div>
              {/* Smiling LED Mouth */}
              <div className="w-8 h-3 flex items-center justify-center mt-1">
                <svg width="24" height="10" viewBox="0 0 24 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path 
                    d="M2 2C6 7 18 7 22 2" 
                    stroke="#FFD600" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    animate={{ d: ["M2 2C6 7 18 7 22 2", "M2 3C6 8 18 8 22 3", "M2 2C6 7 18 7 22 2"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>
            {/* Robot Body */}
            <div className="w-14 h-12 bg-[#0A1628] border-2 border-gold-500 rounded-b-2xl -mt-1 shadow-xl relative flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border border-gold-500/30 flex items-center justify-center">
                <div className="w-2 h-2 bg-gold-500/50 rounded-full" />
              </div>
              <div className="absolute -left-4 top-2 w-4 h-6 bg-gold-500/10 border border-gold-500/30 rounded-full" />
              <div className="absolute -right-4 top-2 w-4 h-6 bg-gold-500/10 border border-gold-500/30 rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Chat Interface */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
              className="absolute bottom-32 right-12 w-[400px] h-[75vh] bg-[#0D1B2D] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)] overflow-hidden pointer-events-auto backdrop-blur-2xl flex flex-col"
            >
              {/* Chat Header */}
              <div className="bg-gold-500/10 p-7 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-black font-black text-sm shadow-[0_0_20px_rgba(255,214,0,0.3)]">M</div>
                  <div>
                    <div className="text-base font-bold text-white tracking-tight">Mitra Assistant</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Active Session</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Chat Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
                {messages.length === 0 && !isTyping && (
                  <div className="h-full flex items-center justify-center text-muted text-xs uppercase tracking-widest font-bold opacity-30">
                    Initializing conversation...
                  </div>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} gap-4`}>
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-[13px] leading-relaxed shadow-xl ${
                      msg.sender === 'user' 
                        ? 'bg-gold-500 text-black font-bold rounded-tr-sm' 
                        : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-sm backdrop-blur-md'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.sender === 'bot' && msg.options && (
                      <div className="flex flex-wrap gap-3 w-full">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={opt.action}
                            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-gold-500 hover:text-black transition-all text-[11px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md active:scale-95"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-5 rounded-[2rem] flex gap-2 shadow-lg border border-white/5">
                      <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-7 bg-navy-950/50 border-t border-white/5 shrink-0">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Type your question..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        handleUserAction(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-gold-500/50 transition-all placeholder:text-white/20"
                  />
                  <button className="w-14 h-14 rounded-2xl bg-gold-500 text-black flex items-center justify-center hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,214,0,0.3)] active:scale-95">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
