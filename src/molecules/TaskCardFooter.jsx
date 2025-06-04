import React from 'react';
import { format, isToday, isTomorrow, isYesterday, isPast } from 'date-fns';
import PriorityDot from '../atoms/PriorityDot';
import Avatar from '../atoms/Avatar';

const priorityConfig = {
  low: { color: 'bg-surface-400', label: 'Low' },
  medium: { color: 'bg-accent', label: 'Medium' },
  high: { color: 'bg-orange-500', label: 'High' },
  urgent: { color: 'bg-urgent', label: 'Urgent' }
};

const TaskCardFooter = ({ task, assignee }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.low;

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d');
  };

  const dueDateDisplay = formatDueDate(task.dueDate);
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'done';

  return (
    <div className="flex items-center justify-between pt-2">
      <div className="flex items-center space-x-3">
        <PriorityDot color={priority.color} label={priority.label} />
        {dueDateDisplay && (
          <span className={`text-xs px-2 py-1 rounded-md ${
            isOverdue
              ? 'bg-urgent/10 text-urgent'
              : task.status === 'done'
              ? 'bg-surface-100 dark:bg-surface-700 text-surface-500'
              : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
          }`}>
            {dueDateDisplay}
          </span>
        )}
      </div>
      {assignee && <Avatar name={assignee.name} />}
    </div>
  );
};

export default TaskCardFooter;