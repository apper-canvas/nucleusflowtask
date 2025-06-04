import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectMenuItem from '../molecules/ProjectMenuItem';
import QuickFilterMenuItem from '../molecules/QuickFilterMenuItem';

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
                    <ProjectMenuItem
                      key={project.id}
                      project={project}
                      isSelected={selectedProject === project.id}
                      onClick={() => {
                        setSelectedProject(project.id);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Quick Filters</h3>
                <div className="space-y-1">
                  <QuickFilterMenuItem iconName="Calendar" label="Due Today" onClick={() => {}} />
                  <QuickFilterMenuItem iconName="AlertTriangle" label="High Priority" onClick={() => {}} />
                  <QuickFilterMenuItem iconName="Users" label="Assigned to Me" onClick={() => {}} />
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;