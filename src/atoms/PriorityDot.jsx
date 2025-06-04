import React from 'react';

const PriorityDot = ({ color, label }) => (
  <div className="relative group/priority">
    <button className={`w-3 h-3 rounded-full ${color} task-transition hover:scale-110`}></button>
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-surface-900 text-white text-xs rounded opacity-0 group-hover/priority:opacity-100 task-transition pointer-events-none whitespace-nowrap">
      {label} Priority
    </div>
  </div>
);

export default PriorityDot;