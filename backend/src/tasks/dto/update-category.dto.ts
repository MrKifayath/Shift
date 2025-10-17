import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Work Projects', required: false })
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiProperty({ example: '#3498db', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'Color must be a valid hex color' })
  color?: string;
}