import React from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import CalendarView from './CalendarView';
import ChatPanel from './ChatPanel';
import InsightsView from './InsightsView';
import DocReviewModal from './DocReviewModal';
import { LayoutDashboard, PieChart, FileText } from 'lucide-react';
import { cn } from '../utils/cn';

import DocInsightsView from './DocInsightsView';

const MainLayout = () => {
  const { currentTab, setTab, isDocModalOpen } = useApp();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Top Navigation Bar (or integrated into sidebar/layout) */}
      {/* For this prototype, we'll use a simple top bar or just rely on the layout structure */}
      
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">PM</div>
            <h1 className="text-lg font-semibold text-gray-800">Chief of Staff</h1>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setTab('command-center')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                currentTab === 'command-center' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <LayoutDashboard size={16} />
              Command Center
            </button>
            <button
              onClick={() => setTab('insights')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                currentTab === 'insights' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <PieChart size={16} />
              Insights
            </button>
            <button
              onClick={() => setTab('doc-insights')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                currentTab === 'doc-insights' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <FileText size={16} />
              Doc Insights
            </button>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
             <img src="https://picsum.photos/seed/user/200/200" alt="User" referrerPolicy="no-referrer" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          {currentTab === 'command-center' ? (
            <div className="flex h-full">
              {/* Left Sidebar: Strategy & Goals */}
              <div className="w-80 border-r border-gray-200 bg-white h-full overflow-y-auto shrink-0">
                <Sidebar />
              </div>

              {/* Center Panel: Smart Calendar */}
              <div className="flex-1 bg-gray-50 h-full overflow-hidden relative">
                <CalendarView />
              </div>

              {/* Right Panel: Assistant Chat */}
              <div className="w-96 border-l border-gray-200 bg-white h-full flex flex-col shrink-0">
                <ChatPanel />
              </div>
            </div>
          ) : currentTab === 'insights' ? (
            <div className="h-full overflow-y-auto bg-gray-50 p-8">
              <InsightsView />
            </div>
          ) : (
            <div className="h-full overflow-y-auto bg-gray-50 p-8">
              <DocInsightsView />
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {isDocModalOpen && <DocReviewModal />}
    </div>
  );
};

export default MainLayout;
