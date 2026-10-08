import React from 'react';
import { Cpu, Layers, Activity, ArrowRight, Shield, CheckCircle2, RefreshCw, Lock, Database } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const steps = [
    { title: 'VAYU ABHYAS PLATFORM', desc: 'Core application shell managing view state, offline mode, and institutional parameters.' },
    { title: 'SCENARIO ENGINE', desc: 'Procedural seed generator (SKY-28491 / VAYU-DEMO-01) creating terrain, weather, and track density.' },
    { title: 'SIMULATION ENGINE', desc: 'WebGL 2.5D/3D visualizer canvas managing isometric grid, radar sweep, and altitude vectors.' },
    { title: 'SYNTHETIC SENSOR DATA', desc: 'Sensor noise generator simulating dropouts, intermittent pulses, and reduced confidence.' },
    { title: 'TRAINEE DECISION GATE', desc: 'Interactive gate modal capturing classification, confidence slider, priority, and response posture.' },
    { title: 'EXPLAINABLE SCORING ENGINE', desc: 'Transparent weighted math model evaluating 5 categories (Detection, Classify, Prioritize, Decision, Confidence).' },
    { title: 'AAR ANALYTICS ENGINE', desc: 'Interactive session timeline replay, event impact analysis, and printable PDF report export.' },
    { title: 'LEARNING GAP IDENTIFIER', desc: 'Pattern-based analysis pinpointing primary competency weakness (e.g. Prioritization under ambiguity).' },
    { title: 'ADAPTIVE TRAINING ENGINE', desc: 'Pedagogical rule engine calculating Next-Best Drill adjustments (+1 track, +15% ambiguity).' },
    { title: 'NEXT-BEST DRILL GENERATOR', desc: 'Generates and loads the newly adapted scenario directly back into the simulator (CLOSED LOOP).' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header */}
      <div className="glass-panel rounded-xl p-5 border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">SYSTEM ARCHITECTURE &amp; CLOSED-LOOP DATA FLOW</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            MINISTRY OF DEFENCE | DEFENCE SERVICES STAFF COLLEGE — TECHNICAL SPECIFICATION
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-400/40 text-xs">
          CLOSED-LOOP ARCHITECTURE
        </span>
      </div>

      {/* Visual Flow Diagram */}
      <div className="glass-panel rounded-xl p-6 border-sky-800/80 space-y-6">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-sky-800/60 pb-3">
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          END-TO-END DATA PIPELINE &amp; FEEDBACK LOOP
        </h3>

        <div className="space-y-3 max-w-3xl mx-auto">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-full glass-panel-glow p-3.5 rounded-lg border-sky-800/80 flex items-center justify-between hover:border-cyan-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs font-mono">{s.title}</h4>
                    <p className="text-[11px] text-slate-400">{s.desc}</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>

              {idx < steps.length - 1 && (
                <div className="py-1 text-cyan-400 flex flex-col items-center">
                  <div className="w-0.5 h-3 bg-cyan-500/50" />
                  <ArrowRight className="w-3.5 h-3.5 rotate-90 text-cyan-400" />
                </div>
              )}
            </div>
          ))}

          {/* Closed Loop Return Arrow Box */}
          <div className="pt-2 text-center">
            <span className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40 inline-flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>LOOP CLOSURE: NEXT-BEST DRILL FEEDS DIRECTLY BACK INTO STEP 01 (SCENARIO ENGINE)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
