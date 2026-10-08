import React from 'react';
import { useStore } from '../../store/useStore';
import { Shield, Sparkles, Play, Eye, Activity, RefreshCw } from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const setView = useStore((s) => s.setView);
  const startJudgeDemo = useStore((s) => s.startJudgeDemo);

  return (
    <div className="relative w-full min-h-[calc(100vh-64px)] bg-[#060B16] bg-tactical-grid flex flex-col items-center justify-center p-6 text-center font-tactical overflow-hidden">
      {/* Background Radar Sweep Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] rounded-full border border-cyan-500/40 relative animate-radar-sweep bg-radar-concentric">
          <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent origin-left" />
        </div>
      </div>

      {/* Floating Radar Pings */}
      <div className="absolute top-1/4 left-1/5 animate-pulse">
        <div className="w-3 h-3 rounded-full bg-cyan-400 opacity-70 animate-ping absolute" />
        <div className="w-3 h-3 rounded-full bg-cyan-500 border border-cyan-300" />
        <span className="text-[10px] text-cyan-400 font-mono block mt-1">TRK-01 [SYNTHETIC]</span>
      </div>

      <div className="absolute bottom-1/3 right-1/4 animate-pulse">
        <div className="w-3 h-3 rounded-full bg-amber-400 opacity-70 animate-ping absolute" />
        <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300" />
        <span className="text-[10px] text-amber-400 font-mono block mt-1">TRK-02 [SYNTHETIC]</span>
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Institutional Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
          <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/40 text-amber-300 font-bold">
            PROBLEM STATEMENT 26247
          </span>
          <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-bold">
            MINISTRY OF DEFENCE
          </span>
          <span className="px-3 py-1 rounded bg-sky-900/80 border border-sky-700 text-slate-200 font-bold">
            DEFENCE SERVICES STAFF COLLEGE
          </span>
        </div>

        {/* Project Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-10 h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-100 tracking-wider font-mono drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              VAYU ABHYAS
            </h1>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-cyan-400 tracking-wide max-w-2xl mx-auto">
            AI-Enabled Drone &amp; Counter-Drone Threat Simulation Trainer
          </h2>
        </div>

        {/* Product Slogan & Story */}
        <div className="py-2 space-y-2">
          <p className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-wider">
            &ldquo;TRAIN THE DECISION-MAKER, NOT THE WEAPON.&rdquo;
          </p>
          <p className="text-xs text-slate-300 font-mono max-w-2xl mx-auto leading-relaxed">
            VAYU ABHYAS transforms repeated drone-threat simulation into measurable, adaptive decision training. Every session makes the next session smarter.
          </p>
        </div>

        {/* VISUALLY DOMINANT ACTION BUTTON */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={startJudgeDemo}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-cyan-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold text-base tracking-wider flex items-center gap-3 transition-all shadow-[0_0_35px_rgba(245,158,11,0.5)] scale-105 hover:scale-110"
          >
            <Sparkles className="w-6 h-6 text-slate-950 animate-pulse" />
            <span>START JUDGE DEMO</span>
          </button>
          <p className="text-[11px] text-cyan-400 font-mono tracking-widest uppercase">
            Adaptive Simulation &bull; Explainable Assessment &bull; After-Action Review
          </p>
        </div>

        {/* Secondary Navigation Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setView('simulation')}
            className="px-5 py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Play className="w-4 h-4" />
            <span>ENTER SIMULATION RANGE</span>
          </button>

          <button
            onClick={() => setView('dashboard')}
            className="px-5 py-2.5 rounded-lg bg-sky-900/80 hover:bg-sky-800 text-slate-200 border border-sky-700 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>COMMAND DASHBOARD</span>
          </button>
        </div>

        {/* TRADITIONAL vs VAYU ABHYAS LOOP COMPARISON */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-xs font-mono">
          <div className="glass-panel p-3.5 rounded-xl border-sky-800/60 space-y-1 opacity-70">
            <span className="text-slate-400 text-[10px] font-bold block uppercase">TRADITIONAL SIMULATOR</span>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-[11px]">
              <span>Scenario</span> &rarr; <span>Practice</span> &rarr; <span>Score</span>
            </div>
            <p className="text-[10px] text-slate-500">Static difficulty; score ends the session.</p>
          </div>

          <div className="glass-panel-glow p-3.5 rounded-xl border-cyan-500/50 space-y-1 bg-cyan-950/20">
            <span className="text-cyan-400 text-[10px] font-extrabold block uppercase">VAYU ABHYAS CLOSED LOOP</span>
            <div className="flex items-center justify-center gap-1.5 text-cyan-200 text-[11px] font-bold">
              <span>Scenario</span> &rarr; <span>Practice</span> &rarr; <span>Measure</span> &rarr; <span>Adapt</span> &rarr; <span>Train Again</span>
            </div>
            <p className="text-[10px] text-emerald-400 font-bold">Every repetition creates the next-best drill.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
