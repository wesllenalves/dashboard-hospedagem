import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';

@Module({
  providers: [PricesService],
  controllers: [PricesController],
})
export class PricesModule {}