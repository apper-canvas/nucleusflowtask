import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../ApperIcon';
import FormField from '../molecules/FormField';
import ModalButtonRow from '../molecules/ModalButtonRow';

const QuickAddModal = ({ isOpen, onClose, onSubmit, users, projects }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    tags: '',
    projectId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    const newTask = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit(newTask);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignee: '',
      tags: '',
      projectId: ''
    });
    toast.success('Task created successfully!');
  };

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const userOptions = users.map(user => ({ value: user.id, label: user.name }));
  const projectOptions = projects.map(project => ({ value: project.id, label: project.name }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-surface-800 rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-surface-900 dark:text-white">Add New Task</h2>
              <button
                onClick={onClose}
                className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 task-transition"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What needs to be done?"
                autoFocus
              />
              <FormField
                label="Description"
                type="textarea"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add more details..."
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Priority"
                  type="select"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  options={priorityOptions}
                />
                <FormField
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <FormField
                label="Assignee"
                type="select"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                options={[{ value: '', label: 'Select Assignee' }, ...userOptions]}
              />
              <FormField
                label="Project"
                type="select"
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                options={[{ value: '', label: 'Select Project' }, ...projectOptions]}
              />
              <FormField
                label="Tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="urgent, design, review (comma separated)"
              />
              <ModalButtonRow onCancel={onClose} />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickAddModal;