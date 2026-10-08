from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.models import ScenarioCreate, DecisionSubmit, AARResponse, ScoreBreakdownModel, NextBestDrillModel
import random

app = FastAPI(
    title="SENTINEL SKYLAB API",
    description="Backend API for Drone & Counter-Drone Threat Simulation Trainer (PS 26247)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "system": "SENTINEL SKYLAB API",
        "version": "1.0.0",
        "organization": "Ministry of Defence",
        "department": "Defence Services Staff College",
        "ps_id": "26247"
    }

@app.get("/api/v1/system/health")
def health_check():
    return {
        "simulation_engine": "ONLINE",
        "analytics_engine": "ONLINE",
        "adaptive_engine": "ONLINE",
        "database": "SQLITE_LOCAL_DEMO",
        "fps_target": 60
    }

@app.post("/api/v1/scenarios/generate")
def generate_scenario(params: ScenarioCreate):
    seed = params.seed or f"SKY-{random.randint(10000, 99999)}"
    return {
        "id": f"scen-{seed.lower()}",
        "seed": seed,
        "name": params.name,
        "terrain": params.terrain,
        "timeOfDay": params.timeOfDay,
        "visibility": params.visibility,
        "sensorQuality": params.sensorQuality,
        "difficulty": params.difficulty,
        "trackCount": params.trackCount,
        "ambiguity": params.ambiguity,
        "status": "GENERATED"
    }

@app.post("/api/v1/decisions/evaluate", response_model=AARResponse)
def evaluate_decision(decision: DecisionSubmit):
    # Transparent score calculation logic
    detection_score = max(50, int(100 - (decision.latencySec * 4)))
    classification_score = 92 if decision.classification in ["SUSPICIOUS_DRONE", "COORDINATED_SWARM"] else 70
    prioritization_score = 85 if decision.priority in ["HIGH", "CRITICAL"] else 71
    decision_score = 90 if decision.response in ["Escalate to supervisor", "Follow authorized procedure"] else 75
    confidence_score = 81

    total_score = int(
        (detection_score * 0.25) +
        (classification_score * 0.25) +
        (prioritization_score * 0.20) +
        (decision_score * 0.20) +
        (confidence_score * 0.10)
    )

    status = "READY" if total_score >= 80 else "DEVELOPING"

    session_id = f"SES-{random.randint(100, 999)}"

    next_drill = NextBestDrillModel(
        id=f"drill-next-{random.randint(1000, 9999)}",
        title="Advanced Multi-Track Night Drill",
        targetSkill="Prioritization",
        difficulty="Advanced",
        terrain="Urban",
        timeOfDay="Night",
        visibility="Low",
        sensorQuality="Degraded",
        trackCount=4,
        ambiguity=80,
        reason="Prioritization score (71/100) identified as primary learning gap under low visibility."
    )

    return AARResponse(
        sessionId=session_id,
        traineeName="A. KUMAR",
        scenarioName="Urban Night Threat Simulation",
        readinessScore=total_score,
        readinessStatus=status,
        scoreBreakdown=ScoreBreakdownModel(
            detectionLatency=detection_score,
            classificationAccuracy=classification_score,
            prioritizationScore=prioritization_score,
            decisionQuality=decision_score,
            confidenceCalibration=confidence_score,
            totalScore=total_score
        ),
        primaryLearningGapTitle="Prioritization Under Ambiguity",
        primaryLearningGapDescription="Delayed prioritization after secondary track emergence during high sensor noise.",
        nextBestDrill=next_drill
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
