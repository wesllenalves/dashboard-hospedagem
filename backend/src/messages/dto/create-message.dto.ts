import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  hostingId: number;

  @ApiProperty({ example: 'wesllenalves@gmail.com' })
  @IsString()
  to: string;

  @ApiProperty({ example: 'conteudo da mensagem' })
  @IsString()
  content: string;

  @ApiProperty({ example: '2024-07-01T10:00:00Z' })
  @IsDateString()
  sentAt: string;

  @ApiProperty({ example: "whatsapp" })
  @IsString()
  channel: string;

  @ApiProperty({ example: 'sent' })
  @IsString()
  status: string;
}