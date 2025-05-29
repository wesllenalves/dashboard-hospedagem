import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  hostingId: number;

  @ApiProperty({ example: 'checkin' })
  @IsString()
  type: string;

  @ApiProperty({ example: '2024-07-01T10:00:00Z' })
  @IsDateString()
  scheduledAt: string;

  @ApiProperty({ example: 'anotação', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}