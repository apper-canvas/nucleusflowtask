import React from 'react';

const Select = ({ label, value, onChange, options, className = '', ...props }) => (
  <div>
    {label && (
      <label className="block text-xs text-surface-500 dark:text-surface-500 block mb-1">
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      className={`w-full text-xs bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded px-2 py-1 ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;