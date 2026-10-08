import React from 'react';
import { useStore } from '../../store/useStore';
import { Radio, Activity, Eye, Zap } from 'lucide-react';

export const TrackInspectionPanel: React.FC = () => {
  const activeTracks = useStore((s) => s.activeTracks);
  const selectedTrackId = useStore((s) => s.selectedTrackId);
  const selectTrack = useStore((s) => s.selectTrack);
  const sensorDegraded = useStore((s) => s.sensorDegraded);

  const selectedTrack = activeTracks.find((t) => t.id === selectedTrackId) || activeTracks[0];

  if (!selectedTrack) {
    return (
      <div 
        data-testid="track-inspection-panel"
        className="w-full lg:w-80 glass-panel rounded-lg p-4 flex flex-col justify-center items-center text-slate-500 text-xs font-tactical"
      >
        Select a track on the radar grid to view telemetry.
      </div>
    );
  }

  return (
    <div 
      data-testid="track-inspection-panel"
      className="w-full lg:w-80 glass-panel rounded-lg p-4 flex flex-col gap-3.5 text-xs font-tactical border-sky-800/80"
    >
      {/* DOM Track List Selector Buttons */}
      <div 
        data-testid="track-list" 
        className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-sky-800/60"
      >
        <span className="text-[10px] text-slate-500 font-bold uppercase mr-1">TRACKS:</span>
        {activeTracks.map((trk, idx) => {
          const isSelected = trk.id === selectedTrack.id;
          const trackNum = trk.id.replace('TRK-', '').replace('TRK', '');
          const testId = `track-item-${trackNum.length === 1 ? `0${trackNum}` : trackNum}`;

          return (
            <button
              key={trk.id}
              data-testid={testId}
              aria-label={`Select ${trk.label} (${trk.status.toUpperCase()}, ${trk.confidence}%)`}
              onClick={() => selectTrack(trk.id)}
              className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'bg-sky-950 text-slate-400 border border-sky-800 hover:bg-sky-900'
              }`}
            >
              <span>{trk.label}</span>
              <span data-testid={`track-${trackNum}-confidence`} className="text-[9px] opacity-80">({trk.confidence}%)</span>
            </button>
          );
        })}
      </div>

      {/* Track Header & State Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-sm font-bold text-slate-100">{selectedTrack.label}</span>
        </div>
        <span 
          data-testid={`track-${selectedTrack.id.replace('TRK-', '').replace('TRK', '')}-state`}
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            selectedTrack.status === 'stable' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
            selectedTrack.status === 'ambiguous' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
            'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
          }`}
        >
          {selectedTrack.status.toUpperCase()}
        </span>
      </div>

      {/* Confidence Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-slate-300">
          <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-cyan-400" /> CONFIDENCE</span>
          <span data-testid="selected-track-confidence" className="font-bold text-cyan-400">{selectedTrack.confidence}%</span>
        </div>
        <div className="w-full h-2 bg-sky-950 rounded overflow-hidden border border-sky-800/50">
          <div 
            className={`h-full transition-all duration-500 ${
              selectedTrack.confidence > 75 ? 'bg-cyan-400' : selectedTrack.confidence > 50 ? 'bg-amber-400' : 'bg-red-500'
            }`}
            style={{ width: `${selectedTrack.confidence}%` }}
          />
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="grid grid-cols-2 gap-2 bg-sky-950/70 p-2.5 rounded border border-sky-800/40">
        <div>
          <span className="text-slate-500 text-[10px] block">ALTITUDE</span>
          <span data-testid="selected-track-altitude" className="font-semibold text-slate-200">{selectedTrack.altitude} m</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">SPEED</span>
          <span data-testid="selected-track-speed" className="font-semibold text-slate-200">{selectedTrack.speed.toFixed(1)} m/s</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">HEADING</span>
          <span data-testid="selected-track-heading" className="font-semibold text-slate-200">{selectedTrack.heading}°</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">OBSERVATIONS</span>
          <span data-testid="selected-track-observations" className="font-semibold text-cyan-400">{selectedTrack.observationsCount}</span>
        </div>
      </div>

      {/* RF & Radar Signature */}
      <div className="space-y-1.5 bg-sky-950/50 p-2.5 rounded border border-sky-800/40">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-slate-300">RF SIGNATURE</span>
        </div>
        <p data-testid="selected-track-rf" className="text-slate-200 text-[11px] leading-tight">{selectedTrack.rfSignature}</p>
      </div>

      {/* Sensor Quality indicator */}
      <div className="flex justify-between items-center bg-sky-950/50 px-2.5 py-1.5 rounded border border-sky-800/40">
        <span className="text-slate-400 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-cyan-400" /> SENSOR QUALITY
        </span>
        <span 
          data-testid={`track-${selectedTrack.id.replace('TRK-', '').replace('TRK', '')}-sensor`}
          className={`font-semibold ${sensorDegraded ? 'text-amber-400' : 'text-emerald-400'}`}
        >
          {sensorDegraded ? 'DEGRADED' : 'NORMAL'}
        </span>
      </div>

      {/* Observation History Timeline */}
      <div className="space-y-2">
        <span className="text-slate-400 text-[10px] font-bold block tracking-wider uppercase">OBSERVATION HISTORY</span>
        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {selectedTrack.history.map((h, i) => (
            <div key={i} className="flex flex-col gap-0.5 bg-sky-950/80 p-1.5 rounded border border-sky-800/30 text-[10px]">
              <div className="flex justify-between text-cyan-400 font-bold">
                <span>{h.timestamp}</span>
                <span className="text-slate-400">{h.note}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{h.radarCrossSection}</span>
                <span>SPD: {h.speed}m/s</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
