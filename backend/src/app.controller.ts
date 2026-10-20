import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('api/projects')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProjects() {
    return this.appService.getProjects();
  }
}
