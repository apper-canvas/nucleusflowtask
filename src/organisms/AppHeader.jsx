import React from 'react';
import { motion } from 'framer-motion';
import AppLogo from '../atoms/AppLogo';
import IconButton from '../atoms/IconButton';
import PrimaryButton from '../atoms/PrimaryButton';
import SearchBar from '../molecules/SearchBar';

const AppHeader = ({ searchQuery, setSearchQuery, onQuickAdd, darkMode, setDarkMode }) => {
  return (
    <motion.header
      className="sticky top-0 z-40 bg-white/95 dark:bg-surface-900/95 backdrop-blur-md border-b border-surface-200 dark:border-surface-700"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <AppLogo />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex items-center space-x-2">
            <IconButton
              iconName={darkMode ? "Sun" : "Moon"}
              onClick={() => setDarkMode(!darkMode)}
            />
            <PrimaryButton onClick={onQuickAdd} iconName="Plus" className="hidden sm:flex">
              Add Task
            </PrimaryButton>
            <PrimaryButton onClick={onQuickAdd} iconName="Plus" className="sm:hidden p-2">
              {/* Mobile version, only icon */}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;