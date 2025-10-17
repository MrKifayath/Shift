export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  userId: string;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  notificationSound: string;
  notificationVolume: number;
  emailNotifications: boolean;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  username?: string;
}

export interface UpdatePreferencesRequest {
  workDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  notificationSound?: string;
  notificationVolume?: number;
  emailNotifications?: boolean;
}