import React from 'react';
import { useStore } from '../../store/useStore';
import { Sparkles, ArrowRight, X, RefreshCw } from 'lucide-react';

export const JudgeDemoBanner: React.FC = () => {
  const judgeDemoMode = useStore((s) => s.judgeDemoMode);
  const judgeDemoStep = useStore((s) => s.judgeDemoStep);
  const judgeDemoHintText = useStore((s) => s.judgeDemoHintText);
  const advanceJudgeDemoStep = useStore((s) => s.advanceJudgeDemoStep);
  const startJudgeDemo = useStore((s) => s.startJudgeDemo);
  const resetJudgeDemo = useStore((s) => s.resetJudgeDemo);

  if (!judgeDemoMode) return null;

  const steps = [
    { key: 'STEP_01_OBSERVE', num: '01 / 05', label: 'OBSERVE', testId: 'demo-step-observe' },
    { key: 'STEP_02_ASSESS', num: '02 / 05', label: 'ASSESS', testId: 'demo-step-assess' },
    { key: 'STEP_03_DECIDE', num: '03 / 05', label: 'DECIDE', testId: 'demo-step-decide' },
    { key: 'STEP_04_REVIEW', num: '04 / 05', label: 'REVIEW', testId: 'demo-step-review' },
    { key: 'STEP_05_ADAPT', num: '05 / 05', label: 'ADAPT', testId: 'demo-step-adapt' },
  ];

  const currentStepObj = steps.find((s) => s.key === judgeDemoStep) || steps[0];

  return (
    <div 
      data-testid="judge-demo-banner"
      className="w-full bg-gradient-to-r from-cyan-950 via-sky-900 to-amber-950 border-b border-cyan-500/50 p-3 px-6 flex flex-wrap items-center justify-between gap-3 font-tactical text-xs text-slate-100 shadow-[0_4px_20px_rgba(6,182,212,0.25)] sticky top-0 z-40"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>JUDGE DEMONSTRATION</span>
        </div>

        {/* 5-Step Progress Pills with aria-current="step" */}
        <div className="hidden md:flex items-center gap-1 font-mono text-[11px]">
          {steps.map((s) => {
            const isCurrent = s.key === judgeDemoStep;
            return (
              <span
                key={s.key}
                data-testid={s.testId}
                aria-current={isCurrent ? 'step' : undefined}
                className={`px-2 py-0.5 rounded border transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                    : 'bg-sky-950/60 text-slate-400 border-sky-800'
                }`}
              >
                {s.num} {s.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Center Step Hint text */}
      <div 
        data-testid="judge-demo-hint"
        className="flex-1 max-w-xl text-center text-slate-200 text-xs font-medium truncate"
      >
        {judgeDemoHintText}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={startJudgeDemo}
          data-testid="restore-judge-demo"
          aria-label="Restore Judge Demo VAYU-DEMO-01 State"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-900 hover:bg-sky-800 text-amber-300 border border-sky-700 font-bold transition-all text-xs"
          title="Restore VAYU-DEMO-01 state"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RESTORE DEMO</span>
        </button>

        <button
          onClick={advanceJudgeDemoStep}
          data-testid="advance-judge-demo"
          aria-label={`Advance Step (${currentStepObj.num})`}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-extrabold transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] text-xs"
        >
          <span>ADVANCE STEP ({currentStepObj.num})</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={resetJudgeDemo}
          aria-label="Exit Judge Demo Mode"
          className="p-1.5 rounded hover:bg-sky-800 text-slate-400 hover:text-slate-200"
          title="Exit Judge Demo Mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
