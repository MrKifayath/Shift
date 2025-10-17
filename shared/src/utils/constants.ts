import { SessionType } from '../types/timer.types';

export const DEFAULT_DURATIONS = {
  [SessionType.WORK]: 25,
  [SessionType.SHORT_BREAK]: 5,
  [SessionType.LONG_BREAK]: 15,
} as const;

export const NOTIFICATION_SOUNDS = [
  'bell',
  'chime',
  'ding',
  'notification',
  'alert',
] as const;

export const DEFAULT_COLORS = [
  '#3498db', // Blue
  '#e74c3c', // Red
  '#2ecc71', // Green
  '#f39c12', // Orange
  '#9b59b6', // Purple
  '#1abc9c', // Turquoise
  '#34495e', // Dark Gray
  '#e67e22', // Carrot
] as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  USERS: {
    PROFILE: '/users/profile',
    PREFERENCES: '/users/preferences',
  },
  TASKS: {
    BASE: '/tasks',
    BY_ID: (id: string) => `/tasks/${id}`,
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
  },
  TIMER: {
    START: '/timer/start',
    PAUSE: '/timer/pause',
    RESUME: '/timer/resume',
    COMPLETE: '/timer/complete',
    CURRENT: '/timer/current',
    HISTORY: '/timer/history',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER_PREFERENCES: 'user-preferences',
  TIMER_STATE: 'timer-state',
} as const;