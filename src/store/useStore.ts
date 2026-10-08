import { create } from 'zustand';
import { ViewMode, JudgeDemoStep, Scenario, SimulatedTrack, TimelineEvent, TraineeDecision, AARReport, Trainee } from '../types';
import { createPresetScenario, generateProceduralScenario, generateSeed } from '../lib/scenarioEngine';
import { analyzeSessionPerformance } from '../lib/adaptiveEngine';
import { MOCK_TRAINEES } from '../lib/mockData';

interface AppState {
  // Navigation & View
  currentView: ViewMode;
  isOfflineMode: boolean;
  isDomQaModalOpen: boolean;
  
  // Judge Demo state
  judgeDemoMode: boolean;
  judgeDemoStep: JudgeDemoStep;
  judgeDemoHintText: string;

  // Active Simulation state
  activeScenario: Scenario;
  activeTracks: SimulatedTrack[];
  timelineEvents: TimelineEvent[];
  selectedTrackId: string | null;
  sensorDegraded: boolean;
  simTimeSec: number;
  isSimPaused: boolean;

  // Decision & Assessment
  isDecisionGateOpen: boolean;
  currentDecision: TraineeDecision | null;
  currentAAR: AARReport | null;

  // Active Trainee & Unit
  activeTrainee: Trainee;
  traineesList: Trainee[];

  // Actions
  setView: (view: ViewMode) => void;
  setOfflineMode: (offline: boolean) => void;
  setDomQaModalOpen: (open: boolean) => void;
  startJudgeDemo: () => void;
  advanceJudgeDemoStep: () => void;
  resetJudgeDemo: () => void;
  
  // Sim Actions
  selectTrack: (trackId: string | null) => void;
  toggleSensorDegradation: () => void;
  setSimTime: (timeSec: number) => void;
  setSimPaused: (paused: boolean) => void;
  openDecisionGate: () => void;
  closeDecisionGate: () => void;
  
  // Core Workflow Actions
  submitDecision: (decision: TraineeDecision) => void;
  runNextBestDrill: () => void;
  loadScenario: (scenario: Scenario) => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentView: 'landing',
  isOfflineMode: false,
  isDomQaModalOpen: false,

  judgeDemoMode: false,
  judgeDemoStep: 'IDLE',
  judgeDemoHintText: '',

  activeScenario: createPresetScenario('JUDGE_DEMO'),
  activeTracks: createPresetScenario('JUDGE_DEMO').initialTracks,
  timelineEvents: createPresetScenario('JUDGE_DEMO').events,
  selectedTrackId: 'TRK-01',
  sensorDegraded: true,
  simTimeSec: 0,
  isSimPaused: false,

  isDecisionGateOpen: false,
  currentDecision: null,
  currentAAR: null,

  activeTrainee: MOCK_TRAINEES[0],
  traineesList: MOCK_TRAINEES,

  setView: (view) => set({ currentView: view }),
  setOfflineMode: (offline) => set({ isOfflineMode: offline }),
  setDomQaModalOpen: (open) => set({ isDomQaModalOpen: open }),

  startJudgeDemo: () => {
    const judgeScenario = createPresetScenario('JUDGE_DEMO');
    set({
      judgeDemoMode: true,
      judgeDemoStep: 'STEP_01_OBSERVE',
      judgeDemoHintText: 'Step 1 of 5 (OBSERVE): Emerging Track 01 thermal cue detected. Observe track velocity and initial sector scan.',
      currentView: 'simulation',
      activeScenario: judgeScenario,
      activeTracks: judgeScenario.initialTracks,
      timelineEvents: judgeScenario.events,
      selectedTrackId: 'TRK-01',
      sensorDegraded: true,
      simTimeSec: 10,
      isSimPaused: false,
      isDecisionGateOpen: false,
      currentDecision: null,
      currentAAR: null
    });
  },

