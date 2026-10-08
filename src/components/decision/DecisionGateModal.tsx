import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { TrackClassification, TrackPriority, DefensiveResponse } from '../../types';
import { ShieldAlert, Activity, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

export const DecisionGateModal: React.FC = () => {
  const isDecisionGateOpen = useStore((s) => s.isDecisionGateOpen);
  const closeDecisionGate = useStore((s) => s.closeDecisionGate);
  const submitDecision = useStore((s) => s.submitDecision);
  const activeScenario = useStore((s) => s.activeScenario);
  const activeTracks = useStore((s) => s.activeTracks);

  const [classification, setClassification] = useState<TrackClassification>('SUSPICIOUS_DRONE');
  const [confidence, setConfidence] = useState<number>(82);
  const [priority, setPriority] = useState<TrackPriority>('MEDIUM');
  const [response, setResponse] = useState<DefensiveResponse>('Escalate to supervisor');

  if (!isDecisionGateOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDecision({
      classification,
      confidence,
      priority,
      response,
      latencySec: 4.2,
      timestamp: '00:42'
    });
  };

  return (
    <div 
      data-testid="decision-gate"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="w-full max-w-2xl glass-panel rounded-xl border border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] font-tactical overflow-hidden text-xs max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-amber-500/15 border-b border-amber-500/40 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 animate-pulse" />
            <div>
              <h2 className="text-base font-bold text-amber-300 tracking-wider">DECISION REQUIRED GATE</h2>
              <p className="text-slate-400 text-[11px]">THREAT CLASSIFICATION &amp; PRIORITIZATION THRESHOLD REACHED</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono font-bold border border-amber-500/40">
            SIM TIME: 00:42
          </span>
        </div>

        {/* Situation Summary */}
        <div className="p-4 bg-sky-950/60 border-b border-sky-800/60 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <p className="text-slate-200 text-xs leading-relaxed">
            <strong className="text-cyan-400">Situation Summary:</strong> {activeTracks.length} airborne tracks have emerged in the {activeScenario.terrain} sector under degraded thermal sensor conditions. Immediate operational threat assessment &amp; prioritization required.
          </p>
        </div>

        {/* Decision Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* 1. Classification (Accessible Native Select & Quick Buttons) */}
          <div className="space-y-2">
            <label htmlFor="classification-select-dropdown" className="text-slate-300 font-bold flex items-center justify-between">
              <span>1. THREAT CLASSIFICATION</span>
              <span className="text-slate-500 text-[10px]">Select closest airborne profile match</span>
            </label>
            <select
              id="classification-select-dropdown"
              data-testid="classification-select"
              aria-label="Threat Classification Select"
              value={classification}
              onChange={(e) => setClassification(e.target.value as TrackClassification)}
              className="w-full bg-sky-950 border border-sky-800 rounded p-2.5 text-cyan-300 font-bold text-xs"
            >
              <option value="BENIGN_AERIAL">Benign aerial object</option>
              <option value="UNKNOWN">Unknown drone</option>
              <option value="SUSPICIOUS_DRONE">Suspicious drone</option>
              <option value="COORDINATED_SWARM">Coordinated multi-track event</option>
            </select>
          </div>

          {/* 2. Confidence Slider */}
          <div className="space-y-2 bg-sky-950/50 p-3.5 rounded border border-sky-800/60">
            <div className="flex justify-between items-center text-slate-300">
              <label htmlFor="confidence-range-input" className="font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                2. DECISION CONFIDENCE CALIBRATION
              </label>
              <span data-testid="confidence-value" className="font-mono text-base font-bold text-cyan-400">{confidence}%</span>
            </div>
            <input
              id="confidence-range-input"
              data-testid="confidence-slider"
              aria-label="Decision Confidence Calibration Slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full h-2 bg-sky-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Uncertain)</span>
              <span>50% (Moderate)</span>
              <span>100% (Certain)</span>
            </div>
          </div>

          {/* 3. Priority Level */}
          <div className="space-y-2">
            <label htmlFor="priority-select-dropdown" className="text-slate-300 font-bold block">3. ACTION PRIORITIZATION</label>
            <select
              id="priority-select-dropdown"
              data-testid="priority-select"
              aria-label="Action Prioritization Select"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TrackPriority)}
              className="w-full bg-sky-950 border border-sky-800 rounded p-2.5 text-amber-300 font-bold text-xs"
            >
              <option value="LOW">Monitor</option>
              <option value="MEDIUM">Elevate</option>
              <option value="HIGH">Immediate attention</option>
            </select>
          </div>

          {/* 4. Defensive Training Response */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <label htmlFor="training-response-select-dropdown" className="font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                4. AUTHORIZED DEFENSIVE POSTURE
              </label>
              <span className="text-[10px] text-emerald-400 font-mono">SAFETY BOUNDARY ENFORCED</span>
            </div>
            <select
              id="training-response-select-dropdown"
              data-testid="training-response-select"
              aria-label="Training Response Posture Select"
              value={response}
              onChange={(e) => setResponse(e.target.value as DefensiveResponse)}
              className="w-full bg-sky-950 border border-sky-800 rounded p-2.5 text-emerald-300 font-bold text-xs"
            >
              <option value="Continue observation">Continue observation</option>
              <option value="Escalate to supervisor">Escalate to supervisor</option>
              <option value="Hold and reassess">Hold and reassess</option>
              <option value="Follow authorized procedure">Follow authorized procedure</option>
            </select>
          </div>

          {/* Footer Submit Button */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeDecisionGate}
              className="px-4 py-2 rounded bg-sky-950 hover:bg-sky-900 border border-sky-700 text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="submit-decision"
              aria-label="Submit Threat Decision & Generate AAR"
              className="px-6 py-2.5 rounded bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-extrabold tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              SUBMIT DECISION &amp; GENERATE AAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
