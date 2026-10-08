import React from 'react';
import { useStore } from '../../store/useStore';
import { BarChart3, TrendingUp, AlertOctagon, CheckCircle2, Shield } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const UnitAnalyticsView: React.FC = () => {
  const trainees = useStore((s) => s.traineesList);

  const unitTrendData = [
    { session: 'Week 1', readiness: 74 },
    { session: 'Week 2', readiness: 76 },
    { session: 'Week 3', readiness: 79 },
    { session: 'Week 4', readiness: 81 },
    { session: 'Week 5', readiness: 84 },
    { session: 'Week 6', readiness: 85 },
    { session: 'Week 7', readiness: 87 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">UNIT TRAINING READINESS &amp; COMPETENCY HEATMAP</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            DEFENCE SERVICES STAFF COLLEGE — INSTITUTIONAL EVALUATION
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-sky-950 text-slate-400 font-mono text-xs border border-sky-800">
          SYNTHETIC TRAINING DATA
        </span>
      </div>

      {/* THREE HEADLINE NUMBERS (Item 10 Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: UNIT TRAINING READINESS */}
        <div className="glass-panel p-5 rounded-xl border-cyan-500/40 space-y-1 text-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">UNIT TRAINING READINESS</span>
          <div className="text-4xl font-extrabold text-cyan-400 font-mono">87%</div>
          <div className="text-[10px] text-emerald-400 font-bold">Target: &gt;80%</div>
        </div>

        {/* KPI 2: IMPROVEMENT */}
        <div className="glass-panel p-5 rounded-xl border-emerald-500/40 space-y-1 text-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">IMPROVEMENT RATE</span>
          <div className="text-4xl font-extrabold text-emerald-400 font-mono">+11%</div>
          <div className="text-[10px] text-slate-500">Over last 7 assessment cycles</div>
        </div>

        {/* KPI 3: CRITICAL SKILL GAP */}
        <div className="glass-panel p-5 rounded-xl border-amber-500/40 bg-amber-500/5 space-y-1 text-center">
          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">CRITICAL SKILL GAP</span>
          <div className="text-2xl font-extrabold text-amber-300 truncate">Prioritization</div>
          <div className="text-[10px] text-slate-400">Under sensor ambiguity (40% of unit)</div>
        </div>
      </div>

      {/* 7-Session Unit Trend Line Chart */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-3">
        <div className="flex items-center justify-between border-b border-sky-800/60 pb-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            7-CYCLE UNIT READINESS PROGRESSION
          </h3>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">+11% OVERALL GAIN</span>
        </div>

        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={unitTrendData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(37, 59, 100, 0.4)" />
              <XAxis dataKey="session" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis domain={[60, 100]} stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1527', borderColor: '#06B6D4', borderRadius: '8px', color: '#fff' }}
              />
              <Line type="monotone" dataKey="readiness" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competency Heatmap Table */}
      <div className="glass-panel rounded-xl p-5 space-y-4 border-sky-800/80">
        <div className="flex items-center justify-between border-b border-sky-800/60 pb-3">
          <h3 className="text-sm font-bold text-slate-200 tracking-wider">UNIT COMPETENCY HEATMAP MATRIX</h3>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> OPTIMAL (&ge;85)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> DEVELOPING (70-84)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500" /> AT RISK (&lt;70)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sky-800/60 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-3 px-4">TRAINEE</th>
                <th className="py-3 px-4">RANK &amp; UNIT</th>
                <th className="py-3 px-4 text-center">DETECTION LATENCY</th>
                <th className="py-3 px-4 text-center">CLASSIFICATION</th>
                <th className="py-3 px-4 text-center">PRIORITIZATION</th>
                <th className="py-3 px-4 text-center">DECISION QUALITY</th>
                <th className="py-3 px-4 text-center">CONFIDENCE</th>
                <th className="py-3 px-4 text-center">READINESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/40">
              {trainees.map((t) => {
                const detectScore = Math.round(100 - (t.avgDetectionLatencySec * 14));
                return (
                  <tr key={t.id} className="hover:bg-sky-900/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-100">{t.name}</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">{t.rank} | {t.unit}</td>
                    
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded font-mono font-bold ${
                        detectScore >= 85 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        detectScore >= 70 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {detectScore}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded font-mono font-bold ${
                        t.classificationAccuracyPercent >= 85 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        t.classificationAccuracyPercent >= 70 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {t.classificationAccuracyPercent}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded font-mono font-bold ${
                        t.prioritizationScorePercent >= 85 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        t.prioritizationScorePercent >= 70 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {t.prioritizationScorePercent}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded font-mono font-bold ${
                        t.decisionQualityPercent >= 85 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        t.decisionQualityPercent >= 70 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {t.decisionQualityPercent}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded font-mono font-bold ${
                        t.confidenceCalibrationPercent >= 85 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        t.confidenceCalibrationPercent >= 70 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {t.confidenceCalibrationPercent}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center font-mono font-extrabold text-cyan-400 text-sm">
                      {t.readinessScore}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
