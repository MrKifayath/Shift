import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { PomodoroSession } from './entities/pomodoro-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PomodoroSession])],
  controllers: [TimerController],
  providers: [TimerService],
  exports: [TimerService],
})
export class TimerModule {}