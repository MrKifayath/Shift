// Validation schemas for shared use
// Note: These are type definitions. For runtime validation, 
// use class-validator in the backend DTOs

export interface CreateUserValidation {
    email: string;
    username: string;
    password: string;
}

export interface LoginValidation {
    email: string;
    password: string;
}

export interface CreateTaskValidation {
    title: string;
    description?: string;
    categoryId?: string;
    estimatedPomodoros: number;
}

export interface StartTimerValidation {
    duration: number;
    type?: 'work' | 'short_break' | 'long_break';
    taskId?: string;
}

export interface CreateCategoryValidation {
    name: string;
    color?: string;
}

export interface UpdatePreferencesValidation {
    workDuration?: number;
    shortBreakDuration?: number;
    longBreakDuration?: number;
    notificationSound?: string;
    notificationVolume?: number;
    emailNotifications?: boolean;
}

// Validation rules as constants for frontend use
export const VALIDATION_RULES = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    username: {
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    password: {
        required: true,
        minLength: 6,
    },
    taskTitle: {
        required: true,
        maxLength: 255,
    },
    taskDescription: {
        maxLength: 1000,
    },
    estimatedPomodoros: {
        required: true,
        min: 1,
        max: 20,
    },
    timerDuration: {
        required: true,
        min: 1,
        max: 120,
    },
    categoryName: {
        required: true,
        maxLength: 100,
    },
    colorPattern: /^#[0-9A-Fa-f]{6}$/,
    workDuration: {
        min: 15,
        max: 60,
    },
    shortBreakDuration: {
        min: 3,
        max: 15,
    },
    longBreakDuration: {
        min: 15,
        max: 60,
    },
    notificationVolume: {
        min: 0,
        max: 100,
    },
} as const;