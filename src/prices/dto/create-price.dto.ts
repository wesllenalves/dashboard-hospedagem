import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsNumber } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  hostingId: number;

  @ApiProperty({ example: '2024-08-01T00:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 250.0 })
  @IsNumber()
  value: number;
}