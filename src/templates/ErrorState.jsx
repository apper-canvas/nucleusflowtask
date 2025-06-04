import React from 'react';
import AlertIcon from '../atoms/AlertIcon';

const ErrorState = ({ message = "Something went wrong", errorDetail }) => (
  <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center">
    <div className="text-center">
      <AlertIcon />
      <p className="text-surface-900 dark:text-white font-medium mb-2">{message}</p>
      {errorDetail && <p className="text-surface-600 dark:text-surface-400">{errorDetail}</p>}
    </div>
  </div>
);

export default ErrorState;