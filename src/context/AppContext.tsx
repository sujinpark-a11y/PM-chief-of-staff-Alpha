import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Goal, CalendarEvent, ChatMessage, DocAnalysis } from '../types';
import { INITIAL_GOALS, INITIAL_EVENTS, IMPORTED_EVENTS, INITIAL_CHAT } from '../data/mockData';
import { addHours, startOfWeek, addDays, setHours } from 'date-fns';

interface AppContextType extends AppState {
  setTab: (tab: 'command-center' | 'insights' | 'doc-insights') => void;
  addGoal: (title: string) => void;
  updateGoal: (id: string, title: string) => void;
  fixSchedule: () => void;
  addChatMessage: (text: string, sender: 'user' | 'system', type?: ChatMessage['type'], actionData?: any) => void;
  analyzeDoc: () => void;
  closeDocModal: () => void;
  openDocModal: () => void;
  connectCalendar: () => Promise<void>;
  isCalendarConnected: boolean;
  isCalendarLoading: boolean;
  userEmail: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<'command-center' | 'insights'>('command-center');
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docAnalysisResult, setDocAnalysisResult] = useState<DocAnalysis | null>(null);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const setTab = (tab: 'command-center' | 'insights' | 'doc-insights') => setCurrentTab(tab);

  const connectCalendar = async () => {
    setIsCalendarLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsCalendarConnected(true);
        setUserEmail('sujinpark@google.com');
        setEvents(IMPORTED_EVENTS);
        addChatMessage("Successfully connected to Google Calendar (sujinpark@google.com). I've imported your events for this week and analyzed them against your goals.", 'system');
        setIsCalendarLoading(false);
        resolve();
      }, 1500);
    });
  };

  const addGoal = (title: string) => {
    const newGoal: Goal = {
      id: `g${Date.now()}`,
      title,
      color: '#ec4899', // Pink default
      progress: 0,
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: string, title: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, title } : g));
  };

  const addChatMessage = (text: string, sender: 'user' | 'system', type: ChatMessage['type'] = 'text', actionData?: any) => {
    const newMessage: ChatMessage = {
      id: `c${Date.now()}`,
      sender,
      text,
      type,
      actionData,
      timestamp: new Date(),
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const fixSchedule = () => {
    // 1. Remove Red events
    const filteredEvents = events.filter(e => e.alignment !== 'red');
    
    // 2. Add Focus Time blocks
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const newFocusBlocks: CalendarEvent[] = [
      {
        id: `f${Date.now()}-1`,
        title: 'Focus: Q3 Strategy',
        start: setHours(addDays(startOfCurrentWeek, 0), 13), // Mon 1pm
        end: setHours(addDays(startOfCurrentWeek, 0), 15),
        alignment: 'green',
        type: 'focus',
        goalId: 'g2',
      },
      {
        id: `f${Date.now()}-2`,
        title: 'Focus: Launch V1',
        start: setHours(addDays(startOfCurrentWeek, 1), 10), // Tue 10am (replacing the red meeting)
        end: setHours(addDays(startOfCurrentWeek, 1), 12),
        alignment: 'green',
        type: 'focus',
        goalId: 'g1',
      },
      {
        id: `f${Date.now()}-3`,
        title: 'Focus: Hire Designer',
        start: setHours(addDays(startOfCurrentWeek, 3), 14), // Thu 2pm
        end: setHours(addDays(startOfCurrentWeek, 3), 16),
        alignment: 'green',
        type: 'focus',
        goalId: 'g3',
      },
    ];

    setEvents([...filteredEvents, ...newFocusBlocks]);
    
    // Add system message confirming action
    addChatMessage("I've optimized your schedule. Removed 2 conflicting meetings and added 3 deep work blocks aligned with 'Q3 Strategy' and 'Launch V1'.", 'system');
  };

  const analyzeDoc = () => {
    // Simulate analysis
    setTimeout(() => {
      setDocAnalysisResult({
        alignmentScore: 80,
        status: 'Aligned',
        issues: [
          "Conflict: This feature contradicts the 'Simplicity' principle defined in the Org Strategy.",
        ],
        missingData: [
          "Missing user retention metrics to justify this feature."
        ]
      });
    }, 2000);
  };

  const openDocModal = () => {
    setIsDocModalOpen(true);
    setDocAnalysisResult(null); // Reset previous result
  };
  
  const closeDocModal = () => setIsDocModalOpen(false);

  return (
    <AppContext.Provider value={{
      currentTab,
      setTab,
      goals,
      addGoal,
      updateGoal,
      events,
      fixSchedule,
      chatHistory,
      addChatMessage,
      isDocModalOpen,
      docAnalysisResult,
      analyzeDoc,
      openDocModal,
      closeDocModal,
      connectCalendar,
      isCalendarConnected,
      isCalendarLoading,
      userEmail
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
