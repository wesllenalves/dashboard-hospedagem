import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

async function bootstrap() {

  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Enable shutdown hooks to gracefully handle termination signals
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
