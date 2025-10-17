import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TimerModule } from './timer/timer.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseConfig } from './config/database.config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    RedisModule,
    AuthModule,
    UsersModule,
    TimerModule,
    TasksModule,
  ],
})
export class AppModule {}