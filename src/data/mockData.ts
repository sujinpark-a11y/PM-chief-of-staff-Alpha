import { Goal, CalendarEvent, ChatMessage } from '../types';
import { addHours, startOfWeek, addDays, setHours } from 'date-fns';

const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday

export const INITIAL_GOALS: Goal[] = [
  { id: 'g1', title: 'Launch V1', color: '#3b82f6', progress: 40 }, // Blue
  { id: 'g2', title: 'Q3 Strategy', color: '#8b5cf6', progress: 15 }, // Purple
  { id: 'g3', title: 'Hire Designer', color: '#10b981', progress: 60 }, // Emerald
];

// Helper to create dates relative to this week
const getEventDate = (dayOffset: number, hour: number) => {
  const d = addDays(startOfCurrentWeek, dayOffset);
  return setHours(d, hour);
};

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Weekly Sync',
    start: getEventDate(0, 9), // Mon 9am
    end: getEventDate(0, 10),
    alignment: 'yellow',
    type: 'meeting',
  },
  {
    id: 'e2',
    title: 'Stakeholder Review',
    start: getEventDate(0, 11), // Mon 11am
    end: getEventDate(0, 12),
    alignment: 'red', // Conflict!
    type: 'meeting',
    description: 'This meeting does not map to any active goal. Recommended: Decline.',
  },
  {
    id: 'e3',
    title: 'Design Huddle',
    start: getEventDate(0, 14), // Mon 2pm
    end: getEventDate(0, 15),
    alignment: 'green',
    goalId: 'g3',
    type: 'meeting',
  },
  {
    id: 'e4',
    title: 'Random 1:1',
    start: getEventDate(1, 10), // Tue 10am
    end: getEventDate(1, 10.5),
    alignment: 'red', // Conflict!
    type: 'meeting',
  },
  {
    id: 'e5',
    title: 'Strategy Workshop',
    start: getEventDate(1, 13), // Tue 1pm
    end: getEventDate(1, 15),
    alignment: 'green',
    goalId: 'g2',
    type: 'meeting',
  },
  {
    id: 'e6',
    title: 'V1 Bug Triage',
    start: getEventDate(2, 9), // Wed 9am
    end: getEventDate(2, 10),
    alignment: 'green',
    goalId: 'g1',
    type: 'meeting',
  },
   {
    id: 'e7',
    title: 'Marketing Sync',
    start: getEventDate(3, 11), // Thu 11am
    end: getEventDate(3, 12),
    alignment: 'yellow',
    type: 'meeting',
  },
];

export const IMPORTED_EVENTS: CalendarEvent[] = [
  {
    id: 'imp1',
    title: 'GVC: Weekly PM Sync',
    start: getEventDate(0, 9), // Mon 9am
    end: getEventDate(0, 10),
    alignment: 'yellow',
    type: 'meeting',
  },
  {
    id: 'imp2',
    title: '1:1 with Director',
    start: getEventDate(0, 10.5), // Mon 10:30am
    end: getEventDate(0, 11),
    alignment: 'green',
    goalId: 'g2',
    type: 'meeting',
  },
  {
    id: 'imp3',
    title: 'Eng Sync - V1 Launch',
    start: getEventDate(0, 13), // Mon 1pm
    end: getEventDate(0, 14),
    alignment: 'green',
    goalId: 'g1',
    type: 'meeting',
  },
  {
    id: 'imp4',
    title: 'Coffee Chat',
    start: getEventDate(0, 15), // Mon 3pm
    end: getEventDate(0, 15.5),
    alignment: 'red',
    type: 'meeting',
    description: 'Social catch-up. Low priority.',
  },
  {
    id: 'imp5',
    title: 'Q3 Roadmap Review',
    start: getEventDate(1, 10), // Tue 10am
    end: getEventDate(1, 12),
    alignment: 'green',
    goalId: 'g2',
    type: 'meeting',
  },
  {
    id: 'imp6',
    title: 'Design Critique',
    start: getEventDate(2, 14), // Wed 2pm
    end: getEventDate(2, 15.5),
    alignment: 'green',
    goalId: 'g3',
    type: 'meeting',
  },
  {
    id: 'imp7',
    title: 'All Hands',
    start: getEventDate(4, 11), // Fri 11am
    end: getEventDate(4, 12),
    alignment: 'yellow',
    type: 'meeting',
  },
  {
    id: 'imp8',
    title: 'Interview: Sr PM Candidate',
    start: getEventDate(3, 13), // Thu 1pm
    end: getEventDate(3, 14),
    alignment: 'green',
    goalId: 'g3',
    type: 'meeting',
  },
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'c1',
    sender: 'system',
    text: "Good morning! It's Monday. I've analyzed your calendar against your top goals. I found 2 high-conflict meetings that don't align with 'Launch V1' or 'Q3 Strategy'.",
    type: 'action-card',
    actionData: {
      label: 'Auto-Fix Schedule',
      action: 'fix-schedule',
    },
    timestamp: new Date(),
  },
];
