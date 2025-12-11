import React from 'react';
import { useApp } from '../context/AppContext';
import { CalendarEvent, Alignment } from '../types';
import { format, addDays, startOfWeek, differenceInMinutes, getHours, getMinutes, isSameDay } from 'date-fns';
import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const CalendarView = () => {
  const { events, goals, isCalendarLoading } = useApp();
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  const getEventStyle = (event: CalendarEvent) => {
    const startHour = getHours(event.start) + getMinutes(event.start) / 60;
    const endHour = getHours(event.end) + getMinutes(event.end) / 60;
    const duration = endHour - startHour;
    
    // Grid starts at 8 AM. 
    // 1 hour = 60px (approx height)
    const top = (startHour - 8) * 60; 
    const height = duration * 60;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  const getGoalColor = (goalId?: string) => {
    if (!goalId) return null;
    return goals.find(g => g.id === goalId)?.color;
  };

  const AlignmentIcon = ({ alignment }: { alignment: Alignment }) => {
    switch (alignment) {
      case 'red':
        return <AlertTriangle size={14} className="text-red-500" />;
      case 'yellow':
        return <HelpCircle size={14} className="text-yellow-500" />;
      case 'green':
        return <CheckCircle2 size={14} className="text-green-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Calendar Header */}
      <div className="flex border-b border-gray-200">
        <div className="w-16 shrink-0 border-r border-gray-100 bg-gray-50"></div>
        {DAYS.map((day, i) => {
          const date = addDays(startOfCurrentWeek, i);
          const isToday = isSameDay(date, new Date());
          return (
            <div key={day} className="flex-1 py-3 text-center border-r border-gray-100 last:border-r-0">
              <div className="text-xs font-semibold text-gray-500 uppercase">{day}</div>
              <div className={cn(
                "text-lg font-medium mt-1 w-8 h-8 rounded-full flex items-center justify-center mx-auto",
                isToday ? "bg-indigo-600 text-white" : "text-gray-800"
              )}>
                {format(date, 'd')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-y-auto relative">
        {isCalendarLoading && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
             <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
             <p className="text-sm font-medium text-indigo-600">Importing Calendar...</p>
          </div>
        )}
        <div className="flex min-h-[660px] relative"> {/* 11 hours * 60px */}
          
          {/* Time Labels */}
          <div className="w-16 shrink-0 border-r border-gray-100 bg-gray-50 text-xs text-gray-400 text-right pr-2 pt-2 select-none">
            {HOURS.map(hour => (
              <div key={hour} className="h-[60px] relative -top-2.5">
                {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {DAYS.map((_, dayIndex) => {
            const dayDate = addDays(startOfCurrentWeek, dayIndex);
            const dayEvents = events.filter(e => isSameDay(e.start, dayDate));

            return (
              <div key={dayIndex} className="flex-1 border-r border-gray-100 last:border-r-0 relative bg-white">
                {/* Horizontal Grid Lines */}
                {HOURS.map(hour => (
                  <div key={hour} className="h-[60px] border-b border-gray-50 w-full absolute" style={{ top: (hour - 8) * 60 }}></div>
                ))}

                {/* Events */}
                <AnimatePresence>
                  {dayEvents.map(event => {
                    const style = getEventStyle(event);
                    const goalColor = getGoalColor(event.goalId);
                    const isFocus = event.type === 'focus';

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className={cn(
                          "absolute left-1 right-1 rounded-md p-2 text-xs border shadow-sm cursor-pointer hover:shadow-md transition-all group overflow-hidden",
                          isFocus ? "bg-purple-50 border-purple-200" : "bg-white border-gray-200"
                        )}
                        style={{ 
                          ...style,
                          borderLeftWidth: goalColor ? '4px' : '1px',
                          borderLeftColor: goalColor || (isFocus ? '#a855f7' : '#e5e7eb')
                        }}
                      >
                        {/* Alignment Triangle */}
                        {!isFocus && (
                          <div className="absolute top-1 right-1 z-10">
                             <div className="relative group/tooltip">
                                <AlignmentIcon alignment={event.alignment} />
                                {event.alignment === 'red' && (
                                  <div className="absolute right-0 top-full mt-1 w-48 bg-gray-900 text-white text-[10px] p-2 rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-50 pointer-events-none">
                                    {event.description || "This meeting does not map to any active goal. Recommended: Decline."}
                                  </div>
                                )}
                             </div>
                          </div>
                        )}

                        <div className="font-semibold text-gray-800 truncate pr-4">{event.title}</div>
                        <div className="text-gray-500 truncate">
                          {format(event.start, 'h:mm')} - {format(event.end, 'h:mm a')}
                        </div>
                        
                        {isFocus && (
                          <div className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-700">
                            Focus Time
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
