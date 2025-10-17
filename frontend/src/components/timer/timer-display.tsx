'use client'

import { useTimer } from '@/hooks/use-timer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Square, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TimerDisplay() {
  const {
    timeRemaining,
    duration,
    isActive,
    isPaused,
    currentType,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer,
  } = useTimer()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((duration - timeRemaining) / duration) * 100

  const getSessionTypeInfo = () => {
    switch (currentType) {
      case 'work':
        return {
          title: 'Focus Time',
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-950',
          progressColor: 'bg-blue-600',
        }
      case 'short_break':
        return {
          title: 'Short Break',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-950',
          progressColor: 'bg-green-600',
        }
      case 'long_break':
        return {
          title: 'Long Break',
          color: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-50 dark:bg-purple-950',
          progressColor: 'bg-purple-600',
        }
    }
  }

  const sessionInfo = getSessionTypeInfo()

  return (
    <Card className={cn('w-full max-w-md mx-auto', sessionInfo.bgColor)}>
      <CardHeader className="text-center">
        <CardTitle className={cn('text-2xl', sessionInfo.color)}>
          {sessionInfo.title}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Completed Pomodoros: {completedPomodoros}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="text-6xl font-mono font-bold tracking-tight">
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2"
          />
          <div className="text-xs text-muted-foreground text-center">
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-2">
          {!isActive ? (
            <Button onClick={startTimer} size="lg" className="px-8">
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
          ) : isPaused ? (
            <Button onClick={resumeTimer} size="lg" className="px-8">
              <Play className="mr-2 h-4 w-4" />
              Resume
            </Button>
          ) : (
            <Button onClick={pauseTimer} size="lg" variant="secondary" className="px-8">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
          )}
          
          <Button onClick={stopTimer} size="lg" variant="outline">
            <Square className="mr-2 h-4 w-4" />
            Stop
          </Button>
          
          <Button onClick={resetTimer} size="lg" variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Session Status */}
        <div className="text-center text-sm text-muted-foreground">
          {isActive && !isPaused && 'Timer is running...'}
          {isActive && isPaused && 'Timer is paused'}
          {!isActive && 'Timer is stopped'}
        </div>
      </CardContent>
    </Card>
  )
}