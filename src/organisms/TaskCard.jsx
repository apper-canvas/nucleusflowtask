import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskCardHeader from '../molecules/TaskCardHeader';
import TaskCardFooter from '../molecules/TaskCardFooter';
import TaskDetailsActions from '../molecules/TaskDetailsActions';
import TaskTags from '../molecules/TaskTags';

const TaskCard = ({ task, users, onUpdate, onDelete, isDragging, ...dragProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title || '');
  const [showDetails, setShowDetails] = useState(false);

  const assignee = users?.find(user => user.id === task.assignee);

  const handleTitleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate({ ...task, title: editTitle.trim() });
      toast.success('Task updated successfully');
    }
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    onUpdate({ ...task, status: newStatus });
    if (newStatus === 'done') {
      toast.success('Task completed! 🎉');
    } else {
      toast.success('Task status updated');
    }
  };

  const handlePriorityChange = (newPriority) => {
    onUpdate({ ...task, priority: newPriority });
    toast.success('Priority updated');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      toast.success('Task deleted');
    }
  };

  return (
    <motion.div
      className={`group bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-4 space-y-3 task-transition task-card-hover task-card-active ${
        isDragging ? 'drag-ghost' : ''
      } ${task.status === 'done' ? 'opacity-75' : ''}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      {...dragProps}
    >
      <TaskCardHeader
        task={task}
        isEditing={isEditing}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        handleTitleSave={handleTitleSave}
        setIsEditing={setIsEditing}
        handleStatusChange={handleStatusChange}
        onToggleDetails={() => setShowDetails(!showDetails)}
      />

      {task.description && (
        <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
          {task.description}
        </p>
      )}

      <TaskTags tags={task.tags} />
      <TaskCardFooter task={task} assignee={assignee} />
      <TaskDetailsActions
        showDetails={showDetails}
        task={task}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onDelete={handleDelete}
      />
    </motion.div>
  );
};

export default TaskCard;