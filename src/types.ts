export type Alignment = 'red' | 'yellow' | 'green';

export interface Goal {
  id: string;
  title: string;
  color: string;
  progress: number; // 0-100
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  alignment: Alignment;
  type: 'meeting' | 'focus';
  goalId?: string; // If linked to a goal
  description?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system';
  text: string;
  type: 'text' | 'action-card' | 'report';
  actionData?: {
    label: string;
    action: 'fix-schedule' | 'generate-report';
  };
  timestamp: Date;
}

export interface AppState {
  currentTab: 'command-center' | 'insights' | 'doc-insights';
  goals: Goal[];
  events: CalendarEvent[];
  chatHistory: ChatMessage[];
  isDocModalOpen: boolean;
  docAnalysisResult: DocAnalysis | null;
}

export interface DocAnalysis {
  alignmentScore: number;
  status: string;
  issues: string[];
  missingData: string[];
}
