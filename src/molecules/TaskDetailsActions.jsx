import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Select from '../atoms/Select';

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

const TaskDetailsActions = ({ showDetails, task, onStatusChange, onPriorityChange, onDelete }) => (
  <AnimatePresence>
    {showDetails && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="border-t border-surface-200 dark:border-surface-700 pt-3 space-y-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Status"
            value={task.status}
            onChange={(e) => onStatusChange(e.target.value)}
            options={statusOptions}
            className="text-surface-900 dark:text-white"
          />
          <Select
            label="Priority"
            value={task.priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            options={priorityOptions}
            className="text-surface-900 dark:text-white"
          />
        </div>
        <button
          onClick={onDelete}
          className="flex items-center space-x-1 text-xs text-urgent hover:text-urgent/80 task-transition"
        >
          <ApperIcon name="Trash2" className="w-3 h-3" />
          <span>Delete Task</span>
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default TaskDetailsActions;