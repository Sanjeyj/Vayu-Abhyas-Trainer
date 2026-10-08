import React from 'react';
import { useStore } from '../../store/useStore';
import { Shield, Sparkles, Wifi, WifiOff } from 'lucide-react';

export const Header: React.FC = () => {
  const isOfflineMode = useStore((s) => s.isOfflineMode);
  const setOfflineMode = useStore((s) => s.setOfflineMode);
  const startJudgeDemo = useStore((s) => s.startJudgeDemo);
  const setView = useStore((s) => s.setView);

  return (
    <header className="w-full bg-[#0A0F1D]/95 backdrop-blur-md border-b border-sky-800/60 px-4 py-2.5 flex items-center justify-between font-tactical text-xs text-slate-100 sticky top-0 z-30">
      {/* Brand & Logo */}
      <div 
        onClick={() => setView('landing')} 
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/40 group-hover:border-cyan-400">
          <Shield className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-wider text-slate-100 font-mono">VAYU ABHYAS</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
              PS 26247
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono">MINISTRY OF DEFENCE | DEFENCE SERVICES STAFF COLLEGE</span>
        </div>
      </div>

      {/* Center Slogan */}
      <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300 font-medium">
        <span className="text-cyan-400 font-bold">&ldquo;TRAIN THE DECISION-MAKER, NOT THE WEAPON.&rdquo;</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => useStore.getState().setDomQaModalOpen(true)}
          aria-label="Open DOM QA Test Suite"
          className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] border border-cyan-500/30"
          title="Run DOM QA Verification Suite"
        >
          <span>DOM QA SUITE</span>
        </button>

        <button
          onClick={startJudgeDemo}
          data-testid="start-judge-demo"
          aria-label="Start Judge Demo Mode"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs transition-all shadow-[0_0_12px_rgba(245,158,11,0.4)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
          <span>START JUDGE DEMO</span>
        </button>

        {/* Offline / Online Deployment Mode Toggle */}
        <button
          onClick={() => setOfflineMode(!isOfflineMode)}
          data-testid="offline-mode"
          aria-label="Toggle Standalone Offline Mode"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all text-[11px] ${
            isOfflineMode
              ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
              : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
          }`}
          title="Toggle Standalone Offline Mode"
        >
          {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
          <span data-testid="offline-status">{isOfflineMode ? 'OFFLINE MODE: ACTIVE' : 'ONLINE MODE'}</span>
        </button>
      </div>
    </header>
  );
};
