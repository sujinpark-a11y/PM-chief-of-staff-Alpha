import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, ShieldAlert, Trophy, Target, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

const InsightsView = () => {
  const { goals } = useApp();
  const [reportFormat, setReportFormat] = useState<'chat' | 'email'>('email');
  const [isSent, setIsSent] = useState(false);

  // Updated Data for Charts to match screenshot
  const data = [
    { name: 'Strategic Goals', value: 65, color: '#6366f1' }, // Indigo/Blue
    { name: 'Stakeholder Noise', value: 15, color: '#f59e0b' }, // Amber/Orange
    { name: 'Admin / Other', value: 20, color: '#94a3b8' }, // Slate/Grey
  ];

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weekly Retrospective</h2>
          <p className="text-gray-500">How you spent your time vs. where you wanted to.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Time Distribution Chart (Spans 2 columns on large screens) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Time Distribution
          </h3>
          
          <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="text-center p-4 bg-indigo-50 rounded-xl">
              <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">Strategic Goals</div>
              <div className="text-3xl font-bold text-indigo-900">65%</div>
              <div className="text-xs text-indigo-400 mt-1">Target: &gt;60%</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">Stakeholder Noise</div>
              <div className="text-3xl font-bold text-amber-900">15%</div>
              <div className="text-xs text-amber-500 mt-1">Target: &lt;20%</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Admin / Other</div>
              <div className="text-3xl font-bold text-gray-700">20%</div>
              <div className="text-xs text-gray-400 mt-1">Target: &lt;20%</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Stats Cards */}
        <div className="space-y-6">
          {/* Victory Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3 text-indigo-100 font-medium text-sm uppercase tracking-wider">
              <Trophy size={16} />
              Victory
            </div>
            <div className="text-4xl font-bold mb-2">4 Meetings</div>
            <div className="text-indigo-100">Proactively declined this week.</div>
          </motion.div>

          {/* Time Reclaimed Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium mb-1">Time Reclaimed</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">3.5 Hours</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  That's enough time to complete <span className="font-semibold text-indigo-600">2 strategic deep dives</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Goal Progress Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
             <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Target size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium mb-1">Goal Progress</div>
                <div className="text-3xl font-bold text-gray-900">2/3 Goals</div>
              </div>
            </div>
            
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-blue-600 w-[66%] rounded-full" />
            </div>
            <p className="text-sm text-gray-500">On track for "Launch V2 Beta"</p>
          </motion.div>
        </div>
      </div>

      {/* Report Generator Section (Kept below for functionality) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare size={20} className="text-indigo-500" />
              Weekly Report Generator
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

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6 font-mono text-sm">
            {reportFormat === 'email' ? (
              <div className="space-y-4 text-gray-700 font-sans max-w-3xl">
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

          <div className="flex justify-end">
            <button
              onClick={handleSend}
              disabled={isSent}
              className={cn(
                "py-2.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all min-w-[160px]",
                isSent 
                  ? "bg-green-600 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              )}
            >
              {isSent ? (
                <>
                  <CheckCircle2 size={18} />
                  Sent
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
  );
};

export default InsightsView;
