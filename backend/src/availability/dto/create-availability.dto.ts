import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString } from 'class-validator';

export class CreateAvailabilityDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  hostingId: number;

  @ApiProperty({ example: '2024-08-01T00:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'disponível' })
  @IsString()
  status: string;
}