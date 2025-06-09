import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateStayDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  hostingId: number;

  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  guestName: string;

  @ApiProperty({ example: '+5511999999999', required: false })
  @IsOptional()
  @IsString()
  guestPhone?: string;

  @ApiProperty({ example: '2024-07-01T14:00:00Z' })
  @IsDateString()
  checkIn: string;

  @ApiProperty({ example: '2024-07-10T12:00:00Z' })
  @IsDateString()
  checkOut: string;
}