import React from 'react';
import ApperIcon from '../ApperIcon';

const QuickFilterMenuItem = ({ iconName, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-3 py-2 rounded-lg task-transition text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center space-x-3"
  >
    <ApperIcon name={iconName} className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

export default QuickFilterMenuItem;