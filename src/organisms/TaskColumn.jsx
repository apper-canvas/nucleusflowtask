import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import NoTasksIcon from '../atoms/NoTasksIcon';
import { ApperIcon } from '../components';

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-surface-100 dark:bg-surface-800' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20' },
  done: { label: 'Done', color: 'bg-secondary/10 dark:bg-secondary/20' }
};

const TaskColumn = ({ status, tasks, users, onUpdate, onDelete }) => {
  const config = statusConfig[status];
  const columnTasks = tasks.filter(task => task.status === status);

  return (
    <div className="flex-1 min-w-0">
      <div className={`${config.color} rounded-lg p-4 mb-4`}>
        <h3 className="font-semibold text-surface-900 dark:text-white mb-1">
          {config.label}
        </h3>
        <p className="text-sm text-surface-600 dark:text-surface-400">
          {columnTasks.length} task{columnTasks.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-3 min-h-[400px]">
        <AnimatePresence>
          {columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>

        {columnTasks.length === 0 && (
          <div className="text-center py-12 text-surface-400 dark:text-surface-600">
            <NoTasksIcon />
            <p className="text-sm">No tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;