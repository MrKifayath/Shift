import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsNumber, Min, Max, MaxLength, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Complete project documentation', required: false })
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiProperty({ example: 'Write comprehensive documentation for the new feature', required: false })
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  estimatedPomodoros?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}