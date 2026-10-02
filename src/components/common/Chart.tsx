import React, { useState } from 'react';
import { OVERVIEW_CHART_POINTS } from '../../constants/mockData';

interface ChartProps {
  selectedMetric?: 'spend' | 'ctr' | 'cpa' | 'roas';
}

export const OverviewPerformanceChart: React.FC<ChartProps> = ({ selectedMetric = 'roas' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const points = OVERVIEW_CHART_POINTS;
  const width = 840;
  const height = 240;
  const paddingLeft = 46;
  const paddingRight = 24;
  const paddingTop = 20;
  const paddingBottom = 34;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Y-axis ticks for ROAS: 2.0x to 4.4x
  const yTicks = [
    { label: '4.4x', y: paddingTop },
    { label: '3.8x', y: paddingTop + chartH * 0.25 },
    { label: '3.2x', y: paddingTop + chartH * 0.5 },
    { label: '2.6x', y: paddingTop + chartH * 0.75 },
    { label: '2.0x', y: paddingTop + chartH },
  ];

  // Map data to x, y coordinates
  const minY = 2.0;
  const maxY = 4.4;

  const coords = points.map((p, i) => {
    const x = paddingLeft + (i / (points.length - 1)) * chartW;
    const yVal = Math.min(Math.max(p.roas, minY), maxY);
    const y = paddingTop + chartH - ((yVal - minY) / (maxY - minY)) * chartH;
    return { ...p, x, y };
  });

  // Build SVG path
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const mx = (p0.x + p1.x) / 2;
    pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  const fillD = `${pathD} L ${coords[coords.length - 1].x} ${paddingTop + chartH} L ${coords[0].x} ${paddingTop + chartH} Z`;

  // X labels
  const xLabels = [
    { date: '23 Aug', x: coords[0].x },
    { date: '30 Aug', x: coords[3].x },
    { date: '6 Sep', x: coords[5].x },
    { date: '13 Sep', x: coords[7].x },
    { date: '21 Sep', x: coords[coords.length - 1].x },
  ];

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ACD9F3" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#ACD9F3" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ACD9F3" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines and Y-axis labels */}
        {yTicks.map((tick, idx) => (
          <g key={idx}>
            <line
              x1={paddingLeft}
              y1={tick.y}
              x2={width - paddingRight}
              y2={tick.y}
              stroke="#252831"
              strokeDasharray={idx === yTicks.length - 1 ? 'none' : '3 3'}
              strokeWidth="1"
            />
            <text
              x={paddingLeft - 10}
              y={tick.y + 3}
              textAnchor="end"
              className="text-[11px] fill-[#727681] font-mono tabular-nums"
            >
              {tick.label}
            </text>
          </g>
        ))}

        {/* Volume Bars in background */}
        {coords.map((coord, idx) => {
          const barW = 14;
          const barH = (coord.barHeight / 100) * (chartH * 0.55);
          const barY = paddingTop + chartH - barH;
          const isHovered = hoveredIndex === idx;
          return (
            <rect
              key={`bar-${idx}`}
              x={coord.x - barW / 2}
              y={barY}
              width={barW}
              height={barH}
              rx={3}
              fill={isHovered ? '#343842' : '#1A1D24'}
              className="transition-colors duration-150"
            />
          );
        })}

        {/* Translucent Fill */}
        <path d={fillD} fill="url(#chartGradient)" />

        {/* Smooth Ice-Blue Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#ACD9F3"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Invisible hit targets for hover */}
        {coords.map((coord, idx) => (
          <g key={`hit-${idx}`}>
            <rect
              x={coord.x - chartW / points.length / 2}
              y={paddingTop}
              width={chartW / points.length}
              height={chartH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
            />
            {hoveredIndex === idx && (
              <>
                <line
                  x1={coord.x}
                  y1={paddingTop}
                  x2={coord.x}
                  y2={paddingTop + chartH}
                  stroke="#ACD9F3"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity={0.6}
                />
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="5"
                  fill="#08090B"
                  stroke="#ACD9F3"
                  strokeWidth="2.5"
                />
              </>
            )}
          </g>
        ))}

        {/* X-axis labels */}
        {xLabels.map((lbl, idx) => (
          <text
            key={idx}
            x={lbl.x}
            y={height - 8}
            textAnchor={idx === 0 ? 'start' : idx === xLabels.length - 1 ? 'end' : 'middle'}
            className="text-[11px] fill-[#727681] font-mono tabular-nums"
          >
            {lbl.date}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && coords[hoveredIndex] && (
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-2 bg-[#121419] border border-[#343842] rounded-xl shadow-xl text-xs flex flex-col gap-1"
          style={{
            left: `${(coords[hoveredIndex].x / width) * 100}%`,
            top: `${(coords[hoveredIndex].y / height) * 100 - 6}%`,
          }}
        >
          <div className="text-[#A0A1AA] font-mono text-[10px]">{coords[hoveredIndex].date}</div>
          <div className="flex items-center gap-2">
            <span className="text-[#F0F1F7] font-semibold font-mono">{coords[hoveredIndex].roas}x ROAS</span>
            <span className="text-[#66D4AA] text-[10px] font-mono">↑ 18%</span>
          </div>
          <div className="text-[10px] text-[#727681] font-mono">
            Spend: ${coords[hoveredIndex].spend.toLocaleString()} · CTR: {coords[hoveredIndex].ctr}%
          </div>
        </div>
      )}
    </div>
  );
};
