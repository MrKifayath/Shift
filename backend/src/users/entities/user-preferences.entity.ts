import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_preferences')
export class UserPreferences {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Column({ name: 'work_duration', default: 25 })
  workDuration: number;

  @Column({ name: 'short_break_duration', default: 5 })
  shortBreakDuration: number;

  @Column({ name: 'long_break_duration', default: 15 })
  longBreakDuration: number;

  @Column({ name: 'notification_sound', default: 'bell' })
  notificationSound: string;

  @Column({ name: 'notification_volume', default: 50 })
  notificationVolume: number;

  @Column({ name: 'email_notifications', default: true })
  emailNotifications: boolean;

  @OneToOne(() => User, user => user.preferences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}