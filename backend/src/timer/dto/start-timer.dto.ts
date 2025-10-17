import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { SessionType } from '../entities/pomodoro-session.entity';

export class StartTimerDto {
  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(1)
  @Max(120)
  duration!: number;

  @ApiProperty({ enum: SessionType, example: SessionType.WORK, required: false })
  @IsOptional()
  @IsEnum(SessionType)
  type?: SessionType;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsOptional()
  @IsUUID()
  taskId?: string;
}