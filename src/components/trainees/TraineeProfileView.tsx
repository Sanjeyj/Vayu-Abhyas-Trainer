import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_TRAINEES } from '../../lib/mockData';
import { User, TrendingUp, Award, Clock, Shield, Target } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const TraineeProfileView: React.FC = () => {
  const traineesList = useStore((s) => s.traineesList);
  const [selectedTraineeId, setSelectedTraineeId] = useState<string>(traineesList[0].id);

  const trainee = traineesList.find((t) => t.id === selectedTraineeId) || traineesList[0];

  // Radar Data for 5 competencies
  const radarData = [
    { subject: 'Detection', score: Math.round(100 - (trainee.avgDetectionLatencySec * 15)), fullMark: 100 },
    { subject: 'Classification', score: trainee.classificationAccuracyPercent, fullMark: 100 },
    { subject: 'Prioritization', score: trainee.prioritizationScorePercent, fullMark: 100 },
    { subject: 'Decision Quality', score: trainee.decisionQualityPercent, fullMark: 100 },
    { subject: 'Confidence', score: trainee.confidenceCalibrationPercent, fullMark: 100 },
  ];

  // Line chart data for session progress
  const lineData = trainee.historyScores.map((score, i) => ({
    session: `SES 0${i + 1}`,
    score
  }));

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Top Header & Selector */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold text-lg">
            {trainee.name.split('. ')[1]?.substring(0, 2) || 'AK'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-100">{trainee.rank} {trainee.name}</h1>
              <span className="px-2.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
                {trainee.unit}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              PRIMARY LEARNING GAP: <strong className="text-amber-400">{trainee.primarySkillGap}</strong>
            </p>
          </div>
        </div>

        {/* Trainee Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">SELECT TRAINEE:</span>
          <select
            value={selectedTraineeId}
            onChange={(e) => setSelectedTraineeId(e.target.value)}
            className="bg-sky-950 border border-sky-800 rounded px-3 py-1.5 text-xs text-slate-200 font-bold"
          >
            {traineesList.map((t) => (
              <option key={t.id} value={t.id}>{t.rank} {t.name} ({t.unit})</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3.5 rounded-lg border-sky-800/60 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">READINESS SCORE</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">{trainee.readinessScore}%</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
            <TrendingUp className="w-3 h-3" /> ↗ +{trainee.trendValue}% trend
          </div>
        </div>

        <div className="glass-panel p-3.5 rounded-lg border-sky-800/60 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">SESSIONS COMPLETED</span>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">{trainee.sessionsCompleted}</div>
          <div className="text-[10px] text-slate-500">Last: {trainee.lastActive}</div>
        </div>

        <div className="glass-panel p-3.5 rounded-lg border-sky-800/60 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">AVG DETECTION</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">{trainee.avgDetectionLatencySec}s</div>
          <div className="text-[10px] text-slate-500">Latency threshold</div>
        </div>

        <div className="glass-panel p-3.5 rounded-lg border-sky-800/60 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">CLASSIFICATION</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">{trainee.classificationAccuracyPercent}%</div>
          <div className="text-[10px] text-slate-500">Accuracy rate</div>
        </div>

        <div className="glass-panel p-3.5 rounded-lg border-sky-800/60 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">PRIORITIZATION</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">{trainee.prioritizationScorePercent}%</div>
          <div className="text-[10px] text-amber-400">Needs focus</div>
        </div>

        <div className="glass-panel p-3.5 rounded-lg border-sky-800/60 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">DECISION QUALITY</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{trainee.decisionQualityPercent}%</div>
          <div className="text-[10px] text-slate-500">Doctrine compliance</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competency Radar Chart */}
        <div className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-3">
          <div className="flex items-center justify-between border-b border-sky-800/60 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              COMPETENCY PROFILE (5 CATEGORIES)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">100 PT SCALE</span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(37, 59, 100, 0.6)" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748B" />
                <Radar name={trainee.name} dataKey="score" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progressive Score Trend Line Chart */}
        <div className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-3">
          <div className="flex items-center justify-between border-b border-sky-800/60 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              PROGRESSIVE SESSION READINESS TREND
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">MEASURABLE IMPROVEMENT</span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(37, 59, 100, 0.4)" />
                <XAxis dataKey="session" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <YAxis domain={[40, 100]} stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1527', borderColor: '#06B6D4', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} dot={{ fill: '#06B6D4', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
