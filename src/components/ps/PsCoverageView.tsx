import React from 'react';
import { Shield, CheckCircle2, FileText } from 'lucide-react';

export const PsCoverageView: React.FC = () => {
  const coverageItems = [
    { req: 'Desktop Simulator', impl: 'WebGL 2.5D/3D visualizer canvas', status: '✓' },
    { req: 'Scripted Scenarios', impl: 'Scenario Library preset manager', status: '✓' },
    { req: 'Procedural Scenarios', impl: 'Seeded Generator (SKY-28491 / VAYU-DEMO-01)', status: '✓' },
    { req: 'Day / Night', impl: 'Time-of-day Environment Engine', status: '✓' },
    { req: 'Degraded Sensors', impl: 'Sensor Noise & Intermittency Engine', status: '✓' },
    { req: 'Urban / Rural', impl: 'Environment Profiles (Urban, Rural, Industrial, Coastal)', status: '✓' },
    { req: 'Single / Multi Track', impl: 'Dynamic Airborne Track Engine (1–6 tracks)', status: '✓' },
    { req: 'Decision Scoring', impl: 'Explainable Weighted 100pt Engine (5 Categories)', status: '✓' },
    { req: 'Detection Time', impl: 'Reaction Latency Tracker (seconds)', status: '✓' },
    { req: 'Classification Accuracy', impl: 'Threat Profile Accuracy Metric', status: '✓' },
    { req: 'Engagement Decisions', impl: 'Abstract Training Response Choices (Safety Boundary Enforced)', status: '✓' },
    { req: 'AAR Dashboard', impl: 'Interactive Session Timeline Replay & PDF Export', status: '✓' },
    { req: 'Individual Performance', impl: 'Trainee Profile & 5-Competency Radar Chart', status: '✓' },
    { req: 'Unit Performance', impl: 'Unit Readiness Heatmap Matrix (Trainees × 5 Competencies)', status: '✓' },
    { req: 'Adaptive Difficulty', impl: 'Closed-Loop Adaptive Engine (+1 Track, +15% Ambiguity)', status: '✓' },
    { req: 'VR Ready', impl: 'Modular Spatial WebGL Rendering Architecture', status: '✓' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header */}
      <div className="glass-panel rounded-xl p-5 border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">PS 26247 REQUIREMENT COVERAGE MATRIX</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            MINISTRY OF DEFENCE | DEFENCE SERVICES STAFF COLLEGE
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-xs">
          16 / 16 PS REQUIREMENTS ADDRESSED
        </span>
      </div>

      {/* Visual Matrix Table */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sky-800/60 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-3 px-4">PS REQUIREMENT</th>
                <th className="py-3 px-4">VAYU ABHYAS IMPLEMENTATION</th>
                <th className="py-3 px-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/40 font-mono">
              {coverageItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-sky-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-200">{item.req}</td>
                  <td className="py-3 px-4 text-slate-300 text-[11px] font-sans">{item.impl}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-sm border border-emerald-500/40">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Headline Badge */}
        <div className="pt-2 text-center">
          <span className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-extrabold text-xs border border-emerald-500/30">
            ✓ 16 / 16 PS REQUIREMENTS ADDRESSED (COMPLETE COVERAGE)
          </span>
        </div>
      </div>
    </div>
  );
};
