import { Module } from '@nestjs/common';
import { HostingsService } from './hostings.service';

@Module({
  providers: [HostingsService]
})
export class HostingsModule {}
