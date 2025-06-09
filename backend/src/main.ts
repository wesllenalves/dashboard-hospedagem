import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Adicione as importações do Swagger:
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Hosting Dashboard API')
    .setDescription('Documentação da API do Dashboard de Hospedagem')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Enable shutdown hooks to gracefully handle termination signals
  app.enableShutdownHooks();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Aplicação iniciada em: http://127.0.0.1:${port}`);
  console.log(`📚 Documentação Swagger: http://127.0.0.1:${port}/api/docs`);
}
bootstrap();
