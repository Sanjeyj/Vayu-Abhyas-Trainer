import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Award, Zap, Brain, ArrowRight, Download, CheckCircle, AlertTriangle, Shield, RefreshCw, Sparkles, HelpCircle, Cpu } from 'lucide-react';
import { ExportPdfModal } from '../ui/ExportPdfModal';

export const AARView: React.FC = () => {
  const currentAAR = useStore((s) => s.currentAAR);
  const runNextBestDrill = useStore((s) => s.runNextBestDrill);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  if (!currentAAR) {
    return (
      <div 
        data-testid="aar-panel"
        className="w-full h-full flex flex-col justify-center items-center p-12 text-slate-400 font-tactical"
      >
        <Shield className="w-12 h-12 text-cyan-400 mb-3 animate-pulse" />
        <h3 className="text-lg font-bold text-slate-200">NO ACTIVE AAR REPORT AVAILABLE</h3>
        <p className="text-xs text-slate-500 mt-1">Complete a simulation decision gate to view After-Action Review analytics.</p>
      </div>
    );
  }

  const selectedEvent = currentAAR.eventAnalysis.find((e) => e.eventId === selectedEventId) || currentAAR.eventAnalysis[2];

  return (
    <div 
      data-testid="aar-panel"
      className="w-full max-w-7xl mx-auto space-y-6 font-tactical p-4"
    >
      {/* Top Banner & Title */}
      <div className="glass-panel-glow rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 border-cyan-500/40">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">AFTER-ACTION REVIEW (AAR)</h1>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              {currentAAR.sessionId}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-sky-950 text-slate-400 font-mono border border-sky-800">
              SYNTHETIC TRAINING DATA
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            TRAINEE: <strong className="text-slate-200">{currentAAR.traineeName}</strong> | SCENARIO: <strong className="text-slate-200">{currentAAR.scenarioName}</strong> ({currentAAR.difficulty.toUpperCase()})
          </p>
        </div>

        <button
          onClick={() => setShowExportModal(true)}
          data-testid="pdf-export"
          aria-label="Export Official AAR PDF Performance Report"
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-900 hover:bg-sky-800 text-slate-200 border border-sky-700 text-xs font-bold transition-all"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>EXPORT AAR REPORT</span>
        </button>
      </div>

      {/* THREE HEADLINE COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: PERFORMANCE */}
        <div className="glass-panel p-4 rounded-xl border-sky-800/80 space-y-1.5 flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">1. PERFORMANCE</span>
          <div className="flex items-baseline gap-2">
            <span data-testid="aar-score" className="text-4xl font-extrabold text-cyan-400 font-mono">{currentAAR.readinessScore}</span>
            <span className="text-sm text-slate-500">/ 100</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ml-auto border ${
              currentAAR.readinessStatus === 'READY' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
            }`}>
              {currentAAR.readinessStatus}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Weighted score dynamically evaluated from decision inputs.</p>
        </div>

        {/* Column 2: WHY (PRIMARY LEARNING GAP) */}
        <div className="glass-panel p-4 rounded-xl border-amber-500/40 bg-amber-500/5 space-y-1.5 flex flex-col justify-between">
          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> 2. WHY (PRIMARY LEARNING GAP)
          </span>
          <div data-testid="aar-why" className="text-base font-bold text-amber-300 truncate">{currentAAR.primaryLearningGap.title}</div>
          <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">{currentAAR.primaryLearningGap.description}</p>
        </div>

        {/* Column 3: WHAT NEXT (RECOMMENDED DRILL) */}
        <div className="glass-panel-glow p-4 rounded-xl border-cyan-500/50 bg-cyan-950/30 space-y-1.5 flex flex-col justify-between">
          <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider block flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> 3. WHAT NEXT (ADAPTIVE DRILL)
          </span>
          <div data-testid="aar-what-next" className="text-base font-bold text-slate-100 truncate">{currentAAR.nextBestDrill.title}</div>
          <p className="text-[11px] text-cyan-300 font-mono">Multi-Track ({currentAAR.nextBestDrill.trackCount}) + Low Visibility ({currentAAR.nextBestDrill.ambiguity}% ambiguity)</p>
        </div>
      </div>

      {/* STRONG VISUAL MOMENT BANNER */}
      <div 
        data-testid="training-insight"
        className="bg-gradient-to-r from-amber-950/80 via-cyan-950/80 to-sky-950/80 border border-amber-500/60 p-4 rounded-xl text-center space-y-1 shadow-[0_0_25px_rgba(245,158,11,0.2)]"
      >
        <span className="text-xs font-bold text-amber-300 font-mono tracking-widest block uppercase">
          &ldquo;BUT THE SCORE IS NOT THE END.&rdquo;
        </span>
        <h3 className="text-base font-extrabold text-cyan-300 tracking-wider">
          THE SYSTEM IDENTIFIED WHAT TO TRAIN NEXT.
        </h3>
      </div>

      {/* Grid Layout: Detailed Analysis & Adaptive Drill */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Transparent Score Breakdown & Event Timeline Replay (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Transparent Score Breakdown */}
          <div 
            data-testid="score-panel"
            className="glass-panel rounded-xl p-5 space-y-4 border-sky-800/80"
          >
            <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between border-b border-sky-800/60 pb-2.5">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                EXPLAINABLE SCORE BREAKDOWN
              </span>
              <span data-testid="score-total" className="text-cyan-400 font-mono font-bold">{currentAAR.scoreBreakdown.totalScore} / 100</span>
            </h3>

            <div className="space-y-3">
              {[
                { label: 'Detection Latency', weight: '25%', score: currentAAR.scoreBreakdown.detectionLatency, testId: 'score-detection' },
                { label: 'Classification Accuracy', weight: '25%', score: currentAAR.scoreBreakdown.classificationAccuracy, testId: 'score-classification' },
                { label: 'Prioritization Score', weight: '20%', score: currentAAR.scoreBreakdown.prioritizationScore, testId: 'score-prioritization' },
                { label: 'Decision Quality', weight: '20%', score: currentAAR.scoreBreakdown.decisionQuality, testId: 'score-decision' },
                { label: 'Confidence Calibration', weight: '10%', score: currentAAR.scoreBreakdown.confidenceCalibration, testId: 'score-confidence' },
              ].map((item, idx) => {
                const weightedPoints = (item.score * (parseInt(item.weight) / 100)).toFixed(1);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">
                        {item.label} <span className="text-slate-500 text-[10px]">({item.weight})</span>
                      </span>
                      <span data-testid={item.testId} className="font-mono text-cyan-400 font-bold">
                        {item.score}/100 <span className="text-slate-400 font-normal">({weightedPoints} pts)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-sky-950 rounded overflow-hidden border border-sky-800/40">
                      <div
                        className={`h-full transition-all duration-700 ${
                          item.score >= 85 ? 'bg-cyan-400' : item.score >= 70 ? 'bg-amber-400' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Timeline Replay & Event Analysis */}
          <div className="glass-panel rounded-xl p-5 space-y-4 border-sky-800/80">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-sky-800/60 pb-2.5">
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              SESSION TIMELINE REPLAY &amp; EVENT IMPACT
            </h3>

            <div 
              data-testid="aar-event-timeline"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2"
            >
              {currentAAR.eventAnalysis.map((ev, idx) => (
                <button
                  key={ev.eventId}
                  data-testid={`aar-event-0${idx + 1}`}
                  aria-label={`Inspect event ${ev.event} at ${ev.time}`}
                  onClick={() => setSelectedEventId(ev.eventId)}
                  className={`p-2 rounded text-left border transition-all text-xs ${
                    (selectedEventId || 'ev-3') === ev.eventId
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                      : 'bg-sky-950/70 border-sky-800/60 text-slate-400 hover:bg-sky-900'
                  }`}
                >
                  <div className="font-mono text-[10px] text-cyan-400">{ev.time}</div>
                  <div className="truncate text-[11px] mt-0.5">{ev.event}</div>
                </button>
              ))}
            </div>

            {selectedEvent && (
              <div className="bg-sky-950/80 p-4 rounded-lg border border-sky-800/60 space-y-2 text-xs">
                <div className="flex justify-between items-center text-cyan-400 font-bold">
                  <span>EVENT: {selectedEvent.event}</span>
                  <span className="font-mono text-slate-300">Time: {selectedEvent.time}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-sky-800/40 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">RESPONSE LATENCY</span>
                    <span className="font-bold text-slate-200">{selectedEvent.traineeResponseTimeSec} seconds</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">EXPECTED PROCESS</span>
                    <span className="font-bold text-slate-200">{selectedEvent.expectedProcess}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">SCORE IMPACT</span>
                    <span className={`font-bold ${selectedEvent.scoreImpact >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedEvent.scoreImpact >= 0 ? `+${selectedEvent.scoreImpact}` : selectedEvent.scoreImpact} pts
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EXPLAINABLE ENGINE & ML BOUNDARY */}
          <div className="glass-panel rounded-xl p-5 space-y-3 border-sky-800/80">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-sky-800/60 pb-2.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              EXPLAINABLE ADAPTIVE ENGINE &amp; ML INTEGRATION BOUNDARY
            </h3>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                The prototype operates on an <strong className="text-cyan-300">Explainable Adaptive Logic Engine</strong> using deterministic category thresholds.
              </p>
              <div className="bg-sky-950/90 p-3 rounded border border-sky-800/60 space-y-1 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold block">✓ AI / ML ARCHITECTURAL INTEGRATION BOUNDARY:</span>
                <p className="text-slate-400 text-[10px]">
                  Exposes clean REST APIs (<code className="text-cyan-300">/api/v1/decisions/evaluate</code> &amp; <code className="text-cyan-300">/api/v1/adaptive/next-drill</code>) allowing machine learning models to replace rule thresholds seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: WHY THIS NEXT DRILL? */}
        <div className="lg:col-span-5 space-y-6">
          {/* WHY THIS NEXT DRILL? Panel */}
          <div 
            data-testid="next-best-drill"
            className="glass-panel-glow rounded-xl p-5 space-y-4 border-cyan-500/50 bg-cyan-950/20"
          >
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
              <span className="text-xs font-bold text-cyan-400 tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                WHY THIS NEXT DRILL?
              </span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                EXPLAINABLE ADAPTATION
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[10px] uppercase block">PRIMARY LEARNING GAP:</span>
                <span data-testid="learning-gap" className="font-bold text-amber-400 text-sm">{currentAAR.primaryLearningGap.title}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[10px] uppercase block">EVIDENCE &amp; SCORES:</span>
                <p className="text-slate-300 text-[11px]">
                  Prioritization: <strong className="text-amber-400 font-mono">{currentAAR.scoreBreakdown.prioritizationScore}/100</strong> | Confidence Calibration: <strong className="text-cyan-400 font-mono">{currentAAR.scoreBreakdown.confidenceCalibration}/100</strong>
                </p>
              </div>

              <div 
                data-testid="adaptive-update"
                className="space-y-1"
              >
                <span className="text-slate-500 font-mono text-[10px] uppercase block">ADAPTIVE PARAMETER CHANGES:</span>
                <div className="grid grid-cols-3 gap-2 bg-sky-950/90 p-2.5 rounded border border-cyan-500/30 text-[11px] text-center font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">TRACK COUNT</span>
                    <span data-testid="adaptive-track-change" className="font-bold text-cyan-400">{currentAAR.nextBestDrill.trackCount} ({currentAAR.nextBestDrill.parameterAdjustments.trackCountDelta >= 0 ? `+${currentAAR.nextBestDrill.parameterAdjustments.trackCountDelta}` : currentAAR.nextBestDrill.parameterAdjustments.trackCountDelta})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">AMBIGUITY</span>
                    <span data-testid="adaptive-ambiguity-change" className="font-bold text-amber-400">{currentAAR.nextBestDrill.ambiguity}% ({currentAAR.nextBestDrill.parameterAdjustments.ambiguityDeltaPercent >= 0 ? `+${currentAAR.nextBestDrill.parameterAdjustments.ambiguityDeltaPercent}%` : `${currentAAR.nextBestDrill.parameterAdjustments.ambiguityDeltaPercent}%`})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">VISIBILITY</span>
                    <span data-testid="adaptive-visibility-change" className="font-bold text-slate-200">{currentAAR.nextBestDrill.visibility}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-sky-800/40">
                <span className="text-slate-500 font-mono text-[10px] uppercase block">TRAINING OBJECTIVE:</span>
                <p className="text-slate-200 text-[11px]">
                  Improve rapid prioritization and risk matrix elevation when multiple tracks compete for attention under degraded thermal cues.
                </p>
              </div>
            </div>

            <button
              onClick={runNextBestDrill}
              data-testid="run-next-drill"
              aria-label="Run Next Best Training Drill Scenario"
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <span>RUN NEXT DRILL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showExportModal && <ExportPdfModal aar={currentAAR} onClose={() => setShowExportModal(false)} />}
    </div>
  );
};
