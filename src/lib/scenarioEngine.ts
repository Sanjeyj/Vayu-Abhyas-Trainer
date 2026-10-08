import { Scenario, SimulatedTrack, TimelineEvent, DifficultyLevel, TerrainType, TimeOfDay, VisibilityLevel, SensorQuality, TrackStatus } from '../types';

function seedRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(48271, h) % 2147483647;
    return (h & 2147483647) / 2147483647;
  };
}

export function generateSeed(prefix = 'SKY'): string {
  const randNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randNum}`;
}

export function createPresetScenario(type: 'JUDGE_DEMO' | 'URBAN_NIGHT' | 'RURAL_DAY' | 'INDUSTRIAL_SWARM'): Scenario {
  if (type === 'JUDGE_DEMO') {
    return {
      id: 'scen-vayu-demo-01',
      seed: 'VAYU-DEMO-01',
      name: 'Urban Night Threat Simulation',
      terrain: 'Urban',
      timeOfDay: 'Night',
      visibility: 'Low',
      sensorQuality: 'Degraded',
      difficulty: 'Advanced',
      trackCount: 3,
      ambiguity: 65,
      description: 'Synthetic multi-track simulation over urban establishment under degraded thermal sensor conditions.',
      durationSec: 60,
      decisionTimeSec: 42,
      events: [
        {
          id: 'ev-1',
          timestampSec: 7,
          timestampStr: '00:07',
          title: 'Track 01 Detected',
          description: 'Low-RCS synthetic cue detected at Sector 4 (Altitude 120m).',
          type: 'info',
          trackId: 'TRK-01'
        },
        {
          id: 'ev-2',
          timestampSec: 14,
          timestampStr: '00:14',
          title: 'Track 02 Detected',
          description: 'Secondary fast airborne target acquired at Sector 2 (Altitude 180m).',
          type: 'warning',
          trackId: 'TRK-02'
        },
        {
          id: 'ev-3',
          timestampSec: 23,
          timestampStr: '00:23',
          title: 'Sensor Quality Decreases',
          description: 'Sensor noise spike (+35%). Visibility dropped to LOW. Track 02 signal intermittent.',
          type: 'warning'
        },
        {
          id: 'ev-4',
          timestampSec: 31,
          timestampStr: '00:31',
          title: 'Track 03 Emerges',
          description: 'Passive background contact acquired at Sector 5 (Altitude 240m).',
          type: 'info',
          trackId: 'TRK-03'
        },
        {
          id: 'ev-5',
          timestampSec: 38,
          timestampStr: '00:38',
          title: 'Multi-Track Ambiguity Detected',
          description: 'Coordinated flight pattern between Track 01 and Track 02 flagged under degraded cues.',
          type: 'alert'
        },
        {
          id: 'ev-6',
          timestampSec: 42,
          timestampStr: '00:42',
          title: 'DECISION REQUIRED GATE',
          description: 'Threat prioritization & classification threshold reached. Immediate trainee response required.',
          type: 'decision'
        }
      ],
      initialTracks: [
        {
          id: 'TRK-01',
          label: 'TRACK 01',
          confidence: 88,
          status: 'stable',
          classification: 'SUSPICIOUS_DRONE',
          priority: 'MEDIUM',
          position: { x: -35, y: 45, z: 25 },
          targetPosition: { x: 5, y: 35, z: -10 },
          speed: 14.5,
          altitude: 125,
          heading: 135,
          trail: [
            { x: -70, y: 55, z: 60 },
            { x: -52, y: 50, z: 42 },
            { x: -35, y: 45, z: 25 }
          ],
          observationsCount: 5,
          rfSignature: 'Sensor Link Status: Active 2.4 GHz Pulse',
          isThreat: true,
          firstObservedAt: 7,
          history: [
            { timestamp: '00:07', altitude: 130, speed: 12.0, heading: 130, rfSignature: 'Sensor Link: Weak 2.4GHz', radarCrossSection: 'Track Signature Conf: 85%', note: 'First thermal cue' },
            { timestamp: '00:14', altitude: 128, speed: 14.2, heading: 132, rfSignature: 'Sensor Link: Stable Pulse', radarCrossSection: 'Track Signature Conf: 88%', note: 'Track lock confirmed' },
            { timestamp: '00:23', altitude: 125, speed: 14.5, heading: 135, rfSignature: 'Sensor Link: Stable Pulse', radarCrossSection: 'Track Signature Conf: 88%', note: 'Holding heading' }
          ]
        },
        {
          id: 'TRK-02',
          label: 'TRACK 02',
          confidence: 63,
          status: 'ambiguous',
          classification: 'UNKNOWN',
          priority: 'HIGH',
          position: { x: 42, y: 60, z: -30 },
          targetPosition: { x: -10, y: 40, z: 15 },
          speed: 22.8,
          altitude: 180,
          heading: 240,
          trail: [
            { x: 80, y: 75, z: -55 },
            { x: 60, y: 68, z: -42 },
            { x: 42, y: 60, z: -30 }
          ],
          observationsCount: 3,
          rfSignature: 'Sensor Link Status: Intermittent 5.8 GHz Downlink',
          isThreat: true,
          firstObservedAt: 14,
          history: [
            { timestamp: '00:14', altitude: 195, speed: 20.1, heading: 235, rfSignature: 'Sensor Link: Burst Pulse', radarCrossSection: 'Track Signature Conf: 60%', note: 'Emerging fast track' },
            { timestamp: '00:23', altitude: 188, speed: 21.5, heading: 238, rfSignature: 'Sensor Link: Dropout', radarCrossSection: 'Track Signature Conf: 52%', note: 'Sensor noise dropout' },
            { timestamp: '00:31', altitude: 180, speed: 22.8, heading: 240, rfSignature: 'Sensor Link: Intermittent', radarCrossSection: 'Track Signature Conf: 63%', note: 'Track re-acquired' }
          ]
        },
        {
          id: 'TRK-03',
          label: 'TRACK 03',
          confidence: 42,
          status: 'intermittent',
          classification: 'BENIGN_AERIAL',
          priority: 'LOW',
          position: { x: -60, y: 90, z: -70 },
          targetPosition: { x: -90, y: 95, z: -100 },
          speed: 8.2,
          altitude: 240,
          heading: 310,
          trail: [
            { x: -40, y: 85, z: -40 },
            { x: -50, y: 88, z: -55 },
            { x: -60, y: 90, z: -70 }
          ],
          observationsCount: 2,
          rfSignature: 'Sensor Link Status: Passive / Background Clutter',
          isThreat: false,
          firstObservedAt: 31,
          history: [
            { timestamp: '00:31', altitude: 240, speed: 8.2, heading: 310, rfSignature: 'Passive', radarCrossSection: 'Track Signature Conf: 42%', note: 'Candidate bird/clutter' }
          ]
        }
      ]
    };
  }

  return generateProceduralScenario({
    seed: type === 'RURAL_DAY' ? 'RURAL-10492' : 'INDUS-99281',
    name: type === 'RURAL_DAY' ? 'Rural Boundary Simulation' : 'Industrial Complex Swarm Test',
    terrain: type === 'RURAL_DAY' ? 'Rural' : 'Industrial',
    timeOfDay: type === 'RURAL_DAY' ? 'Day' : 'Dusk',
    visibility: type === 'RURAL_DAY' ? 'High' : 'Medium',
    sensorQuality: type === 'RURAL_DAY' ? 'Normal' : 'Intermittent',
    difficulty: type === 'RURAL_DAY' ? 'Intermediate' : 'Expert',
    trackCount: type === 'RURAL_DAY' ? 2 : 4,
    ambiguity: type === 'RURAL_DAY' ? 25 : 80
  });
}

export interface ScenarioGenParams {
  seed?: string;
  name?: string;
  terrain?: TerrainType;
  timeOfDay?: TimeOfDay;
  visibility?: VisibilityLevel;
  sensorQuality?: SensorQuality;
  difficulty?: DifficultyLevel;
  trackCount?: number;
  ambiguity?: number;
}

export function generateProceduralScenario(params: ScenarioGenParams = {}): Scenario {
  const seed = params.seed || generateSeed('SKY');
  const rng = seedRandom(seed);

  const terrainOptions: TerrainType[] = ['Urban', 'Rural', 'Industrial', 'Coastal', 'Mountain'];
  const timeOptions: TimeOfDay[] = ['Day', 'Night', 'Dawn', 'Dusk'];
  const visibilityOptions: VisibilityLevel[] = ['High', 'Medium', 'Low', 'Zero'];
  const sensorOptions: SensorQuality[] = ['Normal', 'Degraded', 'Intermittent', 'Low Visibility', 'Occluded'];
  const difficultyOptions: DifficultyLevel[] = ['Foundation', 'Intermediate', 'Advanced', 'Expert'];

  const terrain = params.terrain || terrainOptions[Math.floor(rng() * terrainOptions.length)];
  const timeOfDay = params.timeOfDay || timeOptions[Math.floor(rng() * timeOptions.length)];
  const visibility = params.visibility || visibilityOptions[Math.floor(rng() * visibilityOptions.length)];
  const sensorQuality = params.sensorQuality || sensorOptions[Math.floor(rng() * sensorOptions.length)];
  const difficulty = params.difficulty || difficultyOptions[Math.floor(rng() * difficultyOptions.length)];

  const trackCount = params.trackCount !== undefined ? params.trackCount : Math.floor(rng() * 3) + 2;
  const ambiguity = params.ambiguity !== undefined ? params.ambiguity : Math.floor(rng() * 60) + 20;

  const tracks: SimulatedTrack[] = [];
  for (let i = 1; i <= trackCount; i++) {
    const isThreat = rng() > 0.35;
    const confidence = Math.max(30, Math.floor(100 - (ambiguity * 0.6) - (rng() * 20)));
    const status: TrackStatus = confidence > 80 ? 'stable' : confidence > 55 ? 'ambiguous' : 'intermittent';

    const startX = (rng() - 0.5) * 120;
    const startY = 30 + rng() * 60;
    const startZ = (rng() - 0.5) * 120;

    tracks.push({
      id: `TRK-0${i}`,
      label: `TRACK 0${i}`,
      confidence,
      status,
      classification: isThreat ? (confidence > 70 ? 'SUSPICIOUS_DRONE' : 'UNKNOWN') : 'BENIGN_AERIAL',
      priority: isThreat ? (confidence > 75 ? 'HIGH' : 'MEDIUM') : 'LOW',
      position: { x: startX, y: startY, z: startZ },
      targetPosition: { x: startX * -0.5, y: startY + (rng() * 20 - 10), z: startZ * -0.5 },
      speed: Math.floor(10 + rng() * 25),
      altitude: Math.floor(80 + rng() * 180),
      heading: Math.floor(rng() * 360),
      trail: [
        { x: startX * 1.3, y: startY + 15, z: startZ * 1.3 },
        { x: startX * 1.1, y: startY + 5, z: startZ * 1.1 },
        { x: startX, y: startY, z: startZ }
      ],
      observationsCount: Math.floor(2 + rng() * 5),
      rfSignature: isThreat ? 'Sensor Link Status: Active Digital Pulse' : 'Sensor Link Status: Passive RCS',
      isThreat,
      firstObservedAt: Math.floor(5 + rng() * 15),
      history: [
        { timestamp: `00:0${i*3}`, altitude: startY + 15, speed: 12, heading: 140, rfSignature: 'Initial detect', radarCrossSection: 'Track Signature Conf: 75%', note: 'Contact acquired' }
      ]
    });
  }

  const name = params.name || `${terrain} ${difficulty} Threat Simulation`;

  return {
    id: `scen-${seed.toLowerCase()}`,
    seed,
    name,
    terrain,
    timeOfDay,
    visibility,
    sensorQuality,
    difficulty,
    trackCount,
    ambiguity,
    description: `Synthetic training scenario generated with seed ${seed}. ${trackCount} active airborne tracks under ${visibility.toLowerCase()} visibility and ${sensorQuality.toLowerCase()} sensor status.`,
    durationSec: 60,
    decisionTimeSec: 42,
    events: [
      { id: 'e1', timestampSec: 7, timestampStr: '00:07', title: 'Track 01 Detected', description: 'Primary thermal sensor cue acquired.', type: 'info', trackId: 'TRK-01' },
      { id: 'e2', timestampSec: 14, timestampStr: '00:14', title: 'Track 02 Detected', description: 'Secondary fast airborne track correlated.', type: 'warning', trackId: 'TRK-02' },
      { id: 'e3', timestampSec: 23, timestampStr: '00:23', title: 'Sensor Quality Decreases', description: `${sensorQuality} sensor mode engaged. Noise factor elevated.`, type: 'warning' },
      { id: 'e4', timestampSec: 42, timestampStr: '00:42', title: 'DECISION GATE ACTIVE', description: 'Trainee threat classification and priority assessment required.', type: 'decision' }
    ],
    initialTracks: tracks
  };
}
