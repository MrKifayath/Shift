import { Controller, Get, Post, Put, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TimerService } from './timer.service';
import { StartTimerDto } from './dto/start-timer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('timer')
@Controller('timer')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a new Pomodoro timer' })
  @ApiResponse({ status: 201, description: 'Timer started successfully' })
  startTimer(@Request() req, @Body() startTimerDto: StartTimerDto) {
    return this.timerService.startTimer(req.user.id, startTimerDto);
  }

  @Put('pause')
  @ApiOperation({ summary: 'Pause the current timer' })
  @ApiResponse({ status: 200, description: 'Timer paused successfully' })
  pauseTimer(@Request() req) {
    return this.timerService.pauseTimer(req.user.id);
  }

  @Put('resume')
  @ApiOperation({ summary: 'Resume the paused timer' })
  @ApiResponse({ status: 200, description: 'Timer resumed successfully' })
  resumeTimer(@Request() req) {
    return this.timerService.resumeTimer(req.user.id);
  }

  @Put('complete')
  @ApiOperation({ summary: 'Complete the current timer' })
  @ApiResponse({ status: 200, description: 'Timer completed successfully' })
  completeTimer(@Request() req) {
    return this.timerService.completeTimer(req.user.id);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current timer state' })
  @ApiResponse({ status: 200, description: 'Current timer state retrieved' })
  getCurrentTimer(@Request() req) {
    return this.timerService.getCurrentTimer(req.user.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get session history' })
  @ApiResponse({ status: 200, description: 'Session history retrieved' })
  getHistory(@Request() req, @Query('limit') limit?: number) {
    return this.timerService.getSessionHistory(req.user.id, limit);
  }
}