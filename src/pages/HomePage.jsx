import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import { taskService } from '../services'

const Header = ({ searchQuery, setSearchQuery, onQuickAdd, darkMode, setDarkMode }) => {
  return (
    <motion.header 
      className="sticky top-0 z-40 bg-white/95 dark:bg-surface-900/95 backdrop-blur-md border-b border-surface-200 dark:border-surface-700"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white hidden sm:block">FlowTask</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 sm:mx-8">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search tasks... (Press / to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent task-transition"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white task-transition rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5" />
            </button>
            <button
              onClick={onQuickAdd}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg task-transition font-medium"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Task</span>
            </button>
            <button
              onClick={onQuickAdd}
              className="sm:hidden p-2 bg-primary hover:bg-primary-dark text-white rounded-lg task-transition"
            >
              <ApperIcon name="Plus" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

const Sidebar = ({ projects, selectedProject, setSelectedProject, isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            className="fixed left-0 top-14 bottom-0 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700 z-40 lg:static lg:z-auto"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Projects</h3>
                <div className="space-y-1">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project.id)
                        setIsOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg task-transition text-sm ${
                        selectedProject === project.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                        <span className="truncate">{project.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Quick Filters</h3>
                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 rounded-lg task-transition text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center space-x-3">
                    <ApperIcon name="Calendar" className="w-4 h-4" />
                    <span>Due Today</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg task-transition text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center space-x-3">
                    <ApperIcon name="AlertTriangle" className="w-4 h-4" />
                    <span>High Priority</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg task-transition text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center space-x-3">
                    <ApperIcon name="Users" className="w-4 h-4" />
                    <span>Assigned to Me</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tasksResult, projectsResult, usersResult] = await Promise.all([
          taskService.getAll(),
          fetch('/src/services/mockData/projects.json').then(r => r.json()),
          fetch('/src/services/mockData/users.json').then(r => r.json())
        ])
        setTasks(tasksResult || [])
        setProjects([{ id: 'all', name: 'All Projects', color: 'bg-surface-400' }, ...(projectsResult || [])])
        setUsers(usersResult || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Filter tasks based on search and project
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = !searchQuery || 
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesProject = selectedProject === 'all' || task.projectId === selectedProject
    
    return matchesSearch && matchesProject
  })

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const result = await taskService.update(updatedTask.id, updatedTask)
      setTasks(prev => prev.map(task => task.id === updatedTask.id ? result : task))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleTaskCreate = async (newTask) => {
    try {
      const result = await taskService.create(newTask)
      setTasks(prev => [...prev, result])
      setShowQuickAdd(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-surface-600 dark:text-surface-400">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="w-12 h-12 text-urgent mx-auto mb-4" />
          <p className="text-surface-900 dark:text-white font-medium mb-2">Something went wrong</p>
          <p className="text-surface-600 dark:text-surface-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onQuickAdd={() => setShowQuickAdd(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <div className="flex">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-4 left-4 z-50 w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg task-transition flex items-center justify-center"
        >
          <ApperIcon name={sidebarOpen ? "X" : "Menu"} className="w-6 h-6" />
        </button>

        <Sidebar 
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-2">
                {selectedProject === 'all' ? 'All Tasks' : projects.find(p => p.id === selectedProject)?.name || 'Tasks'}
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} 
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            <MainFeature 
              tasks={filteredTasks}
              users={users}
              projects={projects}
              onTaskUpdate={handleTaskUpdate}
              onTaskCreate={handleTaskCreate}
              onTaskDelete={handleTaskDelete}
              showQuickAdd={showQuickAdd}
              setShowQuickAdd={setShowQuickAdd}
            />
          </div>
        </main>
      </div>
    </div>
  )
}