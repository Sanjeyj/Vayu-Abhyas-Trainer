import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { SensorControlsPanel } from './SensorControlsPanel';
import { SimulationCanvas } from './3d/SimulationCanvas';
import { TrackInspectionPanel } from './TrackInspectionPanel';
import { EventTimeline } from './EventTimeline';
import { DecisionGateModal } from '../decision/DecisionGateModal';

export const LiveSimulationView: React.FC = () => {
  const isSimPaused = useStore((s) => s.isSimPaused);
  const setSimTime = useStore((s) => s.setSimTime);
  const simTimeSec = useStore((s) => s.simTimeSec);
  const judgeDemoMode = useStore((s) => s.judgeDemoMode);
  const judgeDemoStep = useStore((s) => s.judgeDemoStep);
  const advanceJudgeDemoStep = useStore((s) => s.advanceJudgeDemoStep);

  // Simulation clock ticker
  useEffect(() => {
    if (isSimPaused) return;

    const interval = setInterval(() => {
      setSimTime(simTimeSec + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimPaused, simTimeSec, setSimTime]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 font-tactical p-4 flex flex-col min-h-[calc(100vh-120px)]">
      {/* Top Sensor & Mission Controls */}
      <SensorControlsPanel />

      {/* Main Simulation Area (2.5D/3D Canvas + Track Telemetry Inspection Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
        <div className="lg:col-span-8 w-full h-[420px] lg:h-[460px]">
          <SimulationCanvas />
        </div>
        <div className="lg:col-span-4 w-full flex flex-col h-[420px] lg:h-[460px] overflow-y-auto">
          <TrackInspectionPanel />
        </div>
      </div>

      {/* Bottom Event Timeline */}
      <EventTimeline />

      {/* Decision Required Modal */}
      <DecisionGateModal />
    </div>
  );
};
