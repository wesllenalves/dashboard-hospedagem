import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  constructor() {
    super({
      // Optional: add Prisma client options here, e.g., logging
      // log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onApplicationShutdown(signal?: string) {
    // The Prisma team's recommendation for shutdown hooks:
    // https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem
    // Although this link is for Next.js, the principle of graceful shutdown applies.
    // For NestJS, this hook is triggered by app.close() or specific signals if app.enableShutdownHooks() is used.
    await this.$disconnect();
  }
}
