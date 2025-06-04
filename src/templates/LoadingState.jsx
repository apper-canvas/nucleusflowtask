import React from 'react';
import Spinner from '../atoms/Spinner';

const LoadingState = ({ message = "Loading your tasks..." }) => (
  <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center">
    <div className="text-center">
      <Spinner />
      <p className="text-surface-600 dark:text-surface-400">{message}</p>
    </div>
  </div>
);

export default LoadingState;