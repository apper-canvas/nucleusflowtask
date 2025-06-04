import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, isToday, isTomorrow, isYesterday, isPast } from 'date-fns'
import { ApperIcon } from '../components'

const priorityConfig = {
  low: { color: 'bg-surface-400', text: 'text-surface-400', label: 'Low' },
  medium: { color: 'bg-accent', text: 'text-accent', label: 'Medium' },
  high: { color: 'bg-orange-500', text: 'text-orange-500', label: 'High' },
  urgent: { color: 'bg-urgent', text: 'text-urgent', label: 'Urgent' }
}

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-surface-100 dark:bg-surface-800' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20' },
  done: { label: 'Done', color: 'bg-secondary/10 dark:bg-secondary/20' }
}

const TaskCard = ({ task, users, onUpdate, onDelete, isDragging, ...dragProps }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title || '')
  const [showDetails, setShowDetails] = useState(false)

  const assignee = users?.find(user => user.id === task.assignee)
  const priority = priorityConfig[task.priority] || priorityConfig.low

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    if (isYesterday(date)) return 'Yesterday'
    return format(date, 'MMM d')
  }

  const handleTitleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate({ ...task, title: editTitle.trim() })
      toast.success('Task updated successfully')
    }
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus) => {
    onUpdate({ ...task, status: newStatus })
    if (newStatus === 'done') {
      toast.success('Task completed! 🎉')
    } else {
      toast.success('Task status updated')
    }
  }

  const handlePriorityChange = (newPriority) => {
    onUpdate({ ...task, priority: newPriority })
    toast.success('Priority updated')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id)
      toast.success('Task deleted')
    }
  }

  const dueDateDisplay = formatDueDate(task.dueDate)
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'done'

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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => handleStatusChange(task.status === 'done' ? 'todo' : 'done')}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center task-transition ${
              task.status === 'done'
                ? 'bg-secondary border-secondary'
                : 'border-surface-300 dark:border-surface-600 hover:border-secondary'
            }`}
          >
            {task.status === 'done' && (
              <ApperIcon name="Check" className="w-3 h-3 text-white" />
            )}
          </button>
          
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave()
                  if (e.key === 'Escape') {
                    setEditTitle(task.title || '')
                    setIsEditing(false)
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
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 task-transition"
          >
            <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 rounded-md"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 rounded-md">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-3">
          {/* Priority */}
          <div className="relative group/priority">
            <button className={`w-3 h-3 rounded-full ${priority.color} task-transition hover:scale-110`}>
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-surface-900 text-white text-xs rounded opacity-0 group-hover/priority:opacity-100 task-transition pointer-events-none whitespace-nowrap">
              {priority.label} Priority
            </div>
          </div>

          {/* Due Date */}
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

        {/* Assignee */}
        {assignee && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xs font-medium">
              {assignee.name ? assignee.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-surface-200 dark:border-surface-700 pt-3 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-surface-500 dark:text-surface-500 block mb-1">Status</label>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full text-xs bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded px-2 py-1"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-surface-500 dark:text-surface-500 block mb-1">Priority</label>
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  className="w-full text-xs bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded px-2 py-1"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-1 text-xs text-urgent hover:text-urgent/80 task-transition"
            >
              <ApperIcon name="Trash2" className="w-3 h-3" />
              <span>Delete Task</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const TaskColumn = ({ status, tasks, users, onUpdate, onDelete }) => {
  const config = statusConfig[status]
  const columnTasks = tasks.filter(task => task.status === status)

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
            <ApperIcon name="Package" className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tasks here</p>
          </div>
        )}
      </div>
    </div>
  )
}

const QuickAddModal = ({ isOpen, onClose, onSubmit, users, projects }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    tags: '',
    projectId: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('Task title is required')
      return
    }

    const newTask = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    onSubmit(newTask)
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignee: '',
      tags: '',
      projectId: ''
    })
    toast.success('Task created successfully!')
  }

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
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What needs to be done?"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows="2"
                  placeholder="Add more details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="urgent, design, review (comma separated)"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 task-transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg task-transition"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function MainFeature({ 
  tasks, 
  users, 
  projects, 
  onTaskUpdate, 
  onTaskCreate, 
  onTaskDelete,
  showQuickAdd,
  setShowQuickAdd 
}) {
  const [viewMode, setViewMode] = useState('board') // 'list', 'board'

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => 
      t.dueDate && 
      isPast(new Date(t.dueDate)) && 
      t.status !== 'done'
    ).length
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-surface-200 dark:border-surface-700"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{taskStats.total}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400">Total Tasks</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-surface-200 dark:border-surface-700"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-surface-100 dark:bg-surface-700 rounded-lg flex items-center justify-center">
              <ApperIcon name="Circle" className="w-5 h-5 text-surface-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{taskStats.todo}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400">To Do</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-surface-200 dark:border-surface-700"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{taskStats.inProgress}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400">In Progress</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-surface-200 dark:border-surface-700"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{taskStats.done}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400">Completed</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-surface-200 dark:border-surface-700"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-urgent/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-urgent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{taskStats.overdue}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400">Overdue</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* View Controls */}
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

        <button
          onClick={() => setShowQuickAdd(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg task-transition font-medium"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Task Views */}
      <AnimatePresence mode="wait">
        {viewMode === 'board' ? (
          <motion.div
            key="board"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4"
          >
            <TaskColumn
              status="todo"
              tasks={tasks}
              users={users}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
            />
            <TaskColumn
              status="in-progress"
              tasks={tasks}
              users={users}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
            />
            <TaskColumn
              status="done"
              tasks={tasks}
              users={users}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-3"
          >
            <AnimatePresence>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={users}
                  onUpdate={onTaskUpdate}
                  onDelete={onTaskDelete}
                />
              ))}
            </AnimatePresence>
            
            {tasks.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="CheckSquare" className="w-16 h-16 mx-auto mb-4 text-surface-300 dark:text-surface-600" />
                <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No tasks yet</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">Create your first task to get started</p>
                <button
                  onClick={() => setShowQuickAdd(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg task-transition"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        onSubmit={onTaskCreate}
        users={users}
        projects={projects}
      />
    </div>
  )
}