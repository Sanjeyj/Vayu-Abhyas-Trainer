import React, { useState } from 'react';
import { runDomQaSuite, DomQaReport } from '../../lib/qaSuite';
import { CheckCircle2, XCircle, Play, Shield, RefreshCw, Layers, Award } from 'lucide-react';

interface DomQaRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomQaRunnerModal: React.FC<DomQaRunnerModalProps> = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<DomQaReport | null>(null);

  if (!isOpen) return null;

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const res = await runDomQaSuite();
      setReport(res);
    } catch (e) {
      console.error('QA Suite error:', e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-tactical">
      <div className="bg-[#0B132B] border border-cyan-500/40 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_0_30px_rgba(6,182,212,0.25)] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#0F1A36] border-b border-sky-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/40">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2 font-mono">
                VAYU ABHYAS — DOM HARDENING QA TEST RUNNER
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Deterministic DOM Access &amp; Judge Verification Suite (10 Test Cases)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs text-slate-400 hover:text-slate-100 bg-slate-800/60 hover:bg-slate-700/60 rounded border border-slate-700/60"
          >
            Close
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5">
          {/* Status Top Box */}
          <div className="p-4 rounded-lg bg-[#070D1E] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Target Protocol</div>
              <div className="text-sm font-bold text-cyan-300 font-mono">
                SIH 26247 — Defensive Decision Training Telemetry
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                data-testid="run-dom-qa-suite"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>EXECUTING SUITE...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>RUN ALL 10 DOM TESTS</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Summary */}
          {report && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border font-mono flex items-center justify-between ${
                  report.overallStatus === 'DOM JUDGE FLOW: PASS'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Final Qualification</div>
                    <div className="text-base font-extrabold">{report.overallStatus}</div>
                  </div>
                </div>
                <div className="text-right text-xs font-mono">
                  <div>Passed: {report.passed} / {report.totalTests}</div>
                  <div>DOM Selectors Exposed: {report.domCoverageCount}</div>
                </div>
              </div>

              {/* Individual Test Cards */}
              <div className="space-y-2">
                {report.results.map((res) => (
                  <div
                    key={res.id}
                    className="p-3 rounded bg-[#091124] border border-sky-950 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      {res.status === 'PASS' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-slate-200 flex items-center gap-2">
                          <span className="text-cyan-400 font-mono">{res.id}</span>
                          <span>{res.name}</span>
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5 font-mono">{res.details}</div>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-500 font-mono shrink-0">
                      {res.durationMs}ms
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!report && !isRunning && (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 font-mono text-xs">
              <Layers className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              Click &quot;RUN ALL 10 DOM TESTS&quot; to execute automated DOM assertion pass against the Zustand state machine and semantic DOM elements.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0A0F1D] border-t border-sky-800/60 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-bold font-mono"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
