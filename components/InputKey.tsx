import React from 'react';

export const InputKey: React.FC<{ k: string }> = ({ k }) => {
  const base = "inline-flex items-center justify-center w-6 h-6 rounded text-[10px] font-bold mx-0.5 shadow-sm border border-b-2";
  
  // Default Style
  let colorClass = "bg-gray-100 text-gray-600 border-gray-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
  
  // Xbox Color Scheme
  // A - Green (Heavy)
  if (k === 'A') colorClass = "bg-green-100 text-green-700 border-green-500 shadow-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-600 dark:shadow-none";
  // B - Red (Grapple)
  if (k === 'B') colorClass = "bg-red-100 text-red-700 border-red-500 shadow-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-600 dark:shadow-none";
  // X - Blue (Light)
  if (k === 'X') colorClass = "bg-blue-100 text-blue-700 border-blue-500 shadow-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-600 dark:shadow-none";
  // Y - Yellow/Amber (Special)
  if (k === 'Y') colorClass = "bg-yellow-100 text-yellow-700 border-yellow-500 shadow-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600 dark:shadow-none";

  // Shoulder Buttons / Triggers
  if (['RT', 'LT', 'RB', 'LB'].includes(k)) {
    colorClass = "bg-slate-800 text-white border-slate-900 w-auto px-1.5 shadow-slate-300 dark:bg-slate-200 dark:text-slate-900 dark:border-slate-400 dark:shadow-none";
  }
  
  // Directional
  if (['↑', '↓', '←', '→'].includes(k)) {
    colorClass = "bg-gray-200 text-slate-700 border-gray-300 dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500";
  }

  return (
    <span className={`${base} ${colorClass}`}>
      {k}
    </span>
  );
};