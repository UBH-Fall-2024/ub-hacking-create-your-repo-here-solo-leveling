'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, setHours, setMinutes } from 'date-fns';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  includeTime?: boolean;
}

const TimeSpinner = ({ value, onChange, max }: { 
  value: number; 
  onChange: (value: number) => void;
  max: number;
}) => {
  const handleIncrement = () => {
    onChange((value + 1) % max);
  };

  const handleDecrement = () => {
    onChange(value === 0 ? max - 1 : value - 1);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Up Arrow / Previous Number */}
      <motion.div
        whileHover={{ y: -2 }}
        onClick={handleDecrement}
        className="cursor-pointer text-muted-foreground/50 hover:text-purple-500 transition-colors"
      >
        {((value - 1 + max) % max).toString().padStart(2, '0')}
      </motion.div>

      {/* Current Value */}
      <div className="text-lg font-medium my-1">
        {value.toString().padStart(2, '0')}
      </div>

      {/* Down Arrow / Next Number */}
      <motion.div
        whileHover={{ y: 2 }}
        onClick={handleIncrement}
        className="cursor-pointer text-muted-foreground/50 hover:text-purple-500 transition-colors"
      >
        {((value + 1) % max).toString().padStart(2, '0')}
      </motion.div>
    </div>
  );
};

export function DatePicker({ value, onChange, placeholder = "Select deadline...", includeTime = true }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({
    hours: value instanceof Date ? value.getHours() : 0,
    minutes: value instanceof Date ? value.getMinutes() : 0
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [openUpward, setOpenUpward] = useState(false);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceNeeded = 400; // Approximate height of calendar
      setOpenUpward(spaceBelow < spaceNeeded);
    }
  }, [isOpen]);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleSelect = (date: Date) => {
    if (includeTime) {
      const dateWithTime = setMinutes(
        setHours(date, selectedTime.hours),
        selectedTime.minutes
      );
      onChange(dateWithTime);
    } else {
      onChange(date);
    }
    setIsOpen(false);
  };

  const formatDisplayValue = () => {
    if (!value) return placeholder;
    const dateStr = format(value, 'MMM dd, yyyy');
    const timeStr = includeTime ? format(value, 'HH:mm') : '';
    return timeStr ? `${dateStr} at ${timeStr}` : dateStr;
  };

  // Update selectedTime when value changes
  useEffect(() => {
    if (value instanceof Date) {
      setSelectedTime({
        hours: value.getHours(),
        minutes: value.getMinutes()
      });
    }
  }, [value]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:border-purple-500/50 transition-colors text-left group"
      >
        <CalendarIcon className="w-4 h-4 text-purple-500 group-hover:text-purple-400 transition-colors" />
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {formatDisplayValue()}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openUpward ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpward ? -10 : 10 }}
            className={`absolute z-50 ${
              openUpward ? 'bottom-full mb-2' : 'top-full mt-2'
            } left-0 p-4 bg-background/95 border border-purple-500/20 rounded-lg shadow-lg backdrop-blur-sm min-w-[320px]`}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1 hover:text-purple-500 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-sm font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1 hover:text-purple-500 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Weekday Headers */}
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground p-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {days.map((day) => {
                const isSelected = value ? isSameDay(day, value) : false;
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isCurrentDay = isToday(day);

                return (
                  <motion.button
                    key={day.toString()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(day)}
                    className={`
                      relative p-2 text-sm rounded-md transition-colors
                      ${!isCurrentMonth && 'text-muted-foreground/50'}
                      ${isSelected && 'bg-purple-500 text-white'}
                      ${!isSelected && isCurrentMonth && 'hover:bg-purple-500/20'}
                      ${isCurrentDay && !isSelected && 'text-purple-500 font-semibold'}
                    `}
                  >
                    {format(day, 'd')}
                    {isCurrentDay && !isSelected && (
                      <div className="absolute inset-1 border border-purple-500 rounded-md pointer-events-none" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Time Selection */}
            {includeTime && (
              <div className="mt-4 border-t border-purple-500/20 pt-4">
                <div className="flex flex-col items-center gap-2">
                  <label className="text-sm text-muted-foreground">Set Time</label>
                  <div className="flex items-center gap-4 bg-background/50 p-3 rounded-lg border border-purple-500/20">
                    <TimeSpinner
                      value={selectedTime.hours}
                      onChange={(hours) => {
                        setSelectedTime(prev => ({ ...prev, hours }));
                        if (value) {
                          onChange(setHours(value, hours));
                        }
                      }}
                      max={24}
                    />
                    <span className="text-2xl text-purple-500">:</span>
                    <TimeSpinner
                      value={selectedTime.minutes}
                      onChange={(minutes) => {
                        setSelectedTime(prev => ({ ...prev, minutes }));
                        if (value) {
                          onChange(setMinutes(value, minutes));
                        }
                      }}
                      max={60}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-4 flex justify-between border-t border-purple-500/20 pt-4">
              <button
                onClick={() => handleSelect(new Date())}
                className="text-sm text-muted-foreground hover:text-purple-500 transition-colors"
              >
                Now
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 