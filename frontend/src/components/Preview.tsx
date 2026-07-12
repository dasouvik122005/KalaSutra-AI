import { useRef } from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GeometryInstructions } from '../types';

interface PreviewProps {
  geometry: GeometryInstructions | null;
}

export function Preview({ geometry }: PreviewProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kalasutra-artwork.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderShape = (shape: any, index: number) => {
    const commonProps = {
      key: index,
      stroke: shape.stroke || 'black',
      strokeWidth: shape.stroke_width || 1,
      fill: shape.fill || 'none',
      initial: { pathLength: 0, opacity: 0 },
      animate: { pathLength: 1, opacity: 1 },
      transition: { duration: 0.7, delay: index * 0.3, ease: "easeInOut" as const }
    };

    switch (shape.type) {
      case 'circle':
        return <motion.circle cx="500" cy="500" r={shape.radius} {...commonProps} />;
      case 'polygon': {
        const sides = shape.sides || 3;
        const radius = shape.radius || 100;
        let points = "";
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
          const px = 500 + radius * Math.cos(angle);
          const py = 500 + radius * Math.sin(angle);
          points += `${px},${py} `;
        }
        return <motion.polygon points={points.trim()} {...commonProps} />;
      }
      case 'petal': {
        // Simple representation of petals as multiple ellipses rotated
        const count = shape.count || 8;
        const radius = shape.radius || 100;
        return (
          <g key={index}>
            {Array.from({ length: count }).map((_, i) => {
              const angle = (i * 360) / count;
              return (
                <motion.ellipse
                  key={i}
                  cx="500"
                  cy={500 - radius / 2}
                  rx={radius / 4}
                  ry={radius / 2}
                  stroke={shape.stroke || 'black'}
                  strokeWidth={shape.stroke_width || 1}
                  fill={shape.fill || 'none'}
                  transform={`rotate(${angle} 500 500)`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: (index * 0.3) + (i * 0.05), ease: "easeInOut" as const }}
                />
              );
            })}
          </g>
        );
      }
      case 'dots': {
        const count = shape.count || 8;
        const radius = shape.radius || 100;
        const dotRadius = shape.dot_radius || 5;
        return (
          <g key={index}>
            {Array.from({ length: count }).map((_, i) => {
              const angle = (i * 2 * Math.PI) / count;
              const cx = 500 + radius * Math.cos(angle);
              const cy = 500 + radius * Math.sin(angle);
              return (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={dotRadius}
                  fill={shape.stroke || 'black'}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: (index * 0.3) + (i * 0.03) }}
                />
              );
            })}
          </g>
        );
      }
      case 'spiral': {
        const turns = shape.turns || 3;
        const maxRadius = shape.max_radius || 200;
        const steps = Math.ceil(turns * 60); // 60 points per turn for smoothness
        let d = '';
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const angle = t * turns * 2 * Math.PI;
          const r = t * maxRadius;
          const px = 500 + r * Math.cos(angle);
          const py = 500 + r * Math.sin(angle);
          d += (i === 0 ? 'M' : 'L') + `${px.toFixed(2)},${py.toFixed(2)} `;
        }
        return (
          <motion.path
            key={index}
            d={d.trim()}
            stroke={shape.stroke || 'black'}
            strokeWidth={shape.stroke_width || 1}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: index * 0.3, ease: "easeInOut" as const }}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-indigo-500" />
          Interactive Cultural Geometry
        </h3>
        {geometry && (
          <button
            onClick={handleDownloadSVG}
            className="text-sm flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors px-3 py-1 rounded-md hover:bg-indigo-50"
          >
            <Download className="w-4 h-4" />
            SVG
          </button>
        )}
      </div>
      
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-6 min-h-[500px]">
        {geometry ? (
          <svg 
            ref={svgRef}
            viewBox="0 0 1000 1000" 
            className="w-full h-full max-h-[600px] drop-shadow-xl"
            style={{ background: geometry.canvas.background === 'none' ? 'transparent' : geometry.canvas.background }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Draw Coordinate System faintly first */}
            <motion.line x1="0" y1="500" x2="1000" y2="500" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
            <motion.line x1="500" y1="0" x2="500" y2="1000" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
            
            {/* Draw Layers */}
            {geometry.layers.map((layer, idx) => renderShape(layer, idx + 1))}
          </svg>
        ) : (
          <div className="text-center text-slate-400">
            <p>Your animated artwork will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
