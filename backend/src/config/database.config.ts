import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserPreferences } from '../users/entities/user-preferences.entity';
import { Category } from '../tasks/entities/category.entity';
import { Task } from '../tasks/entities/task.entity';
import { PomodoroSession } from '../timer/entities/pomodoro-session.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      username: this.configService.get('DB_USERNAME', 'postgres'),
      password: this.configService.get('DB_PASSWORD', 'password'),
      database: this.configService.get('DB_NAME', 'pomodoro_app'),
      entities: [
        User,
        UserPreferences,
        Category,
        Task,
        PomodoroSession,
      ],
      synchronize: this.configService.get('NODE_ENV') !== 'production',
      logging: this.configService.get('NODE_ENV') === 'development',
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    };
  }
}

// Export DataSource for CLI commands
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'pomodoro_app',
  entities: [
    'src/**/*.entity.ts',
  ],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
};

export default new DataSource(dataSourceOptions);