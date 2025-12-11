import React from 'react';
import { FileText, Clock, AlertCircle, MessageSquare, User, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

// Mock Data
const WAITING_FOR_OTHERS = [
  { id: 1, title: 'Q3 Product Strategy', owner: 'Me', waitingOn: 'Director of Product', status: 'Approval', date: '2 days ago' },
  { id: 2, title: 'V1 Launch PRD', owner: 'Me', waitingOn: 'Eng Lead', status: 'Tech Review', date: '1 day ago' },
];

const WAITING_FOR_ME = [
  { id: 3, title: 'Marketing Launch Plan', owner: 'Sarah (PMM)', status: 'Sign-off', date: '4 hours ago', urgent: true },
  { id: 4, title: 'Design System Update', owner: 'Mike (Design)', status: 'Review', date: 'Yesterday', urgent: false },
];

const CRITICAL_COMMENTS = [
  { 
    id: 101, 
    doc: 'Q3 Roadmap', 
    author: 'VP of Product', 
    text: '@Sujin we need to cut scope on feature B to hit the deadline. Can you propose a phased approach?', 
    summary: 'VP asks to reduce scope on Feature B for Q3 deadline.',
    date: '1 hour ago',
    priority: 'high'
  },
  { 
    id: 102, 
    doc: 'V1 Technical Spec', 
    author: 'Staff Engineer', 
    text: '@Sujin this API requirement is a blocker for the mobile team. We need a decision by EOD.', 
    summary: 'Eng needs decision on API requirement by EOD to unblock mobile.',
    date: '3 hours ago',
    priority: 'high'
  },
  { 
    id: 103, 
    doc: 'User Research Report', 
    author: 'UX Researcher', 
    text: '@Sujin interesting finding here on the onboarding flow. Should we adjust the requirements?', 
    summary: 'UXR suggests adjusting onboarding reqs based on new findings.',
    date: 'Yesterday',
    priority: 'medium'
  }
];

const DocInsightsView = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Insights</h2>
          <p className="text-gray-500">Track approvals, reviews, and critical comments across your docs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Approvals & Reviews */}
        <div className="space-y-8">
          {/* Waiting for Others */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Clock size={18} className="text-amber-500" />
                Waiting for Others
              </h3>
              <span className="text-xs font-medium bg-white px-2 py-1 rounded-full border border-gray-200 text-gray-500">
                {WAITING_FOR_OTHERS.length} Docs
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {WAITING_FOR_OTHERS.map(doc => (
                <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      {doc.title}
                    </div>
                    <span className="text-xs text-gray-400">{doc.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 pl-6">
                    <span>Waiting on:</span>
                    <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">
                      {doc.waitingOn}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>For: {doc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Waiting for Me */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <AlertCircle size={18} className="text-indigo-500" />
                Waiting for Me
              </h3>
              <span className="text-xs font-medium bg-white px-2 py-1 rounded-full border border-gray-200 text-gray-500">
                {WAITING_FOR_ME.length} Docs
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {WAITING_FOR_ME.map(doc => (
                <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      {doc.title}
                      {doc.urgent && (
                        <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                          Urgent
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{doc.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 pl-6">
                    <span>Owner: {doc.owner}</span>
                    <span className="text-gray-300">•</span>
                    <span>Action: {doc.status}</span>
                    <button className="ml-auto text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Review Now <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Critical Comments */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full"
        >
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-red-500" />
              Critical Comments & Mentions
            </h3>
            <div className="flex gap-2">
               <span className="text-xs font-medium bg-red-50 text-red-700 px-2 py-1 rounded-full border border-red-100">
                {CRITICAL_COMMENTS.filter(c => c.priority === 'high').length} Critical
              </span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
            {CRITICAL_COMMENTS.map(comment => (
              <div key={comment.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                      comment.author.includes('VP') ? "bg-purple-600" : "bg-indigo-500"
                    )}>
                      {comment.author.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500 ml-2">on {comment.doc}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>

                <div className="pl-8">
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-2 border border-gray-100 italic">
                    "{comment.text}"
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 size={14} className="text-green-600" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Key Ask:</span>
                      <p className="text-sm font-medium text-gray-900">{comment.summary}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button className="text-xs font-medium text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                      Open Thread <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocInsightsView;
