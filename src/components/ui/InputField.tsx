/**
 * 通用输入字段组件
 */
import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  large?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  error,
  helpText,
  large = false,
  rows,
  disabled = false,
  className = ""
}) => {
  const baseInputClass = `
    w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    transition-colors duration-200
    ${error ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'}
    ${disabled ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : 'hover:border-gray-400 dark:hover:border-gray-500'}
    ${className}
  `;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {large || rows ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows || 4}
          className={baseInputClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseInputClass}
        />
      )}
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

// 向后兼容的导出
export const InputForm = InputField; 