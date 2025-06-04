import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const StatCard = ({ iconName, iconBgClass, value, label }) => (
  <motion.div
    className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-surface-200 dark:border-surface-700"
    whileHover={{ y: -2 }}
  >
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center`}>
        <ApperIcon name={iconName} className="w-5 h-5 text-current" /> {/* text-current inherits color from iconBgClass */}
      </div>
      <div>
        <p className="text-2xl font-bold text-surface-900 dark:text-white">{value}</p>
        <p className="text-sm text-surface-600 dark:text-surface-400">{label}</p>
      </div>
    </div>
  </motion.div>
);

export default StatCard;