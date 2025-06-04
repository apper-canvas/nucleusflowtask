import React from 'react';
import ApperIcon from '../ApperIcon';

const PrimaryButton = ({ onClick, children, iconName, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg task-transition font-medium ${className}`}
    {...props}
  >
    {iconName && <ApperIcon name={iconName} className="w-4 h-4" />}
    {children}
  </button>
);

export default PrimaryButton;