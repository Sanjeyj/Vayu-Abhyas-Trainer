import React from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/ui/Header';
import { JudgeDemoBanner } from './components/ui/JudgeDemoBanner';
import { Navbar } from './components/ui/Navbar';
import { LandingScreen } from './components/landing/LandingScreen';
import { CommandDashboard } from './components/dashboard/CommandDashboard';
import { LiveSimulationView } from './components/simulation/LiveSimulationView';
import { AARView } from './components/aar/AARView';
import { InstructorConsole } from './components/instructor/InstructorConsole';
import { TraineeProfileView } from './components/trainees/TraineeProfileView';
import { UnitAnalyticsView } from './components/analytics/UnitAnalyticsView';
import { ScenarioLibraryView } from './components/scenarios/ScenarioLibraryView';
import { WhySentinelSkylab } from './components/differentiation/WhySentinelSkylab';
import { PsCoverageView } from './components/ps/PsCoverageView';
import { ArchitectureView } from './components/architecture/ArchitectureView';
import { SettingsView } from './components/settings/SettingsView';
import { DomQaRunnerModal } from './components/ui/DomQaRunnerModal';
import { Shield } from 'lucide-react';

export function App() {
  const currentView = useStore((s) => s.currentView);
  const isDomQaModalOpen = useStore((s) => s.isDomQaModalOpen);
  const setDomQaModalOpen = useStore((s) => s.setDomQaModalOpen);

  return (
    <div className="min-h-screen bg-[#060B16] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header />

      {/* Persistent Judge Demo Step Indicator Banner */}
      <JudgeDemoBanner />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Active View Area */}
      <main className="flex-1 pb-10">
        {currentView === 'landing' && <LandingScreen />}
        {currentView === 'dashboard' && <CommandDashboard />}
        {currentView === 'simulation' && <LiveSimulationView />}
        {currentView === 'decision' && <LiveSimulationView />}
        {currentView === 'aar' && <AARView />}
        {currentView === 'instructor' && <InstructorConsole />}
        {currentView === 'trainees' && <TraineeProfileView />}
        {currentView === 'analytics' && <UnitAnalyticsView />}
        {currentView === 'scenarios' && <ScenarioLibraryView />}
        {currentView === 'differentiation' && <WhySentinelSkylab />}
        {currentView === 'ps-coverage' && <PsCoverageView />}
        {currentView === 'architecture' && <ArchitectureView />}
        {currentView === 'settings' && <SettingsView />}
      </main>

      {/* Automated DOM QA Test Suite Modal */}
      <DomQaRunnerModal
        isOpen={isDomQaModalOpen}
        onClose={() => setDomQaModalOpen(false)}
      />

      {/* Institutional Footer */}
      <footer className="w-full bg-[#0A0F1D] border-t border-sky-800/60 py-4 px-6 font-tactical text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>VAYU ABHYAS — SIH 2026 PROTOTYPE (PS 26247)</span>
        </div>
        <button
          onClick={() => setDomQaModalOpen(true)}
          className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline underline-offset-4"
        >
          [RUN DOM QA SUITE]
        </button>
        <div>
          <span>MINISTRY OF DEFENCE | DEFENCE SERVICES STAFF COLLEGE</span>
        </div>
        <div className="text-[10px] text-emerald-400 font-mono">
          SAFETY BOUNDARY: DEFENSIVE THREAT SIMULATION &amp; DECISION ASSESSMENT
        </div>
      </footer>
    </div>
  );
}

export default App;
