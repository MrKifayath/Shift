import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimerState {
  sessionId: string | null
  isActive: boolean
  isPaused: boolean
  timeRemaining: number
  currentType: 'work' | 'short_break' | 'long_break'
  duration: number
  completedPomodoros: number
  startTime: number | null
  pausedTime: number
  selectedTaskId: string | null
}

interface TimerStore extends TimerState {
  setTimerState: (state: Partial<TimerState>) => void
  resetTimer: () => void
  tick: () => void
  setSelectedTask: (taskId: string | null) => void
}

const initialState: TimerState = {
  sessionId: null,
  isActive: false,
  isPaused: false,
  timeRemaining: 25 * 60, // 25 minutes in seconds
  currentType: 'work',
  duration: 25 * 60,
  completedPomodoros: 0,
  startTime: null,
  pausedTime: 0,
  selectedTaskId: null,
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setTimerState: (newState) => {
        set((state) => ({ ...state, ...newState }))
      },
      resetTimer: () => {
        set({
          ...initialState,
          timeRemaining: get().duration, // Keep current duration
        })
      },
      tick: () => {
        const state = get()
        if (state.isActive && !state.isPaused && state.timeRemaining > 0) {
          set({ timeRemaining: state.timeRemaining - 1 })
        }
      },
      setSelectedTask: (taskId) => {
        set({ selectedTaskId: taskId })
      },
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        completedPomodoros: state.completedPomodoros,
        selectedTaskId: state.selectedTaskId,
        // Don't persist active timer state to avoid issues on reload
      }),
    }
  )
)