import React from 'react';

const ProjectMenuItem = ({ project, isSelected, onClick }) => (
  <button
    key={project.id}
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-lg task-transition text-sm ${
      isSelected
        ? 'bg-primary/10 text-primary font-medium'
        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
      <span className="truncate">{project.name}</span>
    </div>
  </button>
);

export default ProjectMenuItem;