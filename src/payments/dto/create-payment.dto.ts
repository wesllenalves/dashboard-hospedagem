import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  hostingId: number;

  @ApiProperty({ example: 500.00 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2024-07-01T10:00:00Z' })
  @IsDateString()
  paidAt: string;

  @ApiProperty({ example: 'pix' })
  @IsString()
  method: string;

  @ApiProperty({ example: 'pago' })
  @IsString()
  status: string;

  @ApiProperty({ example: 'referência', required: false })
  @IsOptional()
  @IsString()
  reference?: string;
}