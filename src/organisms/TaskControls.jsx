import React from 'react';
import ApperIcon from '../ApperIcon';
import PrimaryButton from '../atoms/PrimaryButton';

const TaskControls = ({ viewMode, setViewMode, setShowQuickAdd }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
    <div className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
      <button
        onClick={() => setViewMode('board')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium task-transition ${
          viewMode === 'board'
            ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
            : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
        }`}
      >
        <ApperIcon name="Columns" className="w-4 h-4" />
        <span className="hidden sm:inline">Board</span>
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium task-transition ${
          viewMode === 'list'
            ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
            : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
        }`}
      >
        <ApperIcon name="List" className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
    <PrimaryButton onClick={() => setShowQuickAdd(true)} iconName="Plus">
      Add Task
    </PrimaryButton>
  </div>
);

export default TaskControls;