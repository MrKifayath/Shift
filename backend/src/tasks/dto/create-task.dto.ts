import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsNumber, Min, Max, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Complete project documentation' })
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @ApiProperty({ example: 'Write comprehensive documentation for the new feature', required: false })
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @Min(1)
  @Max(20)
  estimatedPomodoros!: number;
}