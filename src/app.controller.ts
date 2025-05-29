import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// Importação do Swagger
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna mensagem Hello World!' })
  @ApiResponse({ status: 200, description: 'Sucesso', type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
