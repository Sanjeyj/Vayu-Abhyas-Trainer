import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_SCENARIOS } from '../../lib/mockData';
import { generateProceduralScenario, generateSeed } from '../../lib/scenarioEngine';
import { Layers, Play, Eye, Shield, Sliders, RefreshCw } from 'lucide-react';

export const ScenarioLibraryView: React.FC = () => {
  const loadScenario = useStore((s) => s.loadScenario);

  const [seedInput, setSeedInput] = useState<string>('SKY-28491');

  const handleLaunchSeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedInput) return;
    const scen = generateProceduralScenario({ seed: seedInput });
    loadScenario(scen);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">SCENARIO ENGINE & REPRODUCIBLE SEED LIBRARY</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            PROCEDURAL THREAT SCENARIOS & REPRODUCIBLE INSTRUCTOR SEEDS
          </p>
        </div>

        {/* Quick Seed Input Form */}
        <form onSubmit={handleLaunchSeed} className="flex items-center gap-2">
          <span className="text-xs text-slate-400">SEED:</span>
          <input
            type="text"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            className="bg-sky-950 border border-sky-800 rounded px-3 py-1.5 text-xs text-cyan-300 font-mono font-bold w-36"
            placeholder="e.g. SKY-28491"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>LAUNCH</span>
          </button>
        </form>
      </div>

      {/* Preset Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_SCENARIOS.map((scen) => (
          <div key={scen.id} className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  SEED: {scen.seed}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-sky-900 text-slate-300 font-bold border border-sky-700">
                  {scen.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100">{scen.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{scen.description}</p>

              <div className="grid grid-cols-2 gap-2 bg-sky-950/70 p-2.5 rounded border border-sky-800/40 text-[11px]">
                <div>
                  <span className="text-slate-500 text-[10px] block">TERRAIN</span>
                  <span className="font-bold text-slate-200">{scen.terrain}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">TIME OF DAY</span>
                  <span className="font-bold text-slate-200">{scen.timeOfDay}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">VISIBILITY</span>
                  <span className="font-bold text-amber-400">{scen.visibility}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">SENSOR STATUS</span>
                  <span className="font-bold text-cyan-400">{scen.sensorQuality}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => loadScenario(scen)}
              className="w-full py-2.5 rounded bg-sky-900 hover:bg-sky-800 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-sky-700 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LOAD & LAUNCH SCENARIO</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
