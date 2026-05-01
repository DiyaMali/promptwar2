import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050D1A] text-white font-['Inter',sans-serif] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/night_crowd.png" 
          className="w-full h-full object-cover opacity-30 blur-sm"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050D1A] via-[#050D1A]/90 to-gold-500/10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)]"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-black text-gold-500 mb-2 tracking-tighter"
          >
            Chunav Mitra
          </motion.div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-10">Secure Verification Portal</div>
          <h2 className="text-3xl font-bold mb-3 tracking-tight">Access Dashboard</h2>
          <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">Sign in to your account to access the official simulation environment and civic resources.</p>
        </div>

        <div className="space-y-6">
          {/* Social Sign In */}
          <button 
            onClick={handleGoogleSignIn}
            className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/90 transition-all cursor-pointer shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="relative py-4 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">or sign in with email</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-gold-500/50 transition-all placeholder:text-white/20"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-gold-500/50 transition-all placeholder:text-white/20"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isVerifying}
              className="w-full py-4 mt-4 rounded-2xl bg-gold-500 text-black font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 cursor-pointer shadow-[0_10px_20px_rgba(255,214,0,0.2)]"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Sign In...
                </div>
              ) : 'Sign In with Email'}
            </button>
          </form>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[11px] text-muted font-medium leading-relaxed">
            Don't have an account? <span className="text-gold-500 cursor-pointer font-bold ml-1">Request Access</span>
          </p>
        </div>
      </motion.div>

      {/* Floating Security Badge */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 opacity-30">
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gold-500">Security Verified</div>
          <div className="text-xs font-mono">AUTH-LEVEL-HIGH</div>
        </div>
        <svg className="w-10 h-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    </div>
  );
}
