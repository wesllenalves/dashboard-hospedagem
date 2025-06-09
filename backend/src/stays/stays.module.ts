import { Module } from '@nestjs/common';
import { StaysService } from './stays.service';
import { StaysController } from './stays.controller';

@Module({
  providers: [StaysService],
  controllers: [StaysController],
})
export class StaysModule {}