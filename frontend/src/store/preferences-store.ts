import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferences {
  workDuration: number      // minutes
  shortBreakDuration: number
  longBreakDuration: number
  notificationSound: string
  notificationVolume: number
  emailNotifications: boolean
  theme: 'light' | 'dark' | 'system'
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  longBreakInterval: number // after how many pomodoros
}

interface PreferencesState {
  preferences: UserPreferences
  updatePreferences: (updates: Partial<UserPreferences>) => void
  resetToDefaults: () => void
}

const defaultPreferences: UserPreferences = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  notificationSound: 'bell',
  notificationVolume: 50,
  emailNotifications: true,
  theme: 'system',
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,
      updatePreferences: (updates) => {
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
        }))
      },
      resetToDefaults: () => {
        set({ preferences: defaultPreferences })
      },
    }),
    {
      name: 'preferences-storage',
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
)