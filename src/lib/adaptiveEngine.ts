import { ScoreBreakdown, NextBestDrill, AARReport, TraineeDecision, Scenario } from '../types';
import { calculateScore } from './scoringEngine';

export function analyzeSessionPerformance(
  decision: TraineeDecision,
  scenario: Scenario,
  traineeName = 'A. KUMAR',
  sessionId = 'SESSION-018'
): AARReport {
  const { scoreBreakdown } = calculateScore(decision, scenario);

  const scores = [
    { name: 'Detection Latency', score: scoreBreakdown.detectionLatency, weight: 0.25 },
    { name: 'Classification Accuracy', score: scoreBreakdown.classificationAccuracy, weight: 0.25 },
    { name: 'Prioritization', score: scoreBreakdown.prioritizationScore, weight: 0.20 },
    { name: 'Decision Quality', score: scoreBreakdown.decisionQuality, weight: 0.20 },
    { name: 'Confidence Calibration', score: scoreBreakdown.confidenceCalibration, weight: 0.10 }
  ];

  scores.sort((a, b) => a.score - b.score);
  const weakest = scores[0];

  let nextTrackCount = scenario.trackCount;
  let nextAmbiguity = scenario.ambiguity;
  let nextVisibility = scenario.visibility;
  let deltaTrack = 0;
  let deltaAmbiguity = 0;
  let deltaVisibility = 0;

  let gapTitle = 'Prioritization Under Ambiguity';
  let gapDesc = 'The trainee correctly detected tracks but delayed prioritization after the secondary cue emerged under low visibility.';
  let gapEvidence = 'Reaction latency to Track 02 emergence was 4.2s with 63% confidence, delaying priority flag by 8 seconds.';
  let gapImpact = 'Prioritization category score dropped to 71/100, impacting overall training readiness.';

  // Case D: Overall Poor Performance (<65) -> Pedagogical Reinforcement Scenario (Do not jump difficulty!)
  if (scoreBreakdown.totalScore < 65) {
    nextTrackCount = Math.max(2, scenario.trackCount - 1);
    nextAmbiguity = Math.max(30, scenario.ambiguity - 20);
    nextVisibility = 'Medium';
    deltaTrack = -1;
    deltaAmbiguity = -20;
    deltaVisibility = 10;
    gapTitle = 'Fundamental Cue Recognition';
    gapDesc = 'Trainee experienced cumulative hesitation under degraded thermal cues.';
    gapEvidence = 'Multiple track dropouts led to classification delay.';
    gapImpact = 'Reinforcement drill assigned to solidify core detection and classification reflexes.';
  }
  // Case A: Strong classification & detection, weak prioritization
  else if (scoreBreakdown.classificationAccuracy >= 85 && scoreBreakdown.detectionLatency >= 85 && scoreBreakdown.prioritizationScore < 78) {
    deltaTrack = 1;
    deltaAmbiguity = 15;
    deltaVisibility = -10;
    nextTrackCount = Math.min(6, scenario.trackCount + 1);
    nextAmbiguity = Math.min(95, scenario.ambiguity + 15);
    nextVisibility = 'Low';
    gapTitle = 'Multi-Track Prioritization under Ambiguity';
    gapDesc = 'Trainee struggled with rapid priority assignment when secondary track emerged during high sensor noise.';
  }
  // Case B: Weak confidence calibration (<70)
  else if (scoreBreakdown.confidenceCalibration < 70) {
    deltaAmbiguity = 25;
    nextAmbiguity = Math.min(95, scenario.ambiguity + 25);
    gapTitle = 'Confidence Calibration under Ambiguous Cues';
    gapDesc = 'Trainee expressed 82% confidence despite high sensor ambiguity (65%) and intermittent tracks.';
  }
  // Case C: Strong performance across all categories (>85)
  else if (scoreBreakdown.totalScore >= 85) {
    deltaTrack = 1;
    deltaAmbiguity = 10;
    nextTrackCount = Math.min(6, scenario.trackCount + 1);
    nextAmbiguity = Math.min(90, scenario.ambiguity + 10);
    gapTitle = 'Advanced Swarm Correlation';
    gapDesc = 'Trainee demonstrated high baseline readiness. Escalating to advanced multi-track density.';
  }

  const nextBestDrill: NextBestDrill = {
    id: `drill-next-${Math.floor(Math.random() * 8999 + 1000)}`,
    title: scoreBreakdown.totalScore < 65 ? 'Reinforcement Baseline Drill' : 'Advanced Multi-Track Night Drill',
    targetSkill: weakest.name,
    difficulty: scoreBreakdown.totalScore < 65 ? 'Intermediate' : 'Advanced',
    terrain: scenario.terrain,
    timeOfDay: 'Night',
    visibility: nextVisibility,
    sensorQuality: 'Degraded',
    trackCount: nextTrackCount,
    ambiguity: nextAmbiguity,
    reason: `Scenario difficulty automatically adjusted to target the trainee's weakest competency (${weakest.name}: ${weakest.score}/100).`,
    parameterAdjustments: {
      trackCountDelta: deltaTrack,
      ambiguityDeltaPercent: deltaAmbiguity,
      visibilityDeltaPercent: deltaVisibility
    }
  };

  const statusVal: 'OPTIMAL' | 'OVERCONFIDENT' | 'UNDERCONFIDENT' | 'NEEDS_IMPROVEMENT' = 
    (decision.confidence - scoreBreakdown.classificationAccuracy > 12)
      ? 'OVERCONFIDENT'
      : (scoreBreakdown.classificationAccuracy - decision.confidence > 12)
      ? 'UNDERCONFIDENT'
      : 'OPTIMAL';

  const confidenceCalibrationAnalysis = {
    traineeConfidence: decision.confidence,
    actualAccuracy: scoreBreakdown.classificationAccuracy,
    calibrationDelta: decision.confidence - scoreBreakdown.classificationAccuracy,
    status: statusVal,
    insight: decision.confidence > scoreBreakdown.classificationAccuracy + 10
      ? `You expressed ${decision.confidence}% confidence despite high sensor ambiguity (65%). Practice calibrating confidence to sensor quality.`
      : `Good calibration between stated confidence (${decision.confidence}%) and actual classification accuracy (${scoreBreakdown.classificationAccuracy}%).`
  };

  const aiTrainingAnalysis = {
    observedPattern: 'Multi-track ambiguity under degraded sensor noise',
    modelConfidence: 87,
    evidenceList: [
      '3 correlated synthetic track observations',
      '2 stable tracks, 1 intermittent cue',
      '4.2s response latency on secondary track escalation'
    ],
    trainingImplication: `Increase prioritization complexity: +${nextBestDrill.parameterAdjustments.trackCountDelta} track, +${nextBestDrill.parameterAdjustments.ambiguityDeltaPercent}% ambiguity adjustment.`
  };

  const readinessStatus = scoreBreakdown.totalScore >= 80 ? 'READY' : scoreBreakdown.totalScore >= 65 ? 'DEVELOPING' : 'NEEDS_REMEDIATION';

  return {
    sessionId,
    scenarioName: scenario.name,
    difficulty: scenario.difficulty,
    traineeName,
    readinessScore: scoreBreakdown.totalScore,
    readinessStatus,
    scoreBreakdown,
    strengths: [
      'Strong initial detection latency (3.2s on Track 01)',
      'Accurate classification of primary drone threat signature',
      'Doctrine-compliant training response procedure'
    ],
    primaryLearningGap: {
      title: gapTitle,
      description: gapDesc,
      evidence: gapEvidence,
      impact: gapImpact
    },
    confidenceCalibrationAnalysis,
    aiTrainingAnalysis,
    eventAnalysis: [
      { eventId: 'ev-1', time: '00:07', event: 'Initial Thermal Cue Detected', traineeResponseTimeSec: 2.1, expectedProcess: 'Acknowledge sector scan', scoreImpact: 0 },
      { eventId: 'ev-2', time: '00:11', event: 'Track 01 Lock Established', traineeResponseTimeSec: 1.8, expectedProcess: 'Track classification', scoreImpact: +5 },
      { eventId: 'ev-3', time: '00:18', event: 'Secondary Track Emergence', traineeResponseTimeSec: 4.2, expectedProcess: 'Reassess priority & risk matrix', scoreImpact: -8 },
      { eventId: 'ev-4', time: '00:34', event: 'Decision Gate Submission', traineeResponseTimeSec: decision.latencySec, expectedProcess: 'Submit threat classification', scoreImpact: +12 }
    ],
    nextBestDrill
  };
}
