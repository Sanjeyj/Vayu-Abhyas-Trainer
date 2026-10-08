import React from 'react';
import { AARReport } from '../../types';
import { Download, Printer, X, Shield, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  aar: AARReport;
  onClose: () => void;
}

export const ExportPdfModal: React.FC<Props> = ({ aar, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl glass-panel rounded-xl border border-cyan-500/50 p-6 space-y-6 font-tactical text-xs text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Modal Controls */}
        <div className="flex items-center justify-between border-b border-sky-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100">OFFICIAL AAR TRAINING PERFORMANCE REPORT</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-900 hover:bg-sky-800 text-cyan-300 border border-sky-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Box */}
        <div className="bg-slate-950 p-6 rounded-lg border border-sky-800 space-y-5 print:bg-white print:text-black">
          {/* Document Header */}
          <div className="flex justify-between items-start border-b border-sky-800/80 pb-4">
            <div>
              <h1 className="text-lg font-bold text-cyan-400 tracking-wider">DEFENCE SERVICES STAFF COLLEGE</h1>
              <p className="text-xs text-slate-400">SENTINEL SKYLAB — DRONE THREAT SIMULATION TRAINER (PS 26247)</p>
            </div>
            <div className="text-right font-mono text-[11px] text-slate-400">
              <div>REPORT ID: <strong className="text-slate-200">{aar.sessionId}</strong></div>
              <div>DATE: {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Trainee & Session Info Table */}
          <div className="grid grid-cols-2 gap-4 bg-sky-900/30 p-3 rounded border border-sky-800/50">
            <div>
              <span className="text-slate-500 text-[10px] block">TRAINEE NAME</span>
              <span className="font-bold text-slate-100 text-sm">{aar.traineeName}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">SCENARIO</span>
              <span className="font-bold text-slate-100 text-sm">{aar.scenarioName} ({aar.difficulty})</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">READINESS SCORE</span>
              <span className="font-bold text-cyan-400 text-base">{aar.readinessScore} / 100 ({aar.readinessStatus})</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">PRIMARY GAP</span>
              <span className="font-bold text-amber-400">{aar.primaryLearningGap.title}</span>
            </div>
          </div>

          {/* Category Scores */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-200 border-b border-sky-800/60 pb-1">COMPETENCY EVALUATION BREAKDOWN</h3>
            <div className="grid grid-cols-5 gap-2 text-center font-mono">
              <div className="bg-sky-900/40 p-2 rounded border border-sky-800/40">
                <span className="text-slate-500 text-[9px] block">DETECTION</span>
                <span className="font-bold text-cyan-400">{aar.scoreBreakdown.detectionLatency}/100</span>
              </div>
              <div className="bg-sky-900/40 p-2 rounded border border-sky-800/40">
                <span className="text-slate-500 text-[9px] block">CLASSIFY</span>
                <span className="font-bold text-cyan-400">{aar.scoreBreakdown.classificationAccuracy}/100</span>
              </div>
              <div className="bg-sky-900/40 p-2 rounded border border-sky-800/40">
                <span className="text-slate-500 text-[9px] block">PRIORITIZE</span>
                <span className="font-bold text-amber-400">{aar.scoreBreakdown.prioritizationScore}/100</span>
              </div>
              <div className="bg-sky-900/40 p-2 rounded border border-sky-800/40">
                <span className="text-slate-500 text-[9px] block">DECISION</span>
                <span className="font-bold text-cyan-400">{aar.scoreBreakdown.decisionQuality}/100</span>
              </div>
              <div className="bg-sky-900/40 p-2 rounded border border-sky-800/40">
                <span className="text-slate-500 text-[9px] block">CONFIDENCE</span>
                <span className="font-bold text-cyan-400">{aar.scoreBreakdown.confidenceCalibration}/100</span>
              </div>
            </div>
          </div>

          {/* Primary Learning Gap & Recommendation */}
          <div className="space-y-2 bg-amber-500/10 p-3 rounded border border-amber-500/30">
            <h3 className="font-bold text-amber-300">ADAPTIVE REMEDIATION RECOMMENDATION</h3>
            <p className="text-slate-300">{aar.nextBestDrill.reason}</p>
            <div className="font-mono text-cyan-400 font-bold">
              GENERATED DRILL: {aar.nextBestDrill.title} (Track Count: {aar.nextBestDrill.trackCount}, Ambiguity: {aar.nextBestDrill.ambiguity}%)
            </div>
          </div>

          {/* Footer Official Stamp */}
          <div className="pt-4 border-t border-sky-800/80 flex justify-between items-center text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>DIGITALLY VERIFIED BY SENTINEL SKYLAB ADAPTIVE ENGINE</span>
            </div>
            <span>DEFENCE SERVICES STAFF COLLEGE — CONFIDENTIAL TRAINING RECORD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
