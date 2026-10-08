# VAYU ABHYAS — SENTINEL SKYLAB

### AI-Enabled Drone & Counter-Drone Threat Simulation Trainer

**Problem Statement ID:** 26247  
**Organization:** Ministry of Defence  
**Department:** Defence Services Staff College  
**Category:** Software  
**Theme:** Robotics & Drones  

---

## 🎯 CORE PRODUCT MESSAGE

> **"TRAIN THE DECISION-MAKER, NOT THE WEAPON."**

> *Every repetition creates a measurable learning signal that automatically influences the next training scenario.*

> *From simulation to measurable decision readiness.*

---

## 🚀 OVERVIEW

Sentinel Skylab is a software-first training environment that allows defence personnel to repeatedly practice recognizing, classifying, prioritizing, and responding to simulated aerial threat events under realistic, degraded sensor conditions.

Unlike traditional CRUD dashboards or fixed static simulators, Sentinel Skylab implements a **closed-loop adaptive training system** where every trainee repetition directly feeds an explainable scoring engine, pinpoints primary learning gaps, and procedurally generates the **next-best training drill**.

---

## 🔄 THE CLOSED-LOOP ADAPTIVE LEARNING CYCLE

```text
SCENARIO ──► DETECT ──► CLASSIFY ──► PRIORITIZE ──► DECIDE
   ▲                                                   │
   │                                                   ▼
REPEAT ◄── GENERATE NEXT DRILL ◄── IDENTIFY GAP ◄── AAR REPORT
```

1. **Scenario Generation:** Procedural seed-based environment (e.g. `SKY-28491`) with configurable terrain, time, visibility, track count, and sensor noise.
2. **Threat Detection & Classification:** Real-time 2.5D/3D radar visualizer with RF signatures, track telemetry, and sensor degradation dropouts.
3. **Decision Gate:** Interactive decision modal requiring classification, confidence calibration (0–100%), prioritization level, and authorized defensive posture choice.
4. **Explainable Scoring Engine:** Transparent 100-point score broken into 5 categories (Detection 25%, Classification 25%, Prioritization 20%, Decision Quality 20%, Confidence 10%).
5. **After-Action Review (AAR):** Interactive timeline replay, event impact analysis, and confidence calibration evaluation.
6. **Adaptive Next-Best Drill:** Automatic parameter adjustment (+1 track count, +15% ambiguity, -10% visibility) targeting the trainee's weakest competency.

---

## 🛡️ SAFETY / PRODUCT BOUNDARY

This application is strictly a **defensive training and simulation platform**.

It does **NOT** implement:
- Kinetic weapon control or targeting
- Autonomous engagement or interception instructions
- Electronic warfare or real-world jamming procedures
- Real military operational coordinates

All response choices remain abstract training decisions (*Continue observation, Monitor, Elevate, Escalate to supervisor, Follow authorized procedure, Hold and reassess*).

---

## 🏆 SIH 2026 JUDGE DEMO MODE (60-90 SECOND WALKTHROUGH)

The application includes a prominent **`JUDGE DEMO MODE`** button on the landing and command header.

When activated, it automatically configures an **Urban Night Advanced Threat Scenario** and guides the judge step-by-step through the entire closed-loop innovation:

1. **Emerging Track Detection:** Visualizes Track 01 emergence under thermal radar.
2. **Multi-Track & Sensor Noise:** Secondary Track 02 appears while sensor quality degrades by 35%.
3. **Decision Required Gate:** Opens decision modal to select threat classification, confidence slider, priority level, and defensive posture.
4. **After-Action Review (AAR):** Displays overall 84/100 readiness score, 5-part category breakdown, and primary learning gap (*Prioritization under ambiguity*).
5. **Next-Best Drill Generation:** Automatically computes and displays the generated next drill parameters.
6. **Run Next Drill:** Automatically builds and launches the new scenario with adjusted difficulty.

---

## 💻 TECH STACK & ARCHITECTURE

### Frontend
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (Tactical dark theme, HSL palette, glassmorphism, radar grid)
- **Icons:** Lucide React
- **Visualization:** WebGL / Canvas 2.5D/3D Radar Engine with smooth fallback
- **Charts:** Recharts (5-Competency Radar chart, Progressive trend line)
- **State:** Zustand

### Backend
- **Framework:** Python 3.11, FastAPI
- **Data Store:** SQLite (Local standalone demo) / PostgreSQL target
- **Containerization:** Docker & Docker Compose ready

---

## ⚡ QUICK START INSTRUCTIONS

### Local Development (Frontend)
```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Standalone Production Build
```bash
pnpm build
pnpm preview
```

### Docker Deployment
```bash
docker-compose up --build
```
Access the application at `http://localhost`.

---

## 💎 PRODUCT DIFFERENTIATION (WHY SENTINEL SKYLAB?)

| Pillar | Feature | Benefit |
| :--- | :--- | :--- |
| **01 — ADAPTIVE** | Closed-loop adaptive engine | No fixed training script; scenario adjusts to trainee gaps |
| **02 — PROCEDURAL** | Seed generator (`SKY-28491`) | Dynamic track count, ambiguity, & weather prevent rote learning |
| **03 — EXPLAINABLE** | Transparent 5-part category score | Every lost/gained point has an explicit, explainable reason |
| **04 — MEASURABLE** | 5-competency radar profiles & heatmaps | Quantifiable readiness tracking across units |
| **05 — OFFLINE-FIRST** | Standalone local execution | Functions flawlessly in air-gapped, high-security environments |
| **06 — VR-READY** | WebGL 3D architecture | Future-proof architecture for spatial WebXR headsets |
| **07 — INSTRUCTOR-CENTRIC**| Printable AAR exports & controls | Institutional oversight for staff colleges & commanders |

---

## 📜 LICENSE & INSTITUTIONAL CREDIT

Developed for **Smart India Hackathon (SIH) 2026** — Problem Statement ID **26247**.  
Submitted to **Ministry of Defence / Defence Services Staff College**.
