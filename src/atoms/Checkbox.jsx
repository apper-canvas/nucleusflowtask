import React from 'react';
import ApperIcon from '../ApperIcon';

const Checkbox = ({ checked, onChange, className = '', ...props }) => (
  <button
    onClick={onChange}
    className={`w-5 h-5 rounded border-2 flex items-center justify-center task-transition ${
      checked
        ? 'bg-secondary border-secondary'
        : 'border-surface-300 dark:border-surface-600 hover:border-secondary'
    } ${className}`}
    {...props}
  >
    {checked && (
      <ApperIcon name="Check" className="w-3 h-3 text-white" />
    )}
  </button>
);

export default Checkbox;