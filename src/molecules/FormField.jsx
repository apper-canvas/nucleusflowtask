import React from 'react';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const FormField = ({ label, type = 'text', value, onChange, placeholder, required, options, rows }) => {
  const inputProps = {
    value,
    onChange,
    placeholder,
    className: "w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary",
  };

  return (
    <div>
      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
        {label} {required && '*'}
      </label>
      {type === 'select' ? (
        <Select options={options} {...inputProps} />
      ) : (
        <Input type={type} rows={rows} {...inputProps} />
      )}
    </div>
  );
};

export default FormField;