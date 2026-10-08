import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { generateProceduralScenario, generateSeed } from '../../lib/scenarioEngine';
import { TerrainType, TimeOfDay, VisibilityLevel, SensorQuality, DifficultyLevel } from '../../types';
import { Sliders, Cpu, Play, RefreshCw, Layers, CheckCircle2, Users, HelpCircle } from 'lucide-react';

export const InstructorConsole: React.FC = () => {
  const loadScenario = useStore((s) => s.loadScenario);
  const traineesList = useStore((s) => s.traineesList);

  const [seed, setSeed] = useState<string>('SKY-28491');
  const [name, setName] = useState<string>('Advanced Multi-Track Night Drill');
  const [terrain, setTerrain] = useState<TerrainType>('Urban');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('Night');
  const [visibility, setVisibility] = useState<VisibilityLevel>('Low');
  const [sensorQuality, setSensorQuality] = useState<SensorQuality>('Degraded');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Advanced');
  const [trackCount, setTrackCount] = useState<number>(4);
  const [ambiguity, setAmbiguity] = useState<number>(68);

  const handleGenerateNewSeed = () => {
    const newSeed = generateSeed('SKY');
    setSeed(newSeed);
  };

  const handleLaunchScenario = (e: React.FormEvent) => {
    e.preventDefault();
    const scenario = generateProceduralScenario({
      seed,
      name,
      terrain,
      timeOfDay,
      visibility,
      sensorQuality,
      difficulty,
      trackCount,
      ambiguity
    });
    loadScenario(scenario);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4">
      {/* Header */}
      <div className="glass-panel rounded-xl p-5 border-sky-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">INSTRUCTOR EVALUATION &amp; SCENARIO AUTHORING CONSOLE</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Author procedural scenarios, monitor trainee skill gaps, or inspect adaptive logic rules.
          </p>
        </div>
      </div>

      {/* 5 Core Instructor Questions Panel (Item 13 Requirement) */}
      <div className="glass-panel rounded-xl p-5 border-cyan-500/40 space-y-4">
        <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2 border-b border-sky-800/60 pb-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          EVALUATOR DECISION DASHBOARD (5 CORE INSTRUCTOR QUESTIONS)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sky-800/60 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">TRAINEE (WHO)</th>
                <th className="py-2.5 px-3">WEAKEST SKILL (WHAT)</th>
                <th className="py-2.5 px-3">DIAGNOSTIC (WHY)</th>
                <th className="py-2.5 px-3">RECOMMENDED DRILL (NEXT)</th>
                <th className="py-2.5 px-3">READINESS TREND (IMPROVING?)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/40">
              {traineesList.slice(0, 5).map((t) => (
                <tr key={t.id} className="hover:bg-sky-900/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-100">{t.rank} {t.name}</td>
                  <td className="py-3 px-3 font-bold text-amber-400">{t.primarySkillGap}</td>
                  <td className="py-3 px-3 text-slate-300 text-[11px]">Sensor noise causes delayed track prioritization.</td>
                  <td className="py-3 px-3 font-mono text-cyan-300">Multi-Track Night Drill (+1 track)</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">{t.readinessScore}% (↗ +{t.trendValue}%)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid Layout: Scenario Generator & Adaptive Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scenario Builder Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-xl p-6 border-sky-800/80 space-y-5">
          <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-sky-800/60 pb-3">
            <Layers className="w-4 h-4" />
            PROCEDURAL SCENARIO GENERATOR
          </h3>

          <form onSubmit={handleLaunchScenario} className="space-y-4 text-xs">
            {/* Scenario Seed & Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-bold block mb-1">SCENARIO SEED (REPRODUCIBLE)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    className="w-full bg-sky-950 border border-sky-800 rounded px-3 py-2 text-cyan-300 font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateNewSeed}
                    className="px-3 py-2 bg-sky-900 hover:bg-sky-800 rounded border border-sky-700 text-slate-300"
                    title="Generate Random Seed"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">SCENARIO NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-sky-950 border border-sky-800 rounded px-3 py-2 text-slate-100 font-medium"
                />
              </div>
            </div>

            {/* Terrain & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-bold block mb-1">TERRAIN ENVIRONMENT</label>
                <select
                  value={terrain}
                  onChange={(e) => setTerrain(e.target.value as TerrainType)}
                  className="w-full bg-sky-950 border border-sky-800 rounded px-3 py-2 text-slate-200"
                >
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Coastal">Coastal</option>
                  <option value="Mountain">Mountain</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">TIME OF DAY</label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
                  className="w-full bg-sky-950 border border-sky-800 rounded px-3 py-2 text-slate-200"
                >
                  <option value="Night">Night</option>
                  <option value="Day">Day</option>
                  <option value="Dawn">Dawn</option>
                  <option value="Dusk">Dusk</option>
                </select>
              </div>
            </div>

            {/* Visibility & Sensor Quality */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-bold block mb-1">ATMOSPHERIC VISIBILITY</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as VisibilityLevel)}
                  className="w-full bg-sky-950 border border-sky-800 rounded px-3 py-2 text-slate-200"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Zero">Zero</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">SENSOR DEGRADATION MODE</label>
                <select
                  value={sensorQuality}
                  onChange={(e) => setSensorQuality(e.target.value as SensorQuality)}
                  className="w-full bg-sky-950 border border-sky-800 rounded px-3 py-2 text-slate-200"
                >
                  <option value="Degraded">Degraded</option>
                  <option value="Normal">Normal</option>
                  <option value="Intermittent">Intermittent</option>
                  <option value="Occluded">Occluded</option>
                </select>
              </div>
            </div>

            {/* Track Count & Ambiguity Slider */}
            <div className="grid grid-cols-2 gap-3 bg-sky-950/60 p-3 rounded border border-sky-800/60">
              <div>
                <div className="flex justify-between text-slate-300 font-bold mb-1">
                  <span>TRACK COUNT</span>
                  <span className="text-cyan-400 font-mono">{trackCount} Tracks</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={trackCount}
                  onChange={(e) => setTrackCount(Number(e.target.value))}
                  className="w-full h-2 bg-sky-900 rounded appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-bold mb-1">
                  <span>AMBIGUITY %</span>
                  <span className="text-amber-400 font-mono">{ambiguity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={ambiguity}
                  onChange={(e) => setAmbiguity(Number(e.target.value))}
                  className="w-full h-2 bg-sky-900 rounded appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Play className="w-4 h-4" />
              <span>GENERATE &amp; LAUNCH SCENARIO ({seed})</span>
            </button>
          </form>
        </div>

        {/* Right Column: Adaptive Logic Rules (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-xl p-5 border-sky-800/80 space-y-4">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-sky-800/60 pb-3">
              <Cpu className="w-4 h-4" />
              DETERMINISTIC ADAPTIVE LOGIC RULES
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-sky-950/90 p-3 rounded border border-sky-800/60 space-y-1">
                <span className="text-cyan-400 font-mono font-bold block">RULE 01: MULTI-TRACK AMBIGUITY TRIGGER</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-slate-100 font-mono">IF</strong> classification &ge; 85 AND detection &ge; 85 AND prioritization &lt; 78<br />
                  <strong className="text-amber-400 font-mono">THEN</strong> increase multi-track density (+1 track), increase ambiguity (+15%), reduce visibility (-10%).
                </p>
              </div>

              <div className="bg-sky-950/90 p-3 rounded border border-sky-800/60 space-y-1">
                <span className="text-cyan-400 font-mono font-bold block">RULE 02: CONFIDENCE CALIBRATION TRIGGER</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-slate-100 font-mono">IF</strong> confidence calibration &lt; 70<br />
                  <strong className="text-amber-400 font-mono">THEN</strong> increase ambiguous cues (+25% ambiguity), introduce intermittent sensor pulses.
                </p>
              </div>

              <div className="bg-sky-950/90 p-3 rounded border border-sky-800/60 space-y-1">
                <span className="text-cyan-400 font-mono font-bold block">RULE 03: REINFORCEMENT DRILL TRIGGER</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-slate-100 font-mono">IF</strong> overall score &lt; 65<br />
                  <strong className="text-amber-400 font-mono">THEN</strong> assign reinforcement baseline drill (reduce tracks, reduce ambiguity) to solidify core cues.
                </p>
              </div>
            </div>

            <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/30 flex items-center gap-2 text-xs text-cyan-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Adaptive rules active. Ready for evaluator scenario generation.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
