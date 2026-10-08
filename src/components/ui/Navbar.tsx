import React from 'react';
import { useStore } from '../../store/useStore';
import { ViewMode } from '../../types';
import { LayoutDashboard, Play, Award, Sliders, Users, BarChart3, Layers, HelpCircle, Home, FileText, Cpu, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const currentView = useStore((s) => s.currentView);
  const setView = useStore((s) => s.setView);

  const navItems: { view: ViewMode; label: string; icon: any }[] = [
    { view: 'landing', label: 'Home', icon: Home },
    { view: 'dashboard', label: 'Command', icon: LayoutDashboard },
    { view: 'simulation', label: 'Live Simulation', icon: Play },
    { view: 'aar', label: 'AAR Report', icon: Award },
    { view: 'instructor', label: 'Instructor', icon: Sliders },
    { view: 'trainees', label: 'Trainees', icon: Users },
    { view: 'analytics', label: 'Unit Analytics', icon: BarChart3 },
    { view: 'scenarios', label: 'Scenarios', icon: Layers },
    { view: 'differentiation', label: 'Why Vayu?', icon: HelpCircle },
    { view: 'ps-coverage', label: 'PS Coverage', icon: FileText },
    { view: 'architecture', label: 'Architecture', icon: Cpu },
    { view: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="w-full bg-[#060B16] border-b border-sky-800/60 px-4 py-2 flex items-center justify-center gap-1 overflow-x-auto font-tactical text-xs">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        const Icon = item.icon;

        return (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all whitespace-nowrap ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-sky-900/40'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
