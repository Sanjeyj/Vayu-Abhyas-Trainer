import React from 'react';
import { useStore } from '../../store/useStore';
import { Eye, Shield, Sliders, Play, Pause, AlertOctagon, RefreshCw } from 'lucide-react';

export const SensorControlsPanel: React.FC = () => {
  const activeScenario = useStore((s) => s.activeScenario);
  const sensorDegraded = useStore((s) => s.sensorDegraded);
  const toggleSensorDegradation = useStore((s) => s.toggleSensorDegradation);
  const isSimPaused = useStore((s) => s.isSimPaused);
  const setSimPaused = useStore((s) => s.setSimPaused);
  const openDecisionGate = useStore((s) => s.openDecisionGate);

  return (
    <div 
      data-testid="sensor-controls-panel"
      className="w-full glass-panel rounded-lg p-3 font-tactical text-xs flex flex-wrap items-center justify-between gap-3 border-sky-800/80"
    >
      {/* Scenario Metadata Pills */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 bg-sky-950 px-2.5 py-1 rounded border border-sky-800/60">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">SCENARIO:</span>
          <span data-testid="simulation-status" className="font-bold text-slate-100">{activeScenario.name}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-sky-950 px-2.5 py-1 rounded border border-sky-800/60">
          <span className="text-slate-400">SEED:</span>
          <span data-testid="scenario-seed" className="font-bold text-cyan-300 font-mono">{activeScenario.seed}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-sky-950 px-2.5 py-1 rounded border border-sky-800/60">
          <span className="text-slate-400">ENVIRONMENT:</span>
          <span data-testid="scenario-environment" className="font-bold text-slate-200">{activeScenario.terrain}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-sky-950 px-2.5 py-1 rounded border border-sky-800/60">
          <span className="text-slate-400">TIME:</span>
          <span data-testid="scenario-time" className="font-bold text-slate-200">{activeScenario.timeOfDay}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-sky-950 px-2.5 py-1 rounded border border-sky-800/60">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">VISIBILITY:</span>
          <span data-testid="scenario-visibility" className="font-bold text-amber-400">{activeScenario.visibility.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-sky-950 px-2.5 py-1 rounded border border-sky-800/60">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">DIFFICULTY:</span>
          <span data-testid="scenario-difficulty" className="font-bold text-cyan-400">{activeScenario.difficulty.toUpperCase()}</span>
        </div>
      </div>

      {/* Sensor Degradation DOM State Pills */}
      <div className="flex items-center gap-2">
        <div 
          data-testid="sensor-status"
          className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-sky-950 border border-sky-800 text-[11px]"
        >
          <span className="text-slate-400">SENSOR STATE:</span>
          <span data-testid="sensor-degradation-indicator" className={`font-bold ${sensorDegraded ? 'text-amber-400' : 'text-emerald-400'}`}>
            {sensorDegraded ? 'DEGRADED' : 'NORMAL'}
          </span>
          <span className="text-slate-500">|</span>
          <span data-testid="sensor-quality" className="text-cyan-300 font-mono font-bold">
            {sensorDegraded ? '62%' : '100%'}
          </span>
          <span className="text-slate-500">|</span>
          <span data-testid="sensor-noise" className="text-amber-300 font-mono">
            Noise: {sensorDegraded ? '35%' : '0%'}
          </span>
          <span className="text-slate-500">|</span>
          <span data-testid="sensor-dropout" className="text-slate-400 font-mono">
            {sensorDegraded ? 'INTERMITTENT' : 'STABLE'}
          </span>
        </div>

        <button
          onClick={toggleSensorDegradation}
          data-testid="toggle-sensor-degradation"
          aria-label="Toggle Sensor Degradation Mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all ${
            sensorDegraded 
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 hover:bg-amber-500/30' 
              : 'bg-sky-950 border-sky-700 text-slate-300 hover:bg-sky-900'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${sensorDegraded ? 'animate-spin' : ''}`} />
          <span>{sensorDegraded ? 'SENSOR: DEGRADED (ON)' : 'SENSOR: NORMAL'}</span>
        </button>

        <button
          onClick={() => setSimPaused(!isSimPaused)}
          data-testid="toggle-sim-pause"
          aria-label={isSimPaused ? 'Resume Simulation' : 'Pause Simulation'}
          className="flex items-center gap-1.5 bg-sky-950 hover:bg-sky-900 px-3 py-1.5 rounded border border-sky-700 text-slate-200"
        >
          {isSimPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isSimPaused ? 'RESUME' : 'PAUSE'}</span>
        </button>

        <button
          onClick={openDecisionGate}
          data-testid="open-decision-gate"
          aria-label="Open Threat Decision Gate"
          className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-300 px-3 py-1.5 rounded font-bold transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
          <span>DECISION GATE</span>
        </button>
      </div>
    </div>
  );
};
