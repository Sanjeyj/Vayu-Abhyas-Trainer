from pydantic import BaseModel, Field
from typing import List, Optional

class TrackModel(BaseModel):
    id: str
    label: str
    confidence: float
    status: str
    classification: str
    priority: str
    position_x: float
    position_y: float
    position_z: float
    speed: float
    altitude: float
    heading: float
    rfSignature: str
    isThreat: bool

class ScenarioCreate(BaseModel):
    seed: Optional[str] = "SKY-28491"
    name: Optional[str] = "Urban Night Threat Simulation"
    terrain: Optional[str] = "Urban"
    timeOfDay: Optional[str] = "Night"
    visibility: Optional[str] = "Low"
    sensorQuality: Optional[str] = "Degraded"
    difficulty: Optional[str] = "Advanced"
    trackCount: Optional[int] = 4
    ambiguity: Optional[int] = 68

class DecisionSubmit(BaseModel):
    traineeId: str
    scenarioId: str
    classification: str
    confidence: float
    priority: str
    response: str
    latencySec: float

class ScoreBreakdownModel(BaseModel):
    detectionLatency: int
    classificationAccuracy: int
    prioritizationScore: int
    decisionQuality: int
    confidenceCalibration: int
    totalScore: int

class NextBestDrillModel(BaseModel):
    id: str
    title: str
    targetSkill: str
    difficulty: str
    terrain: str
    timeOfDay: str
    visibility: str
    sensorQuality: str
    trackCount: int
    ambiguity: int
    reason: str

class AARResponse(BaseModel):
    sessionId: str
    traineeName: str
    scenarioName: str
    readinessScore: int
    readinessStatus: str
    scoreBreakdown: ScoreBreakdownModel
    primaryLearningGapTitle: str
    primaryLearningGapDescription: str
    nextBestDrill: NextBestDrillModel
