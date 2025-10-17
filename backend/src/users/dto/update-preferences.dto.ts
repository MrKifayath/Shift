import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsBoolean, Min, Max } from 'class-validator';

export class UpdatePreferencesDto {
  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(60)
  workDuration?: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  @Min(3)
  @Max(15)
  shortBreakDuration?: number;

  @ApiProperty({ example: 15, required: false })
  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(60)
  longBreakDuration?: number;

  @ApiProperty({ example: 'bell', required: false })
  @IsOptional()
  @IsString()
  notificationSound?: string;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  notificationVolume?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;
}