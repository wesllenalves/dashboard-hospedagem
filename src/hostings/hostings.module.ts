import { Module } from '@nestjs/common';
import { HostingsService } from './hostings.service';
import { HostingsController } from './hostings.controller';

@Module({
  providers: [HostingsService],
  controllers: [HostingsController],
})
export class HostingsModule {}
