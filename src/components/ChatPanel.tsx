import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Bot, User, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

const ChatPanel = () => {
  const { chatHistory, addChatMessage, fixSchedule, setTab, openDocModal } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    addChatMessage(text, 'user');
    setInputText('');

    // Wizard of Oz Logic
    const lowerText = text.toLowerCase();
    
    setTimeout(() => {
      if (lowerText.includes('fix') || lowerText.includes('schedule')) {
        addChatMessage("I can help with that. I've identified 2 meetings that conflict with your 'Launch V1' goal. Shall I optimize your schedule?", 'system', 'action-card', {
          label: 'Auto-Fix Schedule',
          action: 'fix-schedule'
        });
      } else if (lowerText.includes('report') || lowerText.includes('summary')) {
         addChatMessage("I've generated your weekly status report based on your calendar activity.", 'system', 'action-card', {
           label: 'View Report',
           action: 'generate-report'
         });
      } else if (lowerText.includes('analyze') || lowerText.includes('doc')) {
        addChatMessage("Please drag and drop the document you'd like me to analyze, or click below to upload.", 'system', 'action-card', {
            label: 'Upload Document',
            action: 'upload-doc'
        });
      } else {
        addChatMessage("I'm listening. You can ask me to 'Fix my schedule', 'Analyze a doc', or 'Generate a report'.", 'system');
      }
    }, 600);
  };

  const handleAction = (action: string) => {
    if (action === 'fix-schedule') {
      fixSchedule();
    } else if (action === 'generate-report') {
      setTab('insights');
    } else if (action === 'upload-doc') {
        openDocModal();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      openDocModal();
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-white relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Overlay for Drag State could go here, but for now just the drop action is enough */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-white z-10 shadow-sm">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
          <Sparkles size={16} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">AI Assistant</h3>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        <AnimatePresence initial={false}>
          {chatHistory.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3 max-w-[90%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                msg.sender === 'user' ? "bg-gray-200 text-gray-600" : "bg-indigo-600 text-white"
              )}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              
              <div className="space-y-2">
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.sender === 'user' 
                    ? "bg-white text-gray-800 rounded-tr-none border border-gray-100" 
                    : "bg-indigo-600 text-white rounded-tl-none"
                )}>
                  {msg.text}
                </div>

                {msg.type === 'action-card' && msg.actionData && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-gray-600">Suggested Action</span>
                    </div>
                    <button
                      onClick={() => handleAction(msg.actionData!.action)}
                      className="mt-2 w-full flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      {msg.actionData.label}
                      <ArrowRight size={14} />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a command..."
            className="w-full bg-gray-100 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-500/20"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-lg text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:hover:bg-white transition-colors shadow-sm"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
