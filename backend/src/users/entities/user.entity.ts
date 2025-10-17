import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { UserPreferences } from './user-preferences.entity';
import { Task } from '../../tasks/entities/task.entity';
import { PomodoroSession } from '../../timer/entities/pomodoro-session.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => UserPreferences, preferences => preferences.user, { cascade: true })
  preferences: UserPreferences;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @OneToMany(() => PomodoroSession, session => session.user)
  pomodoroSessions: PomodoroSession[];
}