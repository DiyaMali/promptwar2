import { useState } from 'react';
import { motion } from 'framer-motion';
import { ROLES } from '../data/roles';
import { STEP_LABELS } from '../data/stepLabels';
import type { RoleId, Scores, Choice } from '../types/voteflow.types';

interface SimulationPageProps {
  role: RoleId;
  onComplete: (choices: Choice[], scores: Scores) => void;
  onBack: () => void;
}

export default function SimulationPage({ role, onComplete, onBack }: SimulationPageProps) {
  const roleConfig = ROLES.find((r) => r.id === role)!;
  const steps = STEP_LABELS[role];
  const [currentStep, setCurrentStep] = useState(0);
  const [verifiedSteps, setVerifiedSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, string[]>>({});

  const handleStepAction = (index: number) => {
    if (index !== currentStep) return;
    setIsProcessing(true);
    setTimeout(() => {
      const newVerified = [...verifiedSteps];
      newVerified[index] = true;
      setVerifiedSteps(newVerified);
      setIsProcessing(false);
      if (index < steps.length - 1) {
        setCurrentStep(index + 1);
      }
    }, 1500);
  };

  const handleFileUpload = (index: number, files: FileList | null) => {
    if (!files) return;
    const fileNames = Array.from(files).map(f => f.name);
    setUploadedFiles(prev => ({
      ...prev,
      [index]: [...(prev[index] || []), ...fileNames]
    }));
  };

  const allDone = verifiedSteps.every(v => v);

  return (
    <div className="min-h-screen bg-navy-950 text-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(15,23,42,0.8)_0%,rgba(2,6,23,1)_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 px-8 py-6 flex items-center justify-between backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-muted hover:text-white transition-colors cursor-pointer mr-2">← Back</button>
          <span className="text-xl font-bold text-gold-500">Chunav Mitra</span>
          <span className="text-sm font-medium text-muted">/ {roleConfig.title} Process</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Active Election Cycle</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Operational Protocol
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Election Management Process</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">Complete each step of the {roleConfig.id} protocol to ensure a fair and transparent election.</p>
        </header>

        {/* Process Timeline */}
        <div className="relative space-y-3">
          {/* Timeline connector line */}
          <div className="absolute left-[35px] top-0 bottom-0 w-[1px] bg-white/5" />
          
          {steps.map((label, i) => {
            const isCurrent = i === currentStep;
            const isDone = verifiedSteps[i];
            const isLocked = i > currentStep;
            const files = uploadedFiles[i] || [];

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative flex items-start gap-6 p-5 rounded-2xl border transition-all duration-300 ${
                  isCurrent ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_40px_rgba(255,214,0,0.05)]' : 
                  isDone ? 'border-white/10 bg-white/5' : 
                  'border-transparent bg-transparent opacity-40'
                }`}
              >
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                      isDone ? 'bg-green-500 border-green-500 text-navy-950' :
                      isCurrent ? 'bg-gold-500 border-gold-500 text-navy-950' :
                      'bg-navy-950 border-white/20 text-muted'
                    }`}
                  >
                    {isDone ? '✓' : i + 1}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-1">
                    <h3 className={`text-lg font-bold truncate ${isLocked ? 'text-muted' : 'text-white'}`}>{label}</h3>
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                          Verified
                        </span>
                      ) : isCurrent ? (
                        <span className="text-[9px] font-bold text-gold-500 uppercase tracking-widest flex items-center gap-1.5">
                          Active
                        </span>
                      ) : null}
                    </div>
                  </div>
                  
                  <p className="text-muted text-xs leading-relaxed mb-4">
                    {isDone ? 'Step completed and logged.' :
                     isCurrent ? 'Please review and verify to proceed.' :
                     'Pending...'}
                  </p>

                  {(isCurrent || files.length > 0) && (
                    <div className="flex flex-col gap-4">
                      {files.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {files.map((fname, fi) => (
                            <div key={fi} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-muted flex items-center gap-2">
                              <svg className="w-3 h-3 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                              {fname}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {isCurrent && (
                        <div className="flex items-center gap-4">
                          <button 
                            id="next-step-btn"
                            onClick={() => handleStepAction(i)}
                            disabled={isProcessing}
                            className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
                          >
                            {isProcessing ? 'Verifying...' : 'Verify Step'}
                          </button>
                          <label className="text-[10px] text-muted hover:text-white underline decoration-white/20 underline-offset-4 cursor-pointer">
                            Browse Files
                            <input 
                              type="file" 
                              multiple 
                              className="hidden" 
                              onChange={(e) => handleFileUpload(i, e.target.files)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {allDone && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-gold-500 to-yellow-600 text-navy-950 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Process Completed</h2>
            <p className="font-medium mb-8 text-navy-950/80">All election protocols for the {roleConfig.id} role have been successfully verified.</p>
            <button 
              onClick={() => onComplete([], { trust: 100, speed: 100, accuracy: 100 })}
              className="px-10 py-4 rounded-full bg-navy-950 text-white font-bold uppercase tracking-widest hover:scale-105 transition-all cursor-pointer shadow-2xl"
            >
              Finish Cycle
            </button>
          </motion.div>
        )}
      </main>

      <footer className="relative z-10 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-muted uppercase tracking-[0.4em]">Chunav Mitra // Official Election Protocol</p>
      </footer>
    </div>
  );
}
