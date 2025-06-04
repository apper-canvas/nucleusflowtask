import React from 'react';
import PrimaryButton from '../atoms/PrimaryButton';

const ModalButtonRow = ({ onCancel, onCreate }) => (
  <div className="flex space-x-3 pt-4">
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 task-transition"
    >
      Cancel
    </button>
    <PrimaryButton type="submit" onClick={onCreate} className="flex-1">
      Create Task
    </PrimaryButton>
  </div>
);

export default ModalButtonRow;