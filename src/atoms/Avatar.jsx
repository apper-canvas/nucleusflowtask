import React from 'react';

const Avatar = ({ name, className = '' }) => (
  <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xs font-medium ${className}`}>
    {name ? name.charAt(0).toUpperCase() : 'U'}
  </div>
);

export default Avatar;