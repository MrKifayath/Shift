import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'johndoe', required: false })
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  username?: string;
}