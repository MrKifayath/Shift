import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PomodoroSession, SessionType } from './entities/pomodoro-session.entity';
import { RedisService } from '../redis/redis.service';
import { StartTimerDto } from './dto/start-timer.dto';

interface TimerState {
  sessionId: string;
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  currentType: SessionType;
  startTime: number;
  duration: number;
  pausedAt?: number;
  totalPausedTime: number;
}

@Injectable()
export class TimerService {
  constructor(
    @InjectRepository(PomodoroSession)
    private sessionsRepository: Repository<PomodoroSession>,
    private redisService: RedisService,
  ) {}

  async startTimer(userId: string, startTimerDto: StartTimerDto): Promise<TimerState> {
    // Check if user has an active timer
    const activeTimer = await this.getCurrentTimer(userId);
    if (activeTimer && activeTimer.isActive) {
      throw new BadRequestException('Timer is already running');
    }

    // Create new session
    const session = this.sessionsRepository.create({
      userId,
      taskId: startTimerDto.taskId,
      type: startTimerDto.type || SessionType.WORK,
      duration: startTimerDto.duration,
      startTime: new Date(),
    });

    const savedSession = await this.sessionsRepository.save(session);

    // Store timer state in Redis
    const timerState: TimerState = {
      sessionId: savedSession.id,
      isActive: true,
      isPaused: false,
      timeRemaining: startTimerDto.duration * 60, // Convert to seconds
      currentType: savedSession.type,
      startTime: Date.now(),
      duration: startTimerDto.duration * 60,
      totalPausedTime: 0,
    };

    await this.redisService.set(
      `timer:${userId}`,
      JSON.stringify(timerState),
      startTimerDto.duration * 60 + 300, // TTL with buffer
    );

    return timerState;
  }

  async pauseTimer(userId: string): Promise<TimerState> {
    const timerState = await this.getCurrentTimer(userId);
    if (!timerState || !timerState.isActive) {
      throw new BadRequestException('No active timer to pause');
    }

    if (timerState.isPaused) {
      throw new BadRequestException('Timer is already paused');
    }

    timerState.isPaused = true;
    timerState.pausedAt = Date.now();

    await this.redisService.set(`timer:${userId}`, JSON.stringify(timerState));
    return timerState;
  }

  async resumeTimer(userId: string): Promise<TimerState> {
    const timerState = await this.getCurrentTimer(userId);
    if (!timerState || !timerState.isActive) {
      throw new BadRequestException('No active timer to resume');
    }

    if (!timerState.isPaused) {
      throw new BadRequestException('Timer is not paused');
    }

    if (timerState.pausedAt) {
      timerState.totalPausedTime += Date.now() - timerState.pausedAt;
    }

    timerState.isPaused = false;
    delete timerState.pausedAt;

    await this.redisService.set(`timer:${userId}`, JSON.stringify(timerState));
    return timerState;
  }

  async completeTimer(userId: string): Promise<PomodoroSession> {
    const timerState = await this.getCurrentTimer(userId);
    if (!timerState) {
      throw new BadRequestException('No active timer to complete');
    }

    // Update session in database
    const session = await this.sessionsRepository.findOne({
      where: { id: timerState.sessionId },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    session.completed = true;
    session.endTime = new Date();
    session.pausedDuration = Math.floor(timerState.totalPausedTime / 1000);

    const completedSession = await this.sessionsRepository.save(session);

    // Clear timer state from Redis
    await this.redisService.del(`timer:${userId}`);

    return completedSession;
  }

  async getCurrentTimer(userId: string): Promise<TimerState | null> {
    const timerData = await this.redisService.get(`timer:${userId}`);
    if (!timerData) {
      return null;
    }

    const timerState: TimerState = JSON.parse(timerData);
    
    // Calculate current time remaining
    if (timerState.isActive && !timerState.isPaused) {
      const elapsed = (Date.now() - timerState.startTime - timerState.totalPausedTime) / 1000;
      timerState.timeRemaining = Math.max(0, timerState.duration - elapsed);
      
      // Auto-complete if time is up
      if (timerState.timeRemaining <= 0) {
        await this.completeTimer(userId);
        return null;
      }
    }

    return timerState;
  }

  async getSessionHistory(userId: string, limit = 50): Promise<PomodoroSession[]> {
    return this.sessionsRepository.find({
      where: { userId },
      order: { startTime: 'DESC' },
      take: limit,
      relations: ['task'],
    });
  }
}