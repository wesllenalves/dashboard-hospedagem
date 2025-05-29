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

@Module({
  imports: [AuthModule, UsersModule, HostingsModule, PrismaModule, StaysModule, PaymentsModule, SchedulesModule, MessagesModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
