/**
 * 通用输入字段组件
 */
import { ChangeEvent, TextareaHTMLAttributes, InputHTMLAttributes } from "react";

interface BaseInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
}

interface SingleLineInputProps extends BaseInputProps {
  large?: false;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
}

interface MultiLineInputProps extends BaseInputProps {
  large: true;
  rows?: number;
}

type InputFieldProps = SingleLineInputProps | MultiLineInputProps;

export function InputField(props: InputFieldProps) {
  const {
    label,
    value,
    onChange,
    placeholder,
    required = false,
    error,
    helpText,
    large = false,
    ...rest
  } = props;

  const baseClasses = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {large ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={(rest as MultiLineInputProps).rows || 4}
          className={`${baseClasses} ${errorClasses} resize-vertical`}
        />
      ) : (
        <input
          type={(rest as SingleLineInputProps).type || "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses} ${errorClasses}`}
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
}

// 向后兼容的导出
export const InputForm = InputField; 