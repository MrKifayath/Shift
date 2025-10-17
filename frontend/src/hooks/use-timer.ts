import { useEffect, useRef } from 'react'
import { useTimerStore } from '@/store/timer-store'
import { usePreferencesStore } from '@/store/preferences-store'
import { useToast } from '@/hooks/use-toast'

export function useTimer() {
  const timerStore = useTimerStore()
  const { preferences } = usePreferencesStore()
  const { toast } = useToast()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Timer tick effect
  useEffect(() => {
    if (timerStore.isActive && !timerStore.isPaused) {
      intervalRef.current = setInterval(() => {
        timerStore.tick()
        
        // Check if timer completed
        if (timerStore.timeRemaining <= 0) {
          handleTimerComplete()
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerStore.isActive, timerStore.isPaused, timerStore.timeRemaining])

  const handleTimerComplete = () => {
    // Stop the timer
    timerStore.setTimerState({ isActive: false, isPaused: false })
    
    // Show notification
    const isWorkSession = timerStore.currentType === 'work'
    
    if (isWorkSession) {
      const newCompletedPomodoros = timerStore.completedPomodoros + 1
      timerStore.setTimerState({ completedPomodoros: newCompletedPomodoros })
      
      // Determine next session type
      const isLongBreak = newCompletedPomodoros % preferences.longBreakInterval === 0
      const nextType = isLongBreak ? 'long_break' : 'short_break'
      const nextDuration = isLongBreak 
        ? preferences.longBreakDuration * 60 
        : preferences.shortBreakDuration * 60
      
      timerStore.setTimerState({
        currentType: nextType,
        duration: nextDuration,
        timeRemaining: nextDuration,
      })
      
      toast({
        title: "Work session complete! 🎉",
        description: `Time for a ${isLongBreak ? 'long' : 'short'} break.`,
      })
    } else {
      // Break completed, switch to work
      const workDuration = preferences.workDuration * 60
      timerStore.setTimerState({
        currentType: 'work',
        duration: workDuration,
        timeRemaining: workDuration,
      })
      
      toast({
        title: "Break time over! 💪",
        description: "Ready to start your next work session?",
      })
    }
    
    // Play notification sound if enabled
    if (preferences.notificationVolume > 0) {
      playNotificationSound()
    }
  }

  const playNotificationSound = () => {
    try {
      const audio = new Audio(`/sounds/${preferences.notificationSound}.mp3`)
      audio.volume = preferences.notificationVolume / 100
      audio.play().catch(console.error)
    } catch (error) {
      console.error('Failed to play notification sound:', error)
    }
  }

  const startTimer = () => {
    timerStore.setTimerState({ isActive: true, isPaused: false })
  }

  const pauseTimer = () => {
    timerStore.setTimerState({ isPaused: true })
  }

  const resumeTimer = () => {
    timerStore.setTimerState({ isPaused: false })
  }

  const stopTimer = () => {
    timerStore.setTimerState({ 
      isActive: false, 
      isPaused: false,
      timeRemaining: timerStore.duration 
    })
  }

  const resetTimer = () => {
    timerStore.resetTimer()
    const workDuration = preferences.workDuration * 60
    timerStore.setTimerState({
      duration: workDuration,
      timeRemaining: workDuration,
    })
  }

  return {
    ...timerStore,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer,
  }
}