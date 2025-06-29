/**
 * 日期时间选择器组件
 */
"use client"

import { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  helpText?: string;
}

export function DateTimePicker({ 
  label, 
  value, 
  onChange, 
  error, 
  required = false,
  helpText 
}: DateTimePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // 解析输入值
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        const timeString = date.toTimeString().slice(0, 5); // HH:MM格式
        setSelectedTime(timeString);
      }
    }
  }, [value]);

  // 点击外部关闭日历
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isCalendarOpen]);

  // 格式化日期为 datetime-local 格式
  const formatDateTime = (date: Date, time: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T${time}`;
  };

  // 快速选择选项
  const quickSelectOptions = [
    {
      label: "刚才",
      icon: "🕐",
      getValue: () => {
        const now = new Date();
        return formatDateTime(now, now.toTimeString().slice(0, 5));
      }
    },
    {
      label: "1小时前",
      icon: "⏰",
      getValue: () => {
        const date = new Date(Date.now() - 60 * 60 * 1000);
        return formatDateTime(date, date.toTimeString().slice(0, 5));
      }
    },
    {
      label: "今天上午",
      icon: "🌅",
      getValue: () => {
        const date = new Date();
        return formatDateTime(date, "09:00");
      }
    },
    {
      label: "昨天",
      icon: "📅",
      getValue: () => {
        const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return formatDateTime(date, "14:00");
      }
    },
    {
      label: "本周早些时候",
      icon: "📆",
      getValue: () => {
        const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        return formatDateTime(date, "15:00");
      }
    }
  ];

  // 处理日期选择
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const timeToUse = selectedTime || "12:00"; // 如果没有时间，默认为中午12点
    setSelectedTime(timeToUse);
    const newValue = formatDateTime(date, timeToUse);
    onChange(newValue);
  };

  // 处理时间选择
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    let dateToUse = selectedDate;
    if (!dateToUse) {
      dateToUse = new Date(); // 默认为今天
      setSelectedDate(dateToUse);
    }
    const newValue = formatDateTime(dateToUse, time);
    onChange(newValue);
  };

  // 快速选择处理
  const handleQuickSelect = (getValue: () => string) => {
    const newValue = getValue();
    onChange(newValue);
    setIsCalendarOpen(false);
  };

  // 生成日历日期
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const [calendarDate, setCalendarDate] = useState(new Date());
  const calendarDays = generateCalendarDays(calendarDate);
  const today = new Date();
  const maxDate = new Date(); // 不能选择未来时间

  // 格式化显示值
  const formatDisplayValue = (dateTimeValue: string) => {
    if (!dateTimeValue) return "";
    const date = new Date(dateTimeValue);
    if (isNaN(date.getTime())) return "";
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    const timeStr = date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    if (diffDays === 0) {
      if (diffMs < 60 * 60 * 1000) { // 小于1小时
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return diffMinutes <= 5 ? `刚才 (${timeStr})` : `${diffMinutes}分钟前 (${timeStr})`;
      } else {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return `${diffHours}小时前 (今天 ${timeStr})`;
      }
    } else if (diffDays === 1) {
      return `昨天 ${timeStr}`;
    } else if (diffDays < 7) {
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const weekday = weekdays[date.getDay()];
      return `${weekday} ${timeStr} (${diffDays}天前)`;
    } else {
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-black dark:text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      


      {/* 主要输入区域 */}
      <div className="relative" ref={containerRef}>
        <div
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className={`form-input cursor-pointer flex items-center justify-between ${
            error ? 'border-red-300' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4 text-gray-400" />
            <span className={value ? 'text-black dark:text-white' : 'text-gray-500'}>
              {value ? formatDisplayValue(value) : '请选择事发时间'}
            </span>
          </div>
          <FaClock className="w-4 h-4 text-gray-400" />
        </div>

        {/* 日历弹窗 */}
        {isCalendarOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
            {/* 日历头部 */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1))}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              
              <h3 className="font-medium text-black dark:text-white">
                {calendarDate.getFullYear()}年{calendarDate.getMonth() + 1}月
              </h3>
              
              <button
                type="button"
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1))}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                disabled={calendarDate.getFullYear() === today.getFullYear() && calendarDate.getMonth() >= today.getMonth()}
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 星期标题 */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                <div key={day} className="text-center text-xs text-gray-500 font-medium p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* 日历日期网格 */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {calendarDays.map((day, index) => {
                const isCurrentMonth = day.getMonth() === calendarDate.getMonth();
                const isToday = day.toDateString() === today.toDateString();
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                const isFuture = day > maxDate;
                const canSelect = isCurrentMonth && !isFuture;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => canSelect && handleDateSelect(day)}
                    disabled={!canSelect}
                    className={`
                      p-2 text-sm rounded transition-colors
                      ${!isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : ''}
                      ${isToday ? 'bg-blue-100 text-blue-700 font-bold' : ''}
                      ${isSelected ? 'bg-blue-600 text-white' : ''}
                      ${canSelect && !isSelected && !isToday ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                      ${isFuture ? 'opacity-50 cursor-not-allowed' : ''}
                      ${!canSelect ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>

            {/* 时间选择 */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                选择时间
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="form-input w-full"
                max={selectedDate && selectedDate.toDateString() === today.toDateString() ? 
                     today.toTimeString().slice(0, 5) : undefined}
              />
              {selectedDate && selectedDate.toDateString() === today.toDateString() && (
                <p className="text-xs text-gray-500 mt-1">
                  今天不能选择未来时间，当前时间: {today.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </p>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="px-4 py-2 text-sm text-black hover:text-gray-800 transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                disabled={!selectedDate || !selectedTime}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* 帮助文本 */}
      {helpText && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
} 