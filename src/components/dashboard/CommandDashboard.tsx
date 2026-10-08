import React from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_RECENT_SESSIONS } from '../../lib/mockData';
import { Shield, Activity, Users, Clock, CheckCircle2, Play, Sparkles, TrendingUp, Cpu } from 'lucide-react';

export const CommandDashboard: React.FC = () => {
  const setView = useStore((s) => s.setView);
  const startJudgeDemo = useStore((s) => s.startJudgeDemo);
  const isOfflineMode = useStore((s) => s.isOfflineMode);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header & System Status Bar */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">SENTINEL SKYLAB — TRAINING COMMAND</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            DEFENCE SERVICES STAFF COLLEGE | MINISTRY OF DEFENCE (PS 26247)
          </p>
        </div>

        {/* System Status Indicators */}
        <div className="flex items-center gap-2 flex-wrap text-[11px]">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SIMULATION ENGINE ONLINE
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ANALYTICS ONLINE
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isOfflineMode ? 'LOCAL DATA STORE' : 'POSTGRES STORE ONLINE'}
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            ADAPTIVE ENGINE ONLINE
          </span>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'ACTIVE SESSIONS', val: '12', icon: Activity, color: 'text-cyan-400', sub: 'Across 4 ranges' },
          { label: 'TRAINEES TODAY', val: '38', icon: Users, color: 'text-emerald-400', sub: '+14% vs avg' },
          { label: 'AVG READINESS', val: '84%', icon: TrendingUp, color: 'text-cyan-400', sub: 'Target: >80%' },
          { label: 'AVG DETECTION', val: '2.8s', icon: Clock, color: 'text-amber-400', sub: '-0.4s this week' },
          { label: 'DECISION QUALITY', val: '87%', icon: CheckCircle2, color: 'text-emerald-400', sub: 'High accuracy' },
          { label: 'COMPLETION RATE', val: '94%', icon: Shield, color: 'text-cyan-400', sub: '358 drills' },
        ].map((kpi, idx) => (
          <div key={idx} className="glass-panel p-3.5 rounded-lg border-sky-800/60 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold">
              <span>{kpi.label}</span>
              <kpi.icon className={`w-3.5 h-3.5 ${kpi.color}`} />
            </div>
            <div className={`text-2xl font-extrabold font-mono ${kpi.color}`}>{kpi.val}</div>
            <div className="text-[10px] text-slate-500">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Launch & Judge Demo Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel-glow p-5 rounded-xl border-cyan-500/40 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-cyan-300">LAUNCH LIVE SIMULATION RANGE</h3>
            <p className="text-xs text-slate-400">Urban Night, Low Visibility, Degraded Thermal Sensors.</p>
          </div>
          <button
            onClick={() => setView('simulation')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Play className="w-4 h-4" />
            <span>START SIMULATION</span>
          </button>
        </div>

        <div className="glass-panel p-5 rounded-xl border-amber-500/40 bg-amber-500/5 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-amber-300">SIH JUDGE DEMO MODE</h3>
            <p className="text-xs text-slate-400">Automated 60–90 second guided innovation loop.</p>
          </div>
          <button
            onClick={startJudgeDemo}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>JUDGE DEMO MODE</span>
          </button>
        </div>
      </div>

      {/* Recent Training Sessions Table */}
      <div className="glass-panel rounded-xl p-5 space-y-4 border-sky-800/80">
        <div className="flex items-center justify-between border-b border-sky-800/60 pb-3">
          <h3 className="text-sm font-bold text-slate-200 tracking-wider">RECENT TRAINING SESSIONS</h3>
          <span className="text-xs text-slate-400">REAL-TIME TRAINEE STREAM</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-800/60 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">TRAINEE</th>
                <th className="py-2.5 px-3">SCENARIO</th>
                <th className="py-2.5 px-3">DIFFICULTY</th>
                <th className="py-2.5 px-3">SCORE</th>
                <th className="py-2.5 px-3">DECISION QUALITY</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/40">
              {MOCK_RECENT_SESSIONS.map((ses) => (
                <tr key={ses.id} className="hover:bg-sky-900/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-100">{ses.traineeName}</td>
                  <td className="py-3 px-3 text-slate-300">{ses.scenarioName}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-sky-900 border border-sky-700 text-cyan-300 font-mono">
                      {ses.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-cyan-400">{ses.score}/100</td>
                  <td className="py-3 px-3 font-mono text-slate-300">{ses.decisionQuality}%</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ses.status === 'READY'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    }`}>
                      {ses.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px] font-mono">{ses.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
