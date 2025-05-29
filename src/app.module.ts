import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HostingsModule } from './hostings/hostings.module';
import { PrismaModule } from './prisma/prisma.module';
import { StaysModule } from './stays/stays.module';
import { PaymentsModule } from './payments/payments.module';
import { SchedulesModule } from './schedules/schedules.module';
import { MessagesModule } from './messages/messages.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AvailabilityModule } from './availability/availability.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PricesModule } from './prices/prices.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    HostingsModule, 
    PrismaModule, 
    StaysModule, 
    PaymentsModule, 
    SchedulesModule, 
    MessagesModule, 
    DashboardModule, 
    AvailabilityModule, 
    ReviewsModule, 
    PricesModule, 
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
