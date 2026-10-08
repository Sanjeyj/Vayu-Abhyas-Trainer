import React, { useRef, useEffect } from 'react';
import { useStore } from '../../../store/useStore';
import { SimulatedTrack } from '../../../types';

export const SimulationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const activeScenario = useStore((s) => s.activeScenario);
  const activeTracks = useStore((s) => s.activeTracks);
  const selectedTrackId = useStore((s) => s.selectedTrackId);
  const sensorDegraded = useStore((s) => s.sensorDegraded);
  const isSimPaused = useStore((s) => s.isSimPaused);
  const selectTrack = useStore((s) => s.selectTrack);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      // Resize canvas to match display container
      const width = canvas.parentElement?.clientWidth || 800;
      const height = canvas.parentElement?.clientHeight || 500;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const radarRadius = Math.min(width, height) * 0.42;

      // 1. Clear background based on terrain/time
      const isNight = activeScenario.timeOfDay === 'Night' || activeScenario.timeOfDay === 'Dusk';
      ctx.fillStyle = isNight ? '#050914' : '#0a1628';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw 3D Isometric Grid Ground
      ctx.strokeStyle = isNight ? 'rgba(37, 59, 100, 0.25)' : 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1;

      const gridSize = 40;
      const maxGrid = 12;
      ctx.beginPath();
      for (let i = -maxGrid; i <= maxGrid; i++) {
        // Perspective slant for 2.5D visual feeling
        const x1 = centerX + i * gridSize * 1.2;
        const y1 = centerY - maxGrid * gridSize * 0.4;
        const x2 = centerX + i * (gridSize * 0.6);
        const y2 = centerY + maxGrid * gridSize * 0.5;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      for (let j = -maxGrid; j <= maxGrid; j++) {
        const yOffset = j * gridSize * 0.45;
        const leftX = centerX - maxGrid * gridSize * (0.8 + (j / maxGrid) * 0.2);
        const rightX = centerX + maxGrid * gridSize * (0.8 + (j / maxGrid) * 0.2);
        ctx.moveTo(leftX, centerY + yOffset);
        ctx.lineTo(rightX, centerY + yOffset);
      }
      ctx.stroke();

      // 3. Draw Concentric Radar Rings
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1.5;
      [0.25, 0.5, 0.75, 1.0].forEach((scale) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radarRadius * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs & Compass ticks
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX - radarRadius, centerY);
      ctx.lineTo(centerX + radarRadius, centerY);
      ctx.moveTo(centerX, centerY - radarRadius);
      ctx.lineTo(centerX, centerY + radarRadius);
      ctx.stroke();
      ctx.setLineDash([]);

      // Cardinal Labels
      ctx.fillStyle = '#06B6D4';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('N 000°', centerX, centerY - radarRadius - 8);
      ctx.fillText('S 180°', centerX, centerY + radarRadius + 16);
      ctx.fillText('W 270°', centerX - radarRadius - 24, centerY + 4);
      ctx.fillText('E 090°', centerX + radarRadius + 24, centerY + 4);

      // 4. Draw Radar Sweep Beam
      if (!isSimPaused) {
        angle = (angle + 0.015) % (Math.PI * 2);
      }

      const gradient = ctx.createConicGradient(angle - Math.PI / 2, centerX, centerY);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      gradient.addColorStop(0.1, 'rgba(6, 182, 212, 0.05)');
      gradient.addColorStop(0.2, 'transparent');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radarRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sweep leading edge line
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * radarRadius, centerY + Math.sin(angle) * radarRadius);
      ctx.stroke();

      // 5. Draw City / Terrain Landmarks (Stylized 2.5D Defence Base)
      if (activeScenario.terrain === 'Urban') {
        ctx.fillStyle = 'rgba(22, 34, 59, 0.6)';
        ctx.strokeStyle = 'rgba(37, 59, 100, 0.8)';
        ctx.lineWidth = 1;

        // Command Bunker Center
        ctx.fillRect(centerX - 25, centerY - 15, 50, 30);
        ctx.strokeRect(centerX - 25, centerY - 15, 50, 30);

        ctx.fillStyle = '#06B6D4';
        ctx.fillRect(centerX - 3, centerY - 3, 6, 6);
        ctx.fillText('HQ BUNKER', centerX, centerY + 25);

        // Surrounding Urban Blocks
        const blocks = [
          { x: -90, y: -60, w: 40, h: 50, label: 'SECTOR A' },
          { x: 70, y: -80, w: 50, h: 40, label: 'HANGER 2' },
          { x: -110, y: 70, w: 60, h: 35, label: 'SUBSTATION' },
          { x: 80, y: 65, w: 45, h: 45, label: 'FUEL DEPOT' }
        ];

        blocks.forEach((b) => {
          ctx.fillStyle = 'rgba(15, 25, 45, 0.7)';
          ctx.fillRect(centerX + b.x, centerY + b.y, b.w, b.h);
          ctx.strokeRect(centerX + b.x, centerY + b.y, b.w, b.h);
          ctx.fillStyle = '#64748B';
          ctx.font = '9px "JetBrains Mono"';
          ctx.fillText(b.label, centerX + b.x + b.w / 2, centerY + b.y + b.h / 2 + 3);
        });
      }

      // 6. Draw Simulated Tracks with Trails & Status Rings
      activeTracks.forEach((trk) => {
        // Map 3D pos to 2D canvas relative coordinates
        const scaleX = (radarRadius / 140);
        const scaleY = (radarRadius / 140) * 0.7; // Isometric compression

        const px = centerX + trk.position.x * scaleX;
        const py = centerY + trk.position.z * scaleY;

        const isSelected = selectedTrackId === trk.id;

        // Color based on status
        let strokeColor = '#10B981'; // Green (stable)
        if (trk.status === 'ambiguous') strokeColor = '#F59E0B'; // Amber
        if (trk.status === 'intermittent') strokeColor = '#EF4444'; // Red
        if (isSelected) strokeColor = '#06B6D4'; // Cyan

        // Intermittent flicker if sensor degraded
        if (sensorDegraded && trk.status === 'intermittent' && Math.random() < 0.25) {
          return; // Skip frame draw to simulate dropout
        }

        // Motion Trail
        ctx.strokeStyle = strokeColor + '55';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        trk.trail.forEach((pt, idx) => {
          const tx = centerX + pt.x * scaleX;
          const ty = centerY + pt.z * scaleY;
          if (idx === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        });
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Altitude Stem (Project track to ground plane)
        const groundY = py + (trk.altitude * 0.2);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, groundY);
        ctx.stroke();

        // Ground shadow ring
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
        ctx.beginPath();
        ctx.arc(px, groundY, 4, 0, Math.PI * 2);
        ctx.stroke();

        // Track Target Ring (Glowing tactical diamond/circle)
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.fillStyle = isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(13, 21, 39, 0.8)';

        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 12 : 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Target Heading Arrow Vector
        const headingRad = (trk.heading - 90) * (Math.PI / 180);
        const arrowLen = 18;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + Math.cos(headingRad) * arrowLen, py + Math.sin(headingRad) * arrowLen);
        ctx.stroke();

        // Track Label & Telemetry
        ctx.fillStyle = isSelected ? '#38BDF8' : '#F8FAFC';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${trk.label} [${trk.confidence}%]`, px + 16, py - 4);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '9px "JetBrains Mono"';
        ctx.fillText(`ALT: ${trk.altitude}m | SPD: ${trk.speed.toFixed(1)}m/s`, px + 16, py + 8);

        // Ping pulse ring for selected track
        if (isSelected) {
          const pulseR = 14 + (Math.sin(Date.now() / 200) * 4);
          ctx.strokeStyle = '#06B6D4';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // 7. Render Sensor Static Noise overlay if Sensor Degraded
      if (sensorDegraded) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.03)';
        for (let k = 0; k < 60; k++) {
          const rx = Math.random() * width;
          const ry = Math.random() * height;
          ctx.fillRect(rx, ry, 2, 2);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeScenario, activeTracks, selectedTrackId, sensorDegraded, isSimPaused]);

  // Click handler to select track on canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radarRadius = Math.min(width, height) * 0.42;

    const scaleX = (radarRadius / 140);
    const scaleY = (radarRadius / 140) * 0.7;

    // Find nearest track within 25px
    let nearestTrackId: string | null = null;
    let minDist = 25;

    activeTracks.forEach((trk) => {
      const px = centerX + trk.position.x * scaleX;
      const py = centerY + trk.position.z * scaleY;
      const dist = Math.hypot(clickX - px, clickY - py);
      if (dist < minDist) {
        minDist = dist;
        nearestTrackId = trk.id;
      }
    });

    if (nearestTrackId) {
      selectTrack(nearestTrackId);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#060B16] rounded-lg border border-sky-800/60 overflow-hidden flex flex-col justify-center items-center">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-crosshair block"
      />
      
      {/* Top Left Overlay Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-3 bg-sky-950/80 backdrop-blur-md px-3 py-1.5 rounded border border-sky-700/50 text-xs font-tactical">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-cyan-400 font-semibold tracking-wider">{activeScenario.terrain.toUpperCase()} {activeScenario.timeOfDay.toUpperCase()}</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300">SEED: <strong className="text-slate-100">{activeScenario.seed}</strong></span>
      </div>

      {/* Top Right Degradation Indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-2 bg-sky-950/80 backdrop-blur-md px-3 py-1.5 rounded border border-sky-700/50 text-xs font-tactical">
        <span className="text-slate-400">SENSOR QUALITY:</span>
        <span className={`font-bold ${sensorDegraded ? 'text-amber-400' : 'text-emerald-400'}`}>
          {sensorDegraded ? 'DEGRADED (62%)' : 'OPTIMAL (100%)'}
        </span>
      </div>
    </div>
  );
};
