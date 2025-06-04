import React from 'react';
import ApperIcon from '../ApperIcon';

const AlertIcon = ({ className = 'w-12 h-12 text-urgent' }) => (
  <ApperIcon name="AlertTriangle" className={`${className} mx-auto mb-4`} />
);

export default AlertIcon;