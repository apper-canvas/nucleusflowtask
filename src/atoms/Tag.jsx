import React from 'react';

const Tag = ({ children, className = '' }) => (
  <span className={`px-2 py-1 text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 rounded-md ${className}`}>
    {children}
  </span>
);

export default Tag;