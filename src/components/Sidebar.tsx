import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Target, Calendar, Check, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

const Sidebar = () => {
  const { goals, addGoal, updateGoal, connectCalendar, isCalendarConnected, isCalendarLoading, userEmail } = useApp();
  const [newGoalText, setNewGoalText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      addGoal(newGoalText.trim());
      setNewGoalText('');
      setIsAdding(false);
    }
  };

  const handleConnect = async () => {
    await connectCalendar();
  };

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Calendar Connection Status */}
      <div className="mb-6">
        <button
          onClick={handleConnect}
          disabled={isCalendarConnected || isCalendarLoading}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all border",
            isCalendarConnected 
              ? "bg-green-50 border-green-200 text-green-700 cursor-default"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
          )}
        >
          {isCalendarLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Connecting...
            </>
          ) : isCalendarConnected ? (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <Check size={16} />
                <span>Connected</span>
              </div>
              <span className="text-xs text-green-600 opacity-80 pl-6">{userEmail}</span>
            </div>
          ) : (
            <>
              <Calendar size={16} />
              Connect Google Calendar
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Target size={16} />
          Weekly Goals
        </h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {goals.map((goal) => (
          <motion.div 
            key={goal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-3">
              <div 
                className="w-3 h-3 rounded-full mt-1.5 shrink-0" 
                style={{ backgroundColor: goal.color }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={goal.title}
                  onChange={(e) => updateGoal(goal.id, e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 border-none p-0 focus:ring-0 placeholder-gray-400"
                  placeholder="Goal Title"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Time Allocation</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ backgroundColor: goal.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleAddGoal}
            className="bg-white border-2 border-dashed border-indigo-200 rounded-xl p-4"
          >
            <input
              autoFocus
              type="text"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="Enter new goal..."
              className="w-full text-sm border-none p-0 focus:ring-0 mb-2"
              onBlur={() => !newGoalText && setIsAdding(false)}
            />
            <div className="flex justify-end">
              <button 
                type="submit"
                className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md font-medium"
              >
                Add
              </button>
            </div>
          </motion.form>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-indigo-900 font-semibold text-sm mb-1">Pro Tip</h3>
          <p className="text-indigo-700 text-xs leading-relaxed">
            Align your calendar events to these goals to track your strategic focus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
