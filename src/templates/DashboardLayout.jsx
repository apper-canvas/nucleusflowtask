import React from 'react';
import AppHeader from '../organisms/AppHeader';
import Sidebar from '../organisms/Sidebar';
import ApperIcon from '../components/ApperIcon';

const DashboardLayout = ({
  searchQuery,
  setSearchQuery,
  onQuickAdd,
  darkMode,
  setDarkMode,
  projects,
  selectedProject,
  setSelectedProject,
  sidebarOpen,
  setSidebarOpen,
  children
}) => {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <AppHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onQuickAdd={onQuickAdd}
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
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;