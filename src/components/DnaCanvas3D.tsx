import React, { useEffect, useRef } from 'react';

interface DnaCanvasProps {
  className?: string;
  isCleaved?: boolean;
  cleaveProgress?: number; // 0 to 1
  highlightIndex?: number;
  interactive?: boolean;
  speed?: number;
}

export const DnaCanvas3D: React.FC<DnaCanvasProps> = ({
  className = '',
  isCleaved = false,
  cleaveProgress = 0,
  highlightIndex,
  interactive = true,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<number>(0);
  const dragRef = useRef<{ isDragging: boolean; lastX: number }>({ isDragging: false, lastX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const numBasePairs = 24;
    const helixRadius = 55;
    const verticalPitch = 16;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      rotationRef.current += 0.018 * speed;
      const rot = rotationRef.current;
      const centerX = width / 2;
      const centerY = height / 2;
      const startY = centerY - (numBasePairs * verticalPitch) / 2;

      // Base pairs types: 0: A-T, 1: C-G
      const basePairs = [
        { name1: 'A', name2: 'T', col1: '#00e5ff', col2: '#38bdf8' },
        { name1: 'C', name2: 'G', col1: '#a855f7', col2: '#c084fc' },
        { name1: 'T', name2: 'A', col1: '#38bdf8', col2: '#00e5ff' },
        { name1: 'G', name2: 'C', col1: '#c084fc', col2: '#a855f7' },
      ];

      // Draw each rung
      for (let i = 0; i < numBasePairs; i++) {
        const bp = basePairs[i % basePairs.length];
        const angle = rot + (i * 0.42);

        // Cleave separation effect
        let separationOffset = 0;
        if (isCleaved) {
          const cutCenter = numBasePairs / 2;
          const distFromCut = i - cutCenter;
          if (distFromCut < 0) {
            separationOffset = -cleaveProgress * 45;
          } else {
            separationOffset = cleaveProgress * 45;
          }
        }

        const y = startY + i * verticalPitch + separationOffset;

        // 3D coordinates
        const x1 = centerX + Math.cos(angle) * helixRadius;
        const z1 = Math.sin(angle) * helixRadius;

        const x2 = centerX + Math.cos(angle + Math.PI) * helixRadius;
        const z2 = Math.sin(angle + Math.PI) * helixRadius;

        // Depth sorting scale and opacity
        const scale1 = 0.75 + (z1 / helixRadius) * 0.25;
        const scale2 = 0.75 + (z2 / helixRadius) * 0.25;

        const isHighlighted = highlightIndex !== undefined && Math.abs(i - highlightIndex) <= 1;

        // Connecting rung (Hydrogen bond)
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.lineWidth = isHighlighted ? 3 : 1.5;

        // If cleaved in the middle and progress > 0.5, break the rung
        const isCutPoint = Math.abs(i - numBasePairs / 2) < 2;
        if (isCleaved && isCutPoint && cleaveProgress > 0.2) {
          ctx.strokeStyle = `rgba(239, 68, 68, ${Math.max(0, 1 - cleaveProgress * 1.5)})`;
        } else {
          ctx.strokeStyle = isHighlighted 
            ? 'rgba(250, 204, 21, 0.85)' 
            : `rgba(148, 163, 184, ${0.35 + (scale1 + scale2) * 0.15})`;
        }
        ctx.stroke();

        // Strand 1 node
        ctx.beginPath();
        const r1 = (isHighlighted ? 6.5 : 4.5) * scale1;
        ctx.arc(x1, y, r1, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? '#fbbf24' : bp.col1;
        ctx.shadowColor = bp.col1;
        ctx.shadowBlur = 10 * scale1;
        ctx.fill();

        // Strand 2 node
        ctx.beginPath();
        const r2 = (isHighlighted ? 6.5 : 4.5) * scale2;
        ctx.arc(x2, y, r2, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? '#f59e0b' : bp.col2;
        ctx.shadowColor = bp.col2;
        ctx.shadowBlur = 10 * scale2;
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCleaved, cleaveProgress, highlightIndex, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    dragRef.current = { isDragging: true, lastX: e.clientX };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.isDragging || !interactive) return;
    const deltaX = e.clientX - dragRef.current.lastX;
    rotationRef.current += deltaX * 0.015;
    dragRef.current.lastX = e.clientX;
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};
