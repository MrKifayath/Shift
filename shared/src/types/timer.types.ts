export enum SessionType {
  WORK = 'work',
  SHORT_BREAK = 'short_break',
  LONG_BREAK = 'long_break',
}

export interface PomodoroSession {
  id: string;
  userId: string;
  taskId?: string;
  type: SessionType;
  duration: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  pausedDuration: number;
}

export interface TimerState {
  sessionId: string | null;
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  currentType: SessionType;
  startTime: number;
  duration: number;
  pausedAt?: number;
  totalPausedTime: number;
}

export interface StartTimerRequest {
  duration: number;
  type?: SessionType;
  taskId?: string;
}