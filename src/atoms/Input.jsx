import React from 'react';
import ApperIcon from '../ApperIcon';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  iconName,
  onBlur,
  onKeyDown,
  autoFocus,
  rows,
  ...props
}) => (
  <div className="relative">
    {iconName && (
      <ApperIcon name={iconName} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
    )}
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        rows={rows}
        className={`w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none ${className} ${iconName ? 'pl-10' : ''}`}
        placeholder={placeholder}
        {...props}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        className={`w-full px-3 py-2 text-sm bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent task-transition ${className} ${iconName ? 'pl-10' : ''}`}
        {...props}
      />
    )}
  </div>
);

export default Input;