  advanceJudgeDemoStep: () => {
    const currentStep = get().judgeDemoStep;
    if (currentStep === 'STEP_01_OBSERVE') {
      set({
        judgeDemoStep: 'STEP_02_ASSESS',
        simTimeSec: 23,
        selectedTrackId: 'TRK-02',
        sensorDegraded: true,
        judgeDemoHintText: 'Step 2 of 5 (ASSESS): Secondary Track 02 emerged. Sensor link quality degraded by 35% with intermittent cues.'
      });
    } else if (currentStep === 'STEP_02_ASSESS') {
      set({
        judgeDemoStep: 'STEP_03_DECIDE',
        simTimeSec: 34,
        isSimPaused: true,
        isDecisionGateOpen: true,
        judgeDemoHintText: 'Step 3 of 5 (DECIDE): Decision Gate reached. Evaluate threat classification, confidence slider, priority, and response.'
      });
    } else if (currentStep === 'STEP_03_DECIDE') {
      const defaultDecision: TraineeDecision = get().currentDecision || {
        classification: 'SUSPICIOUS_DRONE',
        confidence: 82,
        priority: 'MEDIUM',
        response: 'Escalate to supervisor',
        latencySec: 4.2,
        timestamp: '00:34'
      };
      get().submitDecision(defaultDecision);
      set({
        judgeDemoStep: 'STEP_04_REVIEW',
        judgeDemoHintText: 'Step 4 of 5 (REVIEW): Review 84/100 readiness score, 5-part category breakdown, and primary learning gap.'
      });
    } else if (currentStep === 'STEP_04_REVIEW') {
      set({
        judgeDemoStep: 'STEP_05_ADAPT',
        judgeDemoHintText: 'Step 5 of 5 (ADAPT): Adaptive engine automatically generated Next-Best Drill scenario targeting Prioritization.'
      });
      setTimeout(() => {
        get().runNextBestDrill();
      }, 500);
    } else if (currentStep === 'STEP_05_ADAPT') {
      get().runNextBestDrill();
    }
  },

  resetJudgeDemo: () => {
    set({
      judgeDemoMode: false,
      judgeDemoStep: 'IDLE',
      judgeDemoHintText: ''
    });
  },

  selectTrack: (trackId) => set({ selectedTrackId: trackId }),
  toggleSensorDegradation: () => set((state) => ({ sensorDegraded: !state.sensorDegraded })),
  setSimTime: (timeSec) => set({ simTimeSec: timeSec }),
  setSimPaused: (paused) => set({ isSimPaused: paused }),
  openDecisionGate: () => set({ isDecisionGateOpen: true, isSimPaused: true }),
  closeDecisionGate: () => set({ isDecisionGateOpen: false, isSimPaused: false }),

  submitDecision: (decision) => {
    const scenario = get().activeScenario;
    const trainee = get().activeTrainee;
    const aar = analyzeSessionPerformance(decision, scenario, trainee.name, `SES-${Math.floor(100 + Math.random() * 900)}`);

    const isJudge = get().judgeDemoMode;

    set({
      currentDecision: decision,
      currentAAR: aar,
      isDecisionGateOpen: false,
      isSimPaused: true,
      currentView: 'aar',
      judgeDemoStep: isJudge ? 'STEP_04_REVIEW' : 'IDLE',
      judgeDemoHintText: isJudge 
        ? 'Step 4 of 5 (REVIEW): Review your readiness score, 5-part category breakdown, and primary learning gap.'
        : ''
    });
  },

  runNextBestDrill: () => {
    const aar = get().currentAAR;
    const drill = aar?.nextBestDrill;

    const newScenario = generateProceduralScenario({
      seed: generateSeed('ADAPT'),
      name: drill?.title || 'Adaptive Multi-Track Night Drill',
      terrain: drill?.terrain || 'Urban',
      timeOfDay: drill?.timeOfDay || 'Night',
      visibility: drill?.visibility || 'Low',
      sensorQuality: drill?.sensorQuality || 'Degraded',
      difficulty: drill?.difficulty || 'Advanced',
      trackCount: drill?.trackCount || 4,
      ambiguity: drill?.ambiguity || 80
    });

    const isJudge = get().judgeDemoMode;

    set({
      activeScenario: newScenario,
      activeTracks: newScenario.initialTracks,
      timelineEvents: newScenario.events,
      selectedTrackId: newScenario.initialTracks[0]?.id || null,
      sensorDegraded: true,
      simTimeSec: 5,
      isSimPaused: false,
      isDecisionGateOpen: false,
      currentDecision: null,
      currentView: 'simulation',
      judgeDemoStep: isJudge ? 'STEP_05_ADAPT' : 'IDLE',
      judgeDemoHintText: isJudge 
        ? 'Step 5 of 5 (ADAPT): Next-Best Drill scenario generated & loaded. The next session is already smarter than the last.'
        : ''
    });
  },

  loadScenario: (scenario) => {
    set({
      activeScenario: scenario,
      activeTracks: scenario.initialTracks,
      timelineEvents: scenario.events,
      selectedTrackId: scenario.initialTracks[0]?.id || null,
      sensorDegraded: scenario.sensorQuality !== 'Normal',
      simTimeSec: 0,
      isSimPaused: false,
      isDecisionGateOpen: false,
      currentDecision: null,
      currentAAR: null,
      currentView: 'simulation'
    });
  }
}));
