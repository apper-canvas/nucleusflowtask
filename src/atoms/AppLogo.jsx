import React from 'react';
import ApperIcon from '../ApperIcon';

const AppLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
      <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
    </div>
    <h1 className="text-xl font-bold text-surface-900 dark:text-white hidden sm:block">FlowTask</h1>
  </div>
);

export default AppLogo;