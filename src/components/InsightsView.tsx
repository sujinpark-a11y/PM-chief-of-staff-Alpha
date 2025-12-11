import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { cn } from '../utils/cn';

const InsightsView = () => {
  const { goals } = useApp();
  const [reportFormat, setReportFormat] = useState<'chat' | 'email'>('email');
  const [isSent, setIsSent] = useState(false);

  // Mock Data for Charts
  const data = [
    { name: 'Launch V1', value: 50, color: '#3b82f6' },
    { name: 'Q3 Strategy', value: 20, color: '#8b5cf6' },
    { name: 'Overhead', value: 30, color: '#94a3b8' },
  ];

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weekly Insights</h2>
          <p className="text-gray-500">Review your time allocation and generate your status report.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100">
           <ShieldAlert size={18} />
           <span className="font-medium">4 hours of meetings avoided</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Time Allocation Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-indigo-500" />
            Time Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Report Generator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare size={20} className="text-indigo-500" />
              Weekly Report
            </h3>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setReportFormat('chat')}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  reportFormat === 'chat' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <MessageSquare size={16} />
              </button>
              <button
                onClick={() => setReportFormat('email')}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  reportFormat === 'email' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <Mail size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4 font-mono text-sm overflow-y-auto max-h-[300px]">
            {reportFormat === 'email' ? (
              <div className="space-y-4 text-gray-700 font-sans">
                <div className="border-b border-gray-200 pb-2 mb-2">
                  <span className="text-gray-500">Subject:</span> <span className="font-medium">Weekly Update: Launch V1 & Q3 Strategy</span>
                </div>
                <p>Hi Team,</p>
                <p>This week, my primary focus was on <strong>Launch V1</strong> (50% of time) and <strong>Q3 Strategy</strong> (20% of time).</p>
                
                <div>
                  <p className="font-semibold text-gray-900">Key Achievements:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Finalized V1 Bug Triage process.</li>
                    <li>Completed initial draft of Q3 Strategy.</li>
                    <li>Avoided 4 hours of low-leverage meetings to focus on deep work.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Blockers:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Waiting on Design Huddle outcomes for next steps on V1.</li>
                  </ul>
                </div>

                <p>Best,<br/>[Your Name]</p>
              </div>
            ) : (
              <div className="space-y-2 text-gray-800">
                <p>**Weekly Update** 🚀</p>
                <p>**Focus:** Launch V1 (50%), Q3 Strategy (20%)</p>
                <p>**Highlights:**</p>
                <p>- Finalized V1 Bug Triage</p>
                <p>- Drafted Q3 Strategy</p>
                <p>- Saved 4h focus time</p>
                <p>**Blockers:** Design Huddle pending</p>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <button
              onClick={handleSend}
              disabled={isSent}
              className={cn(
                "w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all",
                isSent 
                  ? "bg-green-600 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              )}
            >
              {isSent ? (
                <>
                  <CheckCircle2 size={18} />
                  Sent Successfully
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send to Manager
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InsightsView;
