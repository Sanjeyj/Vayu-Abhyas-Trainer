export type TerrainType = 'Urban' | 'Rural' | 'Industrial' | 'Coastal' | 'Mountain';
export type TimeOfDay = 'Day' | 'Night' | 'Dawn' | 'Dusk';
export type VisibilityLevel = 'High' | 'Medium' | 'Low' | 'Zero';
export type SensorQuality = 'Normal' | 'Degraded' | 'Intermittent' | 'Low Visibility' | 'Occluded';
export type DifficultyLevel = 'Foundation' | 'Intermediate' | 'Advanced' | 'Expert';

export type TrackStatus = 'stable' | 'ambiguous' | 'intermittent' | 'emerging' | 'resolved';
export type TrackClassification = 'UNKNOWN' | 'BENIGN_AERIAL' | 'SUSPICIOUS_DRONE' | 'COORDINATED_SWARM' | 'HOSTILE_UAV';
export type TrackPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type DefensiveResponse = 
  | 'Continue observation'
  | 'Monitor'
  | 'Elevate'
  | 'Escalate to supervisor'
  | 'Follow authorized procedure'
  | 'Hold and reassess';

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface TrackObservation {
  timestamp: string;
  altitude: number;
  speed: number;
  heading: number;
  rfSignature: string;
  radarCrossSection: string;
  note: string;
}

export interface SimulatedTrack {
  id: string;
  label: string;
  confidence: number; // 0 - 100
  status: TrackStatus;
  classification: TrackClassification;
  priority: TrackPriority;
  position: Position3D;
  targetPosition: Position3D;
  speed: number;
  altitude: number;
  heading: number;
  trail: Position3D[];
  observationsCount: number;
  rfSignature: string;
  isThreat: boolean;
  firstObservedAt: number; // seconds into scenario
  history: TrackObservation[];
}

export interface TimelineEvent {
  id: string;
  timestampSec: number;
  timestampStr: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'alert' | 'decision';
  trackId?: string;
  acknowledged?: boolean;
}

export interface Scenario {
  id: string;
  seed: string;
  name: string;
  terrain: TerrainType;
  timeOfDay: TimeOfDay;
  visibility: VisibilityLevel;
  sensorQuality: SensorQuality;
  difficulty: DifficultyLevel;
  trackCount: number;
  ambiguity: number; // 0 - 100%
  description: string;
  durationSec: number;
  decisionTimeSec: number;
  events: TimelineEvent[];
  initialTracks: SimulatedTrack[];
}

export interface TraineeDecision {
  classification: TrackClassification;
  confidence: number; // 0-100 slider
  priority: TrackPriority;
  response: DefensiveResponse;
  latencySec: number;
  timestamp: string;
}

export interface ScoreBreakdown {
  detectionLatency: number; // 0-100 (25% weight)
  classificationAccuracy: number; // 0-100 (25% weight)
  prioritizationScore: number; // 0-100 (20% weight)
  decisionQuality: number; // 0-100 (20% weight)
  confidenceCalibration: number; // 0-100 (10% weight)
  totalScore: number;
}

export interface NextBestDrill {
  id: string;
  title: string;
  targetSkill: string;
  difficulty: DifficultyLevel;
  terrain: TerrainType;
  timeOfDay: TimeOfDay;
  visibility: VisibilityLevel;
  sensorQuality: SensorQuality;
  trackCount: number;
  ambiguity: number;
  reason: string;
  parameterAdjustments: {
    trackCountDelta: number;
    ambiguityDeltaPercent: number;
    visibilityDeltaPercent: number;
  };
}

export interface AARReport {
  sessionId: string;
  scenarioName: string;
  difficulty: DifficultyLevel;
  traineeName: string;
  readinessScore: number;
  readinessStatus: 'READY' | 'DEVELOPING' | 'NEEDS_REMEDIATION';
  scoreBreakdown: ScoreBreakdown;
  strengths: string[];
  primaryLearningGap: {
    title: string;
    description: string;
    evidence: string;
    impact: string;
  };
  confidenceCalibrationAnalysis: {
    traineeConfidence: number;
    actualAccuracy: number;
    calibrationDelta: number;
    status: 'OPTIMAL' | 'OVERCONFIDENT' | 'UNDERCONFIDENT' | 'NEEDS_IMPROVEMENT';
    insight: string;
  };
  aiTrainingAnalysis: {
    observedPattern: string;
    modelConfidence: number;
    evidenceList: string[];
    trainingImplication: string;
  };
  eventAnalysis: {
    eventId: string;
    time: string;
    event: string;
    traineeResponseTimeSec: number;
    expectedProcess: string;
    scoreImpact: number;
  }[];
  nextBestDrill: NextBestDrill;
}

export interface Trainee {
  id: string;
  name: string;
  rank: string;
  unit: string;
  avatarUrl?: string;
  readinessScore: number; // 0-100
  trend: 'UP' | 'STABLE' | 'DOWN';
  trendValue: number; // e.g. +11%
  sessionsCompleted: number;
  avgDetectionLatencySec: number;
  classificationAccuracyPercent: number;
  prioritizationScorePercent: number;
  decisionQualityPercent: number;
  confidenceCalibrationPercent: number;
  historyScores: number[]; // e.g. [62, 68, 71, 76, 79, 84, 87]
  lastActive: string;
  primarySkillGap: string;
}

export interface TrainingSession {
  id: string;
  traineeId: string;
  traineeName: string;
  scenarioId: string;
  scenarioName: string;
  difficulty: DifficultyLevel;
  score: number;
  decisionQuality: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'READY';
  date: string;
}

export type ViewMode = 
  | 'landing'
  | 'dashboard'
  | 'simulation'
  | 'decision'
  | 'aar'
  | 'instructor'
  | 'trainees'
  | 'analytics'
  | 'scenarios'
  | 'differentiation'
  | 'ps-coverage'
  | 'architecture'
  | 'settings';

export type JudgeDemoStep = 
  | 'IDLE'
  | 'STEP_01_OBSERVE'
  | 'STEP_02_ASSESS'
  | 'STEP_03_DECIDE'
  | 'STEP_04_REVIEW'
  | 'STEP_05_ADAPT';
