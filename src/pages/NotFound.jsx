import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <ApperIcon name="Search" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-800 dark:text-surface-200 mb-4">
          Task Not Found
        </h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
          The page you're looking for seems to have been completed and archived. 
          Let's get you back to your active tasks.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium task-transition shadow-soft"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Tasks</span>
          </Link>
        </motion.div>
        
        <div className="mt-8 pt-8 border-t border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-500 dark:text-surface-500">
            Lost? Try searching for what you need or check your recent tasks.
          </p>
        </div>
      </motion.div>
    </div>
  )
}