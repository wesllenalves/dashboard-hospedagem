import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  stayId: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  rating: number;

  @ApiProperty({ example: 'Ótima estadia!', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}