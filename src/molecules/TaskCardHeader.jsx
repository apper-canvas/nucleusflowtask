import React from 'react';
import Checkbox from '../atoms/Checkbox';
import Input from '../atoms/Input';
import ApperIcon from '../ApperIcon';

const TaskCardHeader = ({
  task,
  isEditing,
  editTitle,
  setEditTitle,
  handleTitleSave,
  setIsEditing,
  handleStatusChange,
  onToggleDetails,
}) => (
  <div className="flex items-start justify-between">
    <div className="flex items-center space-x-3 flex-1">
      <Checkbox
        checked={task.status === 'done'}
        onChange={() => handleStatusChange(task.status === 'done' ? 'todo' : 'done')}
      />
      <div className="flex-1">
        {isEditing ? (
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSave();
              if (e.key === 'Escape') {
                setEditTitle(task.title || '');
                setIsEditing(false);
              }
            }}
            className="w-full bg-transparent border-none outline-none text-surface-900 dark:text-white font-medium"
            autoFocus
          />
        ) : (
          <h3
            onDoubleClick={() => setIsEditing(true)}
            className={`font-medium cursor-pointer ${
              task.status === 'done'
                ? 'line-through text-surface-500'
                : 'text-surface-900 dark:text-white'
            }`}
          >
            {task.title || 'Untitled Task'}
          </h3>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 task-transition">
      <button
        onClick={onToggleDetails}
        className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 task-transition"
      >
        <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default TaskCardHeader;