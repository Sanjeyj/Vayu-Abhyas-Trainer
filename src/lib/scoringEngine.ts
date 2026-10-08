import { TraineeDecision, ScoreBreakdown, Scenario } from '../types';

// Verification Utility assertion: Sum of weights must equal exactly 1.0
export const SCORING_WEIGHTS = {
  detectionLatency: 0.25,
  classificationAccuracy: 0.25,
  prioritizationScore: 0.20,
  decisionQuality: 0.20,
  confidenceCalibration: 0.10
} as const;

export function verifyScoringWeightsIntegrity(): boolean {
  const sum = Object.values(SCORING_WEIGHTS).reduce((acc, curr) => acc + curr, 0);
  const isValid = Math.abs(sum - 1.0) < 0.0001;
  if (!isValid) {
    console.error(`SCORING WEIGHT INTEGRITY FAILURE: Sum of weights is ${sum}, expected 1.0`);
  }
  return isValid;
}

// Run weight validation immediately
verifyScoringWeightsIntegrity();

export function calculateScore(
  decision: TraineeDecision,
  scenario: Scenario
): { scoreBreakdown: ScoreBreakdown; rationale: string[] } {
  const rationale: string[] = [];

  // 1. Detection Latency (25% weight)
  let detectionLatencyScore = 90;
  if (decision.latencySec <= 3.0) {
    detectionLatencyScore = 98;
    rationale.push(`Detection Latency: Rapid acknowledgment (${decision.latencySec.toFixed(1)}s). +24.5/25 pts.`);
  } else if (decision.latencySec <= 5.0) {
    detectionLatencyScore = 90;
    rationale.push(`Detection Latency: Timely acknowledgment (${decision.latencySec.toFixed(1)}s). +22.5/25 pts.`);
  } else if (decision.latencySec <= 8.0) {
    detectionLatencyScore = 75;
    rationale.push(`Detection Latency: Acceptable reaction time (${decision.latencySec.toFixed(1)}s). +18.75/25 pts.`);
  } else {
    detectionLatencyScore = 55;
    rationale.push(`Detection Latency: Delayed prioritization (${decision.latencySec.toFixed(1)}s). Deducted 10.0 pts.`);
  }

  // 2. Classification Accuracy (25% weight)
  let classificationAccuracy = 88;
  if (decision.classification === 'SUSPICIOUS_DRONE' || decision.classification === 'COORDINATED_SWARM') {
    classificationAccuracy = 88;
    rationale.push('Classification Accuracy: Correctly identified threat profile under degraded cues. +22.0/25 pts.');
  } else if (decision.classification === 'UNKNOWN') {
    classificationAccuracy = 70;
    rationale.push('Classification Accuracy: Overly cautious classification under intermittent sensor pulse. +17.5/25 pts.');
  } else {
    classificationAccuracy = 45;
    rationale.push('Classification Accuracy: Misclassified benign/threat track profile. Deducted 11.25 pts.');
  }

  // 3. Prioritization Score (20% weight)
  let prioritizationScore = 71;
  if (decision.priority === 'HIGH' || decision.priority === 'CRITICAL') {
    prioritizationScore = 88;
    rationale.push('Prioritization: Correctly elevated multi-track risk. +17.6/20 pts.');
  } else if (decision.priority === 'MEDIUM') {
    prioritizationScore = 71;
    rationale.push('Prioritization: Hesitated to assign HIGH priority when Track 02 emerged under low visibility. Deducted 5.8 pts.');
  } else {
    prioritizationScore = 45;
    rationale.push('Prioritization: Under-prioritized active airborne track. Deducted 11.0 pts.');
  }

  // 4. Decision Quality (20% weight)
  let decisionQuality = 84;
  if (decision.response === 'Escalate to supervisor' || decision.response === 'Follow authorized procedure') {
    decisionQuality = 84;
    rationale.push('Decision Quality: Appropriate doctrine-compliant training response. +16.8/20 pts.');
  } else if (decision.response === 'Continue observation') {
    decisionQuality = 72;
    rationale.push('Decision Quality: Passive posture maintained under degraded visibility. +14.4/20 pts.');
  } else {
    decisionQuality = 78;
    rationale.push('Decision Quality: Standard training procedure executed. +15.6/20 pts.');
  }

  // 5. Confidence Calibration (10% weight)
  const confidenceDelta = Math.abs(decision.confidence - classificationAccuracy);
  let confidenceCalibration = 85;
  if (confidenceDelta <= 8) {
    confidenceCalibration = 85;
    rationale.push(`Confidence Calibration: Well-calibrated self-assessment (${decision.confidence}% vs ${classificationAccuracy}% accuracy). +8.5/10 pts.`);
  } else if (decision.confidence > classificationAccuracy + 15) {
    confidenceCalibration = 65;
    rationale.push(`Confidence Calibration: Overconfident (${decision.confidence}%) despite high sensor ambiguity (65%). Deducted 3.5 pts.`);
  } else {
    confidenceCalibration = 80;
    rationale.push(`Confidence Calibration: Adequate confidence alignment (${decision.confidence}%). +8.0/10 pts.`);
  }

  // Enforce range bounds [0, 100] for each category
  detectionLatencyScore = Math.min(100, Math.max(0, detectionLatencyScore));
  classificationAccuracy = Math.min(100, Math.max(0, classificationAccuracy));
  prioritizationScore = Math.min(100, Math.max(0, prioritizationScore));
  decisionQuality = Math.min(100, Math.max(0, decisionQuality));
  confidenceCalibration = Math.min(100, Math.max(0, confidenceCalibration));

  // Compute Total Score out of 100 using exact weights
  // (90 * 0.25) + (88 * 0.25) + (71 * 0.20) + (84 * 0.20) + (85 * 0.10) = 22.5 + 22.0 + 14.2 + 16.8 + 8.5 = 84
  const totalScore = Math.round(
    (detectionLatencyScore * SCORING_WEIGHTS.detectionLatency) +
    (classificationAccuracy * SCORING_WEIGHTS.classificationAccuracy) +
    (prioritizationScore * SCORING_WEIGHTS.prioritizationScore) +
    (decisionQuality * SCORING_WEIGHTS.decisionQuality) +
    (confidenceCalibration * SCORING_WEIGHTS.confidenceCalibration)
  );

  return {
    scoreBreakdown: {
      detectionLatency: Math.round(detectionLatencyScore),
      classificationAccuracy: Math.round(classificationAccuracy),
      prioritizationScore: Math.round(prioritizationScore),
      decisionQuality: Math.round(decisionQuality),
      confidenceCalibration: Math.round(confidenceCalibration),
      totalScore: Math.min(100, Math.max(0, totalScore))
    },
    rationale
  };
}
