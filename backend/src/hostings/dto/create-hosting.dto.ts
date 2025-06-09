import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateHostingDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'Apartamento Central' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Apartamento confortável no centro.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Rua das Flores, 123' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'apartamento' })
  @IsString()
  type: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  rooms: number;

  @ApiProperty({ example: 1500.0 })
  @IsNumber()
  rentValue: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}