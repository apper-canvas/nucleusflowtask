import React from 'react';
import ApperIcon from '../ApperIcon';

const IconButton = ({ iconName, onClick, className = '', children, ...props }) => (
  <button
    onClick={onClick}
    className={`p-2 text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white task-transition rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 ${className}`}
    {...props}
  >
    <ApperIcon name={iconName} className="w-5 h-5" />
    {children}
  </button>
);

export default IconButton;