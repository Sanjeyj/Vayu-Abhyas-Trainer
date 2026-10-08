import React from 'react';
import { Shield, Cpu, Layers, Activity, Lock, RefreshCw } from 'lucide-react';

export const WhySentinelSkylab: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'ADAPTIVE TRAINING',
      icon: Cpu,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-500/5',
      desc: 'The next scenario is directly influenced by the trainee\'s weakest competency identified during after-action evaluation.'
    },
    {
      num: '02',
      title: 'PROCEDURAL VARIATION',
      icon: Layers,
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/5',
      desc: 'Reproducible scenario seeds dynamically vary track count, visibility, ambiguity, and event timing to prevent rote memorization.'
    },
    {
      num: '03',
      title: 'EXPLAINABLE ASSESSMENT',
      icon: Activity,
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/5',
      desc: 'Every score is traceable to measurable performance across 5 transparent categories (Detection, Classification, Prioritization, Decision Quality, Confidence Calibration).'
    },
    {
      num: '04',
      title: 'CLOSED-LOOP AAR',
      icon: RefreshCw,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-500/5',
      desc: 'Every training session automatically pinpoints the primary learning gap and computes the target next-best training drill.'
    },
    {
      num: '05',
      title: 'OFFLINE-FIRST',
      icon: Lock,
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/5',
      desc: 'Core training simulator, local data store, and adaptive evaluation engine operate completely standalone without continuous external connectivity.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header */}
      <div className="glass-panel rounded-xl p-6 border-cyan-500/40 space-y-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 text-xs">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>INNOVATION PILLARS</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-wider">WHY SENTINEL SKYLAB?</h1>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto">
          TRAIN THE DECISION-MAKER, NOT THE WEAPON. Strategic architectural differentiators designed for institutional defence staff training.
        </p>
      </div>

      {/* 5 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <div key={p.num} className={`glass-panel rounded-xl p-5 border ${p.border} ${p.bg} space-y-3 flex flex-col justify-between hover:scale-[1.01] transition-all`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-extrabold font-mono ${p.color}`}>{p.num}</span>
                <p.icon className={`w-5 h-5 ${p.color}`} />
              </div>
              <h3 className="text-base font-bold text-slate-100 tracking-wider">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
