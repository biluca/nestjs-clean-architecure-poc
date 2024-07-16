import { Controller, Get } from '@nestjs/common';
import { GenericController } from 'src/commons/controller.generic';

@Controller()
export class AppController extends GenericController {
  @Get('health-check')
  healthCheck(): string {
    this.logger.info('Reach the GET /health-check Endpoint on AppController');
    return 'Hello, I am Healthy!';
  }
}
