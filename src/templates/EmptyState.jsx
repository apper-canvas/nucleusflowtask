import React from 'react';
import CheckSquareIcon from '../atoms/CheckSquareIcon';
import PrimaryButton from '../atoms/PrimaryButton';

const EmptyState = ({ onAddTask }) => (
  <div className="text-center py-12">
    <CheckSquareIcon />
    <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No tasks yet</h3>
    <p className="text-surface-600 dark:text-surface-400 mb-4">Create your first task to get started</p>
    <PrimaryButton onClick={onAddTask} iconName="Plus">
      Add Task
    </PrimaryButton>
  </div>
);

export default EmptyState;