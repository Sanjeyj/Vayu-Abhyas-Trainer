import React from 'react';
import { useStore } from '../../store/useStore';
import { Clock, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

export const EventTimeline: React.FC = () => {
  const timelineEvents = useStore((s) => s.timelineEvents);
  const simTimeSec = useStore((s) => s.simTimeSec);
  const openDecisionGate = useStore((s) => s.openDecisionGate);

  return (
    <div className="w-full glass-panel rounded-lg p-3 font-tactical text-xs flex flex-col gap-2 border-sky-800/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
          <Clock className="w-4 h-4" />
          <span>MISSION EVENT TIMELINE</span>
        </div>
        <span className="text-slate-400 text-[11px]">
          SIM TIME: <strong className="text-slate-100 font-mono">00:{simTimeSec < 10 ? `0${simTimeSec}` : simTimeSec}</strong> / 01:00
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
        {timelineEvents.map((ev) => {
          const isCurrentOrPast = ev.timestampSec <= simTimeSec;
          const isDecision = ev.type === 'decision';

          return (
            <div
              key={ev.id}
              onClick={isDecision ? openDecisionGate : undefined}
              className={`min-w-[210px] p-2 rounded border flex flex-col gap-1 transition-all ${
                isDecision && isCurrentOrPast
                  ? 'bg-amber-500/20 border-amber-500 text-amber-200 cursor-pointer animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : isCurrentOrPast
                  ? 'bg-sky-950/80 border-sky-700/60 text-slate-200'
                  : 'bg-sky-950/30 border-sky-900/40 text-slate-600 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold font-mono text-[11px] text-cyan-400">{ev.timestampStr}</span>
                {ev.type === 'info' && <Info className="w-3.5 h-3.5 text-cyan-400" />}
                {ev.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                {ev.type === 'alert' && <ShieldAlert className="w-3.5 h-3.5 text-red-400" />}
                {ev.type === 'decision' && <CheckCircle className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <span className="font-bold text-[11px] line-clamp-1">{ev.title}</span>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">{ev.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
