import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Stats } from '../types';

interface Props {
  stats: Stats;
}

export const StatsRadar: React.FC<Props> = ({ stats }) => {
  const data = [
    { subject: 'FUE', A: stats.strength, fullMark: 100 },
    { subject: 'AGI', A: stats.agility, fullMark: 100 },
    { subject: 'TEC', A: stats.technique, fullMark: 100 },
    { subject: 'VEL', A: stats.speed, fullMark: 100 },
    { subject: 'DEF', A: stats.defense, fullMark: 100 },
    { subject: 'RES', A: stats.resilience, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#94a3b8" strokeOpacity={0.3} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Stats"
            dataKey="A"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="#3b82f6"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};