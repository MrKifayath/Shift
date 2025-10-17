import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

export enum SessionType {
  WORK = 'work',
  SHORT_BREAK = 'short_break',
  LONG_BREAK = 'long_break',
}

@Entity('pomodoro_sessions')
export class PomodoroSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'task_id', nullable: true })
  taskId?: string;

  @Column({
    type: 'enum',
    enum: SessionType,
  })
  type: SessionType;

  @Column()
  duration: number;

  @Column({ name: 'start_time' })
  startTime: Date;

  @Column({ name: 'end_time', nullable: true })
  endTime?: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ name: 'paused_duration', default: 0 })
  pausedDuration: number;

  @ManyToOne(() => User, user => user.pomodoroSessions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Task, task => task.pomodoroSessions, { nullable: true })
  @JoinColumn({ name: 'task_id' })
  task?: Task;
}