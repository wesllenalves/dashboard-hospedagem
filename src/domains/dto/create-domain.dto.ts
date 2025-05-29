import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreateDomainDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  hostingId: number;

  @ApiProperty({ example: 'meudominio.com' })
  @IsString()
  domainName: string;

  @ApiProperty({ example: 'RegistroBR', required: false })
  @IsOptional()
  @IsString()
  registrar?: string;

  @ApiProperty({ example: '2024-06-01T00:00:00Z' })
  @IsDateString()
  registrationDate: string;

  @ApiProperty({ example: '2025-06-01T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;
}