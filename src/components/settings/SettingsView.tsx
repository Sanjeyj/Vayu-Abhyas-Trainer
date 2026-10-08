import React from 'react';
import { useStore } from '../../store/useStore';
import { Sliders, Cpu, Shield, Wifi, WifiOff, RefreshCw, CheckCircle2, Database, Monitor } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const isOfflineMode = useStore((s) => s.isOfflineMode);
  const setOfflineMode = useStore((s) => s.setOfflineMode);
  const resetJudgeDemo = useStore((s) => s.resetJudgeDemo);
  const startJudgeDemo = useStore((s) => s.startJudgeDemo);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">SYSTEM CONTROL &amp; DEPLOYMENT CONFIGURATION</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            VAYU ABHYAS PLATFORM CONFIGURATION &amp; OFFLINE ENGINE STATUS
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Health Indicators */}
        <div className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-4">
          <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-sky-800/60 pb-3">
            <Cpu className="w-4 h-4" />
            SYSTEM ENGINE HEALTH STATUS
          </h3>

          <div className="space-y-2.5 text-xs font-mono">
            {[
              { label: 'SIMULATION ENGINE', status: 'ONLINE', detail: 'WebGL 2.5D/3D visualizer canvas (60 FPS)' },
              { label: 'SCENARIO ENGINE', status: 'ONLINE', detail: 'Procedural PRNG seed generator (VAYU-DEMO-01)' },
              { label: 'ANALYTICS ENGINE', status: 'ONLINE', detail: 'Weighted 100pt scoring breakdown model' },
              { label: 'ADAPTIVE ENGINE', status: 'ONLINE', detail: 'Pedagogical rule engine (+1 track, +15% ambiguity)' },
              { label: 'LOCAL DATA STORE', status: isOfflineMode ? 'LOCAL SQLITE' : 'POSTGRES STORE ONLINE', detail: 'Air-gapped standalone capability' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-sky-950/80 p-2.5 rounded border border-sky-800/50">
                <div>
                  <span className="font-bold text-slate-100 block">{s.label}</span>
                  <span className="text-slate-500 text-[10px]">{s.detail}</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Controls */}
        <div className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-4">
          <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-sky-800/60 pb-3">
            <Monitor className="w-4 h-4" />
            DEPLOYMENT CONTROLS &amp; DEMO RESET
          </h3>

          <div className="space-y-4 text-xs">
            {/* Offline Mode Toggle */}
            <div className="bg-sky-950/80 p-3.5 rounded border border-sky-800/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200">STANDALONE OFFLINE TRAINING MODE</span>
                <button
                  onClick={() => setOfflineMode(!isOfflineMode)}
                  className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                    isOfflineMode
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  }`}
                >
                  {isOfflineMode ? 'OFFLINE (ACTIVE)' : 'ONLINE MODE'}
                </button>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Core training simulator, local data store, and adaptive evaluation engine operate completely standalone without continuous external connectivity.
              </p>
            </div>

            {/* Reset Demo Button */}
            <div className="bg-sky-950/80 p-3.5 rounded border border-sky-800/60 space-y-2">
              <span className="font-bold text-slate-200 block">DETERMINISTIC JUDGE DEMO RESET</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Instantly restores the deterministic demo seed (<strong className="text-cyan-300 font-mono">VAYU-DEMO-01</strong>) without browser refresh.
              </p>
              <button
                onClick={startJudgeDemo}
                className="w-full py-2.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RESTORE JUDGE DEMO (VAYU-DEMO-01)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
